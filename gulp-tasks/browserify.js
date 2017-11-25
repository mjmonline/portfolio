const paths = require('../config/paths');

module.exports = function(gulp, plugins) {
  // Below is based on https://gist.github.com/stoikerty/cfa49330a9609f6f8d2d
  const babelify = require('babelify');
  const browserify = require('browserify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const isDevelopment = plugins.environments.development();

  const b = browserify({
    entries: paths.appIndexJs, // Only need initial file, browserify finds the deps
    debug: isDevelopment, // Enable sourcemaps
  });

  return function() {
    if (isDevelopment) {
      b.transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plugins.sourcemaps.init({loadMaps: true}))
        // .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.appBuild + '/js/'));
    } else {
      b.transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.appBuild + '/js/'));
    }
  };
};
