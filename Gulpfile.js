'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');

require('require-dir')('./gulp-tasks');

gulp.task('default', () => {
  gulp.start([ 'lint', 'mocha' ]);
});

gulp.task('watch', () => {
  // Endless stream mode
  return gulp.watch(['components/**/*.pug', 'components/**/*.sass'], { verbose: true } , ['pug', 'sass']);
});
