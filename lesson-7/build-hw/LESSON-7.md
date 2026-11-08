# Задание 7. Сборка приложения - esbuild, swc. Загрузка и комментарии

ветка: lesson-7

Сделано:
- [x] Сборка приложения через esbuild (3 балла)
- [x] Сборка библиотеки через esbuild (3 балла)
- [x] Конфигурация production и dev-сборки (3 балла)
- [x] Дополнительное задание (3 бонусных балла): Использование swc для сборки библиотеки (1.5 балла),Code splitting на основе маршрутов (1.5 балла)

## SWC: исправление ошибок

- [x] Ошибка 1 — "Точка входа библиотеки только src/lib/index.ts. а файлы math.ts и string.ts отдельно не собираются."

Решение: скрипт scripts/build-swc-lib.js.
команда "npm run build:swc:lib": сборка src/lib/index.ts как точка входа, math.ts и string.ts подключены для импортов.
команда "npm run build:swc:math"  - скрипт scripts/build-swc-math.js
команда "npm run build:swc:string" - scripts/build-swc-string.js

- [x] Ошибка 2 — .swcrc пустой, скрипт swc src не включает парсер typescript.

Решение: файлы .swcrc.esm.json и .swcrc.cjs.json в корне проекта, в них jsc.parser.syntax = "typescript". SWC сам по себе не знает, что файлы .ts — это TypeScript. Чтобы он это понял, в команде нужно указать --config-file. Например, "--config-file .swcrc.esm.json" — это указание swc прочитать парсер из swcrc.esm.json.

- [x] Ошибка 3 — es6 и commonjs: один каталог dist/lib-swc/swc, второго формата нет.

Решение: скрипт scripts/build-swc-lib.js запускает swc дважды. Первый раз с .swcrc.esm.json → dist/lib-swc/esm, второй с .swcrc.cjs.json → dist/lib-swc/cjs. Команда: npm run build:swc:lib.

- [x] Ошибка 4 — "В команде swc нет minify и sourceMaps."

Решение: в тех же файлах .swcrc.esm.json и .swcrc.cjs.json добавлены поля jsc.minify (compress + mangle) и sourceMaps: true. 
Minify сжимает код и переименовывает переменные, sourceMaps генерирует .js.map файлы. Флагов --minify и --source-maps в команде нет — всё берётся из конфига через --config-file.
