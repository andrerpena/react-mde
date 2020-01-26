const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const webpackStream = require("webpack-stream");

gulp.task("build_styles", function() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./lib/styles/css"));
});

// library
gulp.task("copy_styles", function() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(gulp.dest("./lib/styles/scss"));
});

gulp.task("build-lib", ["copy_styles", "build_styles"], function() {
  return gulp.src("./src/**/*.js").pipe(gulp.dest("./lib/js"));
});

// demo
// removes the output configuration from the webpack.config.js file, otherwise it doesn't work.

gulp.task("copy-index", function() {
  return gulp
    .src("./demo/index.prod.html")
    .pipe(rename("index.html"))
    .pipe(gulp.dest("./docs"));
});

gulp.task("build-demo", ["copy-index"], function() {
  return gulp
    .src("demo/client.js")
    .pipe(
      webpackStream(
        require("./webpack.config.demo.prod.js"),
        require("webpack")
      )
    )
    .pipe(gulp.dest("docs/"));
});

// all
gulp.task("build", ["build-demo", "build-lib"]);
