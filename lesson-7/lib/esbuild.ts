import esbuild from 'esbuild';
import path from 'path';

esbuild
    .build({
        entryPoints: [path.resolve(process.cwd(), 'src', 'index.ts')],
        bundle: true,
        outdir: 'build',
        jsx: 'automatic',
        target: 'es2022',
        minify: false,
        format: 'esm',
        sourcemap: false,
        external: ['react', 'react-dom', 'react-router'],
    })
    .then(console.log)
    .catch(console.error);
