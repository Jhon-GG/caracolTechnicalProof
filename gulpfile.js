const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const fs = require('fs-extra');
const through2 = require('through2');


gulp.task('clean', function(done) {
  fs.removeSync('dist');
  fs.ensureDirSync('dist');
  done();
});

gulp.task('html', function() {
  return gulp.src('index.hbs')
    .pipe(rename({
      extname: '.html'
    }))

    .pipe(through2.obj(function(file, enc, cb) {

      cb(null, file);
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('scripts', function() {
  return gulp.src('src/js/app.js')
    .pipe(uglify({
      mangle: false,  
      compress: {
        sequences: false,  
        properties: false  
      }
    }))
    .pipe(gulp.dest('dist/src/js'));
});


gulp.task('styles', function() {
  return gulp.src('src/styles/main.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/src/styles'));
});


gulp.task('assets', function() {
  return gulp.src('src/assets/**/*', { base: 'src' })
    .pipe(gulp.dest('dist/src'));
});


gulp.task('data', function() {
  return gulp.src('src/data/**/*', { base: 'src' })
    .pipe(gulp.dest('dist/src'));
});


gulp.task('rootAssets', function() {
  return gulp.src(['*.png', '*.jpg', '*.jpeg', '*.gif', '*.svg', '*.ico', '*.webp'], { base: './' })
    .pipe(gulp.dest('dist'));
});


gulp.task('otherHtml', function() {
  return gulp.src(['*.html', '!index.html'], { base: './' })
    .pipe(gulp.dest('dist'));
});


gulp.task('rootCss', function() {
  return gulp.src(['*.css'], { base: './' })
    .pipe(gulp.dest('dist'));
});



gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('html', 'scripts', 'styles', 'assets', 'data', 'rootAssets', 'otherHtml', 'rootCss')
));


gulp.task('watch', function() {
  gulp.watch('index.hbs', gulp.series('html'));
  gulp.watch('src/js/app.js', gulp.series('scripts'));
  gulp.watch('src/styles/main.less', gulp.series('styles'));
  gulp.watch('src/assets/**/*', gulp.series('assets'));
  gulp.watch('src/data/**/*', gulp.series('data'));
  gulp.watch(['*.png', '*.jpg', '*.jpeg', '*.gif', '*.svg', '*.ico', '*.webp'], gulp.series('rootAssets'));
  gulp.watch(['*.html', '!index.html'], gulp.series('otherHtml'));
  gulp.watch(['*.css'], gulp.series('rootCss'));
});