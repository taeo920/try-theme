var SITE = (typeof SITE === "undefined") ? {} : SITE;
var urls = (typeof urls === "undefined") ? {} : urls;

/**
 * Useful information about the user/browser/device
 * @type {Object}
 */
SITE.user = {
	mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false,
	lte8: $('html').hasClass('lte8') ? true : false
};

// @codekit-append 'vendor/jquery.breakpoints.js';
// @codekit-append 'vendor/jquery.flexslider.js';
// @codekit-append 'vendor/jquery.colorbox.js';
// @codekit-append 'try.util.js';
// @codekit-append 'try.analytics.js';
// @codekit-append 'try.social.js';
// @codekit-append 'try.ui.js';
// @codekit-append 'try.responsive.js';
// @codekit-append 'try.init.js';