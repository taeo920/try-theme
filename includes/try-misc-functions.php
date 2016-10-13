<?php

/**
 * Loads template part file
 * Provides same functionality as get_template_part() but with the added benefit of optional output buffering and the ability to pass parameters
 *
 * @param string $slug The slug name for the generic template or sub-directory
 * @param string $name The name of the specialised template
 * @param bool $echo Echo output immediately or buffered and returned
 * @param array $param Array of additional params to include in scope
 */
function try_get_template_part( $slug, $name, $echo = true, $params = array() ) {
    global $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;

    do_action( "get_template_part_{$slug}", $slug, $name );

    $templates = array();
    if ( isset( $name ) ) {
    	$templates[] = "{$slug}/{$name}.php";
    	$templates[] = "{$slug}-{$name}.php";
    }
    $templates[] = "{$slug}.php";

    $template_file = locate_template( $templates, false, false );

    // Add query vars and params to scope
    if ( is_array( $wp_query->query_vars ) ) {
        extract( $wp_query->query_vars, EXTR_SKIP );
    }
    extract( $params, EXTR_SKIP );

    // Buffer output and return if echo is false
	if( !$echo ) ob_start();
    load_template( $template_file, false );
	if( !$echo ) return ob_get_clean();
}

/**
 * Loads comment template
 *
 * @param object $comment The comment object
 * @param array $args Comment arguments
 * @param int $depth The depth of the current comment
 */
function try_comment_list( $comment, $args, $depth ) {
	$args = array(
		 'comment' => $comment,
		 'args' => $args,
		 'depth' => $depth
	);

	try_get_template_part('partials', 'comment', true, $args );
}

/**
 * Truncates a string to the nearest word under a given maximum length
 *
 * @param string $string The string which will be truncated
 * @param int $length The length to which to truncate the string
 * @param string $append A string that will be appended to the end of a truncated string
 */
function try_truncate( $string, $length, $append = '&hellip;' ) {
	if( strlen( $string ) > $length ) {
		$string = substr( $string, 0, strrpos( substr( $string, 0, $length ), ' ') );
		$string .= $append;
	}
	return $string;
}

/**
 * Retrieves the url of an image uploaded via an ACF image field
 * TODO: Add support for return types other than array
 *
 * @param (string) $name The name of the ACF field - assume default return of image array is used
 * @param (string) $size The size of the image to be retrieved
 * @return (string) The image url ( defaults to original size )
 */
function try_get_acf_image_src( $name, $size = 'thumbnail' ) {
	// Return false if ACF is not active
	if( !function_exists( 'get_field' ) )
		return false;

	// Assume default of image array is used
	$image_array = ( get_row() ) ? get_sub_field( $name ) : get_field( $name );
	
	return try_get_image_src_from_array( $image_array, $size );
}

/**
 * Echos the url of an image uploaded via an ACF image field
 *
 * @param (string) $name The name of the ACF field - assume default return of image object is used
 * @param (string) $size The size of the image to be retrieved
 * @return (string) The image url ( defaults to original size )
 */
function try_the_acf_image_src( $name, $size = 'thumbnail' ) {
	echo try_get_acf_image_src( $name, $size );
}

/**
 * Retrieves the correctly sized image source from an array produced by wp_prepare_attachment_for_js()
 *
 * @param (array) $image_array Image array produced by wp_prepare_attachment_for_js() function
 * @param (string) $size The size of the image to be retrieved
 * @return (string) The image url ( defaults to original size )
 */
function try_get_image_src_from_array( $image_array, $size = 'thumbnail' ) {
	// Return false if field is empty or type other than array is being used
	if( !$image_array || !is_array( $image_array ) )
		return false;

	// Get the correct size url if found - otherwise get the original image url
	if( array_key_exists( $size, $image_array['sizes'] ) ) {
		$image_url = $image_array['sizes'][$size];
	} else {
		$image_url = $image_array['url'];
	}

	return $image_url;
}

/**
 * Echos the correctly sized image source from an array produced by wp_prepare_attachment_for_js()
 *
 * @param (array) $image_array Image array produced by wp_prepare_attachment_for_js() function
 * @param (string) $size The size of the image to be retrieved
 * @return (string) The image url ( defaults to original size )
 */
function try_the_image_src_from_array( $image_array, $size = 'thumbnail' ) {
	echo try_get_image_src_from_array( $image_array, $size );
}

/**
 * Retrieves the url of the post thumbnail
 *
 * @param (string) $size The size of the thumbnail to be retrieved
 * @return (string) The post thumbnail url
 */
function try_get_post_thumbnail_src( $size = 'thumbnail' ) {
	global $post;
	$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $size );
	return $image[0];
}

/**
 * Echos the url of the post thumbnail
 *
 * @param (string) $size The size of the thumbnail to be retrieved
 * @return (string) The post thumbnail url
 */
function try_the_post_thumbnail_src( $size = 'thumbnail' ) {
	echo try_get_post_thumbnail_src( $size );
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

/**
 * Determines if url is a valid YouTube URL
 *
 * @param string $url Valid YouTube video URL
 * @return bool
 */
function try_is_youtube_url( $url ) {
	return ( preg_match('/youtu\.be/i', $url) || preg_match('/youtube\.com\/watch/i', $url) );
}

/**
 * Determines if url is a valid Vimeo URL
 *
 * @param string $url Valid Vimeo video URL
 * @return bool
 */
function try_is_vimeo_url( $url ) {
	return ( preg_match('/vimeo\.com/i', $url) );
}

/**
 * Parses a url for a YouTube video ID
 *
 * @param string $url Valid YouTube video URL
 * @return string YouTube video ID
 */
function try_get_youtube_video_id( $url ) {
	if( !try_is_youtube_url( $url ) )
		return false;

	$pattern = '/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/';
	preg_match( $pattern, $url, $matches );
	
	if ( count($matches) && strlen( $matches[7] ) == 11 ) {
		return $matches[7];
	}
}

/**
 * Parses a url for a Vimeo video ID
 *
 * @param string $url Valid Vimeo video URL
 * @return string Vimeo video ID
 */
function try_get_vimeo_video_id( $url ) {
	if( !try_is_vimeo_url( $url ) )
		return false;

	$pattern = '/(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/';
	preg_match( $pattern, $url, $matches );
	
	if ( count($matches) ) {
		return $matches[5];
	}
}

/**
 * Accepts a YouTube video ID and returns a shortened link
 *
 * @param int $id Valid YouTube video ID
 * @return string Short YouTube video link
 */
function try_youtube_short_link( $id ) {
	return 'https://youtu.be/' . $id;
}

/**
 * Accepts a YouTube video ID and returns an link
 *
 * @param int $id Valid YouTube video ID
 * @return string YouTube video embed link
 */
function try_youtube_embed_link( $id ) {
	return 'https://www.youtube.com/embed/' . $id . '?rel=0&autoplay=1&rel=0';
}

/**
 * Accepts a Vimeo video ID and returns an embed link
 *
 * @param int $id Valid Vimeo video ID
 * @return string Vimeo video embed link
 */
function try_vimeo_embed_link( $id ) {
	return 'https://player.vimeo.com/video/' . $id . '?autoplay=1';
}

/**
 * Generates a YouTube iFrame embed
 * Duplicates wp_oembed_get() but this allows specifying of YouTube video arguments
 *
 * @param string $id Valid YouTube video ID
 * @param array $iframe_args List of arguments for the iframe markup
 * @param array $youtube_args List of arguments for the youtube video
 * @return string HTML for iFrame embed
 */
function try_youtube_embed( $id, $iframe_args = array(), $youtube_args = array() ) {
	$iframe_defaults = array(
		'class' => 'video',
		'width' => 640,
		'height' => 360,
		'responsive' => false
	);
	$iframe_args = wp_parse_args( $iframe_args, $iframe_defaults );
	extract( $iframe_args, EXTR_SKIP );

	$youtube_defaults = array(
		'autoplay' => 1,
		'rel' => 0,
		'origin' => get_bloginfo('url')
	);
	$youtube_args = wp_parse_args( $youtube_args, $youtube_defaults );
	$youtube_args = http_build_query( $youtube_args );

	$dimensions = ( $responsive ) ? '' : 'width="' . $width . '" height="' . $height . '"';

	// iFrame embed
	printf('<iframe type="text/html" class="%s" %s src="https://www.youtube.com/embed/%s?%s" frameborder="0"></iframe>', $class, $dimensions, $id, $youtube_args );
}

/**
 * Creates a compressed zip archive from an array of files
 *
 * @param (array) $files Array of file locations ( on disk not HTTP )
 * @param (string) $destination Location and file name for the zip to be created
 * @param (bool) $overwrite Whether or not to overwrite the destination if it already exists
 * @param (bool) $preserve_folder_structure Whether or not to preserve the folder structure or grab only the files
 * @return (bool) Whether or not the destination file exists
 */
function try_create_zip( $files = array(), $destination = '', $overwrite = false, $preserve_folder_structure = false ) {
	// if the zip file already exists and overwrite is false, return false
	if( file_exists( $destination ) && !$overwrite ) { return false; }

	// vars
	$valid_files = array();

	// if files were passed in...
	if( is_array( $files ) ) {
		// cycle through each file
		foreach( $files as $file ) {
			// make sure the file exists
			if( file_exists( $file ) ) {
				$valid_files[] = $file;
			}
		}
	}
	// if we have good files...
	if( count( $valid_files ) ) {
		// create the archive
		$zip = new ZipArchive();
		if( $zip->open( $destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE ) !== true ) {
			return false;
		}

		// add the files
		foreach( $valid_files as $file ) {
			$localname = ( $preserve_folder_structure ) ? $file : basename( $file );
			$zip->addFile( $file, $localname );
		}

		// close the zip -- done!
		$zip->close();

		// check to make sure the file exists
		return file_exists( $destination );
	} else {
		return false;
	}
}

/**
 * Debug tool - displays contents of any variable wrapped in pre tags
 *
 * @param $variable Variable you want to debug
 */
function try_debug( $variable ) {
	echo "<pre>";
	if( is_array( $variable ) || is_object( $variable ) ) {
		print_r( $variable );
	} else {
		var_dump( $variable );
	}
	echo "</pre>";
}

/**
 * Converts a string into Twitter share friendly format
 *
 * @param  string $string String to format
 * @return string         Twitter sharable string
 */
function try_format_twitter_text($string) {
    return htmlspecialchars(urlencode(html_entity_decode($string, ENT_COMPAT, 'UTF-8')), ENT_COMPAT, 'UTF-8');
}