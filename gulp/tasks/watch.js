var gulp    = require('gulp');
var path    = require('path');
var paths   = require('../config').paths;

gulp.task('watch', ['watchify'], function() {
	// Watch theme .less files
	gulp.watch([
		paths.styles + '/**/*.less',
		'!' + paths.styles + '/admin/**'
	], ['styles']);

	// Watch theme .js files
	gulp.watch([
		paths.scripts + '/**/*.js',
		'!' + paths.scripts + '/admin/**'
	], ['browserify']);

	// Watch editor.less
	gulp.watch(paths.styles + '/admin/editor.less', ['editorStyles']);

	// Watch admin styles
	gulp.watch(paths.styles + '/admin/admin.less', ['adminStyles']);

	// Watch admin scripts
	gulp.watch(paths.scripts + '/admin/admin.js', ['adminScripts']);

	// Watch images
	gulp.watch(paths.images + '/**', ['images']);

});
