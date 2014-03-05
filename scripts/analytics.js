/**
 * Logs an event to Google Analytics using the element's data attributes.
 * Adapted from Ben Plum's Scout plugin: https://github.com/benplum/Scout
 * @param  {object} e The event that fired the function
 * @return {bool}   true
 */
var trackEvent = function (e) {
	e.preventDefault();

	var $el = $(this),
		url = $el.attr("href"),
		data = $el.data("track-event").split(",");

	// Trim whitespace from data
	for (var i in data) {
		data[i] = $.trim(data[i]);
	}

	// Push data: category, action, label, value
	ga('send', 'event', data[0], data[1], (url || data[2]), data[3] );

	// If active link, launch it!
	if (url) {
		// Delay based on Google's outbound link handler:
		// http://support.google.com/analytics/bin/answer.py?hl=en&answer=1136920
		setTimeout(function() {
			// Check window target
			if ($el.attr("target")) {
				window.open(url, $el.attr("target"));
			} else {
				document.location.href = url;
			}
		}, 100);
	}
};

////////////////////
// Event Handlers //
////////////////////

$(document).on('click', '[data-track-event]', trackEvent);

////////////////
// Initialize //
////////////////

var init = function () {
	// code to run on DOM ready...
};

////////////////
// Public API //
////////////////

module.exports = {
	init: init,
	trackEvent: trackEvent
}