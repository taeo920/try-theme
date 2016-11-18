<footer class="footer">
	<div class="footer-container container">
		<address class="footer-copyright">&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?></address>
		<?php wp_nav_menu( array(
			'theme_location' => 'footer',
			'container' => '',
			'menu' => 'Footer',
			'menu_class' => 'footer-menu-list'
		)); ?>
	</div>

	<?php wp_footer(); ?>
</footer>