/*
 *  Main entry point
 */
var $ = require('jquery');
var bootstrap = require('bootstrap');
var util = require('./util.js');
var analytics = require('./analytics.js');
var social = require('./social.js');
var ui = require('./ui.js');
var responsive = require('./responsive.js');

/**
 * Initialize the app on DOM ready
 */
$(function() {
	util.domReady();
	analytics.init();
	social.init();
	ui.domReady();
	responsive.domReady();
});