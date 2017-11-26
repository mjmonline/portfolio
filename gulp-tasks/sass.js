const paths = require('../config/paths');

module.exports = function (gulp, plugins) {
  const isDevelopment = plugins.environments.development();
  const prefixOptions = {
    browsers: ['last 3 versions'],
    grid: true // Enables autoprefixing of old cssgrid syntax for ie
  };
  // http://browserl.ist for checking what Browsers we support

  return function () {
    if (isDevelopment) {
      gulp.src(paths.appSrc + '/global/scss/master.scss')
        .pipe(plugins.sassGlob())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
          outputStyle: 'expanded',
          includePaths: [
            './node_modules/'
          ]
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer(prefixOptions))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.appBuild + '/css'));
    } else {
      gulp.src(paths.appSrc + '/global/scss/master.scss')
        .pipe(plugins.sassGlob())
        .pipe(plugins.sass({
          outputStyle: 'compressed',
          includePaths: [
            './node_modules/'
          ]
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer(prefixOptions))
        .pipe(gulp.dest(paths.appBuild + '/css'));
    }
  };
};
