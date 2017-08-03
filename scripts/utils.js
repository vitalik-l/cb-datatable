var shell = require('shelljs');

module.exports.exec = function exec(command) {
    console.log("   executing: " + command);
    const options = { silent: true };
    const ref = shell.exec(command, options);
    if (ref.code === 0) {
        return ref.stdout.trim();
    }

    const message =
        'Exec code(' + ref.code + ') on executing: ' + command + '\n' +
        shell.stderr;

    throw new Error(message);
};
