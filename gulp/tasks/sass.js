var gulp         = require('gulp');
var sass         = require('gulp-sass');
var include      = require("gulp-include");
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var csso         = require('postcss-csso');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var config       = require('../config');
var sassLint     = require('gulp-sass-lint');

var debug = require('postcss-debug').createDebugger()


// Processors for scss task
var processors = [
    autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries
    }),
    csso({
        restructure: true,
        sourceMap: true,
        debug: true
    })
];

gulp.task('sass', function() {
    return gulp
        .src(config.src.sass + '/*.{sass,scss}')
        .pipe(include())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
            precision: 5
        }))
        .on('error', config.errorHandler)
        .pipe(postcss(debug(processors)))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch([config.src.sass + '/**/*.{sass,scss}', config.src.blocks + '/**/*.{sass,scss}'], ['sass']);
});

gulp.task('css-debug', ['sass'], function () {
    // 3rd change: open the web inspector
    debug.inspect()
})

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}

gulp.task('sassLint', function() {
    return gulp
        .src(config.src.root + '/**/[^_]*.{sass,scss}')
        .pipe(sassLint(
            {
                configFile: '.sass-lint.yml'
            }
        ))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('sassLint:watch', function() {
    gulp.watch([config.src.root + '/**/[^_]*.{sass,scss}'], ['sassLint']);
});
