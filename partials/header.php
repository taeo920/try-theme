<header class="header">
	<div class="header-container container">
		<?php if( is_front_page() ) : ?>
			<h1 class="header-logo">
				<a class="header-logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>
			</h1>
		<?php else : ?>
			<a class="header-logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>
		<?php endif; ?>

		<?php wp_nav_menu(array(
			'theme_location' => 'header',
			'container' => 'nav',
			'container_class' => 'header-menu menuBar menuBar--tabs',
			'menu' => 'Header',
			'menu_class' => 'header-menuList menuBar-list'
		)); ?>
	</div>
</header>