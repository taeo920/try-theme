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