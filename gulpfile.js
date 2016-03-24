var gulp = require('gulp');
var gulp = require('gulp');
var sass = require('gulp-sass');
//var notify = require('gulp-notify');

// function handleError(){
//   var args = [].slice.call(arguments);
//
//   notify.onError({
//     title: 'compile error',
//     message: '<%= error.message %>'
//   }).apply(this, args);
// }

function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function realPath(xs){
  return './static/' + xs;
}

var styles = [
  'css/login.scss',
  'css/interruptions.scss'
].map(realPath);

gulp.task('sass', function(){
  var handlers = styles.map(function(fileDir){
    return gulp.src(fileDir)
      .pipe(sass({ outputStyle: 'compact' }))
      .on('error', defaultError)
      .pipe(gulp.dest(realPath('css')));
  });
});

gulp.task('watch', function(){
  gulp.watch(['css/**/*.scss'].map(realPath), ['sass']);
});

gulp.task('default', ['sass', 'watch']);
