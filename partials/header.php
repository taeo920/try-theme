<header class="header">
	<div class="container">
		<?php if( is_front_page() ) : ?>
			<h1 class="logo">
				<a class="logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>
			</h1>
		<?php else : ?>
			<a class="logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>
		<?php endif; ?>

		<?php wp_nav_menu(array('menu' => 'Main', 'theme_location' => 'main', 'container' => 'nav')); ?>
	</div>
</header>