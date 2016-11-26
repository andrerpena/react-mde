var gulp = require('gulp');
var babel = require("gulp-babel");

gulp.task('copy_styles', function() {
    return gulp.src('./src/styles/**/*')
        .pipe(gulp.dest('./lib'));
});

gulp.task('build', ['copy_styles'], function () {
    return gulp.src("./src/index.js")
    .pipe(babel())
    .pipe(gulp.dest("./lib"));
});
