const gulp = require("gulp");
const rename = require("gulp-rename");
const ts = require("gulp-typescript");
const sass = require("gulp-sass");
const merge = require("merge2");
const tsProject = ts.createProject("./tsconfig.build.json");
const webpackStream = require("webpack-stream");

function buildStyles() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./lib/styles/css"));
}

// library
function copyStyles() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(gulp.dest("./lib/styles/scss"));
}

// depends on copyStyles and buildStyles
function buildLib() {
  const tsResult = tsProject.src().pipe(
    tsProject({
      declaration: true
    })
  );
  return merge([
    tsResult.dts.pipe(gulp.dest("lib/definitions")),
    tsResult.js.pipe(gulp.dest("lib/js"))
  ]);
}

// demo
// removes the output configuration from the webpack.config.js file, otherwise it doesn't work.

function copyIndex() {
  return gulp
    .src("./demo/index.prod.html")
    .pipe(rename("index.html"))
    .pipe(gulp.dest("./docs"));
}

// depends on copyIndex
function buildDemo() {
  return gulp
    .src("demo/client.tsx")
    .pipe(
      webpackStream(
        require("./webpack.config.demo.prod.js"),
        require("webpack")
      )
    )
    .pipe(gulp.dest("docs/"));
}

exports.build = gulp.series(buildStyles, copyStyles, copyIndex, buildLib, buildDemo);
