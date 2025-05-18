// scripts/init-folders.mjs
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const tree = [
  'src/database/migrations',
  'src/database/seeders',
  'src/database/models',
  'src/middlewares',
  'src/utils',
  'src/types',
  'src/tests',
  'docs',
];

const features = [
  'inventory-management',
  'employee-resource-management',
  'production-manufacturing',
];

for (const f of features) {
  tree.push(
    `src/modules/${f}/controllers`,
    `src/modules/${f}/models`,
    `src/modules/${f}/routes`,
    `src/modules/${f}/services`,
    `src/modules/${f}/tests`,
  );
}

for (const dir of tree) {
  await mkdir(join(process.cwd(), dir), { recursive: true });
  console.log('✔ created', dir);
}
