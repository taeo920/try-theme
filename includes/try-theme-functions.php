<?php

/**
 * AJAX Function Template
 */
function function_name() {
	extract( $_POST, EXTR_SKIP );

	$array = array();

	echo json_encode( $array );
	exit;
}
add_action( 'wp_ajax_nopriv_function_name', 'function_name' );
add_action( 'wp_ajax_function_name', 'function_name' );