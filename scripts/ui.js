var flexslider = require('./vendor/jquery.flexslider.js'),
	colorbox = require('./vendor/jquery.colorbox.js');

var featuredSlider;

/**
 * Initializes all lightboxes
 */
var lightboxInit = function() {
	$('.colorbox').colorbox();
};

/**
 * Initializes all sliders
 */
var sliderInit = function () {
	$('.flexslider').flexslider({
		animation: "slide",
		pauseOnHover: true,
		controlsContainer: ".flexslider-container",
		start: function (slider) {
			featuredSlider = slider;
		}
	});
};

////////////////
// Initialize //
////////////////

var init = function () {
	lightboxInit();
	sliderInit();
};

////////////////
// Public API //
////////////////

module.exports = {
	init: init
}
