var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch',
    ['copy:watch',

    'jade:watch',
    'iconfont:watch',
    'sprite:svg:watch',
    'sprite:png:watch',
    'svgo:watch',
    'webpack:watch',
    'sassLint:watch',
    'sass:watch',
    'yaml:watch'
]);
