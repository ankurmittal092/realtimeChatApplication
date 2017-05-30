// include gulp
var gulp = require('gulp');

// include plug-ins
var rename = require('gulp-rename');

// JS Build Dependencies
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Style build Dependencies
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var gutil = require('gulp-util');

var preprocess = require('gulp-preprocess');

// dev task for compiling less and prefixing (no minification)
gulp.task('devless', function () {

    return gulp.src(['./src/less/style.less'])
        .pipe(less({
          compress: false,
          globalVars: {
              hash: 'dev'
          }
        }).on('error', function(err){
            gutil.log(err);
            this.emit('end');
         }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'not ie < 8', 'ff >= 20', 'last 2 Chrome versions']
         }))
        .pipe(rename('style.css'))
        // .pipe(csscomb())
        .pipe(gulp.dest('./public/css/'))
        .pipe(notify('(DEV)Less Compiled, Prefixed and Minified'));
});

// dev task to compile and concat js files into a bundle
var devjs = gulp.task('devjs', function() {

    return browserify('./src/js/app.js', {debug: false, global: false})
           .bundle()
           .on('error', function(err){
                gutil.log(err);
                this.emit('end');
            })
           .pipe(source('bundle.js'))
           .pipe(gulp.dest('./public/js/'))
           .pipe(notify('(DEV)JS modules Transcompiled, Concatenated and Minified'));

});

// dev task that watches the files for changes and performs respective tasks
gulp.task('watch', function(){
    gulp.watch('./src/less/**/*.less', ['devless']);
    gulp.watch('./src/js/**/*.js', ['devjs']);
})

// prod gulp task which creates respective hbs, js and css files
gulp.task('default', ['devjs', 'devless'], function() {

});