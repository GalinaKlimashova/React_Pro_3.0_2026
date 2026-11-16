const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PRODUCTION = process.env.NODE_ENV === 'production';
const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist-esbuild');

// --- PostCSS plugin for CSS processing ---
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = PRODUCTION ? require('cssnano') : null;

async function processCSS(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = await postcss([autoprefixer, ...(cssnano ? [cssnano()] : [])]).process(content, {
    from: filePath,
    to: filePath,
  });
  return result.css;
}

// Serialize file writes to prevent race conditions from parallel plugin execution
const writeQueue = { queue: Promise.resolve() };
writeQueue.write = (filePath, content) => {
  writeQueue.queue = writeQueue.queue.then(() =>
    fs.mkdirSync(path.dirname(filePath), { recursive: true }) &&
    fs.writeFileSync(filePath, content)
  );
  return writeQueue.queue;
};

// Find file by name recursively under dir
function findFileByName(dir, filename) {
  let result = null;
  function search(currentDir) {
    if (result) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === filename) {
        result = path.join(currentDir, entry.name);
        return;
      }
      if (entry.isDirectory() && entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        search(path.join(currentDir, entry.name));
        if (result) return;
      }
    }
  }
  search(dir);
  return result;
}

// Resolve alias path to SRC_DIR-relative path
function resolveAliasPath(importSpecifier) {
  const aliases = [
    { prefix: '@shared/', subdir: '6-shared' },
    { prefix: '@features/', subdir: '4-features' },
    { prefix: '@widgets/', subdir: '3-widgets' },
    { prefix: '@pages/', subdir: '2-pages' },
    { prefix: '@app/', subdir: '1-app' },
  ];
  for (const { prefix, subdir } of aliases) {
    if (importSpecifier.startsWith(prefix)) {
      return path.join(SRC_DIR, subdir, importSpecifier.slice(prefix.length));
    }
  }
  // Not an alias — return as-is
  return null;
}

// --- Custom plugins ---

// 1. Handle .svg files — return minimal React component code
function svgPlugin() {
  return {
    name: 'svg-replace',
    setup(build) {
      // Handle .svg files with ?url suffix — copy as static assets
      build.onResolve({ filter: /\.svg\?url$/ }, (args) => ({
        path: args.path,
        namespace: 'svg-url',
      }));
      build.onLoad({ filter: /\.svg\?url$/, namespace: 'svg-url' }, async (args) => {
        const svgPathRaw = args.path.replace('?url', '');
        let svgPath;
        if (path.isAbsolute(svgPathRaw)) {
          svgPath = svgPathRaw;
        } else {
          const aliasResolved = resolveAliasPath(svgPathRaw);
          if (aliasResolved && fs.existsSync(aliasResolved)) {
            svgPath = aliasResolved;
          } else {
            svgPath = findFileByName(SRC_DIR, path.basename(svgPathRaw));
          }
        }
        if (!svgPath || !fs.existsSync(svgPath)) {
          return { errors: [{ text: `SVG asset not found: ${args.path}` }] };
        }
        const basename = path.basename(svgPath);
        const outDir = path.join(DIST_DIR, 'static', 'images');
        await writeQueue.write(path.join(outDir, basename), fs.readFileSync(svgPath));
        return { contents: `export default '/static/images/${basename}';`, loader: 'js' };
      });

      // Resolve plain .svg files to custom namespace
      build.onResolve({ filter: /\.svg$/ }, (args) => ({
        path: args.path,
        namespace: 'svg',
      }));

      // Load .svg as React component JSX
      build.onLoad({ filter: /\.svg$/, namespace: 'svg' }, async (args) => {
        const svgPathRaw = args.path;

        // Handle ?url suffix — skip handling assets meant for URL references
        if (svgPathRaw.includes('?url')) {
          return null; // Let esbuild handle as asset
        }

        let svgPath;
        if (path.isAbsolute(svgPathRaw)) {
          svgPath = svgPathRaw;
        } else {
          // Try resolving as alias first
          const aliasResolved = resolveAliasPath(svgPathRaw);
          if (aliasResolved && fs.existsSync(aliasResolved)) {
            svgPath = aliasResolved;
          } else {
            // Otherwise try as relative to SRC_DIR or find by name
            const fullPath = path.resolve(SRC_DIR, svgPathRaw);
            if (fs.existsSync(fullPath)) {
              svgPath = fullPath;
            } else {
              // Find by basename within SRC_DIR
              svgPath = findFileByName(SRC_DIR, path.basename(svgPathRaw));
            }
          }
        }

        if (!svgPath || !fs.existsSync(svgPath)) {
          return { errors: [{ text: `SVG file not found: ${svgPathRaw}` }] };
        }

        let svgContent = fs.readFileSync(svgPath, 'utf-8');
        svgContent = svgContent
          .replace(/<\?xml[^?]*\?>/g, '')
          .replace(/<!--[\s\S]*?-->/g, '')
          .trim();

        const basename = path.basename(svgPath, '.svg');
        const uniqueId = basename + '_' + Math.random().toString(36).substring(2, 7);

        // Generate a valid React component JSX
        return {
          contents: `export default function ${uniqueId}(props) { return ${svgContent}; }`,
          loader: 'jsx',
        };
      });
    },
  };
}

// 2. CSS Modules plugin — handles .module.css transformation
function cssModulesPlugin() {
  return {
    name: 'css-modules',
    async setup(build) {
      // Resolve .module.css files to a custom namespace
      build.onResolve({ filter: /\.module\.css$/ }, (args) => ({
        path: args.path,
        namespace: 'css-modules',
      }));

      // Load .module.css: generate JS exports + write processed CSS
      build.onLoad({ filter: /.*/, namespace: 'css-modules' }, async (args) => {
        const cssPathRaw = args.path;

        let cssPath;
        if (path.isAbsolute(cssPathRaw)) {
          cssPath = cssPathRaw;
        } else {
          // Try alias resolution first
          const aliasResolved = resolveAliasPath(cssPathRaw);
          if (aliasResolved && fs.existsSync(aliasResolved)) {
            cssPath = aliasResolved;
          } else {
            // Try resolving relative to SRC_DIR
            const fullPath = path.resolve(SRC_DIR, cssPathRaw);
            if (fs.existsSync(fullPath)) {
              cssPath = fullPath;
            } else {
              // Search by basename within SRC_DIR
              cssPath = findFileByName(SRC_DIR, path.basename(cssPathRaw));
            }
          }
        }

        if (!cssPath || !fs.existsSync(cssPath)) {
          return { errors: [{ text: `CSS module not found: ${cssPathRaw}` }] };
        }

        const processedCss = await processCSS(cssPath);

        // Write processed CSS to static/styles directory (serialized)
        const relPath = path.relative(SRC_DIR, cssPath);
        const cssOutPath = path.join(DIST_DIR, 'static', 'styles', relPath.replace(/\.module\.css$/, '.css'));
        await writeQueue.write(cssOutPath, processedCss);

        // Extract class names from selectors and generate exports
        const cssExports = {};
        // Match class selectors: .className, .className:hover, .className::before, etc.
        const classMatches = processedCss.match(/\.([a-zA-Z0-9_-]+)\b/g) || [];
        const baseName = path.basename(cssPath, '.module.css');

        for (const match of classMatches) {
          const localName = match.substring(1);
          const hash = crypto.createHash('md5')
            .update(localName)
            .digest('hex')
            .substring(0, 5);
          const mangled = `${baseName}__${localName}__${hash}`;
          cssExports[match] = mangled;
        }

        // Remove duplicates — last wins (handles :hover, :focus variants)
        const entries = Object.entries(cssExports);
        const unique = [...new Map(entries).entries()];

        let jsContent = 'export default {';
        for (const [key, val] of unique) {
          jsContent += `'${key}':'${val}',`;
        }
        jsContent += '};\n';

        // Inject CSS as browser-side IIFE without using <script> tag in generated code
        const safeCss = processedCss.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
        jsContent += '(function(){var _e=document.createElement("style");_e.textContent=' + JSON.stringify(safeCss) + ';document.head.appendChild(_e)})();';

        return {
          contents: jsContent,
          loader: 'js',
        };
      });
    },
  };
}

// --- Build ---
const startBuild = Date.now();

console.log(`Starting esbuild build (production: ${PRODUCTION})...`);

esbuild.build({
  entryPoints: [path.join(SRC_DIR, 'index.tsx')],
  bundle: true,
  outfile: PRODUCTION
    ? path.join(DIST_DIR, 'static/scripts/main.[contenthash].js')
    : path.join(DIST_DIR, 'static/scripts/main.js'),
  format: 'iife',
  target: ['es2015'],
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  metafile: PRODUCTION,
  logLevel: 'info',
  external: [], // no external packages

  // Alias resolution
  alias: {
    '@shared': path.join(SRC_DIR, '6-shared'),
    '@features': path.join(SRC_DIR, '4-features'),
    '@widgets': path.join(SRC_DIR, '3-widgets'),
    '@pages': path.join(SRC_DIR, '2-pages'),
    '@app': path.join(SRC_DIR, '1-app'),
  },

  // Plugins
  plugins: [svgPlugin(), cssModulesPlugin()],

}).then(() => {
  const elapsed = Date.now() - startBuild;
  console.log(`\nesbuild build completed in ${elapsed}ms`);

  // Copy index.html and update script src to match output
  const scriptsDir = path.join(DIST_DIR, 'static', 'scripts');

  const jsFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.js') && !f.endsWith('.map.js'));
  const mainJs = jsFiles.find(f => f.includes('main'));
  if (!mainJs) {
    console.warn('Warning: main.js not found in', scriptsDir);
    console.log('Available files:', fs.readdirSync(scriptsDir));
    return;
  }

  // Find the corresponding CSS file for the HTML link
  const cssFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.css') && !f.endsWith('.map.css'));
  const mainCss = cssFiles.find(f => f.includes('main'));

  const htmlSrc = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlSrc, 'utf-8');

  // Replace any script[type="module"] tag with the actual output filename
  html = html.replace(
    /<script\s+type="module"\s+src="[^"]*"><\/script>/,
    `<script type="module" src="static/scripts/${mainJs}"></script>`
  );

  // Remove old CSS links to avoid duplicates, then add new one
  html = html.replace(/<link\s+rel="stylesheet"[^>]*>/g, '');
  if (mainCss) {
    html = html.replace('</head>', `<link rel="stylesheet" href="static/scripts/${mainCss}"></head>`);
  }

  // Also update favicon link if present
  html = html.replace(
    /<link\s+rel="icon"\s+href="[^"]*"><\/link>/,
    '<link rel="icon" href="static/images/favicon.ico"><link>'
  );

  // Add a note about the CSS bundles
  const cssBundlesHtml = PRODUCTION
    ? ''
    : '<!-- CSS bundles are in dist-esbuild/static/styles/ -->';

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
  console.log(`Copied index.html → ${path.join(DIST_DIR, 'index.html')}`);

  // Calculate output size
  const distDirExists = fs.existsSync(DIST_DIR);
  if (!distDirExists) {
    console.warn('Warning: dist-esbuild directory not found.');
    return;
  }

  const calculateSize = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let size = 0;
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        size += calculateSize(fullPath);
      } else {
        size += fs.statSync(fullPath).size;
      }
    }
    return size;
  };

  const totalSize = calculateSize(DIST_DIR);
  const totalKB = Math.round(totalSize / 1024);
  console.log(`Total output size: ${totalKB} KB (${(totalSize / (1024 * 1024)).toFixed(2)} MB)`);

  // Print results
  console.log('\n--- esbuild Build Results ---');
  console.log(`Mode: ${PRODUCTION ? 'Production' : 'Development'}`);
  console.log(`Build time: ${elapsed}ms`);
  console.log(`Output size: ${totalKB} KB`);
  console.log('----------------------------');
}).catch((err) => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
