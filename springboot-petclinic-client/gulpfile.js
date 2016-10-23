var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var paths = {
    "css"    : "src/css/*",
    "fonts"  : "src/fonts/*",
    "images" : "src/images/*",
    "html"   : "src/scripts/**/*.html",
    "js"     : "src/scripts/**/*.js",
    "dist"   : "target/dist/"
***REMOVED***;

gulp.task('minify-css', function() {
    return gulp.src(paths.css)
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist + 'css/'));
***REMOVED***);

gulp.task('minify-js', function() {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + 'scripts/'));
***REMOVED***);

gulp.task('copy-fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dist + 'fonts/'))
***REMOVED***);

gulp.task('copy-html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist + 'scripts/'))
***REMOVED***);

gulp.task('copy-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist + 'images/'))
***REMOVED***);

gulp.task('default', ['minify-css', 'minify-js', 'copy-fonts',
          'copy-html', 'copy-images'], function() {***REMOVED***);
