"use strict";
let gulp          = require("gulp"),
    cssnano       = require("cssnano"),
    postcss       = require("gulp-postcss"),
    stylus        = require("gulp-stylus"),
    autoprefixer  = require("autoprefixer"),
    svgo          = require("postcss-svgo"),
    pxtorem       = require("postcss-pxtorem"),
    rucksack      = require("rucksack-css"),
    normalize     = require("postcss-normalize"),
    sourcemaps    = require("gulp-sourcemaps"),
    browserSync   = require('browser-sync').create();

let paths = {
  cssSource: "stylus/main.styl",
  cssDestination: "css/"
};

gulp.task("serve", function() {

  browserSync.init({
    "server": "./"
  });

  gulp.watch("stylus/**/*.*", ["styles"]);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task("styles", function() {

  let processors = [
    normalize(),
    rucksack(),
    pxtorem({
       "propList": ["*"],
       "mediaQuery": true
    }),
    svgo(),
    autoprefixer({
      "browsers": [
        "last 2 versions",
        "Android >= 4",
        "IE >= 9"
      ]
    }),
    cssnano({
      "zindex": false,
      "discardComments": {
        "removeAll": true
      }
   })
  ];

  return gulp.src(paths.cssSource)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);