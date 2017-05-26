var gulp   = require('gulp');
var config = require('../config.js');
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:php', function() {
    return gulp
        .src(config.src.php + '/*.php')
        .pipe(gulp.dest(config.dest.php));
});

gulp.task('copy:cname', function() {
    return gulp
        .src(config.src.root + '/CNAME')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:audio', function() {
    return gulp
        .src(config.src.audio + '/*.{mp3,wav,ogg}')
        .pipe(gulp.dest(config.dest.audio));
});

gulp.task('copy:lib', function() {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function() {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,mp4,webm,ogv}',
            config.src.blocks + '/**/*.{jpg,png,jpeg,svg,gif,mp4,webm,ogv}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(changed('build/img'))
        .pipe(flatten())
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', [
    'copy:img',
    // 'copy:rootfiles',
    // 'copy:lib',
    'copy:audio',
    'copy:fonts',
    'copy:php',
    'copy:cname'
]);
gulp.task('copy:watch', function() {
    gulp.watch([config.src.img+'/*',config.src.blocks + '/**/*.{jpg,png,jpeg,svg,gif}'], ['copy']);
});
