var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.src('test/tests.js', {read: false, force: true})
  .pipe(clean());
