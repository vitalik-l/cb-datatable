#!/usr/bin/env node

var shell = require('shelljs');
var publishUtils = require('./utils');
var path = require('path');
var packageJson = require(path.resolve('./package.json'));

// get GIT url
console.log('=> Getting the git remote URL');
var GIT_URL = publishUtils.exec('git config --get remote.origin.url');
if (!GIT_URL) {
  console.log('This project is not configured with a remote git repo');
  process.exit(-1);
}

// git pull first
publishUtils.exec('git pull origin master');

// check if the branch exists with the name as in the package.json version field
var VERSION = packageJson.version;
var TAG_NAME = 'v' + VERSION;
console.log('=> Check if version ' + VERSION + ' is already exists');
try {
  var tagIsExists = publishUtils.exec('git rev-parse -q --verify "refs/tags/' + TAG_NAME + '"');
} catch (err) {}
if (!!tagIsExists) {
  console.error('ERROR: Tag with name ' + TAG_NAME + ' is already exists');
  process.exit(-1);
}

// git commit
try {
  publishUtils.exec('git add .');
  publishUtils.exec('git commit -m "release ' + TAG_NAME + '"');
  publishUtils.exec('git push origin master');
} catch (err) {}

// set version tag to latest commit
publishUtils.exec('git tag -f ' + TAG_NAME);
// pushing tag
console.log('=> Pushing tag');
publishUtils.exec('git push origin ' + TAG_NAME);

// get latest commit hash
var latestCommitHash = publishUtils.exec('git log -1 --pretty=format:"%h"');

// run our compile script
console.log('=> Building cb-general');
if (packageJson.scripts['build']) {
  publishUtils.exec('npm run build');
} else {
  console.log('No build command in package.json');
  process.exit(-1);
}

// clear and re-create the out directory
var OUTPUT_DIR = 'lib-temp' + Math.ceil(Math.random() * 9999);
shell.rm('-rf', OUTPUT_DIR);
shell.mkdir(OUTPUT_DIR);
// copy files from lib
shell.cp('-R', 'lib/*', OUTPUT_DIR);
shell.cp('-R', 'lib/.gitignore', OUTPUT_DIR);
// go to the out directory and create a *new* Git repo
shell.cd(OUTPUT_DIR);

var deployConfig = {
  gitUsername: 'cb-general Bot',
  gitEmail: 'hello@bot.com',
  commitMessage:
    'Release the ' + VERSION + ' version. Point to the ' + latestCommitHash + ' commit',
};

var config = deployConfig;
publishUtils.exec('git init');
// inside this git repo we'll pretend to be a new user
publishUtils.exec('git config user.name ' + JSON.stringify(config.gitUsername));
publishUtils.exec('git config user.email ' + JSON.stringify(config.gitEmail));

// The first and only commit to this new Git repo contains all the
// files present with the commit message "Deploy to GitHub Pages".
publishUtils.exec('git add .');
publishUtils.exec('git commit -m ' + JSON.stringify(config.commitMessage));

// Force push from the current repo's master branch to the remote
// repo's gh-pages branch. (All previous history on the gh-pages branch
// will be lost, since we are overwriting it.) We redirect any output to
// /dev/null to hide any sensitive credential data that might otherwise be exposed.
console.log('=> Deploying cb-general');
publishUtils.exec('git push --force --quiet ' + GIT_URL + ' master:' + VERSION);
console.log('=> Commit info:');
console.log(publishUtils.exec('git log -1'));
shell.cd('..');
shell.rm('-rf', OUTPUT_DIR);

console.log();
console.log('=> cb-general release is done');
