<?php
require_once 'facebook.php';

global $fb;

$fb = new Facebook(array(
	'appId'  => '',
	'secret' => '',
));

/**
 * Gets the current user's Facebook ID
 * @return number User's Facebook ID
 */
function get_user_id() {
	global $fb;
	return $fb->getUser();
}

/**
 * Determines if a visitor is on a Facebook page
 * @return boolean True if user is in Facebook
 */
function in_facebook() {
	global $fb;
	return $fb->getSignedRequest() ? true : false;
}

/**
 * Determines if the current user has liked the Facebook page
 * @return boolean True if the user has liked the page
 */
function is_liked() {
	global $fb;
	$signed_request = $fb->getSignedRequest();
	return $signed_request['page']['liked'] ? true : false;
}

/**
 * Force attachments to load via SSL
 */
function ssl_for_attachments( $url ) {
	$http = site_url(FALSE, 'http');
	$https = site_url(FALSE, 'https');
	return ( $_SERVER['HTTPS'] == 'on' ) ? str_replace($http, $https, $url) : $url;
}
add_filter('wp_get_attachment_url', 'ssl_for_attachments');