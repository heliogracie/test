var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var src = {
    root    : 'src',
    html    : 'src/html/*.html',
    sass    : 'src/sass/**/*.scss',
    js      : 'src/js/*.js',
    img     : 'src/img/**/*',
    fonts   : 'src/fonts/*'
}

var dest = {
    root    : 'dist',
    html    : 'dist/*.html',
    css     : 'dist/css/',
    js      : 'dist/js',
    img     : 'dist/img/',
    fonts   : 'dist/fonts'
}

gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(gulp.dest(dest.root))
        .pipe(reload({stream: true}));
});

gulp.task('js', function() {
    gulp.src(src.js)
        .pipe(gulp.dest(dest.js))
        .pipe(reload({stream: true}));
});

gulp.task('sass', function() {
    gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer("last 2 version", "ie>=9"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest.css))
        .pipe(reload({stream:true}));
});

gulp.task('copy', function() {
    gulp.src(src.img)
        .pipe(gulp.dest(dest.img));
    gulp.src(src.fonts)
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: dest.root,
        port: 5000
    });
});

gulp.task('watch', ['html', 'sass', 'js', 'copy', 'browser-sync'], function() {
    gulp.watch(src.html, ['html']);
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.fonts, ['copy']);
    gulp.watch(src.img, ['copy']);
});

gulp.task('default', ['watch']);