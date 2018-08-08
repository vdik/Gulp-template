const gulp = require('gulp'),
 browserSync = require('browser-sync').create(),
 sass = require('gulp-sass'),
 babel = require('gulp-babel'),
 uglify = require('gulp-uglify'),
 fileinclude = require('gulp-file-include');

gulp.task('serve', ()=> {

    browserSync.init({
        server: "./"
    });
    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/js/*.js", ['js']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("html/*.html",['fileinclude']);
});

gulp.task('sass', ()=> {
    gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('../static/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', ()=> {
    gulp.src('assets/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('../static/js'))
        .pipe(browserSync.stream());
});

gulp.task('fileinclude', function() {
    gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'html/'
        }))
        .pipe(gulp.dest('../static/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve','fileinclude']);