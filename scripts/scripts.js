/*
 *  Main entry point
 */

require('es5-shim');
require('consolelog');

var $               = require('jquery');
var analytics		= require('./analytics.js');
var carousel        = require('./carousel.js');
var responsive      = require('./responsive.js');
var social 			= require('./social.js');
var ui				= require('./ui.js');

/**
 * Initialize the app on DOM ready
 */
$(function() {
	analytics.init(
        addGA: false,
		gtmid: ''
	);
	carousel.init();
	social.init({
		fbAppId: ''
	});
	responsive.init();
	ui.init();
});