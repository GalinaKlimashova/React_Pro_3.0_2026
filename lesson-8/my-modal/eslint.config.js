import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
    globalIgnores(['dist', 'build']),

    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        plugins: {
            react: eslintReact,
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            semi: ['error', 'always'],
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
]);
