#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const lib = path.join(root, 'src', 'lib');
const out = path.join(root, 'dist', 'lib-string');
const config = path.join(root, '.swcrc.esm.json');

execSync(`swc string.ts -d ${out} --config-file ${config}`, {
    cwd: lib,
    stdio: 'inherit'
});
