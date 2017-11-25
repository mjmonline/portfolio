'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appBuild: resolveApp('./build'),
    appIndexJs: resolveApp('./app/global/js/main.js'),
    appSrc: resolveApp('./app'),
    gulpTasks: resolveApp('./gulp-tasks'),
    nodeModules: resolveApp('./node_modules')
};
