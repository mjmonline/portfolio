const paths = require('../config/paths');

module.exports = function (gulp, plugins, server) {
  return function () {
    gulp.src(paths.appSrc + '/**/*.+(html|nunjucks)')
      .pipe(plugins.nunjucksRender({
        path: [paths.appSrc + '/templates']
      }))
      .pipe(gulp.dest(paths.appBuild))
      .pipe(server.reload({stream: true}));
  };
};
