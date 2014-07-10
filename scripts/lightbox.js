/*
 *  Module: lightbox
 */

var colorbox    = require('colorbox');

/**
 * Initialize lightboxes
 */
var initLightbox = function() {
	$('.colorbox').colorbox();
};

/**
 * Public API
 * @type {Object}
 */
module.exports = {
	domReady: function() {
		initLightbox();
	}
};