<header class="header">
	<div class="header-container container">
		<?php if( is_front_page() ) echo '<h1>'; ?>
			<a class="header-logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>
		<?php if( is_front_page() ) echo '</h1>'; ?>

		<div class="header-menu">
			<?php wp_nav_menu( array(
				'theme_location' => 'header',
				'container' => '',
				'menu' => 'Header',
				'menu_class' => 'header-menu-list'
			)); ?>
		</div>

		<?php try_get_template_part('partials', 'search-form'); ?>
	</div>
</header>