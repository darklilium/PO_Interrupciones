var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

function handleError(){
  var args = [].slice.call(arguments);

  notify.onError({
    title: 'compile error',
    message: '<%= error.message %>'
  }).apply(this, args);
}

function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function realPath(xs){
  return './static/' + xs;
}

var apps = [
  //example
  //{ input: 'js/apps/example_app.jsx', output:'example.bundle.js'}
];

var styles = [].map(realPath);

gulp.task('css', function(){
  var g = gulp.src(styles)
    .pipe(stylus({compress: true}))
    .on('error', defaultError('stylus'))
    .pipe(gulp.dest(realPath('css/')));

  return g;
});

gulp.task('build', function(){
  apps.forEach(function(opt){
    var choices = {
      entries: [realPath(opt.input)],
      extensions: ['.js', '.jsx']
    };

    var presets = {presets: ['es2015', 'react']};

    browserify(choices)
      .transform(babelify.configure(presets))
      .bundle()
      .on('error', handleError)
      .pipe(source(opt.output))
      .pipe(gulp.dest(realPath('js/bundles')));
  });
});

gulp.task('watch', function(){
  gulp.watch([
    'js/components/**/*',
    'js/services/*',
    'js/apps/*',
    'js/actions/*',
    'js/stores/*'
  ].map(realPath), ['build']);

  gulp.watch(['css/**/*.styl'].map(realPath), ['css']);
});


gulp.task('default', ['css', 'build', 'watch']);
