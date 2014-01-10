<?php

/**
 * Retrieves the url of the post thumbnail
 *
 * @param (string) $size The size of the thumbnail to be retrieved
 * @return (string) The post thumbnail url
 */
function get_the_post_thumbnail_src($size = 'thumbnail') {
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
function get_post_images_src($size = 'thumbnail') {
	global $post;
	
	$photos = get_children( array('exclude' => get_post_thumbnail_id( $post->ID ), 'post_parent' => $post->ID, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => 'ASC', 'orderby' => 'menu_order') );
		
	$results = array();

	if ($photos) {
		foreach ($photos as $photo) {
			// get the correct image html for the selected size
			$results[] = wp_get_attachment_image_src($photo->ID, $size);
		}
	}
	
	return $results;
}

/**
 * Get the first image attached to the current post
 * Excludes the post thumbnail
 *
 * @param string $size Desired image size
 * @return array
 */
function get_post_image_src($size = 'thumbnail') {
	global $post;

	$photos = get_children( array('exclude' => get_post_thumbnail_id( $post->ID ), 'post_parent' => $post->ID, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => 'ASC', 'orderby' => 'menu_order') );

	if ($photos) {
		$photo = array_shift($photos);
		return wp_get_attachment_image_src($photo->ID, $size);
	}

	return false;
}