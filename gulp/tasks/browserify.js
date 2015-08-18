var gulp         = require('gulp');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var browserify   = require('gulp-browserify');
var watchify     = require('gulp-watchify');
var streamify    = require('gulp-streamify');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');
var paths        = require('../config').paths;

// Hack to enable configurable watchify watching
var watching = false
gulp.task('enable-watch-mode', function() {
	watching = true
});

// Browserify and copy js files
gulp.task('browserify', watchify(function(watchify) {
	return gulp.src(paths.scripts + '/app.js')
		.pipe(plumber({
			errorHandler: handleErrors
		}))
		.pipe(watchify({
			debug: true,
			watch: watching
		}))
		.pipe(gulp.dest(paths.dist + '/scripts'))
		.pipe(streamify(uglify()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dist + '/scripts'))
		.pipe(browserSync.reload({
			stream: true
		}));
}));

gulp.task('watchify', ['enable-watch-mode', 'browserify']);
