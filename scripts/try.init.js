SITE.init = (function (window, s) {

	var lte8 = s.user.lte8;

	/**
	 * Conditionally load polyfills as needed
	 */
	Modernizr.load([
	{
		test: lte8,
		yep: urls.theme + '/scripts/vendor/selectivizr.js'
	}
	]);

	/**
	 * When the DOM's ready, initialize the app
	 */
	$(function () {
		s.util.init();
		s.analytics.init();
		s.social.init();
		s.ui.init();
		s.responsive.init();
	});

	return true;

}(window, SITE));