var gulp = require('gulp');
var sass = require('gulp-sass');

function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function dist(path){
  return './dist/' + path;
}

function realPath(xs){
  return './static/' + xs;
}

gulp.task('sass', function(){
  return gulp.src('./static/css/*.scss')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', defaultError)
    .pipe(gulp.dest(dist('css')));
});

gulp.task('watch', function(){
  gulp.watch(['css/**/*.scss'].map(realPath), ['sass']);
});

gulp.task('default', ['sass', 'watch']);
