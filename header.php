<!DOCTYPE html>
<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="ie ie6 lte9 lte8 lte7 lte6 no-js"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="ie ie7 lte9 lte8 lte7 no-js"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="ie ie8 lte9 lte8 no-js"> <![endif]-->
<!--[if IE 9 ]>    <html <?php language_attributes(); ?> class="ie ie9 lte9 no-js"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?> class="no-js"> <!--<![endif]-->
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<title><?php wp_title(''); ?></title>
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="cleartype" content="on">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="wrapper">
		<header class="header">
			<?php if(is_front_page()) : ?>

				<h1 class="logo">
					<a class="logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>
				</h1>

			<?php else : ?>

				<a class="logo" href="<?php echo bloginfo('url'); ?>"><?php echo bloginfo('name'); ?></a>

			<?php endif; ?>
			<?php wp_nav_menu(array('menu' => 'Main', 'theme_location' => 'main', 'container' => 'nav')); ?>
		</header>