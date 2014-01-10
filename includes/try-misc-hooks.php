<?php

/**
 * Add Favicon to head
 */
function blog_favicon() {
	echo '<link rel="shortcut icon" type="image/x-icon" href="' . get_bloginfo('wpurl') . '/favicon.png" />';
}
add_action('wp_head', 'blog_favicon');

/**
 * Stop images getting wrapped up in p tags when they get dumped out with the_content() for easier theme styling
 */
function remove_img_ptags($content){
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', 'remove_img_ptags');

/**
 * Put post thumbnails into rss feed
 */
function feed_post_thumbnail($content) {
	global $post;
	if(has_post_thumbnail($post->ID)) {
		$content = '' . $content;
	}
	return $content;
}
add_filter('the_excerpt_rss', 'feed_post_thumbnail');
add_filter('the_content_feed', 'feed_post_thumbnail');


/**
 * Alters the permalink text appended to the end of an excerpt
 *
 * @param string $more Default excerpt permalink text
 * @return string Permalink to be appended to excerpt
 */
function custom_excerpt_more( $more ) {
	global $post;
	return ' [...]  <a href="'. get_permalink($post->ID) . '">Read More</a>';
}
//add_filter('excerpt_more', 'custom_excerpt_more');


/**
 * Alters the word length of an excerpt
 *
 * @param int $length Length of the excerpt in words
 * @return int Custom length of the excerpt in words
 */
function custom_excerpt_length( $length ) {
	return 50;
}
//add_filter('excerpt_length', 'custom_excerpt_length');


/**
 * Allows manipulation of the excerpt
 *
 * @param string The unmodified excerpt
 * @return string The modified excerpt
 */
function custom_excerpt( $excerpt ) {
	global $post;
	return $excerpt . '...';
}
//add_filter('wp_trim_excerpt', 'custom_excerpt');