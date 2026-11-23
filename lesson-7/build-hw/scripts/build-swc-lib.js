#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const configEsm = path.join(root, '.swcrc.esm.json');
const configCjs = path.join(root, '.swcrc.cjs.json');

// Точка входа: lib/index.ts
// Зависимости lib/math.ts и lib/string.ts компилируются для работы относительных импортов
const ENTRY = 'lib/index.ts';
const DEPS = ['lib/math.ts', 'lib/string.ts'];

// ESM сборка
execSync(
    `swc ${ENTRY} ${DEPS.join(' ')} -d ../dist/lib-swc/esm --config-file ${configEsm} --strip-leading-paths`,
    { cwd: src, stdio: 'inherit' }
);

// CJS сборка
execSync(
    `swc ${ENTRY} ${DEPS.join(' ')} -d ../dist/lib-swc/cjs --config-file ${configCjs} --strip-leading-paths`,
    { cwd: src, stdio: 'inherit' }
);
