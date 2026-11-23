import * as esbuild from 'esbuild';
import type { BuildOptions } from 'esbuild';
import { execSync } from 'child_process';
import fs from 'fs';

// Читаем зависимости, чтобы исключить их из бандла библиотеки
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const externalDependencies = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

// Экспорт функции создания конфига для библиотеки
export function createLibConfig() {
    const baseLibConfig: BuildOptions = {
        entryPoints: ['src/lib/index.ts'],
        bundle: true,
        minify: false,
        sourcemap: true,
        platform: 'neutral',
        target: ['es2020'],
        external: externalDependencies,
        logLevel: 'info',
    };

    return {
        base: baseLibConfig,
        esm: { ...baseLibConfig, format: 'esm' as const, outfile: 'dist/lib/index.js' },
        cjs: { ...baseLibConfig, format: 'cjs' as const, outfile: 'dist/lib/index.cjs' },
    };
}

// Если файл запущен напрямую — выполняем сборку
if (import.meta.url === `file://${process.argv[1]}`) {
    async function buildLibrary() {
        const config = createLibConfig();

        // Сборка в ESM формате
        await esbuild.build(config.esm);

        // Сборка в CommonJS формате
        await esbuild.build(config.cjs);

        // Генерация файлов декларации типов через tsc
        try {
            execSync('tsc --emitDeclarationOnly --outDir dist/lib/types');
        } catch {
            console.log('Генерация declaration-файлов пропущена');
        }

        console.log('Сборка библиотеки завершена');
    }

    buildLibrary().catch(() => process.exit(1));
}
