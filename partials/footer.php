<footer class="footer">
	<div class="container">
		<address>&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?></address>
		<?php wp_nav_menu( array('theme_location' => 'footer', 'container' => 'nav')); ?>
	</div>

	<?php wp_footer(); ?>
</footer>