/*
 *  Main entry point
 */

var $ = require('jquery');
var bootstrap = require('bootstrap');
var util = require('./util.js');
var analytics = require('./analytics.js');
var social = require('./social.js');
var carousel = require('./carousel.js');
var lightbox = require('./lightbox.js');
var ui = require('./ui.js');
var responsive = require('./responsive.js');

/**
 * Initialize the app on DOM ready
 */
$(function() {
	util.init();
	ui.init();
	analytics.init({ gaid: "UA-NNNNNN-N" });
	social.init({ fbAppID: "" });
	carousel.init();
	lightbox.init();
	responsive.init();
});