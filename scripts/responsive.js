/*
 *  Module: Responsive
 *  Fire callbacks on breakpoint change
 */

var enquire = require('enquire');

/**
 * Monitors window size for breakpoints
 */
var monitorBreakpoints = function () {
	enquire.
		register("screen and (max-width: 767px)", { // Mobile: All
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('mobile: all');
			},
			unmatch: function() {}
		}).
		register("screen and (max-width: 479px)", { // Mobile: Portrait
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('mobile: portrait');
			},
			unmatch: function() {}
		}).
		register("screen and (min-width: 480px) and (max-width: 767px)", { // Mobile: Landscape
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('mobile: landscape');
			},
			unmatch: function() {}
		}).
		register("screen and (min-width: 768px) and (max-width: 1023px)", { // Tablet: Portrait
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('tablet: portrait');
			},
			unmatch: function() {}
		}).
		register("screen and (min-width: 1024px) and (max-width: 1279px)", { // Desktop: Standard
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('desktop: 1024px');
			},
			unmatch: function() {}
		}).
		register("screen and (min-width: 1280px)", { // Desktop: Wide format
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('wide format: 1280px');
			},
			unmatch: function() {}
		});
};

/**
 * Public API
 */
module.exports = {
	domReady: monitorBreakpoints
};