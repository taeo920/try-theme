<?php

/**
 * Front End CSS
 */
function load_styles() {
	if ( defined('DEVELOPMENT') ) {
		wp_enqueue_style('main-style', get_bloginfo('template_url') . '/dist/styles/app.css', array(), false, 'screen');
	} else {
		wp_enqueue_style('main-style', get_bloginfo('template_url') . '/dist/styles/app.min.css', array(), false, 'screen');
	}
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

	// Theme Script
	if ( defined('DEVELOPMENT') ) {
		//wp_enqueue_script('vendor', get_bloginfo('template_url').'/dist/scripts/vendor.js', array(), false, true);
		wp_enqueue_script('main', get_bloginfo('template_url').'/dist/scripts/app.js', array(), false, true);
	} else {
		//wp_enqueue_script('vendor', get_bloginfo('template_url').'/dist/scripts/vendor.min.js', array(), false, true);
		wp_enqueue_script('main', get_bloginfo('template_url').'/dist/scripts/app.min.js', array(), false, true);
	}

	// WordPress Scripts
	if( is_singular() && get_option('thread_comments') ) wp_enqueue_script('comment-reply');

	// Dynamic URLs for use in scripts
	wp_localize_script( 'main', 'urls', array(
		'base' => get_bloginfo('url'),
		'theme' => get_bloginfo('template_url'),
		'ajax' => admin_url('admin-ajax.php')
	));
	wp_localize_script( 'main', 'info', array( /* IDs, etc. */ ));

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
