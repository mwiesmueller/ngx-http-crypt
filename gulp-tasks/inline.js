'use strict';

const gulp = require('gulp');
const embed = require('gulp-inline-ng2-template');

gulp.task('inline', () => {
  const run = gulp.src('components/**/*.*')
    .pipe(embed({ templateFunction: true, supportNonExistentFiles: true, useRelativePaths: true }))
    .pipe(gulp.dest('build'));

  return run;
});
