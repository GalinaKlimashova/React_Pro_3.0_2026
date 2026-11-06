// import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],
    optimizeDeps: {
        include: ['lodash-es', 'axios'],         // обязательно предсобрать эти пакеты
        exclude: ['firebase', 'some-heavy-lib']  // пропустить эти пакеты, не анализировать
    }
});