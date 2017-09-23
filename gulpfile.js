'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
 
gulp.task('sass', function () {
  return gulp.src('./css/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./css/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch ']);