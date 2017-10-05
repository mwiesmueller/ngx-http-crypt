'use strict';

const gulp = require('gulp');

gulp.task('copyfont', () => {
  const run = gulp.src(['./node_modules/workshop-glyphs/**/*.*'])
    .pipe(gulp.dest('./demo/public/workshop-glyphs'));

  return run;
});
