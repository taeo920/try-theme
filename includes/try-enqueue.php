<?php

/**
 * Front End CSS
 */
function load_styles() {
	wp_enqueue_style('main-style', get_bloginfo('template_url') . '/styles/main.css', array(), false, 'screen');
}
add_action('wp_enqueue_scripts', 'load_styles');

/**
 * Front End JS
 */
function load_scripts() {
	// Modernizr
	wp_deregister_script('modernizr');
	wp_register_script('modernizr', get_bloginfo('template_url').'/scripts/vendor/modernizr.js');
	wp_enqueue_script('modernizr');

	// AJAX jQuery with local fallback if necessary
	$url = 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
	$test_url = @fopen($url,'r');
	wp_deregister_script( 'jquery' );
	if($test_url !== false) {
		// Load remote file via ajax
        wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', array(), '1.10.1', false);
	} else {
		// Load local file
        wp_register_script('jquery', get_bloginfo('template_url').'/scripts/vendor/jquery.js', __FILE__, '1.10.1', false);
	}
	wp_enqueue_script('jquery');

	// Theme Script
	wp_enqueue_script('main', get_bloginfo('template_url').'/scripts/try.main.min.js', array(), false, true);

	// WordPress Scripts
	if( is_singular() && get_option('thread_comments') ) wp_enqueue_script('comment-reply');

	// Dynamic URLs for use in scripts
	wp_localize_script( 'main', 'urls', array(
		'base' => get_bloginfo('url'),
		'theme' => get_bloginfo('template_url'),
		'ajax' => admin_url('admin-ajax.php')
	));

	wp_localize_script( 'main', 'info', array(
		// IDs, etc.
	));

}
add_action('wp_enqueue_scripts', 'load_scripts');

/**
 * Admin CSS
 */
function load_admin_styles() {
	wp_enqueue_style( 'admin', get_bloginfo('template_url') . '/styles/admin.css' );
}
add_action('admin_enqueue_scripts', 'load_admin_styles');

/**
 * Admin JS
 */
function load_admin_scripts() {
	wp_enqueue_script( 'admin', get_bloginfo('template_url') . '/scripts/admin.js' );
}
add_action('admin_enqueue_scripts', 'load_admin_scripts');

/**
 * Login CSS
 */
function load_login_styles() {
	echo '<link rel="stylesheet" href="' . get_bloginfo('template_url') . '/styles/admin.css" type="text/css" />';
}
add_action('login_head', 'load_login_styles');