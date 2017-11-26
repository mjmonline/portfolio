const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const paths = require('./config/paths');
const isDevelopment = plugins.environments.development();
const isProduction = plugins.environments.production();

if (isProduction) {
  plugins.util.log(plugins.util.colors.white.bgRed(' Environment is ' + plugins.util.colors.bold('PRODUCTION ')));
}
if (isDevelopment) {
  plugins.util.log(plugins.util.colors.white.bgBlue(' Environment is ' + plugins.util.colors.bold('DEVELOPMENT ')));
}

function getTask (task) {
  return require(paths.gulpTasks + '/' + task)(gulp, plugins);
}

gulp.task('clean', getTask('clean'));
gulp.task('browserify', getTask('browserify'));
gulp.task('sass', getTask('sass'));
gulp.task('templates', getTask('hbs'));

gulp.task('default', ['build']);
gulp.task('build', [
  'clean',
  'browserify',
  'sass',
  'templates'
]);

gulp.task('watch', ['browserify', 'sass'], function () {
  gulp.watch(paths.appSrc + '/**/*.scss', ['sass']);
  gulp.watch([paths.appSrc + '/**/*.js'], ['browserify']);
  gulp.watch(paths.appSrc + '/**/*.html', ['templates']);
});
