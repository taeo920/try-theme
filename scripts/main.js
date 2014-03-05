// Require Modules
var util = require('./util.js'),
	analytics = require('./analytics.js'),
	social = require('./social.js'),
	ui = require('./ui.js'),
	responsive = require('./responsive.js');

/**
 * Conditionally load polyfills as needed
 */
Modernizr.load([{
	test: util.user.lte8,
	yep: util.urls.theme + '/scripts/vendor/selectivizr.js'
}]);

/**
 * When the DOM's ready, initialize the app
 */
$(function () {
	util.init();
	analytics.init();
	social.init();
	ui.init();
	responsive.init();
});
