/*
 *  Module: social
 */

require('jquery-colorbox');

var $ 			= require('jquery');
var utilities 	= require('./utilities.js');

var defaults = {
	channelAttrName: "share-channel",
	fbAppId: ''
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
			var data = $(this).data();
			var channel = data[ utilities.dashToCamel(self.options.channelAttrName) ];

			if ( channel === 'email' ) {
				openEmailShare.call(self, this);
				return;
			}

			var url = self[channel + 'Share'](data);
			// if url is a string open popup
			var popup = (url) ? window.open(url, 'share', 'resizable=yes,scrollbars=yes,width=600,height=500') : false;
			return false;
		});
	});
}

/**
 * Open lightbox with email share form
 */
function openEmailShare(el) {
	var self = this;

	// open lightbox with form
	$.colorbox({
		iframe: false,
		href: urls.ajax,
		data: {
			action: 'try_get_modal',
			template: 'modal-email-share',
			post_id: $(el).data('post-id')
		},
		onComplete: function() {
			var form = $('.form--email-share');
			var button = form.find('[type="submit"]');

			form.on('submit', function(e) {
				e.preventDefault();

				form.find('.form-error-notice').remove();
				form.find('.form-error').removeClass('error');
				$.colorbox.resize();

				if( !button.hasClass('btn--disabled') ) {
					var sender = form.find('input[name="sender"]').val();
					var recipient = form.find('input[name="recipient"]').val();
					var errors = new Array();

					if( !utilities.isEmail( sender ) ) errors.push('sender');
					if( !utilities.isEmail( recipient ) ) errors.push('recipient');

					if( errors.length > 0 ) {
						form.prepend('<p class="form-error-notice col-xs-12">Please provide valid email addresses.</p>');

						$.each( errors, function( index, value ) {
							var field = form.find('input[name="' + value + '"]');
							field.addClass('form-error');
						});

						$.colorbox.resize();
					} else {
						$.ajax({
							url: urls.ajax,
							dataType: 'json',
							type: 'POST',
							data: {
								action: 'try_submit_email_share_form',
								data: form.serialize(),
								nonce: form.data('nonce')
							},
							beforeSend: function() {
								button.addClass('btn--disabled');
							},
							success: function(data) {
								form.after('<div class="row"><span class="col-xs-12 success-message">Thank you for sharing!</span></div>');
								form.remove();
								$.colorbox.resize();
							},
							complete: function() {
								button.removeClass('btn--disabled');
							}
						});
					}
				}
			});
		},
		close: ''
	});
}

/**
 * Loads FBSDK if needed and pops a share dialogue
 * @return {false} Returns false to disable default link behavior on click
 */
SocialShare.prototype.facebookShare = function (details) {
	var options = this.options;

	function loadFbSdk(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	};

	// check for fb sdk, if not present add to page
	if (!window.fbAsyncInit) {
		$('body').append('<div id="fb-root"></div>');

		// Asynchronously load fb jssdk
		loadFbSdk(document, 'script', 'facebook-jssdk');

		// Initialize Facebook app
		window.fbAsyncInit = function() {
			FB.init({
				appId: options.fbAppId, // App ID from the App Dashboard
				status: false, // check the login status upon init?
				cookie: true, // set sessions cookies to allow your server to access the session?
				xfbml: true, // parse XFBML tags on this page?
				version: 'v2.1'
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
	var url = details.url || document.location.href;
	var text = details.text.substring(0, 140) || "";
	var hashtags = details.hashtags || "";
	var via = details.via || "";
	return 'http://twitter.com/share?url=' + encodeURI(url) + '&text=' + text + '&hashtags=' + hashtags + '&via=' + via;
}

/**
 * Builds Pinterest share url
 * @return {String}
 */
SocialShare.prototype.pinterestShare = function (details) {
	var url = details.url || document.location.href;
	var media = encodeURI(details.media) || "";
	var description = details.description || "";
	return 'http://www.pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&media=' + media + '&description=' + description;;
}

/**
 * Builds LinkedIn share url
 * @return {String}
 */
SocialShare.prototype.linkedinShare = function (details) {
	var url = details.url || document.location.href;
	var title = details.title || "";
	var summary = details.summary || "";
	var source = details.source || "";
	return 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(url) + '&title=' + title + '&summary=' + summary + '&source=' + source;
}

/**
 * Builds Google+ share url
 * @return {String}
 */
SocialShare.prototype.googleplusShare = function (details) {
	var url = details.url || document.location.href;
	return 'https://plus.google.com/share?url=' + encodeURI(url);
}

/**
 * Public API
 * @type {Object}
 */
module.exports = {
	init: function (opts) {
		return new SocialShare(opts);
	}
};