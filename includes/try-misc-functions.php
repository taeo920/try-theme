<?php

/**
 * Loads a PHP template file - useful for building AJAX content with echo = false
 *
 * @param (string) $file The name of the template file to load
 * @param (bool) $echo Use false to assign the contents of the template to a variable
 */
function try_load_template_file( $file, $echo = true ) {
	if(!$echo) ob_start();
	include( TEMPLATEPATH . '/' . $file . '.php' );
	if(!$echo) return ob_get_clean();
}

/**
 * Loads comment template
 *
 * @param object $comment The comment object
 * @param array $args Comment arguments
 * @param int $depth The depth of the current comment
 */
function try_comment_list( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	$GLOBALS['args'] = $args;
	$GLOBALS['depth'] = $depth;
	get_template_part('partials/comment');
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
 * Parses a string for a YouTube video ID
 *
 * @param string $string Valid YouTube video URL or ID
 * @return string YouTube video ID
 */
function try_get_youtube_video_id( $string ) {
	if( !parse_url( $string, PHP_URL_HOST ) ) return $string;
	if ( strpos( $string, 'youtu.be/') === false && strpos( $string, '/embed/') === false ) {
	    parse_str( parse_url( $string, PHP_URL_QUERY ), $query );
	    $id = $query['v'];
	} else {
	    $id = basename( parse_url( $string, PHP_URL_PATH ) );
	}

	return $id;
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
 * Accepts a YouTube video ID and returns a shortened link
 *
 * @param int $id Valid YouTube video ID
 * @return string Short YouTube video link
 */
function try_youtube_link( $id, $embeded = false ) {
	if ( $embeded == true ) {
		return 'https://www.youtube.com/embed/' . $id . '?rel=0&autoplay=1';
	} else {
		return 'https://youtu.be/' . $id;
	}
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