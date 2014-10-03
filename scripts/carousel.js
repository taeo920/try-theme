/*
 *  Module: carousel
 */

var owlCarousel = require('owlcarousel');

/**
 * Initialize carousels
 */
var initCarousel = function () {
	$('.jsOwlCarousel').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		dots: true,
		autoplay: true,
		autoplayHoverPause: true,
		autowidth: true,
		responsiveBaseElement: window, //for IE8 set to main wrapper
		responsiveClass: true,
		responsive: {
			0: {
				nav: false
			},
			480: {
				nav: true
			}
		},
	});
	var carousel = $('.jsOwlCarousel').data('jsOwlCarousel');
};

/**
 * Public API
 * @type {Object}
 */
module.exports = {
	init: function() {
		initCarousel();
	}
};