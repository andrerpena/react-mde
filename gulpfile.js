const gulp = require('gulp');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const merge = require('merge2');
const tsProject = ts.createProject('./tsconfig.build.json');
const webpackStream = require('webpack-stream');

gulp.task('build_styles', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./lib/styles/css'));
});

// library
gulp.task('copy_styles', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(gulp.dest('./lib/styles/scss'));
});

gulp.task('build-lib', ['copy_styles', 'build_styles'], function () {
    const tsResult = tsProject.src()
        .pipe(tsProject({
            declaration: true
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest('lib/definitions')),
        tsResult.js.pipe(gulp.dest('lib/js'))
    ]);
});

// demo
// removes the output configuration from the webpack.config.js file, otherwise it doesn't work.

gulp.task('copy-index', function () {
    return gulp.src('./demo/index.prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build-demo', ['copy-index'], function () {
    return gulp.src('demo/client.ts')
        .pipe(webpackStream(require('./webpack.config.demo.prod.js'), require("webpack")))
        .pipe(gulp.dest('docs/'))
});

// all
gulp.task('build', ['build-demo', 'build-lib']);
