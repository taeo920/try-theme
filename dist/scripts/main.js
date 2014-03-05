require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/analytics.js","/")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Require Modules
var util = require('./util.js'),
	analytics = require('./analytics.js'),
	social = require('./social.js'),
	ui = require('./ui.js'),
	responsive = require('./responsive.js');

/**
 * Conditionally load polyfills as needed
 */
Modernizr.load([{
	test: util.user.lte8,
	yep: util.urls.theme + '/scripts/vendor/selectivizr.js'
}]);

/**
 * When the DOM's ready, initialize the app
 */
$(function () {
	util.init();
	analytics.init();
	social.init();
	ui.init();
	responsive.init();
});

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_d1660da2.js","/")
},{"./analytics.js":1,"./responsive.js":3,"./social.js":4,"./ui.js":5,"./util.js":6,"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var enquire = require('./vendor/enquire.js');

/**
 * Monitors window size for breakpoints
 */
var init = function () {
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
		register("screen and (min-width: 1024px) and (max-width: 1279px)", { // Desktop
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('desktop: 1024px');
			},
			unmatch: function() {}
		}).
		register("screen and (min-width: 1280px)", { // Wide format
			deferSetup: true,
			setup: function() {},
			match: function() {
				console.log('wide format: 1280px');
			},
			unmatch: function() {}
		});
};

////////////////
// Public API //
////////////////

module.exports = {
	init: init
}
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/responsive.js","/")
},{"./vendor/enquire.js":7,"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Adds the Facebook JavaScript SDK and initializes the Facebook app
 * @return {true}
 */
var fbInit = function() {
	$('body').append('<div id="fb-root"></div>');

	// Asynchronously load fb jssdk
	var e = document.createElement('script');
	e.async = true;
	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
	document.getElementById('fb-root').appendChild(e);

	// Initialize Facebook app
	fbAsyncInit = function() {
		FB.init({
			appId: '', // App ID from the App Dashboard
			status: false, // check the login status upon init?
			cookie: true, // set sessions cookies to allow your server to access the session?
			xfbml: true // parse XFBML tags on this page?
		});

		//FB.Canvas.setAutoGrow();
		//FB.Canvas.scrollTo(0, 0);
	};

	return true;
};

/**
 * Pops a Facebook 'share to wall' dialog using the element's data attributes
 * @param  {object} el The target of the event
 * @return {true}
 */
var fbShare = function(el) {
	var $el = $(el),
		name = $el.data('name') || '',
		description = $el.data('description') || '',
		link = $el.data('link') || '',
		caption = $el.data('caption') || '';

	// Open Facebook share dialog
	FB.ui({
		method: 'feed',
		name: name,
		link: link,
		picture: urls.theme + '/images/fb-share.jpg',
		caption: caption,
		description: description
	});

	// Track Facebook share button click
	ga('send', 'event', 'Facebook Share', 'click');

	return true;
};

/**
 * Pops a Tweet dialog box using information from a button's data attributes
 * @param  {object} el The target of the event
 * @return {string}    The twitter url needed to pop the dialog with the correct info
 */
var twitterShare = function(el) {
	var $el = $(el),
		url = $el.data('url') || s.urls.base,
		text = $el.data('text') || '',
		hashtags = $el.data('hashtags') || '',
		tweeturl = 'http://twitter.com/share?url=' + encodeURI(url) + '&text=' + text + '&hashtags=' + hashtags;

	// Track tweet button click
	ga('send', 'event', 'Twitter Share', 'click');

	return tweeturl;
};

////////////////////
// Event Handlers //
////////////////////

$('.facebook-share').on('click', function(e) {
	e.preventDefault();
	fbShare(e.target);
});

$('.twitter-share').on('click', function(e) {
	var href = twitterShare(e.target);
	$(this).attr('href', href);
	return true;
});

////////////////
// Initialize //
////////////////

var init = function() {
	fbInit();
};

////////////////
// Public API //
////////////////

module.exports = {
	init: init,
	fbShare: fbShare,
	twitterShare: twitterShare
};
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/social.js","/")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var flexslider = require('./vendor/jquery.flexslider.js'),
	colorbox = require('colorbox');

var featuredSlider;

/**
 * Initializes all lightboxes
 * @return {true}
 */
var lightboxInit = function() {
	$('.colorbox').colorbox();
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
			featuredSlider = slider;
		}
	});
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

module.exports = {
	init: init
}

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/ui.js","/")
},{"./vendor/jquery.flexslider.js":12,"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13,"colorbox":"jWmBH/"}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var urls = (typeof urls === "undefined") ? {} : urls;
var user = {
	mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false,
	lte8: $('html').hasClass('lte8') ? true : false
};

/**
 * Avoid `console` errors in browsers that lack a console.
 * @return {bool} [description]
 */
var consoleFallback = function() {
	var method;
	var noop = function() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}

	return true;
};

/**
 * Basic debug that writes to the console
 * @param  {array} arr   Array to be debugged
 * @param  {num}   level Number of levels deep to traverse
 */
var debug = function(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += debug(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}

	console.log( dumped_text );

	return dumped_text;
};

////////////////
// Initialize //
////////////////

var init = function () {
	consoleFallback();
};

////////////////
// Public API //
////////////////

module.exports = {
	init: init,
	urls: urls,
	user: user,
	debug: debug
}
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util.js","/")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

;(function (name, context, factory) {
	var matchMedia = window.matchMedia;

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory(matchMedia);
	}
	else if (typeof define === 'function' && define.amd) {
		define(function() {
			return (context[name] = factory(matchMedia));
		});
	}
	else {
		context[name] = factory(matchMedia);
	}
}('enquire', this, function (matchMedia) {

	'use strict';

    /*jshint unused:false */
    /**
     * Helper function for iterating over a collection
     *
     * @param collection
     * @param fn
     */
    function each(collection, fn) {
        var i      = 0,
            length = collection.length,
            cont;

        for(i; i < length; i++) {
            cont = fn(collection[i], i);
            if(cont === false) {
                break; //allow early exit
            }
        }
    }

    /**
     * Helper function for determining whether target object is an array
     *
     * @param target the object under test
     * @return {Boolean} true if array, false otherwise
     */
    function isArray(target) {
        return Object.prototype.toString.apply(target) === '[object Array]';
    }

    /**
     * Helper function for determining whether target object is a function
     *
     * @param target the object under test
     * @return {Boolean} true if function, false otherwise
     */
    function isFunction(target) {
        return typeof target === 'function';
    }

    /**
     * Delegate to handle a media query being matched and unmatched.
     *
     * @param {object} options
     * @param {function} options.match callback for when the media query is matched
     * @param {function} [options.unmatch] callback for when the media query is unmatched
     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
     * @constructor
     */
    function QueryHandler(options) {
        this.options = options;
        !options.deferSetup && this.setup();
    }
    QueryHandler.prototype = {

        /**
         * coordinates setup of the handler
         *
         * @function
         */
        setup : function() {
            if(this.options.setup) {
                this.options.setup();
            }
            this.initialised = true;
        },

        /**
         * coordinates setup and triggering of the handler
         *
         * @function
         */
        on : function() {
            !this.initialised && this.setup();
            this.options.match && this.options.match();
        },

        /**
         * coordinates the unmatch event for the handler
         *
         * @function
         */
        off : function() {
            this.options.unmatch && this.options.unmatch();
        },

        /**
         * called when a handler is to be destroyed.
         * delegates to the destroy or unmatch callbacks, depending on availability.
         *
         * @function
         */
        destroy : function() {
            this.options.destroy ? this.options.destroy() : this.off();
        },

        /**
         * determines equality by reference.
         * if object is supplied compare options, if function, compare match callback
         *
         * @function
         * @param {object || function} [target] the target for comparison
         */
        equals : function(target) {
            return this.options === target || this.options.match === target;
        }

    };
    /**
     * Represents a single media query, manages it's state and registered handlers for this query
     *
     * @constructor
     * @param {string} query the media query string
     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
     */
    function MediaQuery(query, isUnconditional) {
        this.query = query;
        this.isUnconditional = isUnconditional;
        this.handlers = [];
        this.mql = matchMedia(query);

        var self = this;
        this.listener = function(mql) {
            self.mql = mql;
            self.assess();
        };
        this.mql.addListener(this.listener);
    }
    MediaQuery.prototype = {

        /**
         * add a handler for this query, triggering if already active
         *
         * @param {object} handler
         * @param {function} handler.match callback for when query is activated
         * @param {function} [handler.unmatch] callback for when query is deactivated
         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
         */
        addHandler : function(handler) {
            var qh = new QueryHandler(handler);
            this.handlers.push(qh);

            this.matches() && qh.on();
        },

        /**
         * removes the given handler from the collection, and calls it's destroy methods
         * 
         * @param {object || function} handler the handler to remove
         */
        removeHandler : function(handler) {
            var handlers = this.handlers;
            each(handlers, function(h, i) {
                if(h.equals(handler)) {
                    h.destroy();
                    return !handlers.splice(i,1); //remove from array and exit each early
                }
            });
        },

        /**
         * Determine whether the media query should be considered a match
         * 
         * @return {Boolean} true if media query can be considered a match, false otherwise
         */
        matches : function() {
            return this.mql.matches || this.isUnconditional;
        },

        /**
         * Clears all handlers and unbinds events
         */
        clear : function() {
            each(this.handlers, function(handler) {
                handler.destroy();
            });
            this.mql.removeListener(this.listener);
            this.handlers.length = 0; //clear array
        },

        /*
         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
         */
        assess : function() {
            var action = this.matches() ? 'on' : 'off';

            each(this.handlers, function(handler) {
                handler[action]();
            });
        }
    };
    /**
     * Allows for registration of query handlers.
     * Manages the query handler's state and is responsible for wiring up browser events
     *
     * @constructor
     */
    function MediaQueryDispatch () {
        if(!matchMedia) {
            throw new Error('matchMedia not present, legacy browsers require a polyfill');
        }

        this.queries = {};
        this.browserIsIncapable = !matchMedia('only all').matches;
    }

    MediaQueryDispatch.prototype = {

        /**
         * Registers a handler for the given media query
         *
         * @param {string} q the media query
         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
         * @param {function} options.match fired when query matched
         * @param {function} [options.unmatch] fired when a query is no longer matched
         * @param {function} [options.setup] fired when handler first triggered
         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
         */
        register : function(q, options, shouldDegrade) {
            var queries         = this.queries,
                isUnconditional = shouldDegrade && this.browserIsIncapable;

            if(!queries[q]) {
                queries[q] = new MediaQuery(q, isUnconditional);
            }

            //normalise to object in an array
            if(isFunction(options)) {
                options = { match : options };
            }
            if(!isArray(options)) {
                options = [options];
            }
            each(options, function(handler) {
                queries[q].addHandler(handler);
            });

            return this;
        },

        /**
         * unregisters a query and all it's handlers, or a specific handler for a query
         *
         * @param {string} q the media query to target
         * @param {object || function} [handler] specific handler to unregister
         */
        unregister : function(q, handler) {
            var query = this.queries[q];

            if(query) {
                if(handler) {
                    query.removeHandler(handler);
                }
                else {
                    query.clear();
                    delete this.queries[q];
                }
            }

            return this;
        }
    };

	return new MediaQueryDispatch();

}));
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/vendor/enquire.js","/vendor")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],"breakpoints":[function(require,module,exports){
module.exports=require('UtTr5d');
},{}],"UtTr5d":[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*
	Breakpoints.js
	version 1.1

	Creates handy events for your responsive design breakpoints

	Copyright 2011 XOXCO, Inc
	http://xoxco.com/

	Altered by Josh Lawrence

	Documentation for this plugin lives here:
	http://xoxco.com/projects/code/breakpoints

	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

*/
(function(window, $) {

	var lastSize = 0;

	$.fn.resetBreakpoints = function() {
		$(window).unbind('resize');
		if (interval) {
			clearInterval(interval);
		}
		lastSize = 0;
	};

	$.fn.setBreakpoints = function(settings) {

		var options = jQuery.extend({
			distinct: true,
			breakpoints: new Array(320, 480, 768, 1024)
		}, settings);


		function updateBreakpoints() {

			var w = $(window).width();
			var done = false;

			for (var bp in options.breakpoints.sort(function(a,b) { return (b-a) })) {

				// fire onEnter when a browser expands into a new breakpoint
				// if in distinct mode, remove all other breakpoints first.
				if (!done && w >= options.breakpoints[bp] && lastSize < options.breakpoints[bp]) {
					if (options.distinct) {
						for (var x in options.breakpoints.sort(function(a,b) { return (b-a) })) {
							if ($('body').hasClass('breakpoint-' + options.breakpoints[x])) {
								$('body').removeClass('breakpoint-' + options.breakpoints[x]);
								$(window).trigger('exitBreakpoint' + options.breakpoints[x]);
							}
						}
						done = true;
					}
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('enterBreakpoint' + options.breakpoints[bp]);

				}

				// fire onExit when browser contracts out of a larger breakpoint
				if (w < options.breakpoints[bp] && lastSize >= options.breakpoints[bp]) {
					$('body').removeClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('exitBreakpoint' + options.breakpoints[bp]);

				}

				// if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
				if (
					options.distinct && // only one breakpoint at a time
					w >= options.breakpoints[bp] && // and we are in this one
					w < options.breakpoints[bp-1] && // and smaller than the bigger one
					lastSize > w && // and we contracted
					lastSize >0 &&  // and this is not the first time
					!$('body').hasClass('breakpoint-' + options.breakpoints[bp]) // and we aren't already in this breakpoint
					) {
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('enterBreakpoint' + options.breakpoints[bp]);

				}
			}

			// set up for next call
			if (lastSize != w) {
				lastSize = w;
			}
		};

		// trigger breakpoint update on load
		updateBreakpoints();

		// trigger breakpoint update on window resize
		$(window).resize(function() {
			if (this.resizeTo) clearTimeout(this.resizeTo);
			this.resizeTo = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 250);
		});

		$(window).on('resizeEnd', updateBreakpoints);

	};

})(window, jQuery);

; browserify_shim__define__module__export__(typeof breakpoints != "undefined" ? breakpoints : window.breakpoints);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/vendor/jquery.breakpoints.js","/vendor")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],"jWmBH/":[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*!
	Colorbox v1.5.2 - 2014-02-28
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		// data sources
		html: false,
		photo: false,
		iframe: false,
		inline: false,

		// behavior and appearance
		transition: "elastic",
		speed: 300,
		fadeOut: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		opacity: 0.9,
		preloading: true,
		className: false,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined,
		closeButton: true,
		fastIframe: true,
		open: false,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,

		// alternate image paths for high-res displays
		retinaImage: false,
		retinaUrl: false,
		retinaSuffix: '@2x.$1',

		// internationalization
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		// accessbility
		returnFocus: true,
		trapFocus: true,

		// callbacks
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,

		rel: function() {
			return this.rel;
		},
		href: function() {
			// Using .attr() so that the href can also be used to provide a selector for inline content
			return $(this).attr('href');
		},
		title: function() {
			return this.title;
		}
	},


	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',
	
	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	$events = $('<a/>'), // $({}) would be prefered, but there is an issue with jQuery 1.4.2
	
	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	requests = 0,
	previousCSS = {},
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Convenience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}
	
	// Get the window height using innerHeight when available to avoid an issue with iOS
	// http://bugs.jquery.com/ticket/6724
	function winheight() {
		return window.innerHeight ? window.innerHeight : $(window).height();
	}

	function Settings(element, options) {
		if (options !== Object(options)) {
			options = {};
		}

		this.cache = {};
		this.el = element;
		this.get = function(key) {
			var dataAttr;
			var value;

			if (this.cache[key] !== undefined) {
				value = this.cache[key];
			} else {
				dataAttr = $(this.el).attr('data-cbox-'+key);

				if (dataAttr !== undefined) {
					value = dataAttr;
				} else if (options[key] !== undefined) {
					value = options[key];
				} else if (defaults[key] !== undefined) {
					value = defaults[key];
				}
				this.cache[key] = value;
			}

			return $.isFunction(value) ? value.call(this.el) : value;
		};
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by the regex.
	function isImage(settings, url) {
		return settings.get('photo') || settings.get('photoRegex').test(url);
	}

	function retinaUrl(settings, url) {
		return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;
	}

	function trapFocus(e) {
		if ('contains' in $box[0] && !$box[0].contains(e.target)) {
			e.stopPropagation();
			$box.focus();
		}
	}

	function setClass(str) {
		if (setClass.str !== str) {
			$box.add($overlay).removeClass(setClass.str).addClass(str);
			setClass.str = str;
		}
	}

	function getRelated() {
		index = 0;
		
		if (rel && rel !== 'nofollow') {
			$related = $('.' + boxElement).filter(function () {
				var options = $.data(this, colorbox);
				var settings = new Settings(this, options);
				return (settings.get('rel') === rel);
			});
			index = $related.index(settings.el);
			
			// Check direct calls to Colorbox.
			if (index === -1) {
				$related = $related.add(settings.el);
				index = $related.length - 1;
			}
		} else {
			$related = $(settings.el);
		}
	}

	function trigger(event) {
		// for external use
		$(document).trigger(event);
		// for internal use
		$events.triggerHandler(event);
	}

	var slideshow = (function(){
		var active,
			className = prefix + "Slideshow_",
			click = "click." + prefix,
			timeOut;

		function clear () {
			clearTimeout(timeOut);
		}

		function set() {
			if (settings.get('loop') || $related[index + 1]) {
				clear();
				timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));
			}
		}

		function start() {
			$slideshow
				.html(settings.get('slideshowStop'))
				.unbind(click)
				.one(click, stop);

			$events
				.bind(event_complete, set)
				.bind(event_load, clear);

			$box.removeClass(className + "off").addClass(className + "on");
		}

		function stop() {
			clear();
			
			$events
				.unbind(event_complete, set)
				.unbind(event_load, clear);

			$slideshow
				.html(settings.get('slideshowStart'))
				.unbind(click)
				.one(click, function () {
					publicMethod.next();
					start();
				});

			$box.removeClass(className + "on").addClass(className + "off");
		}

		function reset() {
			active = false;
			$slideshow.hide();
			clear();
			$events
				.unbind(event_complete, set)
				.unbind(event_load, clear);
			$box.removeClass(className + "off " + className + "on");
		}

		return function(){
			if (active) {
				if (!settings.get('slideshow')) {
					$events.unbind(event_cleanup, reset);
					reset();
				}
			} else {
				if (settings.get('slideshow') && $related[1]) {
					active = true;
					$events.one(event_cleanup, reset);
					if (settings.get('slideshowAuto')) {
						start();
					} else {
						stop();
					}
					$slideshow.show();
				}
			}
		};

	}());


	function launch(element) {
		var options;

		if (!closing) {

			options = $(element).data('colorbox');

			settings = new Settings(element, options);

			rel = settings.get('rel');
			
			getRelated();

			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

				setClass(settings.get('className'));
				
				// Show colorbox so the sizes can be calculated in older versions of jQuery
				$box.css({visibility:'hidden', display:'block'});
				
				$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');
				$content.css({width:'', height:''}).append($loaded);

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);

				// Opens inital empty Colorbox prior to content being loaded.
				settings.w = setSize(settings.get('initialWidth'), 'x');
				settings.h = setSize(settings.get('initialHeight'), 'y');
				$loaded.css({width:'', height:settings.h});
				publicMethod.position();

				trigger(event_open);
				settings.get('onOpen');

				$groupControls.add($title).hide();

				$box.focus();
				
				if (settings.get('trapFocus')) {
					// Confine focus to the modal
					// Uses event capturing that is not supported in IE8-
					if (document.addEventListener) {

						document.addEventListener('focus', trapFocus, true);
						
						$events.one(event_closed, function () {
							document.removeEventListener('focus', trapFocus, true);
						});
					}
				}

				// Return focus on closing
				if (settings.get('returnFocus')) {
					$events.one(event_closed, function () {
						$(settings.el).focus();
					});
				}
			}

			$overlay.css({
				opacity: parseFloat(settings.get('opacity')),
				cursor: settings.get('overlayClose') ? "pointer" : "auto",
				visibility: 'visible'
			}).show();
			
			if (settings.get('closeButton')) {
				$close.html(settings.get('close')).appendTo($content);
			} else {
				$close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
			}

			load();
		}
	}

	// Colorbox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box && document.body) {
			init = false;
			$window = $(window);
			$box = $tag(div).attr({
				id: colorbox,
				'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
				role: 'dialog',
				tabindex: '-1'
			}).hide();
			$overlay = $tag(div, "Overlay").hide();
			$loadingOverlay = $([$tag(div, "LoadingOverlay")[0],$tag(div, "LoadingGraphic")[0]]);
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$prev = $('<button type="button"/>').attr({id:prefix+'Previous'}),
				$next = $('<button type="button"/>').attr({id:prefix+'Next'}),
				$slideshow = $tag('button', "Slideshow"),
				$loadingOverlay
			);

			$close = $('<button type="button"/>').attr({id:prefix+'Close'});
			
			$wrap.append( // The 3x3 Grid that makes up Colorbox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');
			
			$groupControls = $next.add($prev).add($current).add($slideshow);

			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add Colorbox's event bindings
	function addBindings() {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				launch(this);
			}
		}

		if ($box) {
			if (!init) {
				init = true;

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.get('overlayClose')) {
						publicMethod.close();
					}
				});
				
				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.get('escKey') && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				if ($.isFunction($.fn.on)) {
					// For jQuery 1.7+
					$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
				} else {
					// For jQuery 1.3.x -> 1.6.x
					// This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
					// This is not here for jQuery 1.9, it's here for legacy users.
					$('.'+boxElement).live('click.'+prefix, clickHandler);
				}
			}
			return true;
		}
		return false;
	}

	// Don't do anything if Colorbox already exists.
	if ($.colorbox) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.colorbox.close();
	// Usage from within an iframe: parent.jQuery.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var settings;
		var $obj = this;

		options = options || {};

		if ($.isFunction($obj)) { // assume a call to $.colorbox
			$obj = $('<a/>');
			options.open = true;
		} else if (!$obj[0]) { // colorbox being applied to empty collection
			return $obj;
		}


		if (!$obj[0]) { // colorbox being applied to empty collection
			return $obj;
		}
		
		appendHTML();

		if (addBindings()) {

			if (callback) {
				options.onComplete = callback;
			}

			$obj.each(function () {
				var old = $.data(this, colorbox) || {};
				$.data(this, colorbox, $.extend(old, options));
			}).addClass(boxElement);

			settings = new Settings($obj[0], options);
			
			if (settings.get('open')) {
				launch($obj[0]);
			}
		}
		
		return $obj;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;
		
		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.get('fixed')) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.get('right') !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);
		} else if (settings.get('left') !== false) {
			left += setSize(settings.get('left'), 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}
		
		if (settings.get('bottom') !== false) {
			top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);
		} else if (settings.get('top') !== false) {
			top += setSize(settings.get('top'), 'y');
		} else {
			top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left, visibility:'visible'});
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions() {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		// setting the speed to 0 if the content hasn't changed size or position
		if (speed) {
			var tempSpeed = 0;
			$.each(css, function(i){
				if (css[i] !== previousCSS[i]) {
					tempSpeed = speed;
					return;
				}
			});
			speed = tempSpeed;
		}

		previousCSS = css;

		if (!speed) {
			$box.css(css);
		}

		$box.dequeue().animate(css, {
			duration: speed || 0,
			complete: function () {
				modalDimensions();
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (settings.get('reposition')) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if (loadedCallback) {
					loadedCallback();
				}
			},
			step: modalDimensions
		});
	};

	publicMethod.resize = function (options) {
		var scrolltop;
		
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}

			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}

			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}

			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}

			if (!options.innerHeight && !options.height) {
				scrolltop = $loaded.scrollTop();
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}

			$loaded.css({height: settings.h});

			if(scrolltop) {
				$loaded.scrollTop(scrolltop);
			}
			
			publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');

		$loaded.remove();

		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		
		$(photo).css({'float': 'none'});

		setClass(settings.get('className'));

		callback = function () {
			var total = $related.length,
				iframe,
				complete;
			
			if (!open) {
				return;
			}
			
			function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
				if ($.support.opacity === false) {
					$box[0].style.removeAttribute('filter');
				}
			}
			
			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.hide();
				trigger(event_complete);
				settings.get('onComplete');
			};

			
			$title.html(settings.get('title')).show();
			$loaded.show();
			
			if (total > 1) { // handle grouping
				if (typeof settings.get('current') === "string") {
					$current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();
				}
				
				$next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));
				$prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));
				
				slideshow();
				
				// Preloads images within a rel group
				if (settings.get('preloading')) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var img,
							i = $related[this],
							settings = new Settings(i, $.data(i, colorbox)),
							src = settings.get('href');

						if (src && isImage(settings, src)) {
							src = retinaUrl(settings, src);
							img = document.createElement('img');
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}
			
			if (settings.get('iframe')) {
				iframe = document.createElement('iframe');
				
				if ('frameBorder' in iframe) {
					iframe.frameBorder = 0;
				}
				
				if ('allowTransparency' in iframe) {
					iframe.allowTransparency = "true";
				}

				if (!settings.get('scrolling')) {
					iframe.scrolling = "no";
				}
				
				$(iframe)
					.attr({
						src: settings.get('href'),
						name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
						'class': prefix + 'Iframe',
						allowFullScreen : true // allow HTML5 video to go fullscreen
					})
					.one('load', complete)
					.appendTo($loaded);
				
				$events.one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.get('fastIframe')) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}
			
			if (settings.get('transition') === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};
		
		if (settings.get('transition') === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	function load () {
		var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;
		
		active = true;
		
		photo = false;
		
		trigger(event_purge);
		trigger(event_load);
		settings.get('onLoad');
		
		settings.h = settings.get('height') ?
				setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :
				settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');
		
		settings.w = settings.get('width') ?
				setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :
				settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.get('maxWidth')) {
			settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.get('maxHeight')) {
			settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.get('href');
		
		loadingTimer = setTimeout(function () {
			$loadingOverlay.show();
		}, 100);
		
		if (settings.get('inline')) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when Colorbox closes or loads new content.
			$inline = $tag(div).hide().insertBefore($(href)[0]);

			$events.one(event_purge, function () {
				$inline.replaceWith($loaded.children());
			});

			prep($(href));
		} else if (settings.get('iframe')) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.get('html')) {
			prep(settings.get('html'));
		} else if (isImage(settings, href)) {

			href = retinaUrl(settings, href);

			photo = document.createElement('img');

			$(photo)
			.addClass(prefix + 'Photo')
			.bind('error',function () {
				prep($tag(div, 'Error').html(settings.get('imgError')));
			})
			.one('load', function () {
				var percent;

				if (request !== requests) {
					return;
				}

				$.each(['alt', 'longdesc', 'aria-describedby'], function(i,val){
					var attr = $(settings.el).attr(val) || $(settings.el).attr('data-'+val);
					if (attr) {
						photo.setAttribute(val, attr);
					}
				});

				if (settings.get('retinaImage') && window.devicePixelRatio > 1) {
					photo.height = photo.height / window.devicePixelRatio;
					photo.width = photo.width / window.devicePixelRatio;
				}

				if (settings.get('scalePhotos')) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (settings.get('loop') || $related[index + 1])) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
						publicMethod.next();
					};
				}

				photo.style.width = photo.width + 'px';
				photo.style.height = photo.height + 'px';

				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.get('data'), function (data, status) {
				if (request === requests) {
					prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());
				}
			});
		}
	}
		
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {
			index = getIndex(1);
			launch($related[index]);
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.get('loop') || index)) {
			index = getIndex(-1);
			launch($related[index]);
		}
	};

	// Note: to use this within an iframe use the following format: parent.jQuery.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup);
			settings.get('onCleanup');
			
			$window.unbind('.' + prefix);
			
			$overlay.fadeTo(settings.get('fadeOut') || 0, 0);
			
			$box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {
			
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.remove();
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed);
					settings.get('onClosed');
				}, 1);
			});
		}
	};

	// Removes changes Colorbox made to the document, but does not remove the plugin.
	publicMethod.remove = function () {
		if (!$box) { return; }

		$box.stop();
		$.colorbox.close();
		$box.stop().remove();
		$overlay.remove();
		closing = false;
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).unbind('click.'+prefix);
	};

	// A method for fetching the current element Colorbox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(settings.el);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));

; browserify_shim__define__module__export__(typeof colorbox != "undefined" ? colorbox : window.colorbox);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/vendor/jquery.colorbox.js","/vendor")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],"colorbox":[function(require,module,exports){
module.exports=require('jWmBH/');
},{}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 * jQuery FlexSlider v2.1
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Contributing author: Tyler Smith (@mbmufffin)
 */

;(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el),
        vars = $.extend({}, $.flexslider.defaults, options),
        namespace = vars.namespace,
        touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
        eventType = (touch) ? "touchend" : "click",
        vertical = vars.direction === "vertical",
        reverse = vars.reverse,
        carousel = (vars.itemWidth > 0),
        fade = vars.animation === "fade",
        asNav = vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Privat slider methods
    methods = {
      init: function() {
        slider.animating = false;
        slider.currentSlide = vars.startAt;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = vars.selector.substr(0,vars.selector.search(' '));
        slider.slides = $(vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(vars.sync).length > 0;
        // SLIDE:
        if (vars.animation === "slide") vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        // TOUCH/USECSS:
        slider.transitions = !vars.video && !fade && vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        // CONTROLSCONTAINER:
        if (vars.controlsContainer !== "") slider.controlsContainer = $(vars.controlsContainer).length > 0 && $(vars.controlsContainer);
        // MANUAL:
        if (vars.manualControls !== "") slider.manualControls = $(vars.manualControls).length > 0 && $(vars.manualControls);

        // RANDOMIZE:
        if (vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (vars.keyboard && ($(slider.containerSelector).length === 1 || vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (vars.pausePlay) methods.pausePlay.setup();

        // SLIDSESHOW
        if (vars.slideshow) {
          if (vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay) slider.play();
            });
          }
          // initialize animation
          (vars.initDelay > 0) ? setTimeout(slider.play, vars.initDelay) : slider.play();
        }

        // TOUCH
        if (touch && vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && vars.smoothHeight)) $(window).bind("resize focus", methods.resize);


        // API: start() Callback
        setTimeout(function(){
          vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          slider.slides.click(function(e){
            e.preventDefault();
            var $slide = $(this),
                target = $slide.index();
            if (!$(vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
              slider.direction = (slider.currentItem < target) ? "next" : "prev";
              slider.flexAnimate(target, vars.pauseOnAction, false, true, true);
            }
          });
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              item = (vars.controlNav === "thumbnails") ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a>' + j + '</a>';
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();
            var $this = $(this),
                target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              slider.direction = (target > slider.currentSlide) ? "next" : "prev";
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.controlNavScaffold.delegate('a', "click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.live(eventType, function(event) {
            event.preventDefault();
            var $this = $(this),
                target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.controlNav.live("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        set: function() {
          var selector = (vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, vars.pauseOnAction);
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.directionNav.bind("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass);
          } else if (!vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass);
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass);
            } else {
              slider.directionNav.removeClass(disabledClass);
            }
          } else {
            slider.directionNav.removeClass(disabledClass);
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();
            if ($(this).hasClass(namespace + 'pause')) {
              slider.manualPause = true;
              slider.manualPlay = false;
              slider.pause();
            } else {
              slider.manualPause = false;
              slider.manualPlay = true;
              slider.play();
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.pausePlay.bind("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').text(vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').text(vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false;

        el.addEventListener('touchstart', onTouchStart, false);
        function onTouchStart(e) {
          if (slider.animating) {
            e.preventDefault();
          } else if (e.touches.length === 1) {
            slider.pause();
            // CAROUSEL:
            cwidth = (vertical) ? slider.h : slider. w;
            startT = Number(new Date());
            // CAROUSEL:
            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                     (carousel && reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                     (carousel && slider.currentSlide === slider.last) ? slider.limit :
                     (carousel) ? ((slider.itemW + vars.itemMargin) * slider.move) * slider.currentSlide :
                     (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            startX = (vertical) ? e.touches[0].pageY : e.touches[0].pageX;
            startY = (vertical) ? e.touches[0].pageX : e.touches[0].pageY;

            el.addEventListener('touchmove', onTouchMove, false);
            el.addEventListener('touchend', onTouchEnd, false);
          }
        }

        function onTouchMove(e) {
          dx = (vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
          scrolling = (vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));

          if (!scrolling || Number(new Date()) - startT > 500) {
            e.preventDefault();
            if (!fade && slider.transitions) {
              if (!vars.animationLoop) {
                dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
              }
              slider.setProps(offset + dx, "setTouch");
            }
          }
        }

        function onTouchEnd(e) {
          // finish the touch by undoing the touch session
          el.removeEventListener('touchmove', onTouchMove, false);

          if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
            var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
              slider.flexAnimate(target, vars.pauseOnAction);
            } else {
              if (!fade) slider.flexAnimate(slider.currentSlide, vars.pauseOnAction, true);
            }
          }
          el.removeEventListener('touchend', onTouchEnd, false);
          startX = null;
          startY = null;
          dx = null;
          offset = null;
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      }
    }

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;
        // API: before() animation Callback
        vars.before(slider);

        // SLIDESHOW:
        if (pause) slider.pause();

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", vars.animationSpeed);
          if (slider.transitions) {
            if (!vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              slider.wrapup(dimension);
            });
          } else {
            slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
            slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });

            slider.slides.unbind("webkitTransitionEnd transitionend");
            slider.slides.eq(slider.currentSlide).bind("webkitTransitionEnd transitionend", function() {
              // API: after() animation Callback
              vars.after(slider);
            });

            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
          }
        }
        // SMOOTH HEIGHT:
        if (vars.smoothHeight) methods.smoothHeight(vars.animationSpeed);
      }
    }
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      vars.after(slider);
    }

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating) slider.flexAnimate(slider.getTarget("next"));
    }
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.playing = false;
      // PAUSEPLAY:
      if (vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    }
    // SLIDESHOW:
    slider.play = function() {
      slider.animatedSlides = setInterval(slider.animateSlides, vars.slideshowSpeed);
      slider.playing = true;
      // PAUSEPLAY:
      if (vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    }
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    }
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    }

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());
            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);
    }

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          slider.container.append(slider.slides.first().clone().addClass('clone')).prepend(slider.slides.last().clone().addClass('clone'));
        }
        slider.newSlides = $(vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            slider.slides.eq(slider.currentSlide).fadeIn(vars.animationSpeed, vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
    }

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = vars.itemMargin,
          minItems = vars.minItems,
          maxItems = vars.maxItems;

      slider.w = slider.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? maxItems * slider.itemT : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * minItems))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * maxItems))/maxItems :
                       (vars.itemWidth > slider.w) ? slider.w : vars.itemWidth;
        slider.visible = Math.floor(slider.w/(slider.itemW + slideMargin));
        slider.move = (vars.move > 0 && vars.move < slider.visible ) ? vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (vars.itemWidth > slider.w) ? ((slider.itemW + (slideMargin * 2)) * slider.count) - slider.w - slideMargin : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    }

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (vars.directionNav) methods.directionNav.update();

    }

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      vars.added(slider);
    }
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      vars.removed(slider);
    }

    //FlexSlider: Initialize
    methods.init();
  }

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
  }


  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

        if ($slides.length === 1) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') == undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  }

})(jQuery);
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/vendor/jquery.flexslider.js","/vendor")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * The buffer module from node.js, for the browser.
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install buffer`
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
   // Detect if browser supports Typed Arrays. Supported browsers are IE 10+,
   // Firefox 4+, Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+.
  if (typeof Uint8Array === 'undefined' || typeof ArrayBuffer === 'undefined')
    return false

  // Does the browser support adding properties to `Uint8Array` instances? If
  // not, then that's the same as no `Uint8Array` support. We need to be able to
  // add all the node Buffer API methods.
  // Relevant Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var arr = new Uint8Array(0)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // Assume object is an array
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof Uint8Array === 'function' &&
      subject instanceof Uint8Array) {
    // Speed optimization -- use set if we're copying from a Uint8Array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  // copy!
  for (var i = 0; i < end - start; i++)
    target[i + target_start] = this[i + start]
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array === 'function') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment the Uint8Array *instance* (not the class!) with Buffer methods
 */
function augment (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0,
      'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"base64-js":14,"buffer":13,"ieee754":15}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js","/../../../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":16,"buffer":13}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL2FuYWx5dGljcy5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL2Zha2VfZDE2NjBkYTIuanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL2FwcC93cC1jb250ZW50L3RoZW1lcy90cnktdGhlbWUvc2NyaXB0cy9yZXNwb25zaXZlLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvc29jaWFsLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvdWkuanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL2FwcC93cC1jb250ZW50L3RoZW1lcy90cnktdGhlbWUvc2NyaXB0cy91dGlsLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvdmVuZG9yL2VucXVpcmUuanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL2FwcC93cC1jb250ZW50L3RoZW1lcy90cnktdGhlbWUvc2NyaXB0cy92ZW5kb3IvanF1ZXJ5LmJyZWFrcG9pbnRzLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvdmVuZG9yL2pxdWVyeS5jb2xvcmJveC5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL3ZlbmRvci9qcXVlcnkuZmxleHNsaWRlci5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeGtDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDejRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6bENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogTG9ncyBhbiBldmVudCB0byBHb29nbGUgQW5hbHl0aWNzIHVzaW5nIHRoZSBlbGVtZW50J3MgZGF0YSBhdHRyaWJ1dGVzLlxuICogQWRhcHRlZCBmcm9tIEJlbiBQbHVtJ3MgU2NvdXQgcGx1Z2luOiBodHRwczovL2dpdGh1Yi5jb20vYmVucGx1bS9TY291dFxuICogQHBhcmFtICB7b2JqZWN0fSBlIFRoZSBldmVudCB0aGF0IGZpcmVkIHRoZSBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbH0gICB0cnVlXG4gKi9cbnZhciB0cmFja0V2ZW50ID0gZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciAkZWwgPSAkKHRoaXMpLFxuXHRcdHVybCA9ICRlbC5hdHRyKFwiaHJlZlwiKSxcblx0XHRkYXRhID0gJGVsLmRhdGEoXCJ0cmFjay1ldmVudFwiKS5zcGxpdChcIixcIik7XG5cblx0Ly8gVHJpbSB3aGl0ZXNwYWNlIGZyb20gZGF0YVxuXHRmb3IgKHZhciBpIGluIGRhdGEpIHtcblx0XHRkYXRhW2ldID0gJC50cmltKGRhdGFbaV0pO1xuXHR9XG5cblx0Ly8gUHVzaCBkYXRhOiBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVcblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCBkYXRhWzBdLCBkYXRhWzFdLCAodXJsIHx8IGRhdGFbMl0pLCBkYXRhWzNdICk7XG5cblx0Ly8gSWYgYWN0aXZlIGxpbmssIGxhdW5jaCBpdCFcblx0aWYgKHVybCkge1xuXHRcdC8vIERlbGF5IGJhc2VkIG9uIEdvb2dsZSdzIG91dGJvdW5kIGxpbmsgaGFuZGxlcjpcblx0XHQvLyBodHRwOi8vc3VwcG9ydC5nb29nbGUuY29tL2FuYWx5dGljcy9iaW4vYW5zd2VyLnB5P2hsPWVuJmFuc3dlcj0xMTM2OTIwXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdC8vIENoZWNrIHdpbmRvdyB0YXJnZXRcblx0XHRcdGlmICgkZWwuYXR0cihcInRhcmdldFwiKSkge1xuXHRcdFx0XHR3aW5kb3cub3Blbih1cmwsICRlbC5hdHRyKFwidGFyZ2V0XCIpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG5cdFx0XHR9XG5cdFx0fSwgMTAwKTtcblx0fVxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEV2ZW50IEhhbmRsZXJzIC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdHJhY2stZXZlbnRdJywgdHJhY2tFdmVudCk7XG5cbi8vLy8vLy8vLy8vLy8vLy9cbi8vIEluaXRpYWxpemUgLy9cbi8vLy8vLy8vLy8vLy8vLy9cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIGNvZGUgdG8gcnVuIG9uIERPTSByZWFkeS4uLlxufTtcblxuLy8vLy8vLy8vLy8vLy8vL1xuLy8gUHVibGljIEFQSSAvL1xuLy8vLy8vLy8vLy8vLy8vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0aW5pdDogaW5pdCxcblx0dHJhY2tFdmVudDogdHJhY2tFdmVudFxufVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvYW5hbHl0aWNzLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gUmVxdWlyZSBNb2R1bGVzXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpLFxuXHRhbmFseXRpY3MgPSByZXF1aXJlKCcuL2FuYWx5dGljcy5qcycpLFxuXHRzb2NpYWwgPSByZXF1aXJlKCcuL3NvY2lhbC5qcycpLFxuXHR1aSA9IHJlcXVpcmUoJy4vdWkuanMnKSxcblx0cmVzcG9uc2l2ZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2l2ZS5qcycpO1xuXG4vKipcbiAqIENvbmRpdGlvbmFsbHkgbG9hZCBwb2x5ZmlsbHMgYXMgbmVlZGVkXG4gKi9cbk1vZGVybml6ci5sb2FkKFt7XG5cdHRlc3Q6IHV0aWwudXNlci5sdGU4LFxuXHR5ZXA6IHV0aWwudXJscy50aGVtZSArICcvc2NyaXB0cy92ZW5kb3Ivc2VsZWN0aXZpenIuanMnXG59XSk7XG5cbi8qKlxuICogV2hlbiB0aGUgRE9NJ3MgcmVhZHksIGluaXRpYWxpemUgdGhlIGFwcFxuICovXG4kKGZ1bmN0aW9uICgpIHtcblx0dXRpbC5pbml0KCk7XG5cdGFuYWx5dGljcy5pbml0KCk7XG5cdHNvY2lhbC5pbml0KCk7XG5cdHVpLmluaXQoKTtcblx0cmVzcG9uc2l2ZS5pbml0KCk7XG59KTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV9kMTY2MGRhMi5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBlbnF1aXJlID0gcmVxdWlyZSgnLi92ZW5kb3IvZW5xdWlyZS5qcycpO1xuXG4vKipcbiAqIE1vbml0b3JzIHdpbmRvdyBzaXplIGZvciBicmVha3BvaW50c1xuICovXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ZW5xdWlyZS5cblx0XHRyZWdpc3RlcihcInNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpXCIsIHsgLy8gTW9iaWxlOiBBbGxcblx0XHRcdGRlZmVyU2V0dXA6IHRydWUsXG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7fSxcblx0XHRcdG1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ21vYmlsZTogYWxsJyk7XG5cdFx0XHR9LFxuXHRcdFx0dW5tYXRjaDogZnVuY3Rpb24oKSB7fVxuXHRcdH0pLlxuXHRcdHJlZ2lzdGVyKFwic2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NzlweClcIiwgeyAvLyBNb2JpbGU6IFBvcnRyYWl0XG5cdFx0XHRkZWZlclNldHVwOiB0cnVlLFxuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge30sXG5cdFx0XHRtYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdtb2JpbGU6IHBvcnRyYWl0Jyk7XG5cdFx0XHR9LFxuXHRcdFx0dW5tYXRjaDogZnVuY3Rpb24oKSB7fVxuXHRcdH0pLlxuXHRcdHJlZ2lzdGVyKFwic2NyZWVuIGFuZCAobWluLXdpZHRoOiA0ODBweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KVwiLCB7IC8vIE1vYmlsZTogTGFuZHNjYXBlXG5cdFx0XHRkZWZlclNldHVwOiB0cnVlLFxuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge30sXG5cdFx0XHRtYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdtb2JpbGU6IGxhbmRzY2FwZScpO1xuXHRcdFx0fSxcblx0XHRcdHVubWF0Y2g6IGZ1bmN0aW9uKCkge31cblx0XHR9KS5cblx0XHRyZWdpc3RlcihcInNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDIzcHgpXCIsIHsgLy8gVGFibGV0OiBQb3J0cmFpdFxuXHRcdFx0ZGVmZXJTZXR1cDogdHJ1ZSxcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHt9LFxuXHRcdFx0bWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygndGFibGV0OiBwb3J0cmFpdCcpO1xuXHRcdFx0fSxcblx0XHRcdHVubWF0Y2g6IGZ1bmN0aW9uKCkge31cblx0XHR9KS5cblx0XHRyZWdpc3RlcihcInNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSBhbmQgKG1heC13aWR0aDogMTI3OXB4KVwiLCB7IC8vIERlc2t0b3Bcblx0XHRcdGRlZmVyU2V0dXA6IHRydWUsXG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7fSxcblx0XHRcdG1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Rlc2t0b3A6IDEwMjRweCcpO1xuXHRcdFx0fSxcblx0XHRcdHVubWF0Y2g6IGZ1bmN0aW9uKCkge31cblx0XHR9KS5cblx0XHRyZWdpc3RlcihcInNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTI4MHB4KVwiLCB7IC8vIFdpZGUgZm9ybWF0XG5cdFx0XHRkZWZlclNldHVwOiB0cnVlLFxuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge30sXG5cdFx0XHRtYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCd3aWRlIGZvcm1hdDogMTI4MHB4Jyk7XG5cdFx0XHR9LFxuXHRcdFx0dW5tYXRjaDogZnVuY3Rpb24oKSB7fVxuXHRcdH0pO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vL1xuLy8gUHVibGljIEFQSSAvL1xuLy8vLy8vLy8vLy8vLy8vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0aW5pdDogaW5pdFxufVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvcmVzcG9uc2l2ZS5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogQWRkcyB0aGUgRmFjZWJvb2sgSmF2YVNjcmlwdCBTREsgYW5kIGluaXRpYWxpemVzIHRoZSBGYWNlYm9vayBhcHBcbiAqIEByZXR1cm4ge3RydWV9XG4gKi9cbnZhciBmYkluaXQgPSBmdW5jdGlvbigpIHtcblx0JCgnYm9keScpLmFwcGVuZCgnPGRpdiBpZD1cImZiLXJvb3RcIj48L2Rpdj4nKTtcblxuXHQvLyBBc3luY2hyb25vdXNseSBsb2FkIGZiIGpzc2RrXG5cdHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdGUuYXN5bmMgPSB0cnVlO1xuXHRlLnNyYyA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sICsgJy8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvYWxsLmpzJztcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZiLXJvb3QnKS5hcHBlbmRDaGlsZChlKTtcblxuXHQvLyBJbml0aWFsaXplIEZhY2Vib29rIGFwcFxuXHRmYkFzeW5jSW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdEZCLmluaXQoe1xuXHRcdFx0YXBwSWQ6ICcnLCAvLyBBcHAgSUQgZnJvbSB0aGUgQXBwIERhc2hib2FyZFxuXHRcdFx0c3RhdHVzOiBmYWxzZSwgLy8gY2hlY2sgdGhlIGxvZ2luIHN0YXR1cyB1cG9uIGluaXQ/XG5cdFx0XHRjb29raWU6IHRydWUsIC8vIHNldCBzZXNzaW9ucyBjb29raWVzIHRvIGFsbG93IHlvdXIgc2VydmVyIHRvIGFjY2VzcyB0aGUgc2Vzc2lvbj9cblx0XHRcdHhmYm1sOiB0cnVlIC8vIHBhcnNlIFhGQk1MIHRhZ3Mgb24gdGhpcyBwYWdlP1xuXHRcdH0pO1xuXG5cdFx0Ly9GQi5DYW52YXMuc2V0QXV0b0dyb3coKTtcblx0XHQvL0ZCLkNhbnZhcy5zY3JvbGxUbygwLCAwKTtcblx0fTtcblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUG9wcyBhIEZhY2Vib29rICdzaGFyZSB0byB3YWxsJyBkaWFsb2cgdXNpbmcgdGhlIGVsZW1lbnQncyBkYXRhIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAge29iamVjdH0gZWwgVGhlIHRhcmdldCBvZiB0aGUgZXZlbnRcbiAqIEByZXR1cm4ge3RydWV9XG4gKi9cbnZhciBmYlNoYXJlID0gZnVuY3Rpb24oZWwpIHtcblx0dmFyICRlbCA9ICQoZWwpLFxuXHRcdG5hbWUgPSAkZWwuZGF0YSgnbmFtZScpIHx8ICcnLFxuXHRcdGRlc2NyaXB0aW9uID0gJGVsLmRhdGEoJ2Rlc2NyaXB0aW9uJykgfHwgJycsXG5cdFx0bGluayA9ICRlbC5kYXRhKCdsaW5rJykgfHwgJycsXG5cdFx0Y2FwdGlvbiA9ICRlbC5kYXRhKCdjYXB0aW9uJykgfHwgJyc7XG5cblx0Ly8gT3BlbiBGYWNlYm9vayBzaGFyZSBkaWFsb2dcblx0RkIudWkoe1xuXHRcdG1ldGhvZDogJ2ZlZWQnLFxuXHRcdG5hbWU6IG5hbWUsXG5cdFx0bGluazogbGluayxcblx0XHRwaWN0dXJlOiB1cmxzLnRoZW1lICsgJy9pbWFnZXMvZmItc2hhcmUuanBnJyxcblx0XHRjYXB0aW9uOiBjYXB0aW9uLFxuXHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuXHR9KTtcblxuXHQvLyBUcmFjayBGYWNlYm9vayBzaGFyZSBidXR0b24gY2xpY2tcblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCAnRmFjZWJvb2sgU2hhcmUnLCAnY2xpY2snKTtcblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUG9wcyBhIFR3ZWV0IGRpYWxvZyBib3ggdXNpbmcgaW5mb3JtYXRpb24gZnJvbSBhIGJ1dHRvbidzIGRhdGEgYXR0cmlidXRlc1xuICogQHBhcmFtICB7b2JqZWN0fSBlbCBUaGUgdGFyZ2V0IG9mIHRoZSBldmVudFxuICogQHJldHVybiB7c3RyaW5nfSAgICBUaGUgdHdpdHRlciB1cmwgbmVlZGVkIHRvIHBvcCB0aGUgZGlhbG9nIHdpdGggdGhlIGNvcnJlY3QgaW5mb1xuICovXG52YXIgdHdpdHRlclNoYXJlID0gZnVuY3Rpb24oZWwpIHtcblx0dmFyICRlbCA9ICQoZWwpLFxuXHRcdHVybCA9ICRlbC5kYXRhKCd1cmwnKSB8fCBzLnVybHMuYmFzZSxcblx0XHR0ZXh0ID0gJGVsLmRhdGEoJ3RleHQnKSB8fCAnJyxcblx0XHRoYXNodGFncyA9ICRlbC5kYXRhKCdoYXNodGFncycpIHx8ICcnLFxuXHRcdHR3ZWV0dXJsID0gJ2h0dHA6Ly90d2l0dGVyLmNvbS9zaGFyZT91cmw9JyArIGVuY29kZVVSSSh1cmwpICsgJyZ0ZXh0PScgKyB0ZXh0ICsgJyZoYXNodGFncz0nICsgaGFzaHRhZ3M7XG5cblx0Ly8gVHJhY2sgdHdlZXQgYnV0dG9uIGNsaWNrXG5cdGdhKCdzZW5kJywgJ2V2ZW50JywgJ1R3aXR0ZXIgU2hhcmUnLCAnY2xpY2snKTtcblxuXHRyZXR1cm4gdHdlZXR1cmw7XG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRXZlbnQgSGFuZGxlcnMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiQoJy5mYWNlYm9vay1zaGFyZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRmYlNoYXJlKGUudGFyZ2V0KTtcbn0pO1xuXG4kKCcudHdpdHRlci1zaGFyZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0dmFyIGhyZWYgPSB0d2l0dGVyU2hhcmUoZS50YXJnZXQpO1xuXHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBocmVmKTtcblx0cmV0dXJuIHRydWU7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vL1xuLy8gSW5pdGlhbGl6ZSAvL1xuLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRmYkluaXQoKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy9cbi8vIFB1YmxpYyBBUEkgLy9cbi8vLy8vLy8vLy8vLy8vLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXQ6IGluaXQsXG5cdGZiU2hhcmU6IGZiU2hhcmUsXG5cdHR3aXR0ZXJTaGFyZTogdHdpdHRlclNoYXJlXG59O1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvc29jaWFsLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIGZsZXhzbGlkZXIgPSByZXF1aXJlKCcuL3ZlbmRvci9qcXVlcnkuZmxleHNsaWRlci5qcycpLFxuXHRjb2xvcmJveCA9IHJlcXVpcmUoJ2NvbG9yYm94Jyk7XG5cbnZhciBmZWF0dXJlZFNsaWRlcjtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgbGlnaHRib3hlc1xuICogQHJldHVybiB7dHJ1ZX1cbiAqL1xudmFyIGxpZ2h0Ym94SW5pdCA9IGZ1bmN0aW9uKCkge1xuXHQkKCcuY29sb3Jib3gnKS5jb2xvcmJveCgpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgc2xpZGVyc1xuICogQHJldHVybiB7dHJ1ZX1cbiAqL1xudmFyIHNsaWRlckluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdCQoJy5mbGV4c2xpZGVyJykuZmxleHNsaWRlcih7XG5cdFx0YW5pbWF0aW9uOiBcInNsaWRlXCIsXG5cdFx0cGF1c2VPbkhvdmVyOiB0cnVlLFxuXHRcdGNvbnRyb2xzQ29udGFpbmVyOiBcIi5mbGV4c2xpZGVyLWNvbnRhaW5lclwiLFxuXHRcdHN0YXJ0OiBmdW5jdGlvbiAoc2xpZGVyKSB7XG5cdFx0XHRmZWF0dXJlZFNsaWRlciA9IHNsaWRlcjtcblx0XHR9XG5cdH0pO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEV2ZW50IEhhbmRsZXJzIC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy9cbi8vIEluaXRpYWxpemUgLy9cbi8vLy8vLy8vLy8vLy8vLy9cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdGxpZ2h0Ym94SW5pdCgpO1xuXHRzbGlkZXJJbml0KCk7XG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vXG4vLyBQdWJsaWMgQVBJIC8vXG4vLy8vLy8vLy8vLy8vLy8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRpbml0OiBpbml0XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3VpLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIHVybHMgPSAodHlwZW9mIHVybHMgPT09IFwidW5kZWZpbmVkXCIpID8ge30gOiB1cmxzO1xudmFyIHVzZXIgPSB7XG5cdG1vYmlsZTogL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IHRydWUgOiBmYWxzZSxcblx0bHRlODogJCgnaHRtbCcpLmhhc0NsYXNzKCdsdGU4JykgPyB0cnVlIDogZmFsc2Vcbn07XG5cbi8qKlxuICogQXZvaWQgYGNvbnNvbGVgIGVycm9ycyBpbiBicm93c2VycyB0aGF0IGxhY2sgYSBjb25zb2xlLlxuICogQHJldHVybiB7Ym9vbH0gW2Rlc2NyaXB0aW9uXVxuICovXG52YXIgY29uc29sZUZhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG5cdHZhciBtZXRob2Q7XG5cdHZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcblx0dmFyIG1ldGhvZHMgPSBbXG5cdFx0J2Fzc2VydCcsICdjbGVhcicsICdjb3VudCcsICdkZWJ1ZycsICdkaXInLCAnZGlyeG1sJywgJ2Vycm9yJyxcblx0XHQnZXhjZXB0aW9uJywgJ2dyb3VwJywgJ2dyb3VwQ29sbGFwc2VkJywgJ2dyb3VwRW5kJywgJ2luZm8nLCAnbG9nJyxcblx0XHQnbWFya1RpbWVsaW5lJywgJ3Byb2ZpbGUnLCAncHJvZmlsZUVuZCcsICd0YWJsZScsICd0aW1lJywgJ3RpbWVFbmQnLFxuXHRcdCd0aW1lU3RhbXAnLCAndHJhY2UnLCAnd2Fybidcblx0XTtcblx0dmFyIGxlbmd0aCA9IG1ldGhvZHMubGVuZ3RoO1xuXHR2YXIgY29uc29sZSA9ICh3aW5kb3cuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlIHx8IHt9KTtcblxuXHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRtZXRob2QgPSBtZXRob2RzW2xlbmd0aF07XG5cblx0XHQvLyBPbmx5IHN0dWIgdW5kZWZpbmVkIG1ldGhvZHMuXG5cdFx0aWYgKCFjb25zb2xlW21ldGhvZF0pIHtcblx0XHRcdGNvbnNvbGVbbWV0aG9kXSA9IG5vb3A7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEJhc2ljIGRlYnVnIHRoYXQgd3JpdGVzIHRvIHRoZSBjb25zb2xlXG4gKiBAcGFyYW0gIHthcnJheX0gYXJyICAgQXJyYXkgdG8gYmUgZGVidWdnZWRcbiAqIEBwYXJhbSAge251bX0gICBsZXZlbCBOdW1iZXIgb2YgbGV2ZWxzIGRlZXAgdG8gdHJhdmVyc2VcbiAqL1xudmFyIGRlYnVnID0gZnVuY3Rpb24oYXJyLGxldmVsKSB7XG5cdHZhciBkdW1wZWRfdGV4dCA9IFwiXCI7XG5cdGlmKCFsZXZlbCkgbGV2ZWwgPSAwO1xuXG5cdC8vVGhlIHBhZGRpbmcgZ2l2ZW4gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGluZS5cblx0dmFyIGxldmVsX3BhZGRpbmcgPSBcIlwiO1xuXHRmb3IodmFyIGo9MDtqPGxldmVsKzE7aisrKSBsZXZlbF9wYWRkaW5nICs9IFwiICAgIFwiO1xuXG5cdGlmKHR5cGVvZihhcnIpID09ICdvYmplY3QnKSB7IC8vQXJyYXkvSGFzaGVzL09iamVjdHNcblx0XHRmb3IodmFyIGl0ZW0gaW4gYXJyKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBhcnJbaXRlbV07XG5cblx0XHRcdGlmKHR5cGVvZih2YWx1ZSkgPT0gJ29iamVjdCcpIHsgLy9JZiBpdCBpcyBhbiBhcnJheSxcblx0XHRcdFx0ZHVtcGVkX3RleHQgKz0gbGV2ZWxfcGFkZGluZyArIFwiJ1wiICsgaXRlbSArIFwiJyAuLi5cXG5cIjtcblx0XHRcdFx0ZHVtcGVkX3RleHQgKz0gZGVidWcodmFsdWUsbGV2ZWwrMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkdW1wZWRfdGV4dCArPSBsZXZlbF9wYWRkaW5nICsgXCInXCIgKyBpdGVtICsgXCInID0+IFxcXCJcIiArIHZhbHVlICsgXCJcXFwiXFxuXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvL1N0aW5ncy9DaGFycy9OdW1iZXJzIGV0Yy5cblx0XHRkdW1wZWRfdGV4dCA9IFwiPT09PlwiK2FycitcIjw9PT0oXCIrdHlwZW9mKGFycikrXCIpXCI7XG5cdH1cblxuXHRjb25zb2xlLmxvZyggZHVtcGVkX3RleHQgKTtcblxuXHRyZXR1cm4gZHVtcGVkX3RleHQ7XG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vXG4vLyBJbml0aWFsaXplIC8vXG4vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXHRjb25zb2xlRmFsbGJhY2soKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy9cbi8vIFB1YmxpYyBBUEkgLy9cbi8vLy8vLy8vLy8vLy8vLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXQ6IGluaXQsXG5cdHVybHM6IHVybHMsXG5cdHVzZXI6IHVzZXIsXG5cdGRlYnVnOiBkZWJ1Z1xufVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdXRpbC5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogZW5xdWlyZS5qcyB2Mi4xLjAgLSBBd2Vzb21lIE1lZGlhIFF1ZXJpZXMgaW4gSmF2YVNjcmlwdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IE5pY2sgV2lsbGlhbXMgLSBodHRwOi8vd2lja3kubmlsbGlhLm1zL2VucXVpcmUuanNcbiAqIExpY2Vuc2U6IE1JVCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXG4gKi9cblxuOyhmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZmFjdG9yeSkge1xuXHR2YXIgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhO1xuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShtYXRjaE1lZGlhKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gKGNvbnRleHRbbmFtZV0gPSBmYWN0b3J5KG1hdGNoTWVkaWEpKTtcblx0XHR9KTtcblx0fVxuXHRlbHNlIHtcblx0XHRjb250ZXh0W25hbWVdID0gZmFjdG9yeShtYXRjaE1lZGlhKTtcblx0fVxufSgnZW5xdWlyZScsIHRoaXMsIGZ1bmN0aW9uIChtYXRjaE1lZGlhKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG4gICAgLypqc2hpbnQgdW51c2VkOmZhbHNlICovXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBpdGVyYXRpbmcgb3ZlciBhIGNvbGxlY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIGZuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZWFjaChjb2xsZWN0aW9uLCBmbikge1xuICAgICAgICB2YXIgaSAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgICAgY29udDtcblxuICAgICAgICBmb3IoaTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ID0gZm4oY29sbGVjdGlvbltpXSwgaSk7XG4gICAgICAgICAgICBpZihjb250ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvL2FsbG93IGVhcmx5IGV4aXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0YXJnZXQgb2JqZWN0IGlzIGFuIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IHRoZSBvYmplY3QgdW5kZXIgdGVzdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXJyYXksIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQXJyYXkodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHRhcmdldCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRhcmdldCBvYmplY3QgaXMgYSBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCB0aGUgb2JqZWN0IHVuZGVyIHRlc3RcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGZ1bmN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSB0byBoYW5kbGUgYSBtZWRpYSBxdWVyeSBiZWluZyBtYXRjaGVkIGFuZCB1bm1hdGNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMubWF0Y2ggY2FsbGJhY2sgZm9yIHdoZW4gdGhlIG1lZGlhIHF1ZXJ5IGlzIG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy51bm1hdGNoXSBjYWxsYmFjayBmb3Igd2hlbiB0aGUgbWVkaWEgcXVlcnkgaXMgdW5tYXRjaGVkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMuc2V0dXBdIG9uZS10aW1lIGNhbGxiYWNrIHRyaWdnZXJlZCB0aGUgZmlyc3QgdGltZSBhIHF1ZXJ5IGlzIG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlZmVyU2V0dXA9ZmFsc2VdIHNob3VsZCB0aGUgc2V0dXAgY2FsbGJhY2sgYmUgcnVuIGltbWVkaWF0ZWx5LCByYXRoZXIgdGhhbiBmaXJzdCB0aW1lIHF1ZXJ5IGlzIG1hdGNoZWQ/XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gUXVlcnlIYW5kbGVyKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgIW9wdGlvbnMuZGVmZXJTZXR1cCAmJiB0aGlzLnNldHVwKCk7XG4gICAgfVxuICAgIFF1ZXJ5SGFuZGxlci5wcm90b3R5cGUgPSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvb3JkaW5hdGVzIHNldHVwIG9mIHRoZSBoYW5kbGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgc2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHRoaXMub3B0aW9ucy5zZXR1cCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXR1cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvb3JkaW5hdGVzIHNldHVwIGFuZCB0cmlnZ2VyaW5nIG9mIHRoZSBoYW5kbGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgb24gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICF0aGlzLmluaXRpYWxpc2VkICYmIHRoaXMuc2V0dXAoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tYXRjaCAmJiB0aGlzLm9wdGlvbnMubWF0Y2goKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29vcmRpbmF0ZXMgdGhlIHVubWF0Y2ggZXZlbnQgZm9yIHRoZSBoYW5kbGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgb2ZmIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMudW5tYXRjaCAmJiB0aGlzLm9wdGlvbnMudW5tYXRjaCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxsZWQgd2hlbiBhIGhhbmRsZXIgaXMgdG8gYmUgZGVzdHJveWVkLlxuICAgICAgICAgKiBkZWxlZ2F0ZXMgdG8gdGhlIGRlc3Ryb3kgb3IgdW5tYXRjaCBjYWxsYmFja3MsIGRlcGVuZGluZyBvbiBhdmFpbGFiaWxpdHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgZGVzdHJveSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlc3Ryb3kgPyB0aGlzLm9wdGlvbnMuZGVzdHJveSgpIDogdGhpcy5vZmYoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5lcyBlcXVhbGl0eSBieSByZWZlcmVuY2UuXG4gICAgICAgICAqIGlmIG9iamVjdCBpcyBzdXBwbGllZCBjb21wYXJlIG9wdGlvbnMsIGlmIGZ1bmN0aW9uLCBjb21wYXJlIG1hdGNoIGNhbGxiYWNrXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdCB8fCBmdW5jdGlvbn0gW3RhcmdldF0gdGhlIHRhcmdldCBmb3IgY29tcGFyaXNvblxuICAgICAgICAgKi9cbiAgICAgICAgZXF1YWxzIDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zID09PSB0YXJnZXQgfHwgdGhpcy5vcHRpb25zLm1hdGNoID09PSB0YXJnZXQ7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50cyBhIHNpbmdsZSBtZWRpYSBxdWVyeSwgbWFuYWdlcyBpdCdzIHN0YXRlIGFuZCByZWdpc3RlcmVkIGhhbmRsZXJzIGZvciB0aGlzIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgdGhlIG1lZGlhIHF1ZXJ5IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzVW5jb25kaXRpb25hbD1mYWxzZV0gd2hldGhlciB0aGUgbWVkaWEgcXVlcnkgc2hvdWxkIHJ1biByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIGNvbmRpdGlvbnMgYXJlIG1ldC4gUHJpbWFyaWx5IGZvciBoZWxwaW5nIG9sZGVyIGJyb3dzZXJzIGRlYWwgd2l0aCBtb2JpbGUtZmlyc3QgZGVzaWduXG4gICAgICovXG4gICAgZnVuY3Rpb24gTWVkaWFRdWVyeShxdWVyeSwgaXNVbmNvbmRpdGlvbmFsKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5pc1VuY29uZGl0aW9uYWwgPSBpc1VuY29uZGl0aW9uYWw7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5tcWwgPSBtYXRjaE1lZGlhKHF1ZXJ5KTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbihtcWwpIHtcbiAgICAgICAgICAgIHNlbGYubXFsID0gbXFsO1xuICAgICAgICAgICAgc2VsZi5hc3Nlc3MoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tcWwuYWRkTGlzdGVuZXIodGhpcy5saXN0ZW5lcik7XG4gICAgfVxuICAgIE1lZGlhUXVlcnkucHJvdG90eXBlID0ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhZGQgYSBoYW5kbGVyIGZvciB0aGlzIHF1ZXJ5LCB0cmlnZ2VyaW5nIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBoYW5kbGVyXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIubWF0Y2ggY2FsbGJhY2sgZm9yIHdoZW4gcXVlcnkgaXMgYWN0aXZhdGVkXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtoYW5kbGVyLnVubWF0Y2hdIGNhbGxiYWNrIGZvciB3aGVuIHF1ZXJ5IGlzIGRlYWN0aXZhdGVkXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtoYW5kbGVyLnNldHVwXSBjYWxsYmFjayBmb3IgaW1tZWRpYXRlIGV4ZWN1dGlvbiB3aGVuIGEgcXVlcnkgaGFuZGxlciBpcyByZWdpc3RlcmVkXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2hhbmRsZXIuZGVmZXJTZXR1cD1mYWxzZV0gc2hvdWxkIHRoZSBzZXR1cCBjYWxsYmFjayBiZSBkZWZlcnJlZCB1bnRpbCB0aGUgZmlyc3QgdGltZSB0aGUgaGFuZGxlciBpcyBtYXRjaGVkP1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkSGFuZGxlciA6IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBxaCA9IG5ldyBRdWVyeUhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLnB1c2gocWgpO1xuXG4gICAgICAgICAgICB0aGlzLm1hdGNoZXMoKSAmJiBxaC5vbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmVzIHRoZSBnaXZlbiBoYW5kbGVyIGZyb20gdGhlIGNvbGxlY3Rpb24sIGFuZCBjYWxscyBpdCdzIGRlc3Ryb3kgbWV0aG9kc1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3QgfHwgZnVuY3Rpb259IGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gcmVtb3ZlXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVIYW5kbGVyIDogZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgICAgIGVhY2goaGFuZGxlcnMsIGZ1bmN0aW9uKGgsIGkpIHtcbiAgICAgICAgICAgICAgICBpZihoLmVxdWFscyhoYW5kbGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBoLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFoYW5kbGVycy5zcGxpY2UoaSwxKTsgLy9yZW1vdmUgZnJvbSBhcnJheSBhbmQgZXhpdCBlYWNoIGVhcmx5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSBtZWRpYSBxdWVyeSBzaG91bGQgYmUgY29uc2lkZXJlZCBhIG1hdGNoXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIG1lZGlhIHF1ZXJ5IGNhbiBiZSBjb25zaWRlcmVkIGEgbWF0Y2gsIGZhbHNlIG90aGVyd2lzZVxuICAgICAgICAgKi9cbiAgICAgICAgbWF0Y2hlcyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXFsLm1hdGNoZXMgfHwgdGhpcy5pc1VuY29uZGl0aW9uYWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFycyBhbGwgaGFuZGxlcnMgYW5kIHVuYmluZHMgZXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhciA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubXFsLnJlbW92ZUxpc3RlbmVyKHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5sZW5ndGggPSAwOyAvL2NsZWFyIGFycmF5XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICogQXNzZXNzZXMgdGhlIHF1ZXJ5LCB0dXJuaW5nIG9uIGFsbCBoYW5kbGVycyBpZiBpdCBtYXRjaGVzLCB0dXJuaW5nIHRoZW0gb2ZmIGlmIGl0IGRvZXNuJ3QgbWF0Y2hcbiAgICAgICAgICovXG4gICAgICAgIGFzc2VzcyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMubWF0Y2hlcygpID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgICAgICAgICBlYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyW2FjdGlvbl0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIHJlZ2lzdHJhdGlvbiBvZiBxdWVyeSBoYW5kbGVycy5cbiAgICAgKiBNYW5hZ2VzIHRoZSBxdWVyeSBoYW5kbGVyJ3Mgc3RhdGUgYW5kIGlzIHJlc3BvbnNpYmxlIGZvciB3aXJpbmcgdXAgYnJvd3NlciBldmVudHNcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1lZGlhUXVlcnlEaXNwYXRjaCAoKSB7XG4gICAgICAgIGlmKCFtYXRjaE1lZGlhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hdGNoTWVkaWEgbm90IHByZXNlbnQsIGxlZ2FjeSBicm93c2VycyByZXF1aXJlIGEgcG9seWZpbGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVlcmllcyA9IHt9O1xuICAgICAgICB0aGlzLmJyb3dzZXJJc0luY2FwYWJsZSA9ICFtYXRjaE1lZGlhKCdvbmx5IGFsbCcpLm1hdGNoZXM7XG4gICAgfVxuXG4gICAgTWVkaWFRdWVyeURpc3BhdGNoLnByb3RvdHlwZSA9IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBmb3IgdGhlIGdpdmVuIG1lZGlhIHF1ZXJ5XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxIHRoZSBtZWRpYSBxdWVyeVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdCB8fCBBcnJheSB8fCBGdW5jdGlvbn0gb3B0aW9ucyBlaXRoZXIgYSBzaW5nbGUgcXVlcnkgaGFuZGxlciBvYmplY3QsIGEgZnVuY3Rpb24sIG9yIGFuIGFycmF5IG9mIHF1ZXJ5IGhhbmRsZXJzXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMubWF0Y2ggZmlyZWQgd2hlbiBxdWVyeSBtYXRjaGVkXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLnVubWF0Y2hdIGZpcmVkIHdoZW4gYSBxdWVyeSBpcyBubyBsb25nZXIgbWF0Y2hlZFxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5zZXR1cF0gZmlyZWQgd2hlbiBoYW5kbGVyIGZpcnN0IHRyaWdnZXJlZFxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlZmVyU2V0dXA9ZmFsc2VdIHdoZXRoZXIgc2V0dXAgc2hvdWxkIGJlIHJ1biBpbW1lZGlhdGVseSBvciBkZWZlcnJlZCB1bnRpbCBxdWVyeSBpcyBmaXJzdCBtYXRjaGVkXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Nob3VsZERlZ3JhZGU9ZmFsc2VdIHdoZXRoZXIgdGhpcyBwYXJ0aWN1bGFyIG1lZGlhIHF1ZXJ5IHNob3VsZCBhbHdheXMgcnVuIG9uIGluY2FwYWJsZSBicm93c2Vyc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXIgOiBmdW5jdGlvbihxLCBvcHRpb25zLCBzaG91bGREZWdyYWRlKSB7XG4gICAgICAgICAgICB2YXIgcXVlcmllcyAgICAgICAgID0gdGhpcy5xdWVyaWVzLFxuICAgICAgICAgICAgICAgIGlzVW5jb25kaXRpb25hbCA9IHNob3VsZERlZ3JhZGUgJiYgdGhpcy5icm93c2VySXNJbmNhcGFibGU7XG5cbiAgICAgICAgICAgIGlmKCFxdWVyaWVzW3FdKSB7XG4gICAgICAgICAgICAgICAgcXVlcmllc1txXSA9IG5ldyBNZWRpYVF1ZXJ5KHEsIGlzVW5jb25kaXRpb25hbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbm9ybWFsaXNlIHRvIG9iamVjdCBpbiBhbiBhcnJheVxuICAgICAgICAgICAgaWYoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IG1hdGNoIDogb3B0aW9ucyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIWlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gW29wdGlvbnNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWFjaChvcHRpb25zLCBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgcXVlcmllc1txXS5hZGRIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB1bnJlZ2lzdGVycyBhIHF1ZXJ5IGFuZCBhbGwgaXQncyBoYW5kbGVycywgb3IgYSBzcGVjaWZpYyBoYW5kbGVyIGZvciBhIHF1ZXJ5XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxIHRoZSBtZWRpYSBxdWVyeSB0byB0YXJnZXRcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3QgfHwgZnVuY3Rpb259IFtoYW5kbGVyXSBzcGVjaWZpYyBoYW5kbGVyIHRvIHVucmVnaXN0ZXJcbiAgICAgICAgICovXG4gICAgICAgIHVucmVnaXN0ZXIgOiBmdW5jdGlvbihxLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJpZXNbcV07XG5cbiAgICAgICAgICAgIGlmKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeS5yZW1vdmVIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucXVlcmllc1txXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcblxuXHRyZXR1cm4gbmV3IE1lZGlhUXVlcnlEaXNwYXRjaCgpO1xuXG59KSk7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi92ZW5kb3IvZW5xdWlyZS5qc1wiLFwiL3ZlbmRvclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbihmdW5jdGlvbiBicm93c2VyaWZ5U2hpbShtb2R1bGUsIGV4cG9ydHMsIGRlZmluZSwgYnJvd3NlcmlmeV9zaGltX19kZWZpbmVfX21vZHVsZV9fZXhwb3J0X18pIHtcbi8qXG5cdEJyZWFrcG9pbnRzLmpzXG5cdHZlcnNpb24gMS4xXG5cblx0Q3JlYXRlcyBoYW5keSBldmVudHMgZm9yIHlvdXIgcmVzcG9uc2l2ZSBkZXNpZ24gYnJlYWtwb2ludHNcblxuXHRDb3B5cmlnaHQgMjAxMSBYT1hDTywgSW5jXG5cdGh0dHA6Ly94b3hjby5jb20vXG5cblx0QWx0ZXJlZCBieSBKb3NoIExhd3JlbmNlXG5cblx0RG9jdW1lbnRhdGlvbiBmb3IgdGhpcyBwbHVnaW4gbGl2ZXMgaGVyZTpcblx0aHR0cDovL3hveGNvLmNvbS9wcm9qZWN0cy9jb2RlL2JyZWFrcG9pbnRzXG5cblx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuXHRodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4qL1xuKGZ1bmN0aW9uKHdpbmRvdywgJCkge1xuXG5cdHZhciBsYXN0U2l6ZSA9IDA7XG5cblx0JC5mbi5yZXNldEJyZWFrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh3aW5kb3cpLnVuYmluZCgncmVzaXplJyk7XG5cdFx0aWYgKGludGVydmFsKSB7XG5cdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0XHR9XG5cdFx0bGFzdFNpemUgPSAwO1xuXHR9O1xuXG5cdCQuZm4uc2V0QnJlYWtwb2ludHMgPSBmdW5jdGlvbihzZXR0aW5ncykge1xuXG5cdFx0dmFyIG9wdGlvbnMgPSBqUXVlcnkuZXh0ZW5kKHtcblx0XHRcdGRpc3RpbmN0OiB0cnVlLFxuXHRcdFx0YnJlYWtwb2ludHM6IG5ldyBBcnJheSgzMjAsIDQ4MCwgNzY4LCAxMDI0KVxuXHRcdH0sIHNldHRpbmdzKTtcblxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQnJlYWtwb2ludHMoKSB7XG5cblx0XHRcdHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cdFx0XHR2YXIgZG9uZSA9IGZhbHNlO1xuXG5cdFx0XHRmb3IgKHZhciBicCBpbiBvcHRpb25zLmJyZWFrcG9pbnRzLnNvcnQoZnVuY3Rpb24oYSxiKSB7IHJldHVybiAoYi1hKSB9KSkge1xuXG5cdFx0XHRcdC8vIGZpcmUgb25FbnRlciB3aGVuIGEgYnJvd3NlciBleHBhbmRzIGludG8gYSBuZXcgYnJlYWtwb2ludFxuXHRcdFx0XHQvLyBpZiBpbiBkaXN0aW5jdCBtb2RlLCByZW1vdmUgYWxsIG90aGVyIGJyZWFrcG9pbnRzIGZpcnN0LlxuXHRcdFx0XHRpZiAoIWRvbmUgJiYgdyA+PSBvcHRpb25zLmJyZWFrcG9pbnRzW2JwXSAmJiBsYXN0U2l6ZSA8IG9wdGlvbnMuYnJlYWtwb2ludHNbYnBdKSB7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuZGlzdGluY3QpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIHggaW4gb3B0aW9ucy5icmVha3BvaW50cy5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gKGItYSkgfSkpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnYnJlYWtwb2ludC0nICsgb3B0aW9ucy5icmVha3BvaW50c1t4XSkpIHtcblx0XHRcdFx0XHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2JyZWFrcG9pbnQtJyArIG9wdGlvbnMuYnJlYWtwb2ludHNbeF0pO1xuXHRcdFx0XHRcdFx0XHRcdCQod2luZG93KS50cmlnZ2VyKCdleGl0QnJlYWtwb2ludCcgKyBvcHRpb25zLmJyZWFrcG9pbnRzW3hdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZG9uZSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnYnJlYWtwb2ludC0nICsgb3B0aW9ucy5icmVha3BvaW50c1ticF0pO1xuXHRcdFx0XHRcdCQod2luZG93KS50cmlnZ2VyKCdlbnRlckJyZWFrcG9pbnQnICsgb3B0aW9ucy5icmVha3BvaW50c1ticF0pO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBmaXJlIG9uRXhpdCB3aGVuIGJyb3dzZXIgY29udHJhY3RzIG91dCBvZiBhIGxhcmdlciBicmVha3BvaW50XG5cdFx0XHRcdGlmICh3IDwgb3B0aW9ucy5icmVha3BvaW50c1ticF0gJiYgbGFzdFNpemUgPj0gb3B0aW9ucy5icmVha3BvaW50c1ticF0pIHtcblx0XHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2JyZWFrcG9pbnQtJyArIG9wdGlvbnMuYnJlYWtwb2ludHNbYnBdKTtcblx0XHRcdFx0XHQkKHdpbmRvdykudHJpZ2dlcignZXhpdEJyZWFrcG9pbnQnICsgb3B0aW9ucy5icmVha3BvaW50c1ticF0pO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiBpbiBkaXN0aW5jdCBtb2RlLCBmaXJlIG9uRW50ZXIgd2hlbiBicm93c2VyIGNvbnRyYWN0cyBpbnRvIGEgc21hbGxlciBicmVha3BvaW50XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRvcHRpb25zLmRpc3RpbmN0ICYmIC8vIG9ubHkgb25lIGJyZWFrcG9pbnQgYXQgYSB0aW1lXG5cdFx0XHRcdFx0dyA+PSBvcHRpb25zLmJyZWFrcG9pbnRzW2JwXSAmJiAvLyBhbmQgd2UgYXJlIGluIHRoaXMgb25lXG5cdFx0XHRcdFx0dyA8IG9wdGlvbnMuYnJlYWtwb2ludHNbYnAtMV0gJiYgLy8gYW5kIHNtYWxsZXIgdGhhbiB0aGUgYmlnZ2VyIG9uZVxuXHRcdFx0XHRcdGxhc3RTaXplID4gdyAmJiAvLyBhbmQgd2UgY29udHJhY3RlZFxuXHRcdFx0XHRcdGxhc3RTaXplID4wICYmICAvLyBhbmQgdGhpcyBpcyBub3QgdGhlIGZpcnN0IHRpbWVcblx0XHRcdFx0XHQhJCgnYm9keScpLmhhc0NsYXNzKCdicmVha3BvaW50LScgKyBvcHRpb25zLmJyZWFrcG9pbnRzW2JwXSkgLy8gYW5kIHdlIGFyZW4ndCBhbHJlYWR5IGluIHRoaXMgYnJlYWtwb2ludFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnYnJlYWtwb2ludC0nICsgb3B0aW9ucy5icmVha3BvaW50c1ticF0pO1xuXHRcdFx0XHRcdCQod2luZG93KS50cmlnZ2VyKCdlbnRlckJyZWFrcG9pbnQnICsgb3B0aW9ucy5icmVha3BvaW50c1ticF0pO1xuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gc2V0IHVwIGZvciBuZXh0IGNhbGxcblx0XHRcdGlmIChsYXN0U2l6ZSAhPSB3KSB7XG5cdFx0XHRcdGxhc3RTaXplID0gdztcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdHJpZ2dlciBicmVha3BvaW50IHVwZGF0ZSBvbiBsb2FkXG5cdFx0dXBkYXRlQnJlYWtwb2ludHMoKTtcblxuXHRcdC8vIHRyaWdnZXIgYnJlYWtwb2ludCB1cGRhdGUgb24gd2luZG93IHJlc2l6ZVxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5yZXNpemVUbykgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVG8pO1xuXHRcdFx0dGhpcy5yZXNpemVUbyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQodGhpcykudHJpZ2dlcigncmVzaXplRW5kJyk7XG5cdFx0XHR9LCAyNTApO1xuXHRcdH0pO1xuXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemVFbmQnLCB1cGRhdGVCcmVha3BvaW50cyk7XG5cblx0fTtcblxufSkod2luZG93LCBqUXVlcnkpO1xuXG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiBicmVha3BvaW50cyAhPSBcInVuZGVmaW5lZFwiID8gYnJlYWtwb2ludHMgOiB3aW5kb3cuYnJlYWtwb2ludHMpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gZGVmaW5lRXhwb3J0KGV4KSB7IG1vZHVsZS5leHBvcnRzID0gZXg7IH0pO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi92ZW5kb3IvanF1ZXJ5LmJyZWFrcG9pbnRzLmpzXCIsXCIvdmVuZG9yXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuKGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuLyohXG5cdENvbG9yYm94IHYxLjUuMiAtIDIwMTQtMDItMjhcblx0alF1ZXJ5IGxpZ2h0Ym94IGFuZCBtb2RhbCB3aW5kb3cgcGx1Z2luXG5cdChjKSAyMDE0IEphY2sgTW9vcmUgLSBodHRwOi8vd3d3LmphY2tsbW9vcmUuY29tL2NvbG9yYm94XG5cdGxpY2Vuc2U6IGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4qL1xuKGZ1bmN0aW9uICgkLCBkb2N1bWVudCwgd2luZG93KSB7XG5cdHZhclxuXHQvLyBEZWZhdWx0IHNldHRpbmdzIG9iamVjdC5cblx0Ly8gU2VlIGh0dHA6Ly9qYWNrbG1vb3JlLmNvbS9jb2xvcmJveCBmb3IgZGV0YWlscy5cblx0ZGVmYXVsdHMgPSB7XG5cdFx0Ly8gZGF0YSBzb3VyY2VzXG5cdFx0aHRtbDogZmFsc2UsXG5cdFx0cGhvdG86IGZhbHNlLFxuXHRcdGlmcmFtZTogZmFsc2UsXG5cdFx0aW5saW5lOiBmYWxzZSxcblxuXHRcdC8vIGJlaGF2aW9yIGFuZCBhcHBlYXJhbmNlXG5cdFx0dHJhbnNpdGlvbjogXCJlbGFzdGljXCIsXG5cdFx0c3BlZWQ6IDMwMCxcblx0XHRmYWRlT3V0OiAzMDAsXG5cdFx0d2lkdGg6IGZhbHNlLFxuXHRcdGluaXRpYWxXaWR0aDogXCI2MDBcIixcblx0XHRpbm5lcldpZHRoOiBmYWxzZSxcblx0XHRtYXhXaWR0aDogZmFsc2UsXG5cdFx0aGVpZ2h0OiBmYWxzZSxcblx0XHRpbml0aWFsSGVpZ2h0OiBcIjQ1MFwiLFxuXHRcdGlubmVySGVpZ2h0OiBmYWxzZSxcblx0XHRtYXhIZWlnaHQ6IGZhbHNlLFxuXHRcdHNjYWxlUGhvdG9zOiB0cnVlLFxuXHRcdHNjcm9sbGluZzogdHJ1ZSxcblx0XHRvcGFjaXR5OiAwLjksXG5cdFx0cHJlbG9hZGluZzogdHJ1ZSxcblx0XHRjbGFzc05hbWU6IGZhbHNlLFxuXHRcdG92ZXJsYXlDbG9zZTogdHJ1ZSxcblx0XHRlc2NLZXk6IHRydWUsXG5cdFx0YXJyb3dLZXk6IHRydWUsXG5cdFx0dG9wOiBmYWxzZSxcblx0XHRib3R0b206IGZhbHNlLFxuXHRcdGxlZnQ6IGZhbHNlLFxuXHRcdHJpZ2h0OiBmYWxzZSxcblx0XHRmaXhlZDogZmFsc2UsXG5cdFx0ZGF0YTogdW5kZWZpbmVkLFxuXHRcdGNsb3NlQnV0dG9uOiB0cnVlLFxuXHRcdGZhc3RJZnJhbWU6IHRydWUsXG5cdFx0b3BlbjogZmFsc2UsXG5cdFx0cmVwb3NpdGlvbjogdHJ1ZSxcblx0XHRsb29wOiB0cnVlLFxuXHRcdHNsaWRlc2hvdzogZmFsc2UsXG5cdFx0c2xpZGVzaG93QXV0bzogdHJ1ZSxcblx0XHRzbGlkZXNob3dTcGVlZDogMjUwMCxcblx0XHRzbGlkZXNob3dTdGFydDogXCJzdGFydCBzbGlkZXNob3dcIixcblx0XHRzbGlkZXNob3dTdG9wOiBcInN0b3Agc2xpZGVzaG93XCIsXG5cdFx0cGhvdG9SZWdleDogL1xcLihnaWZ8cG5nfGpwKGV8Z3xlZyl8Ym1wfGljb3x3ZWJwfGp4cnxzdmcpKCgjfFxcPykuKik/JC9pLFxuXG5cdFx0Ly8gYWx0ZXJuYXRlIGltYWdlIHBhdGhzIGZvciBoaWdoLXJlcyBkaXNwbGF5c1xuXHRcdHJldGluYUltYWdlOiBmYWxzZSxcblx0XHRyZXRpbmFVcmw6IGZhbHNlLFxuXHRcdHJldGluYVN1ZmZpeDogJ0AyeC4kMScsXG5cblx0XHQvLyBpbnRlcm5hdGlvbmFsaXphdGlvblxuXHRcdGN1cnJlbnQ6IFwiaW1hZ2Uge2N1cnJlbnR9IG9mIHt0b3RhbH1cIixcblx0XHRwcmV2aW91czogXCJwcmV2aW91c1wiLFxuXHRcdG5leHQ6IFwibmV4dFwiLFxuXHRcdGNsb3NlOiBcImNsb3NlXCIsXG5cdFx0eGhyRXJyb3I6IFwiVGhpcyBjb250ZW50IGZhaWxlZCB0byBsb2FkLlwiLFxuXHRcdGltZ0Vycm9yOiBcIlRoaXMgaW1hZ2UgZmFpbGVkIHRvIGxvYWQuXCIsXG5cblx0XHQvLyBhY2Nlc3NiaWxpdHlcblx0XHRyZXR1cm5Gb2N1czogdHJ1ZSxcblx0XHR0cmFwRm9jdXM6IHRydWUsXG5cblx0XHQvLyBjYWxsYmFja3Ncblx0XHRvbk9wZW46IGZhbHNlLFxuXHRcdG9uTG9hZDogZmFsc2UsXG5cdFx0b25Db21wbGV0ZTogZmFsc2UsXG5cdFx0b25DbGVhbnVwOiBmYWxzZSxcblx0XHRvbkNsb3NlZDogZmFsc2UsXG5cblx0XHRyZWw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucmVsO1xuXHRcdH0sXG5cdFx0aHJlZjogZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBVc2luZyAuYXR0cigpIHNvIHRoYXQgdGhlIGhyZWYgY2FuIGFsc28gYmUgdXNlZCB0byBwcm92aWRlIGEgc2VsZWN0b3IgZm9yIGlubGluZSBjb250ZW50XG5cdFx0XHRyZXR1cm4gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cdFx0fSxcblx0XHR0aXRsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aXRsZTtcblx0XHR9XG5cdH0sXG5cblxuXHQvLyBBYnN0cmFjdGluZyB0aGUgSFRNTCBhbmQgZXZlbnQgaWRlbnRpZmllcnMgZm9yIGVhc3kgcmVicmFuZGluZ1xuXHRjb2xvcmJveCA9ICdjb2xvcmJveCcsXG5cdHByZWZpeCA9ICdjYm94Jyxcblx0Ym94RWxlbWVudCA9IHByZWZpeCArICdFbGVtZW50Jyxcblx0XG5cdC8vIEV2ZW50c1xuXHRldmVudF9vcGVuID0gcHJlZml4ICsgJ19vcGVuJyxcblx0ZXZlbnRfbG9hZCA9IHByZWZpeCArICdfbG9hZCcsXG5cdGV2ZW50X2NvbXBsZXRlID0gcHJlZml4ICsgJ19jb21wbGV0ZScsXG5cdGV2ZW50X2NsZWFudXAgPSBwcmVmaXggKyAnX2NsZWFudXAnLFxuXHRldmVudF9jbG9zZWQgPSBwcmVmaXggKyAnX2Nsb3NlZCcsXG5cdGV2ZW50X3B1cmdlID0gcHJlZml4ICsgJ19wdXJnZScsXG5cblx0Ly8gQ2FjaGVkIGpRdWVyeSBPYmplY3QgVmFyaWFibGVzXG5cdCRvdmVybGF5LFxuXHQkYm94LFxuXHQkd3JhcCxcblx0JGNvbnRlbnQsXG5cdCR0b3BCb3JkZXIsXG5cdCRsZWZ0Qm9yZGVyLFxuXHQkcmlnaHRCb3JkZXIsXG5cdCRib3R0b21Cb3JkZXIsXG5cdCRyZWxhdGVkLFxuXHQkd2luZG93LFxuXHQkbG9hZGVkLFxuXHQkbG9hZGluZ0JheSxcblx0JGxvYWRpbmdPdmVybGF5LFxuXHQkdGl0bGUsXG5cdCRjdXJyZW50LFxuXHQkc2xpZGVzaG93LFxuXHQkbmV4dCxcblx0JHByZXYsXG5cdCRjbG9zZSxcblx0JGdyb3VwQ29udHJvbHMsXG5cdCRldmVudHMgPSAkKCc8YS8+JyksIC8vICQoe30pIHdvdWxkIGJlIHByZWZlcmVkLCBidXQgdGhlcmUgaXMgYW4gaXNzdWUgd2l0aCBqUXVlcnkgMS40LjJcblx0XG5cdC8vIFZhcmlhYmxlcyBmb3IgY2FjaGVkIHZhbHVlcyBvciB1c2UgYWNyb3NzIG11bHRpcGxlIGZ1bmN0aW9uc1xuXHRzZXR0aW5ncyxcblx0aW50ZXJmYWNlSGVpZ2h0LFxuXHRpbnRlcmZhY2VXaWR0aCxcblx0bG9hZGVkSGVpZ2h0LFxuXHRsb2FkZWRXaWR0aCxcblx0aW5kZXgsXG5cdHBob3RvLFxuXHRvcGVuLFxuXHRhY3RpdmUsXG5cdGNsb3NpbmcsXG5cdGxvYWRpbmdUaW1lcixcblx0cHVibGljTWV0aG9kLFxuXHRkaXYgPSBcImRpdlwiLFxuXHRyZXF1ZXN0cyA9IDAsXG5cdHByZXZpb3VzQ1NTID0ge30sXG5cdGluaXQ7XG5cblx0Ly8gKioqKioqKioqKioqKioqKlxuXHQvLyBIRUxQRVIgRlVOQ1RJT05TXG5cdC8vICoqKioqKioqKioqKioqKipcblx0XG5cdC8vIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBuZXcgalF1ZXJ5IG9iamVjdHNcblx0ZnVuY3Rpb24gJHRhZyh0YWcsIGlkLCBjc3MpIHtcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuXHRcdGlmIChpZCkge1xuXHRcdFx0ZWxlbWVudC5pZCA9IHByZWZpeCArIGlkO1xuXHRcdH1cblxuXHRcdGlmIChjc3MpIHtcblx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzcztcblx0XHR9XG5cblx0XHRyZXR1cm4gJChlbGVtZW50KTtcblx0fVxuXHRcblx0Ly8gR2V0IHRoZSB3aW5kb3cgaGVpZ2h0IHVzaW5nIGlubmVySGVpZ2h0IHdoZW4gYXZhaWxhYmxlIHRvIGF2b2lkIGFuIGlzc3VlIHdpdGggaU9TXG5cdC8vIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzY3MjRcblx0ZnVuY3Rpb24gd2luaGVpZ2h0KCkge1xuXHRcdHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBTZXR0aW5ncyhlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0aWYgKG9wdGlvbnMgIT09IE9iamVjdChvcHRpb25zKSkge1xuXHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdH1cblxuXHRcdHRoaXMuY2FjaGUgPSB7fTtcblx0XHR0aGlzLmVsID0gZWxlbWVudDtcblx0XHR0aGlzLmdldCA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0dmFyIGRhdGFBdHRyO1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHRpZiAodGhpcy5jYWNoZVtrZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dmFsdWUgPSB0aGlzLmNhY2hlW2tleV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhQXR0ciA9ICQodGhpcy5lbCkuYXR0cignZGF0YS1jYm94LScra2V5KTtcblxuXHRcdFx0XHRpZiAoZGF0YUF0dHIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGF0YUF0dHI7XG5cdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1trZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IG9wdGlvbnNba2V5XTtcblx0XHRcdFx0fSBlbHNlIGlmIChkZWZhdWx0c1trZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlZmF1bHRzW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5jYWNoZVtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAkLmlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbCh0aGlzLmVsKSA6IHZhbHVlO1xuXHRcdH07XG5cdH1cblxuXHQvLyBEZXRlcm1pbmUgdGhlIG5leHQgYW5kIHByZXZpb3VzIG1lbWJlcnMgaW4gYSBncm91cC5cblx0ZnVuY3Rpb24gZ2V0SW5kZXgoaW5jcmVtZW50KSB7XG5cdFx0dmFyXG5cdFx0bWF4ID0gJHJlbGF0ZWQubGVuZ3RoLFxuXHRcdG5ld0luZGV4ID0gKGluZGV4ICsgaW5jcmVtZW50KSAlIG1heDtcblx0XHRcblx0XHRyZXR1cm4gKG5ld0luZGV4IDwgMCkgPyBtYXggKyBuZXdJbmRleCA6IG5ld0luZGV4O1xuXHR9XG5cblx0Ly8gQ29udmVydCAnJScgYW5kICdweCcgdmFsdWVzIHRvIGludGVnZXJzXG5cdGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgZGltZW5zaW9uKSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKC8lLy50ZXN0KHNpemUpID8gKChkaW1lbnNpb24gPT09ICd4JyA/ICR3aW5kb3cud2lkdGgoKSA6IHdpbmhlaWdodCgpKSAvIDEwMCkgOiAxKSAqIHBhcnNlSW50KHNpemUsIDEwKSk7XG5cdH1cblx0XG5cdC8vIENoZWNrcyBhbiBocmVmIHRvIHNlZSBpZiBpdCBpcyBhIHBob3RvLlxuXHQvLyBUaGVyZSBpcyBhIGZvcmNlIHBob3RvIG9wdGlvbiAocGhvdG86IHRydWUpIGZvciBocmVmcyB0aGF0IGNhbm5vdCBiZSBtYXRjaGVkIGJ5IHRoZSByZWdleC5cblx0ZnVuY3Rpb24gaXNJbWFnZShzZXR0aW5ncywgdXJsKSB7XG5cdFx0cmV0dXJuIHNldHRpbmdzLmdldCgncGhvdG8nKSB8fCBzZXR0aW5ncy5nZXQoJ3Bob3RvUmVnZXgnKS50ZXN0KHVybCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZXRpbmFVcmwoc2V0dGluZ3MsIHVybCkge1xuXHRcdHJldHVybiBzZXR0aW5ncy5nZXQoJ3JldGluYVVybCcpICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSA/IHVybC5yZXBsYWNlKHNldHRpbmdzLmdldCgncGhvdG9SZWdleCcpLCBzZXR0aW5ncy5nZXQoJ3JldGluYVN1ZmZpeCcpKSA6IHVybDtcblx0fVxuXG5cdGZ1bmN0aW9uIHRyYXBGb2N1cyhlKSB7XG5cdFx0aWYgKCdjb250YWlucycgaW4gJGJveFswXSAmJiAhJGJveFswXS5jb250YWlucyhlLnRhcmdldCkpIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHQkYm94LmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0Q2xhc3Moc3RyKSB7XG5cdFx0aWYgKHNldENsYXNzLnN0ciAhPT0gc3RyKSB7XG5cdFx0XHQkYm94LmFkZCgkb3ZlcmxheSkucmVtb3ZlQ2xhc3Moc2V0Q2xhc3Muc3RyKS5hZGRDbGFzcyhzdHIpO1xuXHRcdFx0c2V0Q2xhc3Muc3RyID0gc3RyO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdldFJlbGF0ZWQoKSB7XG5cdFx0aW5kZXggPSAwO1xuXHRcdFxuXHRcdGlmIChyZWwgJiYgcmVsICE9PSAnbm9mb2xsb3cnKSB7XG5cdFx0XHQkcmVsYXRlZCA9ICQoJy4nICsgYm94RWxlbWVudCkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAkLmRhdGEodGhpcywgY29sb3Jib3gpO1xuXHRcdFx0XHR2YXIgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3ModGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiAoc2V0dGluZ3MuZ2V0KCdyZWwnKSA9PT0gcmVsKTtcblx0XHRcdH0pO1xuXHRcdFx0aW5kZXggPSAkcmVsYXRlZC5pbmRleChzZXR0aW5ncy5lbCk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGRpcmVjdCBjYWxscyB0byBDb2xvcmJveC5cblx0XHRcdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0JHJlbGF0ZWQgPSAkcmVsYXRlZC5hZGQoc2V0dGluZ3MuZWwpO1xuXHRcdFx0XHRpbmRleCA9ICRyZWxhdGVkLmxlbmd0aCAtIDE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRyZWxhdGVkID0gJChzZXR0aW5ncy5lbCk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdHJpZ2dlcihldmVudCkge1xuXHRcdC8vIGZvciBleHRlcm5hbCB1c2Vcblx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKGV2ZW50KTtcblx0XHQvLyBmb3IgaW50ZXJuYWwgdXNlXG5cdFx0JGV2ZW50cy50cmlnZ2VySGFuZGxlcihldmVudCk7XG5cdH1cblxuXHR2YXIgc2xpZGVzaG93ID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGFjdGl2ZSxcblx0XHRcdGNsYXNzTmFtZSA9IHByZWZpeCArIFwiU2xpZGVzaG93X1wiLFxuXHRcdFx0Y2xpY2sgPSBcImNsaWNrLlwiICsgcHJlZml4LFxuXHRcdFx0dGltZU91dDtcblxuXHRcdGZ1bmN0aW9uIGNsZWFyICgpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lT3V0KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXQoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdsb29wJykgfHwgJHJlbGF0ZWRbaW5kZXggKyAxXSkge1xuXHRcdFx0XHRjbGVhcigpO1xuXHRcdFx0XHR0aW1lT3V0ID0gc2V0VGltZW91dChwdWJsaWNNZXRob2QubmV4dCwgc2V0dGluZ3MuZ2V0KCdzbGlkZXNob3dTcGVlZCcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzdGFydCgpIHtcblx0XHRcdCRzbGlkZXNob3dcblx0XHRcdFx0Lmh0bWwoc2V0dGluZ3MuZ2V0KCdzbGlkZXNob3dTdG9wJykpXG5cdFx0XHRcdC51bmJpbmQoY2xpY2spXG5cdFx0XHRcdC5vbmUoY2xpY2ssIHN0b3ApO1xuXG5cdFx0XHQkZXZlbnRzXG5cdFx0XHRcdC5iaW5kKGV2ZW50X2NvbXBsZXRlLCBzZXQpXG5cdFx0XHRcdC5iaW5kKGV2ZW50X2xvYWQsIGNsZWFyKTtcblxuXHRcdFx0JGJveC5yZW1vdmVDbGFzcyhjbGFzc05hbWUgKyBcIm9mZlwiKS5hZGRDbGFzcyhjbGFzc05hbWUgKyBcIm9uXCIpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN0b3AoKSB7XG5cdFx0XHRjbGVhcigpO1xuXHRcdFx0XG5cdFx0XHQkZXZlbnRzXG5cdFx0XHRcdC51bmJpbmQoZXZlbnRfY29tcGxldGUsIHNldClcblx0XHRcdFx0LnVuYmluZChldmVudF9sb2FkLCBjbGVhcik7XG5cblx0XHRcdCRzbGlkZXNob3dcblx0XHRcdFx0Lmh0bWwoc2V0dGluZ3MuZ2V0KCdzbGlkZXNob3dTdGFydCcpKVxuXHRcdFx0XHQudW5iaW5kKGNsaWNrKVxuXHRcdFx0XHQub25lKGNsaWNrLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cHVibGljTWV0aG9kLm5leHQoKTtcblx0XHRcdFx0XHRzdGFydCgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0JGJveC5yZW1vdmVDbGFzcyhjbGFzc05hbWUgKyBcIm9uXCIpLmFkZENsYXNzKGNsYXNzTmFtZSArIFwib2ZmXCIpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlc2V0KCkge1xuXHRcdFx0YWN0aXZlID0gZmFsc2U7XG5cdFx0XHQkc2xpZGVzaG93LmhpZGUoKTtcblx0XHRcdGNsZWFyKCk7XG5cdFx0XHQkZXZlbnRzXG5cdFx0XHRcdC51bmJpbmQoZXZlbnRfY29tcGxldGUsIHNldClcblx0XHRcdFx0LnVuYmluZChldmVudF9sb2FkLCBjbGVhcik7XG5cdFx0XHQkYm94LnJlbW92ZUNsYXNzKGNsYXNzTmFtZSArIFwib2ZmIFwiICsgY2xhc3NOYW1lICsgXCJvblwiKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdGlmIChhY3RpdmUpIHtcblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5nZXQoJ3NsaWRlc2hvdycpKSB7XG5cdFx0XHRcdFx0JGV2ZW50cy51bmJpbmQoZXZlbnRfY2xlYW51cCwgcmVzZXQpO1xuXHRcdFx0XHRcdHJlc2V0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3NsaWRlc2hvdycpICYmICRyZWxhdGVkWzFdKSB7XG5cdFx0XHRcdFx0YWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0XHQkZXZlbnRzLm9uZShldmVudF9jbGVhbnVwLCByZXNldCk7XG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgnc2xpZGVzaG93QXV0bycpKSB7XG5cdFx0XHRcdFx0XHRzdGFydCgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdG9wKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRzbGlkZXNob3cuc2hvdygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHR9KCkpO1xuXG5cblx0ZnVuY3Rpb24gbGF1bmNoKGVsZW1lbnQpIHtcblx0XHR2YXIgb3B0aW9ucztcblxuXHRcdGlmICghY2xvc2luZykge1xuXG5cdFx0XHRvcHRpb25zID0gJChlbGVtZW50KS5kYXRhKCdjb2xvcmJveCcpO1xuXG5cdFx0XHRzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhlbGVtZW50LCBvcHRpb25zKTtcblxuXHRcdFx0cmVsID0gc2V0dGluZ3MuZ2V0KCdyZWwnKTtcblx0XHRcdFxuXHRcdFx0Z2V0UmVsYXRlZCgpO1xuXG5cdFx0XHRpZiAoIW9wZW4pIHtcblx0XHRcdFx0b3BlbiA9IGFjdGl2ZSA9IHRydWU7IC8vIFByZXZlbnRzIHRoZSBwYWdlLWNoYW5nZSBhY3Rpb24gZnJvbSBxdWV1aW5nIHVwIGlmIHRoZSB2aXNpdG9yIGhvbGRzIGRvd24gdGhlIGxlZnQgb3IgcmlnaHQga2V5cy5cblxuXHRcdFx0XHRzZXRDbGFzcyhzZXR0aW5ncy5nZXQoJ2NsYXNzTmFtZScpKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFNob3cgY29sb3Jib3ggc28gdGhlIHNpemVzIGNhbiBiZSBjYWxjdWxhdGVkIGluIG9sZGVyIHZlcnNpb25zIG9mIGpRdWVyeVxuXHRcdFx0XHQkYm94LmNzcyh7dmlzaWJpbGl0eTonaGlkZGVuJywgZGlzcGxheTonYmxvY2snfSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkbG9hZGVkID0gJHRhZyhkaXYsICdMb2FkZWRDb250ZW50JywgJ3dpZHRoOjA7IGhlaWdodDowOyBvdmVyZmxvdzpoaWRkZW47IHZpc2liaWxpdHk6aGlkZGVuJyk7XG5cdFx0XHRcdCRjb250ZW50LmNzcyh7d2lkdGg6JycsIGhlaWdodDonJ30pLmFwcGVuZCgkbG9hZGVkKTtcblxuXHRcdFx0XHQvLyBDYWNoZSB2YWx1ZXMgbmVlZGVkIGZvciBzaXplIGNhbGN1bGF0aW9uc1xuXHRcdFx0XHRpbnRlcmZhY2VIZWlnaHQgPSAkdG9wQm9yZGVyLmhlaWdodCgpICsgJGJvdHRvbUJvcmRlci5oZWlnaHQoKSArICRjb250ZW50Lm91dGVySGVpZ2h0KHRydWUpIC0gJGNvbnRlbnQuaGVpZ2h0KCk7XG5cdFx0XHRcdGludGVyZmFjZVdpZHRoID0gJGxlZnRCb3JkZXIud2lkdGgoKSArICRyaWdodEJvcmRlci53aWR0aCgpICsgJGNvbnRlbnQub3V0ZXJXaWR0aCh0cnVlKSAtICRjb250ZW50LndpZHRoKCk7XG5cdFx0XHRcdGxvYWRlZEhlaWdodCA9ICRsb2FkZWQub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cdFx0XHRcdGxvYWRlZFdpZHRoID0gJGxvYWRlZC5vdXRlcldpZHRoKHRydWUpO1xuXG5cdFx0XHRcdC8vIE9wZW5zIGluaXRhbCBlbXB0eSBDb2xvcmJveCBwcmlvciB0byBjb250ZW50IGJlaW5nIGxvYWRlZC5cblx0XHRcdFx0c2V0dGluZ3MudyA9IHNldFNpemUoc2V0dGluZ3MuZ2V0KCdpbml0aWFsV2lkdGgnKSwgJ3gnKTtcblx0XHRcdFx0c2V0dGluZ3MuaCA9IHNldFNpemUoc2V0dGluZ3MuZ2V0KCdpbml0aWFsSGVpZ2h0JyksICd5Jyk7XG5cdFx0XHRcdCRsb2FkZWQuY3NzKHt3aWR0aDonJywgaGVpZ2h0OnNldHRpbmdzLmh9KTtcblx0XHRcdFx0cHVibGljTWV0aG9kLnBvc2l0aW9uKCk7XG5cblx0XHRcdFx0dHJpZ2dlcihldmVudF9vcGVuKTtcblx0XHRcdFx0c2V0dGluZ3MuZ2V0KCdvbk9wZW4nKTtcblxuXHRcdFx0XHQkZ3JvdXBDb250cm9scy5hZGQoJHRpdGxlKS5oaWRlKCk7XG5cblx0XHRcdFx0JGJveC5mb2N1cygpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgndHJhcEZvY3VzJykpIHtcblx0XHRcdFx0XHQvLyBDb25maW5lIGZvY3VzIHRvIHRoZSBtb2RhbFxuXHRcdFx0XHRcdC8vIFVzZXMgZXZlbnQgY2FwdHVyaW5nIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBpbiBJRTgtXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0cmFwRm9jdXMsIHRydWUpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQkZXZlbnRzLm9uZShldmVudF9jbG9zZWQsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0cmFwRm9jdXMsIHRydWUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmV0dXJuIGZvY3VzIG9uIGNsb3Npbmdcblx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgncmV0dXJuRm9jdXMnKSkge1xuXHRcdFx0XHRcdCRldmVudHMub25lKGV2ZW50X2Nsb3NlZCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JChzZXR0aW5ncy5lbCkuZm9jdXMoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQkb3ZlcmxheS5jc3Moe1xuXHRcdFx0XHRvcGFjaXR5OiBwYXJzZUZsb2F0KHNldHRpbmdzLmdldCgnb3BhY2l0eScpKSxcblx0XHRcdFx0Y3Vyc29yOiBzZXR0aW5ncy5nZXQoJ292ZXJsYXlDbG9zZScpID8gXCJwb2ludGVyXCIgOiBcImF1dG9cIixcblx0XHRcdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnXG5cdFx0XHR9KS5zaG93KCk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ2Nsb3NlQnV0dG9uJykpIHtcblx0XHRcdFx0JGNsb3NlLmh0bWwoc2V0dGluZ3MuZ2V0KCdjbG9zZScpKS5hcHBlbmRUbygkY29udGVudCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY2xvc2UuYXBwZW5kVG8oJzxkaXYvPicpOyAvLyByZXBsYWNlIHdpdGggLmRldGFjaCgpIHdoZW4gZHJvcHBpbmcgalF1ZXJ5IDwgMS40XG5cdFx0XHR9XG5cblx0XHRcdGxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDb2xvcmJveCdzIG1hcmt1cCBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgRE9NIHByaW9yIHRvIGJlaW5nIGNhbGxlZFxuXHQvLyBzbyB0aGF0IHRoZSBicm93c2VyIHdpbGwgZ28gYWhlYWQgYW5kIGxvYWQgdGhlIENTUyBiYWNrZ3JvdW5kIGltYWdlcy5cblx0ZnVuY3Rpb24gYXBwZW5kSFRNTCgpIHtcblx0XHRpZiAoISRib3ggJiYgZG9jdW1lbnQuYm9keSkge1xuXHRcdFx0aW5pdCA9IGZhbHNlO1xuXHRcdFx0JHdpbmRvdyA9ICQod2luZG93KTtcblx0XHRcdCRib3ggPSAkdGFnKGRpdikuYXR0cih7XG5cdFx0XHRcdGlkOiBjb2xvcmJveCxcblx0XHRcdFx0J2NsYXNzJzogJC5zdXBwb3J0Lm9wYWNpdHkgPT09IGZhbHNlID8gcHJlZml4ICsgJ0lFJyA6ICcnLCAvLyBjbGFzcyBmb3Igb3B0aW9uYWwgSUU4ICYgbG93ZXIgdGFyZ2V0ZWQgQ1NTLlxuXHRcdFx0XHRyb2xlOiAnZGlhbG9nJyxcblx0XHRcdFx0dGFiaW5kZXg6ICctMSdcblx0XHRcdH0pLmhpZGUoKTtcblx0XHRcdCRvdmVybGF5ID0gJHRhZyhkaXYsIFwiT3ZlcmxheVwiKS5oaWRlKCk7XG5cdFx0XHQkbG9hZGluZ092ZXJsYXkgPSAkKFskdGFnKGRpdiwgXCJMb2FkaW5nT3ZlcmxheVwiKVswXSwkdGFnKGRpdiwgXCJMb2FkaW5nR3JhcGhpY1wiKVswXV0pO1xuXHRcdFx0JHdyYXAgPSAkdGFnKGRpdiwgXCJXcmFwcGVyXCIpO1xuXHRcdFx0JGNvbnRlbnQgPSAkdGFnKGRpdiwgXCJDb250ZW50XCIpLmFwcGVuZChcblx0XHRcdFx0JHRpdGxlID0gJHRhZyhkaXYsIFwiVGl0bGVcIiksXG5cdFx0XHRcdCRjdXJyZW50ID0gJHRhZyhkaXYsIFwiQ3VycmVudFwiKSxcblx0XHRcdFx0JHByZXYgPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIi8+JykuYXR0cih7aWQ6cHJlZml4KydQcmV2aW91cyd9KSxcblx0XHRcdFx0JG5leHQgPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIi8+JykuYXR0cih7aWQ6cHJlZml4KydOZXh0J30pLFxuXHRcdFx0XHQkc2xpZGVzaG93ID0gJHRhZygnYnV0dG9uJywgXCJTbGlkZXNob3dcIiksXG5cdFx0XHRcdCRsb2FkaW5nT3ZlcmxheVxuXHRcdFx0KTtcblxuXHRcdFx0JGNsb3NlID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIvPicpLmF0dHIoe2lkOnByZWZpeCsnQ2xvc2UnfSk7XG5cdFx0XHRcblx0XHRcdCR3cmFwLmFwcGVuZCggLy8gVGhlIDN4MyBHcmlkIHRoYXQgbWFrZXMgdXAgQ29sb3Jib3hcblx0XHRcdFx0JHRhZyhkaXYpLmFwcGVuZChcblx0XHRcdFx0XHQkdGFnKGRpdiwgXCJUb3BMZWZ0XCIpLFxuXHRcdFx0XHRcdCR0b3BCb3JkZXIgPSAkdGFnKGRpdiwgXCJUb3BDZW50ZXJcIiksXG5cdFx0XHRcdFx0JHRhZyhkaXYsIFwiVG9wUmlnaHRcIilcblx0XHRcdFx0KSxcblx0XHRcdFx0JHRhZyhkaXYsIGZhbHNlLCAnY2xlYXI6bGVmdCcpLmFwcGVuZChcblx0XHRcdFx0XHQkbGVmdEJvcmRlciA9ICR0YWcoZGl2LCBcIk1pZGRsZUxlZnRcIiksXG5cdFx0XHRcdFx0JGNvbnRlbnQsXG5cdFx0XHRcdFx0JHJpZ2h0Qm9yZGVyID0gJHRhZyhkaXYsIFwiTWlkZGxlUmlnaHRcIilcblx0XHRcdFx0KSxcblx0XHRcdFx0JHRhZyhkaXYsIGZhbHNlLCAnY2xlYXI6bGVmdCcpLmFwcGVuZChcblx0XHRcdFx0XHQkdGFnKGRpdiwgXCJCb3R0b21MZWZ0XCIpLFxuXHRcdFx0XHRcdCRib3R0b21Cb3JkZXIgPSAkdGFnKGRpdiwgXCJCb3R0b21DZW50ZXJcIiksXG5cdFx0XHRcdFx0JHRhZyhkaXYsIFwiQm90dG9tUmlnaHRcIilcblx0XHRcdFx0KVxuXHRcdFx0KS5maW5kKCdkaXYgZGl2JykuY3NzKHsnZmxvYXQnOiAnbGVmdCd9KTtcblx0XHRcdFxuXHRcdFx0JGxvYWRpbmdCYXkgPSAkdGFnKGRpdiwgZmFsc2UsICdwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6OTk5OXB4OyB2aXNpYmlsaXR5OmhpZGRlbjsgZGlzcGxheTpub25lOyBtYXgtd2lkdGg6bm9uZTsnKTtcblx0XHRcdFxuXHRcdFx0JGdyb3VwQ29udHJvbHMgPSAkbmV4dC5hZGQoJHByZXYpLmFkZCgkY3VycmVudCkuYWRkKCRzbGlkZXNob3cpO1xuXG5cdFx0XHQkKGRvY3VtZW50LmJvZHkpLmFwcGVuZCgkb3ZlcmxheSwgJGJveC5hcHBlbmQoJHdyYXAsICRsb2FkaW5nQmF5KSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWRkIENvbG9yYm94J3MgZXZlbnQgYmluZGluZ3Ncblx0ZnVuY3Rpb24gYWRkQmluZGluZ3MoKSB7XG5cdFx0ZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcblx0XHRcdC8vIGlnbm9yZSBub24tbGVmdC1tb3VzZS1jbGlja3MgYW5kIGNsaWNrcyBtb2RpZmllZCB3aXRoIGN0cmwgLyBjb21tYW5kLCBzaGlmdCwgb3IgYWx0LlxuXHRcdFx0Ly8gU2VlOiBodHRwOi8vamFja2xtb29yZS5jb20vbm90ZXMvY2xpY2stZXZlbnRzL1xuXHRcdFx0aWYgKCEoZS53aGljaCA+IDEgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGxhdW5jaCh0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoJGJveCkge1xuXHRcdFx0aWYgKCFpbml0KSB7XG5cdFx0XHRcdGluaXQgPSB0cnVlO1xuXG5cdFx0XHRcdC8vIEFub255bW91cyBmdW5jdGlvbnMgaGVyZSBrZWVwIHRoZSBwdWJsaWMgbWV0aG9kIGZyb20gYmVpbmcgY2FjaGVkLCB0aGVyZWJ5IGFsbG93aW5nIHRoZW0gdG8gYmUgcmVkZWZpbmVkIG9uIHRoZSBmbHkuXG5cdFx0XHRcdCRuZXh0LmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRwdWJsaWNNZXRob2QubmV4dCgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JHByZXYuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHB1YmxpY01ldGhvZC5wcmV2KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQkY2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHB1YmxpY01ldGhvZC5jbG9zZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JG92ZXJsYXkuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ292ZXJsYXlDbG9zZScpKSB7XG5cdFx0XHRcdFx0XHRwdWJsaWNNZXRob2QuY2xvc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gS2V5IEJpbmRpbmdzXG5cdFx0XHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24uJyArIHByZWZpeCwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHR2YXIga2V5ID0gZS5rZXlDb2RlO1xuXHRcdFx0XHRcdGlmIChvcGVuICYmIHNldHRpbmdzLmdldCgnZXNjS2V5JykgJiYga2V5ID09PSAyNykge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cHVibGljTWV0aG9kLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvcGVuICYmIHNldHRpbmdzLmdldCgnYXJyb3dLZXknKSAmJiAkcmVsYXRlZFsxXSAmJiAhZS5hbHRLZXkpIHtcblx0XHRcdFx0XHRcdGlmIChrZXkgPT09IDM3KSB7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0JHByZXYuY2xpY2soKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoa2V5ID09PSAzOSkge1xuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdCRuZXh0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKCQuZm4ub24pKSB7XG5cdFx0XHRcdFx0Ly8gRm9yIGpRdWVyeSAxLjcrXG5cdFx0XHRcdFx0JChkb2N1bWVudCkub24oJ2NsaWNrLicrcHJlZml4LCAnLicrYm94RWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBGb3IgalF1ZXJ5IDEuMy54IC0+IDEuNi54XG5cdFx0XHRcdFx0Ly8gVGhpcyBjb2RlIGlzIG5ldmVyIHJlYWNoZWQgaW4galF1ZXJ5IDEuOSwgc28gZG8gbm90IGNvbnRhY3QgbWUgYWJvdXQgJ2xpdmUnIGJlaW5nIHJlbW92ZWQuXG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyBub3QgaGVyZSBmb3IgalF1ZXJ5IDEuOSwgaXQncyBoZXJlIGZvciBsZWdhY3kgdXNlcnMuXG5cdFx0XHRcdFx0JCgnLicrYm94RWxlbWVudCkubGl2ZSgnY2xpY2suJytwcmVmaXgsIGNsaWNrSGFuZGxlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBDb2xvcmJveCBhbHJlYWR5IGV4aXN0cy5cblx0aWYgKCQuY29sb3Jib3gpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBBcHBlbmQgdGhlIEhUTUwgd2hlbiB0aGUgRE9NIGxvYWRzXG5cdCQoYXBwZW5kSFRNTCk7XG5cblxuXHQvLyAqKioqKioqKioqKioqKioqXG5cdC8vIFBVQkxJQyBGVU5DVElPTlNcblx0Ly8gVXNhZ2UgZm9ybWF0OiAkLmNvbG9yYm94LmNsb3NlKCk7XG5cdC8vIFVzYWdlIGZyb20gd2l0aGluIGFuIGlmcmFtZTogcGFyZW50LmpRdWVyeS5jb2xvcmJveC5jbG9zZSgpO1xuXHQvLyAqKioqKioqKioqKioqKioqXG5cdFxuXHRwdWJsaWNNZXRob2QgPSAkLmZuW2NvbG9yYm94XSA9ICRbY29sb3Jib3hdID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHNldHRpbmdzO1xuXHRcdHZhciAkb2JqID0gdGhpcztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0aWYgKCQuaXNGdW5jdGlvbigkb2JqKSkgeyAvLyBhc3N1bWUgYSBjYWxsIHRvICQuY29sb3Jib3hcblx0XHRcdCRvYmogPSAkKCc8YS8+Jyk7XG5cdFx0XHRvcHRpb25zLm9wZW4gPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoISRvYmpbMF0pIHsgLy8gY29sb3Jib3ggYmVpbmcgYXBwbGllZCB0byBlbXB0eSBjb2xsZWN0aW9uXG5cdFx0XHRyZXR1cm4gJG9iajtcblx0XHR9XG5cblxuXHRcdGlmICghJG9ialswXSkgeyAvLyBjb2xvcmJveCBiZWluZyBhcHBsaWVkIHRvIGVtcHR5IGNvbGxlY3Rpb25cblx0XHRcdHJldHVybiAkb2JqO1xuXHRcdH1cblx0XHRcblx0XHRhcHBlbmRIVE1MKCk7XG5cblx0XHRpZiAoYWRkQmluZGluZ3MoKSkge1xuXG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0b3B0aW9ucy5vbkNvbXBsZXRlID0gY2FsbGJhY2s7XG5cdFx0XHR9XG5cblx0XHRcdCRvYmouZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBvbGQgPSAkLmRhdGEodGhpcywgY29sb3Jib3gpIHx8IHt9O1xuXHRcdFx0XHQkLmRhdGEodGhpcywgY29sb3Jib3gsICQuZXh0ZW5kKG9sZCwgb3B0aW9ucykpO1xuXHRcdFx0fSkuYWRkQ2xhc3MoYm94RWxlbWVudCk7XG5cblx0XHRcdHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCRvYmpbMF0sIG9wdGlvbnMpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdvcGVuJykpIHtcblx0XHRcdFx0bGF1bmNoKCRvYmpbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gJG9iajtcblx0fTtcblxuXHRwdWJsaWNNZXRob2QucG9zaXRpb24gPSBmdW5jdGlvbiAoc3BlZWQsIGxvYWRlZENhbGxiYWNrKSB7XG5cdFx0dmFyXG5cdFx0Y3NzLFxuXHRcdHRvcCA9IDAsXG5cdFx0bGVmdCA9IDAsXG5cdFx0b2Zmc2V0ID0gJGJveC5vZmZzZXQoKSxcblx0XHRzY3JvbGxUb3AsXG5cdFx0c2Nyb2xsTGVmdDtcblx0XHRcblx0XHQkd2luZG93LnVuYmluZCgncmVzaXplLicgKyBwcmVmaXgpO1xuXG5cdFx0Ly8gcmVtb3ZlIHRoZSBtb2RhbCBzbyB0aGF0IGl0IGRvZXNuJ3QgaW5mbHVlbmNlIHRoZSBkb2N1bWVudCB3aWR0aC9oZWlnaHRcblx0XHQkYm94LmNzcyh7dG9wOiAtOWU0LCBsZWZ0OiAtOWU0fSk7XG5cblx0XHRzY3JvbGxUb3AgPSAkd2luZG93LnNjcm9sbFRvcCgpO1xuXHRcdHNjcm9sbExlZnQgPSAkd2luZG93LnNjcm9sbExlZnQoKTtcblxuXHRcdGlmIChzZXR0aW5ncy5nZXQoJ2ZpeGVkJykpIHtcblx0XHRcdG9mZnNldC50b3AgLT0gc2Nyb2xsVG9wO1xuXHRcdFx0b2Zmc2V0LmxlZnQgLT0gc2Nyb2xsTGVmdDtcblx0XHRcdCRib3guY3NzKHtwb3NpdGlvbjogJ2ZpeGVkJ30pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3AgPSBzY3JvbGxUb3A7XG5cdFx0XHRsZWZ0ID0gc2Nyb2xsTGVmdDtcblx0XHRcdCRib3guY3NzKHtwb3NpdGlvbjogJ2Fic29sdXRlJ30pO1xuXHRcdH1cblxuXHRcdC8vIGtlZXBzIHRoZSB0b3AgYW5kIGxlZnQgcG9zaXRpb25zIHdpdGhpbiB0aGUgYnJvd3NlcidzIHZpZXdwb3J0LlxuXHRcdGlmIChzZXR0aW5ncy5nZXQoJ3JpZ2h0JykgIT09IGZhbHNlKSB7XG5cdFx0XHRsZWZ0ICs9IE1hdGgubWF4KCR3aW5kb3cud2lkdGgoKSAtIHNldHRpbmdzLncgLSBsb2FkZWRXaWR0aCAtIGludGVyZmFjZVdpZHRoIC0gc2V0U2l6ZShzZXR0aW5ncy5nZXQoJ3JpZ2h0JyksICd4JyksIDApO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuZ2V0KCdsZWZ0JykgIT09IGZhbHNlKSB7XG5cdFx0XHRsZWZ0ICs9IHNldFNpemUoc2V0dGluZ3MuZ2V0KCdsZWZ0JyksICd4Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZnQgKz0gTWF0aC5yb3VuZChNYXRoLm1heCgkd2luZG93LndpZHRoKCkgLSBzZXR0aW5ncy53IC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aCwgMCkgLyAyKTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLmdldCgnYm90dG9tJykgIT09IGZhbHNlKSB7XG5cdFx0XHR0b3AgKz0gTWF0aC5tYXgod2luaGVpZ2h0KCkgLSBzZXR0aW5ncy5oIC0gbG9hZGVkSGVpZ2h0IC0gaW50ZXJmYWNlSGVpZ2h0IC0gc2V0U2l6ZShzZXR0aW5ncy5nZXQoJ2JvdHRvbScpLCAneScpLCAwKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmdldCgndG9wJykgIT09IGZhbHNlKSB7XG5cdFx0XHR0b3AgKz0gc2V0U2l6ZShzZXR0aW5ncy5nZXQoJ3RvcCcpLCAneScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3AgKz0gTWF0aC5yb3VuZChNYXRoLm1heCh3aW5oZWlnaHQoKSAtIHNldHRpbmdzLmggLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQsIDApIC8gMik7XG5cdFx0fVxuXG5cdFx0JGJveC5jc3Moe3RvcDogb2Zmc2V0LnRvcCwgbGVmdDogb2Zmc2V0LmxlZnQsIHZpc2liaWxpdHk6J3Zpc2libGUnfSk7XG5cdFx0XG5cdFx0Ly8gdGhpcyBnaXZlcyB0aGUgd3JhcHBlciBwbGVudHkgb2YgYnJlYXRoaW5nIHJvb20gc28gaXQncyBmbG9hdGVkIGNvbnRlbnRzIGNhbiBtb3ZlIGFyb3VuZCBzbW9vdGhseSxcblx0XHQvLyBidXQgaXQgaGFzIHRvIGJlIHNocmFuayBkb3duIGFyb3VuZCB0aGUgc2l6ZSBvZiBkaXYjY29sb3Jib3ggd2hlbiBpdCdzIGRvbmUuICBJZiBub3QsXG5cdFx0Ly8gaXQgY2FuIGludm9rZSBhbiBvYnNjdXJlIElFIGJ1ZyB3aGVuIHVzaW5nIGlmcmFtZXMuXG5cdFx0JHdyYXBbMF0uc3R5bGUud2lkdGggPSAkd3JhcFswXS5zdHlsZS5oZWlnaHQgPSBcIjk5OTlweFwiO1xuXHRcdFxuXHRcdGZ1bmN0aW9uIG1vZGFsRGltZW5zaW9ucygpIHtcblx0XHRcdCR0b3BCb3JkZXJbMF0uc3R5bGUud2lkdGggPSAkYm90dG9tQm9yZGVyWzBdLnN0eWxlLndpZHRoID0gJGNvbnRlbnRbMF0uc3R5bGUud2lkdGggPSAocGFyc2VJbnQoJGJveFswXS5zdHlsZS53aWR0aCwxMCkgLSBpbnRlcmZhY2VXaWR0aCkrJ3B4Jztcblx0XHRcdCRjb250ZW50WzBdLnN0eWxlLmhlaWdodCA9ICRsZWZ0Qm9yZGVyWzBdLnN0eWxlLmhlaWdodCA9ICRyaWdodEJvcmRlclswXS5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQoJGJveFswXS5zdHlsZS5oZWlnaHQsMTApIC0gaW50ZXJmYWNlSGVpZ2h0KSsncHgnO1xuXHRcdH1cblxuXHRcdGNzcyA9IHt3aWR0aDogc2V0dGluZ3MudyArIGxvYWRlZFdpZHRoICsgaW50ZXJmYWNlV2lkdGgsIGhlaWdodDogc2V0dGluZ3MuaCArIGxvYWRlZEhlaWdodCArIGludGVyZmFjZUhlaWdodCwgdG9wOiB0b3AsIGxlZnQ6IGxlZnR9O1xuXG5cdFx0Ly8gc2V0dGluZyB0aGUgc3BlZWQgdG8gMCBpZiB0aGUgY29udGVudCBoYXNuJ3QgY2hhbmdlZCBzaXplIG9yIHBvc2l0aW9uXG5cdFx0aWYgKHNwZWVkKSB7XG5cdFx0XHR2YXIgdGVtcFNwZWVkID0gMDtcblx0XHRcdCQuZWFjaChjc3MsIGZ1bmN0aW9uKGkpe1xuXHRcdFx0XHRpZiAoY3NzW2ldICE9PSBwcmV2aW91c0NTU1tpXSkge1xuXHRcdFx0XHRcdHRlbXBTcGVlZCA9IHNwZWVkO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRzcGVlZCA9IHRlbXBTcGVlZDtcblx0XHR9XG5cblx0XHRwcmV2aW91c0NTUyA9IGNzcztcblxuXHRcdGlmICghc3BlZWQpIHtcblx0XHRcdCRib3guY3NzKGNzcyk7XG5cdFx0fVxuXG5cdFx0JGJveC5kZXF1ZXVlKCkuYW5pbWF0ZShjc3MsIHtcblx0XHRcdGR1cmF0aW9uOiBzcGVlZCB8fCAwLFxuXHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bW9kYWxEaW1lbnNpb25zKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRhY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIHNocmluayB0aGUgd3JhcHBlciBkb3duIHRvIGV4YWN0bHkgdGhlIHNpemUgb2YgY29sb3Jib3ggdG8gYXZvaWQgYSBidWcgaW4gSUUncyBpZnJhbWUgaW1wbGVtZW50YXRpb24uXG5cdFx0XHRcdCR3cmFwWzBdLnN0eWxlLndpZHRoID0gKHNldHRpbmdzLncgKyBsb2FkZWRXaWR0aCArIGludGVyZmFjZVdpZHRoKSArIFwicHhcIjtcblx0XHRcdFx0JHdyYXBbMF0uc3R5bGUuaGVpZ2h0ID0gKHNldHRpbmdzLmggKyBsb2FkZWRIZWlnaHQgKyBpbnRlcmZhY2VIZWlnaHQpICsgXCJweFwiO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgncmVwb3NpdGlvbicpKSB7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7ICAvLyBzbWFsbCBkZWxheSBiZWZvcmUgYmluZGluZyBvbnJlc2l6ZSBkdWUgdG8gYW4gSUU4IGJ1Zy5cblx0XHRcdFx0XHRcdCR3aW5kb3cuYmluZCgncmVzaXplLicgKyBwcmVmaXgsIHB1YmxpY01ldGhvZC5wb3NpdGlvbik7XG5cdFx0XHRcdFx0fSwgMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobG9hZGVkQ2FsbGJhY2spIHtcblx0XHRcdFx0XHRsb2FkZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c3RlcDogbW9kYWxEaW1lbnNpb25zXG5cdFx0fSk7XG5cdH07XG5cblx0cHVibGljTWV0aG9kLnJlc2l6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0dmFyIHNjcm9sbHRvcDtcblx0XHRcblx0XHRpZiAob3Blbikge1xuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdFx0XHRcblx0XHRcdGlmIChvcHRpb25zLndpZHRoKSB7XG5cdFx0XHRcdHNldHRpbmdzLncgPSBzZXRTaXplKG9wdGlvbnMud2lkdGgsICd4JykgLSBsb2FkZWRXaWR0aCAtIGludGVyZmFjZVdpZHRoO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5pbm5lcldpZHRoKSB7XG5cdFx0XHRcdHNldHRpbmdzLncgPSBzZXRTaXplKG9wdGlvbnMuaW5uZXJXaWR0aCwgJ3gnKTtcblx0XHRcdH1cblxuXHRcdFx0JGxvYWRlZC5jc3Moe3dpZHRoOiBzZXR0aW5ncy53fSk7XG5cdFx0XHRcblx0XHRcdGlmIChvcHRpb25zLmhlaWdodCkge1xuXHRcdFx0XHRzZXR0aW5ncy5oID0gc2V0U2l6ZShvcHRpb25zLmhlaWdodCwgJ3knKSAtIGxvYWRlZEhlaWdodCAtIGludGVyZmFjZUhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuaW5uZXJIZWlnaHQpIHtcblx0XHRcdFx0c2V0dGluZ3MuaCA9IHNldFNpemUob3B0aW9ucy5pbm5lckhlaWdodCwgJ3knKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFvcHRpb25zLmlubmVySGVpZ2h0ICYmICFvcHRpb25zLmhlaWdodCkge1xuXHRcdFx0XHRzY3JvbGx0b3AgPSAkbG9hZGVkLnNjcm9sbFRvcCgpO1xuXHRcdFx0XHQkbG9hZGVkLmNzcyh7aGVpZ2h0OiBcImF1dG9cIn0pO1xuXHRcdFx0XHRzZXR0aW5ncy5oID0gJGxvYWRlZC5oZWlnaHQoKTtcblx0XHRcdH1cblxuXHRcdFx0JGxvYWRlZC5jc3Moe2hlaWdodDogc2V0dGluZ3MuaH0pO1xuXG5cdFx0XHRpZihzY3JvbGx0b3ApIHtcblx0XHRcdFx0JGxvYWRlZC5zY3JvbGxUb3Aoc2Nyb2xsdG9wKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cHVibGljTWV0aG9kLnBvc2l0aW9uKHNldHRpbmdzLmdldCgndHJhbnNpdGlvbicpID09PSBcIm5vbmVcIiA/IDAgOiBzZXR0aW5ncy5nZXQoJ3NwZWVkJykpO1xuXHRcdH1cblx0fTtcblxuXHRwdWJsaWNNZXRob2QucHJlcCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0XHRpZiAoIW9wZW4pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIGNhbGxiYWNrLCBzcGVlZCA9IHNldHRpbmdzLmdldCgndHJhbnNpdGlvbicpID09PSBcIm5vbmVcIiA/IDAgOiBzZXR0aW5ncy5nZXQoJ3NwZWVkJyk7XG5cblx0XHQkbG9hZGVkLnJlbW92ZSgpO1xuXG5cdFx0JGxvYWRlZCA9ICR0YWcoZGl2LCAnTG9hZGVkQ29udGVudCcpLmFwcGVuZChvYmplY3QpO1xuXHRcdFxuXHRcdGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuXHRcdFx0c2V0dGluZ3MudyA9IHNldHRpbmdzLncgfHwgJGxvYWRlZC53aWR0aCgpO1xuXHRcdFx0c2V0dGluZ3MudyA9IHNldHRpbmdzLm13ICYmIHNldHRpbmdzLm13IDwgc2V0dGluZ3MudyA/IHNldHRpbmdzLm13IDogc2V0dGluZ3Mudztcblx0XHRcdHJldHVybiBzZXR0aW5ncy53O1xuXHRcdH1cblx0XHRmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG5cdFx0XHRzZXR0aW5ncy5oID0gc2V0dGluZ3MuaCB8fCAkbG9hZGVkLmhlaWdodCgpO1xuXHRcdFx0c2V0dGluZ3MuaCA9IHNldHRpbmdzLm1oICYmIHNldHRpbmdzLm1oIDwgc2V0dGluZ3MuaCA/IHNldHRpbmdzLm1oIDogc2V0dGluZ3MuaDtcblx0XHRcdHJldHVybiBzZXR0aW5ncy5oO1xuXHRcdH1cblx0XHRcblx0XHQkbG9hZGVkLmhpZGUoKVxuXHRcdC5hcHBlbmRUbygkbG9hZGluZ0JheS5zaG93KCkpLy8gY29udGVudCBoYXMgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBmb3IgYWNjdXJhdGUgc2l6ZSBjYWxjdWxhdGlvbnMuXG5cdFx0LmNzcyh7d2lkdGg6IGdldFdpZHRoKCksIG92ZXJmbG93OiBzZXR0aW5ncy5nZXQoJ3Njcm9sbGluZycpID8gJ2F1dG8nIDogJ2hpZGRlbid9KVxuXHRcdC5jc3Moe2hlaWdodDogZ2V0SGVpZ2h0KCl9KS8vIHNldHMgdGhlIGhlaWdodCBpbmRlcGVuZGVudGx5IGZyb20gdGhlIHdpZHRoIGluIGNhc2UgdGhlIG5ldyB3aWR0aCBpbmZsdWVuY2VzIHRoZSB2YWx1ZSBvZiBoZWlnaHQuXG5cdFx0LnByZXBlbmRUbygkY29udGVudCk7XG5cdFx0XG5cdFx0JGxvYWRpbmdCYXkuaGlkZSgpO1xuXHRcdFxuXHRcdC8vIGZsb2F0aW5nIHRoZSBJTUcgcmVtb3ZlcyB0aGUgYm90dG9tIGxpbmUtaGVpZ2h0IGFuZCBmaXhlZCBhIHByb2JsZW0gd2hlcmUgSUUgbWlzY2FsY3VsYXRlcyB0aGUgd2lkdGggb2YgdGhlIHBhcmVudCBlbGVtZW50IGFzIDEwMCUgb2YgdGhlIGRvY3VtZW50IHdpZHRoLlxuXHRcdFxuXHRcdCQocGhvdG8pLmNzcyh7J2Zsb2F0JzogJ25vbmUnfSk7XG5cblx0XHRzZXRDbGFzcyhzZXR0aW5ncy5nZXQoJ2NsYXNzTmFtZScpKTtcblxuXHRcdGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRvdGFsID0gJHJlbGF0ZWQubGVuZ3RoLFxuXHRcdFx0XHRpZnJhbWUsXG5cdFx0XHRcdGNvbXBsZXRlO1xuXHRcdFx0XG5cdFx0XHRpZiAoIW9wZW4pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRmdW5jdGlvbiByZW1vdmVGaWx0ZXIoKSB7IC8vIE5lZWRlZCBmb3IgSUU4IGluIHZlcnNpb25zIG9mIGpRdWVyeSBwcmlvciB0byAxLjcuMlxuXHRcdFx0XHRpZiAoJC5zdXBwb3J0Lm9wYWNpdHkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0JGJveFswXS5zdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ2ZpbHRlcicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQobG9hZGluZ1RpbWVyKTtcblx0XHRcdFx0JGxvYWRpbmdPdmVybGF5LmhpZGUoKTtcblx0XHRcdFx0dHJpZ2dlcihldmVudF9jb21wbGV0ZSk7XG5cdFx0XHRcdHNldHRpbmdzLmdldCgnb25Db21wbGV0ZScpO1xuXHRcdFx0fTtcblxuXHRcdFx0XG5cdFx0XHQkdGl0bGUuaHRtbChzZXR0aW5ncy5nZXQoJ3RpdGxlJykpLnNob3coKTtcblx0XHRcdCRsb2FkZWQuc2hvdygpO1xuXHRcdFx0XG5cdFx0XHRpZiAodG90YWwgPiAxKSB7IC8vIGhhbmRsZSBncm91cGluZ1xuXHRcdFx0XHRpZiAodHlwZW9mIHNldHRpbmdzLmdldCgnY3VycmVudCcpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0JGN1cnJlbnQuaHRtbChzZXR0aW5ncy5nZXQoJ2N1cnJlbnQnKS5yZXBsYWNlKCd7Y3VycmVudH0nLCBpbmRleCArIDEpLnJlcGxhY2UoJ3t0b3RhbH0nLCB0b3RhbCkpLnNob3coKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0JG5leHRbKHNldHRpbmdzLmdldCgnbG9vcCcpIHx8IGluZGV4IDwgdG90YWwgLSAxKSA/IFwic2hvd1wiIDogXCJoaWRlXCJdKCkuaHRtbChzZXR0aW5ncy5nZXQoJ25leHQnKSk7XG5cdFx0XHRcdCRwcmV2WyhzZXR0aW5ncy5nZXQoJ2xvb3AnKSB8fCBpbmRleCkgPyBcInNob3dcIiA6IFwiaGlkZVwiXSgpLmh0bWwoc2V0dGluZ3MuZ2V0KCdwcmV2aW91cycpKTtcblx0XHRcdFx0XG5cdFx0XHRcdHNsaWRlc2hvdygpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gUHJlbG9hZHMgaW1hZ2VzIHdpdGhpbiBhIHJlbCBncm91cFxuXHRcdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdwcmVsb2FkaW5nJykpIHtcblx0XHRcdFx0XHQkLmVhY2goW2dldEluZGV4KC0xKSwgZ2V0SW5kZXgoMSldLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0dmFyIGltZyxcblx0XHRcdFx0XHRcdFx0aSA9ICRyZWxhdGVkW3RoaXNdLFxuXHRcdFx0XHRcdFx0XHRzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhpLCAkLmRhdGEoaSwgY29sb3Jib3gpKSxcblx0XHRcdFx0XHRcdFx0c3JjID0gc2V0dGluZ3MuZ2V0KCdocmVmJyk7XG5cblx0XHRcdFx0XHRcdGlmIChzcmMgJiYgaXNJbWFnZShzZXR0aW5ncywgc3JjKSkge1xuXHRcdFx0XHRcdFx0XHRzcmMgPSByZXRpbmFVcmwoc2V0dGluZ3MsIHNyYyk7XG5cdFx0XHRcdFx0XHRcdGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdFx0XHRcdFx0XHRpbWcuc3JjID0gc3JjO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkZ3JvdXBDb250cm9scy5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ2lmcmFtZScpKSB7XG5cdFx0XHRcdGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCdmcmFtZUJvcmRlcicgaW4gaWZyYW1lKSB7XG5cdFx0XHRcdFx0aWZyYW1lLmZyYW1lQm9yZGVyID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCdhbGxvd1RyYW5zcGFyZW5jeScgaW4gaWZyYW1lKSB7XG5cdFx0XHRcdFx0aWZyYW1lLmFsbG93VHJhbnNwYXJlbmN5ID0gXCJ0cnVlXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXNldHRpbmdzLmdldCgnc2Nyb2xsaW5nJykpIHtcblx0XHRcdFx0XHRpZnJhbWUuc2Nyb2xsaW5nID0gXCJub1wiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHQkKGlmcmFtZSlcblx0XHRcdFx0XHQuYXR0cih7XG5cdFx0XHRcdFx0XHRzcmM6IHNldHRpbmdzLmdldCgnaHJlZicpLFxuXHRcdFx0XHRcdFx0bmFtZTogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSwgLy8gZ2l2ZSB0aGUgaWZyYW1lIGEgdW5pcXVlIG5hbWUgdG8gcHJldmVudCBjYWNoaW5nXG5cdFx0XHRcdFx0XHQnY2xhc3MnOiBwcmVmaXggKyAnSWZyYW1lJyxcblx0XHRcdFx0XHRcdGFsbG93RnVsbFNjcmVlbiA6IHRydWUgLy8gYWxsb3cgSFRNTDUgdmlkZW8gdG8gZ28gZnVsbHNjcmVlblxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uZSgnbG9hZCcsIGNvbXBsZXRlKVxuXHRcdFx0XHRcdC5hcHBlbmRUbygkbG9hZGVkKTtcblx0XHRcdFx0XG5cdFx0XHRcdCRldmVudHMub25lKGV2ZW50X3B1cmdlLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWZyYW1lLnNyYyA9IFwiLy9hYm91dDpibGFua1wiO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdmYXN0SWZyYW1lJykpIHtcblx0XHRcdFx0XHQkKGlmcmFtZSkudHJpZ2dlcignbG9hZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb21wbGV0ZSgpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCd0cmFuc2l0aW9uJykgPT09ICdmYWRlJykge1xuXHRcdFx0XHQkYm94LmZhZGVUbyhzcGVlZCwgMSwgcmVtb3ZlRmlsdGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlbW92ZUZpbHRlcigpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLmdldCgndHJhbnNpdGlvbicpID09PSAnZmFkZScpIHtcblx0XHRcdCRib3guZmFkZVRvKHNwZWVkLCAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHB1YmxpY01ldGhvZC5wb3NpdGlvbigwLCBjYWxsYmFjayk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHVibGljTWV0aG9kLnBvc2l0aW9uKHNwZWVkLCBjYWxsYmFjayk7XG5cdFx0fVxuXHR9O1xuXG5cdGZ1bmN0aW9uIGxvYWQgKCkge1xuXHRcdHZhciBocmVmLCBzZXRSZXNpemUsIHByZXAgPSBwdWJsaWNNZXRob2QucHJlcCwgJGlubGluZSwgcmVxdWVzdCA9ICsrcmVxdWVzdHM7XG5cdFx0XG5cdFx0YWN0aXZlID0gdHJ1ZTtcblx0XHRcblx0XHRwaG90byA9IGZhbHNlO1xuXHRcdFxuXHRcdHRyaWdnZXIoZXZlbnRfcHVyZ2UpO1xuXHRcdHRyaWdnZXIoZXZlbnRfbG9hZCk7XG5cdFx0c2V0dGluZ3MuZ2V0KCdvbkxvYWQnKTtcblx0XHRcblx0XHRzZXR0aW5ncy5oID0gc2V0dGluZ3MuZ2V0KCdoZWlnaHQnKSA/XG5cdFx0XHRcdHNldFNpemUoc2V0dGluZ3MuZ2V0KCdoZWlnaHQnKSwgJ3knKSAtIGxvYWRlZEhlaWdodCAtIGludGVyZmFjZUhlaWdodCA6XG5cdFx0XHRcdHNldHRpbmdzLmdldCgnaW5uZXJIZWlnaHQnKSAmJiBzZXRTaXplKHNldHRpbmdzLmdldCgnaW5uZXJIZWlnaHQnKSwgJ3knKTtcblx0XHRcblx0XHRzZXR0aW5ncy53ID0gc2V0dGluZ3MuZ2V0KCd3aWR0aCcpID9cblx0XHRcdFx0c2V0U2l6ZShzZXR0aW5ncy5nZXQoJ3dpZHRoJyksICd4JykgLSBsb2FkZWRXaWR0aCAtIGludGVyZmFjZVdpZHRoIDpcblx0XHRcdFx0c2V0dGluZ3MuZ2V0KCdpbm5lcldpZHRoJykgJiYgc2V0U2l6ZShzZXR0aW5ncy5nZXQoJ2lubmVyV2lkdGgnKSwgJ3gnKTtcblx0XHRcblx0XHQvLyBTZXRzIHRoZSBtaW5pbXVtIGRpbWVuc2lvbnMgZm9yIHVzZSBpbiBpbWFnZSBzY2FsaW5nXG5cdFx0c2V0dGluZ3MubXcgPSBzZXR0aW5ncy53O1xuXHRcdHNldHRpbmdzLm1oID0gc2V0dGluZ3MuaDtcblx0XHRcblx0XHQvLyBSZS1ldmFsdWF0ZSB0aGUgbWluaW11bSB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIG9uIG1heFdpZHRoIGFuZCBtYXhIZWlnaHQgdmFsdWVzLlxuXHRcdC8vIElmIHRoZSB3aWR0aCBvciBoZWlnaHQgZXhjZWVkIHRoZSBtYXhXaWR0aCBvciBtYXhIZWlnaHQsIHVzZSB0aGUgbWF4aW11bSB2YWx1ZXMgaW5zdGVhZC5cblx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdtYXhXaWR0aCcpKSB7XG5cdFx0XHRzZXR0aW5ncy5tdyA9IHNldFNpemUoc2V0dGluZ3MuZ2V0KCdtYXhXaWR0aCcpLCAneCcpIC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aDtcblx0XHRcdHNldHRpbmdzLm13ID0gc2V0dGluZ3MudyAmJiBzZXR0aW5ncy53IDwgc2V0dGluZ3MubXcgPyBzZXR0aW5ncy53IDogc2V0dGluZ3MubXc7XG5cdFx0fVxuXHRcdGlmIChzZXR0aW5ncy5nZXQoJ21heEhlaWdodCcpKSB7XG5cdFx0XHRzZXR0aW5ncy5taCA9IHNldFNpemUoc2V0dGluZ3MuZ2V0KCdtYXhIZWlnaHQnKSwgJ3knKSAtIGxvYWRlZEhlaWdodCAtIGludGVyZmFjZUhlaWdodDtcblx0XHRcdHNldHRpbmdzLm1oID0gc2V0dGluZ3MuaCAmJiBzZXR0aW5ncy5oIDwgc2V0dGluZ3MubWggPyBzZXR0aW5ncy5oIDogc2V0dGluZ3MubWg7XG5cdFx0fVxuXHRcdFxuXHRcdGhyZWYgPSBzZXR0aW5ncy5nZXQoJ2hyZWYnKTtcblx0XHRcblx0XHRsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCRsb2FkaW5nT3ZlcmxheS5zaG93KCk7XG5cdFx0fSwgMTAwKTtcblx0XHRcblx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdpbmxpbmUnKSkge1xuXHRcdFx0Ly8gSW5zZXJ0cyBhbiBlbXB0eSBwbGFjZWhvbGRlciB3aGVyZSBpbmxpbmUgY29udGVudCBpcyBiZWluZyBwdWxsZWQgZnJvbS5cblx0XHRcdC8vIEFuIGV2ZW50IGlzIGJvdW5kIHRvIHB1dCBpbmxpbmUgY29udGVudCBiYWNrIHdoZW4gQ29sb3Jib3ggY2xvc2VzIG9yIGxvYWRzIG5ldyBjb250ZW50LlxuXHRcdFx0JGlubGluZSA9ICR0YWcoZGl2KS5oaWRlKCkuaW5zZXJ0QmVmb3JlKCQoaHJlZilbMF0pO1xuXG5cdFx0XHQkZXZlbnRzLm9uZShldmVudF9wdXJnZSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkaW5saW5lLnJlcGxhY2VXaXRoKCRsb2FkZWQuY2hpbGRyZW4oKSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cHJlcCgkKGhyZWYpKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmdldCgnaWZyYW1lJykpIHtcblx0XHRcdC8vIElGcmFtZSBlbGVtZW50IHdvbid0IGJlIGFkZGVkIHRvIHRoZSBET00gdW50aWwgaXQgaXMgcmVhZHkgdG8gYmUgZGlzcGxheWVkLFxuXHRcdFx0Ly8gdG8gYXZvaWQgcHJvYmxlbXMgd2l0aCBET00tcmVhZHkgSlMgdGhhdCBtaWdodCBiZSB0cnlpbmcgdG8gcnVuIGluIHRoYXQgaWZyYW1lLlxuXHRcdFx0cHJlcChcIiBcIik7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5nZXQoJ2h0bWwnKSkge1xuXHRcdFx0cHJlcChzZXR0aW5ncy5nZXQoJ2h0bWwnKSk7XG5cdFx0fSBlbHNlIGlmIChpc0ltYWdlKHNldHRpbmdzLCBocmVmKSkge1xuXG5cdFx0XHRocmVmID0gcmV0aW5hVXJsKHNldHRpbmdzLCBocmVmKTtcblxuXHRcdFx0cGhvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuXHRcdFx0JChwaG90bylcblx0XHRcdC5hZGRDbGFzcyhwcmVmaXggKyAnUGhvdG8nKVxuXHRcdFx0LmJpbmQoJ2Vycm9yJyxmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHByZXAoJHRhZyhkaXYsICdFcnJvcicpLmh0bWwoc2V0dGluZ3MuZ2V0KCdpbWdFcnJvcicpKSk7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uZSgnbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHBlcmNlbnQ7XG5cblx0XHRcdFx0aWYgKHJlcXVlc3QgIT09IHJlcXVlc3RzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JC5lYWNoKFsnYWx0JywgJ2xvbmdkZXNjJywgJ2FyaWEtZGVzY3JpYmVkYnknXSwgZnVuY3Rpb24oaSx2YWwpe1xuXHRcdFx0XHRcdHZhciBhdHRyID0gJChzZXR0aW5ncy5lbCkuYXR0cih2YWwpIHx8ICQoc2V0dGluZ3MuZWwpLmF0dHIoJ2RhdGEtJyt2YWwpO1xuXHRcdFx0XHRcdGlmIChhdHRyKSB7XG5cdFx0XHRcdFx0XHRwaG90by5zZXRBdHRyaWJ1dGUodmFsLCBhdHRyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3JldGluYUltYWdlJykgJiYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxKSB7XG5cdFx0XHRcdFx0cGhvdG8uaGVpZ2h0ID0gcGhvdG8uaGVpZ2h0IC8gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cdFx0XHRcdFx0cGhvdG8ud2lkdGggPSBwaG90by53aWR0aCAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgnc2NhbGVQaG90b3MnKSkge1xuXHRcdFx0XHRcdHNldFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHBob3RvLmhlaWdodCAtPSBwaG90by5oZWlnaHQgKiBwZXJjZW50O1xuXHRcdFx0XHRcdFx0cGhvdG8ud2lkdGggLT0gcGhvdG8ud2lkdGggKiBwZXJjZW50O1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLm13ICYmIHBob3RvLndpZHRoID4gc2V0dGluZ3MubXcpIHtcblx0XHRcdFx0XHRcdHBlcmNlbnQgPSAocGhvdG8ud2lkdGggLSBzZXR0aW5ncy5tdykgLyBwaG90by53aWR0aDtcblx0XHRcdFx0XHRcdHNldFJlc2l6ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoc2V0dGluZ3MubWggJiYgcGhvdG8uaGVpZ2h0ID4gc2V0dGluZ3MubWgpIHtcblx0XHRcdFx0XHRcdHBlcmNlbnQgPSAocGhvdG8uaGVpZ2h0IC0gc2V0dGluZ3MubWgpIC8gcGhvdG8uaGVpZ2h0O1xuXHRcdFx0XHRcdFx0c2V0UmVzaXplKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoc2V0dGluZ3MuaCkge1xuXHRcdFx0XHRcdHBob3RvLnN0eWxlLm1hcmdpblRvcCA9IE1hdGgubWF4KHNldHRpbmdzLm1oIC0gcGhvdG8uaGVpZ2h0LCAwKSAvIDIgKyAncHgnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoJHJlbGF0ZWRbMV0gJiYgKHNldHRpbmdzLmdldCgnbG9vcCcpIHx8ICRyZWxhdGVkW2luZGV4ICsgMV0pKSB7XG5cdFx0XHRcdFx0cGhvdG8uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHRcdHBob3RvLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRwdWJsaWNNZXRob2QubmV4dCgpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwaG90by5zdHlsZS53aWR0aCA9IHBob3RvLndpZHRoICsgJ3B4Jztcblx0XHRcdFx0cGhvdG8uc3R5bGUuaGVpZ2h0ID0gcGhvdG8uaGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgLy8gQSBwYXVzZSBiZWNhdXNlIENocm9tZSB3aWxsIHNvbWV0aW1lcyByZXBvcnQgYSAwIGJ5IDAgc2l6ZSBvdGhlcndpc2UuXG5cdFx0XHRcdFx0cHJlcChwaG90byk7XG5cdFx0XHRcdH0sIDEpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyAvLyBBIHBhdXNlIGJlY2F1c2UgT3BlcmEgMTAuNisgd2lsbCBzb21ldGltZXMgbm90IHJ1biB0aGUgb25sb2FkIGZ1bmN0aW9uIG90aGVyd2lzZS5cblx0XHRcdFx0cGhvdG8uc3JjID0gaHJlZjtcblx0XHRcdH0sIDEpO1xuXHRcdH0gZWxzZSBpZiAoaHJlZikge1xuXHRcdFx0JGxvYWRpbmdCYXkubG9hZChocmVmLCBzZXR0aW5ncy5nZXQoJ2RhdGEnKSwgZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuXHRcdFx0XHRpZiAocmVxdWVzdCA9PT0gcmVxdWVzdHMpIHtcblx0XHRcdFx0XHRwcmVwKHN0YXR1cyA9PT0gJ2Vycm9yJyA/ICR0YWcoZGl2LCAnRXJyb3InKS5odG1sKHNldHRpbmdzLmdldCgneGhyRXJyb3InKSkgOiAkKHRoaXMpLmNvbnRlbnRzKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0XHRcblx0Ly8gTmF2aWdhdGVzIHRvIHRoZSBuZXh0IHBhZ2UvaW1hZ2UgaW4gYSBzZXQuXG5cdHB1YmxpY01ldGhvZC5uZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghYWN0aXZlICYmICRyZWxhdGVkWzFdICYmIChzZXR0aW5ncy5nZXQoJ2xvb3AnKSB8fCAkcmVsYXRlZFtpbmRleCArIDFdKSkge1xuXHRcdFx0aW5kZXggPSBnZXRJbmRleCgxKTtcblx0XHRcdGxhdW5jaCgkcmVsYXRlZFtpbmRleF0pO1xuXHRcdH1cblx0fTtcblx0XG5cdHB1YmxpY01ldGhvZC5wcmV2ID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghYWN0aXZlICYmICRyZWxhdGVkWzFdICYmIChzZXR0aW5ncy5nZXQoJ2xvb3AnKSB8fCBpbmRleCkpIHtcblx0XHRcdGluZGV4ID0gZ2V0SW5kZXgoLTEpO1xuXHRcdFx0bGF1bmNoKCRyZWxhdGVkW2luZGV4XSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIE5vdGU6IHRvIHVzZSB0aGlzIHdpdGhpbiBhbiBpZnJhbWUgdXNlIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiBwYXJlbnQualF1ZXJ5LmNvbG9yYm94LmNsb3NlKCk7XG5cdHB1YmxpY01ldGhvZC5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAob3BlbiAmJiAhY2xvc2luZykge1xuXHRcdFx0XG5cdFx0XHRjbG9zaW5nID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0b3BlbiA9IGZhbHNlO1xuXHRcdFx0XG5cdFx0XHR0cmlnZ2VyKGV2ZW50X2NsZWFudXApO1xuXHRcdFx0c2V0dGluZ3MuZ2V0KCdvbkNsZWFudXAnKTtcblx0XHRcdFxuXHRcdFx0JHdpbmRvdy51bmJpbmQoJy4nICsgcHJlZml4KTtcblx0XHRcdFxuXHRcdFx0JG92ZXJsYXkuZmFkZVRvKHNldHRpbmdzLmdldCgnZmFkZU91dCcpIHx8IDAsIDApO1xuXHRcdFx0XG5cdFx0XHQkYm94LnN0b3AoKS5mYWRlVG8oc2V0dGluZ3MuZ2V0KCdmYWRlT3V0JykgfHwgMCwgMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XG5cdFx0XHRcdCRib3guYWRkKCRvdmVybGF5KS5jc3MoeydvcGFjaXR5JzogMSwgY3Vyc29yOiAnYXV0byd9KS5oaWRlKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHR0cmlnZ2VyKGV2ZW50X3B1cmdlKTtcblx0XHRcdFx0XG5cdFx0XHRcdCRsb2FkZWQucmVtb3ZlKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRjbG9zaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0dHJpZ2dlcihldmVudF9jbG9zZWQpO1xuXHRcdFx0XHRcdHNldHRpbmdzLmdldCgnb25DbG9zZWQnKTtcblx0XHRcdFx0fSwgMSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0Ly8gUmVtb3ZlcyBjaGFuZ2VzIENvbG9yYm94IG1hZGUgdG8gdGhlIGRvY3VtZW50LCBidXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBwbHVnaW4uXG5cdHB1YmxpY01ldGhvZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCEkYm94KSB7IHJldHVybjsgfVxuXG5cdFx0JGJveC5zdG9wKCk7XG5cdFx0JC5jb2xvcmJveC5jbG9zZSgpO1xuXHRcdCRib3guc3RvcCgpLnJlbW92ZSgpO1xuXHRcdCRvdmVybGF5LnJlbW92ZSgpO1xuXHRcdGNsb3NpbmcgPSBmYWxzZTtcblx0XHQkYm94ID0gbnVsbDtcblx0XHQkKCcuJyArIGJveEVsZW1lbnQpXG5cdFx0XHQucmVtb3ZlRGF0YShjb2xvcmJveClcblx0XHRcdC5yZW1vdmVDbGFzcyhib3hFbGVtZW50KTtcblxuXHRcdCQoZG9jdW1lbnQpLnVuYmluZCgnY2xpY2suJytwcmVmaXgpO1xuXHR9O1xuXG5cdC8vIEEgbWV0aG9kIGZvciBmZXRjaGluZyB0aGUgY3VycmVudCBlbGVtZW50IENvbG9yYm94IGlzIHJlZmVyZW5jaW5nLlxuXHQvLyByZXR1cm5zIGEgalF1ZXJ5IG9iamVjdC5cblx0cHVibGljTWV0aG9kLmVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICQoc2V0dGluZ3MuZWwpO1xuXHR9O1xuXG5cdHB1YmxpY01ldGhvZC5zZXR0aW5ncyA9IGRlZmF1bHRzO1xuXG59KGpRdWVyeSwgZG9jdW1lbnQsIHdpbmRvdykpO1xuXG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiBjb2xvcmJveCAhPSBcInVuZGVmaW5lZFwiID8gY29sb3Jib3ggOiB3aW5kb3cuY29sb3Jib3gpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gZGVmaW5lRXhwb3J0KGV4KSB7IG1vZHVsZS5leHBvcnRzID0gZXg7IH0pO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi92ZW5kb3IvanF1ZXJ5LmNvbG9yYm94LmpzXCIsXCIvdmVuZG9yXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLypcbiAqIGpRdWVyeSBGbGV4U2xpZGVyIHYyLjFcbiAqIGh0dHA6Ly93d3cud29vdGhlbWVzLmNvbS9mbGV4c2xpZGVyL1xuICpcbiAqIENvcHlyaWdodCAyMDEyIFdvb1RoZW1lc1xuICogRnJlZSB0byB1c2UgdW5kZXIgdGhlIEdQTHYyIGxpY2Vuc2UuXG4gKiBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXG4gKlxuICogQ29udHJpYnV0aW5nIGF1dGhvcjogVHlsZXIgU21pdGggKEBtYm11ZmZmaW4pXG4gKi9cblxuOyhmdW5jdGlvbiAoJCkge1xuXG4gIC8vRmxleFNsaWRlcjogT2JqZWN0IEluc3RhbmNlXG4gICQuZmxleHNsaWRlciA9IGZ1bmN0aW9uKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHNsaWRlciA9ICQoZWwpLFxuICAgICAgICB2YXJzID0gJC5leHRlbmQoe30sICQuZmxleHNsaWRlci5kZWZhdWx0cywgb3B0aW9ucyksXG4gICAgICAgIG5hbWVzcGFjZSA9IHZhcnMubmFtZXNwYWNlLFxuICAgICAgICB0b3VjaCA9IChcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoLFxuICAgICAgICBldmVudFR5cGUgPSAodG91Y2gpID8gXCJ0b3VjaGVuZFwiIDogXCJjbGlja1wiLFxuICAgICAgICB2ZXJ0aWNhbCA9IHZhcnMuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIsXG4gICAgICAgIHJldmVyc2UgPSB2YXJzLnJldmVyc2UsXG4gICAgICAgIGNhcm91c2VsID0gKHZhcnMuaXRlbVdpZHRoID4gMCksXG4gICAgICAgIGZhZGUgPSB2YXJzLmFuaW1hdGlvbiA9PT0gXCJmYWRlXCIsXG4gICAgICAgIGFzTmF2ID0gdmFycy5hc05hdkZvciAhPT0gXCJcIixcbiAgICAgICAgbWV0aG9kcyA9IHt9O1xuXG4gICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIHNsaWRlciBvYmplY3RcbiAgICAkLmRhdGEoZWwsIFwiZmxleHNsaWRlclwiLCBzbGlkZXIpO1xuXG4gICAgLy8gUHJpdmF0IHNsaWRlciBtZXRob2RzXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSB2YXJzLnN0YXJ0QXQ7XG4gICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IHNsaWRlci5jdXJyZW50U2xpZGU7XG4gICAgICAgIHNsaWRlci5hdEVuZCA9IChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwIHx8IHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0KTtcbiAgICAgICAgc2xpZGVyLmNvbnRhaW5lclNlbGVjdG9yID0gdmFycy5zZWxlY3Rvci5zdWJzdHIoMCx2YXJzLnNlbGVjdG9yLnNlYXJjaCgnICcpKTtcbiAgICAgICAgc2xpZGVyLnNsaWRlcyA9ICQodmFycy5zZWxlY3Rvciwgc2xpZGVyKTtcbiAgICAgICAgc2xpZGVyLmNvbnRhaW5lciA9ICQoc2xpZGVyLmNvbnRhaW5lclNlbGVjdG9yLCBzbGlkZXIpO1xuICAgICAgICBzbGlkZXIuY291bnQgPSBzbGlkZXIuc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgLy8gU1lOQzpcbiAgICAgICAgc2xpZGVyLnN5bmNFeGlzdHMgPSAkKHZhcnMuc3luYykubGVuZ3RoID4gMDtcbiAgICAgICAgLy8gU0xJREU6XG4gICAgICAgIGlmICh2YXJzLmFuaW1hdGlvbiA9PT0gXCJzbGlkZVwiKSB2YXJzLmFuaW1hdGlvbiA9IFwic3dpbmdcIjtcbiAgICAgICAgc2xpZGVyLnByb3AgPSAodmVydGljYWwpID8gXCJ0b3BcIiA6IFwibWFyZ2luTGVmdFwiO1xuICAgICAgICBzbGlkZXIuYXJncyA9IHt9O1xuICAgICAgICAvLyBTTElERVNIT1c6XG4gICAgICAgIHNsaWRlci5tYW51YWxQYXVzZSA9IGZhbHNlO1xuICAgICAgICAvLyBUT1VDSC9VU0VDU1M6XG4gICAgICAgIHNsaWRlci50cmFuc2l0aW9ucyA9ICF2YXJzLnZpZGVvICYmICFmYWRlICYmIHZhcnMudXNlQ1NTICYmIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgb2JqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgIHByb3BzID0gWydwZXJzcGVjdGl2ZVByb3BlcnR5JywgJ1dlYmtpdFBlcnNwZWN0aXZlJywgJ01velBlcnNwZWN0aXZlJywgJ09QZXJzcGVjdGl2ZScsICdtc1BlcnNwZWN0aXZlJ107XG4gICAgICAgICAgZm9yICh2YXIgaSBpbiBwcm9wcykge1xuICAgICAgICAgICAgaWYgKCBvYmouc3R5bGVbIHByb3BzW2ldIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgc2xpZGVyLnBmeCA9IHByb3BzW2ldLnJlcGxhY2UoJ1BlcnNwZWN0aXZlJywnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgc2xpZGVyLnByb3AgPSBcIi1cIiArIHNsaWRlci5wZnggKyBcIi10cmFuc2Zvcm1cIjtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSgpKTtcbiAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgIGlmICh2YXJzLmNvbnRyb2xzQ29udGFpbmVyICE9PSBcIlwiKSBzbGlkZXIuY29udHJvbHNDb250YWluZXIgPSAkKHZhcnMuY29udHJvbHNDb250YWluZXIpLmxlbmd0aCA+IDAgJiYgJCh2YXJzLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgLy8gTUFOVUFMOlxuICAgICAgICBpZiAodmFycy5tYW51YWxDb250cm9scyAhPT0gXCJcIikgc2xpZGVyLm1hbnVhbENvbnRyb2xzID0gJCh2YXJzLm1hbnVhbENvbnRyb2xzKS5sZW5ndGggPiAwICYmICQodmFycy5tYW51YWxDb250cm9scyk7XG5cbiAgICAgICAgLy8gUkFORE9NSVpFOlxuICAgICAgICBpZiAodmFycy5yYW5kb21pemUpIHtcbiAgICAgICAgICBzbGlkZXIuc2xpZGVzLnNvcnQoZnVuY3Rpb24oKSB7IHJldHVybiAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKS0wLjUpOyB9KTtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLmVtcHR5KCkuYXBwZW5kKHNsaWRlci5zbGlkZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVyLmRvTWF0aCgpO1xuXG4gICAgICAgIC8vIEFTTkFWOlxuICAgICAgICBpZiAoYXNOYXYpIG1ldGhvZHMuYXNOYXYuc2V0dXAoKTtcblxuICAgICAgICAvLyBJTklUXG4gICAgICAgIHNsaWRlci5zZXR1cChcImluaXRcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVjpcbiAgICAgICAgaWYgKHZhcnMuY29udHJvbE5hdikgbWV0aG9kcy5jb250cm9sTmF2LnNldHVwKCk7XG5cbiAgICAgICAgLy8gRElSRUNUSU9OTkFWOlxuICAgICAgICBpZiAodmFycy5kaXJlY3Rpb25OYXYpIG1ldGhvZHMuZGlyZWN0aW9uTmF2LnNldHVwKCk7XG5cbiAgICAgICAgLy8gS0VZQk9BUkQ6XG4gICAgICAgIGlmICh2YXJzLmtleWJvYXJkICYmICgkKHNsaWRlci5jb250YWluZXJTZWxlY3RvcikubGVuZ3RoID09PSAxIHx8IHZhcnMubXVsdGlwbGVLZXlib2FyZCkpIHtcbiAgICAgICAgICAkKGRvY3VtZW50KS5iaW5kKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5Y29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgICAgICBpZiAoIXNsaWRlci5hbmltYXRpbmcgJiYgKGtleWNvZGUgPT09IDM5IHx8IGtleWNvZGUgPT09IDM3KSkge1xuICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gKGtleWNvZGUgPT09IDM5KSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5Y29kZSA9PT0gMzcpID8gc2xpZGVyLmdldFRhcmdldCgncHJldicpIDogZmFsc2U7XG4gICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTU9VU0VXSEVFTDpcbiAgICAgICAgaWYgKHZhcnMubW91c2V3aGVlbCkge1xuICAgICAgICAgIHNsaWRlci5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoZGVsdGEgPCAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQQVVTRVBMQVlcbiAgICAgICAgaWYgKHZhcnMucGF1c2VQbGF5KSBtZXRob2RzLnBhdXNlUGxheS5zZXR1cCgpO1xuXG4gICAgICAgIC8vIFNMSURTRVNIT1dcbiAgICAgICAgaWYgKHZhcnMuc2xpZGVzaG93KSB7XG4gICAgICAgICAgaWYgKHZhcnMucGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgICBzbGlkZXIuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbFBsYXkgJiYgIXNsaWRlci5tYW51YWxQYXVzZSkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCFzbGlkZXIubWFudWFsUGF1c2UgJiYgIXNsaWRlci5tYW51YWxQbGF5KSBzbGlkZXIucGxheSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGluaXRpYWxpemUgYW5pbWF0aW9uXG4gICAgICAgICAgKHZhcnMuaW5pdERlbGF5ID4gMCkgPyBzZXRUaW1lb3V0KHNsaWRlci5wbGF5LCB2YXJzLmluaXREZWxheSkgOiBzbGlkZXIucGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9VQ0hcbiAgICAgICAgaWYgKHRvdWNoICYmIHZhcnMudG91Y2gpIG1ldGhvZHMudG91Y2goKTtcblxuICAgICAgICAvLyBGQURFJiZTTU9PVEhIRUlHSFQgfHwgU0xJREU6XG4gICAgICAgIGlmICghZmFkZSB8fCAoZmFkZSAmJiB2YXJzLnNtb290aEhlaWdodCkpICQod2luZG93KS5iaW5kKFwicmVzaXplIGZvY3VzXCIsIG1ldGhvZHMucmVzaXplKTtcblxuXG4gICAgICAgIC8vIEFQSTogc3RhcnQoKSBDYWxsYmFja1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFycy5zdGFydChzbGlkZXIpO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgfSxcbiAgICAgIGFzTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuYXNOYXYgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IE1hdGguZmxvb3Ioc2xpZGVyLmN1cnJlbnRTbGlkZS9zbGlkZXIubW92ZSk7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRJdGVtID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHNsaWRlci5jdXJyZW50SXRlbSkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgc2xpZGVyLnNsaWRlcy5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciAkc2xpZGUgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgaWYgKCEkKHZhcnMuYXNOYXZGb3IpLmRhdGEoJ2ZsZXhzbGlkZXInKS5hbmltYXRpbmcgJiYgISRzbGlkZS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgdmFycy5wYXVzZU9uQWN0aW9uLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb250cm9sTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIXNsaWRlci5tYW51YWxDb250cm9scykge1xuICAgICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldHVwUGFnaW5nKCk7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gTUFOVUFMQ09OVFJPTFM6XG4gICAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuc2V0dXBNYW51YWwoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldHVwUGFnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdHlwZSA9ICh2YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdjb250cm9sLXRodW1icycgOiAnY29udHJvbC1wYWdpbmcnLFxuICAgICAgICAgICAgICBqID0gMSxcbiAgICAgICAgICAgICAgaXRlbTtcblxuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQgPSAkKCc8b2wgY2xhc3M9XCInKyBuYW1lc3BhY2UgKyAnY29udHJvbC1uYXYgJyArIG5hbWVzcGFjZSArIHR5cGUgKyAnXCI+PC9vbD4nKTtcblxuICAgICAgICAgIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5wYWdpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSAodmFycy5jb250cm9sTmF2ID09PSBcInRodW1ibmFpbHNcIikgPyAnPGltZyBzcmM9XCInICsgc2xpZGVyLnNsaWRlcy5lcShpKS5hdHRyKFwiZGF0YS10aHVtYlwiKSArICdcIi8+JyA6ICc8YT4nICsgaiArICc8L2E+JztcbiAgICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5hcHBlbmQoJzxsaT4nICsgaXRlbSArICc8L2xpPicpO1xuICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgICAgKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikgPyAkKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikuYXBwZW5kKHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQpIDogc2xpZGVyLmFwcGVuZChzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkKTtcbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuc2V0KCk7XG5cbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuYWN0aXZlKCk7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkLmRlbGVnYXRlKCdhLCBpbWcnLCBldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuY29udHJvbE5hdi5pbmRleCgkdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MobmFtZXNwYWNlICsgJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB2YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIFByZXZlbnQgaU9TIGNsaWNrIGV2ZW50IGJ1Z1xuICAgICAgICAgIGlmICh0b3VjaCkge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5kZWxlZ2F0ZSgnYScsIFwiY2xpY2sgdG91Y2hzdGFydFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXR1cE1hbnVhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYgPSBzbGlkZXIubWFudWFsQ29udHJvbHM7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYubGl2ZShldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuY29udHJvbE5hdi5pbmRleCgkdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MobmFtZXNwYWNlICsgJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICh0YXJnZXQgPiBzbGlkZXIuY3VycmVudFNsaWRlKSA/IHNsaWRlci5kaXJlY3Rpb24gPSBcIm5leHRcIiA6IHNsaWRlci5kaXJlY3Rpb24gPSBcInByZXZcIjtcbiAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgdmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBQcmV2ZW50IGlPUyBjbGljayBldmVudCBidWdcbiAgICAgICAgICBpZiAodG91Y2gpIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2LmxpdmUoXCJjbGljayB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gKHZhcnMuY29udHJvbE5hdiA9PT0gXCJ0aHVtYm5haWxzXCIpID8gJ2ltZycgOiAnYSc7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYgPSAkKCcuJyArIG5hbWVzcGFjZSArICdjb250cm9sLW5hdiBsaSAnICsgc2VsZWN0b3IsIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpID8gc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyIDogc2xpZGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdi5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZVwiKS5lcShzbGlkZXIuYW5pbWF0aW5nVG8pLmFkZENsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlXCIpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGFjdGlvbiwgcG9zKSB7XG4gICAgICAgICAgaWYgKHNsaWRlci5wYWdpbmdDb3VudCA+IDEgJiYgYWN0aW9uID09PSBcImFkZFwiKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkLmFwcGVuZCgkKCc8bGk+PGE+JyArIHNsaWRlci5jb3VudCArICc8L2E+PC9saT4nKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQuZmluZCgnbGknKS5yZW1vdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYuZXEocG9zKS5jbG9zZXN0KCdsaScpLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuc2V0KCk7XG4gICAgICAgICAgKHNsaWRlci5wYWdpbmdDb3VudCA+IDEgJiYgc2xpZGVyLnBhZ2luZ0NvdW50ICE9PSBzbGlkZXIuY29udHJvbE5hdi5sZW5ndGgpID8gc2xpZGVyLnVwZGF0ZShwb3MsIGFjdGlvbikgOiBtZXRob2RzLmNvbnRyb2xOYXYuYWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXJlY3Rpb25OYXY6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBkaXJlY3Rpb25OYXZTY2FmZm9sZCA9ICQoJzx1bCBjbGFzcz1cIicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdlwiPjxsaT48YSBjbGFzcz1cIicgKyBuYW1lc3BhY2UgKyAncHJldlwiIGhyZWY9XCIjXCI+JyArIHZhcnMucHJldlRleHQgKyAnPC9hPjwvbGk+PGxpPjxhIGNsYXNzPVwiJyArIG5hbWVzcGFjZSArICduZXh0XCIgaHJlZj1cIiNcIj4nICsgdmFycy5uZXh0VGV4dCArICc8L2E+PC9saT48L3VsPicpO1xuXG4gICAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgICAgaWYgKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYuYmluZChldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICgkKHRoaXMpLmhhc0NsYXNzKG5hbWVzcGFjZSArICduZXh0JykpID8gc2xpZGVyLmdldFRhcmdldCgnbmV4dCcpIDogc2xpZGVyLmdldFRhcmdldCgncHJldicpO1xuICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgdmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBQcmV2ZW50IGlPUyBjbGljayBldmVudCBidWdcbiAgICAgICAgICBpZiAodG91Y2gpIHtcbiAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYuYmluZChcImNsaWNrIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlzYWJsZWRDbGFzcyA9IG5hbWVzcGFjZSArICdkaXNhYmxlZCc7XG4gICAgICAgICAgaWYgKHNsaWRlci5wYWdpbmdDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5hZGRDbGFzcyhkaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF2YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IDApIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJwcmV2XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSB7XG4gICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcykuZmlsdGVyKCcuJyArIG5hbWVzcGFjZSArIFwibmV4dFwiKS5hZGRDbGFzcyhkaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGF1c2VQbGF5OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGF1c2VQbGF5U2NhZmZvbGQgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIG5hbWVzcGFjZSArICdwYXVzZXBsYXlcIj48YT48L2E+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAvLyBDT05UUk9MU0NPTlRBSU5FUjpcbiAgICAgICAgICBpZiAoc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbHNDb250YWluZXIuYXBwZW5kKHBhdXNlUGxheVNjYWZmb2xkKTtcbiAgICAgICAgICAgIHNsaWRlci5wYXVzZVBsYXkgPSAkKCcuJyArIG5hbWVzcGFjZSArICdwYXVzZXBsYXkgYScsIHNsaWRlci5jb250cm9sc0NvbnRhaW5lcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5hcHBlbmQocGF1c2VQbGF5U2NhZmZvbGQpO1xuICAgICAgICAgICAgc2xpZGVyLnBhdXNlUGxheSA9ICQoJy4nICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheSBhJywgc2xpZGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZXRob2RzLnBhdXNlUGxheS51cGRhdGUoKHZhcnMuc2xpZGVzaG93KSA/IG5hbWVzcGFjZSArICdwYXVzZScgOiBuYW1lc3BhY2UgKyAncGxheScpO1xuXG4gICAgICAgICAgc2xpZGVyLnBhdXNlUGxheS5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhuYW1lc3BhY2UgKyAncGF1c2UnKSkge1xuICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGF1c2UgPSB0cnVlO1xuICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIucGF1c2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGxheSA9IHRydWU7XG4gICAgICAgICAgICAgIHNsaWRlci5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUHJldmVudCBpT1MgY2xpY2sgZXZlbnQgYnVnXG4gICAgICAgICAgaWYgKHRvdWNoKSB7XG4gICAgICAgICAgICBzbGlkZXIucGF1c2VQbGF5LmJpbmQoXCJjbGljayB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICAoc3RhdGUgPT09IFwicGxheVwiKSA/IHNsaWRlci5wYXVzZVBsYXkucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgJ3BhdXNlJykuYWRkQ2xhc3MobmFtZXNwYWNlICsgJ3BsYXknKS50ZXh0KHZhcnMucGxheVRleHQpIDogc2xpZGVyLnBhdXNlUGxheS5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyAncGxheScpLmFkZENsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpLnRleHQodmFycy5wYXVzZVRleHQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgY3dpZHRoLFxuICAgICAgICAgIGR4LFxuICAgICAgICAgIHN0YXJ0VCxcbiAgICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZTtcblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XG4gICAgICAgICAgaWYgKHNsaWRlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG4gICAgICAgICAgICBjd2lkdGggPSAodmVydGljYWwpID8gc2xpZGVyLmggOiBzbGlkZXIuIHc7XG4gICAgICAgICAgICBzdGFydFQgPSBOdW1iZXIobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAvLyBDQVJPVVNFTDpcbiAgICAgICAgICAgIG9mZnNldCA9IChjYXJvdXNlbCAmJiByZXZlcnNlICYmIHNsaWRlci5hbmltYXRpbmdUbyA9PT0gc2xpZGVyLmxhc3QpID8gMCA6XG4gICAgICAgICAgICAgICAgICAgICAoY2Fyb3VzZWwgJiYgcmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyB2YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvKSA6XG4gICAgICAgICAgICAgICAgICAgICAoY2Fyb3VzZWwgJiYgc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpID8gc2xpZGVyLmxpbWl0IDpcbiAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHZhcnMuaXRlbU1hcmdpbikgKiBzbGlkZXIubW92ZSkgKiBzbGlkZXIuY3VycmVudFNsaWRlIDpcbiAgICAgICAgICAgICAgICAgICAgIChyZXZlcnNlKSA/IChzbGlkZXIubGFzdCAtIHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogY3dpZHRoIDogKHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogY3dpZHRoO1xuICAgICAgICAgICAgc3RhcnRYID0gKHZlcnRpY2FsKSA/IGUudG91Y2hlc1swXS5wYWdlWSA6IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgIHN0YXJ0WSA9ICh2ZXJ0aWNhbCkgPyBlLnRvdWNoZXNbMF0ucGFnZVggOiBlLnRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICAgICAgZHggPSAodmVydGljYWwpID8gc3RhcnRYIC0gZS50b3VjaGVzWzBdLnBhZ2VZIDogc3RhcnRYIC0gZS50b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgIHNjcm9sbGluZyA9ICh2ZXJ0aWNhbCkgPyAoTWF0aC5hYnMoZHgpIDwgTWF0aC5hYnMoZS50b3VjaGVzWzBdLnBhZ2VYIC0gc3RhcnRZKSkgOiAoTWF0aC5hYnMoZHgpIDwgTWF0aC5hYnMoZS50b3VjaGVzWzBdLnBhZ2VZIC0gc3RhcnRZKSk7XG5cbiAgICAgICAgICBpZiAoIXNjcm9sbGluZyB8fCBOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPiA1MDApIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghZmFkZSAmJiBzbGlkZXIudHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKCF2YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgICAgICBkeCA9IGR4Lygoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gMCAmJiBkeCA8IDAgfHwgc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QgJiYgZHggPiAwKSA/IChNYXRoLmFicyhkeCkvY3dpZHRoKzIpIDogMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2xpZGVyLnNldFByb3BzKG9mZnNldCArIGR4LCBcInNldFRvdWNoXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hFbmQoZSkge1xuICAgICAgICAgIC8vIGZpbmlzaCB0aGUgdG91Y2ggYnkgdW5kb2luZyB0aGUgdG91Y2ggc2Vzc2lvblxuICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIuY3VycmVudFNsaWRlICYmICFzY3JvbGxpbmcgJiYgIShkeCA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVEeCA9IChyZXZlcnNlKSA/IC1keCA6IGR4LFxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICh1cGRhdGVEeCA+IDApID8gc2xpZGVyLmdldFRhcmdldCgnbmV4dCcpIDogc2xpZGVyLmdldFRhcmdldCgncHJldicpO1xuXG4gICAgICAgICAgICBpZiAoc2xpZGVyLmNhbkFkdmFuY2UodGFyZ2V0KSAmJiAoTnVtYmVyKG5ldyBEYXRlKCkpIC0gc3RhcnRUIDwgNTUwICYmIE1hdGguYWJzKHVwZGF0ZUR4KSA+IDUwIHx8IE1hdGguYWJzKHVwZGF0ZUR4KSA+IGN3aWR0aC8yKSkge1xuICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB2YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFmYWRlKSBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmN1cnJlbnRTbGlkZSwgdmFycy5wYXVzZU9uQWN0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICAgICAgc3RhcnRYID0gbnVsbDtcbiAgICAgICAgICBzdGFydFkgPSBudWxsO1xuICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICBvZmZzZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVzaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nICYmIHNsaWRlci5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgIGlmICghY2Fyb3VzZWwpIHNsaWRlci5kb01hdGgoKTtcblxuICAgICAgICAgIGlmIChmYWRlKSB7XG4gICAgICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICAgICAgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNhcm91c2VsKSB7IC8vQ0FST1VTRUw6XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLndpZHRoKHNsaWRlci5jb21wdXRlZFcpO1xuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZShzbGlkZXIucGFnaW5nQ291bnQpO1xuICAgICAgICAgICAgc2xpZGVyLnNldFByb3BzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHZlcnRpY2FsKSB7IC8vVkVSVElDQUw6XG4gICAgICAgICAgICBzbGlkZXIudmlld3BvcnQuaGVpZ2h0KHNsaWRlci5oKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXIuaCwgXCJzZXRUb3RhbFwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU01PT1RIIEhFSUdIVDpcbiAgICAgICAgICAgIGlmICh2YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgICAgICAgIHNsaWRlci5uZXdTbGlkZXMud2lkdGgoc2xpZGVyLmNvbXB1dGVkVyk7XG4gICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyLmNvbXB1dGVkVywgXCJzZXRUb3RhbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzbW9vdGhIZWlnaHQ6IGZ1bmN0aW9uKGR1cikge1xuICAgICAgICBpZiAoIXZlcnRpY2FsIHx8IGZhZGUpIHtcbiAgICAgICAgICB2YXIgJG9iaiA9IChmYWRlKSA/IHNsaWRlciA6IHNsaWRlci52aWV3cG9ydDtcbiAgICAgICAgICAoZHVyKSA/ICRvYmouYW5pbWF0ZSh7XCJoZWlnaHRcIjogc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuYW5pbWF0aW5nVG8pLmhlaWdodCgpfSwgZHVyKSA6ICRvYmouaGVpZ2h0KHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmFuaW1hdGluZ1RvKS5oZWlnaHQoKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzeW5jOiBmdW5jdGlvbihhY3Rpb24pIHtcbiAgICAgICAgdmFyICRvYmogPSAkKHZhcnMuc3luYykuZGF0YShcImZsZXhzbGlkZXJcIiksXG4gICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG5cbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiYW5pbWF0ZVwiOiAkb2JqLmZsZXhBbmltYXRlKHRhcmdldCwgdmFycy5wYXVzZU9uQWN0aW9uLCBmYWxzZSwgdHJ1ZSk7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJwbGF5XCI6IGlmICghJG9iai5wbGF5aW5nICYmICEkb2JqLmFzTmF2KSB7ICRvYmoucGxheSgpOyB9IGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJwYXVzZVwiOiAkb2JqLnBhdXNlKCk7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICBzbGlkZXIuZmxleEFuaW1hdGUgPSBmdW5jdGlvbih0YXJnZXQsIHBhdXNlLCBvdmVycmlkZSwgd2l0aFN5bmMsIGZyb21OYXYpIHtcblxuICAgICAgaWYgKGFzTmF2ICYmIHNsaWRlci5wYWdpbmdDb3VudCA9PT0gMSkgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcblxuICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nICYmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQsIGZyb21OYXYpIHx8IG92ZXJyaWRlKSAmJiBzbGlkZXIuaXMoXCI6dmlzaWJsZVwiKSkge1xuICAgICAgICBpZiAoYXNOYXYgJiYgd2l0aFN5bmMpIHtcbiAgICAgICAgICB2YXIgbWFzdGVyID0gJCh2YXJzLmFzTmF2Rm9yKS5kYXRhKCdmbGV4c2xpZGVyJyk7XG4gICAgICAgICAgc2xpZGVyLmF0RW5kID0gdGFyZ2V0ID09PSAwIHx8IHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgICAgICBtYXN0ZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZnJvbU5hdik7XG4gICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICBtYXN0ZXIuZGlyZWN0aW9uID0gc2xpZGVyLmRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmIChNYXRoLmNlaWwoKHRhcmdldCArIDEpL3NsaWRlci52aXNpYmxlKSAtIDEgIT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgdGFyZ2V0ICE9PSAwKSB7XG4gICAgICAgICAgICBzbGlkZXIuY3VycmVudEl0ZW0gPSB0YXJnZXQ7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHRhcmdldCkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgICB0YXJnZXQgPSBNYXRoLmZsb29yKHRhcmdldC9zbGlkZXIudmlzaWJsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jdXJyZW50SXRlbSA9IHRhcmdldDtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIikuZXEodGFyZ2V0KS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gdGFyZ2V0O1xuICAgICAgICAvLyBBUEk6IGJlZm9yZSgpIGFuaW1hdGlvbiBDYWxsYmFja1xuICAgICAgICB2YXJzLmJlZm9yZShzbGlkZXIpO1xuXG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgaWYgKHBhdXNlKSBzbGlkZXIucGF1c2UoKTtcblxuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMgJiYgIWZyb21OYXYpIG1ldGhvZHMuc3luYyhcImFuaW1hdGVcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVlxuICAgICAgICBpZiAodmFycy5jb250cm9sTmF2KSBtZXRob2RzLmNvbnRyb2xOYXYuYWN0aXZlKCk7XG5cbiAgICAgICAgLy8gIUNBUk9VU0VMOlxuICAgICAgICAvLyBDQU5ESURBVEU6IHNsaWRlIGFjdGl2ZSBjbGFzcyAoZm9yIGFkZC9yZW1vdmUgc2xpZGUpXG4gICAgICAgIGlmICghY2Fyb3VzZWwpIHNsaWRlci5zbGlkZXMucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgJ2FjdGl2ZS1zbGlkZScpLmVxKHRhcmdldCkuYWRkQ2xhc3MobmFtZXNwYWNlICsgJ2FjdGl2ZS1zbGlkZScpO1xuXG4gICAgICAgIC8vIElORklOSVRFIExPT1A6XG4gICAgICAgIC8vIENBTkRJREFURTogYXRFbmRcbiAgICAgICAgc2xpZGVyLmF0RW5kID0gdGFyZ2V0ID09PSAwIHx8IHRhcmdldCA9PT0gc2xpZGVyLmxhc3Q7XG5cbiAgICAgICAgLy8gRElSRUNUSU9OTkFWOlxuICAgICAgICBpZiAodmFycy5kaXJlY3Rpb25OYXYpIG1ldGhvZHMuZGlyZWN0aW9uTmF2LnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHNsaWRlci5sYXN0KSB7XG4gICAgICAgICAgLy8gQVBJOiBlbmQoKSBvZiBjeWNsZSBDYWxsYmFja1xuICAgICAgICAgIHZhcnMuZW5kKHNsaWRlcik7XG4gICAgICAgICAgLy8gU0xJREVTSE9XICYmICFJTkZJTklURSBMT09QOlxuICAgICAgICAgIGlmICghdmFycy5hbmltYXRpb25Mb29wKSBzbGlkZXIucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNMSURFOlxuICAgICAgICBpZiAoIWZhZGUpIHtcbiAgICAgICAgICB2YXIgZGltZW5zaW9uID0gKHZlcnRpY2FsKSA/IHNsaWRlci5zbGlkZXMuZmlsdGVyKCc6Zmlyc3QnKS5oZWlnaHQoKSA6IHNsaWRlci5jb21wdXRlZFcsXG4gICAgICAgICAgICAgIG1hcmdpbiwgc2xpZGVTdHJpbmcsIGNhbGNOZXh0O1xuXG4gICAgICAgICAgLy8gSU5GSU5JVEUgTE9PUCAvIFJFVkVSU0U6XG4gICAgICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgICAgICBtYXJnaW4gPSAodmFycy5pdGVtV2lkdGggPiBzbGlkZXIudykgPyB2YXJzLml0ZW1NYXJnaW4gKiAyIDogdmFycy5pdGVtTWFyZ2luO1xuICAgICAgICAgICAgY2FsY05leHQgPSAoKHNsaWRlci5pdGVtVyArIG1hcmdpbikgKiBzbGlkZXIubW92ZSkgKiBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChjYWxjTmV4dCA+IHNsaWRlci5saW1pdCAmJiBzbGlkZXIudmlzaWJsZSAhPT0gMSkgPyBzbGlkZXIubGltaXQgOiBjYWxjTmV4dDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgdGFyZ2V0ID09PSBzbGlkZXIuY291bnQgLSAxICYmIHZhcnMuYW5pbWF0aW9uTG9vcCAmJiBzbGlkZXIuZGlyZWN0aW9uICE9PSBcIm5leHRcIikge1xuICAgICAgICAgICAgc2xpZGVTdHJpbmcgPSAocmV2ZXJzZSkgPyAoc2xpZGVyLmNvdW50ICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGRpbWVuc2lvbiA6IDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiB0YXJnZXQgPT09IDAgJiYgdmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwicHJldlwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IDAgOiAoc2xpZGVyLmNvdW50ICsgMSkgKiBkaW1lbnNpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlU3RyaW5nID0gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHRhcmdldCArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBkaW1lbnNpb24gOiAodGFyZ2V0ICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGRpbWVuc2lvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlU3RyaW5nLCBcIlwiLCB2YXJzLmFuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgICBpZiAoc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIXZhcnMuYW5pbWF0aW9uTG9vcCB8fCAhc2xpZGVyLmF0RW5kKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSA9IHNsaWRlci5hbmltYXRpbmdUbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIudW5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzbGlkZXIud3JhcHVwKGRpbWVuc2lvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5hbmltYXRlKHNsaWRlci5hcmdzLCB2YXJzLmFuaW1hdGlvblNwZWVkLCB2YXJzLmVhc2luZywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBGQURFOlxuICAgICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmN1cnJlbnRTbGlkZSkuZmFkZU91dCh2YXJzLmFuaW1hdGlvblNwZWVkLCB2YXJzLmVhc2luZyk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuZmFkZUluKHZhcnMuYW5pbWF0aW9uU3BlZWQsIHZhcnMuZWFzaW5nLCBzbGlkZXIud3JhcHVwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5jc3MoeyBcIm9wYWNpdHlcIjogMCwgXCJ6SW5kZXhcIjogMSB9KTtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuZXEodGFyZ2V0KS5jc3MoeyBcIm9wYWNpdHlcIjogMSwgXCJ6SW5kZXhcIjogMiB9KTtcblxuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy51bmJpbmQoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIik7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmJpbmQoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vIEFQSTogYWZ0ZXIoKSBhbmltYXRpb24gQ2FsbGJhY2tcbiAgICAgICAgICAgICAgdmFycy5hZnRlcihzbGlkZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNsaWRlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgIGlmICh2YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQodmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNsaWRlci53cmFwdXAgPSBmdW5jdGlvbihkaW1lbnNpb24pIHtcbiAgICAgIC8vIFNMSURFOlxuICAgICAgaWYgKCFmYWRlICYmICFjYXJvdXNlbCkge1xuICAgICAgICBpZiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gMCAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0ICYmIHZhcnMuYW5pbWF0aW9uTG9vcCkge1xuICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhkaW1lbnNpb24sIFwianVtcEVuZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IDAgJiYgdmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wU3RhcnRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNsaWRlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAvLyBBUEk6IGFmdGVyKCkgYW5pbWF0aW9uIENhbGxiYWNrXG4gICAgICB2YXJzLmFmdGVyKHNsaWRlcik7XG4gICAgfVxuXG4gICAgLy8gU0xJREVTSE9XOlxuICAgIHNsaWRlci5hbmltYXRlU2xpZGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXNsaWRlci5hbmltYXRpbmcpIHNsaWRlci5mbGV4QW5pbWF0ZShzbGlkZXIuZ2V0VGFyZ2V0KFwibmV4dFwiKSk7XG4gICAgfVxuICAgIC8vIFNMSURFU0hPVzpcbiAgICBzbGlkZXIucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5wbGF5aW5nID0gZmFsc2U7XG4gICAgICAvLyBQQVVTRVBMQVk6XG4gICAgICBpZiAodmFycy5wYXVzZVBsYXkpIG1ldGhvZHMucGF1c2VQbGF5LnVwZGF0ZShcInBsYXlcIik7XG4gICAgICAvLyBTWU5DOlxuICAgICAgaWYgKHNsaWRlci5zeW5jRXhpc3RzKSBtZXRob2RzLnN5bmMoXCJwYXVzZVwiKTtcbiAgICB9XG4gICAgLy8gU0xJREVTSE9XOlxuICAgIHNsaWRlci5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzbGlkZXIuYW5pbWF0ZWRTbGlkZXMgPSBzZXRJbnRlcnZhbChzbGlkZXIuYW5pbWF0ZVNsaWRlcywgdmFycy5zbGlkZXNob3dTcGVlZCk7XG4gICAgICBzbGlkZXIucGxheWluZyA9IHRydWU7XG4gICAgICAvLyBQQVVTRVBMQVk6XG4gICAgICBpZiAodmFycy5wYXVzZVBsYXkpIG1ldGhvZHMucGF1c2VQbGF5LnVwZGF0ZShcInBhdXNlXCIpO1xuICAgICAgLy8gU1lOQzpcbiAgICAgIGlmIChzbGlkZXIuc3luY0V4aXN0cykgbWV0aG9kcy5zeW5jKFwicGxheVwiKTtcbiAgICB9XG4gICAgc2xpZGVyLmNhbkFkdmFuY2UgPSBmdW5jdGlvbih0YXJnZXQsIGZyb21OYXYpIHtcbiAgICAgIC8vIEFTTkFWOlxuICAgICAgdmFyIGxhc3QgPSAoYXNOYXYpID8gc2xpZGVyLnBhZ2luZ0NvdW50IC0gMSA6IHNsaWRlci5sYXN0O1xuICAgICAgcmV0dXJuIChmcm9tTmF2KSA/IHRydWUgOlxuICAgICAgICAgICAgIChhc05hdiAmJiBzbGlkZXIuY3VycmVudEl0ZW0gPT09IHNsaWRlci5jb3VudCAtIDEgJiYgdGFyZ2V0ID09PSAwICYmIHNsaWRlci5kaXJlY3Rpb24gPT09IFwicHJldlwiKSA/IHRydWUgOlxuICAgICAgICAgICAgIChhc05hdiAmJiBzbGlkZXIuY3VycmVudEl0ZW0gPT09IDAgJiYgdGFyZ2V0ID09PSBzbGlkZXIucGFnaW5nQ291bnQgLSAxICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAodGFyZ2V0ID09PSBzbGlkZXIuY3VycmVudFNsaWRlICYmICFhc05hdikgPyBmYWxzZSA6XG4gICAgICAgICAgICAgKHZhcnMuYW5pbWF0aW9uTG9vcCkgPyB0cnVlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgdGFyZ2V0ID09PSBsYXN0ICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IGxhc3QgJiYgdGFyZ2V0ID09PSAwICYmIHNsaWRlci5kaXJlY3Rpb24gPT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICB0cnVlO1xuICAgIH1cbiAgICBzbGlkZXIuZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oZGlyKSB7XG4gICAgICBzbGlkZXIuZGlyZWN0aW9uID0gZGlyO1xuICAgICAgaWYgKGRpciA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgcmV0dXJuIChzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCkgPyAwIDogc2xpZGVyLmN1cnJlbnRTbGlkZSArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDApID8gc2xpZGVyLmxhc3QgOiBzbGlkZXIuY3VycmVudFNsaWRlIC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTTElERTpcbiAgICBzbGlkZXIuc2V0UHJvcHMgPSBmdW5jdGlvbihwb3MsIHNwZWNpYWwsIGR1cikge1xuICAgICAgdmFyIHRhcmdldCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvc0NoZWNrID0gKHBvcykgPyBwb3MgOiAoKHNsaWRlci5pdGVtVyArIHZhcnMuaXRlbU1hcmdpbikgKiBzbGlkZXIubW92ZSkgKiBzbGlkZXIuYW5pbWF0aW5nVG8sXG4gICAgICAgICAgICBwb3NDYWxjID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNwZWNpYWwgPT09IFwic2V0VG91Y2hcIikgPyBwb3MgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyB2YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvKSA6XG4gICAgICAgICAgICAgICAgICAgICAgIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSA/IHNsaWRlci5saW1pdCA6IHBvc0NoZWNrO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3BlY2lhbCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInNldFRvdGFsXCI6IHJldHVybiAocmV2ZXJzZSkgPyAoKHNsaWRlci5jb3VudCAtIDEpIC0gc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBwb3MgOiAoc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBwb3M7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwic2V0VG91Y2hcIjogcmV0dXJuIChyZXZlcnNlKSA/IHBvcyA6IHBvcztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJqdW1wRW5kXCI6IHJldHVybiAocmV2ZXJzZSkgPyBwb3MgOiBzbGlkZXIuY291bnQgKiBwb3M7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwianVtcFN0YXJ0XCI6IHJldHVybiAocmV2ZXJzZSkgPyBzbGlkZXIuY291bnQgKiBwb3MgOiBwb3M7XG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gcG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIHJldHVybiAocG9zQ2FsYyAqIC0xKSArIFwicHhcIjtcbiAgICAgICAgICB9KCkpO1xuXG4gICAgICBpZiAoc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIHRhcmdldCA9ICh2ZXJ0aWNhbCkgPyBcInRyYW5zbGF0ZTNkKDAsXCIgKyB0YXJnZXQgKyBcIiwwKVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHRhcmdldCArIFwiLDAsMClcIjtcbiAgICAgICAgZHVyID0gKGR1ciAhPT0gdW5kZWZpbmVkKSA/IChkdXIvMTAwMCkgKyBcInNcIiA6IFwiMHNcIjtcbiAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNpdGlvbi1kdXJhdGlvblwiLCBkdXIpO1xuICAgICAgfVxuXG4gICAgICBzbGlkZXIuYXJnc1tzbGlkZXIucHJvcF0gPSB0YXJnZXQ7XG4gICAgICBpZiAoc2xpZGVyLnRyYW5zaXRpb25zIHx8IGR1ciA9PT0gdW5kZWZpbmVkKSBzbGlkZXIuY29udGFpbmVyLmNzcyhzbGlkZXIuYXJncyk7XG4gICAgfVxuXG4gICAgc2xpZGVyLnNldHVwID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgLy8gU0xJREU6XG4gICAgICBpZiAoIWZhZGUpIHtcbiAgICAgICAgdmFyIHNsaWRlck9mZnNldCwgYXJyO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImluaXRcIikge1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ZpZXdwb3J0XCI+PC9kaXY+JykuY3NzKHtcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwifSkuYXBwZW5kVG8oc2xpZGVyKS5hcHBlbmQoc2xpZGVyLmNvbnRhaW5lcik7XG4gICAgICAgICAgLy8gSU5GSU5JVEUgTE9PUDpcbiAgICAgICAgICBzbGlkZXIuY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgc2xpZGVyLmNsb25lT2Zmc2V0ID0gMDtcbiAgICAgICAgICAvLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgICBhcnIgPSAkLm1ha2VBcnJheShzbGlkZXIuc2xpZGVzKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzID0gJChhcnIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSU5GSU5JVEUgTE9PUCAmJiAhQ0FST1VTRUw6XG4gICAgICAgIGlmICh2YXJzLmFuaW1hdGlvbkxvb3AgJiYgIWNhcm91c2VsKSB7XG4gICAgICAgICAgc2xpZGVyLmNsb25lQ291bnQgPSAyO1xuICAgICAgICAgIHNsaWRlci5jbG9uZU9mZnNldCA9IDE7XG4gICAgICAgICAgLy8gY2xlYXIgb3V0IG9sZCBjbG9uZXNcbiAgICAgICAgICBpZiAodHlwZSAhPT0gXCJpbml0XCIpIHNsaWRlci5jb250YWluZXIuZmluZCgnLmNsb25lJykucmVtb3ZlKCk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5hcHBlbmQoc2xpZGVyLnNsaWRlcy5maXJzdCgpLmNsb25lKCkuYWRkQ2xhc3MoJ2Nsb25lJykpLnByZXBlbmQoc2xpZGVyLnNsaWRlcy5sYXN0KCkuY2xvbmUoKS5hZGRDbGFzcygnY2xvbmUnKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVyLm5ld1NsaWRlcyA9ICQodmFycy5zZWxlY3Rvciwgc2xpZGVyKTtcblxuICAgICAgICBzbGlkZXJPZmZzZXQgPSAocmV2ZXJzZSkgPyBzbGlkZXIuY291bnQgLSAxIC0gc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCA6IHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQ7XG4gICAgICAgIC8vIFZFUlRJQ0FMOlxuICAgICAgICBpZiAodmVydGljYWwgJiYgIWNhcm91c2VsKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5oZWlnaHQoKHNsaWRlci5jb3VudCArIHNsaWRlci5jbG9uZUNvdW50KSAqIDIwMCArIFwiJVwiKS5jc3MoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpLndpZHRoKFwiMTAwJVwiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzbGlkZXIubmV3U2xpZGVzLmNzcyh7XCJkaXNwbGF5XCI6IFwiYmxvY2tcIn0pO1xuICAgICAgICAgICAgc2xpZGVyLmRvTWF0aCgpO1xuICAgICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmhlaWdodChzbGlkZXIuaCk7XG4gICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyT2Zmc2V0ICogc2xpZGVyLmgsIFwiaW5pdFwiKTtcbiAgICAgICAgICB9LCAodHlwZSA9PT0gXCJpbml0XCIpID8gMTAwIDogMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci53aWR0aCgoc2xpZGVyLmNvdW50ICsgc2xpZGVyLmNsb25lQ291bnQpICogMjAwICsgXCIlXCIpO1xuICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXJPZmZzZXQgKiBzbGlkZXIuY29tcHV0ZWRXLCBcImluaXRcIik7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2xpZGVyLmRvTWF0aCgpO1xuICAgICAgICAgICAgc2xpZGVyLm5ld1NsaWRlcy5jc3Moe1wid2lkdGhcIjogc2xpZGVyLmNvbXB1dGVkVywgXCJmbG9hdFwiOiBcImxlZnRcIiwgXCJkaXNwbGF5XCI6IFwiYmxvY2tcIn0pO1xuICAgICAgICAgICAgLy8gU01PT1RIIEhFSUdIVDpcbiAgICAgICAgICAgIGlmICh2YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgICAgICB9LCAodHlwZSA9PT0gXCJpbml0XCIpID8gMTAwIDogMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIEZBREU6XG4gICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHtcIndpZHRoXCI6IFwiMTAwJVwiLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcIm1hcmdpblJpZ2h0XCI6IFwiLTEwMCVcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJ9KTtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaW5pdFwiKSB7XG4gICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5mYWRlSW4odmFycy5hbmltYXRpb25TcGVlZCwgdmFycy5lYXNpbmcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcImRpc3BsYXlcIjogXCJibG9ja1wiLCBcIndlYmtpdFRyYW5zaXRpb25cIjogXCJvcGFjaXR5IFwiICsgdmFycy5hbmltYXRpb25TcGVlZCAvIDEwMDAgKyBcInMgZWFzZVwiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgIGlmICh2YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgIH1cbiAgICAgIC8vICFDQVJPVVNFTDpcbiAgICAgIC8vIENBTkRJREFURTogYWN0aXZlIHNsaWRlXG4gICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmFkZENsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpO1xuICAgIH1cblxuICAgIHNsaWRlci5kb01hdGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzbGlkZSA9IHNsaWRlci5zbGlkZXMuZmlyc3QoKSxcbiAgICAgICAgICBzbGlkZU1hcmdpbiA9IHZhcnMuaXRlbU1hcmdpbixcbiAgICAgICAgICBtaW5JdGVtcyA9IHZhcnMubWluSXRlbXMsXG4gICAgICAgICAgbWF4SXRlbXMgPSB2YXJzLm1heEl0ZW1zO1xuXG4gICAgICBzbGlkZXIudyA9IHNsaWRlci53aWR0aCgpO1xuICAgICAgc2xpZGVyLmggPSBzbGlkZS5oZWlnaHQoKTtcbiAgICAgIHNsaWRlci5ib3hQYWRkaW5nID0gc2xpZGUub3V0ZXJXaWR0aCgpIC0gc2xpZGUud2lkdGgoKTtcblxuICAgICAgLy8gQ0FST1VTRUw6XG4gICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgc2xpZGVyLml0ZW1UID0gdmFycy5pdGVtV2lkdGggKyBzbGlkZU1hcmdpbjtcbiAgICAgICAgc2xpZGVyLm1pblcgPSAobWluSXRlbXMpID8gbWluSXRlbXMgKiBzbGlkZXIuaXRlbVQgOiBzbGlkZXIudztcbiAgICAgICAgc2xpZGVyLm1heFcgPSAobWF4SXRlbXMpID8gbWF4SXRlbXMgKiBzbGlkZXIuaXRlbVQgOiBzbGlkZXIudztcbiAgICAgICAgc2xpZGVyLml0ZW1XID0gKHNsaWRlci5taW5XID4gc2xpZGVyLncpID8gKHNsaWRlci53IC0gKHNsaWRlTWFyZ2luICogbWluSXRlbXMpKS9taW5JdGVtcyA6XG4gICAgICAgICAgICAgICAgICAgICAgIChzbGlkZXIubWF4VyA8IHNsaWRlci53KSA/IChzbGlkZXIudyAtIChzbGlkZU1hcmdpbiAqIG1heEl0ZW1zKSkvbWF4SXRlbXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAodmFycy5pdGVtV2lkdGggPiBzbGlkZXIudykgPyBzbGlkZXIudyA6IHZhcnMuaXRlbVdpZHRoO1xuICAgICAgICBzbGlkZXIudmlzaWJsZSA9IE1hdGguZmxvb3Ioc2xpZGVyLncvKHNsaWRlci5pdGVtVyArIHNsaWRlTWFyZ2luKSk7XG4gICAgICAgIHNsaWRlci5tb3ZlID0gKHZhcnMubW92ZSA+IDAgJiYgdmFycy5tb3ZlIDwgc2xpZGVyLnZpc2libGUgKSA/IHZhcnMubW92ZSA6IHNsaWRlci52aXNpYmxlO1xuICAgICAgICBzbGlkZXIucGFnaW5nQ291bnQgPSBNYXRoLmNlaWwoKChzbGlkZXIuY291bnQgLSBzbGlkZXIudmlzaWJsZSkvc2xpZGVyLm1vdmUpICsgMSk7XG4gICAgICAgIHNsaWRlci5sYXN0ID0gIHNsaWRlci5wYWdpbmdDb3VudCAtIDE7XG4gICAgICAgIHNsaWRlci5saW1pdCA9IChzbGlkZXIucGFnaW5nQ291bnQgPT09IDEpID8gMCA6XG4gICAgICAgICAgICAgICAgICAgICAgICh2YXJzLml0ZW1XaWR0aCA+IHNsaWRlci53KSA/ICgoc2xpZGVyLml0ZW1XICsgKHNsaWRlTWFyZ2luICogMikpICogc2xpZGVyLmNvdW50KSAtIHNsaWRlci53IC0gc2xpZGVNYXJnaW4gOiAoKHNsaWRlci5pdGVtVyArIHNsaWRlTWFyZ2luKSAqIHNsaWRlci5jb3VudCkgLSBzbGlkZXIudyAtIHNsaWRlTWFyZ2luO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVyLml0ZW1XID0gc2xpZGVyLnc7XG4gICAgICAgIHNsaWRlci5wYWdpbmdDb3VudCA9IHNsaWRlci5jb3VudDtcbiAgICAgICAgc2xpZGVyLmxhc3QgPSBzbGlkZXIuY291bnQgLSAxO1xuICAgICAgfVxuICAgICAgc2xpZGVyLmNvbXB1dGVkVyA9IHNsaWRlci5pdGVtVyAtIHNsaWRlci5ib3hQYWRkaW5nO1xuICAgIH1cblxuICAgIHNsaWRlci51cGRhdGUgPSBmdW5jdGlvbihwb3MsIGFjdGlvbikge1xuICAgICAgc2xpZGVyLmRvTWF0aCgpO1xuXG4gICAgICAvLyB1cGRhdGUgY3VycmVudFNsaWRlIGFuZCBzbGlkZXIuYW5pbWF0aW5nVG8gaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoIWNhcm91c2VsKSB7XG4gICAgICAgIGlmIChwb3MgPCBzbGlkZXIuY3VycmVudFNsaWRlKSB7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA8PSBzbGlkZXIuY3VycmVudFNsaWRlICYmIHBvcyAhPT0gMCkge1xuICAgICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nVG8gPSBzbGlkZXIuY3VycmVudFNsaWRlO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgY29udHJvbE5hdlxuICAgICAgaWYgKHZhcnMuY29udHJvbE5hdiAmJiAhc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgIGlmICgoYWN0aW9uID09PSBcImFkZFwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50ID4gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnVwZGF0ZShcImFkZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICgoYWN0aW9uID09PSBcInJlbW92ZVwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50IDwgc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPiBzbGlkZXIubGFzdCkge1xuICAgICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvIC09IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi51cGRhdGUoXCJyZW1vdmVcIiwgc2xpZGVyLmxhc3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgZGlyZWN0aW9uTmF2XG4gICAgICBpZiAodmFycy5kaXJlY3Rpb25OYXYpIG1ldGhvZHMuZGlyZWN0aW9uTmF2LnVwZGF0ZSgpO1xuXG4gICAgfVxuXG4gICAgc2xpZGVyLmFkZFNsaWRlID0gZnVuY3Rpb24ob2JqLCBwb3MpIHtcbiAgICAgIHZhciAkb2JqID0gJChvYmopO1xuXG4gICAgICBzbGlkZXIuY291bnQgKz0gMTtcbiAgICAgIHNsaWRlci5sYXN0ID0gc2xpZGVyLmNvdW50IC0gMTtcblxuICAgICAgLy8gYXBwZW5kIG5ldyBzbGlkZVxuICAgICAgaWYgKHZlcnRpY2FsICYmIHJldmVyc2UpIHtcbiAgICAgICAgKHBvcyAhPT0gdW5kZWZpbmVkKSA/IHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmNvdW50IC0gcG9zKS5hZnRlcigkb2JqKSA6IHNsaWRlci5jb250YWluZXIucHJlcGVuZCgkb2JqKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChwb3MgIT09IHVuZGVmaW5lZCkgPyBzbGlkZXIuc2xpZGVzLmVxKHBvcykuYmVmb3JlKCRvYmopIDogc2xpZGVyLmNvbnRhaW5lci5hcHBlbmQoJG9iaik7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUsIGFuaW1hdGluZ1RvLCBjb250cm9sTmF2LCBhbmQgZGlyZWN0aW9uTmF2XG4gICAgICBzbGlkZXIudXBkYXRlKHBvcywgXCJhZGRcIik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzbGlkZXIuc2xpZGVzXG4gICAgICBzbGlkZXIuc2xpZGVzID0gJCh2YXJzLnNlbGVjdG9yICsgJzpub3QoLmNsb25lKScsIHNsaWRlcik7XG4gICAgICAvLyByZS1zZXR1cCB0aGUgc2xpZGVyIHRvIGFjY29tZGF0ZSBuZXcgc2xpZGVcbiAgICAgIHNsaWRlci5zZXR1cCgpO1xuXG4gICAgICAvL0ZsZXhTbGlkZXI6IGFkZGVkKCkgQ2FsbGJhY2tcbiAgICAgIHZhcnMuYWRkZWQoc2xpZGVyKTtcbiAgICB9XG4gICAgc2xpZGVyLnJlbW92ZVNsaWRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgcG9zID0gKGlzTmFOKG9iaikpID8gc2xpZGVyLnNsaWRlcy5pbmRleCgkKG9iaikpIDogb2JqO1xuXG4gICAgICAvLyB1cGRhdGUgY291bnRcbiAgICAgIHNsaWRlci5jb3VudCAtPSAxO1xuICAgICAgc2xpZGVyLmxhc3QgPSBzbGlkZXIuY291bnQgLSAxO1xuXG4gICAgICAvLyByZW1vdmUgc2xpZGVcbiAgICAgIGlmIChpc05hTihvYmopKSB7XG4gICAgICAgICQob2JqLCBzbGlkZXIuc2xpZGVzKS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICh2ZXJ0aWNhbCAmJiByZXZlcnNlKSA/IHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmxhc3QpLnJlbW92ZSgpIDogc2xpZGVyLnNsaWRlcy5lcShvYmopLnJlbW92ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgY3VycmVudFNsaWRlLCBhbmltYXRpbmdUbywgY29udHJvbE5hdiwgYW5kIGRpcmVjdGlvbk5hdlxuICAgICAgc2xpZGVyLmRvTWF0aCgpO1xuICAgICAgc2xpZGVyLnVwZGF0ZShwb3MsIFwicmVtb3ZlXCIpO1xuXG4gICAgICAvLyB1cGRhdGUgc2xpZGVyLnNsaWRlc1xuICAgICAgc2xpZGVyLnNsaWRlcyA9ICQodmFycy5zZWxlY3RvciArICc6bm90KC5jbG9uZSknLCBzbGlkZXIpO1xuICAgICAgLy8gcmUtc2V0dXAgdGhlIHNsaWRlciB0byBhY2NvbWRhdGUgbmV3IHNsaWRlXG4gICAgICBzbGlkZXIuc2V0dXAoKTtcblxuICAgICAgLy8gRmxleFNsaWRlcjogcmVtb3ZlZCgpIENhbGxiYWNrXG4gICAgICB2YXJzLnJlbW92ZWQoc2xpZGVyKTtcbiAgICB9XG5cbiAgICAvL0ZsZXhTbGlkZXI6IEluaXRpYWxpemVcbiAgICBtZXRob2RzLmluaXQoKTtcbiAgfVxuXG4gIC8vRmxleFNsaWRlcjogRGVmYXVsdCBTZXR0aW5nc1xuICAkLmZsZXhzbGlkZXIuZGVmYXVsdHMgPSB7XG4gICAgbmFtZXNwYWNlOiBcImZsZXgtXCIsICAgICAgICAgICAgIC8ve05FV30gU3RyaW5nOiBQcmVmaXggc3RyaW5nIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBvZiBldmVyeSBlbGVtZW50IGdlbmVyYXRlZCBieSB0aGUgcGx1Z2luXG4gICAgc2VsZWN0b3I6IFwiLnNsaWRlcyA+IGxpXCIsICAgICAgIC8ve05FV30gU2VsZWN0b3I6IE11c3QgbWF0Y2ggYSBzaW1wbGUgcGF0dGVybi4gJ3tjb250YWluZXJ9ID4ge3NsaWRlfScgLS0gSWdub3JlIHBhdHRlcm4gYXQgeW91ciBvd24gcGVyaWxcbiAgICBhbmltYXRpb246IFwiZmFkZVwiLCAgICAgICAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB5b3VyIGFuaW1hdGlvbiB0eXBlLCBcImZhZGVcIiBvciBcInNsaWRlXCJcbiAgICBlYXNpbmc6IFwic3dpbmdcIiwgICAgICAgICAgICAgICAvL3tORVd9IFN0cmluZzogRGV0ZXJtaW5lcyB0aGUgZWFzaW5nIG1ldGhvZCB1c2VkIGluIGpRdWVyeSB0cmFuc2l0aW9ucy4galF1ZXJ5IGVhc2luZyBwbHVnaW4gaXMgc3VwcG9ydGVkIVxuICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsICAgICAgICAvL1N0cmluZzogU2VsZWN0IHRoZSBzbGlkaW5nIGRpcmVjdGlvbiwgXCJob3Jpem9udGFsXCIgb3IgXCJ2ZXJ0aWNhbFwiXG4gICAgcmV2ZXJzZTogZmFsc2UsICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IFJldmVyc2UgdGhlIGFuaW1hdGlvbiBkaXJlY3Rpb25cbiAgICBhbmltYXRpb25Mb29wOiB0cnVlLCAgICAgICAgICAgICAvL0Jvb2xlYW46IFNob3VsZCB0aGUgYW5pbWF0aW9uIGxvb3A/IElmIGZhbHNlLCBkaXJlY3Rpb25OYXYgd2lsbCByZWNlaXZlZCBcImRpc2FibGVcIiBjbGFzc2VzIGF0IGVpdGhlciBlbmRcbiAgICBzbW9vdGhIZWlnaHQ6IGZhbHNlLCAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogQWxsb3cgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgdG8gYW5pbWF0ZSBzbW9vdGhseSBpbiBob3Jpem9udGFsIG1vZGVcbiAgICBzdGFydEF0OiAwLCAgICAgICAgICAgICAgICAgICAgIC8vSW50ZWdlcjogVGhlIHNsaWRlIHRoYXQgdGhlIHNsaWRlciBzaG91bGQgc3RhcnQgb24uIEFycmF5IG5vdGF0aW9uICgwID0gZmlyc3Qgc2xpZGUpXG4gICAgc2xpZGVzaG93OiB0cnVlLCAgICAgICAgICAgICAgICAvL0Jvb2xlYW46IEFuaW1hdGUgc2xpZGVyIGF1dG9tYXRpY2FsbHlcbiAgICBzbGlkZXNob3dTcGVlZDogNzAwMCwgICAgICAgICAgIC8vSW50ZWdlcjogU2V0IHRoZSBzcGVlZCBvZiB0aGUgc2xpZGVzaG93IGN5Y2xpbmcsIGluIG1pbGxpc2Vjb25kc1xuICAgIGFuaW1hdGlvblNwZWVkOiA2MDAsICAgICAgICAgICAgLy9JbnRlZ2VyOiBTZXQgdGhlIHNwZWVkIG9mIGFuaW1hdGlvbnMsIGluIG1pbGxpc2Vjb25kc1xuICAgIGluaXREZWxheTogMCwgICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBTZXQgYW4gaW5pdGlhbGl6YXRpb24gZGVsYXksIGluIG1pbGxpc2Vjb25kc1xuICAgIHJhbmRvbWl6ZTogZmFsc2UsICAgICAgICAgICAgICAgLy9Cb29sZWFuOiBSYW5kb21pemUgc2xpZGUgb3JkZXJcblxuICAgIC8vIFVzYWJpbGl0eSBmZWF0dXJlc1xuICAgIHBhdXNlT25BY3Rpb246IHRydWUsICAgICAgICAgICAgLy9Cb29sZWFuOiBQYXVzZSB0aGUgc2xpZGVzaG93IHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCBjb250cm9sIGVsZW1lbnRzLCBoaWdobHkgcmVjb21tZW5kZWQuXG4gICAgcGF1c2VPbkhvdmVyOiBmYWxzZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiBob3ZlcmluZyBvdmVyIHNsaWRlciwgdGhlbiByZXN1bWUgd2hlbiBubyBsb25nZXIgaG92ZXJpbmdcbiAgICB1c2VDU1M6IHRydWUsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogU2xpZGVyIHdpbGwgdXNlIENTUzMgdHJhbnNpdGlvbnMgaWYgYXZhaWxhYmxlXG4gICAgdG91Y2g6IHRydWUsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IEFsbG93IHRvdWNoIHN3aXBlIG5hdmlnYXRpb24gb2YgdGhlIHNsaWRlciBvbiB0b3VjaC1lbmFibGVkIGRldmljZXNcbiAgICB2aWRlbzogZmFsc2UsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogSWYgdXNpbmcgdmlkZW8gaW4gdGhlIHNsaWRlciwgd2lsbCBwcmV2ZW50IENTUzMgM0QgVHJhbnNmb3JtcyB0byBhdm9pZCBncmFwaGljYWwgZ2xpdGNoZXNcblxuICAgIC8vIFByaW1hcnkgQ29udHJvbHNcbiAgICBjb250cm9sTmF2OiB0cnVlLCAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQ3JlYXRlIG5hdmlnYXRpb24gZm9yIHBhZ2luZyBjb250cm9sIG9mIGVhY2ggY2xpZGU/IE5vdGU6IExlYXZlIHRydWUgZm9yIG1hbnVhbENvbnRyb2xzIHVzYWdlXG4gICAgZGlyZWN0aW9uTmF2OiB0cnVlLCAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBuYXZpZ2F0aW9uIGZvciBwcmV2aW91cy9uZXh0IG5hdmlnYXRpb24/ICh0cnVlL2ZhbHNlKVxuICAgIHByZXZUZXh0OiBcIlByZXZpb3VzXCIsICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwcmV2aW91c1wiIGRpcmVjdGlvbk5hdiBpdGVtXG4gICAgbmV4dFRleHQ6IFwiTmV4dFwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcIm5leHRcIiBkaXJlY3Rpb25OYXYgaXRlbVxuXG4gICAgLy8gU2Vjb25kYXJ5IE5hdmlnYXRpb25cbiAgICBrZXlib2FyZDogdHJ1ZSwgICAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQWxsb3cgc2xpZGVyIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkIGxlZnQvcmlnaHQga2V5c1xuICAgIG11bHRpcGxlS2V5Ym9hcmQ6IGZhbHNlLCAgICAgICAgLy97TkVXfSBCb29sZWFuOiBBbGxvdyBrZXlib2FyZCBuYXZpZ2F0aW9uIHRvIGFmZmVjdCBtdWx0aXBsZSBzbGlkZXJzLiBEZWZhdWx0IGJlaGF2aW9yIGN1dHMgb3V0IGtleWJvYXJkIG5hdmlnYXRpb24gd2l0aCBtb3JlIHRoYW4gb25lIHNsaWRlciBwcmVzZW50LlxuICAgIG1vdXNld2hlZWw6IGZhbHNlLCAgICAgICAgICAgICAgLy97VVBEQVRFRH0gQm9vbGVhbjogUmVxdWlyZXMganF1ZXJ5Lm1vdXNld2hlZWwuanMgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFuZG9uYWFyb24vanF1ZXJ5LW1vdXNld2hlZWwpIC0gQWxsb3dzIHNsaWRlciBuYXZpZ2F0aW5nIHZpYSBtb3VzZXdoZWVsXG4gICAgcGF1c2VQbGF5OiBmYWxzZSwgICAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBwYXVzZS9wbGF5IGR5bmFtaWMgZWxlbWVudFxuICAgIHBhdXNlVGV4dDogXCJQYXVzZVwiLCAgICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwYXVzZVwiIHBhdXNlUGxheSBpdGVtXG4gICAgcGxheVRleHQ6IFwiUGxheVwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcInBsYXlcIiBwYXVzZVBsYXkgaXRlbVxuXG4gICAgLy8gU3BlY2lhbCBwcm9wZXJ0aWVzXG4gICAgY29udHJvbHNDb250YWluZXI6IFwiXCIsICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgd2hpY2ggY29udGFpbmVyIHRoZSBuYXZpZ2F0aW9uIGVsZW1lbnRzIHNob3VsZCBiZSBhcHBlbmRlZCB0b28uIERlZmF1bHQgY29udGFpbmVyIGlzIHRoZSBGbGV4U2xpZGVyIGVsZW1lbnQuIEV4YW1wbGUgdXNlIHdvdWxkIGJlICQoXCIuZmxleHNsaWRlci1jb250YWluZXJcIikuIFByb3BlcnR5IGlzIGlnbm9yZWQgaWYgZ2l2ZW4gZWxlbWVudCBpcyBub3QgZm91bmQuXG4gICAgbWFudWFsQ29udHJvbHM6IFwiXCIsICAgICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgY3VzdG9tIGNvbnRyb2wgbmF2aWdhdGlvbi4gRXhhbXBsZXMgd291bGQgYmUgJChcIi5mbGV4LWNvbnRyb2wtbmF2IGxpXCIpIG9yIFwiI3RhYnMtbmF2IGxpIGltZ1wiLCBldGMuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4geW91ciBjb250cm9sTmF2IHNob3VsZCBtYXRjaCB0aGUgbnVtYmVyIG9mIHNsaWRlcy90YWJzLlxuICAgIHN5bmM6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAvL3tORVd9IFNlbGVjdG9yOiBNaXJyb3IgdGhlIGFjdGlvbnMgcGVyZm9ybWVkIG9uIHRoaXMgc2xpZGVyIHdpdGggYW5vdGhlciBzbGlkZXIuIFVzZSB3aXRoIGNhcmUuXG4gICAgYXNOYXZGb3I6IFwiXCIsICAgICAgICAgICAgICAgICAgIC8ve05FV30gU2VsZWN0b3I6IEludGVybmFsIHByb3BlcnR5IGV4cG9zZWQgZm9yIHR1cm5pbmcgdGhlIHNsaWRlciBpbnRvIGEgdGh1bWJuYWlsIG5hdmlnYXRpb24gZm9yIGFub3RoZXIgc2xpZGVyXG5cbiAgICAvLyBDYXJvdXNlbCBPcHRpb25zXG4gICAgaXRlbVdpZHRoOiAwLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IEJveC1tb2RlbCB3aWR0aCBvZiBpbmRpdmlkdWFsIGNhcm91c2VsIGl0ZW1zLCBpbmNsdWRpbmcgaG9yaXpvbnRhbCBib3JkZXJzIGFuZCBwYWRkaW5nLlxuICAgIGl0ZW1NYXJnaW46IDAsICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBNYXJnaW4gYmV0d2VlbiBjYXJvdXNlbCBpdGVtcy5cbiAgICBtaW5JdGVtczogMCwgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTWluaW11bSBudW1iZXIgb2YgY2Fyb3VzZWwgaXRlbXMgdGhhdCBzaG91bGQgYmUgdmlzaWJsZS4gSXRlbXMgd2lsbCByZXNpemUgZmx1aWRseSB3aGVuIGJlbG93IHRoaXMuXG4gICAgbWF4SXRlbXM6IDAsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IE1heG1pbXVtIG51bWJlciBvZiBjYXJvdXNlbCBpdGVtcyB0aGF0IHNob3VsZCBiZSB2aXNpYmxlLiBJdGVtcyB3aWxsIHJlc2l6ZSBmbHVpZGx5IHdoZW4gYWJvdmUgdGhpcyBsaW1pdC5cbiAgICBtb3ZlOiAwLCAgICAgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTnVtYmVyIG9mIGNhcm91c2VsIGl0ZW1zIHRoYXQgc2hvdWxkIG1vdmUgb24gYW5pbWF0aW9uLiBJZiAwLCBzbGlkZXIgd2lsbCBtb3ZlIGFsbCB2aXNpYmxlIGl0ZW1zLlxuXG4gICAgLy8gQ2FsbGJhY2sgQVBJXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgd2hlbiB0aGUgc2xpZGVyIGxvYWRzIHRoZSBmaXJzdCBzbGlkZVxuICAgIGJlZm9yZTogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFzeW5jaHJvbm91c2x5IHdpdGggZWFjaCBzbGlkZXIgYW5pbWF0aW9uXG4gICAgYWZ0ZXI6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgZWFjaCBzbGlkZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgIGVuZDogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIHdoZW4gdGhlIHNsaWRlciByZWFjaGVzIHRoZSBsYXN0IHNsaWRlIChhc3luY2hyb25vdXMpXG4gICAgYWRkZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL3tORVd9IENhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgYSBzbGlkZSBpcyBhZGRlZFxuICAgIHJlbW92ZWQ6IGZ1bmN0aW9uKCl7fSAgICAgICAgICAgLy97TkVXfSBDYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFmdGVyIGEgc2xpZGUgaXMgcmVtb3ZlZFxuICB9XG5cblxuICAvL0ZsZXhTbGlkZXI6IFBsdWdpbiBGdW5jdGlvblxuICAkLmZuLmZsZXhzbGlkZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9O1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgc2VsZWN0b3IgPSAob3B0aW9ucy5zZWxlY3RvcikgPyBvcHRpb25zLnNlbGVjdG9yIDogXCIuc2xpZGVzID4gbGlcIixcbiAgICAgICAgICAgICRzbGlkZXMgPSAkdGhpcy5maW5kKHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoJHNsaWRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAkc2xpZGVzLmZhZGVJbig0MDApO1xuICAgICAgICAgIGlmIChvcHRpb25zLnN0YXJ0KSBvcHRpb25zLnN0YXJ0KCR0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICgkdGhpcy5kYXRhKCdmbGV4c2xpZGVyJykgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbmV3ICQuZmxleHNsaWRlcih0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhlbHBlciBzdHJpbmdzIHRvIHF1aWNrbHkgcGVyZm9ybSBmdW5jdGlvbnMgb24gdGhlIHNsaWRlclxuICAgICAgdmFyICRzbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2ZsZXhzbGlkZXInKTtcbiAgICAgIHN3aXRjaCAob3B0aW9ucykge1xuICAgICAgICBjYXNlIFwicGxheVwiOiAkc2xpZGVyLnBsYXkoKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwYXVzZVwiOiAkc2xpZGVyLnBhdXNlKCk7IGJyZWFrO1xuICAgICAgICBjYXNlIFwibmV4dFwiOiAkc2xpZGVyLmZsZXhBbmltYXRlKCRzbGlkZXIuZ2V0VGFyZ2V0KFwibmV4dFwiKSwgdHJ1ZSk7IGJyZWFrO1xuICAgICAgICBjYXNlIFwicHJldlwiOlxuICAgICAgICBjYXNlIFwicHJldmlvdXNcIjogJHNsaWRlci5mbGV4QW5pbWF0ZSgkc2xpZGVyLmdldFRhcmdldChcInByZXZcIiksIHRydWUpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDogaWYgKHR5cGVvZiBvcHRpb25zID09PSBcIm51bWJlclwiKSAkc2xpZGVyLmZsZXhBbmltYXRlKG9wdGlvbnMsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59KShqUXVlcnkpO1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdmVuZG9yL2pxdWVyeS5mbGV4c2xpZGVyLmpzXCIsXCIvdmVuZG9yXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyoqXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgYnVmZmVyYFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IChmdW5jdGlvbiAoKSB7XG4gICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLFxuICAgLy8gRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IGFkZGluZyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXM/IElmXG4gIC8vIG5vdCwgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnQuIFdlIG5lZWQgdG8gYmUgYWJsZSB0b1xuICAvLyBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy5cbiAgLy8gUmVsZXZhbnQgRmlyZWZveCBidWc6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgwKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiZcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59KSgpXG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIgKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybylcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KVxuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nXG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGhcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KVxuICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJylcbiAgICBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZylcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoKSAvLyBBc3N1bWUgb2JqZWN0IGlzIGFuIGFycmF5XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJylcblxuICB2YXIgYnVmXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IGF1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXNcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoXG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWVcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBVaW50OEFycmF5ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBzdWJqZWN0IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIFVpbnQ4QXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KVxuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpXG4gICAgICBlbHNlXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3RbaV1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldFxuICBzdHIgPSBzdHIgKyAnJ1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMlxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDJcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICtcbiAgICAgICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApXG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpXG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlXG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMlxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2UgeyAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZ1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gbGVuZ3RoXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDBcbiAgZW5kID0gKGVuZCAhPT0gdW5kZWZpbmVkKVxuICAgID8gTnVtYmVyKGVuZClcbiAgICA6IGVuZCA9IHNlbGYubGVuZ3RoXG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydClcbiAgICByZXR1cm4gJydcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzXG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDBcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpXG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLFxuICAgICAgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aClcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KVxuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydFxuXG4gIC8vIGNvcHkhXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7IGkrKylcbiAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnXG4gIHZhciB0bXAgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gICAgICB0bXAgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKylcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSsxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKVxuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKVxuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIGF1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKVxuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgM11cbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLFxuICAgICAgICAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEZsb2F0IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZilcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MClcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsXG4gICAgICAgICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWVcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXVxuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pXG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJ1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiAobmV3IEJ1ZmZlcih0aGlzKSkuYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpXG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF1Z21lbnQgdGhlIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuZnVuY3Rpb24gYXVnbWVudCAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldFxuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0XG4gIGFyci5zZXQgPSBCUC5zZXRcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZVxuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9KU09OID0gQlAudG9KU09OXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEVcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRVxuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFXG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50OFxuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFXG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkVcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRVxuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFXG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEVcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRVxuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEVcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFXG4gIGFyci5maWxsID0gQlAuZmlsbFxuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3RcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyXG5cbiAgcmV0dXJuIGFyclxufVxuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAgKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICBpbmRleCA9IH5+aW5kZXg7ICAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIGluZGV4ICs9IGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGNvZXJjZSAobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aClcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuICB9KShzdWJqZWN0KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoIChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fFxuICAgICAgc3ViamVjdCAmJiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYiA8PSAweDdGKVxuICAgICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpXG4gICAgZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpXG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrK1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpKzEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKVxuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpXG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cilcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQgKHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlID49IDAsXG4gICAgICAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG59XG5cbmZ1bmN0aW9uIGFzc2VydCAodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJylcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFyciA9ICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBVaW50OEFycmF5XG4gICAgOiBBcnJheVxuXG5cdHZhciBaRVJPICAgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cblx0ZnVuY3Rpb24gZGVjb2RlIChlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApXG5cdFx0aWYgKGNvZGUgPT09IFBMVVMpXG5cdFx0XHRyZXR1cm4gNjIgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIKVxuXHRcdFx0cmV0dXJuIDYzIC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKVxuXHRcdFx0cmV0dXJuIC0xIC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBVUFBFUlxuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNlxuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkgKGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMFxuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGhcblxuXHRcdHZhciBMID0gMFxuXG5cdFx0ZnVuY3Rpb24gcHVzaCAodikge1xuXHRcdFx0YXJyW0wrK10gPSB2XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2KSB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSlcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNilcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDIpXG5cdFx0XHRwdXNoKCh0bXAgPj4gOCkgJiAweEZGKVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQgKHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0XHRleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMywgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0XHR0ZW1wLCBsZW5ndGhcblxuXHRcdGZ1bmN0aW9uIGVuY29kZSAobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKVxuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApXG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV1cblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz09J1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPj4gNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDIpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9J1xuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0bW9kdWxlLmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjRcbn0oKSlcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qc1wiLFwiLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgbkJpdHMgPSAtNyxcbiAgICAgIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMCxcbiAgICAgIGQgPSBpc0xFID8gLTEgOiAxLFxuICAgICAgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIHMgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgZSA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpO1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYyxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMCksXG4gICAgICBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSksXG4gICAgICBkID0gaXNMRSA/IDEgOiAtMSxcbiAgICAgIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcIixcIi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTRcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIsXCIvLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzXCIpIl19
