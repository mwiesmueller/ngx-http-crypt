'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('pug', () => {
  const run = gulp.src('components/**/*.pug', { base: './components' })
    .pipe(pug({client: false}))
    .pipe(gulp.dest(file => file.base));

  return run;
});
