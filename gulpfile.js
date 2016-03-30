var gulp = require('gulp');
var sass = require('gulp-sass');
var swig = require('gulp-swig');

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

gulp.task('templates', function(){
  return gulp.src(['./*.html','!./base.html'])
    .pipe(swig())
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('libs', function(){
  return gulp.src('./static/js/vendor/*.js')
    .pipe(gulp.dest(dist('js/vendor')));
});

gulp.task('watch', function(){
  gulp.watch(['css/**/*.scss'].map(realPath), ['sass']);
  gulp.watch(['*.html'], ['templates']);
});

gulp.task('default', ['sass', 'templates', 'libs', 'watch']);
