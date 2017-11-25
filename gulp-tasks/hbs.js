const paths = require('../config/paths');

module.exports = function(gulp, plugins) {
  const hbStream = plugins.hb()
    .partials(paths.appSrc + '/components/**/*.{hbs,js}')
    .partials(paths.appSrc + '/layouts/**/*.{hbs,js}')

    .helpers(require('handlebars-layouts'))

    .data('./data/**/*.{js,json}');

  return function() {
    gulp.src(paths.appSrc + '/index.html')
      .pipe(hbStream)
      .pipe(gulp.dest(paths.appBuild));
  };
};
