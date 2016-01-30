import gulp from 'gulp';
import tape from 'gulp-tape';
import eslint from 'gulp-eslint';
import tapColorize from 'tap-colorize';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.babel.js';

gulp.task('static', function(callback) {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) {
      console.log('ERROR', err);
    }
    callback();
  });
});

gulp.task('webpack-dev-server', function(callback) {
  new webpackDevServer(webpack(webpackConfig), {
    contentBase: webpackConfig.output.path,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) {
      console.log('ERROR', err);
    }
  })
});

gulp.task('test', function() {
  return gulp.src('test/**/*.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});

gulp.task('lint', function() {
  return gulp.src(['app/**/*.js', 'test/**/*.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.formatEach('compact', process.stderr));
});

gulp.task('watch', function() {
  gulp.watch('./app/index.html', ['static'])
});

gulp.task('default', ['webpack-dev-server', 'static', 'watch']);
