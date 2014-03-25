(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Add Google Analytics tracking code
 */
(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
	m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

/**
 * Set up GA account and log pageview
 */
ga('create', 'UA-XXXX-Y');
ga('send', 'pageview');

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

/**
 * Event Handlers
 */
$(document).on('click', '[data-track-event]', trackEvent);

/**
 * Public API
 */
module.exports = {
	trackEvent: trackEvent
};
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/analytics.js","/")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Require Modules
 */
var bootstrap = require('./vendor/bootstrap.js'),
	util = require('./util.js'),
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
	util.domReady();
	social.domReady();
	ui.domReady();
	responsive.domReady();
});

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_4f5f4052.js","/")
},{"./analytics.js":1,"./responsive.js":3,"./social.js":4,"./ui.js":5,"./util.js":6,"./vendor/bootstrap.js":7,"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Required Modules
 */
var enquire = require('./vendor/enquire.js');

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
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/responsive.js","/")
},{"./vendor/enquire.js":8,"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],4:[function(require,module,exports){
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

/**
 * Event Handlers
 */
$('.facebook-share').on('click', function(e) {
	e.preventDefault();
	fbShare(this);
});

$('.twitter-share').on('click', function(e) {
	var href = twitterShare(this);
	$(this).attr('href', href);
	return true;
});

////////////////
// Public API //
////////////////

module.exports = {
	domReady: function() {
		fbInit();
	},
	fbShare: fbShare,
	twitterShare: twitterShare
};
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/social.js","/")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Required Modules
 */
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


/**
 * Data to export when module is included and referenced elsewhere
 * @type {Object}
 */
module.exports = {
	domReady: function() {
		lightboxInit();
		sliderInit();
	}
};
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/ui.js","/")
},{"./vendor/jquery.colorbox.js":9,"./vendor/jquery.flexslider.js":10,"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * Helper data
 */
var urls = (typeof urls === "undefined") ? {} : urls;
var user = {
	mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false,
	lte8: $('html').hasClass('lte8') ? true : false
};

/**
 * Media query hack for the surely unhappy Windows Phone 8 users
 */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style')
	msViewportStyle.appendChild( document.createTextNode( '@-ms-viewport{width:auto!important}' ) );
	document.querySelector('head').appendChild(msViewportStyle)
}

/**
 * Select menu hack for Android 4.1 stock browsers
 */
var nua = navigator.userAgent
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
if (isAndroid) {
	$('select.form-control').removeClass('form-control').css('width', '100%')
}

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

/**
 * Public API
 */

module.exports = {
	domReady: function() {
		consoleFallback();
	},
	urls: urls,
	user: user,
	debug: debug
};
}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util.js","/")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/vendor/bootstrap.js","/vendor")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],8:[function(require,module,exports){
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
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/vendor/jquery.colorbox.js","/vendor")
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],10:[function(require,module,exports){
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
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],11:[function(require,module,exports){
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
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"base64-js":12,"buffer":11,"ieee754":13}],12:[function(require,module,exports){
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
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],13:[function(require,module,exports){
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
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}],14:[function(require,module,exports){
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
},{"/Users/joshua.lawrence/Sites/frameworks/wordpress/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":14,"buffer":11}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL2FuYWx5dGljcy5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL2Zha2VfNGY1ZjQwNTIuanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL2FwcC93cC1jb250ZW50L3RoZW1lcy90cnktdGhlbWUvc2NyaXB0cy9yZXNwb25zaXZlLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvc29jaWFsLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvdWkuanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL2FwcC93cC1jb250ZW50L3RoZW1lcy90cnktdGhlbWUvc2NyaXB0cy91dGlsLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvdmVuZG9yL2Jvb3RzdHJhcC5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL3ZlbmRvci9lbnF1aXJlLmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9hcHAvd3AtY29udGVudC90aGVtZXMvdHJ5LXRoZW1lL3NjcmlwdHMvdmVuZG9yL2pxdWVyeS5jb2xvcmJveC5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3MvYXBwL3dwLWNvbnRlbnQvdGhlbWVzL3RyeS10aGVtZS9zY3JpcHRzL3ZlbmRvci9qcXVlcnkuZmxleHNsaWRlci5qcyIsIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDajZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25rQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3o0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKipcbiAqIEFkZCBHb29nbGUgQW5hbHl0aWNzIHRyYWNraW5nIGNvZGVcbiAqL1xuKGZ1bmN0aW9uKGksIHMsIG8sIGcsIHIsIGEsIG0pIHtcblx0aVsnR29vZ2xlQW5hbHl0aWNzT2JqZWN0J10gPSByO1xuXHRpW3JdID0gaVtyXSB8fCBmdW5jdGlvbigpIHtcblx0XHQoaVtyXS5xID0gaVtyXS5xIHx8IFtdKS5wdXNoKGFyZ3VtZW50cylcblx0fSwgaVtyXS5sID0gMSAqIG5ldyBEYXRlKCk7XG5cdGEgPSBzLmNyZWF0ZUVsZW1lbnQobyksXG5cdG0gPSBzLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO1xuXHRhLmFzeW5jID0gMTtcblx0YS5zcmMgPSBnO1xuXHRtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsIG0pXG59KSh3aW5kb3csIGRvY3VtZW50LCAnc2NyaXB0JywgJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsICdnYScpO1xuXG4vKipcbiAqIFNldCB1cCBHQSBhY2NvdW50IGFuZCBsb2cgcGFnZXZpZXdcbiAqL1xuZ2EoJ2NyZWF0ZScsICdVQS1YWFhYLVknKTtcbmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG5cbi8qKlxuICogTG9ncyBhbiBldmVudCB0byBHb29nbGUgQW5hbHl0aWNzIHVzaW5nIHRoZSBlbGVtZW50J3MgZGF0YSBhdHRyaWJ1dGVzLlxuICogQWRhcHRlZCBmcm9tIEJlbiBQbHVtJ3MgU2NvdXQgcGx1Z2luOiBodHRwczovL2dpdGh1Yi5jb20vYmVucGx1bS9TY291dFxuICogQHBhcmFtICB7b2JqZWN0fSBlIFRoZSBldmVudCB0aGF0IGZpcmVkIHRoZSBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbH0gICB0cnVlXG4gKi9cbnZhciB0cmFja0V2ZW50ID0gZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciAkZWwgPSAkKHRoaXMpLFxuXHRcdHVybCA9ICRlbC5hdHRyKFwiaHJlZlwiKSxcblx0XHRkYXRhID0gJGVsLmRhdGEoXCJ0cmFjay1ldmVudFwiKS5zcGxpdChcIixcIik7XG5cblx0Ly8gVHJpbSB3aGl0ZXNwYWNlIGZyb20gZGF0YVxuXHRmb3IgKHZhciBpIGluIGRhdGEpIHtcblx0XHRkYXRhW2ldID0gJC50cmltKGRhdGFbaV0pO1xuXHR9XG5cblx0Ly8gUHVzaCBkYXRhOiBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVcblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCBkYXRhWzBdLCBkYXRhWzFdLCAodXJsIHx8IGRhdGFbMl0pLCBkYXRhWzNdICk7XG5cblx0Ly8gSWYgYWN0aXZlIGxpbmssIGxhdW5jaCBpdCFcblx0aWYgKHVybCkge1xuXHRcdC8vIERlbGF5IGJhc2VkIG9uIEdvb2dsZSdzIG91dGJvdW5kIGxpbmsgaGFuZGxlcjpcblx0XHQvLyBodHRwOi8vc3VwcG9ydC5nb29nbGUuY29tL2FuYWx5dGljcy9iaW4vYW5zd2VyLnB5P2hsPWVuJmFuc3dlcj0xMTM2OTIwXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdC8vIENoZWNrIHdpbmRvdyB0YXJnZXRcblx0XHRcdGlmICgkZWwuYXR0cihcInRhcmdldFwiKSkge1xuXHRcdFx0XHR3aW5kb3cub3Blbih1cmwsICRlbC5hdHRyKFwidGFyZ2V0XCIpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG5cdFx0XHR9XG5cdFx0fSwgMTAwKTtcblx0fVxufTtcblxuLyoqXG4gKiBFdmVudCBIYW5kbGVyc1xuICovXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdHJhY2stZXZlbnRdJywgdHJhY2tFdmVudCk7XG5cbi8qKlxuICogUHVibGljIEFQSVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0dHJhY2tFdmVudDogdHJhY2tFdmVudFxufTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2FuYWx5dGljcy5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogUmVxdWlyZSBNb2R1bGVzXG4gKi9cbnZhciBib290c3RyYXAgPSByZXF1aXJlKCcuL3ZlbmRvci9ib290c3RyYXAuanMnKSxcblx0dXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpLFxuXHRhbmFseXRpY3MgPSByZXF1aXJlKCcuL2FuYWx5dGljcy5qcycpLFxuXHRzb2NpYWwgPSByZXF1aXJlKCcuL3NvY2lhbC5qcycpLFxuXHR1aSA9IHJlcXVpcmUoJy4vdWkuanMnKSxcblx0cmVzcG9uc2l2ZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2l2ZS5qcycpO1xuXG4vKipcbiAqIENvbmRpdGlvbmFsbHkgbG9hZCBwb2x5ZmlsbHMgYXMgbmVlZGVkXG4gKi9cbk1vZGVybml6ci5sb2FkKFt7XG5cdHRlc3Q6IHV0aWwudXNlci5sdGU4LFxuXHR5ZXA6IHV0aWwudXJscy50aGVtZSArICcvc2NyaXB0cy92ZW5kb3Ivc2VsZWN0aXZpenIuanMnXG59XSk7XG5cbi8qKlxuICogV2hlbiB0aGUgRE9NJ3MgcmVhZHksIGluaXRpYWxpemUgdGhlIGFwcFxuICovXG4kKGZ1bmN0aW9uICgpIHtcblx0dXRpbC5kb21SZWFkeSgpO1xuXHRzb2NpYWwuZG9tUmVhZHkoKTtcblx0dWkuZG9tUmVhZHkoKTtcblx0cmVzcG9uc2l2ZS5kb21SZWFkeSgpO1xufSk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2Zha2VfNGY1ZjQwNTIuanNcIixcIi9cIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKipcbiAqIFJlcXVpcmVkIE1vZHVsZXNcbiAqL1xudmFyIGVucXVpcmUgPSByZXF1aXJlKCcuL3ZlbmRvci9lbnF1aXJlLmpzJyk7XG5cbi8qKlxuICogTW9uaXRvcnMgd2luZG93IHNpemUgZm9yIGJyZWFrcG9pbnRzXG4gKi9cbnZhciBtb25pdG9yQnJlYWtwb2ludHMgPSBmdW5jdGlvbiAoKSB7XG5cdGVucXVpcmUuXG5cdFx0cmVnaXN0ZXIoXCJzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KVwiLCB7IC8vIE1vYmlsZTogQWxsXG5cdFx0XHRkZWZlclNldHVwOiB0cnVlLFxuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge30sXG5cdFx0XHRtYXRjaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdtb2JpbGU6IGFsbCcpO1xuXHRcdFx0fSxcblx0XHRcdHVubWF0Y2g6IGZ1bmN0aW9uKCkge31cblx0XHR9KS5cblx0XHRyZWdpc3RlcihcInNjcmVlbiBhbmQgKG1heC13aWR0aDogNDc5cHgpXCIsIHsgLy8gTW9iaWxlOiBQb3J0cmFpdFxuXHRcdFx0ZGVmZXJTZXR1cDogdHJ1ZSxcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHt9LFxuXHRcdFx0bWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnbW9iaWxlOiBwb3J0cmFpdCcpO1xuXHRcdFx0fSxcblx0XHRcdHVubWF0Y2g6IGZ1bmN0aW9uKCkge31cblx0XHR9KS5cblx0XHRyZWdpc3RlcihcInNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDgwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweClcIiwgeyAvLyBNb2JpbGU6IExhbmRzY2FwZVxuXHRcdFx0ZGVmZXJTZXR1cDogdHJ1ZSxcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHt9LFxuXHRcdFx0bWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnbW9iaWxlOiBsYW5kc2NhcGUnKTtcblx0XHRcdH0sXG5cdFx0XHR1bm1hdGNoOiBmdW5jdGlvbigpIHt9XG5cdFx0fSkuXG5cdFx0cmVnaXN0ZXIoXCJzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyM3B4KVwiLCB7IC8vIFRhYmxldDogUG9ydHJhaXRcblx0XHRcdGRlZmVyU2V0dXA6IHRydWUsXG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7fSxcblx0XHRcdG1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3RhYmxldDogcG9ydHJhaXQnKTtcblx0XHRcdH0sXG5cdFx0XHR1bm1hdGNoOiBmdW5jdGlvbigpIHt9XG5cdFx0fSkuXG5cdFx0cmVnaXN0ZXIoXCJzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkgYW5kIChtYXgtd2lkdGg6IDEyNzlweClcIiwgeyAvLyBEZXNrdG9wOiBTdGFuZGFyZFxuXHRcdFx0ZGVmZXJTZXR1cDogdHJ1ZSxcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHt9LFxuXHRcdFx0bWF0Y2g6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZGVza3RvcDogMTAyNHB4Jyk7XG5cdFx0XHR9LFxuXHRcdFx0dW5tYXRjaDogZnVuY3Rpb24oKSB7fVxuXHRcdH0pLlxuXHRcdHJlZ2lzdGVyKFwic2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMjgwcHgpXCIsIHsgLy8gRGVza3RvcDogV2lkZSBmb3JtYXRcblx0XHRcdGRlZmVyU2V0dXA6IHRydWUsXG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7fSxcblx0XHRcdG1hdGNoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3dpZGUgZm9ybWF0OiAxMjgwcHgnKTtcblx0XHRcdH0sXG5cdFx0XHR1bm1hdGNoOiBmdW5jdGlvbigpIHt9XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFB1YmxpYyBBUElcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGRvbVJlYWR5OiBtb25pdG9yQnJlYWtwb2ludHNcbn07XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yZXNwb25zaXZlLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyoqXG4gKiBBZGRzIHRoZSBGYWNlYm9vayBKYXZhU2NyaXB0IFNESyBhbmQgaW5pdGlhbGl6ZXMgdGhlIEZhY2Vib29rIGFwcFxuICogQHJldHVybiB7dHJ1ZX1cbiAqL1xudmFyIGZiSW5pdCA9IGZ1bmN0aW9uKCkge1xuXHQkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwiZmItcm9vdFwiPjwvZGl2PicpO1xuXG5cdC8vIEFzeW5jaHJvbm91c2x5IGxvYWQgZmIganNzZGtcblx0dmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0ZS5hc3luYyA9IHRydWU7XG5cdGUuc3JjID0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgKyAnLy9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9hbGwuanMnO1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmItcm9vdCcpLmFwcGVuZENoaWxkKGUpO1xuXG5cdC8vIEluaXRpYWxpemUgRmFjZWJvb2sgYXBwXG5cdGZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0RkIuaW5pdCh7XG5cdFx0XHRhcHBJZDogJycsIC8vIEFwcCBJRCBmcm9tIHRoZSBBcHAgRGFzaGJvYXJkXG5cdFx0XHRzdGF0dXM6IGZhbHNlLCAvLyBjaGVjayB0aGUgbG9naW4gc3RhdHVzIHVwb24gaW5pdD9cblx0XHRcdGNvb2tpZTogdHJ1ZSwgLy8gc2V0IHNlc3Npb25zIGNvb2tpZXMgdG8gYWxsb3cgeW91ciBzZXJ2ZXIgdG8gYWNjZXNzIHRoZSBzZXNzaW9uP1xuXHRcdFx0eGZibWw6IHRydWUgLy8gcGFyc2UgWEZCTUwgdGFncyBvbiB0aGlzIHBhZ2U/XG5cdFx0fSk7XG5cblx0XHQvL0ZCLkNhbnZhcy5zZXRBdXRvR3JvdygpO1xuXHRcdC8vRkIuQ2FudmFzLnNjcm9sbFRvKDAsIDApO1xuXHR9O1xuXG5cdHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBQb3BzIGEgRmFjZWJvb2sgJ3NoYXJlIHRvIHdhbGwnIGRpYWxvZyB1c2luZyB0aGUgZWxlbWVudCdzIGRhdGEgYXR0cmlidXRlc1xuICogQHBhcmFtICB7b2JqZWN0fSBlbCBUaGUgdGFyZ2V0IG9mIHRoZSBldmVudFxuICogQHJldHVybiB7dHJ1ZX1cbiAqL1xudmFyIGZiU2hhcmUgPSBmdW5jdGlvbihlbCkge1xuXHR2YXIgJGVsID0gJChlbCksXG5cdFx0bmFtZSA9ICRlbC5kYXRhKCduYW1lJykgfHwgJycsXG5cdFx0ZGVzY3JpcHRpb24gPSAkZWwuZGF0YSgnZGVzY3JpcHRpb24nKSB8fCAnJyxcblx0XHRsaW5rID0gJGVsLmRhdGEoJ2xpbmsnKSB8fCAnJyxcblx0XHRjYXB0aW9uID0gJGVsLmRhdGEoJ2NhcHRpb24nKSB8fCAnJztcblxuXHQvLyBPcGVuIEZhY2Vib29rIHNoYXJlIGRpYWxvZ1xuXHRGQi51aSh7XG5cdFx0bWV0aG9kOiAnZmVlZCcsXG5cdFx0bmFtZTogbmFtZSxcblx0XHRsaW5rOiBsaW5rLFxuXHRcdHBpY3R1cmU6IHVybHMudGhlbWUgKyAnL2ltYWdlcy9mYi1zaGFyZS5qcGcnLFxuXHRcdGNhcHRpb246IGNhcHRpb24sXG5cdFx0ZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uXG5cdH0pO1xuXG5cdC8vIFRyYWNrIEZhY2Vib29rIHNoYXJlIGJ1dHRvbiBjbGlja1xuXHRnYSgnc2VuZCcsICdldmVudCcsICdGYWNlYm9vayBTaGFyZScsICdjbGljaycpO1xuXG5cdHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBQb3BzIGEgVHdlZXQgZGlhbG9nIGJveCB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIGEgYnV0dG9uJ3MgZGF0YSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsIFRoZSB0YXJnZXQgb2YgdGhlIGV2ZW50XG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgIFRoZSB0d2l0dGVyIHVybCBuZWVkZWQgdG8gcG9wIHRoZSBkaWFsb2cgd2l0aCB0aGUgY29ycmVjdCBpbmZvXG4gKi9cbnZhciB0d2l0dGVyU2hhcmUgPSBmdW5jdGlvbihlbCkge1xuXHR2YXIgJGVsID0gJChlbCksXG5cdFx0dXJsID0gJGVsLmRhdGEoJ3VybCcpIHx8IHMudXJscy5iYXNlLFxuXHRcdHRleHQgPSAkZWwuZGF0YSgndGV4dCcpIHx8ICcnLFxuXHRcdGhhc2h0YWdzID0gJGVsLmRhdGEoJ2hhc2h0YWdzJykgfHwgJycsXG5cdFx0dHdlZXR1cmwgPSAnaHR0cDovL3R3aXR0ZXIuY29tL3NoYXJlP3VybD0nICsgZW5jb2RlVVJJKHVybCkgKyAnJnRleHQ9JyArIHRleHQgKyAnJmhhc2h0YWdzPScgKyBoYXNodGFncztcblxuXHQvLyBUcmFjayB0d2VldCBidXR0b24gY2xpY2tcblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCAnVHdpdHRlciBTaGFyZScsICdjbGljaycpO1xuXG5cdHJldHVybiB0d2VldHVybDtcbn07XG5cbi8qKlxuICogRXZlbnQgSGFuZGxlcnNcbiAqL1xuJCgnLmZhY2Vib29rLXNoYXJlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdGZiU2hhcmUodGhpcyk7XG59KTtcblxuJCgnLnR3aXR0ZXItc2hhcmUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdHZhciBocmVmID0gdHdpdHRlclNoYXJlKHRoaXMpO1xuXHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBocmVmKTtcblx0cmV0dXJuIHRydWU7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vL1xuLy8gUHVibGljIEFQSSAvL1xuLy8vLy8vLy8vLy8vLy8vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZG9tUmVhZHk6IGZ1bmN0aW9uKCkge1xuXHRcdGZiSW5pdCgpO1xuXHR9LFxuXHRmYlNoYXJlOiBmYlNoYXJlLFxuXHR0d2l0dGVyU2hhcmU6IHR3aXR0ZXJTaGFyZVxufTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3NvY2lhbC5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogUmVxdWlyZWQgTW9kdWxlc1xuICovXG52YXIgZmxleHNsaWRlciA9IHJlcXVpcmUoJy4vdmVuZG9yL2pxdWVyeS5mbGV4c2xpZGVyLmpzJyksXG5cdGNvbG9yYm94ID0gcmVxdWlyZSgnLi92ZW5kb3IvanF1ZXJ5LmNvbG9yYm94LmpzJyk7XG5cbnZhciBmZWF0dXJlZFNsaWRlcjtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgbGlnaHRib3hlc1xuICovXG52YXIgbGlnaHRib3hJbml0ID0gZnVuY3Rpb24oKSB7XG5cdCQoJy5jb2xvcmJveCcpLmNvbG9yYm94KCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFsbCBzbGlkZXJzXG4gKi9cbnZhciBzbGlkZXJJbml0ID0gZnVuY3Rpb24gKCkge1xuXHQkKCcuZmxleHNsaWRlcicpLmZsZXhzbGlkZXIoe1xuXHRcdGFuaW1hdGlvbjogXCJzbGlkZVwiLFxuXHRcdHBhdXNlT25Ib3ZlcjogdHJ1ZSxcblx0XHRjb250cm9sc0NvbnRhaW5lcjogXCIuZmxleHNsaWRlci1jb250YWluZXJcIixcblx0XHRzdGFydDogZnVuY3Rpb24gKHNsaWRlcikge1xuXHRcdFx0ZmVhdHVyZWRTbGlkZXIgPSBzbGlkZXI7XG5cdFx0fVxuXHR9KTtcbn07XG5cblxuLyoqXG4gKiBEYXRhIHRvIGV4cG9ydCB3aGVuIG1vZHVsZSBpcyBpbmNsdWRlZCBhbmQgcmVmZXJlbmNlZCBlbHNld2hlcmVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkb21SZWFkeTogZnVuY3Rpb24oKSB7XG5cdFx0bGlnaHRib3hJbml0KCk7XG5cdFx0c2xpZGVySW5pdCgpO1xuXHR9XG59O1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdWkuanNcIixcIi9cIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKipcbiAqIEhlbHBlciBkYXRhXG4gKi9cbnZhciB1cmxzID0gKHR5cGVvZiB1cmxzID09PSBcInVuZGVmaW5lZFwiKSA/IHt9IDogdXJscztcbnZhciB1c2VyID0ge1xuXHRtb2JpbGU6IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyB0cnVlIDogZmFsc2UsXG5cdGx0ZTg6ICQoJ2h0bWwnKS5oYXNDbGFzcygnbHRlOCcpID8gdHJ1ZSA6IGZhbHNlXG59O1xuXG4vKipcbiAqIE1lZGlhIHF1ZXJ5IGhhY2sgZm9yIHRoZSBzdXJlbHkgdW5oYXBweSBXaW5kb3dzIFBob25lIDggdXNlcnNcbiAqL1xuaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0lFTW9iaWxlXFwvMTBcXC4wLykpIHtcblx0dmFyIG1zVmlld3BvcnRTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblx0bXNWaWV3cG9ydFN0eWxlLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSggJ0AtbXMtdmlld3BvcnR7d2lkdGg6YXV0byFpbXBvcnRhbnR9JyApICk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5hcHBlbmRDaGlsZChtc1ZpZXdwb3J0U3R5bGUpXG59XG5cbi8qKlxuICogU2VsZWN0IG1lbnUgaGFjayBmb3IgQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlcnNcbiAqL1xudmFyIG51YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbnZhciBpc0FuZHJvaWQgPSAobnVhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiBudWEuaW5kZXhPZignQW5kcm9pZCAnKSA+IC0xICYmIG51YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgbnVhLmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSlcbmlmIChpc0FuZHJvaWQpIHtcblx0JCgnc2VsZWN0LmZvcm0tY29udHJvbCcpLnJlbW92ZUNsYXNzKCdmb3JtLWNvbnRyb2wnKS5jc3MoJ3dpZHRoJywgJzEwMCUnKVxufVxuXG4vKipcbiAqIEF2b2lkIGBjb25zb2xlYCBlcnJvcnMgaW4gYnJvd3NlcnMgdGhhdCBsYWNrIGEgY29uc29sZS5cbiAqIEByZXR1cm4ge2Jvb2x9IFtkZXNjcmlwdGlvbl1cbiAqL1xudmFyIGNvbnNvbGVGYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgbWV0aG9kO1xuXHR2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cdHZhciBtZXRob2RzID0gW1xuXHRcdCdhc3NlcnQnLCAnY2xlYXInLCAnY291bnQnLCAnZGVidWcnLCAnZGlyJywgJ2RpcnhtbCcsICdlcnJvcicsXG5cdFx0J2V4Y2VwdGlvbicsICdncm91cCcsICdncm91cENvbGxhcHNlZCcsICdncm91cEVuZCcsICdpbmZvJywgJ2xvZycsXG5cdFx0J21hcmtUaW1lbGluZScsICdwcm9maWxlJywgJ3Byb2ZpbGVFbmQnLCAndGFibGUnLCAndGltZScsICd0aW1lRW5kJyxcblx0XHQndGltZVN0YW1wJywgJ3RyYWNlJywgJ3dhcm4nXG5cdF07XG5cdHZhciBsZW5ndGggPSBtZXRob2RzLmxlbmd0aDtcblx0dmFyIGNvbnNvbGUgPSAod2luZG93LmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fSk7XG5cblx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0bWV0aG9kID0gbWV0aG9kc1tsZW5ndGhdO1xuXG5cdFx0Ly8gT25seSBzdHViIHVuZGVmaW5lZCBtZXRob2RzLlxuXHRcdGlmICghY29uc29sZVttZXRob2RdKSB7XG5cdFx0XHRjb25zb2xlW21ldGhvZF0gPSBub29wO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBCYXNpYyBkZWJ1ZyB0aGF0IHdyaXRlcyB0byB0aGUgY29uc29sZVxuICogQHBhcmFtICB7YXJyYXl9IGFyciAgIEFycmF5IHRvIGJlIGRlYnVnZ2VkXG4gKiBAcGFyYW0gIHtudW19ICAgbGV2ZWwgTnVtYmVyIG9mIGxldmVscyBkZWVwIHRvIHRyYXZlcnNlXG4gKi9cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKGFycixsZXZlbCkge1xuXHR2YXIgZHVtcGVkX3RleHQgPSBcIlwiO1xuXHRpZighbGV2ZWwpIGxldmVsID0gMDtcblxuXHQvL1RoZSBwYWRkaW5nIGdpdmVuIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpbmUuXG5cdHZhciBsZXZlbF9wYWRkaW5nID0gXCJcIjtcblx0Zm9yKHZhciBqPTA7ajxsZXZlbCsxO2orKykgbGV2ZWxfcGFkZGluZyArPSBcIiAgICBcIjtcblxuXHRpZih0eXBlb2YoYXJyKSA9PSAnb2JqZWN0JykgeyAvL0FycmF5L0hhc2hlcy9PYmplY3RzXG5cdFx0Zm9yKHZhciBpdGVtIGluIGFycikge1xuXHRcdFx0dmFyIHZhbHVlID0gYXJyW2l0ZW1dO1xuXG5cdFx0XHRpZih0eXBlb2YodmFsdWUpID09ICdvYmplY3QnKSB7IC8vSWYgaXQgaXMgYW4gYXJyYXksXG5cdFx0XHRcdGR1bXBlZF90ZXh0ICs9IGxldmVsX3BhZGRpbmcgKyBcIidcIiArIGl0ZW0gKyBcIicgLi4uXFxuXCI7XG5cdFx0XHRcdGR1bXBlZF90ZXh0ICs9IGRlYnVnKHZhbHVlLGxldmVsKzEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZHVtcGVkX3RleHQgKz0gbGV2ZWxfcGFkZGluZyArIFwiJ1wiICsgaXRlbSArIFwiJyA9PiBcXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlxcblwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy9TdGluZ3MvQ2hhcnMvTnVtYmVycyBldGMuXG5cdFx0ZHVtcGVkX3RleHQgPSBcIj09PT5cIithcnIrXCI8PT09KFwiK3R5cGVvZihhcnIpK1wiKVwiO1xuXHR9XG5cblx0Y29uc29sZS5sb2coIGR1bXBlZF90ZXh0ICk7XG5cblx0cmV0dXJuIGR1bXBlZF90ZXh0O1xufTtcblxuLyoqXG4gKiBQdWJsaWMgQVBJXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGRvbVJlYWR5OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlRmFsbGJhY2soKTtcblx0fSxcblx0dXJsczogdXJscyxcblx0dXNlcjogdXNlcixcblx0ZGVidWc6IGRlYnVnXG59O1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdXRpbC5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQm9vdHN0cmFwIHYzLjEuMSAoaHR0cDovL2dldGJvb3RzdHJhcC5jb20pXG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKi9cblxuaWYgKHR5cGVvZiBqUXVlcnkgPT09ICd1bmRlZmluZWQnKSB7IHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeScpIH1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRyYW5zaXRpb24uanMgdjMuMS4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0cmFuc2l0aW9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENTUyBUUkFOU0lUSU9OIFNVUFBPUlQgKFNob3V0b3V0OiBodHRwOi8vd3d3Lm1vZGVybml6ci5jb20vKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpXG5cbiAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgJ01velRyYW5zaXRpb24nICAgIDogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJyAgICAgIDogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICd0cmFuc2l0aW9uJyAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH1cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyBlbmQ6IHRyYW5zRW5kRXZlbnROYW1lc1tuYW1lXSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlIC8vIGV4cGxpY2l0IGZvciBpZTggKCAgLl8uKVxuICB9XG5cbiAgLy8gaHR0cDovL2Jsb2cuYWxleG1hY2Nhdy5jb20vY3NzLXRyYW5zaXRpb25zXG4gICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2UsICRlbCA9IHRoaXNcbiAgICAkKHRoaXMpLm9uZSgkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsIGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZSB9KVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgaWYgKCFjYWxsZWQpICQoJGVsKS50cmlnZ2VyKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCkgfVxuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIGR1cmF0aW9uKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25FbmQoKVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhbGVydC5qcyB2My4xLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FsZXJ0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFMRVJUIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBkaXNtaXNzID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgdmFyIEFsZXJ0ICAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAkKGVsKS5vbignY2xpY2snLCBkaXNtaXNzLCB0aGlzLmNsb3NlKVxuICB9XG5cbiAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9ICQoc2VsZWN0b3IpXG5cbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAkcGFyZW50ID0gJHRoaXMuaGFzQ2xhc3MoJ2FsZXJ0JykgPyAkdGhpcyA6ICR0aGlzLnBhcmVudCgpXG4gICAgfVxuXG4gICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdjbG9zZS5icy5hbGVydCcpKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgICRwYXJlbnQudHJpZ2dlcignY2xvc2VkLmJzLmFsZXJ0JykucmVtb3ZlKClcbiAgICB9XG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkcGFyZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHBhcmVudFxuICAgICAgICAub25lKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCwgcmVtb3ZlRWxlbWVudClcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDE1MCkgOlxuICAgICAgcmVtb3ZlRWxlbWVudCgpXG4gIH1cblxuXG4gIC8vIEFMRVJUIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4uYWxlcnRcblxuICAkLmZuLmFsZXJ0ID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuYWxlcnQnKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFsZXJ0JywgKGRhdGEgPSBuZXcgQWxlcnQodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLmFsZXJ0LkNvbnN0cnVjdG9yID0gQWxlcnRcblxuXG4gIC8vIEFMRVJUIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hbGVydC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWxlcnQgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBTEVSVCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5hbGVydC5kYXRhLWFwaScsIGRpc21pc3MsIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYnV0dG9uLmpzIHYzLjEuMVxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYnV0dG9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEJVVFRPTiBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQnV0dG9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9ICQuZXh0ZW5kKHt9LCBCdXR0b24uREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgQnV0dG9uLkRFRkFVTFRTID0ge1xuICAgIGxvYWRpbmdUZXh0OiAnbG9hZGluZy4uLidcbiAgfVxuXG4gIEJ1dHRvbi5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICB2YXIgZCAgICA9ICdkaXNhYmxlZCdcbiAgICB2YXIgJGVsICA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgdmFsICA9ICRlbC5pcygnaW5wdXQnKSA/ICd2YWwnIDogJ2h0bWwnXG4gICAgdmFyIGRhdGEgPSAkZWwuZGF0YSgpXG5cbiAgICBzdGF0ZSA9IHN0YXRlICsgJ1RleHQnXG5cbiAgICBpZiAoIWRhdGEucmVzZXRUZXh0KSAkZWwuZGF0YSgncmVzZXRUZXh0JywgJGVsW3ZhbF0oKSlcblxuICAgICRlbFt2YWxdKGRhdGFbc3RhdGVdIHx8IHRoaXMub3B0aW9uc1tzdGF0ZV0pXG5cbiAgICAvLyBwdXNoIHRvIGV2ZW50IGxvb3AgdG8gYWxsb3cgZm9ybXMgdG8gc3VibWl0XG4gICAgc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzdGF0ZSA9PSAnbG9hZGluZ1RleHQnKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAkZWwuYWRkQ2xhc3MoZCkuYXR0cihkLCBkKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhkKS5yZW1vdmVBdHRyKGQpXG4gICAgICB9XG4gICAgfSwgdGhpcyksIDApXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hhbmdlZCA9IHRydWVcbiAgICB2YXIgJHBhcmVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScpXG5cbiAgICBpZiAoJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgIHZhciAkaW5wdXQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2lucHV0JylcbiAgICAgIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdyYWRpbycpIHtcbiAgICAgICAgaWYgKCRpbnB1dC5wcm9wKCdjaGVja2VkJykgJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICBlbHNlICRwYXJlbnQuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWQpICRpbnB1dC5wcm9wKCdjaGVja2VkJywgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKS50cmlnZ2VyKCdjaGFuZ2UnKVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VkKSB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICB9XG5cblxuICAvLyBCVVRUT04gUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4uYnV0dG9uXG5cbiAgJC5mbi5idXR0b24gPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYnV0dG9uJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5idXR0b24nLCAoZGF0YSA9IG5ldyBCdXR0b24odGhpcywgb3B0aW9ucykpKVxuXG4gICAgICBpZiAob3B0aW9uID09ICd0b2dnbGUnKSBkYXRhLnRvZ2dsZSgpXG4gICAgICBlbHNlIGlmIChvcHRpb24pIGRhdGEuc2V0U3RhdGUob3B0aW9uKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLmJ1dHRvbi5Db25zdHJ1Y3RvciA9IEJ1dHRvblxuXG5cbiAgLy8gQlVUVE9OIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYnV0dG9uLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5idXR0b24gPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBCVVRUT04gREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLmJ1dHRvbi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGVePWJ1dHRvbl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkYnRuID0gJChlLnRhcmdldClcbiAgICBpZiAoISRidG4uaGFzQ2xhc3MoJ2J0bicpKSAkYnRuID0gJGJ0bi5jbG9zZXN0KCcuYnRuJylcbiAgICAkYnRuLmJ1dHRvbigndG9nZ2xlJylcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY2Fyb3VzZWwuanMgdjMuMS4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNjYXJvdXNlbFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENBUk9VU0VMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBDYXJvdXNlbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLiRpbmRpY2F0b3JzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuY2Fyb3VzZWwtaW5kaWNhdG9ycycpXG4gICAgdGhpcy5vcHRpb25zICAgICA9IG9wdGlvbnNcbiAgICB0aGlzLnBhdXNlZCAgICAgID1cbiAgICB0aGlzLnNsaWRpbmcgICAgID1cbiAgICB0aGlzLmludGVydmFsICAgID1cbiAgICB0aGlzLiRhY3RpdmUgICAgID1cbiAgICB0aGlzLiRpdGVtcyAgICAgID0gbnVsbFxuXG4gICAgdGhpcy5vcHRpb25zLnBhdXNlID09ICdob3ZlcicgJiYgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uKCdtb3VzZWVudGVyJywgJC5wcm94eSh0aGlzLnBhdXNlLCB0aGlzKSlcbiAgICAgIC5vbignbW91c2VsZWF2ZScsICQucHJveHkodGhpcy5jeWNsZSwgdGhpcykpXG4gIH1cblxuICBDYXJvdXNlbC5ERUZBVUxUUyA9IHtcbiAgICBpbnRlcnZhbDogNTAwMCxcbiAgICBwYXVzZTogJ2hvdmVyJyxcbiAgICB3cmFwOiB0cnVlXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSAgZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IGZhbHNlKVxuXG4gICAgdGhpcy5pbnRlcnZhbCAmJiBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWxcbiAgICAgICYmICF0aGlzLnBhdXNlZFxuICAgICAgJiYgKHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgkLnByb3h5KHRoaXMubmV4dCwgdGhpcyksIHRoaXMub3B0aW9ucy5pbnRlcnZhbCkpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEFjdGl2ZUluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGFjdGl2ZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLml0ZW0uYWN0aXZlJylcbiAgICB0aGlzLiRpdGVtcyAgPSB0aGlzLiRhY3RpdmUucGFyZW50KCkuY2hpbGRyZW4oKVxuXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmluZGV4KHRoaXMuJGFjdGl2ZSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgPSB0aGlzXG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRBY3RpdmVJbmRleCgpXG5cbiAgICBpZiAocG9zID4gKHRoaXMuJGl0ZW1zLmxlbmd0aCAtIDEpIHx8IHBvcyA8IDApIHJldHVyblxuXG4gICAgaWYgKHRoaXMuc2xpZGluZykgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQub25lKCdzbGlkLmJzLmNhcm91c2VsJywgZnVuY3Rpb24gKCkgeyB0aGF0LnRvKHBvcykgfSlcbiAgICBpZiAoYWN0aXZlSW5kZXggPT0gcG9zKSByZXR1cm4gdGhpcy5wYXVzZSgpLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzLnNsaWRlKHBvcyA+IGFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnLCAkKHRoaXMuJGl0ZW1zW3Bvc10pKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IHRydWUpXG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5maW5kKCcubmV4dCwgLnByZXYnKS5sZW5ndGggJiYgJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgnbmV4dCcpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgncHJldicpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAodHlwZSwgbmV4dCkge1xuICAgIHZhciAkYWN0aXZlICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpXG4gICAgdmFyICRuZXh0ICAgICA9IG5leHQgfHwgJGFjdGl2ZVt0eXBlXSgpXG4gICAgdmFyIGlzQ3ljbGluZyA9IHRoaXMuaW50ZXJ2YWxcbiAgICB2YXIgZGlyZWN0aW9uID0gdHlwZSA9PSAnbmV4dCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgdmFyIGZhbGxiYWNrICA9IHR5cGUgPT0gJ25leHQnID8gJ2ZpcnN0JyA6ICdsYXN0J1xuICAgIHZhciB0aGF0ICAgICAgPSB0aGlzXG5cbiAgICBpZiAoISRuZXh0Lmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuXG4gICAgICAkbmV4dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLml0ZW0nKVtmYWxsYmFja10oKVxuICAgIH1cblxuICAgIGlmICgkbmV4dC5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiB0aGlzLnNsaWRpbmcgPSBmYWxzZVxuXG4gICAgdmFyIGUgPSAkLkV2ZW50KCdzbGlkZS5icy5jYXJvdXNlbCcsIHsgcmVsYXRlZFRhcmdldDogJG5leHRbMF0sIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zbGlkaW5nID0gdHJ1ZVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMucGF1c2UoKVxuXG4gICAgaWYgKHRoaXMuJGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRpbmRpY2F0b3JzLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIHRoaXMuJGVsZW1lbnQub25lKCdzbGlkLmJzLmNhcm91c2VsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5leHRJbmRpY2F0b3IgPSAkKHRoYXQuJGluZGljYXRvcnMuY2hpbGRyZW4oKVt0aGF0LmdldEFjdGl2ZUluZGV4KCldKVxuICAgICAgICAkbmV4dEluZGljYXRvciAmJiAkbmV4dEluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKCQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3NsaWRlJykpIHtcbiAgICAgICRuZXh0LmFkZENsYXNzKHR5cGUpXG4gICAgICAkbmV4dFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcbiAgICAgICRhY3RpdmUuYWRkQ2xhc3MoZGlyZWN0aW9uKVxuICAgICAgJG5leHQuYWRkQ2xhc3MoZGlyZWN0aW9uKVxuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRuZXh0LnJlbW92ZUNsYXNzKFt0eXBlLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcyhbJ2FjdGl2ZScsIGRpcmVjdGlvbl0uam9pbignICcpKVxuICAgICAgICAgIHRoYXQuc2xpZGluZyA9IGZhbHNlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRoYXQuJGVsZW1lbnQudHJpZ2dlcignc2xpZC5icy5jYXJvdXNlbCcpIH0sIDApXG4gICAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCgkYWN0aXZlLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicpLnNsaWNlKDAsIC0xKSAqIDEwMDApXG4gICAgfSBlbHNlIHtcbiAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAkbmV4dC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIHRoaXMuc2xpZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3NsaWQuYnMuY2Fyb3VzZWwnKVxuICAgIH1cblxuICAgIGlzQ3ljbGluZyAmJiB0aGlzLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENBUk9VU0VMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4uY2Fyb3VzZWxcblxuICAkLmZuLmNhcm91c2VsID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmNhcm91c2VsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIENhcm91c2VsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuICAgICAgdmFyIGFjdGlvbiAgPSB0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnID8gb3B0aW9uIDogb3B0aW9ucy5zbGlkZVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNhcm91c2VsJywgKGRhdGEgPSBuZXcgQ2Fyb3VzZWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ251bWJlcicpIGRhdGEudG8ob3B0aW9uKVxuICAgICAgZWxzZSBpZiAoYWN0aW9uKSBkYXRhW2FjdGlvbl0oKVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5pbnRlcnZhbCkgZGF0YS5wYXVzZSgpLmN5Y2xlKClcbiAgICB9KVxuICB9XG5cbiAgJC5mbi5jYXJvdXNlbC5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG5cblxuICAvLyBDQVJPVVNFTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uY2Fyb3VzZWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmNhcm91c2VsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGVdLCBbZGF0YS1zbGlkZS10b10nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKSwgaHJlZlxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmID0gJHRoaXMuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkgLy9zdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcbiAgICB2YXIgc2xpZGVJbmRleCA9ICR0aGlzLmF0dHIoJ2RhdGEtc2xpZGUtdG8nKVxuICAgIGlmIChzbGlkZUluZGV4KSBvcHRpb25zLmludGVydmFsID0gZmFsc2VcblxuICAgICR0YXJnZXQuY2Fyb3VzZWwob3B0aW9ucylcblxuICAgIGlmIChzbGlkZUluZGV4ID0gJHRoaXMuYXR0cignZGF0YS1zbGlkZS10bycpKSB7XG4gICAgICAkdGFyZ2V0LmRhdGEoJ2JzLmNhcm91c2VsJykudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfSlcblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGNhcm91c2VsID0gJCh0aGlzKVxuICAgICAgJGNhcm91c2VsLmNhcm91c2VsKCRjYXJvdXNlbC5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY29sbGFwc2UuanMgdjMuMS4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNjb2xsYXBzZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENPTExBUFNFIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIENvbGxhcHNlID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgICAgID0gJC5leHRlbmQoe30sIENvbGxhcHNlLkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IG51bGxcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB0aGlzLiRwYXJlbnQgPSAkKHRoaXMub3B0aW9ucy5wYXJlbnQpXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGUpIHRoaXMudG9nZ2xlKClcbiAgfVxuXG4gIENvbGxhcHNlLkRFRkFVTFRTID0ge1xuICAgIHRvZ2dsZTogdHJ1ZVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmRpbWVuc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzV2lkdGggPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCd3aWR0aCcpXG4gICAgcmV0dXJuIGhhc1dpZHRoID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uaW5nIHx8IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykpIHJldHVyblxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgYWN0aXZlcyA9IHRoaXMuJHBhcmVudCAmJiB0aGlzLiRwYXJlbnQuZmluZCgnPiAucGFuZWwgPiAuaW4nKVxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIHZhciBoYXNEYXRhID0gYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgICBpZiAoaGFzRGF0YSAmJiBoYXNEYXRhLnRyYW5zaXRpb25pbmcpIHJldHVyblxuICAgICAgYWN0aXZlcy5jb2xsYXBzZSgnaGlkZScpXG4gICAgICBoYXNEYXRhIHx8IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnLCBudWxsKVxuICAgIH1cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpXG4gICAgICBbZGltZW5zaW9uXSgwKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlIGluJylcbiAgICAgICAgW2RpbWVuc2lvbl0oJ2F1dG8nKVxuICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMFxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHZhciBzY3JvbGxTaXplID0gJC5jYW1lbENhc2UoWydzY3JvbGwnLCBkaW1lbnNpb25dLmpvaW4oJy0nKSlcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbmUoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLCAkLnByb3h5KGNvbXBsZXRlLCB0aGlzKSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCgzNTApXG4gICAgICBbZGltZW5zaW9uXSh0aGlzLiRlbGVtZW50WzBdW3Njcm9sbFNpemVdKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoJ2hpZGUuYnMuY29sbGFwc2UnKVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICBbZGltZW5zaW9uXSh0aGlzLiRlbGVtZW50W2RpbWVuc2lvbl0oKSlcbiAgICAgIFswXS5vZmZzZXRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMFxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAudHJpZ2dlcignaGlkZGVuLmJzLmNvbGxhcHNlJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIFtkaW1lbnNpb25dKDApXG4gICAgICAub25lKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCwgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoMzUwKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzW3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG5cbiAgLy8gQ09MTEFQU0UgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgb2xkID0gJC5mbi5jb2xsYXBzZVxuXG4gICQuZm4uY29sbGFwc2UgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSAmJiBvcHRpb25zLnRvZ2dsZSAmJiBvcHRpb24gPT0gJ3Nob3cnKSBvcHRpb24gPSAhb3B0aW9uXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJywgKGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4uY29sbGFwc2UuQ29uc3RydWN0b3IgPSBDb2xsYXBzZVxuXG5cbiAgLy8gQ09MTEFQU0UgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmNvbGxhcHNlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5jb2xsYXBzZSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLmNvbGxhcHNlLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1jb2xsYXBzZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKSwgaHJlZlxuICAgIHZhciB0YXJnZXQgID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuICAgICAgICB8fCBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgfHwgKGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIC8vc3RyaXAgZm9yIGllN1xuICAgIHZhciAkdGFyZ2V0ID0gJCh0YXJnZXQpXG4gICAgdmFyIGRhdGEgICAgPSAkdGFyZ2V0LmRhdGEoJ2JzLmNvbGxhcHNlJylcbiAgICB2YXIgb3B0aW9uICA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0aGlzLmRhdGEoKVxuICAgIHZhciBwYXJlbnQgID0gJHRoaXMuYXR0cignZGF0YS1wYXJlbnQnKVxuICAgIHZhciAkcGFyZW50ID0gcGFyZW50ICYmICQocGFyZW50KVxuXG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLnRyYW5zaXRpb25pbmcpIHtcbiAgICAgIGlmICgkcGFyZW50KSAkcGFyZW50LmZpbmQoJ1tkYXRhLXRvZ2dsZT1jb2xsYXBzZV1bZGF0YS1wYXJlbnQ9XCInICsgcGFyZW50ICsgJ1wiXScpLm5vdCgkdGhpcykuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAkdGhpc1skdGFyZ2V0Lmhhc0NsYXNzKCdpbicpID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKCdjb2xsYXBzZWQnKVxuICAgIH1cblxuICAgICR0YXJnZXQuY29sbGFwc2Uob3B0aW9uKVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBkcm9wZG93bi5qcyB2My4xLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2Ryb3Bkb3duc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIERST1BET1dOIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBiYWNrZHJvcCA9ICcuZHJvcGRvd24tYmFja2Ryb3AnXG4gIHZhciB0b2dnbGUgICA9ICdbZGF0YS10b2dnbGU9ZHJvcGRvd25dJ1xuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICQoZWxlbWVudCkub24oJ2NsaWNrLmJzLmRyb3Bkb3duJywgdGhpcy50b2dnbGUpXG4gIH1cblxuICBEcm9wZG93bi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgY2xlYXJNZW51cygpXG5cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICEkcGFyZW50LmNsb3Nlc3QoJy5uYXZiYXItbmF2JykubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG1vYmlsZSB3ZSB1c2UgYSBiYWNrZHJvcCBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkb24ndCBkZWxlZ2F0ZVxuICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiZHJvcGRvd24tYmFja2Ryb3BcIi8+JykuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSkub24oJ2NsaWNrJywgY2xlYXJNZW51cylcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdzaG93LmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHBhcmVudFxuICAgICAgICAudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAudHJpZ2dlcignc2hvd24uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KVxuXG4gICAgICAkdGhpcy5mb2N1cygpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCEvKDM4fDQwfDI3KS8udGVzdChlLmtleUNvZGUpKSByZXR1cm5cblxuICAgIHZhciAkdGhpcyA9ICQodGhpcylcblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGlmICgkdGhpcy5pcygnLmRpc2FibGVkLCA6ZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICB2YXIgJHBhcmVudCAgPSBnZXRQYXJlbnQoJHRoaXMpXG4gICAgdmFyIGlzQWN0aXZlID0gJHBhcmVudC5oYXNDbGFzcygnb3BlbicpXG5cbiAgICBpZiAoIWlzQWN0aXZlIHx8IChpc0FjdGl2ZSAmJiBlLmtleUNvZGUgPT0gMjcpKSB7XG4gICAgICBpZiAoZS53aGljaCA9PSAyNykgJHBhcmVudC5maW5kKHRvZ2dsZSkuZm9jdXMoKVxuICAgICAgcmV0dXJuICR0aGlzLmNsaWNrKClcbiAgICB9XG5cbiAgICB2YXIgZGVzYyA9ICcgbGk6bm90KC5kaXZpZGVyKTp2aXNpYmxlIGEnXG4gICAgdmFyICRpdGVtcyA9ICRwYXJlbnQuZmluZCgnW3JvbGU9bWVudV0nICsgZGVzYyArICcsIFtyb2xlPWxpc3Rib3hdJyArIGRlc2MpXG5cbiAgICBpZiAoISRpdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgdmFyIGluZGV4ID0gJGl0ZW1zLmluZGV4KCRpdGVtcy5maWx0ZXIoJzpmb2N1cycpKVxuXG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOCAmJiBpbmRleCA+IDApICAgICAgICAgICAgICAgICBpbmRleC0tICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBcbiAgICBpZiAoZS5rZXlDb2RlID09IDQwICYmIGluZGV4IDwgJGl0ZW1zLmxlbmd0aCAtIDEpIGluZGV4KysgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3duXG4gICAgaWYgKCF+aW5kZXgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDBcblxuICAgICRpdGVtcy5lcShpbmRleCkuZm9jdXMoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJNZW51cyhlKSB7XG4gICAgJChiYWNrZHJvcCkucmVtb3ZlKClcbiAgICAkKHRvZ2dsZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHBhcmVudCA9IGdldFBhcmVudCgkKHRoaXMpKVxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuICAgICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpIHJldHVyblxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdoaWRlLmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG4gICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG4gICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdvcGVuJykudHJpZ2dlcignaGlkZGVuLmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFyZW50KCR0aGlzKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgLyNbQS1aYS16XS8udGVzdChzZWxlY3RvcikgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIHZhciAkcGFyZW50ID0gc2VsZWN0b3IgJiYgJChzZWxlY3RvcilcblxuICAgIHJldHVybiAkcGFyZW50ICYmICRwYXJlbnQubGVuZ3RoID8gJHBhcmVudCA6ICR0aGlzLnBhcmVudCgpXG4gIH1cblxuXG4gIC8vIERST1BET1dOIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4uZHJvcGRvd25cblxuICAkLmZuLmRyb3Bkb3duID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuZHJvcGRvd24nKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJywgKGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLmRyb3Bkb3duLkNvbnN0cnVjdG9yID0gRHJvcGRvd25cblxuXG4gIC8vIERST1BET1dOIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5kcm9wZG93bi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uZHJvcGRvd24gPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBUFBMWSBUTyBTVEFOREFSRCBEUk9QRE9XTiBFTEVNRU5UU1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaScsIGNsZWFyTWVudXMpXG4gICAgLm9uKCdjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaScsICcuZHJvcGRvd24gZm9ybScsIGZ1bmN0aW9uIChlKSB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfSlcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgdG9nZ2xlLCBEcm9wZG93bi5wcm90b3R5cGUudG9nZ2xlKVxuICAgIC5vbigna2V5ZG93bi5icy5kcm9wZG93bi5kYXRhLWFwaScsIHRvZ2dsZSArICcsIFtyb2xlPW1lbnVdLCBbcm9sZT1saXN0Ym94XScsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBtb2RhbC5qcyB2My4xLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI21vZGFsc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE1PREFMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zICAgPSBvcHRpb25zXG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kYmFja2Ryb3AgPVxuICAgIHRoaXMuaXNTaG93biAgID0gbnVsbFxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdGUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLmZpbmQoJy5tb2RhbC1jb250ZW50JylcbiAgICAgICAgLmxvYWQodGhpcy5vcHRpb25zLnJlbW90ZSwgJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdsb2FkZWQuYnMubW9kYWwnKVxuICAgICAgICB9LCB0aGlzKSlcbiAgICB9XG4gIH1cblxuICBNb2RhbC5ERUZBVUxUUyA9IHtcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBzaG93OiB0cnVlXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXNbIXRoaXMuaXNTaG93biA/ICdzaG93JyA6ICdoaWRlJ10oX3JlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBlICAgID0gJC5FdmVudCgnc2hvdy5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IHRydWVcblxuICAgIHRoaXMuZXNjYXBlKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdHJhbnNpdGlvbiA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoYXQuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICBpZiAoIXRoYXQuJGVsZW1lbnQucGFyZW50KCkubGVuZ3RoKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnQuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSkgLy8gZG9uJ3QgbW92ZSBtb2RhbHMgZG9tIHBvc2l0aW9uXG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgLnNob3coKVxuICAgICAgICAuc2Nyb2xsVG9wKDApXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgLmFkZENsYXNzKCdpbicpXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKVxuXG4gICAgICB0aGF0LmVuZm9yY2VGb2N1cygpXG5cbiAgICAgIHZhciBlID0gJC5FdmVudCgnc2hvd24uYnMubW9kYWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IF9yZWxhdGVkVGFyZ2V0IH0pXG5cbiAgICAgIHRyYW5zaXRpb24gP1xuICAgICAgICB0aGF0LiRlbGVtZW50LmZpbmQoJy5tb2RhbC1kaWFsb2cnKSAvLyB3YWl0IGZvciBtb2RhbCB0byBzbGlkZSBpblxuICAgICAgICAgIC5vbmUoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LmZvY3VzKCkudHJpZ2dlcihlKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDMwMCkgOlxuICAgICAgICB0aGF0LiRlbGVtZW50LmZvY3VzKCkudHJpZ2dlcihlKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgZSA9ICQuRXZlbnQoJ2hpZGUuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAoIXRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IGZhbHNlXG5cbiAgICB0aGlzLmVzY2FwZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKVxuICAgICAgLm9mZignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCwgJC5wcm94eSh0aGlzLmhpZGVNb2RhbCwgdGhpcykpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCgzMDApIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5dXAuZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS53aGljaCA9PSAyNyAmJiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5dXAuZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKVxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC5yZW1vdmVCYWNrZHJvcCgpXG4gICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2hpZGRlbi5icy5tb2RhbCcpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZW1vdmVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRiYWNrZHJvcCAmJiB0aGlzLiRiYWNrZHJvcC5yZW1vdmUoKVxuICAgIHRoaXMuJGJhY2tkcm9wID0gbnVsbFxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmJhY2tkcm9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIGFuaW1hdGUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgPyAnZmFkZScgOiAnJ1xuXG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgIHZhciBkb0FuaW1hdGUgPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBhbmltYXRlXG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wID0gJCgnPGRpdiBjbGFzcz1cIm1vZGFsLWJhY2tkcm9wICcgKyBhbmltYXRlICsgJ1wiIC8+JylcbiAgICAgICAgLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm5cbiAgICAgICAgdGhpcy5vcHRpb25zLmJhY2tkcm9wID09ICdzdGF0aWMnXG4gICAgICAgICAgPyB0aGlzLiRlbGVtZW50WzBdLmZvY3VzLmNhbGwodGhpcy4kZWxlbWVudFswXSlcbiAgICAgICAgICA6IHRoaXMuaGlkZS5jYWxsKHRoaXMpXG4gICAgICB9LCB0aGlzKSlcblxuICAgICAgaWYgKGRvQW5pbWF0ZSkgdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVyblxuXG4gICAgICBkb0FuaW1hdGUgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLCBjYWxsYmFjaylcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoMTUwKSA6XG4gICAgICAgIGNhbGxiYWNrKClcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93biAmJiB0aGlzLiRiYWNrZHJvcCkge1xuICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCwgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDE1MCkgOlxuICAgICAgICBjYWxsYmFjaygpXG5cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cblxuICAvLyBNT0RBTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBvbGQgPSAkLmZuLm1vZGFsXG5cbiAgJC5mbi5tb2RhbCA9IGZ1bmN0aW9uIChvcHRpb24sIF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMubW9kYWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgTW9kYWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMubW9kYWwnLCAoZGF0YSA9IG5ldyBNb2RhbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKF9yZWxhdGVkVGFyZ2V0KVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5zaG93KSBkYXRhLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSkgLy9zdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbiAgPSAkdGFyZ2V0LmRhdGEoJ2JzLm1vZGFsJykgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHsgcmVtb3RlOiAhLyMvLnRlc3QoaHJlZikgJiYgaHJlZiB9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuXG4gICAgaWYgKCR0aGlzLmlzKCdhJykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJHRhcmdldFxuICAgICAgLm1vZGFsKG9wdGlvbiwgdGhpcylcbiAgICAgIC5vbmUoJ2hpZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aGlzLmlzKCc6dmlzaWJsZScpICYmICR0aGlzLmZvY3VzKClcbiAgICAgIH0pXG4gIH0pXG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24gKCkgeyAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdtb2RhbC1vcGVuJykgfSlcbiAgICAub24oJ2hpZGRlbi5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbiAoKSB7ICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKSB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0b29sdGlwLmpzIHYzLjEuMVxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdG9vbHRpcFxuICogSW5zcGlyZWQgYnkgdGhlIG9yaWdpbmFsIGpRdWVyeS50aXBzeSBieSBKYXNvbiBGcmFtZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRPT0xUSVAgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBUb29sdGlwID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnR5cGUgICAgICAgPVxuICAgIHRoaXMub3B0aW9ucyAgICA9XG4gICAgdGhpcy5lbmFibGVkICAgID1cbiAgICB0aGlzLnRpbWVvdXQgICAgPVxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9XG4gICAgdGhpcy4kZWxlbWVudCAgID0gbnVsbFxuXG4gICAgdGhpcy5pbml0KCd0b29sdGlwJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIFRvb2x0aXAuREVGQVVMVFMgPSB7XG4gICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+JyxcbiAgICB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnLFxuICAgIHRpdGxlOiAnJyxcbiAgICBkZWxheTogMCxcbiAgICBodG1sOiBmYWxzZSxcbiAgICBjb250YWluZXI6IGZhbHNlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgID0gdHJ1ZVxuICAgIHRoaXMudHlwZSAgICAgPSB0eXBlXG4gICAgdGhpcy4kZWxlbWVudCA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgID0gdGhpcy5nZXRPcHRpb25zKG9wdGlvbnMpXG5cbiAgICB2YXIgdHJpZ2dlcnMgPSB0aGlzLm9wdGlvbnMudHJpZ2dlci5zcGxpdCgnICcpXG5cbiAgICBmb3IgKHZhciBpID0gdHJpZ2dlcnMubGVuZ3RoOyBpLS07KSB7XG4gICAgICB2YXIgdHJpZ2dlciA9IHRyaWdnZXJzW2ldXG5cbiAgICAgIGlmICh0cmlnZ2VyID09ICdjbGljaycpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKSlcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPSAnbWFudWFsJykge1xuICAgICAgICB2YXIgZXZlbnRJbiAgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VlbnRlcicgOiAnZm9jdXNpbidcbiAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlbGVhdmUnIDogJ2ZvY3Vzb3V0J1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRJbiAgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmVudGVyLCB0aGlzKSlcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudE91dCArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMubGVhdmUsIHRoaXMpKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5zZWxlY3RvciA/XG4gICAgICAodGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIHsgdHJpZ2dlcjogJ21hbnVhbCcsIHNlbGVjdG9yOiAnJyB9KSkgOlxuICAgICAgdGhpcy5maXhUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVG9vbHRpcC5ERUZBVUxUU1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmdldERlZmF1bHRzKCksIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKVxuXG4gICAgaWYgKG9wdGlvbnMuZGVsYXkgJiYgdHlwZW9mIG9wdGlvbnMuZGVsYXkgPT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMuZGVsYXkgPSB7XG4gICAgICAgIHNob3c6IG9wdGlvbnMuZGVsYXksXG4gICAgICAgIGhpZGU6IG9wdGlvbnMuZGVsYXlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVsZWdhdGVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zICA9IHt9XG4gICAgdmFyIGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0cygpXG5cbiAgICB0aGlzLl9vcHRpb25zICYmICQuZWFjaCh0aGlzLl9vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGRlZmF1bHRzW2tleV0gIT0gdmFsdWUpIG9wdGlvbnNba2V5XSA9IHZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldClbdGhpcy50eXBlXSh0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdykgcmV0dXJuIHNlbGYuc2hvdygpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykgc2VsZi5zaG93KClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmxlYXZlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBzZWxmID0gb2JqIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvciA/XG4gICAgICBvYmogOiAkKG9iai5jdXJyZW50VGFyZ2V0KVt0aGlzLnR5cGVdKHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KVxuXG4gICAgc2VsZi5ob3ZlclN0YXRlID0gJ291dCdcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuaGlkZSkgcmV0dXJuIHNlbGYuaGlkZSgpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ291dCcpIHNlbGYuaGlkZSgpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlID0gJC5FdmVudCgnc2hvdy5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKHRoaXMuaGFzQ29udGVudCgpICYmIHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyICR0aXAgPSB0aGlzLnRpcCgpXG5cbiAgICAgIHRoaXMuc2V0Q29udGVudCgpXG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSAkdGlwLmFkZENsYXNzKCdmYWRlJylcblxuICAgICAgdmFyIHBsYWNlbWVudCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMucGxhY2VtZW50ID09ICdmdW5jdGlvbicgP1xuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50LmNhbGwodGhpcywgJHRpcFswXSwgdGhpcy4kZWxlbWVudFswXSkgOlxuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50XG5cbiAgICAgIHZhciBhdXRvVG9rZW4gPSAvXFxzP2F1dG8/XFxzPy9pXG4gICAgICB2YXIgYXV0b1BsYWNlID0gYXV0b1Rva2VuLnRlc3QocGxhY2VtZW50KVxuICAgICAgaWYgKGF1dG9QbGFjZSkgcGxhY2VtZW50ID0gcGxhY2VtZW50LnJlcGxhY2UoYXV0b1Rva2VuLCAnJykgfHwgJ3RvcCdcblxuICAgICAgJHRpcFxuICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgLmNzcyh7IHRvcDogMCwgbGVmdDogMCwgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGFpbmVyID8gJHRpcC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMuY29udGFpbmVyKSA6ICR0aXAuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudClcblxuICAgICAgdmFyIHBvcyAgICAgICAgICA9IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgdmFyIGFjdHVhbFdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgICBpZiAoYXV0b1BsYWNlKSB7XG4gICAgICAgIHZhciAkcGFyZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKVxuXG4gICAgICAgIHZhciBvcmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRcbiAgICAgICAgdmFyIGRvY1Njcm9sbCAgICA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3BcbiAgICAgICAgdmFyIHBhcmVudFdpZHRoICA9IHRoaXMub3B0aW9ucy5jb250YWluZXIgPT0gJ2JvZHknID8gd2luZG93LmlubmVyV2lkdGggIDogJHBhcmVudC5vdXRlcldpZHRoKClcbiAgICAgICAgdmFyIHBhcmVudEhlaWdodCA9IHRoaXMub3B0aW9ucy5jb250YWluZXIgPT0gJ2JvZHknID8gd2luZG93LmlubmVySGVpZ2h0IDogJHBhcmVudC5vdXRlckhlaWdodCgpXG4gICAgICAgIHZhciBwYXJlbnRMZWZ0ICAgPSB0aGlzLm9wdGlvbnMuY29udGFpbmVyID09ICdib2R5JyA/IDAgOiAkcGFyZW50Lm9mZnNldCgpLmxlZnRcblxuICAgICAgICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgJiYgcG9zLnRvcCAgICsgcG9zLmhlaWdodCAgKyBhY3R1YWxIZWlnaHQgLSBkb2NTY3JvbGwgPiBwYXJlbnRIZWlnaHQgID8gJ3RvcCcgICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3RvcCcgICAgJiYgcG9zLnRvcCAgIC0gZG9jU2Nyb2xsICAgLSBhY3R1YWxIZWlnaHQgPCAwICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvdHRvbScgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAgJiYgcG9zLnJpZ2h0ICsgYWN0dWFsV2lkdGggPiBwYXJlbnRXaWR0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2xlZnQnICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ2xlZnQnICAgJiYgcG9zLmxlZnQgIC0gYWN0dWFsV2lkdGggPCBwYXJlbnRMZWZ0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3JpZ2h0JyAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnRcblxuICAgICAgICAkdGlwXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKG9yZ1BsYWNlbWVudClcbiAgICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuICAgICAgfVxuXG4gICAgICB2YXIgY2FsY3VsYXRlZE9mZnNldCA9IHRoaXMuZ2V0Q2FsY3VsYXRlZE9mZnNldChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodClcblxuICAgICAgdGhpcy5hcHBseVBsYWNlbWVudChjYWxjdWxhdGVkT2Zmc2V0LCBwbGFjZW1lbnQpXG4gICAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ3Nob3duLmJzLicgKyB0aGF0LnR5cGUpXG4gICAgICB9XG5cbiAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5vbmUoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLCBjb21wbGV0ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoMTUwKSA6XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcHBseVBsYWNlbWVudCA9IGZ1bmN0aW9uIChvZmZzZXQsIHBsYWNlbWVudCkge1xuICAgIHZhciByZXBsYWNlXG4gICAgdmFyICR0aXAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgd2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBoZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgLy8gbWFudWFsbHkgcmVhZCBtYXJnaW5zIGJlY2F1c2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGluY2x1ZGVzIGRpZmZlcmVuY2VcbiAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQoJHRpcC5jc3MoJ21hcmdpbi10b3AnKSwgMTApXG4gICAgdmFyIG1hcmdpbkxlZnQgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLWxlZnQnKSwgMTApXG5cbiAgICAvLyB3ZSBtdXN0IGNoZWNrIGZvciBOYU4gZm9yIGllIDgvOVxuICAgIGlmIChpc05hTihtYXJnaW5Ub3ApKSAgbWFyZ2luVG9wICA9IDBcbiAgICBpZiAoaXNOYU4obWFyZ2luTGVmdCkpIG1hcmdpbkxlZnQgPSAwXG5cbiAgICBvZmZzZXQudG9wICA9IG9mZnNldC50b3AgICsgbWFyZ2luVG9wXG4gICAgb2Zmc2V0LmxlZnQgPSBvZmZzZXQubGVmdCArIG1hcmdpbkxlZnRcblxuICAgIC8vICQuZm4ub2Zmc2V0IGRvZXNuJ3Qgcm91bmQgcGl4ZWwgdmFsdWVzXG4gICAgLy8gc28gd2UgdXNlIHNldE9mZnNldCBkaXJlY3RseSB3aXRoIG91ciBvd24gZnVuY3Rpb24gQi0wXG4gICAgJC5vZmZzZXQuc2V0T2Zmc2V0KCR0aXBbMF0sICQuZXh0ZW5kKHtcbiAgICAgIHVzaW5nOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgJHRpcC5jc3Moe1xuICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChwcm9wcy50b3ApLFxuICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQocHJvcHMubGVmdClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCBvZmZzZXQpLCAwKVxuXG4gICAgJHRpcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHBsYWNpbmcgdGlwIGluIG5ldyBvZmZzZXQgY2F1c2VkIHRoZSB0aXAgdG8gcmVzaXplIGl0c2VsZlxuICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnICYmIGFjdHVhbEhlaWdodCAhPSBoZWlnaHQpIHtcbiAgICAgIHJlcGxhY2UgPSB0cnVlXG4gICAgICBvZmZzZXQudG9wID0gb2Zmc2V0LnRvcCArIGhlaWdodCAtIGFjdHVhbEhlaWdodFxuICAgIH1cblxuICAgIGlmICgvYm90dG9tfHRvcC8udGVzdChwbGFjZW1lbnQpKSB7XG4gICAgICB2YXIgZGVsdGEgPSAwXG5cbiAgICAgIGlmIChvZmZzZXQubGVmdCA8IDApIHtcbiAgICAgICAgZGVsdGEgICAgICAgPSBvZmZzZXQubGVmdCAqIC0yXG4gICAgICAgIG9mZnNldC5sZWZ0ID0gMFxuXG4gICAgICAgICR0aXAub2Zmc2V0KG9mZnNldClcblxuICAgICAgICBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgICAgIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVwbGFjZUFycm93KGRlbHRhIC0gd2lkdGggKyBhY3R1YWxXaWR0aCwgYWN0dWFsV2lkdGgsICdsZWZ0JylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXBsYWNlQXJyb3coYWN0dWFsSGVpZ2h0IC0gaGVpZ2h0LCBhY3R1YWxIZWlnaHQsICd0b3AnKVxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlKSAkdGlwLm9mZnNldChvZmZzZXQpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5yZXBsYWNlQXJyb3cgPSBmdW5jdGlvbiAoZGVsdGEsIGRpbWVuc2lvbiwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmFycm93KCkuY3NzKHBvc2l0aW9uLCBkZWx0YSA/ICg1MCAqICgxIC0gZGVsdGEgLyBkaW1lbnNpb24pICsgJyUnKSA6ICcnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpXG5cbiAgICAkdGlwLmZpbmQoJy50b29sdGlwLWlubmVyJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2ZhZGUgaW4gdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0JylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyICR0aXAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdoaWRlLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgIGlmICh0aGF0LmhvdmVyU3RhdGUgIT0gJ2luJykgJHRpcC5kZXRhY2goKVxuICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdoaWRkZW4uYnMuJyArIHRoYXQudHlwZSlcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICR0aXBcbiAgICAgICAgLm9uZSgkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoMTUwKSA6XG4gICAgICBjb21wbGV0ZSgpXG5cbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZml4VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIGlmICgkZS5hdHRyKCd0aXRsZScpIHx8IHR5cGVvZigkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykpICE9ICdzdHJpbmcnKSB7XG4gICAgICAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgJGUuYXR0cigndGl0bGUnKSB8fCAnJykuYXR0cigndGl0bGUnLCAnJylcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbCA9IHRoaXMuJGVsZW1lbnRbMF1cbiAgICByZXR1cm4gJC5leHRlbmQoe30sICh0eXBlb2YgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09ICdmdW5jdGlvbicpID8gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiB7XG4gICAgICB3aWR0aDogZWwub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IGVsLm9mZnNldEhlaWdodFxuICAgIH0sIHRoaXMuJGVsZW1lbnQub2Zmc2V0KCkpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRDYWxjdWxhdGVkT2Zmc2V0ID0gZnVuY3Rpb24gKHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudCA9PSAnYm90dG9tJyA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCwgICBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgIH0gOlxuICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3RvcCcgICAgPyB7IHRvcDogcG9zLnRvcCAtIGFjdHVhbEhlaWdodCwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggLyAyIC0gYWN0dWFsV2lkdGggLyAyICB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0IC8gMiAtIGFjdHVhbEhlaWdodCAvIDIsIGxlZnQ6IHBvcy5sZWZ0IC0gYWN0dWFsV2lkdGggfSA6XG4gICAgICAgIC8qIHBsYWNlbWVudCA9PSAncmlnaHQnICovIHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aXRsZVxuICAgIHZhciAkZSA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgbyAgPSB0aGlzLm9wdGlvbnNcblxuICAgIHRpdGxlID0gJGUuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScpXG4gICAgICB8fCAodHlwZW9mIG8udGl0bGUgPT0gJ2Z1bmN0aW9uJyA/IG8udGl0bGUuY2FsbCgkZVswXSkgOiAgby50aXRsZSlcblxuICAgIHJldHVybiB0aXRsZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiR0aXAgPSB0aGlzLiR0aXAgfHwgJCh0aGlzLm9wdGlvbnMudGVtcGxhdGUpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy4kYXJyb3cgPSB0aGlzLiRhcnJvdyB8fCB0aGlzLnRpcCgpLmZpbmQoJy50b29sdGlwLWFycm93JylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy4kZWxlbWVudFswXS5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgICAgdGhpcy4kZWxlbWVudCA9IG51bGxcbiAgICAgIHRoaXMub3B0aW9ucyAgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZUVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc2VsZiA9IGUgPyAkKGUuY3VycmVudFRhcmdldClbdGhpcy50eXBlXSh0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKS5kYXRhKCdicy4nICsgdGhpcy50eXBlKSA6IHRoaXNcbiAgICBzZWxmLnRpcCgpLmhhc0NsYXNzKCdpbicpID8gc2VsZi5sZWF2ZShzZWxmKSA6IHNlbGYuZW50ZXIoc2VsZilcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dClcbiAgICB0aGlzLmhpZGUoKS4kZWxlbWVudC5vZmYoJy4nICsgdGhpcy50eXBlKS5yZW1vdmVEYXRhKCdicy4nICsgdGhpcy50eXBlKVxuICB9XG5cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgb2xkID0gJC5mbi50b29sdGlwXG5cbiAgJC5mbi50b29sdGlwID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnRvb2x0aXAnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgb3B0aW9uID09ICdkZXN0cm95JykgcmV0dXJuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRvb2x0aXAnLCAoZGF0YSA9IG5ldyBUb29sdGlwKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBUb29sdGlwXG5cblxuICAvLyBUT09MVElQIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRvb2x0aXAgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHBvcG92ZXIuanMgdjMuMS4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNwb3BvdmVyc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBPUE9WRVIgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBQb3BvdmVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXQoJ3BvcG92ZXInLCBlbGVtZW50LCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEkLmZuLnRvb2x0aXApIHRocm93IG5ldyBFcnJvcignUG9wb3ZlciByZXF1aXJlcyB0b29sdGlwLmpzJylcblxuICBQb3BvdmVyLkRFRkFVTFRTID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5ERUZBVUxUUywge1xuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIj48ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj48aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+PC9oMz48ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+PC9kaXY+PC9kaXY+J1xuICB9KVxuXG5cbiAgLy8gTk9URTogUE9QT1ZFUiBFWFRFTkRTIHRvb2x0aXAuanNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBQb3BvdmVyLnByb3RvdHlwZSA9ICQuZXh0ZW5kKHt9LCAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IucHJvdG90eXBlKVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmdldERlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQb3BvdmVyLkRFRkFVTFRTXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGlwICAgID0gdGhpcy50aXAoKVxuICAgIHZhciB0aXRsZSAgID0gdGhpcy5nZXRUaXRsZSgpXG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKVxuXG4gICAgJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpW3RoaXMub3B0aW9ucy5odG1sID8gJ2h0bWwnIDogJ3RleHQnXSh0aXRsZSlcbiAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLWNvbnRlbnQnKVsgLy8gd2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgICAgdGhpcy5vcHRpb25zLmh0bWwgPyAodHlwZW9mIGNvbnRlbnQgPT0gJ3N0cmluZycgPyAnaHRtbCcgOiAnYXBwZW5kJykgOiAndGV4dCdcbiAgICBdKGNvbnRlbnQpXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIHRvcCBib3R0b20gbGVmdCByaWdodCBpbicpXG5cbiAgICAvLyBJRTggZG9lc24ndCBhY2NlcHQgaGlkaW5nIHZpYSB0aGUgYDplbXB0eWAgcHNldWRvIHNlbGVjdG9yLCB3ZSBoYXZlIHRvIGRvXG4gICAgLy8gdGhpcyBtYW51YWxseSBieSBjaGVja2luZyB0aGUgY29udGVudHMuXG4gICAgaWYgKCEkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaHRtbCgpKSAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaGlkZSgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5nZXRDb250ZW50KClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgcmV0dXJuICRlLmF0dHIoJ2RhdGEtY29udGVudCcpXG4gICAgICB8fCAodHlwZW9mIG8uY29udGVudCA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgIG8uY29udGVudC5jYWxsKCRlWzBdKSA6XG4gICAgICAgICAgICBvLmNvbnRlbnQpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy4kYXJyb3cgPSB0aGlzLiRhcnJvdyB8fCB0aGlzLnRpcCgpLmZpbmQoJy5hcnJvdycpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS50aXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLiR0aXApIHRoaXMuJHRpcCA9ICQodGhpcy5vcHRpb25zLnRlbXBsYXRlKVxuICAgIHJldHVybiB0aGlzLiR0aXBcbiAgfVxuXG5cbiAgLy8gUE9QT1ZFUiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4ucG9wb3ZlclxuXG4gICQuZm4ucG9wb3ZlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5wb3BvdmVyJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhICYmIG9wdGlvbiA9PSAnZGVzdHJveScpIHJldHVyblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5wb3BvdmVyJywgKGRhdGEgPSBuZXcgUG9wb3Zlcih0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG5cbiAgLy8gUE9QT1ZFUiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5wb3BvdmVyID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBzY3JvbGxzcHkuanMgdjMuMS4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNzY3JvbGxzcHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNCBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBTQ1JPTExTUFkgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGhyZWZcbiAgICB2YXIgcHJvY2VzcyAgPSAkLnByb3h5KHRoaXMucHJvY2VzcywgdGhpcylcblxuICAgIHRoaXMuJGVsZW1lbnQgICAgICAgPSAkKGVsZW1lbnQpLmlzKCdib2R5JykgPyAkKHdpbmRvdykgOiAkKGVsZW1lbnQpXG4gICAgdGhpcy4kYm9keSAgICAgICAgICA9ICQoJ2JvZHknKVxuICAgIHRoaXMuJHNjcm9sbEVsZW1lbnQgPSB0aGlzLiRlbGVtZW50Lm9uKCdzY3JvbGwuYnMuc2Nyb2xsLXNweS5kYXRhLWFwaScsIHByb2Nlc3MpXG4gICAgdGhpcy5vcHRpb25zICAgICAgICA9ICQuZXh0ZW5kKHt9LCBTY3JvbGxTcHkuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5zZWxlY3RvciAgICAgICA9ICh0aGlzLm9wdGlvbnMudGFyZ2V0XG4gICAgICB8fCAoKGhyZWYgPSAkKGVsZW1lbnQpLmF0dHIoJ2hyZWYnKSkgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpIC8vc3RyaXAgZm9yIGllN1xuICAgICAgfHwgJycpICsgJyAubmF2IGxpID4gYSdcbiAgICB0aGlzLm9mZnNldHMgICAgICAgID0gJChbXSlcbiAgICB0aGlzLnRhcmdldHMgICAgICAgID0gJChbXSlcbiAgICB0aGlzLmFjdGl2ZVRhcmdldCAgID0gbnVsbFxuXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgICB0aGlzLnByb2Nlc3MoKVxuICB9XG5cbiAgU2Nyb2xsU3B5LkRFRkFVTFRTID0ge1xuICAgIG9mZnNldDogMTBcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb2Zmc2V0TWV0aG9kID0gdGhpcy4kZWxlbWVudFswXSA9PSB3aW5kb3cgPyAnb2Zmc2V0JyA6ICdwb3NpdGlvbidcblxuICAgIHRoaXMub2Zmc2V0cyA9ICQoW10pXG4gICAgdGhpcy50YXJnZXRzID0gJChbXSlcblxuICAgIHZhciBzZWxmICAgICA9IHRoaXNcbiAgICB2YXIgJHRhcmdldHMgPSB0aGlzLiRib2R5XG4gICAgICAuZmluZCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZWwgICA9ICQodGhpcylcbiAgICAgICAgdmFyIGhyZWYgID0gJGVsLmRhdGEoJ3RhcmdldCcpIHx8ICRlbC5hdHRyKCdocmVmJylcbiAgICAgICAgdmFyICRocmVmID0gL14jLi8udGVzdChocmVmKSAmJiAkKGhyZWYpXG5cbiAgICAgICAgcmV0dXJuICgkaHJlZlxuICAgICAgICAgICYmICRocmVmLmxlbmd0aFxuICAgICAgICAgICYmICRocmVmLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgJiYgW1sgJGhyZWZbb2Zmc2V0TWV0aG9kXSgpLnRvcCArICghJC5pc1dpbmRvdyhzZWxmLiRzY3JvbGxFbGVtZW50LmdldCgwKSkgJiYgc2VsZi4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSksIGhyZWYgXV0pIHx8IG51bGxcbiAgICAgIH0pXG4gICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF0gfSlcbiAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vZmZzZXRzLnB1c2godGhpc1swXSlcbiAgICAgICAgc2VsZi50YXJnZXRzLnB1c2godGhpc1sxXSlcbiAgICAgIH0pXG4gIH1cblxuICBTY3JvbGxTcHkucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNjcm9sbFRvcCAgICA9IHRoaXMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0XG4gICAgdmFyIHNjcm9sbEhlaWdodCA9IHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0IHx8IHRoaXMuJGJvZHlbMF0uc2Nyb2xsSGVpZ2h0XG4gICAgdmFyIG1heFNjcm9sbCAgICA9IHNjcm9sbEhlaWdodCAtIHRoaXMuJHNjcm9sbEVsZW1lbnQuaGVpZ2h0KClcbiAgICB2YXIgb2Zmc2V0cyAgICAgID0gdGhpcy5vZmZzZXRzXG4gICAgdmFyIHRhcmdldHMgICAgICA9IHRoaXMudGFyZ2V0c1xuICAgIHZhciBhY3RpdmVUYXJnZXQgPSB0aGlzLmFjdGl2ZVRhcmdldFxuICAgIHZhciBpXG5cbiAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgcmV0dXJuIGFjdGl2ZVRhcmdldCAhPSAoaSA9IHRhcmdldHMubGFzdCgpWzBdKSAmJiB0aGlzLmFjdGl2YXRlKGkpXG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZVRhcmdldCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0c1swXSkge1xuICAgICAgcmV0dXJuIGFjdGl2ZVRhcmdldCAhPSAoaSA9IHRhcmdldHNbMF0pICYmIHRoaXMuYWN0aXZhdGUoaSlcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXRzLmxlbmd0aDsgaS0tOykge1xuICAgICAgYWN0aXZlVGFyZ2V0ICE9IHRhcmdldHNbaV1cbiAgICAgICAgJiYgc2Nyb2xsVG9wID49IG9mZnNldHNbaV1cbiAgICAgICAgJiYgKCFvZmZzZXRzW2kgKyAxXSB8fCBzY3JvbGxUb3AgPD0gb2Zmc2V0c1tpICsgMV0pXG4gICAgICAgICYmIHRoaXMuYWN0aXZhdGUoIHRhcmdldHNbaV0gKVxuICAgIH1cbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgICQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzVW50aWwodGhpcy5vcHRpb25zLnRhcmdldCwgJy5hY3RpdmUnKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciArXG4gICAgICAgICdbZGF0YS10YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiXSwnICtcbiAgICAgICAgdGhpcy5zZWxlY3RvciArICdbaHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJ1xuXG4gICAgdmFyIGFjdGl2ZSA9ICQoc2VsZWN0b3IpXG4gICAgICAucGFyZW50cygnbGknKVxuICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgaWYgKGFjdGl2ZS5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICBhY3RpdmUgPSBhY3RpdmVcbiAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH1cblxuICAgIGFjdGl2ZS50cmlnZ2VyKCdhY3RpdmF0ZS5icy5zY3JvbGxzcHknKVxuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4uc2Nyb2xsc3B5XG5cbiAgJC5mbi5zY3JvbGxzcHkgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5zY3JvbGxzcHknLCAoZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4uc2Nyb2xsc3B5LkNvbnN0cnVjdG9yID0gU2Nyb2xsU3B5XG5cblxuICAvLyBTQ1JPTExTUFkgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5zY3JvbGxzcHkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnNjcm9sbHNweSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PT1cblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtc3B5PVwic2Nyb2xsXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNweSA9ICQodGhpcylcbiAgICAgICRzcHkuc2Nyb2xsc3B5KCRzcHkuZGF0YSgpKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRhYi5qcyB2My4xLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3RhYnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNCBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBUQUIgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBUYWIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudClcbiAgfVxuXG4gIFRhYi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRoaXMgICAgPSB0aGlzLmVsZW1lbnRcbiAgICB2YXIgJHVsICAgICAgPSAkdGhpcy5jbG9zZXN0KCd1bDpub3QoLmRyb3Bkb3duLW1lbnUpJylcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5kYXRhKCd0YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciBwcmV2aW91cyA9ICR1bC5maW5kKCcuYWN0aXZlOmxhc3QgYScpWzBdXG4gICAgdmFyIGUgICAgICAgID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiBwcmV2aW91c1xuICAgIH0pXG5cbiAgICAkdGhpcy50cmlnZ2VyKGUpXG5cbiAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgJHRhcmdldCA9ICQoc2VsZWN0b3IpXG5cbiAgICB0aGlzLmFjdGl2YXRlKCR0aGlzLnBhcmVudCgnbGknKSwgJHVsKVxuICAgIHRoaXMuYWN0aXZhdGUoJHRhcmdldCwgJHRhcmdldC5wYXJlbnQoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgJHRoaXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdzaG93bi5icy50YWInLFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiBwcmV2aW91c1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgJGFjdGl2ZS5oYXNDbGFzcygnZmFkZScpXG5cbiAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5maW5kKCc+IC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZScpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICAgZWxlbWVudC5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvLyByZWZsb3cgZm9yIHRyYW5zaXRpb25cbiAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZmFkZScpXG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKSkge1xuICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uID9cbiAgICAgICRhY3RpdmVcbiAgICAgICAgLm9uZSgkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsIG5leHQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCgxNTApIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIG9sZCA9ICQuZm4udGFiXG5cbiAgJC5mbi50YWIgPSBmdW5jdGlvbiAoIG9wdGlvbiApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICA9ICR0aGlzLmRhdGEoJ2JzLnRhYicpXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMudGFiJywgKGRhdGEgPSBuZXcgVGFiKHRoaXMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLnRhYi5Db25zdHJ1Y3RvciA9IFRhYlxuXG5cbiAgLy8gVEFCIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PVxuXG4gICQuZm4udGFiLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi50YWIgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBUQUIgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJ0YWJcIl0sIFtkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICQodGhpcykudGFiKCdzaG93JylcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYWZmaXguanMgdjMuMS4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNhZmZpeFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFGRklYIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBBZmZpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIEFmZml4LkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMuJHdpbmRvdyA9ICQod2luZG93KVxuICAgICAgLm9uKCdzY3JvbGwuYnMuYWZmaXguZGF0YS1hcGknLCAkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbiwgdGhpcykpXG4gICAgICAub24oJ2NsaWNrLmJzLmFmZml4LmRhdGEtYXBpJywgICQucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uV2l0aEV2ZW50TG9vcCwgdGhpcykpXG5cbiAgICB0aGlzLiRlbGVtZW50ICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLmFmZml4ZWQgICAgICA9XG4gICAgdGhpcy51bnBpbiAgICAgICAgPVxuICAgIHRoaXMucGlubmVkT2Zmc2V0ID0gbnVsbFxuXG4gICAgdGhpcy5jaGVja1Bvc2l0aW9uKClcbiAgfVxuXG4gIEFmZml4LlJFU0VUID0gJ2FmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b20nXG5cbiAgQWZmaXguREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAwXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0UGlubmVkT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBpbm5lZE9mZnNldCkgcmV0dXJuIHRoaXMucGlubmVkT2Zmc2V0XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhBZmZpeC5SRVNFVCkuYWRkQ2xhc3MoJ2FmZml4JylcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy4kd2luZG93LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICByZXR1cm4gKHRoaXMucGlubmVkT2Zmc2V0ID0gcG9zaXRpb24udG9wIC0gc2Nyb2xsVG9wKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpLCAxKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LmlzKCc6dmlzaWJsZScpKSByZXR1cm5cblxuICAgIHZhciBzY3JvbGxIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKVxuICAgIHZhciBzY3JvbGxUb3AgICAgPSB0aGlzLiR3aW5kb3cuc2Nyb2xsVG9wKClcbiAgICB2YXIgcG9zaXRpb24gICAgID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKVxuICAgIHZhciBvZmZzZXQgICAgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0XG4gICAgdmFyIG9mZnNldFRvcCAgICA9IG9mZnNldC50b3BcbiAgICB2YXIgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0LmJvdHRvbVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCA9PSAndG9wJykgcG9zaXRpb24udG9wICs9IHNjcm9sbFRvcFxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT0gJ29iamVjdCcpICAgICAgICAgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0VG9wID0gb2Zmc2V0XG4gICAgaWYgKHR5cGVvZiBvZmZzZXRUb3AgPT0gJ2Z1bmN0aW9uJykgICAgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcCh0aGlzLiRlbGVtZW50KVxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0Qm90dG9tID09ICdmdW5jdGlvbicpIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b20odGhpcy4kZWxlbWVudClcblxuICAgIHZhciBhZmZpeCA9IHRoaXMudW5waW4gICAhPSBudWxsICYmIChzY3JvbGxUb3AgKyB0aGlzLnVucGluIDw9IHBvc2l0aW9uLnRvcCkgPyBmYWxzZSA6XG4gICAgICAgICAgICAgICAgb2Zmc2V0Qm90dG9tICE9IG51bGwgJiYgKHBvc2l0aW9uLnRvcCArIHRoaXMuJGVsZW1lbnQuaGVpZ2h0KCkgPj0gc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0Qm90dG9tKSA/ICdib3R0b20nIDpcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgICAgIT0gbnVsbCAmJiAoc2Nyb2xsVG9wIDw9IG9mZnNldFRvcCkgPyAndG9wJyA6IGZhbHNlXG5cbiAgICBpZiAodGhpcy5hZmZpeGVkID09PSBhZmZpeCkgcmV0dXJuXG4gICAgaWYgKHRoaXMudW5waW4pIHRoaXMuJGVsZW1lbnQuY3NzKCd0b3AnLCAnJylcblxuICAgIHZhciBhZmZpeFR5cGUgPSAnYWZmaXgnICsgKGFmZml4ID8gJy0nICsgYWZmaXggOiAnJylcbiAgICB2YXIgZSAgICAgICAgID0gJC5FdmVudChhZmZpeFR5cGUgKyAnLmJzLmFmZml4JylcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5hZmZpeGVkID0gYWZmaXhcbiAgICB0aGlzLnVucGluID0gYWZmaXggPT0gJ2JvdHRvbScgPyB0aGlzLmdldFBpbm5lZE9mZnNldCgpIDogbnVsbFxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKVxuICAgICAgLmFkZENsYXNzKGFmZml4VHlwZSlcbiAgICAgIC50cmlnZ2VyKCQuRXZlbnQoYWZmaXhUeXBlLnJlcGxhY2UoJ2FmZml4JywgJ2FmZml4ZWQnKSkpXG5cbiAgICBpZiAoYWZmaXggPT0gJ2JvdHRvbScpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2Zmc2V0KHsgdG9wOiBzY3JvbGxIZWlnaHQgLSBvZmZzZXRCb3R0b20gLSB0aGlzLiRlbGVtZW50LmhlaWdodCgpIH0pXG4gICAgfVxuICB9XG5cblxuICAvLyBBRkZJWCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBvbGQgPSAkLmZuLmFmZml4XG5cbiAgJC5mbi5hZmZpeCA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5hZmZpeCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWZmaXgnLCAoZGF0YSA9IG5ldyBBZmZpeCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgJC5mbi5hZmZpeC5Db25zdHJ1Y3RvciA9IEFmZml4XG5cblxuICAvLyBBRkZJWCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYWZmaXgubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmFmZml4ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQUZGSVggREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtc3B5PVwiYWZmaXhcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkc3B5ID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgPSAkc3B5LmRhdGEoKVxuXG4gICAgICBkYXRhLm9mZnNldCA9IGRhdGEub2Zmc2V0IHx8IHt9XG5cbiAgICAgIGlmIChkYXRhLm9mZnNldEJvdHRvbSkgZGF0YS5vZmZzZXQuYm90dG9tID0gZGF0YS5vZmZzZXRCb3R0b21cbiAgICAgIGlmIChkYXRhLm9mZnNldFRvcCkgICAgZGF0YS5vZmZzZXQudG9wICAgID0gZGF0YS5vZmZzZXRUb3BcblxuICAgICAgJHNweS5hZmZpeChkYXRhKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdmVuZG9yL2Jvb3RzdHJhcC5qc1wiLFwiL3ZlbmRvclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogZW5xdWlyZS5qcyB2Mi4xLjAgLSBBd2Vzb21lIE1lZGlhIFF1ZXJpZXMgaW4gSmF2YVNjcmlwdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IE5pY2sgV2lsbGlhbXMgLSBodHRwOi8vd2lja3kubmlsbGlhLm1zL2VucXVpcmUuanNcbiAqIExpY2Vuc2U6IE1JVCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXG4gKi9cblxuOyhmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZmFjdG9yeSkge1xuXHR2YXIgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhO1xuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShtYXRjaE1lZGlhKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gKGNvbnRleHRbbmFtZV0gPSBmYWN0b3J5KG1hdGNoTWVkaWEpKTtcblx0XHR9KTtcblx0fVxuXHRlbHNlIHtcblx0XHRjb250ZXh0W25hbWVdID0gZmFjdG9yeShtYXRjaE1lZGlhKTtcblx0fVxufSgnZW5xdWlyZScsIHRoaXMsIGZ1bmN0aW9uIChtYXRjaE1lZGlhKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG4gICAgLypqc2hpbnQgdW51c2VkOmZhbHNlICovXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBpdGVyYXRpbmcgb3ZlciBhIGNvbGxlY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIGZuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZWFjaChjb2xsZWN0aW9uLCBmbikge1xuICAgICAgICB2YXIgaSAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgICAgY29udDtcblxuICAgICAgICBmb3IoaTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ID0gZm4oY29sbGVjdGlvbltpXSwgaSk7XG4gICAgICAgICAgICBpZihjb250ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvL2FsbG93IGVhcmx5IGV4aXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0YXJnZXQgb2JqZWN0IGlzIGFuIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IHRoZSBvYmplY3QgdW5kZXIgdGVzdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXJyYXksIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQXJyYXkodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHRhcmdldCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRhcmdldCBvYmplY3QgaXMgYSBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCB0aGUgb2JqZWN0IHVuZGVyIHRlc3RcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGZ1bmN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSB0byBoYW5kbGUgYSBtZWRpYSBxdWVyeSBiZWluZyBtYXRjaGVkIGFuZCB1bm1hdGNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMubWF0Y2ggY2FsbGJhY2sgZm9yIHdoZW4gdGhlIG1lZGlhIHF1ZXJ5IGlzIG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy51bm1hdGNoXSBjYWxsYmFjayBmb3Igd2hlbiB0aGUgbWVkaWEgcXVlcnkgaXMgdW5tYXRjaGVkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMuc2V0dXBdIG9uZS10aW1lIGNhbGxiYWNrIHRyaWdnZXJlZCB0aGUgZmlyc3QgdGltZSBhIHF1ZXJ5IGlzIG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlZmVyU2V0dXA9ZmFsc2VdIHNob3VsZCB0aGUgc2V0dXAgY2FsbGJhY2sgYmUgcnVuIGltbWVkaWF0ZWx5LCByYXRoZXIgdGhhbiBmaXJzdCB0aW1lIHF1ZXJ5IGlzIG1hdGNoZWQ/XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gUXVlcnlIYW5kbGVyKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgIW9wdGlvbnMuZGVmZXJTZXR1cCAmJiB0aGlzLnNldHVwKCk7XG4gICAgfVxuICAgIFF1ZXJ5SGFuZGxlci5wcm90b3R5cGUgPSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvb3JkaW5hdGVzIHNldHVwIG9mIHRoZSBoYW5kbGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgc2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHRoaXMub3B0aW9ucy5zZXR1cCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXR1cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvb3JkaW5hdGVzIHNldHVwIGFuZCB0cmlnZ2VyaW5nIG9mIHRoZSBoYW5kbGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgb24gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICF0aGlzLmluaXRpYWxpc2VkICYmIHRoaXMuc2V0dXAoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tYXRjaCAmJiB0aGlzLm9wdGlvbnMubWF0Y2goKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29vcmRpbmF0ZXMgdGhlIHVubWF0Y2ggZXZlbnQgZm9yIHRoZSBoYW5kbGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgb2ZmIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMudW5tYXRjaCAmJiB0aGlzLm9wdGlvbnMudW5tYXRjaCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxsZWQgd2hlbiBhIGhhbmRsZXIgaXMgdG8gYmUgZGVzdHJveWVkLlxuICAgICAgICAgKiBkZWxlZ2F0ZXMgdG8gdGhlIGRlc3Ryb3kgb3IgdW5tYXRjaCBjYWxsYmFja3MsIGRlcGVuZGluZyBvbiBhdmFpbGFiaWxpdHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgZGVzdHJveSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRlc3Ryb3kgPyB0aGlzLm9wdGlvbnMuZGVzdHJveSgpIDogdGhpcy5vZmYoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5lcyBlcXVhbGl0eSBieSByZWZlcmVuY2UuXG4gICAgICAgICAqIGlmIG9iamVjdCBpcyBzdXBwbGllZCBjb21wYXJlIG9wdGlvbnMsIGlmIGZ1bmN0aW9uLCBjb21wYXJlIG1hdGNoIGNhbGxiYWNrXG4gICAgICAgICAqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdCB8fCBmdW5jdGlvbn0gW3RhcmdldF0gdGhlIHRhcmdldCBmb3IgY29tcGFyaXNvblxuICAgICAgICAgKi9cbiAgICAgICAgZXF1YWxzIDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zID09PSB0YXJnZXQgfHwgdGhpcy5vcHRpb25zLm1hdGNoID09PSB0YXJnZXQ7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50cyBhIHNpbmdsZSBtZWRpYSBxdWVyeSwgbWFuYWdlcyBpdCdzIHN0YXRlIGFuZCByZWdpc3RlcmVkIGhhbmRsZXJzIGZvciB0aGlzIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgdGhlIG1lZGlhIHF1ZXJ5IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzVW5jb25kaXRpb25hbD1mYWxzZV0gd2hldGhlciB0aGUgbWVkaWEgcXVlcnkgc2hvdWxkIHJ1biByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIGNvbmRpdGlvbnMgYXJlIG1ldC4gUHJpbWFyaWx5IGZvciBoZWxwaW5nIG9sZGVyIGJyb3dzZXJzIGRlYWwgd2l0aCBtb2JpbGUtZmlyc3QgZGVzaWduXG4gICAgICovXG4gICAgZnVuY3Rpb24gTWVkaWFRdWVyeShxdWVyeSwgaXNVbmNvbmRpdGlvbmFsKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5pc1VuY29uZGl0aW9uYWwgPSBpc1VuY29uZGl0aW9uYWw7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5tcWwgPSBtYXRjaE1lZGlhKHF1ZXJ5KTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbihtcWwpIHtcbiAgICAgICAgICAgIHNlbGYubXFsID0gbXFsO1xuICAgICAgICAgICAgc2VsZi5hc3Nlc3MoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tcWwuYWRkTGlzdGVuZXIodGhpcy5saXN0ZW5lcik7XG4gICAgfVxuICAgIE1lZGlhUXVlcnkucHJvdG90eXBlID0ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhZGQgYSBoYW5kbGVyIGZvciB0aGlzIHF1ZXJ5LCB0cmlnZ2VyaW5nIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBoYW5kbGVyXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIubWF0Y2ggY2FsbGJhY2sgZm9yIHdoZW4gcXVlcnkgaXMgYWN0aXZhdGVkXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtoYW5kbGVyLnVubWF0Y2hdIGNhbGxiYWNrIGZvciB3aGVuIHF1ZXJ5IGlzIGRlYWN0aXZhdGVkXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtoYW5kbGVyLnNldHVwXSBjYWxsYmFjayBmb3IgaW1tZWRpYXRlIGV4ZWN1dGlvbiB3aGVuIGEgcXVlcnkgaGFuZGxlciBpcyByZWdpc3RlcmVkXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2hhbmRsZXIuZGVmZXJTZXR1cD1mYWxzZV0gc2hvdWxkIHRoZSBzZXR1cCBjYWxsYmFjayBiZSBkZWZlcnJlZCB1bnRpbCB0aGUgZmlyc3QgdGltZSB0aGUgaGFuZGxlciBpcyBtYXRjaGVkP1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkSGFuZGxlciA6IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBxaCA9IG5ldyBRdWVyeUhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLnB1c2gocWgpO1xuXG4gICAgICAgICAgICB0aGlzLm1hdGNoZXMoKSAmJiBxaC5vbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmVzIHRoZSBnaXZlbiBoYW5kbGVyIGZyb20gdGhlIGNvbGxlY3Rpb24sIGFuZCBjYWxscyBpdCdzIGRlc3Ryb3kgbWV0aG9kc1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3QgfHwgZnVuY3Rpb259IGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gcmVtb3ZlXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVIYW5kbGVyIDogZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgICAgIGVhY2goaGFuZGxlcnMsIGZ1bmN0aW9uKGgsIGkpIHtcbiAgICAgICAgICAgICAgICBpZihoLmVxdWFscyhoYW5kbGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBoLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFoYW5kbGVycy5zcGxpY2UoaSwxKTsgLy9yZW1vdmUgZnJvbSBhcnJheSBhbmQgZXhpdCBlYWNoIGVhcmx5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSBtZWRpYSBxdWVyeSBzaG91bGQgYmUgY29uc2lkZXJlZCBhIG1hdGNoXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIG1lZGlhIHF1ZXJ5IGNhbiBiZSBjb25zaWRlcmVkIGEgbWF0Y2gsIGZhbHNlIG90aGVyd2lzZVxuICAgICAgICAgKi9cbiAgICAgICAgbWF0Y2hlcyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXFsLm1hdGNoZXMgfHwgdGhpcy5pc1VuY29uZGl0aW9uYWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFycyBhbGwgaGFuZGxlcnMgYW5kIHVuYmluZHMgZXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhciA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubXFsLnJlbW92ZUxpc3RlbmVyKHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5sZW5ndGggPSAwOyAvL2NsZWFyIGFycmF5XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICogQXNzZXNzZXMgdGhlIHF1ZXJ5LCB0dXJuaW5nIG9uIGFsbCBoYW5kbGVycyBpZiBpdCBtYXRjaGVzLCB0dXJuaW5nIHRoZW0gb2ZmIGlmIGl0IGRvZXNuJ3QgbWF0Y2hcbiAgICAgICAgICovXG4gICAgICAgIGFzc2VzcyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMubWF0Y2hlcygpID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgICAgICAgICBlYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyW2FjdGlvbl0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIHJlZ2lzdHJhdGlvbiBvZiBxdWVyeSBoYW5kbGVycy5cbiAgICAgKiBNYW5hZ2VzIHRoZSBxdWVyeSBoYW5kbGVyJ3Mgc3RhdGUgYW5kIGlzIHJlc3BvbnNpYmxlIGZvciB3aXJpbmcgdXAgYnJvd3NlciBldmVudHNcbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1lZGlhUXVlcnlEaXNwYXRjaCAoKSB7XG4gICAgICAgIGlmKCFtYXRjaE1lZGlhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hdGNoTWVkaWEgbm90IHByZXNlbnQsIGxlZ2FjeSBicm93c2VycyByZXF1aXJlIGEgcG9seWZpbGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVlcmllcyA9IHt9O1xuICAgICAgICB0aGlzLmJyb3dzZXJJc0luY2FwYWJsZSA9ICFtYXRjaE1lZGlhKCdvbmx5IGFsbCcpLm1hdGNoZXM7XG4gICAgfVxuXG4gICAgTWVkaWFRdWVyeURpc3BhdGNoLnByb3RvdHlwZSA9IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBmb3IgdGhlIGdpdmVuIG1lZGlhIHF1ZXJ5XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxIHRoZSBtZWRpYSBxdWVyeVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdCB8fCBBcnJheSB8fCBGdW5jdGlvbn0gb3B0aW9ucyBlaXRoZXIgYSBzaW5nbGUgcXVlcnkgaGFuZGxlciBvYmplY3QsIGEgZnVuY3Rpb24sIG9yIGFuIGFycmF5IG9mIHF1ZXJ5IGhhbmRsZXJzXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMubWF0Y2ggZmlyZWQgd2hlbiBxdWVyeSBtYXRjaGVkXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLnVubWF0Y2hdIGZpcmVkIHdoZW4gYSBxdWVyeSBpcyBubyBsb25nZXIgbWF0Y2hlZFxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5zZXR1cF0gZmlyZWQgd2hlbiBoYW5kbGVyIGZpcnN0IHRyaWdnZXJlZFxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlZmVyU2V0dXA9ZmFsc2VdIHdoZXRoZXIgc2V0dXAgc2hvdWxkIGJlIHJ1biBpbW1lZGlhdGVseSBvciBkZWZlcnJlZCB1bnRpbCBxdWVyeSBpcyBmaXJzdCBtYXRjaGVkXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Nob3VsZERlZ3JhZGU9ZmFsc2VdIHdoZXRoZXIgdGhpcyBwYXJ0aWN1bGFyIG1lZGlhIHF1ZXJ5IHNob3VsZCBhbHdheXMgcnVuIG9uIGluY2FwYWJsZSBicm93c2Vyc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXIgOiBmdW5jdGlvbihxLCBvcHRpb25zLCBzaG91bGREZWdyYWRlKSB7XG4gICAgICAgICAgICB2YXIgcXVlcmllcyAgICAgICAgID0gdGhpcy5xdWVyaWVzLFxuICAgICAgICAgICAgICAgIGlzVW5jb25kaXRpb25hbCA9IHNob3VsZERlZ3JhZGUgJiYgdGhpcy5icm93c2VySXNJbmNhcGFibGU7XG5cbiAgICAgICAgICAgIGlmKCFxdWVyaWVzW3FdKSB7XG4gICAgICAgICAgICAgICAgcXVlcmllc1txXSA9IG5ldyBNZWRpYVF1ZXJ5KHEsIGlzVW5jb25kaXRpb25hbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbm9ybWFsaXNlIHRvIG9iamVjdCBpbiBhbiBhcnJheVxuICAgICAgICAgICAgaWYoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IG1hdGNoIDogb3B0aW9ucyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIWlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gW29wdGlvbnNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWFjaChvcHRpb25zLCBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgcXVlcmllc1txXS5hZGRIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB1bnJlZ2lzdGVycyBhIHF1ZXJ5IGFuZCBhbGwgaXQncyBoYW5kbGVycywgb3IgYSBzcGVjaWZpYyBoYW5kbGVyIGZvciBhIHF1ZXJ5XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxIHRoZSBtZWRpYSBxdWVyeSB0byB0YXJnZXRcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3QgfHwgZnVuY3Rpb259IFtoYW5kbGVyXSBzcGVjaWZpYyBoYW5kbGVyIHRvIHVucmVnaXN0ZXJcbiAgICAgICAgICovXG4gICAgICAgIHVucmVnaXN0ZXIgOiBmdW5jdGlvbihxLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJpZXNbcV07XG5cbiAgICAgICAgICAgIGlmKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeS5yZW1vdmVIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucXVlcmllc1txXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcblxuXHRyZXR1cm4gbmV3IE1lZGlhUXVlcnlEaXNwYXRjaCgpO1xuXG59KSk7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi92ZW5kb3IvZW5xdWlyZS5qc1wiLFwiL3ZlbmRvclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuXHRDb2xvcmJveCB2MS41LjIgLSAyMDE0LTAyLTI4XG5cdGpRdWVyeSBsaWdodGJveCBhbmQgbW9kYWwgd2luZG93IHBsdWdpblxuXHQoYykgMjAxNCBKYWNrIE1vb3JlIC0gaHR0cDovL3d3dy5qYWNrbG1vb3JlLmNvbS9jb2xvcmJveFxuXHRsaWNlbnNlOiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cbihmdW5jdGlvbiAoJCwgZG9jdW1lbnQsIHdpbmRvdykge1xuXHR2YXJcblx0Ly8gRGVmYXVsdCBzZXR0aW5ncyBvYmplY3QuXG5cdC8vIFNlZSBodHRwOi8vamFja2xtb29yZS5jb20vY29sb3Jib3ggZm9yIGRldGFpbHMuXG5cdGRlZmF1bHRzID0ge1xuXHRcdC8vIGRhdGEgc291cmNlc1xuXHRcdGh0bWw6IGZhbHNlLFxuXHRcdHBob3RvOiBmYWxzZSxcblx0XHRpZnJhbWU6IGZhbHNlLFxuXHRcdGlubGluZTogZmFsc2UsXG5cblx0XHQvLyBiZWhhdmlvciBhbmQgYXBwZWFyYW5jZVxuXHRcdHRyYW5zaXRpb246IFwiZWxhc3RpY1wiLFxuXHRcdHNwZWVkOiAzMDAsXG5cdFx0ZmFkZU91dDogMzAwLFxuXHRcdHdpZHRoOiBmYWxzZSxcblx0XHRpbml0aWFsV2lkdGg6IFwiNjAwXCIsXG5cdFx0aW5uZXJXaWR0aDogZmFsc2UsXG5cdFx0bWF4V2lkdGg6IGZhbHNlLFxuXHRcdGhlaWdodDogZmFsc2UsXG5cdFx0aW5pdGlhbEhlaWdodDogXCI0NTBcIixcblx0XHRpbm5lckhlaWdodDogZmFsc2UsXG5cdFx0bWF4SGVpZ2h0OiBmYWxzZSxcblx0XHRzY2FsZVBob3RvczogdHJ1ZSxcblx0XHRzY3JvbGxpbmc6IHRydWUsXG5cdFx0b3BhY2l0eTogMC45LFxuXHRcdHByZWxvYWRpbmc6IHRydWUsXG5cdFx0Y2xhc3NOYW1lOiBmYWxzZSxcblx0XHRvdmVybGF5Q2xvc2U6IHRydWUsXG5cdFx0ZXNjS2V5OiB0cnVlLFxuXHRcdGFycm93S2V5OiB0cnVlLFxuXHRcdHRvcDogZmFsc2UsXG5cdFx0Ym90dG9tOiBmYWxzZSxcblx0XHRsZWZ0OiBmYWxzZSxcblx0XHRyaWdodDogZmFsc2UsXG5cdFx0Zml4ZWQ6IGZhbHNlLFxuXHRcdGRhdGE6IHVuZGVmaW5lZCxcblx0XHRjbG9zZUJ1dHRvbjogdHJ1ZSxcblx0XHRmYXN0SWZyYW1lOiB0cnVlLFxuXHRcdG9wZW46IGZhbHNlLFxuXHRcdHJlcG9zaXRpb246IHRydWUsXG5cdFx0bG9vcDogdHJ1ZSxcblx0XHRzbGlkZXNob3c6IGZhbHNlLFxuXHRcdHNsaWRlc2hvd0F1dG86IHRydWUsXG5cdFx0c2xpZGVzaG93U3BlZWQ6IDI1MDAsXG5cdFx0c2xpZGVzaG93U3RhcnQ6IFwic3RhcnQgc2xpZGVzaG93XCIsXG5cdFx0c2xpZGVzaG93U3RvcDogXCJzdG9wIHNsaWRlc2hvd1wiLFxuXHRcdHBob3RvUmVnZXg6IC9cXC4oZ2lmfHBuZ3xqcChlfGd8ZWcpfGJtcHxpY298d2VicHxqeHJ8c3ZnKSgoI3xcXD8pLiopPyQvaSxcblxuXHRcdC8vIGFsdGVybmF0ZSBpbWFnZSBwYXRocyBmb3IgaGlnaC1yZXMgZGlzcGxheXNcblx0XHRyZXRpbmFJbWFnZTogZmFsc2UsXG5cdFx0cmV0aW5hVXJsOiBmYWxzZSxcblx0XHRyZXRpbmFTdWZmaXg6ICdAMnguJDEnLFxuXG5cdFx0Ly8gaW50ZXJuYXRpb25hbGl6YXRpb25cblx0XHRjdXJyZW50OiBcImltYWdlIHtjdXJyZW50fSBvZiB7dG90YWx9XCIsXG5cdFx0cHJldmlvdXM6IFwicHJldmlvdXNcIixcblx0XHRuZXh0OiBcIm5leHRcIixcblx0XHRjbG9zZTogXCJjbG9zZVwiLFxuXHRcdHhockVycm9yOiBcIlRoaXMgY29udGVudCBmYWlsZWQgdG8gbG9hZC5cIixcblx0XHRpbWdFcnJvcjogXCJUaGlzIGltYWdlIGZhaWxlZCB0byBsb2FkLlwiLFxuXG5cdFx0Ly8gYWNjZXNzYmlsaXR5XG5cdFx0cmV0dXJuRm9jdXM6IHRydWUsXG5cdFx0dHJhcEZvY3VzOiB0cnVlLFxuXG5cdFx0Ly8gY2FsbGJhY2tzXG5cdFx0b25PcGVuOiBmYWxzZSxcblx0XHRvbkxvYWQ6IGZhbHNlLFxuXHRcdG9uQ29tcGxldGU6IGZhbHNlLFxuXHRcdG9uQ2xlYW51cDogZmFsc2UsXG5cdFx0b25DbG9zZWQ6IGZhbHNlLFxuXG5cdFx0cmVsOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLnJlbDtcblx0XHR9LFxuXHRcdGhyZWY6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gVXNpbmcgLmF0dHIoKSBzbyB0aGF0IHRoZSBocmVmIGNhbiBhbHNvIGJlIHVzZWQgdG8gcHJvdmlkZSBhIHNlbGVjdG9yIGZvciBpbmxpbmUgY29udGVudFxuXHRcdFx0cmV0dXJuICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdH0sXG5cdFx0dGl0bGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudGl0bGU7XG5cdFx0fVxuXHR9LFxuXG5cblx0Ly8gQWJzdHJhY3RpbmcgdGhlIEhUTUwgYW5kIGV2ZW50IGlkZW50aWZpZXJzIGZvciBlYXN5IHJlYnJhbmRpbmdcblx0Y29sb3Jib3ggPSAnY29sb3Jib3gnLFxuXHRwcmVmaXggPSAnY2JveCcsXG5cdGJveEVsZW1lbnQgPSBwcmVmaXggKyAnRWxlbWVudCcsXG5cdFxuXHQvLyBFdmVudHNcblx0ZXZlbnRfb3BlbiA9IHByZWZpeCArICdfb3BlbicsXG5cdGV2ZW50X2xvYWQgPSBwcmVmaXggKyAnX2xvYWQnLFxuXHRldmVudF9jb21wbGV0ZSA9IHByZWZpeCArICdfY29tcGxldGUnLFxuXHRldmVudF9jbGVhbnVwID0gcHJlZml4ICsgJ19jbGVhbnVwJyxcblx0ZXZlbnRfY2xvc2VkID0gcHJlZml4ICsgJ19jbG9zZWQnLFxuXHRldmVudF9wdXJnZSA9IHByZWZpeCArICdfcHVyZ2UnLFxuXG5cdC8vIENhY2hlZCBqUXVlcnkgT2JqZWN0IFZhcmlhYmxlc1xuXHQkb3ZlcmxheSxcblx0JGJveCxcblx0JHdyYXAsXG5cdCRjb250ZW50LFxuXHQkdG9wQm9yZGVyLFxuXHQkbGVmdEJvcmRlcixcblx0JHJpZ2h0Qm9yZGVyLFxuXHQkYm90dG9tQm9yZGVyLFxuXHQkcmVsYXRlZCxcblx0JHdpbmRvdyxcblx0JGxvYWRlZCxcblx0JGxvYWRpbmdCYXksXG5cdCRsb2FkaW5nT3ZlcmxheSxcblx0JHRpdGxlLFxuXHQkY3VycmVudCxcblx0JHNsaWRlc2hvdyxcblx0JG5leHQsXG5cdCRwcmV2LFxuXHQkY2xvc2UsXG5cdCRncm91cENvbnRyb2xzLFxuXHQkZXZlbnRzID0gJCgnPGEvPicpLCAvLyAkKHt9KSB3b3VsZCBiZSBwcmVmZXJlZCwgYnV0IHRoZXJlIGlzIGFuIGlzc3VlIHdpdGggalF1ZXJ5IDEuNC4yXG5cdFxuXHQvLyBWYXJpYWJsZXMgZm9yIGNhY2hlZCB2YWx1ZXMgb3IgdXNlIGFjcm9zcyBtdWx0aXBsZSBmdW5jdGlvbnNcblx0c2V0dGluZ3MsXG5cdGludGVyZmFjZUhlaWdodCxcblx0aW50ZXJmYWNlV2lkdGgsXG5cdGxvYWRlZEhlaWdodCxcblx0bG9hZGVkV2lkdGgsXG5cdGluZGV4LFxuXHRwaG90byxcblx0b3Blbixcblx0YWN0aXZlLFxuXHRjbG9zaW5nLFxuXHRsb2FkaW5nVGltZXIsXG5cdHB1YmxpY01ldGhvZCxcblx0ZGl2ID0gXCJkaXZcIixcblx0cmVxdWVzdHMgPSAwLFxuXHRwcmV2aW91c0NTUyA9IHt9LFxuXHRpbml0O1xuXG5cdC8vICoqKioqKioqKioqKioqKipcblx0Ly8gSEVMUEVSIEZVTkNUSU9OU1xuXHQvLyAqKioqKioqKioqKioqKioqXG5cdFxuXHQvLyBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgbmV3IGpRdWVyeSBvYmplY3RzXG5cdGZ1bmN0aW9uICR0YWcodGFnLCBpZCwgY3NzKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cblx0XHRpZiAoaWQpIHtcblx0XHRcdGVsZW1lbnQuaWQgPSBwcmVmaXggKyBpZDtcblx0XHR9XG5cblx0XHRpZiAoY3NzKSB7XG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBjc3M7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICQoZWxlbWVudCk7XG5cdH1cblx0XG5cdC8vIEdldCB0aGUgd2luZG93IGhlaWdodCB1c2luZyBpbm5lckhlaWdodCB3aGVuIGF2YWlsYWJsZSB0byBhdm9pZCBhbiBpc3N1ZSB3aXRoIGlPU1xuXHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC82NzI0XG5cdGZ1bmN0aW9uIHdpbmhlaWdodCgpIHtcblx0XHRyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gU2V0dGluZ3MoZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdGlmIChvcHRpb25zICE9PSBPYmplY3Qob3B0aW9ucykpIHtcblx0XHRcdG9wdGlvbnMgPSB7fTtcblx0XHR9XG5cblx0XHR0aGlzLmNhY2hlID0ge307XG5cdFx0dGhpcy5lbCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5nZXQgPSBmdW5jdGlvbihrZXkpIHtcblx0XHRcdHZhciBkYXRhQXR0cjtcblx0XHRcdHZhciB2YWx1ZTtcblxuXHRcdFx0aWYgKHRoaXMuY2FjaGVba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHZhbHVlID0gdGhpcy5jYWNoZVtrZXldO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGF0YUF0dHIgPSAkKHRoaXMuZWwpLmF0dHIoJ2RhdGEtY2JveC0nK2tleSk7XG5cblx0XHRcdFx0aWYgKGRhdGFBdHRyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRhdGFBdHRyO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBvcHRpb25zW2tleV07XG5cdFx0XHRcdH0gZWxzZSBpZiAoZGVmYXVsdHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZWZhdWx0c1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuY2FjaGVba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gJC5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwodGhpcy5lbCkgOiB2YWx1ZTtcblx0XHR9O1xuXHR9XG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBuZXh0IGFuZCBwcmV2aW91cyBtZW1iZXJzIGluIGEgZ3JvdXAuXG5cdGZ1bmN0aW9uIGdldEluZGV4KGluY3JlbWVudCkge1xuXHRcdHZhclxuXHRcdG1heCA9ICRyZWxhdGVkLmxlbmd0aCxcblx0XHRuZXdJbmRleCA9IChpbmRleCArIGluY3JlbWVudCkgJSBtYXg7XG5cdFx0XG5cdFx0cmV0dXJuIChuZXdJbmRleCA8IDApID8gbWF4ICsgbmV3SW5kZXggOiBuZXdJbmRleDtcblx0fVxuXG5cdC8vIENvbnZlcnQgJyUnIGFuZCAncHgnIHZhbHVlcyB0byBpbnRlZ2Vyc1xuXHRmdW5jdGlvbiBzZXRTaXplKHNpemUsIGRpbWVuc2lvbikge1xuXHRcdHJldHVybiBNYXRoLnJvdW5kKCgvJS8udGVzdChzaXplKSA/ICgoZGltZW5zaW9uID09PSAneCcgPyAkd2luZG93LndpZHRoKCkgOiB3aW5oZWlnaHQoKSkgLyAxMDApIDogMSkgKiBwYXJzZUludChzaXplLCAxMCkpO1xuXHR9XG5cdFxuXHQvLyBDaGVja3MgYW4gaHJlZiB0byBzZWUgaWYgaXQgaXMgYSBwaG90by5cblx0Ly8gVGhlcmUgaXMgYSBmb3JjZSBwaG90byBvcHRpb24gKHBob3RvOiB0cnVlKSBmb3IgaHJlZnMgdGhhdCBjYW5ub3QgYmUgbWF0Y2hlZCBieSB0aGUgcmVnZXguXG5cdGZ1bmN0aW9uIGlzSW1hZ2Uoc2V0dGluZ3MsIHVybCkge1xuXHRcdHJldHVybiBzZXR0aW5ncy5nZXQoJ3Bob3RvJykgfHwgc2V0dGluZ3MuZ2V0KCdwaG90b1JlZ2V4JykudGVzdCh1cmwpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmV0aW5hVXJsKHNldHRpbmdzLCB1cmwpIHtcblx0XHRyZXR1cm4gc2V0dGluZ3MuZ2V0KCdyZXRpbmFVcmwnKSAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEgPyB1cmwucmVwbGFjZShzZXR0aW5ncy5nZXQoJ3Bob3RvUmVnZXgnKSwgc2V0dGluZ3MuZ2V0KCdyZXRpbmFTdWZmaXgnKSkgOiB1cmw7XG5cdH1cblxuXHRmdW5jdGlvbiB0cmFwRm9jdXMoZSkge1xuXHRcdGlmICgnY29udGFpbnMnIGluICRib3hbMF0gJiYgISRib3hbMF0uY29udGFpbnMoZS50YXJnZXQpKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0JGJveC5mb2N1cygpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldENsYXNzKHN0cikge1xuXHRcdGlmIChzZXRDbGFzcy5zdHIgIT09IHN0cikge1xuXHRcdFx0JGJveC5hZGQoJG92ZXJsYXkpLnJlbW92ZUNsYXNzKHNldENsYXNzLnN0cikuYWRkQ2xhc3Moc3RyKTtcblx0XHRcdHNldENsYXNzLnN0ciA9IHN0cjtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRSZWxhdGVkKCkge1xuXHRcdGluZGV4ID0gMDtcblx0XHRcblx0XHRpZiAocmVsICYmIHJlbCAhPT0gJ25vZm9sbG93Jykge1xuXHRcdFx0JHJlbGF0ZWQgPSAkKCcuJyArIGJveEVsZW1lbnQpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0gJC5kYXRhKHRoaXMsIGNvbG9yYm94KTtcblx0XHRcdFx0dmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gKHNldHRpbmdzLmdldCgncmVsJykgPT09IHJlbCk7XG5cdFx0XHR9KTtcblx0XHRcdGluZGV4ID0gJHJlbGF0ZWQuaW5kZXgoc2V0dGluZ3MuZWwpO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBkaXJlY3QgY2FsbHMgdG8gQ29sb3Jib3guXG5cdFx0XHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdCRyZWxhdGVkID0gJHJlbGF0ZWQuYWRkKHNldHRpbmdzLmVsKTtcblx0XHRcdFx0aW5kZXggPSAkcmVsYXRlZC5sZW5ndGggLSAxO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQkcmVsYXRlZCA9ICQoc2V0dGluZ3MuZWwpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnQpIHtcblx0XHQvLyBmb3IgZXh0ZXJuYWwgdXNlXG5cdFx0JChkb2N1bWVudCkudHJpZ2dlcihldmVudCk7XG5cdFx0Ly8gZm9yIGludGVybmFsIHVzZVxuXHRcdCRldmVudHMudHJpZ2dlckhhbmRsZXIoZXZlbnQpO1xuXHR9XG5cblx0dmFyIHNsaWRlc2hvdyA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBhY3RpdmUsXG5cdFx0XHRjbGFzc05hbWUgPSBwcmVmaXggKyBcIlNsaWRlc2hvd19cIixcblx0XHRcdGNsaWNrID0gXCJjbGljay5cIiArIHByZWZpeCxcblx0XHRcdHRpbWVPdXQ7XG5cblx0XHRmdW5jdGlvbiBjbGVhciAoKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGltZU91dCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLmdldCgnbG9vcCcpIHx8ICRyZWxhdGVkW2luZGV4ICsgMV0pIHtcblx0XHRcdFx0Y2xlYXIoKTtcblx0XHRcdFx0dGltZU91dCA9IHNldFRpbWVvdXQocHVibGljTWV0aG9kLm5leHQsIHNldHRpbmdzLmdldCgnc2xpZGVzaG93U3BlZWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc3RhcnQoKSB7XG5cdFx0XHQkc2xpZGVzaG93XG5cdFx0XHRcdC5odG1sKHNldHRpbmdzLmdldCgnc2xpZGVzaG93U3RvcCcpKVxuXHRcdFx0XHQudW5iaW5kKGNsaWNrKVxuXHRcdFx0XHQub25lKGNsaWNrLCBzdG9wKTtcblxuXHRcdFx0JGV2ZW50c1xuXHRcdFx0XHQuYmluZChldmVudF9jb21wbGV0ZSwgc2V0KVxuXHRcdFx0XHQuYmluZChldmVudF9sb2FkLCBjbGVhcik7XG5cblx0XHRcdCRib3gucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lICsgXCJvZmZcIikuYWRkQ2xhc3MoY2xhc3NOYW1lICsgXCJvblwiKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzdG9wKCkge1xuXHRcdFx0Y2xlYXIoKTtcblx0XHRcdFxuXHRcdFx0JGV2ZW50c1xuXHRcdFx0XHQudW5iaW5kKGV2ZW50X2NvbXBsZXRlLCBzZXQpXG5cdFx0XHRcdC51bmJpbmQoZXZlbnRfbG9hZCwgY2xlYXIpO1xuXG5cdFx0XHQkc2xpZGVzaG93XG5cdFx0XHRcdC5odG1sKHNldHRpbmdzLmdldCgnc2xpZGVzaG93U3RhcnQnKSlcblx0XHRcdFx0LnVuYmluZChjbGljaylcblx0XHRcdFx0Lm9uZShjbGljaywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHB1YmxpY01ldGhvZC5uZXh0KCk7XG5cdFx0XHRcdFx0c3RhcnQoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdCRib3gucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lICsgXCJvblwiKS5hZGRDbGFzcyhjbGFzc05hbWUgKyBcIm9mZlwiKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZXNldCgpIHtcblx0XHRcdGFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0JHNsaWRlc2hvdy5oaWRlKCk7XG5cdFx0XHRjbGVhcigpO1xuXHRcdFx0JGV2ZW50c1xuXHRcdFx0XHQudW5iaW5kKGV2ZW50X2NvbXBsZXRlLCBzZXQpXG5cdFx0XHRcdC51bmJpbmQoZXZlbnRfbG9hZCwgY2xlYXIpO1xuXHRcdFx0JGJveC5yZW1vdmVDbGFzcyhjbGFzc05hbWUgKyBcIm9mZiBcIiArIGNsYXNzTmFtZSArIFwib25cIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoYWN0aXZlKSB7XG5cdFx0XHRcdGlmICghc2V0dGluZ3MuZ2V0KCdzbGlkZXNob3cnKSkge1xuXHRcdFx0XHRcdCRldmVudHMudW5iaW5kKGV2ZW50X2NsZWFudXAsIHJlc2V0KTtcblx0XHRcdFx0XHRyZXNldCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdzbGlkZXNob3cnKSAmJiAkcmVsYXRlZFsxXSkge1xuXHRcdFx0XHRcdGFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdFx0JGV2ZW50cy5vbmUoZXZlbnRfY2xlYW51cCwgcmVzZXQpO1xuXHRcdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3NsaWRlc2hvd0F1dG8nKSkge1xuXHRcdFx0XHRcdFx0c3RhcnQoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3RvcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2xpZGVzaG93LnNob3coKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0fSgpKTtcblxuXG5cdGZ1bmN0aW9uIGxhdW5jaChlbGVtZW50KSB7XG5cdFx0dmFyIG9wdGlvbnM7XG5cblx0XHRpZiAoIWNsb3NpbmcpIHtcblxuXHRcdFx0b3B0aW9ucyA9ICQoZWxlbWVudCkuZGF0YSgnY29sb3Jib3gnKTtcblxuXHRcdFx0c2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoZWxlbWVudCwgb3B0aW9ucyk7XG5cblx0XHRcdHJlbCA9IHNldHRpbmdzLmdldCgncmVsJyk7XG5cdFx0XHRcblx0XHRcdGdldFJlbGF0ZWQoKTtcblxuXHRcdFx0aWYgKCFvcGVuKSB7XG5cdFx0XHRcdG9wZW4gPSBhY3RpdmUgPSB0cnVlOyAvLyBQcmV2ZW50cyB0aGUgcGFnZS1jaGFuZ2UgYWN0aW9uIGZyb20gcXVldWluZyB1cCBpZiB0aGUgdmlzaXRvciBob2xkcyBkb3duIHRoZSBsZWZ0IG9yIHJpZ2h0IGtleXMuXG5cblx0XHRcdFx0c2V0Q2xhc3Moc2V0dGluZ3MuZ2V0KCdjbGFzc05hbWUnKSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTaG93IGNvbG9yYm94IHNvIHRoZSBzaXplcyBjYW4gYmUgY2FsY3VsYXRlZCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBqUXVlcnlcblx0XHRcdFx0JGJveC5jc3Moe3Zpc2liaWxpdHk6J2hpZGRlbicsIGRpc3BsYXk6J2Jsb2NrJ30pO1xuXHRcdFx0XHRcblx0XHRcdFx0JGxvYWRlZCA9ICR0YWcoZGl2LCAnTG9hZGVkQ29udGVudCcsICd3aWR0aDowOyBoZWlnaHQ6MDsgb3ZlcmZsb3c6aGlkZGVuOyB2aXNpYmlsaXR5OmhpZGRlbicpO1xuXHRcdFx0XHQkY29udGVudC5jc3Moe3dpZHRoOicnLCBoZWlnaHQ6Jyd9KS5hcHBlbmQoJGxvYWRlZCk7XG5cblx0XHRcdFx0Ly8gQ2FjaGUgdmFsdWVzIG5lZWRlZCBmb3Igc2l6ZSBjYWxjdWxhdGlvbnNcblx0XHRcdFx0aW50ZXJmYWNlSGVpZ2h0ID0gJHRvcEJvcmRlci5oZWlnaHQoKSArICRib3R0b21Cb3JkZXIuaGVpZ2h0KCkgKyAkY29udGVudC5vdXRlckhlaWdodCh0cnVlKSAtICRjb250ZW50LmhlaWdodCgpO1xuXHRcdFx0XHRpbnRlcmZhY2VXaWR0aCA9ICRsZWZ0Qm9yZGVyLndpZHRoKCkgKyAkcmlnaHRCb3JkZXIud2lkdGgoKSArICRjb250ZW50Lm91dGVyV2lkdGgodHJ1ZSkgLSAkY29udGVudC53aWR0aCgpO1xuXHRcdFx0XHRsb2FkZWRIZWlnaHQgPSAkbG9hZGVkLm91dGVySGVpZ2h0KHRydWUpO1xuXHRcdFx0XHRsb2FkZWRXaWR0aCA9ICRsb2FkZWQub3V0ZXJXaWR0aCh0cnVlKTtcblxuXHRcdFx0XHQvLyBPcGVucyBpbml0YWwgZW1wdHkgQ29sb3Jib3ggcHJpb3IgdG8gY29udGVudCBiZWluZyBsb2FkZWQuXG5cdFx0XHRcdHNldHRpbmdzLncgPSBzZXRTaXplKHNldHRpbmdzLmdldCgnaW5pdGlhbFdpZHRoJyksICd4Jyk7XG5cdFx0XHRcdHNldHRpbmdzLmggPSBzZXRTaXplKHNldHRpbmdzLmdldCgnaW5pdGlhbEhlaWdodCcpLCAneScpO1xuXHRcdFx0XHQkbG9hZGVkLmNzcyh7d2lkdGg6JycsIGhlaWdodDpzZXR0aW5ncy5ofSk7XG5cdFx0XHRcdHB1YmxpY01ldGhvZC5wb3NpdGlvbigpO1xuXG5cdFx0XHRcdHRyaWdnZXIoZXZlbnRfb3Blbik7XG5cdFx0XHRcdHNldHRpbmdzLmdldCgnb25PcGVuJyk7XG5cblx0XHRcdFx0JGdyb3VwQ29udHJvbHMuYWRkKCR0aXRsZSkuaGlkZSgpO1xuXG5cdFx0XHRcdCRib3guZm9jdXMoKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3RyYXBGb2N1cycpKSB7XG5cdFx0XHRcdFx0Ly8gQ29uZmluZSBmb2N1cyB0byB0aGUgbW9kYWxcblx0XHRcdFx0XHQvLyBVc2VzIGV2ZW50IGNhcHR1cmluZyB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gSUU4LVxuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG5cblx0XHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdHJhcEZvY3VzLCB0cnVlKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0JGV2ZW50cy5vbmUoZXZlbnRfY2xvc2VkLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdHJhcEZvY3VzLCB0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJldHVybiBmb2N1cyBvbiBjbG9zaW5nXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3JldHVybkZvY3VzJykpIHtcblx0XHRcdFx0XHQkZXZlbnRzLm9uZShldmVudF9jbG9zZWQsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoc2V0dGluZ3MuZWwpLmZvY3VzKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0JG92ZXJsYXkuY3NzKHtcblx0XHRcdFx0b3BhY2l0eTogcGFyc2VGbG9hdChzZXR0aW5ncy5nZXQoJ29wYWNpdHknKSksXG5cdFx0XHRcdGN1cnNvcjogc2V0dGluZ3MuZ2V0KCdvdmVybGF5Q2xvc2UnKSA/IFwicG9pbnRlclwiIDogXCJhdXRvXCIsXG5cdFx0XHRcdHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuXHRcdFx0fSkuc2hvdygpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdjbG9zZUJ1dHRvbicpKSB7XG5cdFx0XHRcdCRjbG9zZS5odG1sKHNldHRpbmdzLmdldCgnY2xvc2UnKSkuYXBwZW5kVG8oJGNvbnRlbnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGNsb3NlLmFwcGVuZFRvKCc8ZGl2Lz4nKTsgLy8gcmVwbGFjZSB3aXRoIC5kZXRhY2goKSB3aGVuIGRyb3BwaW5nIGpRdWVyeSA8IDEuNFxuXHRcdFx0fVxuXG5cdFx0XHRsb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29sb3Jib3gncyBtYXJrdXAgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGhlIERPTSBwcmlvciB0byBiZWluZyBjYWxsZWRcblx0Ly8gc28gdGhhdCB0aGUgYnJvd3NlciB3aWxsIGdvIGFoZWFkIGFuZCBsb2FkIHRoZSBDU1MgYmFja2dyb3VuZCBpbWFnZXMuXG5cdGZ1bmN0aW9uIGFwcGVuZEhUTUwoKSB7XG5cdFx0aWYgKCEkYm94ICYmIGRvY3VtZW50LmJvZHkpIHtcblx0XHRcdGluaXQgPSBmYWxzZTtcblx0XHRcdCR3aW5kb3cgPSAkKHdpbmRvdyk7XG5cdFx0XHQkYm94ID0gJHRhZyhkaXYpLmF0dHIoe1xuXHRcdFx0XHRpZDogY29sb3Jib3gsXG5cdFx0XHRcdCdjbGFzcyc6ICQuc3VwcG9ydC5vcGFjaXR5ID09PSBmYWxzZSA/IHByZWZpeCArICdJRScgOiAnJywgLy8gY2xhc3MgZm9yIG9wdGlvbmFsIElFOCAmIGxvd2VyIHRhcmdldGVkIENTUy5cblx0XHRcdFx0cm9sZTogJ2RpYWxvZycsXG5cdFx0XHRcdHRhYmluZGV4OiAnLTEnXG5cdFx0XHR9KS5oaWRlKCk7XG5cdFx0XHQkb3ZlcmxheSA9ICR0YWcoZGl2LCBcIk92ZXJsYXlcIikuaGlkZSgpO1xuXHRcdFx0JGxvYWRpbmdPdmVybGF5ID0gJChbJHRhZyhkaXYsIFwiTG9hZGluZ092ZXJsYXlcIilbMF0sJHRhZyhkaXYsIFwiTG9hZGluZ0dyYXBoaWNcIilbMF1dKTtcblx0XHRcdCR3cmFwID0gJHRhZyhkaXYsIFwiV3JhcHBlclwiKTtcblx0XHRcdCRjb250ZW50ID0gJHRhZyhkaXYsIFwiQ29udGVudFwiKS5hcHBlbmQoXG5cdFx0XHRcdCR0aXRsZSA9ICR0YWcoZGl2LCBcIlRpdGxlXCIpLFxuXHRcdFx0XHQkY3VycmVudCA9ICR0YWcoZGl2LCBcIkN1cnJlbnRcIiksXG5cdFx0XHRcdCRwcmV2ID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIvPicpLmF0dHIoe2lkOnByZWZpeCsnUHJldmlvdXMnfSksXG5cdFx0XHRcdCRuZXh0ID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIvPicpLmF0dHIoe2lkOnByZWZpeCsnTmV4dCd9KSxcblx0XHRcdFx0JHNsaWRlc2hvdyA9ICR0YWcoJ2J1dHRvbicsIFwiU2xpZGVzaG93XCIpLFxuXHRcdFx0XHQkbG9hZGluZ092ZXJsYXlcblx0XHRcdCk7XG5cblx0XHRcdCRjbG9zZSA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiLz4nKS5hdHRyKHtpZDpwcmVmaXgrJ0Nsb3NlJ30pO1xuXHRcdFx0XG5cdFx0XHQkd3JhcC5hcHBlbmQoIC8vIFRoZSAzeDMgR3JpZCB0aGF0IG1ha2VzIHVwIENvbG9yYm94XG5cdFx0XHRcdCR0YWcoZGl2KS5hcHBlbmQoXG5cdFx0XHRcdFx0JHRhZyhkaXYsIFwiVG9wTGVmdFwiKSxcblx0XHRcdFx0XHQkdG9wQm9yZGVyID0gJHRhZyhkaXYsIFwiVG9wQ2VudGVyXCIpLFxuXHRcdFx0XHRcdCR0YWcoZGl2LCBcIlRvcFJpZ2h0XCIpXG5cdFx0XHRcdCksXG5cdFx0XHRcdCR0YWcoZGl2LCBmYWxzZSwgJ2NsZWFyOmxlZnQnKS5hcHBlbmQoXG5cdFx0XHRcdFx0JGxlZnRCb3JkZXIgPSAkdGFnKGRpdiwgXCJNaWRkbGVMZWZ0XCIpLFxuXHRcdFx0XHRcdCRjb250ZW50LFxuXHRcdFx0XHRcdCRyaWdodEJvcmRlciA9ICR0YWcoZGl2LCBcIk1pZGRsZVJpZ2h0XCIpXG5cdFx0XHRcdCksXG5cdFx0XHRcdCR0YWcoZGl2LCBmYWxzZSwgJ2NsZWFyOmxlZnQnKS5hcHBlbmQoXG5cdFx0XHRcdFx0JHRhZyhkaXYsIFwiQm90dG9tTGVmdFwiKSxcblx0XHRcdFx0XHQkYm90dG9tQm9yZGVyID0gJHRhZyhkaXYsIFwiQm90dG9tQ2VudGVyXCIpLFxuXHRcdFx0XHRcdCR0YWcoZGl2LCBcIkJvdHRvbVJpZ2h0XCIpXG5cdFx0XHRcdClcblx0XHRcdCkuZmluZCgnZGl2IGRpdicpLmNzcyh7J2Zsb2F0JzogJ2xlZnQnfSk7XG5cdFx0XHRcblx0XHRcdCRsb2FkaW5nQmF5ID0gJHRhZyhkaXYsIGZhbHNlLCAncG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOjk5OTlweDsgdmlzaWJpbGl0eTpoaWRkZW47IGRpc3BsYXk6bm9uZTsgbWF4LXdpZHRoOm5vbmU7Jyk7XG5cdFx0XHRcblx0XHRcdCRncm91cENvbnRyb2xzID0gJG5leHQuYWRkKCRwcmV2KS5hZGQoJGN1cnJlbnQpLmFkZCgkc2xpZGVzaG93KTtcblxuXHRcdFx0JChkb2N1bWVudC5ib2R5KS5hcHBlbmQoJG92ZXJsYXksICRib3guYXBwZW5kKCR3cmFwLCAkbG9hZGluZ0JheSkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEFkZCBDb2xvcmJveCdzIGV2ZW50IGJpbmRpbmdzXG5cdGZ1bmN0aW9uIGFkZEJpbmRpbmdzKCkge1xuXHRcdGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihlKSB7XG5cdFx0XHQvLyBpZ25vcmUgbm9uLWxlZnQtbW91c2UtY2xpY2tzIGFuZCBjbGlja3MgbW9kaWZpZWQgd2l0aCBjdHJsIC8gY29tbWFuZCwgc2hpZnQsIG9yIGFsdC5cblx0XHRcdC8vIFNlZTogaHR0cDovL2phY2tsbW9vcmUuY29tL25vdGVzL2NsaWNrLWV2ZW50cy9cblx0XHRcdGlmICghKGUud2hpY2ggPiAxIHx8IGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSkpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRsYXVuY2godGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCRib3gpIHtcblx0XHRcdGlmICghaW5pdCkge1xuXHRcdFx0XHRpbml0ID0gdHJ1ZTtcblxuXHRcdFx0XHQvLyBBbm9ueW1vdXMgZnVuY3Rpb25zIGhlcmUga2VlcCB0aGUgcHVibGljIG1ldGhvZCBmcm9tIGJlaW5nIGNhY2hlZCwgdGhlcmVieSBhbGxvd2luZyB0aGVtIHRvIGJlIHJlZGVmaW5lZCBvbiB0aGUgZmx5LlxuXHRcdFx0XHQkbmV4dC5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cHVibGljTWV0aG9kLm5leHQoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCRwcmV2LmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRwdWJsaWNNZXRob2QucHJldigpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JGNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRwdWJsaWNNZXRob2QuY2xvc2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCRvdmVybGF5LmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdvdmVybGF5Q2xvc2UnKSkge1xuXHRcdFx0XHRcdFx0cHVibGljTWV0aG9kLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEtleSBCaW5kaW5nc1xuXHRcdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duLicgKyBwcmVmaXgsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyIGtleSA9IGUua2V5Q29kZTtcblx0XHRcdFx0XHRpZiAob3BlbiAmJiBzZXR0aW5ncy5nZXQoJ2VzY0tleScpICYmIGtleSA9PT0gMjcpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHB1YmxpY01ldGhvZC5jbG9zZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob3BlbiAmJiBzZXR0aW5ncy5nZXQoJ2Fycm93S2V5JykgJiYgJHJlbGF0ZWRbMV0gJiYgIWUuYWx0S2V5KSB7XG5cdFx0XHRcdFx0XHRpZiAoa2V5ID09PSAzNykge1xuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdCRwcmV2LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGtleSA9PT0gMzkpIHtcblx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHQkbmV4dC5jbGljaygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbigkLmZuLm9uKSkge1xuXHRcdFx0XHRcdC8vIEZvciBqUXVlcnkgMS43K1xuXHRcdFx0XHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljay4nK3ByZWZpeCwgJy4nK2JveEVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRm9yIGpRdWVyeSAxLjMueCAtPiAxLjYueFxuXHRcdFx0XHRcdC8vIFRoaXMgY29kZSBpcyBuZXZlciByZWFjaGVkIGluIGpRdWVyeSAxLjksIHNvIGRvIG5vdCBjb250YWN0IG1lIGFib3V0ICdsaXZlJyBiZWluZyByZW1vdmVkLlxuXHRcdFx0XHRcdC8vIFRoaXMgaXMgbm90IGhlcmUgZm9yIGpRdWVyeSAxLjksIGl0J3MgaGVyZSBmb3IgbGVnYWN5IHVzZXJzLlxuXHRcdFx0XHRcdCQoJy4nK2JveEVsZW1lbnQpLmxpdmUoJ2NsaWNrLicrcHJlZml4LCBjbGlja0hhbmRsZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgQ29sb3Jib3ggYWxyZWFkeSBleGlzdHMuXG5cdGlmICgkLmNvbG9yYm94KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQXBwZW5kIHRoZSBIVE1MIHdoZW4gdGhlIERPTSBsb2Fkc1xuXHQkKGFwcGVuZEhUTUwpO1xuXG5cblx0Ly8gKioqKioqKioqKioqKioqKlxuXHQvLyBQVUJMSUMgRlVOQ1RJT05TXG5cdC8vIFVzYWdlIGZvcm1hdDogJC5jb2xvcmJveC5jbG9zZSgpO1xuXHQvLyBVc2FnZSBmcm9tIHdpdGhpbiBhbiBpZnJhbWU6IHBhcmVudC5qUXVlcnkuY29sb3Jib3guY2xvc2UoKTtcblx0Ly8gKioqKioqKioqKioqKioqKlxuXHRcblx0cHVibGljTWV0aG9kID0gJC5mbltjb2xvcmJveF0gPSAkW2NvbG9yYm94XSA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xuXHRcdHZhciBzZXR0aW5ncztcblx0XHR2YXIgJG9iaiA9IHRoaXM7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdGlmICgkLmlzRnVuY3Rpb24oJG9iaikpIHsgLy8gYXNzdW1lIGEgY2FsbCB0byAkLmNvbG9yYm94XG5cdFx0XHQkb2JqID0gJCgnPGEvPicpO1xuXHRcdFx0b3B0aW9ucy5vcGVuID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKCEkb2JqWzBdKSB7IC8vIGNvbG9yYm94IGJlaW5nIGFwcGxpZWQgdG8gZW1wdHkgY29sbGVjdGlvblxuXHRcdFx0cmV0dXJuICRvYmo7XG5cdFx0fVxuXG5cblx0XHRpZiAoISRvYmpbMF0pIHsgLy8gY29sb3Jib3ggYmVpbmcgYXBwbGllZCB0byBlbXB0eSBjb2xsZWN0aW9uXG5cdFx0XHRyZXR1cm4gJG9iajtcblx0XHR9XG5cdFx0XG5cdFx0YXBwZW5kSFRNTCgpO1xuXG5cdFx0aWYgKGFkZEJpbmRpbmdzKCkpIHtcblxuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdG9wdGlvbnMub25Db21wbGV0ZSA9IGNhbGxiYWNrO1xuXHRcdFx0fVxuXG5cdFx0XHQkb2JqLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgb2xkID0gJC5kYXRhKHRoaXMsIGNvbG9yYm94KSB8fCB7fTtcblx0XHRcdFx0JC5kYXRhKHRoaXMsIGNvbG9yYm94LCAkLmV4dGVuZChvbGQsIG9wdGlvbnMpKTtcblx0XHRcdH0pLmFkZENsYXNzKGJveEVsZW1lbnQpO1xuXG5cdFx0XHRzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygkb2JqWzBdLCBvcHRpb25zKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLmdldCgnb3BlbicpKSB7XG5cdFx0XHRcdGxhdW5jaCgkb2JqWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuICRvYmo7XG5cdH07XG5cblx0cHVibGljTWV0aG9kLnBvc2l0aW9uID0gZnVuY3Rpb24gKHNwZWVkLCBsb2FkZWRDYWxsYmFjaykge1xuXHRcdHZhclxuXHRcdGNzcyxcblx0XHR0b3AgPSAwLFxuXHRcdGxlZnQgPSAwLFxuXHRcdG9mZnNldCA9ICRib3gub2Zmc2V0KCksXG5cdFx0c2Nyb2xsVG9wLFxuXHRcdHNjcm9sbExlZnQ7XG5cdFx0XG5cdFx0JHdpbmRvdy51bmJpbmQoJ3Jlc2l6ZS4nICsgcHJlZml4KTtcblxuXHRcdC8vIHJlbW92ZSB0aGUgbW9kYWwgc28gdGhhdCBpdCBkb2Vzbid0IGluZmx1ZW5jZSB0aGUgZG9jdW1lbnQgd2lkdGgvaGVpZ2h0XG5cdFx0JGJveC5jc3Moe3RvcDogLTllNCwgbGVmdDogLTllNH0pO1xuXG5cdFx0c2Nyb2xsVG9wID0gJHdpbmRvdy5zY3JvbGxUb3AoKTtcblx0XHRzY3JvbGxMZWZ0ID0gJHdpbmRvdy5zY3JvbGxMZWZ0KCk7XG5cblx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdmaXhlZCcpKSB7XG5cdFx0XHRvZmZzZXQudG9wIC09IHNjcm9sbFRvcDtcblx0XHRcdG9mZnNldC5sZWZ0IC09IHNjcm9sbExlZnQ7XG5cdFx0XHQkYm94LmNzcyh7cG9zaXRpb246ICdmaXhlZCd9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9wID0gc2Nyb2xsVG9wO1xuXHRcdFx0bGVmdCA9IHNjcm9sbExlZnQ7XG5cdFx0XHQkYm94LmNzcyh7cG9zaXRpb246ICdhYnNvbHV0ZSd9KTtcblx0XHR9XG5cblx0XHQvLyBrZWVwcyB0aGUgdG9wIGFuZCBsZWZ0IHBvc2l0aW9ucyB3aXRoaW4gdGhlIGJyb3dzZXIncyB2aWV3cG9ydC5cblx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdyaWdodCcpICE9PSBmYWxzZSkge1xuXHRcdFx0bGVmdCArPSBNYXRoLm1heCgkd2luZG93LndpZHRoKCkgLSBzZXR0aW5ncy53IC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aCAtIHNldFNpemUoc2V0dGluZ3MuZ2V0KCdyaWdodCcpLCAneCcpLCAwKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmdldCgnbGVmdCcpICE9PSBmYWxzZSkge1xuXHRcdFx0bGVmdCArPSBzZXRTaXplKHNldHRpbmdzLmdldCgnbGVmdCcpLCAneCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZWZ0ICs9IE1hdGgucm91bmQoTWF0aC5tYXgoJHdpbmRvdy53aWR0aCgpIC0gc2V0dGluZ3MudyAtIGxvYWRlZFdpZHRoIC0gaW50ZXJmYWNlV2lkdGgsIDApIC8gMik7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5nZXQoJ2JvdHRvbScpICE9PSBmYWxzZSkge1xuXHRcdFx0dG9wICs9IE1hdGgubWF4KHdpbmhlaWdodCgpIC0gc2V0dGluZ3MuaCAtIGxvYWRlZEhlaWdodCAtIGludGVyZmFjZUhlaWdodCAtIHNldFNpemUoc2V0dGluZ3MuZ2V0KCdib3R0b20nKSwgJ3knKSwgMCk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5nZXQoJ3RvcCcpICE9PSBmYWxzZSkge1xuXHRcdFx0dG9wICs9IHNldFNpemUoc2V0dGluZ3MuZ2V0KCd0b3AnKSwgJ3knKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9wICs9IE1hdGgucm91bmQoTWF0aC5tYXgod2luaGVpZ2h0KCkgLSBzZXR0aW5ncy5oIC0gbG9hZGVkSGVpZ2h0IC0gaW50ZXJmYWNlSGVpZ2h0LCAwKSAvIDIpO1xuXHRcdH1cblxuXHRcdCRib3guY3NzKHt0b3A6IG9mZnNldC50b3AsIGxlZnQ6IG9mZnNldC5sZWZ0LCB2aXNpYmlsaXR5Oid2aXNpYmxlJ30pO1xuXHRcdFxuXHRcdC8vIHRoaXMgZ2l2ZXMgdGhlIHdyYXBwZXIgcGxlbnR5IG9mIGJyZWF0aGluZyByb29tIHNvIGl0J3MgZmxvYXRlZCBjb250ZW50cyBjYW4gbW92ZSBhcm91bmQgc21vb3RobHksXG5cdFx0Ly8gYnV0IGl0IGhhcyB0byBiZSBzaHJhbmsgZG93biBhcm91bmQgdGhlIHNpemUgb2YgZGl2I2NvbG9yYm94IHdoZW4gaXQncyBkb25lLiAgSWYgbm90LFxuXHRcdC8vIGl0IGNhbiBpbnZva2UgYW4gb2JzY3VyZSBJRSBidWcgd2hlbiB1c2luZyBpZnJhbWVzLlxuXHRcdCR3cmFwWzBdLnN0eWxlLndpZHRoID0gJHdyYXBbMF0uc3R5bGUuaGVpZ2h0ID0gXCI5OTk5cHhcIjtcblx0XHRcblx0XHRmdW5jdGlvbiBtb2RhbERpbWVuc2lvbnMoKSB7XG5cdFx0XHQkdG9wQm9yZGVyWzBdLnN0eWxlLndpZHRoID0gJGJvdHRvbUJvcmRlclswXS5zdHlsZS53aWR0aCA9ICRjb250ZW50WzBdLnN0eWxlLndpZHRoID0gKHBhcnNlSW50KCRib3hbMF0uc3R5bGUud2lkdGgsMTApIC0gaW50ZXJmYWNlV2lkdGgpKydweCc7XG5cdFx0XHQkY29udGVudFswXS5zdHlsZS5oZWlnaHQgPSAkbGVmdEJvcmRlclswXS5zdHlsZS5oZWlnaHQgPSAkcmlnaHRCb3JkZXJbMF0uc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KCRib3hbMF0uc3R5bGUuaGVpZ2h0LDEwKSAtIGludGVyZmFjZUhlaWdodCkrJ3B4Jztcblx0XHR9XG5cblx0XHRjc3MgPSB7d2lkdGg6IHNldHRpbmdzLncgKyBsb2FkZWRXaWR0aCArIGludGVyZmFjZVdpZHRoLCBoZWlnaHQ6IHNldHRpbmdzLmggKyBsb2FkZWRIZWlnaHQgKyBpbnRlcmZhY2VIZWlnaHQsIHRvcDogdG9wLCBsZWZ0OiBsZWZ0fTtcblxuXHRcdC8vIHNldHRpbmcgdGhlIHNwZWVkIHRvIDAgaWYgdGhlIGNvbnRlbnQgaGFzbid0IGNoYW5nZWQgc2l6ZSBvciBwb3NpdGlvblxuXHRcdGlmIChzcGVlZCkge1xuXHRcdFx0dmFyIHRlbXBTcGVlZCA9IDA7XG5cdFx0XHQkLmVhY2goY3NzLCBmdW5jdGlvbihpKXtcblx0XHRcdFx0aWYgKGNzc1tpXSAhPT0gcHJldmlvdXNDU1NbaV0pIHtcblx0XHRcdFx0XHR0ZW1wU3BlZWQgPSBzcGVlZDtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0c3BlZWQgPSB0ZW1wU3BlZWQ7XG5cdFx0fVxuXG5cdFx0cHJldmlvdXNDU1MgPSBjc3M7XG5cblx0XHRpZiAoIXNwZWVkKSB7XG5cdFx0XHQkYm94LmNzcyhjc3MpO1xuXHRcdH1cblxuXHRcdCRib3guZGVxdWV1ZSgpLmFuaW1hdGUoY3NzLCB7XG5cdFx0XHRkdXJhdGlvbjogc3BlZWQgfHwgMCxcblx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdG1vZGFsRGltZW5zaW9ucygpO1xuXHRcdFx0XHRcblx0XHRcdFx0YWN0aXZlID0gZmFsc2U7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBzaHJpbmsgdGhlIHdyYXBwZXIgZG93biB0byBleGFjdGx5IHRoZSBzaXplIG9mIGNvbG9yYm94IHRvIGF2b2lkIGEgYnVnIGluIElFJ3MgaWZyYW1lIGltcGxlbWVudGF0aW9uLlxuXHRcdFx0XHQkd3JhcFswXS5zdHlsZS53aWR0aCA9IChzZXR0aW5ncy53ICsgbG9hZGVkV2lkdGggKyBpbnRlcmZhY2VXaWR0aCkgKyBcInB4XCI7XG5cdFx0XHRcdCR3cmFwWzBdLnN0eWxlLmhlaWdodCA9IChzZXR0aW5ncy5oICsgbG9hZGVkSGVpZ2h0ICsgaW50ZXJmYWNlSGVpZ2h0KSArIFwicHhcIjtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3JlcG9zaXRpb24nKSkge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyAgLy8gc21hbGwgZGVsYXkgYmVmb3JlIGJpbmRpbmcgb25yZXNpemUgZHVlIHRvIGFuIElFOCBidWcuXG5cdFx0XHRcdFx0XHQkd2luZG93LmJpbmQoJ3Jlc2l6ZS4nICsgcHJlZml4LCBwdWJsaWNNZXRob2QucG9zaXRpb24pO1xuXHRcdFx0XHRcdH0sIDEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGxvYWRlZENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0bG9hZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHN0ZXA6IG1vZGFsRGltZW5zaW9uc1xuXHRcdH0pO1xuXHR9O1xuXG5cdHB1YmxpY01ldGhvZC5yZXNpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdHZhciBzY3JvbGx0b3A7XG5cdFx0XG5cdFx0aWYgKG9wZW4pIHtcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdFx0XG5cdFx0XHRpZiAob3B0aW9ucy53aWR0aCkge1xuXHRcdFx0XHRzZXR0aW5ncy53ID0gc2V0U2l6ZShvcHRpb25zLndpZHRoLCAneCcpIC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuaW5uZXJXaWR0aCkge1xuXHRcdFx0XHRzZXR0aW5ncy53ID0gc2V0U2l6ZShvcHRpb25zLmlubmVyV2lkdGgsICd4Jyk7XG5cdFx0XHR9XG5cblx0XHRcdCRsb2FkZWQuY3NzKHt3aWR0aDogc2V0dGluZ3Mud30pO1xuXHRcdFx0XG5cdFx0XHRpZiAob3B0aW9ucy5oZWlnaHQpIHtcblx0XHRcdFx0c2V0dGluZ3MuaCA9IHNldFNpemUob3B0aW9ucy5oZWlnaHQsICd5JykgLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmlubmVySGVpZ2h0KSB7XG5cdFx0XHRcdHNldHRpbmdzLmggPSBzZXRTaXplKG9wdGlvbnMuaW5uZXJIZWlnaHQsICd5Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghb3B0aW9ucy5pbm5lckhlaWdodCAmJiAhb3B0aW9ucy5oZWlnaHQpIHtcblx0XHRcdFx0c2Nyb2xsdG9wID0gJGxvYWRlZC5zY3JvbGxUb3AoKTtcblx0XHRcdFx0JGxvYWRlZC5jc3Moe2hlaWdodDogXCJhdXRvXCJ9KTtcblx0XHRcdFx0c2V0dGluZ3MuaCA9ICRsb2FkZWQuaGVpZ2h0KCk7XG5cdFx0XHR9XG5cblx0XHRcdCRsb2FkZWQuY3NzKHtoZWlnaHQ6IHNldHRpbmdzLmh9KTtcblxuXHRcdFx0aWYoc2Nyb2xsdG9wKSB7XG5cdFx0XHRcdCRsb2FkZWQuc2Nyb2xsVG9wKHNjcm9sbHRvcCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHB1YmxpY01ldGhvZC5wb3NpdGlvbihzZXR0aW5ncy5nZXQoJ3RyYW5zaXRpb24nKSA9PT0gXCJub25lXCIgPyAwIDogc2V0dGluZ3MuZ2V0KCdzcGVlZCcpKTtcblx0XHR9XG5cdH07XG5cblx0cHVibGljTWV0aG9kLnByZXAgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdFx0aWYgKCFvcGVuKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBjYWxsYmFjaywgc3BlZWQgPSBzZXR0aW5ncy5nZXQoJ3RyYW5zaXRpb24nKSA9PT0gXCJub25lXCIgPyAwIDogc2V0dGluZ3MuZ2V0KCdzcGVlZCcpO1xuXG5cdFx0JGxvYWRlZC5yZW1vdmUoKTtcblxuXHRcdCRsb2FkZWQgPSAkdGFnKGRpdiwgJ0xvYWRlZENvbnRlbnQnKS5hcHBlbmQob2JqZWN0KTtcblx0XHRcblx0XHRmdW5jdGlvbiBnZXRXaWR0aCgpIHtcblx0XHRcdHNldHRpbmdzLncgPSBzZXR0aW5ncy53IHx8ICRsb2FkZWQud2lkdGgoKTtcblx0XHRcdHNldHRpbmdzLncgPSBzZXR0aW5ncy5tdyAmJiBzZXR0aW5ncy5tdyA8IHNldHRpbmdzLncgPyBzZXR0aW5ncy5tdyA6IHNldHRpbmdzLnc7XG5cdFx0XHRyZXR1cm4gc2V0dGluZ3Mudztcblx0XHR9XG5cdFx0ZnVuY3Rpb24gZ2V0SGVpZ2h0KCkge1xuXHRcdFx0c2V0dGluZ3MuaCA9IHNldHRpbmdzLmggfHwgJGxvYWRlZC5oZWlnaHQoKTtcblx0XHRcdHNldHRpbmdzLmggPSBzZXR0aW5ncy5taCAmJiBzZXR0aW5ncy5taCA8IHNldHRpbmdzLmggPyBzZXR0aW5ncy5taCA6IHNldHRpbmdzLmg7XG5cdFx0XHRyZXR1cm4gc2V0dGluZ3MuaDtcblx0XHR9XG5cdFx0XG5cdFx0JGxvYWRlZC5oaWRlKClcblx0XHQuYXBwZW5kVG8oJGxvYWRpbmdCYXkuc2hvdygpKS8vIGNvbnRlbnQgaGFzIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gZm9yIGFjY3VyYXRlIHNpemUgY2FsY3VsYXRpb25zLlxuXHRcdC5jc3Moe3dpZHRoOiBnZXRXaWR0aCgpLCBvdmVyZmxvdzogc2V0dGluZ3MuZ2V0KCdzY3JvbGxpbmcnKSA/ICdhdXRvJyA6ICdoaWRkZW4nfSlcblx0XHQuY3NzKHtoZWlnaHQ6IGdldEhlaWdodCgpfSkvLyBzZXRzIHRoZSBoZWlnaHQgaW5kZXBlbmRlbnRseSBmcm9tIHRoZSB3aWR0aCBpbiBjYXNlIHRoZSBuZXcgd2lkdGggaW5mbHVlbmNlcyB0aGUgdmFsdWUgb2YgaGVpZ2h0LlxuXHRcdC5wcmVwZW5kVG8oJGNvbnRlbnQpO1xuXHRcdFxuXHRcdCRsb2FkaW5nQmF5LmhpZGUoKTtcblx0XHRcblx0XHQvLyBmbG9hdGluZyB0aGUgSU1HIHJlbW92ZXMgdGhlIGJvdHRvbSBsaW5lLWhlaWdodCBhbmQgZml4ZWQgYSBwcm9ibGVtIHdoZXJlIElFIG1pc2NhbGN1bGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSBwYXJlbnQgZWxlbWVudCBhcyAxMDAlIG9mIHRoZSBkb2N1bWVudCB3aWR0aC5cblx0XHRcblx0XHQkKHBob3RvKS5jc3MoeydmbG9hdCc6ICdub25lJ30pO1xuXG5cdFx0c2V0Q2xhc3Moc2V0dGluZ3MuZ2V0KCdjbGFzc05hbWUnKSk7XG5cblx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciB0b3RhbCA9ICRyZWxhdGVkLmxlbmd0aCxcblx0XHRcdFx0aWZyYW1lLFxuXHRcdFx0XHRjb21wbGV0ZTtcblx0XHRcdFxuXHRcdFx0aWYgKCFvcGVuKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlRmlsdGVyKCkgeyAvLyBOZWVkZWQgZm9yIElFOCBpbiB2ZXJzaW9ucyBvZiBqUXVlcnkgcHJpb3IgdG8gMS43LjJcblx0XHRcdFx0aWYgKCQuc3VwcG9ydC5vcGFjaXR5ID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdCRib3hbMF0uc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdmaWx0ZXInKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdCRsb2FkaW5nT3ZlcmxheS5oaWRlKCk7XG5cdFx0XHRcdHRyaWdnZXIoZXZlbnRfY29tcGxldGUpO1xuXHRcdFx0XHRzZXR0aW5ncy5nZXQoJ29uQ29tcGxldGUnKTtcblx0XHRcdH07XG5cblx0XHRcdFxuXHRcdFx0JHRpdGxlLmh0bWwoc2V0dGluZ3MuZ2V0KCd0aXRsZScpKS5zaG93KCk7XG5cdFx0XHQkbG9hZGVkLnNob3coKTtcblx0XHRcdFxuXHRcdFx0aWYgKHRvdGFsID4gMSkgeyAvLyBoYW5kbGUgZ3JvdXBpbmdcblx0XHRcdFx0aWYgKHR5cGVvZiBzZXR0aW5ncy5nZXQoJ2N1cnJlbnQnKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdCRjdXJyZW50Lmh0bWwoc2V0dGluZ3MuZ2V0KCdjdXJyZW50JykucmVwbGFjZSgne2N1cnJlbnR9JywgaW5kZXggKyAxKS5yZXBsYWNlKCd7dG90YWx9JywgdG90YWwpKS5zaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdCRuZXh0WyhzZXR0aW5ncy5nZXQoJ2xvb3AnKSB8fCBpbmRleCA8IHRvdGFsIC0gMSkgPyBcInNob3dcIiA6IFwiaGlkZVwiXSgpLmh0bWwoc2V0dGluZ3MuZ2V0KCduZXh0JykpO1xuXHRcdFx0XHQkcHJldlsoc2V0dGluZ3MuZ2V0KCdsb29wJykgfHwgaW5kZXgpID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKS5odG1sKHNldHRpbmdzLmdldCgncHJldmlvdXMnKSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRzbGlkZXNob3coKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFByZWxvYWRzIGltYWdlcyB3aXRoaW4gYSByZWwgZ3JvdXBcblx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgncHJlbG9hZGluZycpKSB7XG5cdFx0XHRcdFx0JC5lYWNoKFtnZXRJbmRleCgtMSksIGdldEluZGV4KDEpXSwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHZhciBpbWcsXG5cdFx0XHRcdFx0XHRcdGkgPSAkcmVsYXRlZFt0aGlzXSxcblx0XHRcdFx0XHRcdFx0c2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoaSwgJC5kYXRhKGksIGNvbG9yYm94KSksXG5cdFx0XHRcdFx0XHRcdHNyYyA9IHNldHRpbmdzLmdldCgnaHJlZicpO1xuXG5cdFx0XHRcdFx0XHRpZiAoc3JjICYmIGlzSW1hZ2Uoc2V0dGluZ3MsIHNyYykpIHtcblx0XHRcdFx0XHRcdFx0c3JjID0gcmV0aW5hVXJsKHNldHRpbmdzLCBzcmMpO1xuXHRcdFx0XHRcdFx0XHRpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRcdFx0XHRcdFx0aW1nLnNyYyA9IHNyYztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGdyb3VwQ29udHJvbHMuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdpZnJhbWUnKSkge1xuXHRcdFx0XHRpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmICgnZnJhbWVCb3JkZXInIGluIGlmcmFtZSkge1xuXHRcdFx0XHRcdGlmcmFtZS5mcmFtZUJvcmRlciA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmICgnYWxsb3dUcmFuc3BhcmVuY3knIGluIGlmcmFtZSkge1xuXHRcdFx0XHRcdGlmcmFtZS5hbGxvd1RyYW5zcGFyZW5jeSA9IFwidHJ1ZVwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFzZXR0aW5ncy5nZXQoJ3Njcm9sbGluZycpKSB7XG5cdFx0XHRcdFx0aWZyYW1lLnNjcm9sbGluZyA9IFwibm9cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0JChpZnJhbWUpXG5cdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0c3JjOiBzZXR0aW5ncy5nZXQoJ2hyZWYnKSxcblx0XHRcdFx0XHRcdG5hbWU6IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksIC8vIGdpdmUgdGhlIGlmcmFtZSBhIHVuaXF1ZSBuYW1lIHRvIHByZXZlbnQgY2FjaGluZ1xuXHRcdFx0XHRcdFx0J2NsYXNzJzogcHJlZml4ICsgJ0lmcmFtZScsXG5cdFx0XHRcdFx0XHRhbGxvd0Z1bGxTY3JlZW4gOiB0cnVlIC8vIGFsbG93IEhUTUw1IHZpZGVvIHRvIGdvIGZ1bGxzY3JlZW5cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5vbmUoJ2xvYWQnLCBjb21wbGV0ZSlcblx0XHRcdFx0XHQuYXBwZW5kVG8oJGxvYWRlZCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkZXZlbnRzLm9uZShldmVudF9wdXJnZSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmcmFtZS5zcmMgPSBcIi8vYWJvdXQ6YmxhbmtcIjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKHNldHRpbmdzLmdldCgnZmFzdElmcmFtZScpKSB7XG5cdFx0XHRcdFx0JChpZnJhbWUpLnRyaWdnZXIoJ2xvYWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29tcGxldGUoKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLmdldCgndHJhbnNpdGlvbicpID09PSAnZmFkZScpIHtcblx0XHRcdFx0JGJveC5mYWRlVG8oc3BlZWQsIDEsIHJlbW92ZUZpbHRlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZW1vdmVGaWx0ZXIoKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5nZXQoJ3RyYW5zaXRpb24nKSA9PT0gJ2ZhZGUnKSB7XG5cdFx0XHQkYm94LmZhZGVUbyhzcGVlZCwgMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRwdWJsaWNNZXRob2QucG9zaXRpb24oMCwgY2FsbGJhY2spO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHB1YmxpY01ldGhvZC5wb3NpdGlvbihzcGVlZCwgY2FsbGJhY2spO1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBsb2FkICgpIHtcblx0XHR2YXIgaHJlZiwgc2V0UmVzaXplLCBwcmVwID0gcHVibGljTWV0aG9kLnByZXAsICRpbmxpbmUsIHJlcXVlc3QgPSArK3JlcXVlc3RzO1xuXHRcdFxuXHRcdGFjdGl2ZSA9IHRydWU7XG5cdFx0XG5cdFx0cGhvdG8gPSBmYWxzZTtcblx0XHRcblx0XHR0cmlnZ2VyKGV2ZW50X3B1cmdlKTtcblx0XHR0cmlnZ2VyKGV2ZW50X2xvYWQpO1xuXHRcdHNldHRpbmdzLmdldCgnb25Mb2FkJyk7XG5cdFx0XG5cdFx0c2V0dGluZ3MuaCA9IHNldHRpbmdzLmdldCgnaGVpZ2h0JykgP1xuXHRcdFx0XHRzZXRTaXplKHNldHRpbmdzLmdldCgnaGVpZ2h0JyksICd5JykgLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQgOlxuXHRcdFx0XHRzZXR0aW5ncy5nZXQoJ2lubmVySGVpZ2h0JykgJiYgc2V0U2l6ZShzZXR0aW5ncy5nZXQoJ2lubmVySGVpZ2h0JyksICd5Jyk7XG5cdFx0XG5cdFx0c2V0dGluZ3MudyA9IHNldHRpbmdzLmdldCgnd2lkdGgnKSA/XG5cdFx0XHRcdHNldFNpemUoc2V0dGluZ3MuZ2V0KCd3aWR0aCcpLCAneCcpIC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aCA6XG5cdFx0XHRcdHNldHRpbmdzLmdldCgnaW5uZXJXaWR0aCcpICYmIHNldFNpemUoc2V0dGluZ3MuZ2V0KCdpbm5lcldpZHRoJyksICd4Jyk7XG5cdFx0XG5cdFx0Ly8gU2V0cyB0aGUgbWluaW11bSBkaW1lbnNpb25zIGZvciB1c2UgaW4gaW1hZ2Ugc2NhbGluZ1xuXHRcdHNldHRpbmdzLm13ID0gc2V0dGluZ3Mudztcblx0XHRzZXR0aW5ncy5taCA9IHNldHRpbmdzLmg7XG5cdFx0XG5cdFx0Ly8gUmUtZXZhbHVhdGUgdGhlIG1pbmltdW0gd2lkdGggYW5kIGhlaWdodCBiYXNlZCBvbiBtYXhXaWR0aCBhbmQgbWF4SGVpZ2h0IHZhbHVlcy5cblx0XHQvLyBJZiB0aGUgd2lkdGggb3IgaGVpZ2h0IGV4Y2VlZCB0aGUgbWF4V2lkdGggb3IgbWF4SGVpZ2h0LCB1c2UgdGhlIG1heGltdW0gdmFsdWVzIGluc3RlYWQuXG5cdFx0aWYgKHNldHRpbmdzLmdldCgnbWF4V2lkdGgnKSkge1xuXHRcdFx0c2V0dGluZ3MubXcgPSBzZXRTaXplKHNldHRpbmdzLmdldCgnbWF4V2lkdGgnKSwgJ3gnKSAtIGxvYWRlZFdpZHRoIC0gaW50ZXJmYWNlV2lkdGg7XG5cdFx0XHRzZXR0aW5ncy5tdyA9IHNldHRpbmdzLncgJiYgc2V0dGluZ3MudyA8IHNldHRpbmdzLm13ID8gc2V0dGluZ3MudyA6IHNldHRpbmdzLm13O1xuXHRcdH1cblx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdtYXhIZWlnaHQnKSkge1xuXHRcdFx0c2V0dGluZ3MubWggPSBzZXRTaXplKHNldHRpbmdzLmdldCgnbWF4SGVpZ2h0JyksICd5JykgLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQ7XG5cdFx0XHRzZXR0aW5ncy5taCA9IHNldHRpbmdzLmggJiYgc2V0dGluZ3MuaCA8IHNldHRpbmdzLm1oID8gc2V0dGluZ3MuaCA6IHNldHRpbmdzLm1oO1xuXHRcdH1cblx0XHRcblx0XHRocmVmID0gc2V0dGluZ3MuZ2V0KCdocmVmJyk7XG5cdFx0XG5cdFx0bG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHQkbG9hZGluZ092ZXJsYXkuc2hvdygpO1xuXHRcdH0sIDEwMCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLmdldCgnaW5saW5lJykpIHtcblx0XHRcdC8vIEluc2VydHMgYW4gZW1wdHkgcGxhY2Vob2xkZXIgd2hlcmUgaW5saW5lIGNvbnRlbnQgaXMgYmVpbmcgcHVsbGVkIGZyb20uXG5cdFx0XHQvLyBBbiBldmVudCBpcyBib3VuZCB0byBwdXQgaW5saW5lIGNvbnRlbnQgYmFjayB3aGVuIENvbG9yYm94IGNsb3NlcyBvciBsb2FkcyBuZXcgY29udGVudC5cblx0XHRcdCRpbmxpbmUgPSAkdGFnKGRpdikuaGlkZSgpLmluc2VydEJlZm9yZSgkKGhyZWYpWzBdKTtcblxuXHRcdFx0JGV2ZW50cy5vbmUoZXZlbnRfcHVyZ2UsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JGlubGluZS5yZXBsYWNlV2l0aCgkbG9hZGVkLmNoaWxkcmVuKCkpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHByZXAoJChocmVmKSk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5nZXQoJ2lmcmFtZScpKSB7XG5cdFx0XHQvLyBJRnJhbWUgZWxlbWVudCB3b24ndCBiZSBhZGRlZCB0byB0aGUgRE9NIHVudGlsIGl0IGlzIHJlYWR5IHRvIGJlIGRpc3BsYXllZCxcblx0XHRcdC8vIHRvIGF2b2lkIHByb2JsZW1zIHdpdGggRE9NLXJlYWR5IEpTIHRoYXQgbWlnaHQgYmUgdHJ5aW5nIHRvIHJ1biBpbiB0aGF0IGlmcmFtZS5cblx0XHRcdHByZXAoXCIgXCIpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuZ2V0KCdodG1sJykpIHtcblx0XHRcdHByZXAoc2V0dGluZ3MuZ2V0KCdodG1sJykpO1xuXHRcdH0gZWxzZSBpZiAoaXNJbWFnZShzZXR0aW5ncywgaHJlZikpIHtcblxuXHRcdFx0aHJlZiA9IHJldGluYVVybChzZXR0aW5ncywgaHJlZik7XG5cblx0XHRcdHBob3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cblx0XHRcdCQocGhvdG8pXG5cdFx0XHQuYWRkQ2xhc3MocHJlZml4ICsgJ1Bob3RvJylcblx0XHRcdC5iaW5kKCdlcnJvcicsZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRwcmVwKCR0YWcoZGl2LCAnRXJyb3InKS5odG1sKHNldHRpbmdzLmdldCgnaW1nRXJyb3InKSkpO1xuXHRcdFx0fSlcblx0XHRcdC5vbmUoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBwZXJjZW50O1xuXG5cdFx0XHRcdGlmIChyZXF1ZXN0ICE9PSByZXF1ZXN0cykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQuZWFjaChbJ2FsdCcsICdsb25nZGVzYycsICdhcmlhLWRlc2NyaWJlZGJ5J10sIGZ1bmN0aW9uKGksdmFsKXtcblx0XHRcdFx0XHR2YXIgYXR0ciA9ICQoc2V0dGluZ3MuZWwpLmF0dHIodmFsKSB8fCAkKHNldHRpbmdzLmVsKS5hdHRyKCdkYXRhLScrdmFsKTtcblx0XHRcdFx0XHRpZiAoYXR0cikge1xuXHRcdFx0XHRcdFx0cGhvdG8uc2V0QXR0cmlidXRlKHZhbCwgYXR0cik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoc2V0dGluZ3MuZ2V0KCdyZXRpbmFJbWFnZScpICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuXHRcdFx0XHRcdHBob3RvLmhlaWdodCA9IHBob3RvLmhlaWdodCAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuXHRcdFx0XHRcdHBob3RvLndpZHRoID0gcGhvdG8ud2lkdGggLyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5nZXQoJ3NjYWxlUGhvdG9zJykpIHtcblx0XHRcdFx0XHRzZXRSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRwaG90by5oZWlnaHQgLT0gcGhvdG8uaGVpZ2h0ICogcGVyY2VudDtcblx0XHRcdFx0XHRcdHBob3RvLndpZHRoIC09IHBob3RvLndpZHRoICogcGVyY2VudDtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGlmIChzZXR0aW5ncy5tdyAmJiBwaG90by53aWR0aCA+IHNldHRpbmdzLm13KSB7XG5cdFx0XHRcdFx0XHRwZXJjZW50ID0gKHBob3RvLndpZHRoIC0gc2V0dGluZ3MubXcpIC8gcGhvdG8ud2lkdGg7XG5cdFx0XHRcdFx0XHRzZXRSZXNpemUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLm1oICYmIHBob3RvLmhlaWdodCA+IHNldHRpbmdzLm1oKSB7XG5cdFx0XHRcdFx0XHRwZXJjZW50ID0gKHBob3RvLmhlaWdodCAtIHNldHRpbmdzLm1oKSAvIHBob3RvLmhlaWdodDtcblx0XHRcdFx0XHRcdHNldFJlc2l6ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHNldHRpbmdzLmgpIHtcblx0XHRcdFx0XHRwaG90by5zdHlsZS5tYXJnaW5Ub3AgPSBNYXRoLm1heChzZXR0aW5ncy5taCAtIHBob3RvLmhlaWdodCwgMCkgLyAyICsgJ3B4Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCRyZWxhdGVkWzFdICYmIChzZXR0aW5ncy5nZXQoJ2xvb3AnKSB8fCAkcmVsYXRlZFtpbmRleCArIDFdKSkge1xuXHRcdFx0XHRcdHBob3RvLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRcdFx0XHRwaG90by5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cHVibGljTWV0aG9kLm5leHQoKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cGhvdG8uc3R5bGUud2lkdGggPSBwaG90by53aWR0aCArICdweCc7XG5cdFx0XHRcdHBob3RvLnN0eWxlLmhlaWdodCA9IHBob3RvLmhlaWdodCArICdweCc7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IC8vIEEgcGF1c2UgYmVjYXVzZSBDaHJvbWUgd2lsbCBzb21ldGltZXMgcmVwb3J0IGEgMCBieSAwIHNpemUgb3RoZXJ3aXNlLlxuXHRcdFx0XHRcdHByZXAocGhvdG8pO1xuXHRcdFx0XHR9LCAxKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgLy8gQSBwYXVzZSBiZWNhdXNlIE9wZXJhIDEwLjYrIHdpbGwgc29tZXRpbWVzIG5vdCBydW4gdGhlIG9ubG9hZCBmdW5jdGlvbiBvdGhlcndpc2UuXG5cdFx0XHRcdHBob3RvLnNyYyA9IGhyZWY7XG5cdFx0XHR9LCAxKTtcblx0XHR9IGVsc2UgaWYgKGhyZWYpIHtcblx0XHRcdCRsb2FkaW5nQmF5LmxvYWQoaHJlZiwgc2V0dGluZ3MuZ2V0KCdkYXRhJyksIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcblx0XHRcdFx0aWYgKHJlcXVlc3QgPT09IHJlcXVlc3RzKSB7XG5cdFx0XHRcdFx0cHJlcChzdGF0dXMgPT09ICdlcnJvcicgPyAkdGFnKGRpdiwgJ0Vycm9yJykuaHRtbChzZXR0aW5ncy5nZXQoJ3hockVycm9yJykpIDogJCh0aGlzKS5jb250ZW50cygpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdFx0XG5cdC8vIE5hdmlnYXRlcyB0byB0aGUgbmV4dCBwYWdlL2ltYWdlIGluIGEgc2V0LlxuXHRwdWJsaWNNZXRob2QubmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIWFjdGl2ZSAmJiAkcmVsYXRlZFsxXSAmJiAoc2V0dGluZ3MuZ2V0KCdsb29wJykgfHwgJHJlbGF0ZWRbaW5kZXggKyAxXSkpIHtcblx0XHRcdGluZGV4ID0gZ2V0SW5kZXgoMSk7XG5cdFx0XHRsYXVuY2goJHJlbGF0ZWRbaW5kZXhdKTtcblx0XHR9XG5cdH07XG5cdFxuXHRwdWJsaWNNZXRob2QucHJldiA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIWFjdGl2ZSAmJiAkcmVsYXRlZFsxXSAmJiAoc2V0dGluZ3MuZ2V0KCdsb29wJykgfHwgaW5kZXgpKSB7XG5cdFx0XHRpbmRleCA9IGdldEluZGV4KC0xKTtcblx0XHRcdGxhdW5jaCgkcmVsYXRlZFtpbmRleF0pO1xuXHRcdH1cblx0fTtcblxuXHQvLyBOb3RlOiB0byB1c2UgdGhpcyB3aXRoaW4gYW4gaWZyYW1lIHVzZSB0aGUgZm9sbG93aW5nIGZvcm1hdDogcGFyZW50LmpRdWVyeS5jb2xvcmJveC5jbG9zZSgpO1xuXHRwdWJsaWNNZXRob2QuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKG9wZW4gJiYgIWNsb3NpbmcpIHtcblx0XHRcdFxuXHRcdFx0Y2xvc2luZyA9IHRydWU7XG5cdFx0XHRcblx0XHRcdG9wZW4gPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0dHJpZ2dlcihldmVudF9jbGVhbnVwKTtcblx0XHRcdHNldHRpbmdzLmdldCgnb25DbGVhbnVwJyk7XG5cdFx0XHRcblx0XHRcdCR3aW5kb3cudW5iaW5kKCcuJyArIHByZWZpeCk7XG5cdFx0XHRcblx0XHRcdCRvdmVybGF5LmZhZGVUbyhzZXR0aW5ncy5nZXQoJ2ZhZGVPdXQnKSB8fCAwLCAwKTtcblx0XHRcdFxuXHRcdFx0JGJveC5zdG9wKCkuZmFkZVRvKHNldHRpbmdzLmdldCgnZmFkZU91dCcpIHx8IDAsIDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFxuXHRcdFx0XHQkYm94LmFkZCgkb3ZlcmxheSkuY3NzKHsnb3BhY2l0eSc6IDEsIGN1cnNvcjogJ2F1dG8nfSkuaGlkZSgpO1xuXHRcdFx0XHRcblx0XHRcdFx0dHJpZ2dlcihldmVudF9wdXJnZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkbG9hZGVkLnJlbW92ZSgpO1xuXHRcdFx0XHRcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y2xvc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdHRyaWdnZXIoZXZlbnRfY2xvc2VkKTtcblx0XHRcdFx0XHRzZXR0aW5ncy5nZXQoJ29uQ2xvc2VkJyk7XG5cdFx0XHRcdH0sIDEpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIFJlbW92ZXMgY2hhbmdlcyBDb2xvcmJveCBtYWRlIHRvIHRoZSBkb2N1bWVudCwgYnV0IGRvZXMgbm90IHJlbW92ZSB0aGUgcGx1Z2luLlxuXHRwdWJsaWNNZXRob2QucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghJGJveCkgeyByZXR1cm47IH1cblxuXHRcdCRib3guc3RvcCgpO1xuXHRcdCQuY29sb3Jib3guY2xvc2UoKTtcblx0XHQkYm94LnN0b3AoKS5yZW1vdmUoKTtcblx0XHQkb3ZlcmxheS5yZW1vdmUoKTtcblx0XHRjbG9zaW5nID0gZmFsc2U7XG5cdFx0JGJveCA9IG51bGw7XG5cdFx0JCgnLicgKyBib3hFbGVtZW50KVxuXHRcdFx0LnJlbW92ZURhdGEoY29sb3Jib3gpXG5cdFx0XHQucmVtb3ZlQ2xhc3MoYm94RWxlbWVudCk7XG5cblx0XHQkKGRvY3VtZW50KS51bmJpbmQoJ2NsaWNrLicrcHJlZml4KTtcblx0fTtcblxuXHQvLyBBIG1ldGhvZCBmb3IgZmV0Y2hpbmcgdGhlIGN1cnJlbnQgZWxlbWVudCBDb2xvcmJveCBpcyByZWZlcmVuY2luZy5cblx0Ly8gcmV0dXJucyBhIGpRdWVyeSBvYmplY3QuXG5cdHB1YmxpY01ldGhvZC5lbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAkKHNldHRpbmdzLmVsKTtcblx0fTtcblxuXHRwdWJsaWNNZXRob2Quc2V0dGluZ3MgPSBkZWZhdWx0cztcblxufShqUXVlcnksIGRvY3VtZW50LCB3aW5kb3cpKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdmVuZG9yL2pxdWVyeS5jb2xvcmJveC5qc1wiLFwiL3ZlbmRvclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qXG4gKiBqUXVlcnkgRmxleFNsaWRlciB2Mi4xXG4gKiBodHRwOi8vd3d3Lndvb3RoZW1lcy5jb20vZmxleHNsaWRlci9cbiAqXG4gKiBDb3B5cmlnaHQgMjAxMiBXb29UaGVtZXNcbiAqIEZyZWUgdG8gdXNlIHVuZGVyIHRoZSBHUEx2MiBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC0yLjAuaHRtbFxuICpcbiAqIENvbnRyaWJ1dGluZyBhdXRob3I6IFR5bGVyIFNtaXRoIChAbWJtdWZmZmluKVxuICovXG5cbjsoZnVuY3Rpb24gKCQpIHtcblxuICAvL0ZsZXhTbGlkZXI6IE9iamVjdCBJbnN0YW5jZVxuICAkLmZsZXhzbGlkZXIgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciBzbGlkZXIgPSAkKGVsKSxcbiAgICAgICAgdmFycyA9ICQuZXh0ZW5kKHt9LCAkLmZsZXhzbGlkZXIuZGVmYXVsdHMsIG9wdGlvbnMpLFxuICAgICAgICBuYW1lc3BhY2UgPSB2YXJzLm5hbWVzcGFjZSxcbiAgICAgICAgdG91Y2ggPSAoXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCxcbiAgICAgICAgZXZlbnRUeXBlID0gKHRvdWNoKSA/IFwidG91Y2hlbmRcIiA6IFwiY2xpY2tcIixcbiAgICAgICAgdmVydGljYWwgPSB2YXJzLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICByZXZlcnNlID0gdmFycy5yZXZlcnNlLFxuICAgICAgICBjYXJvdXNlbCA9ICh2YXJzLml0ZW1XaWR0aCA+IDApLFxuICAgICAgICBmYWRlID0gdmFycy5hbmltYXRpb24gPT09IFwiZmFkZVwiLFxuICAgICAgICBhc05hdiA9IHZhcnMuYXNOYXZGb3IgIT09IFwiXCIsXG4gICAgICAgIG1ldGhvZHMgPSB7fTtcblxuICAgIC8vIFN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBzbGlkZXIgb2JqZWN0XG4gICAgJC5kYXRhKGVsLCBcImZsZXhzbGlkZXJcIiwgc2xpZGVyKTtcblxuICAgIC8vIFByaXZhdCBzbGlkZXIgbWV0aG9kc1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlID0gdmFycy5zdGFydEF0O1xuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nVG8gPSBzbGlkZXIuY3VycmVudFNsaWRlO1xuICAgICAgICBzbGlkZXIuYXRFbmQgPSAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCk7XG4gICAgICAgIHNsaWRlci5jb250YWluZXJTZWxlY3RvciA9IHZhcnMuc2VsZWN0b3Iuc3Vic3RyKDAsdmFycy5zZWxlY3Rvci5zZWFyY2goJyAnKSk7XG4gICAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHZhcnMuc2VsZWN0b3IsIHNsaWRlcik7XG4gICAgICAgIHNsaWRlci5jb250YWluZXIgPSAkKHNsaWRlci5jb250YWluZXJTZWxlY3Rvciwgc2xpZGVyKTtcbiAgICAgICAgc2xpZGVyLmNvdW50ID0gc2xpZGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgICAgIC8vIFNZTkM6XG4gICAgICAgIHNsaWRlci5zeW5jRXhpc3RzID0gJCh2YXJzLnN5bmMpLmxlbmd0aCA+IDA7XG4gICAgICAgIC8vIFNMSURFOlxuICAgICAgICBpZiAodmFycy5hbmltYXRpb24gPT09IFwic2xpZGVcIikgdmFycy5hbmltYXRpb24gPSBcInN3aW5nXCI7XG4gICAgICAgIHNsaWRlci5wcm9wID0gKHZlcnRpY2FsKSA/IFwidG9wXCIgOiBcIm1hcmdpbkxlZnRcIjtcbiAgICAgICAgc2xpZGVyLmFyZ3MgPSB7fTtcbiAgICAgICAgLy8gU0xJREVTSE9XOlxuICAgICAgICBzbGlkZXIubWFudWFsUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgLy8gVE9VQ0gvVVNFQ1NTOlxuICAgICAgICBzbGlkZXIudHJhbnNpdGlvbnMgPSAhdmFycy52aWRlbyAmJiAhZmFkZSAmJiB2YXJzLnVzZUNTUyAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICBwcm9wcyA9IFsncGVyc3BlY3RpdmVQcm9wZXJ0eScsICdXZWJraXRQZXJzcGVjdGl2ZScsICdNb3pQZXJzcGVjdGl2ZScsICdPUGVyc3BlY3RpdmUnLCAnbXNQZXJzcGVjdGl2ZSddO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICggb2JqLnN0eWxlWyBwcm9wc1tpXSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5wZnggPSBwcm9wc1tpXS5yZXBsYWNlKCdQZXJzcGVjdGl2ZScsJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIHNsaWRlci5wcm9wID0gXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNmb3JtXCI7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0oKSk7XG4gICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICBpZiAodmFycy5jb250cm9sc0NvbnRhaW5lciAhPT0gXCJcIikgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyID0gJCh2YXJzLmNvbnRyb2xzQ29udGFpbmVyKS5sZW5ndGggPiAwICYmICQodmFycy5jb250cm9sc0NvbnRhaW5lcik7XG4gICAgICAgIC8vIE1BTlVBTDpcbiAgICAgICAgaWYgKHZhcnMubWFudWFsQ29udHJvbHMgIT09IFwiXCIpIHNsaWRlci5tYW51YWxDb250cm9scyA9ICQodmFycy5tYW51YWxDb250cm9scykubGVuZ3RoID4gMCAmJiAkKHZhcnMubWFudWFsQ29udHJvbHMpO1xuXG4gICAgICAgIC8vIFJBTkRPTUlaRTpcbiAgICAgICAgaWYgKHZhcnMucmFuZG9taXplKSB7XG4gICAgICAgICAgc2xpZGVyLnNsaWRlcy5zb3J0KGZ1bmN0aW9uKCkgeyByZXR1cm4gKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSktMC41KTsgfSk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlci5kb01hdGgoKTtcblxuICAgICAgICAvLyBBU05BVjpcbiAgICAgICAgaWYgKGFzTmF2KSBtZXRob2RzLmFzTmF2LnNldHVwKCk7XG5cbiAgICAgICAgLy8gSU5JVFxuICAgICAgICBzbGlkZXIuc2V0dXAoXCJpbml0XCIpO1xuXG4gICAgICAgIC8vIENPTlRST0xOQVY6XG4gICAgICAgIGlmICh2YXJzLmNvbnRyb2xOYXYpIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHZhcnMuZGlyZWN0aW9uTmF2KSBtZXRob2RzLmRpcmVjdGlvbk5hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIEtFWUJPQVJEOlxuICAgICAgICBpZiAodmFycy5rZXlib2FyZCAmJiAoJChzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IpLmxlbmd0aCA9PT0gMSB8fCB2YXJzLm11bHRpcGxlS2V5Ym9hcmQpKSB7XG4gICAgICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGtleWNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nICYmIChrZXljb2RlID09PSAzOSB8fCBrZXljb2RlID09PSAzNykpIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IChrZXljb2RlID09PSAzOSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWNvZGUgPT09IDM3KSA/IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKSA6IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB2YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1PVVNFV0hFRUw6XG4gICAgICAgIGlmICh2YXJzLm1vdXNld2hlZWwpIHtcbiAgICAgICAgICBzbGlkZXIuYmluZCgnbW91c2V3aGVlbCcsIGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgZGVsdGFYLCBkZWx0YVkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gKGRlbHRhIDwgMCkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOiBzbGlkZXIuZ2V0VGFyZ2V0KCdwcmV2Jyk7XG4gICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB2YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUEFVU0VQTEFZXG4gICAgICAgIGlmICh2YXJzLnBhdXNlUGxheSkgbWV0aG9kcy5wYXVzZVBsYXkuc2V0dXAoKTtcblxuICAgICAgICAvLyBTTElEU0VTSE9XXG4gICAgICAgIGlmICh2YXJzLnNsaWRlc2hvdykge1xuICAgICAgICAgIGlmICh2YXJzLnBhdXNlT25Ib3Zlcikge1xuICAgICAgICAgICAgc2xpZGVyLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoIXNsaWRlci5tYW51YWxQbGF5ICYmICFzbGlkZXIubWFudWFsUGF1c2UpIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbFBhdXNlICYmICFzbGlkZXIubWFudWFsUGxheSkgc2xpZGVyLnBsYXkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvblxuICAgICAgICAgICh2YXJzLmluaXREZWxheSA+IDApID8gc2V0VGltZW91dChzbGlkZXIucGxheSwgdmFycy5pbml0RGVsYXkpIDogc2xpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPVUNIXG4gICAgICAgIGlmICh0b3VjaCAmJiB2YXJzLnRvdWNoKSBtZXRob2RzLnRvdWNoKCk7XG5cbiAgICAgICAgLy8gRkFERSYmU01PT1RISEVJR0hUIHx8IFNMSURFOlxuICAgICAgICBpZiAoIWZhZGUgfHwgKGZhZGUgJiYgdmFycy5zbW9vdGhIZWlnaHQpKSAkKHdpbmRvdykuYmluZChcInJlc2l6ZSBmb2N1c1wiLCBtZXRob2RzLnJlc2l6ZSk7XG5cblxuICAgICAgICAvLyBBUEk6IHN0YXJ0KCkgQ2FsbGJhY2tcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIHZhcnMuc3RhcnQoc2xpZGVyKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgIH0sXG4gICAgICBhc05hdjoge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2xpZGVyLmFzTmF2ID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZXIuYW5pbWF0aW5nVG8gPSBNYXRoLmZsb29yKHNsaWRlci5jdXJyZW50U2xpZGUvc2xpZGVyLm1vdmUpO1xuICAgICAgICAgIHNsaWRlci5jdXJyZW50SXRlbSA9IHNsaWRlci5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgc2xpZGVyLnNsaWRlcy5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShzbGlkZXIuY3VycmVudEl0ZW0pLmFkZENsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpO1xuICAgICAgICAgIHNsaWRlci5zbGlkZXMuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgJHNsaWRlID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgIGlmICghJCh2YXJzLmFzTmF2Rm9yKS5kYXRhKCdmbGV4c2xpZGVyJykuYW5pbWF0aW5nICYmICEkc2xpZGUuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAoc2xpZGVyLmN1cnJlbnRJdGVtIDwgdGFyZ2V0KSA/IFwibmV4dFwiIDogXCJwcmV2XCI7XG4gICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHZhcnMucGF1c2VPbkFjdGlvbiwgZmFsc2UsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29udHJvbE5hdjoge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCFzbGlkZXIubWFudWFsQ29udHJvbHMpIHtcbiAgICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cFBhZ2luZygpO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIE1BTlVBTENPTlRST0xTOlxuICAgICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldHVwTWFudWFsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXR1cFBhZ2luZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHR5cGUgPSAodmFycy5jb250cm9sTmF2ID09PSBcInRodW1ibmFpbHNcIikgPyAnY29udHJvbC10aHVtYnMnIDogJ2NvbnRyb2wtcGFnaW5nJyxcbiAgICAgICAgICAgICAgaiA9IDEsXG4gICAgICAgICAgICAgIGl0ZW07XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkID0gJCgnPG9sIGNsYXNzPVwiJysgbmFtZXNwYWNlICsgJ2NvbnRyb2wtbmF2ICcgKyBuYW1lc3BhY2UgKyB0eXBlICsgJ1wiPjwvb2w+Jyk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIucGFnaW5nQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBpdGVtID0gKHZhcnMuY29udHJvbE5hdiA9PT0gXCJ0aHVtYm5haWxzXCIpID8gJzxpbWcgc3JjPVwiJyArIHNsaWRlci5zbGlkZXMuZXEoaSkuYXR0cihcImRhdGEtdGh1bWJcIikgKyAnXCIvPicgOiAnPGE+JyArIGogKyAnPC9hPic7XG4gICAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQuYXBwZW5kKCc8bGk+JyArIGl0ZW0gKyAnPC9saT4nKTtcbiAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpID8gJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkKSA6IHNsaWRlci5hcHBlbmQoc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZCk7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuXG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5kZWxlZ2F0ZSgnYSwgaW1nJywgZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gc2xpZGVyLmNvbnRyb2xOYXYuaW5kZXgoJHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoISR0aGlzLmhhc0NsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uID0gKHRhcmdldCA+IHNsaWRlci5jdXJyZW50U2xpZGUpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgdmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBQcmV2ZW50IGlPUyBjbGljayBldmVudCBidWdcbiAgICAgICAgICBpZiAodG91Y2gpIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQuZGVsZWdhdGUoJ2EnLCBcImNsaWNrIHRvdWNoc3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0dXBNYW51YWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2ID0gc2xpZGVyLm1hbnVhbENvbnRyb2xzO1xuICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi5hY3RpdmUoKTtcblxuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2LmxpdmUoZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gc2xpZGVyLmNvbnRyb2xOYXYuaW5kZXgoJHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoISR0aGlzLmhhc0NsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBzbGlkZXIuZGlyZWN0aW9uID0gXCJuZXh0XCIgOiBzbGlkZXIuZGlyZWN0aW9uID0gXCJwcmV2XCI7XG4gICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUHJldmVudCBpT1MgY2xpY2sgZXZlbnQgYnVnXG4gICAgICAgICAgaWYgKHRvdWNoKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdi5saXZlKFwiY2xpY2sgdG91Y2hzdGFydFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzZWxlY3RvciA9ICh2YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdpbWcnIDogJ2EnO1xuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnY29udHJvbC1uYXYgbGkgJyArIHNlbGVjdG9yLCAoc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKSA/IHNsaWRlci5jb250cm9sc0NvbnRhaW5lciA6IHNsaWRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmVcIikuZXEoc2xpZGVyLmFuaW1hdGluZ1RvKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihhY3Rpb24sIHBvcykge1xuICAgICAgICAgIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIGFjdGlvbiA9PT0gXCJhZGRcIikge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5hcHBlbmQoJCgnPGxpPjxhPicgKyBzbGlkZXIuY291bnQgKyAnPC9hPjwvbGk+JykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkLmZpbmQoJ2xpJykucmVtb3ZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2LmVxKHBvcykuY2xvc2VzdCgnbGknKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuICAgICAgICAgIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIHNsaWRlci5wYWdpbmdDb3VudCAhPT0gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSA/IHNsaWRlci51cGRhdGUocG9zLCBhY3Rpb24pIDogbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlyZWN0aW9uTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlyZWN0aW9uTmF2U2NhZmZvbGQgPSAkKCc8dWwgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ2RpcmVjdGlvbi1uYXZcIj48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ByZXZcIiBocmVmPVwiI1wiPicgKyB2YXJzLnByZXZUZXh0ICsgJzwvYT48L2xpPjxsaT48YSBjbGFzcz1cIicgKyBuYW1lc3BhY2UgKyAnbmV4dFwiIGhyZWY9XCIjXCI+JyArIHZhcnMubmV4dFRleHQgKyAnPC9hPjwvbGk+PC91bD4nKTtcblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIGlmIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICQoc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKS5hcHBlbmQoZGlyZWN0aW9uTmF2U2NhZmZvbGQpO1xuICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdiA9ICQoJy4nICsgbmFtZXNwYWNlICsgJ2RpcmVjdGlvbi1uYXYgbGkgYScsIHNsaWRlci5jb250cm9sc0NvbnRhaW5lcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5hcHBlbmQoZGlyZWN0aW9uTmF2U2NhZmZvbGQpO1xuICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdiA9ICQoJy4nICsgbmFtZXNwYWNlICsgJ2RpcmVjdGlvbi1uYXYgbGkgYScsIHNsaWRlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWV0aG9kcy5kaXJlY3Rpb25OYXYudXBkYXRlKCk7XG5cbiAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LmJpbmQoZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoJCh0aGlzKS5oYXNDbGFzcyhuYW1lc3BhY2UgKyAnbmV4dCcpKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUHJldmVudCBpT1MgY2xpY2sgZXZlbnQgYnVnXG4gICAgICAgICAgaWYgKHRvdWNoKSB7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LmJpbmQoXCJjbGljayB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGRpc2FibGVkQ2xhc3MgPSBuYW1lc3BhY2UgKyAnZGlzYWJsZWQnO1xuICAgICAgICAgIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYuYWRkQ2xhc3MoZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgfSBlbHNlIGlmICghdmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSAwKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcykuZmlsdGVyKCcuJyArIG5hbWVzcGFjZSArIFwicHJldlwiKS5hZGRDbGFzcyhkaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkge1xuICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGRpc2FibGVkQ2xhc3MpLmZpbHRlcignLicgKyBuYW1lc3BhY2UgKyBcIm5leHRcIikuYWRkQ2xhc3MoZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhdXNlUGxheToge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBhdXNlUGxheVNjYWZmb2xkID0gJCgnPGRpdiBjbGFzcz1cIicgKyBuYW1lc3BhY2UgKyAncGF1c2VwbGF5XCI+PGE+PC9hPjwvZGl2PicpO1xuXG4gICAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgICAgaWYgKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyLmFwcGVuZChwYXVzZVBsYXlTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIucGF1c2VQbGF5ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAncGF1c2VwbGF5IGEnLCBzbGlkZXIuY29udHJvbHNDb250YWluZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuYXBwZW5kKHBhdXNlUGxheVNjYWZmb2xkKTtcbiAgICAgICAgICAgIHNsaWRlci5wYXVzZVBsYXkgPSAkKCcuJyArIG5hbWVzcGFjZSArICdwYXVzZXBsYXkgYScsIHNsaWRlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWV0aG9kcy5wYXVzZVBsYXkudXBkYXRlKCh2YXJzLnNsaWRlc2hvdykgPyBuYW1lc3BhY2UgKyAncGF1c2UnIDogbmFtZXNwYWNlICsgJ3BsYXknKTtcblxuICAgICAgICAgIHNsaWRlci5wYXVzZVBsYXkuYmluZChldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MobmFtZXNwYWNlICsgJ3BhdXNlJykpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2xpZGVyLm1hbnVhbFBsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgc2xpZGVyLm1hbnVhbFBsYXkgPSB0cnVlO1xuICAgICAgICAgICAgICBzbGlkZXIucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIFByZXZlbnQgaU9TIGNsaWNrIGV2ZW50IGJ1Z1xuICAgICAgICAgIGlmICh0b3VjaCkge1xuICAgICAgICAgICAgc2xpZGVyLnBhdXNlUGxheS5iaW5kKFwiY2xpY2sgdG91Y2hzdGFydFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgKHN0YXRlID09PSBcInBsYXlcIikgPyBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpLmFkZENsYXNzKG5hbWVzcGFjZSArICdwbGF5JykudGV4dCh2YXJzLnBsYXlUZXh0KSA6IHNsaWRlci5wYXVzZVBsYXkucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgJ3BsYXknKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyAncGF1c2UnKS50ZXh0KHZhcnMucGF1c2VUZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvdWNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0YXJ0WCxcbiAgICAgICAgICBzdGFydFksXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIGN3aWR0aCxcbiAgICAgICAgICBkeCxcbiAgICAgICAgICBzdGFydFQsXG4gICAgICAgICAgc2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzbGlkZXIucGF1c2UoKTtcbiAgICAgICAgICAgIC8vIENBUk9VU0VMOlxuICAgICAgICAgICAgY3dpZHRoID0gKHZlcnRpY2FsKSA/IHNsaWRlci5oIDogc2xpZGVyLiB3O1xuICAgICAgICAgICAgc3RhcnRUID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG4gICAgICAgICAgICBvZmZzZXQgPSAoY2Fyb3VzZWwgJiYgcmV2ZXJzZSAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgKGNhcm91c2VsICYmIHJldmVyc2UpID8gc2xpZGVyLmxpbWl0IC0gKCgoc2xpZGVyLml0ZW1XICsgdmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0KSA/IHNsaWRlci5saW1pdCA6XG4gICAgICAgICAgICAgICAgICAgICAoY2Fyb3VzZWwpID8gKChzbGlkZXIuaXRlbVcgKyB2YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyAoc2xpZGVyLmxhc3QgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aCA6IChzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aDtcbiAgICAgICAgICAgIHN0YXJ0WCA9ICh2ZXJ0aWNhbCkgPyBlLnRvdWNoZXNbMF0ucGFnZVkgOiBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICBzdGFydFkgPSAodmVydGljYWwpID8gZS50b3VjaGVzWzBdLnBhZ2VYIDogZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaE1vdmUoZSkge1xuICAgICAgICAgIGR4ID0gKHZlcnRpY2FsKSA/IHN0YXJ0WCAtIGUudG91Y2hlc1swXS5wYWdlWSA6IHN0YXJ0WCAtIGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICBzY3JvbGxpbmcgPSAodmVydGljYWwpID8gKE1hdGguYWJzKGR4KSA8IE1hdGguYWJzKGUudG91Y2hlc1swXS5wYWdlWCAtIHN0YXJ0WSkpIDogKE1hdGguYWJzKGR4KSA8IE1hdGguYWJzKGUudG91Y2hlc1swXS5wYWdlWSAtIHN0YXJ0WSkpO1xuXG4gICAgICAgICAgaWYgKCFzY3JvbGxpbmcgfHwgTnVtYmVyKG5ldyBEYXRlKCkpIC0gc3RhcnRUID4gNTAwKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWZhZGUgJiYgc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmICghdmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgICAgICAgZHggPSBkeC8oKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgZHggPCAwIHx8IHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIGR4ID4gMCkgPyAoTWF0aC5hYnMoZHgpL2N3aWR0aCsyKSA6IDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhvZmZzZXQgKyBkeCwgXCJzZXRUb3VjaFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoRW5kKGUpIHtcbiAgICAgICAgICAvLyBmaW5pc2ggdGhlIHRvdWNoIGJ5IHVuZG9pbmcgdGhlIHRvdWNoIHNlc3Npb25cbiAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKHNsaWRlci5hbmltYXRpbmdUbyA9PT0gc2xpZGVyLmN1cnJlbnRTbGlkZSAmJiAhc2Nyb2xsaW5nICYmICEoZHggPT09IG51bGwpKSB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlRHggPSAocmV2ZXJzZSkgPyAtZHggOiBkeCxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAodXBkYXRlRHggPiAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcblxuICAgICAgICAgICAgaWYgKHNsaWRlci5jYW5BZHZhbmNlKHRhcmdldCkgJiYgKE51bWJlcihuZXcgRGF0ZSgpKSAtIHN0YXJ0VCA8IDU1MCAmJiBNYXRoLmFicyh1cGRhdGVEeCkgPiA1MCB8fCBNYXRoLmFicyh1cGRhdGVEeCkgPiBjd2lkdGgvMikpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgdmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghZmFkZSkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5jdXJyZW50U2xpZGUsIHZhcnMucGF1c2VPbkFjdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgICAgIHN0YXJ0WCA9IG51bGw7XG4gICAgICAgICAgc3RhcnRZID0gbnVsbDtcbiAgICAgICAgICBkeCA9IG51bGw7XG4gICAgICAgICAgb2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBzbGlkZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgICAgICBpZiAoZmFkZSkge1xuICAgICAgICAgICAgLy8gU01PT1RIIEhFSUdIVDpcbiAgICAgICAgICAgIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjYXJvdXNlbCkgeyAvL0NBUk9VU0VMOlxuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci51cGRhdGUoc2xpZGVyLnBhZ2luZ0NvdW50KTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2ZXJ0aWNhbCkgeyAvL1ZFUlRJQ0FMOlxuICAgICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmhlaWdodChzbGlkZXIuaCk7XG4gICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyLmgsIFwic2V0VG90YWxcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgICAgICBpZiAodmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgICBzbGlkZXIubmV3U2xpZGVzLndpZHRoKHNsaWRlci5jb21wdXRlZFcpO1xuICAgICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlci5jb21wdXRlZFcsIFwic2V0VG90YWxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc21vb3RoSGVpZ2h0OiBmdW5jdGlvbihkdXIpIHtcbiAgICAgICAgaWYgKCF2ZXJ0aWNhbCB8fCBmYWRlKSB7XG4gICAgICAgICAgdmFyICRvYmogPSAoZmFkZSkgPyBzbGlkZXIgOiBzbGlkZXIudmlld3BvcnQ7XG4gICAgICAgICAgKGR1cikgPyAkb2JqLmFuaW1hdGUoe1wiaGVpZ2h0XCI6IHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmFuaW1hdGluZ1RvKS5oZWlnaHQoKX0sIGR1cikgOiAkb2JqLmhlaWdodChzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5hbmltYXRpbmdUbykuaGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3luYzogZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgIHZhciAkb2JqID0gJCh2YXJzLnN5bmMpLmRhdGEoXCJmbGV4c2xpZGVyXCIpLFxuICAgICAgICAgICAgdGFyZ2V0ID0gc2xpZGVyLmFuaW1hdGluZ1RvO1xuXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSBcImFuaW1hdGVcIjogJG9iai5mbGV4QW5pbWF0ZSh0YXJnZXQsIHZhcnMucGF1c2VPbkFjdGlvbiwgZmFsc2UsIHRydWUpOyBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGxheVwiOiBpZiAoISRvYmoucGxheWluZyAmJiAhJG9iai5hc05hdikgeyAkb2JqLnBsYXkoKTsgfSBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGF1c2VcIjogJG9iai5wYXVzZSgpOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgc2xpZGVyLmZsZXhBbmltYXRlID0gZnVuY3Rpb24odGFyZ2V0LCBwYXVzZSwgb3ZlcnJpZGUsIHdpdGhTeW5jLCBmcm9tTmF2KSB7XG5cbiAgICAgIGlmIChhc05hdiAmJiBzbGlkZXIucGFnaW5nQ291bnQgPT09IDEpIHNsaWRlci5kaXJlY3Rpb24gPSAoc2xpZGVyLmN1cnJlbnRJdGVtIDwgdGFyZ2V0KSA/IFwibmV4dFwiIDogXCJwcmV2XCI7XG5cbiAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiAoc2xpZGVyLmNhbkFkdmFuY2UodGFyZ2V0LCBmcm9tTmF2KSB8fCBvdmVycmlkZSkgJiYgc2xpZGVyLmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgaWYgKGFzTmF2ICYmIHdpdGhTeW5jKSB7XG4gICAgICAgICAgdmFyIG1hc3RlciA9ICQodmFycy5hc05hdkZvcikuZGF0YSgnZmxleHNsaWRlcicpO1xuICAgICAgICAgIHNsaWRlci5hdEVuZCA9IHRhcmdldCA9PT0gMCB8fCB0YXJnZXQgPT09IHNsaWRlci5jb3VudCAtIDE7XG4gICAgICAgICAgbWFzdGVyLmZsZXhBbmltYXRlKHRhcmdldCwgdHJ1ZSwgZmFsc2UsIHRydWUsIGZyb21OYXYpO1xuICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAoc2xpZGVyLmN1cnJlbnRJdGVtIDwgdGFyZ2V0KSA/IFwibmV4dFwiIDogXCJwcmV2XCI7XG4gICAgICAgICAgbWFzdGVyLmRpcmVjdGlvbiA9IHNsaWRlci5kaXJlY3Rpb247XG5cbiAgICAgICAgICBpZiAoTWF0aC5jZWlsKCh0YXJnZXQgKyAxKS9zbGlkZXIudmlzaWJsZSkgLSAxICE9PSBzbGlkZXIuY3VycmVudFNsaWRlICYmIHRhcmdldCAhPT0gMCkge1xuICAgICAgICAgICAgc2xpZGVyLmN1cnJlbnRJdGVtID0gdGFyZ2V0O1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcSh0YXJnZXQpLmFkZENsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gTWF0aC5mbG9vcih0YXJnZXQvc2xpZGVyLnZpc2libGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuY3VycmVudEl0ZW0gPSB0YXJnZXQ7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHRhcmdldCkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IHRhcmdldDtcbiAgICAgICAgLy8gQVBJOiBiZWZvcmUoKSBhbmltYXRpb24gQ2FsbGJhY2tcbiAgICAgICAgdmFycy5iZWZvcmUoc2xpZGVyKTtcblxuICAgICAgICAvLyBTTElERVNIT1c6XG4gICAgICAgIGlmIChwYXVzZSkgc2xpZGVyLnBhdXNlKCk7XG5cbiAgICAgICAgLy8gU1lOQzpcbiAgICAgICAgaWYgKHNsaWRlci5zeW5jRXhpc3RzICYmICFmcm9tTmF2KSBtZXRob2RzLnN5bmMoXCJhbmltYXRlXCIpO1xuXG4gICAgICAgIC8vIENPTlRST0xOQVZcbiAgICAgICAgaWYgKHZhcnMuY29udHJvbE5hdikgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgIC8vICFDQVJPVVNFTDpcbiAgICAgICAgLy8gQ0FORElEQVRFOiBzbGlkZSBhY3RpdmUgY2xhc3MgKGZvciBhZGQvcmVtb3ZlIHNsaWRlKVxuICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKS5lcSh0YXJnZXQpLmFkZENsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKTtcblxuICAgICAgICAvLyBJTkZJTklURSBMT09QOlxuICAgICAgICAvLyBDQU5ESURBVEU6IGF0RW5kXG4gICAgICAgIHNsaWRlci5hdEVuZCA9IHRhcmdldCA9PT0gMCB8fCB0YXJnZXQgPT09IHNsaWRlci5sYXN0O1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHZhcnMuZGlyZWN0aW9uTmF2KSBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgICAgICBpZiAodGFyZ2V0ID09PSBzbGlkZXIubGFzdCkge1xuICAgICAgICAgIC8vIEFQSTogZW5kKCkgb2YgY3ljbGUgQ2FsbGJhY2tcbiAgICAgICAgICB2YXJzLmVuZChzbGlkZXIpO1xuICAgICAgICAgIC8vIFNMSURFU0hPVyAmJiAhSU5GSU5JVEUgTE9PUDpcbiAgICAgICAgICBpZiAoIXZhcnMuYW5pbWF0aW9uTG9vcCkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlKSB7XG4gICAgICAgICAgdmFyIGRpbWVuc2lvbiA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuc2xpZGVzLmZpbHRlcignOmZpcnN0JykuaGVpZ2h0KCkgOiBzbGlkZXIuY29tcHV0ZWRXLFxuICAgICAgICAgICAgICBtYXJnaW4sIHNsaWRlU3RyaW5nLCBjYWxjTmV4dDtcblxuICAgICAgICAgIC8vIElORklOSVRFIExPT1AgLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgICAgbWFyZ2luID0gKHZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gdmFycy5pdGVtTWFyZ2luICogMiA6IHZhcnMuaXRlbU1hcmdpbjtcbiAgICAgICAgICAgIGNhbGNOZXh0ID0gKChzbGlkZXIuaXRlbVcgKyBtYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgc2xpZGVTdHJpbmcgPSAoY2FsY05leHQgPiBzbGlkZXIubGltaXQgJiYgc2xpZGVyLnZpc2libGUgIT09IDEpID8gc2xpZGVyLmxpbWl0IDogY2FsY05leHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiB2YXJzLmFuaW1hdGlvbkxvb3AgJiYgc2xpZGVyLmRpcmVjdGlvbiAhPT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgIHNsaWRlU3RyaW5nID0gKHJldmVyc2UpID8gKHNsaWRlci5jb3VudCArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBkaW1lbnNpb24gOiAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QgJiYgdGFyZ2V0ID09PSAwICYmIHZhcnMuYW5pbWF0aW9uTG9vcCAmJiBzbGlkZXIuZGlyZWN0aW9uICE9PSBcInByZXZcIikge1xuICAgICAgICAgICAgc2xpZGVTdHJpbmcgPSAocmV2ZXJzZSkgPyAwIDogKHNsaWRlci5jb3VudCArIDEpICogZGltZW5zaW9uO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/ICgoc2xpZGVyLmNvdW50IC0gMSkgLSB0YXJnZXQgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogZGltZW5zaW9uIDogKHRhcmdldCArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBkaW1lbnNpb247XG4gICAgICAgICAgfVxuICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZVN0cmluZywgXCJcIiwgdmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICAgICAgaWYgKHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgaWYgKCF2YXJzLmFuaW1hdGlvbkxvb3AgfHwgIXNsaWRlci5hdEVuZCkge1xuICAgICAgICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLnVuYmluZChcIndlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiKTtcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYmluZChcIndlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYW5pbWF0ZShzbGlkZXIuYXJncywgdmFycy5hbmltYXRpb25TcGVlZCwgdmFycy5lYXNpbmcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHNsaWRlci53cmFwdXAoZGltZW5zaW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gRkFERTpcbiAgICAgICAgICBpZiAoIXRvdWNoKSB7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmZhZGVPdXQodmFycy5hbmltYXRpb25TcGVlZCwgdmFycy5lYXNpbmcpO1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcSh0YXJnZXQpLmZhZGVJbih2YXJzLmFuaW1hdGlvblNwZWVkLCB2YXJzLmVhc2luZywgc2xpZGVyLndyYXB1cCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmN1cnJlbnRTbGlkZSkuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiekluZGV4XCI6IDEgfSk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuY3NzKHsgXCJvcGFjaXR5XCI6IDEsIFwiekluZGV4XCI6IDIgfSk7XG5cbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMudW5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpO1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAvLyBBUEk6IGFmdGVyKCkgYW5pbWF0aW9uIENhbGxiYWNrXG4gICAgICAgICAgICAgIHZhcnMuYWZ0ZXIoc2xpZGVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlID0gc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICBpZiAodmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KHZhcnMuYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBzbGlkZXIud3JhcHVwID0gZnVuY3Rpb24oZGltZW5zaW9uKSB7XG4gICAgICAvLyBTTElERTpcbiAgICAgIGlmICghZmFkZSAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCAmJiB2YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoZGltZW5zaW9uLCBcImp1bXBFbmRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSAwICYmIHZhcnMuYW5pbWF0aW9uTG9vcCkge1xuICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhkaW1lbnNpb24sIFwianVtcFN0YXJ0XCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzbGlkZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICBzbGlkZXIuY3VycmVudFNsaWRlID0gc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgLy8gQVBJOiBhZnRlcigpIGFuaW1hdGlvbiBDYWxsYmFja1xuICAgICAgdmFycy5hZnRlcihzbGlkZXIpO1xuICAgIH1cblxuICAgIC8vIFNMSURFU0hPVzpcbiAgICBzbGlkZXIuYW5pbWF0ZVNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nKSBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmdldFRhcmdldChcIm5leHRcIikpO1xuICAgIH1cbiAgICAvLyBTTElERVNIT1c6XG4gICAgc2xpZGVyLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhckludGVydmFsKHNsaWRlci5hbmltYXRlZFNsaWRlcyk7XG4gICAgICBzbGlkZXIucGxheWluZyA9IGZhbHNlO1xuICAgICAgLy8gUEFVU0VQTEFZOlxuICAgICAgaWYgKHZhcnMucGF1c2VQbGF5KSBtZXRob2RzLnBhdXNlUGxheS51cGRhdGUoXCJwbGF5XCIpO1xuICAgICAgLy8gU1lOQzpcbiAgICAgIGlmIChzbGlkZXIuc3luY0V4aXN0cykgbWV0aG9kcy5zeW5jKFwicGF1c2VcIik7XG4gICAgfVxuICAgIC8vIFNMSURFU0hPVzpcbiAgICBzbGlkZXIucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2xpZGVyLmFuaW1hdGVkU2xpZGVzID0gc2V0SW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVTbGlkZXMsIHZhcnMuc2xpZGVzaG93U3BlZWQpO1xuICAgICAgc2xpZGVyLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgLy8gUEFVU0VQTEFZOlxuICAgICAgaWYgKHZhcnMucGF1c2VQbGF5KSBtZXRob2RzLnBhdXNlUGxheS51cGRhdGUoXCJwYXVzZVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBsYXlcIik7XG4gICAgfVxuICAgIHNsaWRlci5jYW5BZHZhbmNlID0gZnVuY3Rpb24odGFyZ2V0LCBmcm9tTmF2KSB7XG4gICAgICAvLyBBU05BVjpcbiAgICAgIHZhciBsYXN0ID0gKGFzTmF2KSA/IHNsaWRlci5wYWdpbmdDb3VudCAtIDEgOiBzbGlkZXIubGFzdDtcbiAgICAgIHJldHVybiAoZnJvbU5hdikgPyB0cnVlIDpcbiAgICAgICAgICAgICAoYXNOYXYgJiYgc2xpZGVyLmN1cnJlbnRJdGVtID09PSBzbGlkZXIuY291bnQgLSAxICYmIHRhcmdldCA9PT0gMCAmJiBzbGlkZXIuZGlyZWN0aW9uID09PSBcInByZXZcIikgPyB0cnVlIDpcbiAgICAgICAgICAgICAoYXNOYXYgJiYgc2xpZGVyLmN1cnJlbnRJdGVtID09PSAwICYmIHRhcmdldCA9PT0gc2xpZGVyLnBhZ2luZ0NvdW50IC0gMSAmJiBzbGlkZXIuZGlyZWN0aW9uICE9PSBcIm5leHRcIikgPyBmYWxzZSA6XG4gICAgICAgICAgICAgKHRhcmdldCA9PT0gc2xpZGVyLmN1cnJlbnRTbGlkZSAmJiAhYXNOYXYpID8gZmFsc2UgOlxuICAgICAgICAgICAgICh2YXJzLmFuaW1hdGlvbkxvb3ApID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKHNsaWRlci5hdEVuZCAmJiBzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIHRhcmdldCA9PT0gbGFzdCAmJiBzbGlkZXIuZGlyZWN0aW9uICE9PSBcIm5leHRcIikgPyBmYWxzZSA6XG4gICAgICAgICAgICAgKHNsaWRlci5hdEVuZCAmJiBzbGlkZXIuY3VycmVudFNsaWRlID09PSBsYXN0ICYmIHRhcmdldCA9PT0gMCAmJiBzbGlkZXIuZGlyZWN0aW9uID09PSBcIm5leHRcIikgPyBmYWxzZSA6XG4gICAgICAgICAgICAgdHJ1ZTtcbiAgICB9XG4gICAgc2xpZGVyLmdldFRhcmdldCA9IGZ1bmN0aW9uKGRpcikge1xuICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IGRpcjtcbiAgICAgIGlmIChkaXIgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIHJldHVybiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpID8gMCA6IHNsaWRlci5jdXJyZW50U2xpZGUgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwKSA/IHNsaWRlci5sYXN0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSAtIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0xJREU6XG4gICAgc2xpZGVyLnNldFByb3BzID0gZnVuY3Rpb24ocG9zLCBzcGVjaWFsLCBkdXIpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3NDaGVjayA9IChwb3MpID8gcG9zIDogKChzbGlkZXIuaXRlbVcgKyB2YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvLFxuICAgICAgICAgICAgcG9zQ2FsYyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzcGVjaWFsID09PSBcInNldFRvdWNoXCIpID8gcG9zIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKHJldmVyc2UpID8gc2xpZGVyLmxpbWl0IC0gKCgoc2xpZGVyLml0ZW1XICsgdmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOiBwb3NDaGVjaztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNwZWNpYWwpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZXRUb3RhbFwiOiByZXR1cm4gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zIDogKHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInNldFRvdWNoXCI6IHJldHVybiAocmV2ZXJzZSkgPyBwb3MgOiBwb3M7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwianVtcEVuZFwiOiByZXR1cm4gKHJldmVyc2UpID8gcG9zIDogc2xpZGVyLmNvdW50ICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImp1bXBTdGFydFwiOiByZXR1cm4gKHJldmVyc2UpID8gc2xpZGVyLmNvdW50ICogcG9zIDogcG9zO1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICByZXR1cm4gKHBvc0NhbGMgKiAtMSkgKyBcInB4XCI7XG4gICAgICAgICAgfSgpKTtcblxuICAgICAgaWYgKHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICB0YXJnZXQgPSAodmVydGljYWwpID8gXCJ0cmFuc2xhdGUzZCgwLFwiICsgdGFyZ2V0ICsgXCIsMClcIiA6IFwidHJhbnNsYXRlM2QoXCIgKyB0YXJnZXQgKyBcIiwwLDApXCI7XG4gICAgICAgIGR1ciA9IChkdXIgIT09IHVuZGVmaW5lZCkgPyAoZHVyLzEwMDApICsgXCJzXCIgOiBcIjBzXCI7XG4gICAgICAgIHNsaWRlci5jb250YWluZXIuY3NzKFwiLVwiICsgc2xpZGVyLnBmeCArIFwiLXRyYW5zaXRpb24tZHVyYXRpb25cIiwgZHVyKTtcbiAgICAgIH1cblxuICAgICAgc2xpZGVyLmFyZ3Nbc2xpZGVyLnByb3BdID0gdGFyZ2V0O1xuICAgICAgaWYgKHNsaWRlci50cmFuc2l0aW9ucyB8fCBkdXIgPT09IHVuZGVmaW5lZCkgc2xpZGVyLmNvbnRhaW5lci5jc3Moc2xpZGVyLmFyZ3MpO1xuICAgIH1cblxuICAgIHNsaWRlci5zZXR1cCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgIC8vIFNMSURFOlxuICAgICAgaWYgKCFmYWRlKSB7XG4gICAgICAgIHZhciBzbGlkZXJPZmZzZXQsIGFycjtcblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJpbml0XCIpIHtcbiAgICAgICAgICBzbGlkZXIudmlld3BvcnQgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIG5hbWVzcGFjZSArICd2aWV3cG9ydFwiPjwvZGl2PicpLmNzcyh7XCJvdmVyZmxvd1wiOiBcImhpZGRlblwiLCBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIn0pLmFwcGVuZFRvKHNsaWRlcikuYXBwZW5kKHNsaWRlci5jb250YWluZXIpO1xuICAgICAgICAgIC8vIElORklOSVRFIExPT1A6XG4gICAgICAgICAgc2xpZGVyLmNsb25lQ291bnQgPSAwO1xuICAgICAgICAgIHNsaWRlci5jbG9uZU9mZnNldCA9IDA7XG4gICAgICAgICAgLy8gUkVWRVJTRTpcbiAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgYXJyID0gJC5tYWtlQXJyYXkoc2xpZGVyLnNsaWRlcykucmV2ZXJzZSgpO1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcyA9ICQoYXJyKTtcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIuZW1wdHkoKS5hcHBlbmQoc2xpZGVyLnNsaWRlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElORklOSVRFIExPT1AgJiYgIUNBUk9VU0VMOlxuICAgICAgICBpZiAodmFycy5hbmltYXRpb25Mb29wICYmICFjYXJvdXNlbCkge1xuICAgICAgICAgIHNsaWRlci5jbG9uZUNvdW50ID0gMjtcbiAgICAgICAgICBzbGlkZXIuY2xvbmVPZmZzZXQgPSAxO1xuICAgICAgICAgIC8vIGNsZWFyIG91dCBvbGQgY2xvbmVzXG4gICAgICAgICAgaWYgKHR5cGUgIT09IFwiaW5pdFwiKSBzbGlkZXIuY29udGFpbmVyLmZpbmQoJy5jbG9uZScpLnJlbW92ZSgpO1xuICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYXBwZW5kKHNsaWRlci5zbGlkZXMuZmlyc3QoKS5jbG9uZSgpLmFkZENsYXNzKCdjbG9uZScpKS5wcmVwZW5kKHNsaWRlci5zbGlkZXMubGFzdCgpLmNsb25lKCkuYWRkQ2xhc3MoJ2Nsb25lJykpO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5uZXdTbGlkZXMgPSAkKHZhcnMuc2VsZWN0b3IsIHNsaWRlcik7XG5cbiAgICAgICAgc2xpZGVyT2Zmc2V0ID0gKHJldmVyc2UpID8gc2xpZGVyLmNvdW50IC0gMSAtIHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQgOiBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0O1xuICAgICAgICAvLyBWRVJUSUNBTDpcbiAgICAgICAgaWYgKHZlcnRpY2FsICYmICFjYXJvdXNlbCkge1xuICAgICAgICAgIHNsaWRlci5jb250YWluZXIuaGVpZ2h0KChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVDb3VudCkgKiAyMDAgKyBcIiVcIikuY3NzKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKS53aWR0aChcIjEwMCVcIik7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2xpZGVyLm5ld1NsaWRlcy5jc3Moe1wiZGlzcGxheVwiOiBcImJsb2NrXCJ9KTtcbiAgICAgICAgICAgIHNsaWRlci5kb01hdGgoKTtcbiAgICAgICAgICAgIHNsaWRlci52aWV3cG9ydC5oZWlnaHQoc2xpZGVyLmgpO1xuICAgICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlck9mZnNldCAqIHNsaWRlci5oLCBcImluaXRcIik7XG4gICAgICAgICAgfSwgKHR5cGUgPT09IFwiaW5pdFwiKSA/IDEwMCA6IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlci5jb250YWluZXIud2lkdGgoKHNsaWRlci5jb3VudCArIHNsaWRlci5jbG9uZUNvdW50KSAqIDIwMCArIFwiJVwiKTtcbiAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyT2Zmc2V0ICogc2xpZGVyLmNvbXB1dGVkVywgXCJpbml0XCIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRlci5kb01hdGgoKTtcbiAgICAgICAgICAgIHNsaWRlci5uZXdTbGlkZXMuY3NzKHtcIndpZHRoXCI6IHNsaWRlci5jb21wdXRlZFcsIFwiZmxvYXRcIjogXCJsZWZ0XCIsIFwiZGlzcGxheVwiOiBcImJsb2NrXCJ9KTtcbiAgICAgICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgICAgICBpZiAodmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgfSwgKHR5cGUgPT09IFwiaW5pdFwiKSA/IDEwMCA6IDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBGQURFOlxuICAgICAgICBzbGlkZXIuc2xpZGVzLmNzcyh7XCJ3aWR0aFwiOiBcIjEwMCVcIiwgXCJmbG9hdFwiOiBcImxlZnRcIiwgXCJtYXJnaW5SaWdodFwiOiBcIi0xMDAlXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwifSk7XG4gICAgICAgIGlmICh0eXBlID09PSBcImluaXRcIikge1xuICAgICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuZXEoc2xpZGVyLmN1cnJlbnRTbGlkZSkuZmFkZUluKHZhcnMuYW5pbWF0aW9uU3BlZWQsIHZhcnMuZWFzaW5nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5jc3MoeyBcIm9wYWNpdHlcIjogMCwgXCJkaXNwbGF5XCI6IFwiYmxvY2tcIiwgXCJ3ZWJraXRUcmFuc2l0aW9uXCI6IFwib3BhY2l0eSBcIiArIHZhcnMuYW5pbWF0aW9uU3BlZWQgLyAxMDAwICsgXCJzIGVhc2VcIiwgXCJ6SW5kZXhcIjogMSB9KS5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5jc3MoeyBcIm9wYWNpdHlcIjogMSwgXCJ6SW5kZXhcIjogMn0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICBpZiAodmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICB9XG4gICAgICAvLyAhQ0FST1VTRUw6XG4gICAgICAvLyBDQU5ESURBVEU6IGFjdGl2ZSBzbGlkZVxuICAgICAgaWYgKCFjYXJvdXNlbCkgc2xpZGVyLnNsaWRlcy5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcbiAgICB9XG5cbiAgICBzbGlkZXIuZG9NYXRoID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2xpZGUgPSBzbGlkZXIuc2xpZGVzLmZpcnN0KCksXG4gICAgICAgICAgc2xpZGVNYXJnaW4gPSB2YXJzLml0ZW1NYXJnaW4sXG4gICAgICAgICAgbWluSXRlbXMgPSB2YXJzLm1pbkl0ZW1zLFxuICAgICAgICAgIG1heEl0ZW1zID0gdmFycy5tYXhJdGVtcztcblxuICAgICAgc2xpZGVyLncgPSBzbGlkZXIud2lkdGgoKTtcbiAgICAgIHNsaWRlci5oID0gc2xpZGUuaGVpZ2h0KCk7XG4gICAgICBzbGlkZXIuYm94UGFkZGluZyA9IHNsaWRlLm91dGVyV2lkdGgoKSAtIHNsaWRlLndpZHRoKCk7XG5cbiAgICAgIC8vIENBUk9VU0VMOlxuICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgIHNsaWRlci5pdGVtVCA9IHZhcnMuaXRlbVdpZHRoICsgc2xpZGVNYXJnaW47XG4gICAgICAgIHNsaWRlci5taW5XID0gKG1pbkl0ZW1zKSA/IG1pbkl0ZW1zICogc2xpZGVyLml0ZW1UIDogc2xpZGVyLnc7XG4gICAgICAgIHNsaWRlci5tYXhXID0gKG1heEl0ZW1zKSA/IG1heEl0ZW1zICogc2xpZGVyLml0ZW1UIDogc2xpZGVyLnc7XG4gICAgICAgIHNsaWRlci5pdGVtVyA9IChzbGlkZXIubWluVyA+IHNsaWRlci53KSA/IChzbGlkZXIudyAtIChzbGlkZU1hcmdpbiAqIG1pbkl0ZW1zKSkvbWluSXRlbXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLm1heFcgPCBzbGlkZXIudykgPyAoc2xpZGVyLncgLSAoc2xpZGVNYXJnaW4gKiBtYXhJdGVtcykpL21heEl0ZW1zIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKHZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gc2xpZGVyLncgOiB2YXJzLml0ZW1XaWR0aDtcbiAgICAgICAgc2xpZGVyLnZpc2libGUgPSBNYXRoLmZsb29yKHNsaWRlci53LyhzbGlkZXIuaXRlbVcgKyBzbGlkZU1hcmdpbikpO1xuICAgICAgICBzbGlkZXIubW92ZSA9ICh2YXJzLm1vdmUgPiAwICYmIHZhcnMubW92ZSA8IHNsaWRlci52aXNpYmxlICkgPyB2YXJzLm1vdmUgOiBzbGlkZXIudmlzaWJsZTtcbiAgICAgICAgc2xpZGVyLnBhZ2luZ0NvdW50ID0gTWF0aC5jZWlsKCgoc2xpZGVyLmNvdW50IC0gc2xpZGVyLnZpc2libGUpL3NsaWRlci5tb3ZlKSArIDEpO1xuICAgICAgICBzbGlkZXIubGFzdCA9ICBzbGlkZXIucGFnaW5nQ291bnQgLSAxO1xuICAgICAgICBzbGlkZXIubGltaXQgPSAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAodmFycy5pdGVtV2lkdGggPiBzbGlkZXIudykgPyAoKHNsaWRlci5pdGVtVyArIChzbGlkZU1hcmdpbiAqIDIpKSAqIHNsaWRlci5jb3VudCkgLSBzbGlkZXIudyAtIHNsaWRlTWFyZ2luIDogKChzbGlkZXIuaXRlbVcgKyBzbGlkZU1hcmdpbikgKiBzbGlkZXIuY291bnQpIC0gc2xpZGVyLncgLSBzbGlkZU1hcmdpbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5pdGVtVyA9IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIucGFnaW5nQ291bnQgPSBzbGlkZXIuY291bnQ7XG4gICAgICAgIHNsaWRlci5sYXN0ID0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgIH1cbiAgICAgIHNsaWRlci5jb21wdXRlZFcgPSBzbGlkZXIuaXRlbVcgLSBzbGlkZXIuYm94UGFkZGluZztcbiAgICB9XG5cbiAgICBzbGlkZXIudXBkYXRlID0gZnVuY3Rpb24ocG9zLCBhY3Rpb24pIHtcbiAgICAgIHNsaWRlci5kb01hdGgoKTtcblxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRTbGlkZSBhbmQgc2xpZGVyLmFuaW1hdGluZ1RvIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKCFjYXJvdXNlbCkge1xuICAgICAgICBpZiAocG9zIDwgc2xpZGVyLmN1cnJlbnRTbGlkZSkge1xuICAgICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPD0gc2xpZGVyLmN1cnJlbnRTbGlkZSAmJiBwb3MgIT09IDApIHtcbiAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGNvbnRyb2xOYXZcbiAgICAgIGlmICh2YXJzLmNvbnRyb2xOYXYgJiYgIXNsaWRlci5tYW51YWxDb250cm9scykge1xuICAgICAgICBpZiAoKGFjdGlvbiA9PT0gXCJhZGRcIiAmJiAhY2Fyb3VzZWwpIHx8IHNsaWRlci5wYWdpbmdDb3VudCA+IHNsaWRlci5jb250cm9sTmF2Lmxlbmd0aCkge1xuICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi51cGRhdGUoXCJhZGRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoKGFjdGlvbiA9PT0gXCJyZW1vdmVcIiAmJiAhY2Fyb3VzZWwpIHx8IHNsaWRlci5wYWdpbmdDb3VudCA8IHNsaWRlci5jb250cm9sTmF2Lmxlbmd0aCkge1xuICAgICAgICAgIGlmIChjYXJvdXNlbCAmJiBzbGlkZXIuY3VycmVudFNsaWRlID4gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgLT0gMTtcbiAgICAgICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyAtPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYudXBkYXRlKFwicmVtb3ZlXCIsIHNsaWRlci5sYXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIGRpcmVjdGlvbk5hdlxuICAgICAgaWYgKHZhcnMuZGlyZWN0aW9uTmF2KSBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgIH1cblxuICAgIHNsaWRlci5hZGRTbGlkZSA9IGZ1bmN0aW9uKG9iaiwgcG9zKSB7XG4gICAgICB2YXIgJG9iaiA9ICQob2JqKTtcblxuICAgICAgc2xpZGVyLmNvdW50ICs9IDE7XG4gICAgICBzbGlkZXIubGFzdCA9IHNsaWRlci5jb3VudCAtIDE7XG5cbiAgICAgIC8vIGFwcGVuZCBuZXcgc2xpZGVcbiAgICAgIGlmICh2ZXJ0aWNhbCAmJiByZXZlcnNlKSB7XG4gICAgICAgIChwb3MgIT09IHVuZGVmaW5lZCkgPyBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jb3VudCAtIHBvcykuYWZ0ZXIoJG9iaikgOiBzbGlkZXIuY29udGFpbmVyLnByZXBlbmQoJG9iaik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAocG9zICE9PSB1bmRlZmluZWQpID8gc2xpZGVyLnNsaWRlcy5lcShwb3MpLmJlZm9yZSgkb2JqKSA6IHNsaWRlci5jb250YWluZXIuYXBwZW5kKCRvYmopO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgY3VycmVudFNsaWRlLCBhbmltYXRpbmdUbywgY29udHJvbE5hdiwgYW5kIGRpcmVjdGlvbk5hdlxuICAgICAgc2xpZGVyLnVwZGF0ZShwb3MsIFwiYWRkXCIpO1xuXG4gICAgICAvLyB1cGRhdGUgc2xpZGVyLnNsaWRlc1xuICAgICAgc2xpZGVyLnNsaWRlcyA9ICQodmFycy5zZWxlY3RvciArICc6bm90KC5jbG9uZSknLCBzbGlkZXIpO1xuICAgICAgLy8gcmUtc2V0dXAgdGhlIHNsaWRlciB0byBhY2NvbWRhdGUgbmV3IHNsaWRlXG4gICAgICBzbGlkZXIuc2V0dXAoKTtcblxuICAgICAgLy9GbGV4U2xpZGVyOiBhZGRlZCgpIENhbGxiYWNrXG4gICAgICB2YXJzLmFkZGVkKHNsaWRlcik7XG4gICAgfVxuICAgIHNsaWRlci5yZW1vdmVTbGlkZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIHBvcyA9IChpc05hTihvYmopKSA/IHNsaWRlci5zbGlkZXMuaW5kZXgoJChvYmopKSA6IG9iajtcblxuICAgICAgLy8gdXBkYXRlIGNvdW50XG4gICAgICBzbGlkZXIuY291bnQgLT0gMTtcbiAgICAgIHNsaWRlci5sYXN0ID0gc2xpZGVyLmNvdW50IC0gMTtcblxuICAgICAgLy8gcmVtb3ZlIHNsaWRlXG4gICAgICBpZiAoaXNOYU4ob2JqKSkge1xuICAgICAgICAkKG9iaiwgc2xpZGVyLnNsaWRlcykucmVtb3ZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAodmVydGljYWwgJiYgcmV2ZXJzZSkgPyBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5sYXN0KS5yZW1vdmUoKSA6IHNsaWRlci5zbGlkZXMuZXEob2JqKS5yZW1vdmUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRTbGlkZSwgYW5pbWF0aW5nVG8sIGNvbnRyb2xOYXYsIGFuZCBkaXJlY3Rpb25OYXZcbiAgICAgIHNsaWRlci5kb01hdGgoKTtcbiAgICAgIHNsaWRlci51cGRhdGUocG9zLCBcInJlbW92ZVwiKTtcblxuICAgICAgLy8gdXBkYXRlIHNsaWRlci5zbGlkZXNcbiAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHZhcnMuc2VsZWN0b3IgKyAnOm5vdCguY2xvbmUpJywgc2xpZGVyKTtcbiAgICAgIC8vIHJlLXNldHVwIHRoZSBzbGlkZXIgdG8gYWNjb21kYXRlIG5ldyBzbGlkZVxuICAgICAgc2xpZGVyLnNldHVwKCk7XG5cbiAgICAgIC8vIEZsZXhTbGlkZXI6IHJlbW92ZWQoKSBDYWxsYmFja1xuICAgICAgdmFycy5yZW1vdmVkKHNsaWRlcik7XG4gICAgfVxuXG4gICAgLy9GbGV4U2xpZGVyOiBJbml0aWFsaXplXG4gICAgbWV0aG9kcy5pbml0KCk7XG4gIH1cblxuICAvL0ZsZXhTbGlkZXI6IERlZmF1bHQgU2V0dGluZ3NcbiAgJC5mbGV4c2xpZGVyLmRlZmF1bHRzID0ge1xuICAgIG5hbWVzcGFjZTogXCJmbGV4LVwiLCAgICAgICAgICAgICAvL3tORVd9IFN0cmluZzogUHJlZml4IHN0cmluZyBhdHRhY2hlZCB0byB0aGUgY2xhc3Mgb2YgZXZlcnkgZWxlbWVudCBnZW5lcmF0ZWQgYnkgdGhlIHBsdWdpblxuICAgIHNlbGVjdG9yOiBcIi5zbGlkZXMgPiBsaVwiLCAgICAgICAvL3tORVd9IFNlbGVjdG9yOiBNdXN0IG1hdGNoIGEgc2ltcGxlIHBhdHRlcm4uICd7Y29udGFpbmVyfSA+IHtzbGlkZX0nIC0tIElnbm9yZSBwYXR0ZXJuIGF0IHlvdXIgb3duIHBlcmlsXG4gICAgYW5pbWF0aW9uOiBcImZhZGVcIiwgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZWxlY3QgeW91ciBhbmltYXRpb24gdHlwZSwgXCJmYWRlXCIgb3IgXCJzbGlkZVwiXG4gICAgZWFzaW5nOiBcInN3aW5nXCIsICAgICAgICAgICAgICAgLy97TkVXfSBTdHJpbmc6IERldGVybWluZXMgdGhlIGVhc2luZyBtZXRob2QgdXNlZCBpbiBqUXVlcnkgdHJhbnNpdGlvbnMuIGpRdWVyeSBlYXNpbmcgcGx1Z2luIGlzIHN1cHBvcnRlZCFcbiAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLCAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB0aGUgc2xpZGluZyBkaXJlY3Rpb24sIFwiaG9yaXpvbnRhbFwiIG9yIFwidmVydGljYWxcIlxuICAgIHJldmVyc2U6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy97TkVXfSBCb29sZWFuOiBSZXZlcnNlIHRoZSBhbmltYXRpb24gZGlyZWN0aW9uXG4gICAgYW5pbWF0aW9uTG9vcDogdHJ1ZSwgICAgICAgICAgICAgLy9Cb29sZWFuOiBTaG91bGQgdGhlIGFuaW1hdGlvbiBsb29wPyBJZiBmYWxzZSwgZGlyZWN0aW9uTmF2IHdpbGwgcmVjZWl2ZWQgXCJkaXNhYmxlXCIgY2xhc3NlcyBhdCBlaXRoZXIgZW5kXG4gICAgc21vb3RoSGVpZ2h0OiBmYWxzZSwgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IEFsbG93IGhlaWdodCBvZiB0aGUgc2xpZGVyIHRvIGFuaW1hdGUgc21vb3RobHkgaW4gaG9yaXpvbnRhbCBtb2RlXG4gICAgc3RhcnRBdDogMCwgICAgICAgICAgICAgICAgICAgICAvL0ludGVnZXI6IFRoZSBzbGlkZSB0aGF0IHRoZSBzbGlkZXIgc2hvdWxkIHN0YXJ0IG9uLiBBcnJheSBub3RhdGlvbiAoMCA9IGZpcnN0IHNsaWRlKVxuICAgIHNsaWRlc2hvdzogdHJ1ZSwgICAgICAgICAgICAgICAgLy9Cb29sZWFuOiBBbmltYXRlIHNsaWRlciBhdXRvbWF0aWNhbGx5XG4gICAgc2xpZGVzaG93U3BlZWQ6IDcwMDAsICAgICAgICAgICAvL0ludGVnZXI6IFNldCB0aGUgc3BlZWQgb2YgdGhlIHNsaWRlc2hvdyBjeWNsaW5nLCBpbiBtaWxsaXNlY29uZHNcbiAgICBhbmltYXRpb25TcGVlZDogNjAwLCAgICAgICAgICAgIC8vSW50ZWdlcjogU2V0IHRoZSBzcGVlZCBvZiBhbmltYXRpb25zLCBpbiBtaWxsaXNlY29uZHNcbiAgICBpbml0RGVsYXk6IDAsICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogU2V0IGFuIGluaXRpYWxpemF0aW9uIGRlbGF5LCBpbiBtaWxsaXNlY29uZHNcbiAgICByYW5kb21pemU6IGZhbHNlLCAgICAgICAgICAgICAgIC8vQm9vbGVhbjogUmFuZG9taXplIHNsaWRlIG9yZGVyXG5cbiAgICAvLyBVc2FiaWxpdHkgZmVhdHVyZXNcbiAgICBwYXVzZU9uQWN0aW9uOiB0cnVlLCAgICAgICAgICAgIC8vQm9vbGVhbjogUGF1c2UgdGhlIHNsaWRlc2hvdyB3aGVuIGludGVyYWN0aW5nIHdpdGggY29udHJvbCBlbGVtZW50cywgaGlnaGx5IHJlY29tbWVuZGVkLlxuICAgIHBhdXNlT25Ib3ZlcjogZmFsc2UsICAgICAgICAgICAgLy9Cb29sZWFuOiBQYXVzZSB0aGUgc2xpZGVzaG93IHdoZW4gaG92ZXJpbmcgb3ZlciBzbGlkZXIsIHRoZW4gcmVzdW1lIHdoZW4gbm8gbG9uZ2VyIGhvdmVyaW5nXG4gICAgdXNlQ1NTOiB0cnVlLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IFNsaWRlciB3aWxsIHVzZSBDU1MzIHRyYW5zaXRpb25zIGlmIGF2YWlsYWJsZVxuICAgIHRvdWNoOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgLy97TkVXfSBCb29sZWFuOiBBbGxvdyB0b3VjaCBzd2lwZSBuYXZpZ2F0aW9uIG9mIHRoZSBzbGlkZXIgb24gdG91Y2gtZW5hYmxlZCBkZXZpY2VzXG4gICAgdmlkZW86IGZhbHNlLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IElmIHVzaW5nIHZpZGVvIGluIHRoZSBzbGlkZXIsIHdpbGwgcHJldmVudCBDU1MzIDNEIFRyYW5zZm9ybXMgdG8gYXZvaWQgZ3JhcGhpY2FsIGdsaXRjaGVzXG5cbiAgICAvLyBQcmltYXJ5IENvbnRyb2xzXG4gICAgY29udHJvbE5hdjogdHJ1ZSwgICAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBuYXZpZ2F0aW9uIGZvciBwYWdpbmcgY29udHJvbCBvZiBlYWNoIGNsaWRlPyBOb3RlOiBMZWF2ZSB0cnVlIGZvciBtYW51YWxDb250cm9scyB1c2FnZVxuICAgIGRpcmVjdGlvbk5hdjogdHJ1ZSwgICAgICAgICAgICAgLy9Cb29sZWFuOiBDcmVhdGUgbmF2aWdhdGlvbiBmb3IgcHJldmlvdXMvbmV4dCBuYXZpZ2F0aW9uPyAodHJ1ZS9mYWxzZSlcbiAgICBwcmV2VGV4dDogXCJQcmV2aW91c1wiLCAgICAgICAgICAgLy9TdHJpbmc6IFNldCB0aGUgdGV4dCBmb3IgdGhlIFwicHJldmlvdXNcIiBkaXJlY3Rpb25OYXYgaXRlbVxuICAgIG5leHRUZXh0OiBcIk5leHRcIiwgICAgICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJuZXh0XCIgZGlyZWN0aW9uTmF2IGl0ZW1cblxuICAgIC8vIFNlY29uZGFyeSBOYXZpZ2F0aW9uXG4gICAga2V5Ym9hcmQ6IHRydWUsICAgICAgICAgICAgICAgICAvL0Jvb2xlYW46IEFsbG93IHNsaWRlciBuYXZpZ2F0aW5nIHZpYSBrZXlib2FyZCBsZWZ0L3JpZ2h0IGtleXNcbiAgICBtdWx0aXBsZUtleWJvYXJkOiBmYWxzZSwgICAgICAgIC8ve05FV30gQm9vbGVhbjogQWxsb3cga2V5Ym9hcmQgbmF2aWdhdGlvbiB0byBhZmZlY3QgbXVsdGlwbGUgc2xpZGVycy4gRGVmYXVsdCBiZWhhdmlvciBjdXRzIG91dCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdpdGggbW9yZSB0aGFuIG9uZSBzbGlkZXIgcHJlc2VudC5cbiAgICBtb3VzZXdoZWVsOiBmYWxzZSwgICAgICAgICAgICAgIC8ve1VQREFURUR9IEJvb2xlYW46IFJlcXVpcmVzIGpxdWVyeS5tb3VzZXdoZWVsLmpzIChodHRwczovL2dpdGh1Yi5jb20vYnJhbmRvbmFhcm9uL2pxdWVyeS1tb3VzZXdoZWVsKSAtIEFsbG93cyBzbGlkZXIgbmF2aWdhdGluZyB2aWEgbW91c2V3aGVlbFxuICAgIHBhdXNlUGxheTogZmFsc2UsICAgICAgICAgICAgICAgLy9Cb29sZWFuOiBDcmVhdGUgcGF1c2UvcGxheSBkeW5hbWljIGVsZW1lbnRcbiAgICBwYXVzZVRleHQ6IFwiUGF1c2VcIiwgICAgICAgICAgICAgLy9TdHJpbmc6IFNldCB0aGUgdGV4dCBmb3IgdGhlIFwicGF1c2VcIiBwYXVzZVBsYXkgaXRlbVxuICAgIHBsYXlUZXh0OiBcIlBsYXlcIiwgICAgICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwbGF5XCIgcGF1c2VQbGF5IGl0ZW1cblxuICAgIC8vIFNwZWNpYWwgcHJvcGVydGllc1xuICAgIGNvbnRyb2xzQ29udGFpbmVyOiBcIlwiLCAgICAgICAgICAvL3tVUERBVEVEfSBqUXVlcnkgT2JqZWN0L1NlbGVjdG9yOiBEZWNsYXJlIHdoaWNoIGNvbnRhaW5lciB0aGUgbmF2aWdhdGlvbiBlbGVtZW50cyBzaG91bGQgYmUgYXBwZW5kZWQgdG9vLiBEZWZhdWx0IGNvbnRhaW5lciBpcyB0aGUgRmxleFNsaWRlciBlbGVtZW50LiBFeGFtcGxlIHVzZSB3b3VsZCBiZSAkKFwiLmZsZXhzbGlkZXItY29udGFpbmVyXCIpLiBQcm9wZXJ0eSBpcyBpZ25vcmVkIGlmIGdpdmVuIGVsZW1lbnQgaXMgbm90IGZvdW5kLlxuICAgIG1hbnVhbENvbnRyb2xzOiBcIlwiLCAgICAgICAgICAgICAvL3tVUERBVEVEfSBqUXVlcnkgT2JqZWN0L1NlbGVjdG9yOiBEZWNsYXJlIGN1c3RvbSBjb250cm9sIG5hdmlnYXRpb24uIEV4YW1wbGVzIHdvdWxkIGJlICQoXCIuZmxleC1jb250cm9sLW5hdiBsaVwiKSBvciBcIiN0YWJzLW5hdiBsaSBpbWdcIiwgZXRjLiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHlvdXIgY29udHJvbE5hdiBzaG91bGQgbWF0Y2ggdGhlIG51bWJlciBvZiBzbGlkZXMvdGFicy5cbiAgICBzeW5jOiBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgLy97TkVXfSBTZWxlY3RvcjogTWlycm9yIHRoZSBhY3Rpb25zIHBlcmZvcm1lZCBvbiB0aGlzIHNsaWRlciB3aXRoIGFub3RoZXIgc2xpZGVyLiBVc2Ugd2l0aCBjYXJlLlxuICAgIGFzTmF2Rm9yOiBcIlwiLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IFNlbGVjdG9yOiBJbnRlcm5hbCBwcm9wZXJ0eSBleHBvc2VkIGZvciB0dXJuaW5nIHRoZSBzbGlkZXIgaW50byBhIHRodW1ibmFpbCBuYXZpZ2F0aW9uIGZvciBhbm90aGVyIHNsaWRlclxuXG4gICAgLy8gQ2Fyb3VzZWwgT3B0aW9uc1xuICAgIGl0ZW1XaWR0aDogMCwgICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBCb3gtbW9kZWwgd2lkdGggb2YgaW5kaXZpZHVhbCBjYXJvdXNlbCBpdGVtcywgaW5jbHVkaW5nIGhvcml6b250YWwgYm9yZGVycyBhbmQgcGFkZGluZy5cbiAgICBpdGVtTWFyZ2luOiAwLCAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTWFyZ2luIGJldHdlZW4gY2Fyb3VzZWwgaXRlbXMuXG4gICAgbWluSXRlbXM6IDAsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IE1pbmltdW0gbnVtYmVyIG9mIGNhcm91c2VsIGl0ZW1zIHRoYXQgc2hvdWxkIGJlIHZpc2libGUuIEl0ZW1zIHdpbGwgcmVzaXplIGZsdWlkbHkgd2hlbiBiZWxvdyB0aGlzLlxuICAgIG1heEl0ZW1zOiAwLCAgICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBNYXhtaW11bSBudW1iZXIgb2YgY2Fyb3VzZWwgaXRlbXMgdGhhdCBzaG91bGQgYmUgdmlzaWJsZS4gSXRlbXMgd2lsbCByZXNpemUgZmx1aWRseSB3aGVuIGFib3ZlIHRoaXMgbGltaXQuXG4gICAgbW92ZTogMCwgICAgICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IE51bWJlciBvZiBjYXJvdXNlbCBpdGVtcyB0aGF0IHNob3VsZCBtb3ZlIG9uIGFuaW1hdGlvbi4gSWYgMCwgc2xpZGVyIHdpbGwgbW92ZSBhbGwgdmlzaWJsZSBpdGVtcy5cblxuICAgIC8vIENhbGxiYWNrIEFQSVxuICAgIHN0YXJ0OiBmdW5jdGlvbigpe30sICAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIHdoZW4gdGhlIHNsaWRlciBsb2FkcyB0aGUgZmlyc3Qgc2xpZGVcbiAgICBiZWZvcmU6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgIC8vQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhc3luY2hyb25vdXNseSB3aXRoIGVhY2ggc2xpZGVyIGFuaW1hdGlvblxuICAgIGFmdGVyOiBmdW5jdGlvbigpe30sICAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFmdGVyIGVhY2ggc2xpZGVyIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICBlbmQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAgIC8vQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyB3aGVuIHRoZSBzbGlkZXIgcmVhY2hlcyB0aGUgbGFzdCBzbGlkZSAoYXN5bmNocm9ub3VzKVxuICAgIGFkZGVkOiBmdW5jdGlvbigpe30sICAgICAgICAgICAgLy97TkVXfSBDYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFmdGVyIGEgc2xpZGUgaXMgYWRkZWRcbiAgICByZW1vdmVkOiBmdW5jdGlvbigpe30gICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciBhIHNsaWRlIGlzIHJlbW92ZWRcbiAgfVxuXG5cbiAgLy9GbGV4U2xpZGVyOiBQbHVnaW4gRnVuY3Rpb25cbiAgJC5mbi5mbGV4c2xpZGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIG9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHNlbGVjdG9yID0gKG9wdGlvbnMuc2VsZWN0b3IpID8gb3B0aW9ucy5zZWxlY3RvciA6IFwiLnNsaWRlcyA+IGxpXCIsXG4gICAgICAgICAgICAkc2xpZGVzID0gJHRoaXMuZmluZChzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKCRzbGlkZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgJHNsaWRlcy5mYWRlSW4oNDAwKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5zdGFydCkgb3B0aW9ucy5zdGFydCgkdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRoaXMuZGF0YSgnZmxleHNsaWRlcicpID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5ldyAkLmZsZXhzbGlkZXIodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIZWxwZXIgc3RyaW5ncyB0byBxdWlja2x5IHBlcmZvcm0gZnVuY3Rpb25zIG9uIHRoZSBzbGlkZXJcbiAgICAgIHZhciAkc2xpZGVyID0gJCh0aGlzKS5kYXRhKCdmbGV4c2xpZGVyJyk7XG4gICAgICBzd2l0Y2ggKG9wdGlvbnMpIHtcbiAgICAgICAgY2FzZSBcInBsYXlcIjogJHNsaWRlci5wbGF5KCk7IGJyZWFrO1xuICAgICAgICBjYXNlIFwicGF1c2VcIjogJHNsaWRlci5wYXVzZSgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcIm5leHRcIjogJHNsaWRlci5mbGV4QW5pbWF0ZSgkc2xpZGVyLmdldFRhcmdldChcIm5leHRcIiksIHRydWUpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgY2FzZSBcInByZXZpb3VzXCI6ICRzbGlkZXIuZmxleEFuaW1hdGUoJHNsaWRlci5nZXRUYXJnZXQoXCJwcmV2XCIpLCB0cnVlKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJudW1iZXJcIikgJHNsaWRlci5mbGV4QW5pbWF0ZShvcHRpb25zLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSkoalF1ZXJ5KTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3ZlbmRvci9qcXVlcnkuZmxleHNsaWRlci5qc1wiLFwiL3ZlbmRvclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIGJ1ZmZlcmBcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuQnVmZmVyLnBvb2xTaXplID0gODE5MlxuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSAoZnVuY3Rpb24gKCkge1xuICAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKyxcbiAgIC8vIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIC8vIERvZXMgdGhlIGJyb3dzZXIgc3VwcG9ydCBhZGRpbmcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzPyBJZlxuICAvLyBub3QsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0LiBXZSBuZWVkIHRvIGJlIGFibGUgdG9cbiAgLy8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuXG4gIC8vIFJlbGV2YW50IEZpcmVmb3ggYnVnOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdClcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9J1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdClcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCkgLy8gQXNzdW1lIG9iamVjdCBpcyBhbiBhcnJheVxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpXG5cbiAgdmFyIGJ1ZlxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBhdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgc3ViamVjdCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSBVaW50OEFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgICAgZWxzZVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0W2ldXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArXG4gICAgICAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDJcbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwXG4gIGVuZCA9IChlbmQgIT09IHVuZGVmaW5lZClcbiAgICA/IE51bWJlcihlbmQpXG4gICAgOiBlbmQgPSBzZWxmLmxlbmd0aFxuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpXG4gICAgcmV0dXJuICcnXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCxcbiAgICAgICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICAvLyBjb3B5IVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyBpKyspXG4gICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspXG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2krMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMClcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbilcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBhdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZcbiAgfVxufVxuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KVxufVxuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICAgIHZhbCB8PSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMClcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDNdXG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCxcbiAgICAgICAgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRGbG9hdCAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZERvdWJsZSAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm5cblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgICAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydClcbiAgZWxzZVxuICAgIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLFxuICAgICAgICAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMFxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoXG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMClcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKVxuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKVxuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW11cbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKVxuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLidcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+J1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKVxuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IHRoZSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbmZ1bmN0aW9uIGF1Z21lbnQgKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZVxuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXRcbiAgYXJyLl9zZXQgPSBhcnIuc2V0XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldFxuICBhcnIuc2V0ID0gQlAuc2V0XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGVcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTlxuICBhcnIuY29weSA9IEJQLmNvcHlcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2VcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50OFxuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFXG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkVcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRVxuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFXG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFXG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFXG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFXG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFXG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFXG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFXG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEVcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRVxuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDhcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFXG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRVxuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEVcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFXG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDhcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRVxuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFXG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEVcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRVxuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFXG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkVcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFXG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRVxuICBhcnIuZmlsbCA9IEJQLmZpbGxcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlclxuXG4gIHJldHVybiBhcnJcbn1cblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wIChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgaW5kZXggPSB+fmluZGV4OyAgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICBpbmRleCArPSBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBjb2VyY2UgKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpXG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbiAgfSkoc3ViamVjdClcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaCAoc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHxcbiAgICAgIHN1YmplY3QgJiYgdHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGIgPD0gMHg3RilcbiAgICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaVxuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKytcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSsxKSkuc3Vic3RyKDEpLnNwbGl0KCclJylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKylcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpXG4gICAgICBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyIChzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50ICh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA+PSAwLFxuICAgICAgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1wiLFwiLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgWkVSTyAgID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSClcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5XG5cdG1vZHVsZS5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0XG59KCkpXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL1VzZXJzL2pvc2h1YS5sYXdyZW5jZS9TaXRlcy9mcmFtZXdvcmtzL3dvcmRwcmVzcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbihidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIG5CaXRzID0gLTcsXG4gICAgICBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDAsXG4gICAgICBkID0gaXNMRSA/IC0xIDogMSxcbiAgICAgIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XG5cbiAgaSArPSBkO1xuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBzID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gZUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIGUgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBtTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbik7XG59O1xuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGMsXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApLFxuICAgICAgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpLFxuICAgICAgZCA9IGlzTEUgPyAxIDogLTEsXG4gICAgICBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwO1xuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKTtcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KTtcblxuICBlID0gKGUgPDwgbUxlbikgfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCk7XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4O1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvVXNlcnMvam9zaHVhLmxhd3JlbmNlL1NpdGVzL2ZyYW1ld29ya3Mvd29yZHByZXNzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9Vc2Vycy9qb3NodWEubGF3cmVuY2UvU2l0ZXMvZnJhbWV3b3Jrcy93b3JkcHJlc3Mvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzc1wiKSJdfQ==
