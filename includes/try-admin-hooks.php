<?php

/**
 * Remove junk from head
 */
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);

/**
 * Enable admin to set custom background images in 'appearance > background'
 */
add_theme_support( 'custom-background' );

/**
 * Prevents admin bar from being displayed
 */
add_filter( 'show_admin_bar', '__return_false' );

/**
 * Removes admin menu items
 */
function remove_menu_items() {
    global $menu;

	$items = array();
    foreach($menu as $key => $value) {
        foreach($items as $item) {
            $length = strlen($item);
            if(substr($value[0], 0, $length) == $item) unset($menu[$key]);
        }
    }
}
//add_filter('admin_menu', 'remove_menu_items');

/**
 * Disables user profile IM client fields
 */
function hide_profile_fields( $contactmethods ) {
	unset($contactmethods['aim']);
	unset($contactmethods['jabber']);
	unset($contactmethods['yim']);
	return $contactmethods;
}
add_filter('user_contactmethods','hide_profile_fields');

/**
 * add author profile fields - pull data with <?php echo $curauth->twitter; ?> in template
 */
function add_contact_fields( $contactmethods ) {
	$contactmethods['twitter'] = 'Twitter';
	$contactmethods['facebook'] = 'Facebook';
	return $contactmethods;
}
//add_filter('user_contactmethods','add_contact_fields',10,1);

/**
 * add default gravitar option - remember to upload gravatar img
 *
 * @param array Default avatar options
 * @return array Avatar options, plus custom image
 */
function newgravatar( $avatar_defaults ) {
	$myavatar = get_bloginfo('template_directory') . '/images/gravatar.jpg';
	$avatar_defaults[$myavatar] = "Brand Name";
	return $avatar_defaults;
}
//add_filter( 'avatar_defaults', 'newgravatar' );
