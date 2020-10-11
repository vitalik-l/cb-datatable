const shell = require('shelljs');
const publishUtils = require('./utils');
const path = require('path');
const packageJson = require(path.resolve('./package.json'));

const projectPath = process.env.PROJECT_PATH;

try {
    console.log('cd lib');
    shell.cd('lib');
    publishUtils.exec('npm pack');
    console.log(`cd ${projectPath}`);
    shell.cd(projectPath);
    publishUtils.exec(`yarn add ${path.resolve(__dirname, '..', 'lib', packageJson.name + '-' + packageJson.version + '.tgz')}`);
    shell.cd(__dirname);
} catch (err) {
    console.error(err);
}


