SITE.ui = (function(window, s) {

	///////////////
	// Variables //
	///////////////


	/////////////////////
	// Private Methods //
	/////////////////////

	/**
	 * Initializes all lightboxes
	 * @return {true}
	 */
	var lightboxInit = function() {
		$('.lightbox').colorbox();
		return true;
	};

	/**
	 * Initializes all sliders
	 * @return {true}
	 */
	var sliderInit = function () {
		$('.flexslider').flexslider({
			animation: "slide",
			pauseOnHover: true,
			controlsContainer: ".flexslider-container",
			start: function (slider) {
				SITE.ui.featured_slider = slider;
			}
		});
		return true;
	};

	////////////////////
	// Event Handlers //
	////////////////////


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

	return {
		init: init
	}

}(window, SITE));