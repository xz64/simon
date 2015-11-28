var gulp = require('gulp')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')

gulp.task('static', function(callback) {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'))
})

gulp.task('webpack', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) {
      console.log('ERROR', err);
    }
    callback();
  })
})

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
})

gulp.task('watch', function() {
  gulp.watch('./app/index.html', ['static'])
})

gulp.task('default', ['webpack-dev-server', 'static', 'watch'])
