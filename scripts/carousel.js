/*
 *  Module: carousel
 */

// Using Owl Carousel v2
require('./vendor/jquery.owl.carousel');

var $ 			= require('jquery');
var $carousel 	= $('.js-carousel');

/**
 * Initialize carousels
 */
function init() {
	$carousel.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
	    if (!event.namespace) return;
	    var carousel = event.relatedTarget,
	        element = event.target,
	        current = carousel.current();
	    $('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
	    $('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
	});

	$carousel.owlCarousel({
		items: 1,
		nav: true,
		navText: ['<', '>'], // use icon font to display arrows
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		rewind: false,
		responsive: {
			0: {
				nav: false
			},
			768: {
				nav: true
			}
		}
	});
};

/**
 * Destroy carousel
 * @param  {string} selector The selector of the carousel to destroy
 * @return {boolean}         True if carousel destroyed
 */
function destroy(selector) {
	if ( $carousel.length ) {
		$carousel.data('owlCarousel').destroy();
		return true;
	}
	return false;
}

/**
 * Public API
 * @type {Object}
 */
module.exports = {
	init: init,
	destroy: destroy
};