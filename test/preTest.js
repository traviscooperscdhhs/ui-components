var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var globby = require('globby');

globby(['./test/shim.js', './test/unit/*.js'], function (err, paths) {
  browserify(paths, {extensions: ['.jsx'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('tests.js'))
    .pipe(gulp.dest('./test'));
});
