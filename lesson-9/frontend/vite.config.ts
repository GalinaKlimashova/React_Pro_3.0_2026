import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        // @ts-expect-error - type definitions not updated in @vitejs/plugin-react@5.x
        react({ reactCompiler: true }),
        tsconfigPaths()
    ]
});