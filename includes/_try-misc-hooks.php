<?php

/**
 * Alters the permalink text appended to the end of an excerpt
 *
 * @param string $more Default excerpt permalink text
 * @return string Permalink to be appended to excerpt
 */
function try_custom_excerpt_more( $more ) {
	global $post;
	return ' [...]  <a href="'. get_permalink($post->ID) . '">Read More</a>';
}
//add_filter('excerpt_more', 'try_custom_excerpt_more');


/**
 * Alters the word length of an excerpt
 *
 * @param int $length Length of the excerpt in words
 * @return int Custom length of the excerpt in words
 */
function try_custom_excerpt_length( $length ) {
	return 50;
}
//add_filter('excerpt_length', 'try_custom_excerpt_length');


/**
 * Allows manipulation of the excerpt
 *
 * @param string The unmodified excerpt
 * @return string The modified excerpt
 */
function try_custom_excerpt( $excerpt ) {
	global $post;
	return $excerpt . '...';
}
//add_filter('wp_trim_excerpt', 'try_custom_excerpt');

/**
 * Allows the Search WP indexer to work when basic HTTP auth is enabled ( in Pantheon environments )
 * https://searchwp.com/docs/hooks/searchwp_basic_auth_creds/
 */
function try_searchwp_basic_auth_creds() {
    $credentials = array( 
        'username' => 'Mindgrub', // the HTTP BASIC AUTH username
        'password' => 'MGtruecitrus'  // the HTTP BASIC AUTH password
    );
    
    return $credentials;
}
//add_filter( 'searchwp_basic_auth_creds', 'try_searchwp_basic_auth_creds' );

/**
 * Changes the default Gravity Forms AJAX spinner.
 *
 * @since 1.0.0
 *
 * @param string $src  The default spinner URL.
 * @return string $src The new spinner URL.
 */
function try_custom_gforms_spinner( $src ) {
    return get_stylesheet_directory_uri() . '/dist/images/loading.gif';
}
//add_filter( 'gform_ajax_spinner_url', 'try_custom_gforms_spinner' );

/**
 * Instruct facetwp to look for a query var to trigger filtering on a non-archive or non-search template
 */
function try_facetwp_is_main_query( $is_main_query, $query ) {
    if ( isset( $query->query_vars['facetwp'] ) ) {
        $is_main_query = true;
    }
    
    return $is_main_query;
}
//add_filter( 'facetwp_is_main_query', 'try_facetwp_is_main_query', 10, 2 );

/**
 * Remove default facetwp CSS
 */
function try_facetwp_remove_assets( $assets ) {
    unset( $assets['front.css'] );
    return $assets;
}
//add_filter( 'facetwp_assets', 'try_facetwp_remove_assets' );