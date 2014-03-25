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