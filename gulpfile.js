const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require("gulp-babel");
const webpack = require('gulp-webpack');
const ts = require('gulp-typescript');
const webpackConfig = require('./webpack.config.demo.prod.js');
const sass = require('gulp-sass');

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

gulp.task('build', ['copy_styles', 'build_styles'], function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'reactMde.js'
        }))
        .pipe(gulp.dest('./lib'));
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
