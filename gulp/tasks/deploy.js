var gulp        = require('gulp');
var gutil       = require( 'gulp-util' );
var runSequence = require('run-sequence');
var ghPages     = require('gulp-gh-pages');
var ftp         = require( 'vinyl-ftp' );
var config      = require('../config');
// var ftpConfig   = require('../../ftpconfig');

function deply(cb) {
    runSequence(
        'build',
        'push:gh-pages',
        cb
    );
}

// Deploy project to github pages
gulp.task('push:gh-pages', function() {
    return gulp.src(config.dest.root + '/**/*')
        .pipe(ghPages());
});

// Deploy project to ftp
gulp.task('push:ftp', function() {
    var conn = ftp.create( {
       host:     ftpConfig.config.host,
       user:     ftpConfig.config.user,
       password: ftpConfig.config.password,
       parallel: 1,
       log:      gutil.log
   } );

   // using base = '.' will transfer everything to /public_html correctly
   // turn off buffering in gulp.src for best performance

   return gulp.src(config.dest.root + '/**/*' )
       .pipe( conn.newer( ftpConfig.config.dir ) ) // only upload newer files
       .pipe( conn.dest( ftpConfig.config.dir ) );
});

gulp.task('deploy', function(cb) {
    deply(cb);
});
