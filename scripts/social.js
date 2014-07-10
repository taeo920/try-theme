/*
 *  Module: social
 */

var $ = require('jquery');

var defaults = {
	channelAttrName: "share-channel",
	detailAttrName: "share-details",
	fbAppID: ""
};

/**
 * Constructor
 * @param {Object} options Optional properties to override defaults
 */
function SocialShare(options) {
	this.options = $.extend({}, defaults, options);
	this.init();
}

/**
 * Setup
 */
SocialShare.prototype.init = function () {
	var self = this;

	// Grab all the elements with valid channel data attributes
	$('[data-' + self.options.channelAttrName + ']').each(function() {
		// on click trigger the appropriate share function
		$(this).on('click', function () {
			var channel = $(this).data(self.options.channelAttrName);
			var details = $(this).data(self.options.detailAttrName);

			var detailObj = self.getDetailObj(channel, details);
			var url = self[channel + 'Share'](detailObj);

			if (url) {
				$(this).attr('href', url);
				return true;
			}

			return false;
		});
	});
}

/**
 * Returns an object with the apropriate share data
 * @param  {String} channel Name of the social channel
 * @param  {String} details Comma separated text describing share info
 * @return {Object} share   channel specific content
 */
SocialShare.prototype.getDetailObj = function (channel, details) {
	var detailObj;
	var data = details.split(',');

	// Trim whitespace from data
	$.each(data, function(i) {
		data[i] = this.trim(data[i]);
	});

	switch (channel) {
		case 'facebook':
			detailObj = {
				title: data[0],
				description: data[1],
				url: data[2],
				image: data[3],
				caption: data[4]
			}
			break;

		case 'twitter':
			detailObj = {
				text: data[0],
				url: data[1],
				via: data[2],
				hashtags: data[3]
			}
			break;

		case 'pinterest':
			detailObj = {
				url: data[0],
				media: data[1],
				description: data[2]
			}
			break;

		default:
			break;
	}

	return detailObj;
}

/**
 * Loads FBSDK if needed and pops a share dialogue
 * @return {false} Returns false to disable default link behavior on click
 */
SocialShare.prototype.facebookShare = function (details) {
	var options = this.options;

	// check for fb sdk, if not present add to page
	if (!window.fbAsyncInit) {
		$('body').append('<div id="fb-root"></div>');

		// Asynchronously load fb jssdk
		var e = document.createElement('script');
		e.async = true;
		e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);

		// Initialize Facebook app
		window.fbAsyncInit = function() {
			FB.init({
				appId: options.fbAppID, // App ID from the App Dashboard
				status: false, // check the login status upon init?
				cookie: true, // set sessions cookies to allow your server to access the session?
				xfbml: true // parse XFBML tags on this page?
			});
			openDialog();
		};
	} else {
		openDialog();
	}

	// Open Facebook share dialog w/provided data
	function openDialog() {
		FB.ui({
			method: 'feed',
			name: details.title,
			link: details.url,
			picture: details.image,
			caption: details.caption,
			description: details.description
		});
	}

	return false;
}

/**
 * Builds Twitter share url
 * @return {String}
 */
SocialShare.prototype.twitterShare = function (details) {
	return 'http://twitter.com/share?url=' + encodeURI(details.url) + '&text=' + details.text + '&hashtags=' + details.hashtags;
}

/**
 * Builds Pinterest share url
 * @return {String}
 */
SocialShare.prototype.pinterestShare = function (details) {
	var url = details.url || document.location.href;
	return 'http://www.pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&media=' + encodeURI(details.media) + '&description=' + details.description;;
}

/**
 * Public API
 * @type {Object}
 */
module.exports = {
	init: function () {
		return new SocialShare();
	}
};