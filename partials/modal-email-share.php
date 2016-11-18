<?php
	$subject = "Check out this awesome post from " . get_bloginfo('name');
	$message = sprintf("Hey there,
					\r\nA friend thought you’d be interested in this post from " . get_bloginfo('name') . ". 
					\r\nYou can read the post here: %s", get_permalink() );
?>

<div class="modal">
	<h2 class="modal-title">Send to a Friend</h2>

	<form class="form form-email-share row" action="#" method="POST" role="form" data-nonce="<?php echo wp_create_nonce('submit-email-share'); ?>">
		<div class="form-field col-xs-12 col-sm-6">
			<label class="form-label" for="sender">Sender's Email</label>
			<input id="sender" name="sender" class="form-control email" type="email" placeholder="yourname@domain.com">
		</div>
		<div class="form-field col-xs-12 col-sm-6">
			<label class="form-label" for="recipient">Recipient's Email</label>
			<input id="recipient" name="recipient" class="form-control email" type="email" placeholder="recipient@domain.com">
		</div>
		<div class="form-field col-xs-12">
			<label class="form-label" for="subject">Subject</label>
			<input id="subject" name="subject" class="form-control" type="text" required="true" value="<?php echo $subject; ?>">
		</div>
		<div class="form-field col-xs-12">
			<label class="form-label" for="message">Message</label>
			<textarea id="message" name="message" class="form-control" required="true" rows="3"><?php echo $message; ?></textarea>
		</div>
		<div class="form-field text-center col-xs-12">
			<button type="submit" name="submit" class="btn btn--solid" type="submit">Send Email</button>
		</div>
		<input type="hidden" name="post_id" value="<?php the_ID(); ?>">
	</form>
</div>