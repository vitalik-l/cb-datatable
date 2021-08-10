/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
import fs from 'fs';

const files = [];

const LIB = 'cb-datatable';

Promise.all(files.map((file) => copyFile(file))).then(() => createPackageFile());

function copyFile(file) {
  const buildPath = resolveBuildPath(file);
  return new Promise((resolve) => {
    fse.copy(file, buildPath, (err) => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function resolveBuildPath(file) {
  return path.resolve(__dirname, '../lib/', path.basename(file));
}

function createPackageFile() {
  return new Promise((resolve) => {
    const packageFile = path.resolve(__dirname, '../package.json');

    fse.readFile(packageFile, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
    .then((data) => JSON.parse(data))
    .then((packageData) => {
      const {
        author,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies = {},
      } = packageData;
      const { react, 'react-dom': reactDom, ...installDependencies } = dependencies;

      const minimalPackage = {
        name: LIB,
        author,
        version,
        description,
        main: './index.js',
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies: installDependencies,
      };

      return new Promise((resolve) => {
        const buildPath = path.resolve(__dirname, '../lib', 'package.json');
        const data = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(buildPath, data, (err) => {
          if (err) throw err;
          console.log(`Created package.json in ${buildPath}`);
          resolve();
        });
      });
    });
}
