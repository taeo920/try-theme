var gulp    = require('gulp');
var path    = require('path');
var paths   = require('../config').paths;

gulp.task('watch', ['watchify'], function() {
	// Watch theme .scss files
	gulp.watch([
		paths.styles + '/**/*.scss',
		'!' + paths.styles + '/admin/**'
	], ['styles']);

	// Watch theme .js files
	gulp.watch([
		paths.scripts + '/**/*.js',
		'!' + paths.scripts + '/admin/**'
	], ['browserify']);

	// Watch editor.scss
	gulp.watch(paths.styles + '/admin/editor.scss', ['editorStyles']);

	// Watch admin styles
	gulp.watch(paths.styles + '/admin/admin.scss', ['adminStyles']);

	// Watch admin scripts
	gulp.watch(paths.scripts + '/admin/admin.js', ['adminScripts']);

	// Watch images
	gulp.watch(paths.images + '/**', ['images']);

});
