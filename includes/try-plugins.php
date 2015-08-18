<?php
/**
 * Include the TGM_Plugin_Activation class.
 */
require_once dirname( __FILE__ ) . '/vendor/class-tgm-plugin-activation.php';

/**
 * Register the required/recommended plugins for this theme
 */
function try_plugins() {
	/*
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(
		array(
			'name'		=> 'Advanced Custom Fields PRO',
			'slug'		=> 'advanced-custom-fields-pro',
			'source'	=> 'http://connect.advancedcustomfields.com/index.php?p=pro&a=download&k=b3JkZXJfaWQ9NDQ2OTZ8dHlwZT1kZXZlbG9wZXJ8ZGF0ZT0yMDE0LTExLTE5IDIyOjU2OjUz',
			'required'	=> true
		),
		array(
			'name'		=> 'Simple Page Ordering',
			'slug'		=> 'simple-page-ordering',
			'required'	=> false
		)
	);

	/*
	 * Array of configuration settings. Amend each line as needed.
	 */
	$config = array(
		'id'           => 'try-tgmpa',             // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'themes.php',            // Parent menu slug.
		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => true,                    // Automatically activate plugins after installation or not.
		'message'      => ''         			   // Message to output right before the plugins table.
	);

	tgmpa( $plugins, $config );
}
add_action( 'tgmpa_register', 'try_plugins' );