#!/usr/bin/env node
var publishUtils = require('./utils');

const packageName = 'cb-datatable';

console.log('=> Building ' + packageName);
const srcPath = './src';
console.log(`=> src path is ${srcPath}`);
publishUtils.exec(
  `cross-env NODE_ENV=release babel ${srcPath} --out-dir ./lib --extensions ".js,.jsx,.ts,.tsx"`,
);
console.log('=> Check for tsconfig');
const tsconfigFile = './tsconfig.build.json';
console.log(`=> tsconfig file is ${tsconfigFile}`);
// publishUtils.exec(`npx tsc -p ${tsconfigFile}`);
publishUtils.exec(`npx tsc -b ${tsconfigFile}`);
publishUtils.exec(`cross-env LIB=${packageName} babel-node ./scripts/copy-styles.js`);
publishUtils.exec(`cross-env LIB=${packageName} babel-node ./scripts/copy-files.js`);

console.log();
console.log('=> ' + packageName + ' build is done');
