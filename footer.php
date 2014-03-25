		<footer class="footer">
			<address>&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?></address>
			<?php wp_nav_menu( array('theme_location' => 'footer', 'container' => 'nav')); ?>
		</footer>
	</div> <?php // end .wrapper; ?>

	<?php wp_footer(); ?>

</body>
</html>