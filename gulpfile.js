const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');

function gulpSass(done) {
    gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css'));
    done();
}

function gulpWatch(done) {
    watch('./sass/*.scss', gulp.parallel(gulpSass));
    done();
}

exports.default = gulpWatch;