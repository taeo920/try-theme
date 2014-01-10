<?php

function theme_setup() {
	// Menus
	register_nav_menus(array( 'main' => 'Main',	'footer' => 'Footer' ));

	// Custom Post Thumbnail Sizes
	add_theme_support('post-thumbnails');
	//add_image_size('banner', 900, 300, true);

	// RSS Feeds
	add_theme_support('automatic-feed-links');

	// The Magic
	require_once 'includes/try-admin-hooks.php';
	require_once 'includes/try-misc-hooks.php';
	require_once 'includes/try-enqueue.php';
	require_once 'includes/try-sidebars.php';
	//require_once 'includes/try-widgets.php';
	//require_once 'includes/try-misc-functions.php';
	//require_once 'includes/try-attachment-functions.php';
	//require_once 'includes/try-cron-jobs.php';
	//require_once 'includes/try-custom-template.php';
	//require_once 'includes/try-facebook.php';
	//require_once 'includes/try-post-type-slide.php';
	//require_once 'includes/try-taxonomy-example.php';
	require_once 'includes/try-theme-functions.php';

}
add_action('after_setup_theme', 'theme_setup');