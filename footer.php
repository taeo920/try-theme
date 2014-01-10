		<footer id="footer" class="footer">
			<address>&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?></address>
			<?php wp_nav_menu( array('theme_location' => 'footer', 'container' => 'nav')); ?>
		</footer>
	</div> <?php // end .wrapper; ?>

	<?php wp_footer(); ?>

	<!-- Google Analytics -->
	<script>
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-XXXX-Y');
		ga('send', 'pageview');
	</script>
	<!-- End Google Analytics -->

</body>
</html>