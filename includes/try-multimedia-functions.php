<?php

/**
 * Retrieves the url of the post thumbnail
 *
 * @param (string) $size The size of the thumbnail to be retrieved
 * @return (string) The post thumbnail url
 */
function try_get_the_post_thumbnail_src( $size = 'thumbnail' ) {
	global $post;
	$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $size );
	return $image[0];
}

/**
 * Get all of the images attached to the current post
 * Excludes the post thumbnail
 *
 * @param string $size Desired image size
 * @return array
 */
function try_get_post_images_src( $size = 'thumbnail' ) {
	global $post;
	
	$images = get_children( array('exclude' => get_post_thumbnail_id( $post->ID ), 'post_parent' => $post->ID, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => 'ASC', 'orderby' => 'menu_order') );
		
	$results = array();

	if ( $images ) {
		foreach ( $images as $image ) {
			// get the correct image html for the selected size
			$results[] = wp_get_attachment_image_src( $image->ID, $size );
		}
	}
	
	return $results;
}