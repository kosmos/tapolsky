var gulp        = require('gulp');
var yaml        = require('gulp-yaml');
var plumber     = require('gulp-plumber');
var changed     = require('gulp-changed');
var mergeJson   = require('gulp-merge-json');
var config      = require('../config');

gulp.task('yaml', function() {
    return gulp.src(config.src.data + '/*.yml')
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }))
        .pipe(mergeJson(config.tmp.jsonFile))
        .pipe(gulp.dest(config.tmp.data));
});


gulp.task('yaml:watch', function() {
    gulp.watch([config.src.data + '/**/*.yml'], ['yaml']);
});
