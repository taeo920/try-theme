<footer class="footer">
	<div class="container">
		<address class="footer-copyright">&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?></address>
		<?php wp_nav_menu( array('theme_location' => 'footer', 'container' => 'nav', 'menu_class' => 'footer-menu')); ?>
	</div>

	<?php wp_footer(); ?>
</footer>