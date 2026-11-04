import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        publicDir: 'public',
        plugins: [react()],
        resolve: {
            tsconfigPaths: true,
        },
        optimizeDeps: {
            include: ['@emotion/react', '@emotion/styled', '@mui/icons-material', '@mui/material'],
        },
        preview: {
            open: true,
        },
        build: {
            outDir: 'build',
            target: 'es2020',
            sourcemap: true,
            minify: 'esbuild',

            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            if (id.includes('react-hook-form')) {
                                return 'react-hook-form';
                            }
                        }
                    },
                },
            },
        },
    };
});
