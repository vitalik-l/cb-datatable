const shell = require('shelljs');
const publishUtils = require('./utils');
const path = require('path');
const packageJson = require(path.resolve('./package.json'));

const TAG_NAME = 'v' + packageJson.version;

// git commit
try {
  publishUtils.exec('git add .');
  publishUtils.exec('git commit -m "release ' + TAG_NAME + '"');
  publishUtils.exec('git push origin master');
} catch(err) {}

// set version tag to latest commit
publishUtils.exec('git tag -f ' + TAG_NAME);
// pushing tag
console.log('=> Pushing tag');
publishUtils.exec('git push origin ' + TAG_NAME);

console.log('=> Publish');
publishUtils.exec('npm run build');
console.log('cd lib');
shell.cd('lib');
publishUtils.exec('npm publish');
