/*
 *  Main entry point
 */

var $ = require('jquery');
var bootstrap = require('bootstrap');
var util = require('./util.js');
var carousel = require('./carousel.js');
var lightbox = require('./lightbox.js');
var ui = require('./ui.js');
var responsive = require('./responsive.js');
var SocialModule = require('./social.js');
var AnalyticsModule = require('./analytics.js');

var social = new SocialModule({ fbAppID: "" });
var analytics = new AnalyticsModule({ gaid: "" });

/**
 * Initialize the app on DOM ready
 */
$(function() {
	util.init();
	ui.init();
	analytics.init();
	social.init();
	carousel.init();
	lightbox.init();
	responsive.init();
});