/*
 *  Module: carousel
 */

var owlCarousel = require('owlcarousel');

/**
 * Initialize carousels
 */
function initCarousel() {
	$('.js-owlCarousel').owlCarousel({
		items: 1,
		itemsCustom: [
			[0, 1]
		],
		rewindNav: true,
		navigation: true,
		navigationText: ["<", ">"], // use icon font to display arrows
		pagination: true,
		autoplay: true,
		stopOnHover: true,
		responsiveBaseWidth: window //for IE8 set to main wrapper
	});
};

/**
 * Destroy carousel
 * @param  {string} selector The selector of the carousel to destroy
 * @return {boolean}         True if carousel destroyed
 */
function destroyCarousel(selector) {
	if ( $(selector).length ) {
		$(selector).data('owlCarousel').destroy();
		return true;
	}
	return false;
}

/**
 * Public API
 * @type {Object}
 */
module.exports = {
	init: function() {
		initCarousel();
	}
};