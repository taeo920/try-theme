/**
 * Module: util
 * General helper functions
 */

/**
 * Client data
 */
var urls = (typeof window.urls === "undefined") ? {} : urls;
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
var consolePolyfill = function () {
	var method;
	var noop = function () {};
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
 * A polyfill to provide a native placeholder experience to browsers that don't support it
 */
var placeholderPolyfill = function () {
	if (!Modernizr.input.placeholder) {
		$('input').each(function() {
			var $el = $(this);
			var placeholderText = $el.attr('placeholder');

			if (placeholderText) {
				$el.addClass('placeholder-text').val(placeholderText)
					.bind('focus', function() {
						if ($el.val() === placeholderText) {
							$el.val('').removeClass('placeholder-text');
						}
					}).bind('blur', function() {
						if ($el.val() === '') {
							$el.val(placeholderText).addClass('placeholder-text');
						}
					});
			}
		});
	}
};

/**
 * Public API
 */
module.exports = {
	init: function() {
		consolePolyfill();
		placeholderPolyfill();
	},
	urls: urls,
	user: user
};