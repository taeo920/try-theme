<?php

/**
 * Remove dashboard meta boxes
 */
function try_remove_dashboard_widgets() {
	global $wp_meta_boxes;
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
	// unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
}
add_action('wp_dashboard_setup', 'try_remove_dashboard_widgets' );

/**
 * Unregisters unnecesary default widgets
 */
function try_unregister_default_wp_widgets() {
	unregister_widget('WP_Widget_Calendar');
	unregister_widget('WP_Widget_Search');
	unregister_widget('WP_Widget_Recent_Comments');
	unregister_widget('WP_Widget_Meta');
	unregister_widget('WP_Widget_Links');
	unregister_widget('WP_Widget_Pages');
	// unregister_widget('WP_Widget_Archives');
	unregister_widget('WP_Widget_Recent_Posts');
	unregister_widget('WP_Widget_Tag_Cloud');
	unregister_widget('WP_Widget_RSS');
	// unregister_widget('WP_Widget_Categories');
	unregister_widget('WP_Widget_Text');
	unregister_widget('WP_Nav_Menu_Widget');
	unregister_widget('GFWidget');
}
add_action('widgets_init', 'try_unregister_default_wp_widgets');

/**
 * Hide admin pages that are not used
 */
function try_remove_menu_pages() {
	remove_menu_page( 'edit-comments.php' );
}
add_action('admin_menu', 'try_remove_menu_pages');

/**
 * Change admin menu order
 */
function try_menu_order( $menu_ord ) {
	if ( !$menu_ord ) return true;
	return array(
		// 'index.php', // Dashboard
		// 'separator1', // First separator
		// 'edit.php?post_type=page', // Pages
		// 'edit.php', // Posts
		// 'upload.php', // Media
		// 'gf_edit_forms', // Gravity Forms
		// 'edit-comments.php', // Comments
		// 'separator2', // Second separator
		// 'themes.php', // Appearance
		// 'plugins.php', // Plugins
		// 'users.php', // Users
		// 'tools.php', // Tools
		// 'options-general.php', // Settings
		// 'separator-last', // Last separator
	);
}
add_filter('custom_menu_order', '__return_true');
add_filter('menu_order', 'try_menu_order');

/**
 * Customizes the editor role
 * Adds theme option and gravity form capabilities
 */
function try_customize_editor_role() {
	$role = get_role('editor');

	$role->add_cap('edit_theme_options');

	$role->add_cap('gravityforms_edit_forms');
	$role->add_cap('gravityforms_delete_forms');
	$role->add_cap('gravityforms_create_form');
	$role->add_cap('gravityforms_view_entries');
	$role->add_cap('gravityforms_edit_entries');
	$role->add_cap('gravityforms_delete_entries');
	$role->add_cap('gravityforms_export_entries');
	$role->add_cap('gravityforms_view_entry_notes');
	$role->add_cap('gravityforms_edit_entry_notes');
}
add_filter('after_switch_theme', 'try_customize_editor_role');

/**
 * Removes admin bar items
 */
function try_remove_admin_bar_items() {
    global $wp_admin_bar;
    // $wp_admin_bar->remove_menu('comments');
}
add_action('wp_before_admin_bar_render', 'try_remove_admin_bar_items');

/**
 * Remove default link option for images
 */
function try_imagelink_setup() {
	$image_set = get_option( 'image_default_link_type' );
	if ( $image_set !== 'none' ) {
		update_option( 'image_default_link_type', 'none' );
	}
}
add_action('admin_init', 'try_imagelink_setup', 10 );

/**
 * Enable more WYSIWYG editor buttons
 */
function try_enable_mce_buttons( $buttons ) {
	$buttons[] = 'subscript';
	$buttons[] = 'superscript';

	return $buttons;
}
add_filter('mce_buttons_2', 'try_enable_mce_buttons');

/**
 * Remove post_tags and categories from admin
 */
function try_unregister_default_taxonomies() {
	// register_taxonomy('category', array() );
	// register_taxonomy('post_tag', array() );
}
add_action('init', 'try_unregister_default_taxonomies');