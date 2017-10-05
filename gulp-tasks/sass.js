'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  const run = gulp.src('components/all.sass')
    .pipe(sass({
      outputStyle: 'compressed',
      importOnce: { css: true }
    }))
    .pipe(gulp.dest(file => file.base));

  return run;
});
