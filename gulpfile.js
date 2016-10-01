const gulp= require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const concat =  require('gulp-concat');
const uglify =  require('gulp-uglify');
const minifyCss =  require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const inject =  require('gulp-inject');
const jshint =  require('gulp-jshint');
const wiredep = require('wiredep').stream;

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  gulp.watch(['./src/js/**/*.js','./src/css/**/*.css'], ['build']);
});

gulp.task('bower', function () {
  gulp.src('./src/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('copyImages', function () {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
  	.pipe(gulp.dest('./dist/images'));
});

gulp.task('uglifyJs',function () {
  return gulp
    .src('src/js/**/*.js')
    .pipe(concat('finalJs.js'))
    .pipe(uglify())
  	.pipe(gulp.dest('./dist/'));
});

gulp.task('minifyCss',function () {
  return gulp
    .src('src/css/**/*.css')
    .pipe(concat('finalCss.css'))
    .pipe(minifyCss())
  	.pipe(gulp.dest('./dist/'));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['dist/**/*.js', 'dist/**/*.css'], {read: false});
  return target.pipe(inject(sources,{ addRootSlash:false,ignorePath: 'dist/'}))
    .pipe(wiredep({}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build',function(callback){
	runSequence('clean',
				      'jshint',
              ['copyImages', 'minifyCss', 'uglifyJs'],
              'inject',
              callback);
});