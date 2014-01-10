<?php

/**
 * Loads a PHP template file - useful for building AJAX content with echo = false
 *
 * @param (string) $file The name of the template file to load
 * @param (bool) $echo Use false to assign the contents of the template to a variable
 */
function load_template_file( $file, $echo = true ) {
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
function comment_list( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	$GLOBALS['args'] = $args;
	$GLOBALS['depth'] = $depth;
	get_template_part('comment');
}

/**
 * Truncates a string to the nearest word under a given maximum length
 *
 * @param string $string The string which will be truncated
 * @param int $length The length to which to truncate the string
 * @param string $append A string that will be appended to the end of a truncated string
 */
function truncate( $string, $length, $append = '&hellip;' ) {
	if( strlen( $string ) > $length ) {
		$string = substr( $string, 0, strrpos( substr( $string, 0, $length ), ' ') );
		$string .= $append;
	}
	return $string;
}


/**
 * Debug tool - displays contents of any variable wrapped in pre tags
 *
 * @param $variable Variable you want to debug
 */
function debug( $variable ) {
	echo "<pre>";
	if( is_array( $variable ) || is_object( $variable ) ) {
		print_r( $variable );
	} else {
		var_dump( $variable );
	}
	echo "</pre>";
}