import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    /* eslint-disable no-console */
    console.log({ mode });
    /* eslint-enable no-console */

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            mode === 'analyze' ? visualizer({ open: true, template: 'flamegraph' }) : null,
        ],

        build: {
            outDir: 'build',
            target: 'es2022',

            sourcemap: false,

            rolldownOptions: {
                output: {
                    codeSplitting: {
                        groups: [
                            {
                                name: 'mui',
                                test: '/node_modules/@mui',
                            },
                            {
                                name: 'forms',
                                test(id) {
                                    return (
                                        id.includes('node_modules') &&
                                        ['zod', 'react-hook-form'].some((libName) => id.includes(libName))
                                    );
                                },
                            },
                        ],
                    },
                },
            },
        },
    };
});
