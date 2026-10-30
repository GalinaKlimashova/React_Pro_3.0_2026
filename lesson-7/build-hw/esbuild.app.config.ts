import * as esbuild from 'esbuild';
import type { BuildOptions, Plugin } from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';

// Читаем зависимости для external
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const externalDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    // явно исключаем из бандла — подставляются через <script> в index.html
    'react',
    'react-dom',
];

// Плагин для поддержки feature-sliced design алиасов (1-app/, 2-pages/, 3-widgets/, 4-features/, 5-app/, 6-shared/)
function fsdAliasPlugin(): Plugin {
    return {
        name: 'fsd-alias',
        setup(build) {
            build.onResolve({ filter: /^(1-app|2-pages|3-widgets|4-features|5-app|6-shared)\// }, (args) => {
                const aliasPath = path.join(process.cwd(), 'src', args.path);

                // Пробуем расширить путь: сначала .tsx, потом .ts, потом папка/index
                const extensions = ['.tsx', '.ts', '.jsx', '.js'];
                for (const ext of extensions) {
                    if (fs.existsSync(aliasPath + ext)) {
                        return { path: aliasPath + ext };
                    }
                }
                const indexPath = path.join(aliasPath, 'index.ts');
                if (fs.existsSync(indexPath)) {
                    return { path: indexPath };
                }
            });
        },
    };
}

// Режим сборки
type BuildMode = 'dev' | 'prod';

export function createAppConfig(projectRoot: string, mode: BuildMode = 'dev'): BuildOptions {
    const SRC_DIR = path.resolve(projectRoot, 'src');
    const isProd = mode === 'prod';

    return {
        entryPoints: [path.join(SRC_DIR, 'main.tsx')],
        outdir: 'dist',
        bundle: true,
        format: 'esm',
        splitting: true,
        platform: 'browser',
        target: ['es2020'],
        logLevel: 'info',
        minify: isProd,
        sourcemap: isProd ? 'linked' : true,
        treeShaking: isProd,
        entryNames: isProd ? '[name]-[hash]' : '[name]',
        plugins: [fsdAliasPlugin()],
        external: externalDeps,
        loader: {
            '.png': 'dataurl',
            '.jpg': 'dataurl',
            '.jpeg': 'dataurl',
            '.svg': 'dataurl',
            '.gif': 'dataurl',
        },
    };
}

// Если файл запущен напрямую — выполняем сборку
if (import.meta.url === `file://${process.argv[1]}`) {
    const isWatch = process.argv.includes('--watch');
    const mode = process.argv[2] === 'prod' ? 'prod' : 'dev';

    async function run() {
        const config = createAppConfig(process.cwd(), mode);
        if (isWatch && mode === 'dev') {
            const ctx = await esbuild.context(config);
            await ctx.watch();
            const server = await ctx.serve({ port: 3000 });
            console.log(`Dev-сервер запущен на http://localhost:${server.port}/`);
        } else {
            console.log(`Сборка ${mode} приложения...`);
            await esbuild.build({ ...config, metafile: true });
        }
    }

    run().catch(() => process.exit(1));
}
