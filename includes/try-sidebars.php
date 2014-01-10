<?php

// Register Sidebar Widget Area
register_sidebar(array(
	'name' => 'Sidebar',
	'id' => 'sidebar',
	'description' => 'Sidebar',
	'before_widget' => '<li class="widget %2$s"><div class="widget-content">',
	'after_widget' => '</div></li>',
	'before_title' => '<h4 class="widget-title">',
	'after_title' => '</h4>'
));