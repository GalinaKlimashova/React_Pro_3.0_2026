import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

import path from 'path';

esbuild
    .build({
        plugins: [
            sassPlugin({
                type: 'style',
            }),
        ],
        bundle: true,
        outdir: 'build',
        entryPoints: [path.resolve(process.cwd(), 'src', 'index.ts')],
        jsx: 'automatic',
        format: 'esm',
        external: ['react', 'react-dom'],
    })
    .then(console.log)
    .catch(console.error);
