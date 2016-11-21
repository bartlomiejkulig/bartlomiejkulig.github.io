
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser_sync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')//jak dodamy foldery to tutaj zmienic
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('css'));
});

gulp.task('browser_sync', function (){
  var files = [
      '*.html',
      'css/*.css'
  ];
  browser_sync.init(files, {
      server: {
          baseDir: './'
      }
  });
});

gulp.task('watch', ['sass'], function (){
    gulp.watch('scss/*.scss', ['sass']);//jak dodamy foldery to tutaj zmienic
});

gulp.task('default', ['watch', 'browser_sync'], function() {});
