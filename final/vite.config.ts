import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
  ],

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.API_URL': JSON.stringify(process.env.API_URL || ''),
  },

  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/6-shared'),
      '@features': path.resolve(__dirname, 'src/4-features'),
      '@widgets': path.resolve(__dirname, 'src/3-widgets'),
      '@pages': path.resolve(__dirname, 'src/2-pages'),
      '@app': path.resolve(__dirname, 'src/1-app'),
      '@entities': path.resolve(__dirname, 'src/5-entities'),
    },
  },

  assetsInclude: ['**/*.svg'],

  build: {
    outDir: 'dist-vite',
    sourcemap: false,
    minify: 'esbuild', // esbuild минификация (как в оригинальном задании)
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        entryFileNames: 'static/scripts/[name].[hash].js',
        chunkFileNames: 'static/scripts/[name].[hash].js',
        assetFileNames: 'static/[name].[hash][extname]',
      },
    },
  },

  css: {
    modules: {
      generateScopedName: '[local]',
    },
  },
});
