<?php

/**
 * Handles email share form submission
 * Determines which version of subject/copy to use based on presence of a post_id
 */
function try_submit_email_share_form() {
	check_ajax_referer( 'submit-email-share', 'nonce' );

	parse_str( $_POST['data'] );

	$subject = stripcslashes( wp_kses( $subject, null ) );
	$message = stripcslashes( wp_kses( $message, null ) );

	$headers[] = 'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>';
	$headers[] = sprintf('Reply-to: "%s" <%s>', $sender, $sender );

	wp_mail( $recipient, $subject, $message, $headers );

	exit;
}
add_action('wp_ajax_nopriv_try_submit_email_share_form', 'try_submit_email_share_form');
add_action('wp_ajax_try_submit_email_share_form', 'try_submit_email_share_form');