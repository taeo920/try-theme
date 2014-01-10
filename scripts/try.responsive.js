SITE.responsive = (function(window, s) {

	// Create new functions or call ones from other modules
	// to change behavior on window resize.
	// ex. remove a widget and ajax in a new one

	///////////////
	// Variables //
	///////////////

	var $window = $(window);

	/////////////////////
	// Private Methods //
	/////////////////////

	/**
	 * Monitors window size for breakpoints
	 * @return {true}
	 */
	var responsiveInit = function () {
		$window.setBreakpoints({
			breakpoints: [ 320, 480, 768, 1024 ]
		});
	};

	////////////////////
	// Event Handlers //
	////////////////////

	$window.on('enterBreakpoint320', function() {
		console.log('entering 320');
	});

	$window.on('exitBreakpoint320', function() {
		console.log('exiting 320');
	});

	$window.on('enterBreakpoint480', function() {
		console.log('entering 480');
	});

	$window.on('exitBreakpoint480', function() {
		console.log('exiting 480');
	});

	$window.on('enterBreakpoint768', function() {
		console.log('entering 768');
	});

	$window.on('exitBreakpoint768', function() {
		console.log('exiting 768');
	});

	$window.on('enterBreakpoint1024', function() {
		console.log('entering 1024');
	});

	$window.on('exitBreakpoint1024', function() {
		console.log('exiting 1024');
	});

	////////////////
	// Initialize //
	////////////////

	var init = function () {
		responsiveInit();
	};

	////////////////
	// Public API //
	////////////////

	return {
		init: init
	}

}(window, SITE));