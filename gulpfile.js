const gulp = require('gulp');
const rename = require('gulp-rename');
const webpack = require('gulp-webpack');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const merge = require('merge2');
const webpackConfig = require('./webpack.config.demo.prod.js');
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('build_styles', function () {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./lib/styles'));
});

// library
gulp.task('copy_styles', function () {
    return gulp.src('./src/styles/!**!/!*')
        .pipe(gulp.dest('./lib/styles'));
});

gulp.task('build', function () {
    const tsResult = gulp.src('src/**/*.{ts,tsx}')
        .pipe(tsProject({
            declaration: true
        }));
    return merge([
        tsResult.dts.pipe(gulp.dest('lib/definitions')),
        tsResult.js.pipe(gulp.dest('lib'))
    ]);
});

// demo
// removes the output configuration from the webpack.config.js file, otherwise it doesn't work.
webpackConfig.output.path = null;

gulp.task('copy-index', function () {
    return gulp.src('./demo/index.prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build-demo', ['copy-index'], function () {
    return gulp.src("./demo/client.tsx")
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./docs'));
});
