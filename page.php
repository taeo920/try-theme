<?php get_header(); ?>

<div id="content" class="main col2-right-layout">
	<section id="primary" class="col-main">

	<?php if(have_posts()) : while(have_posts()) : the_post(); ?>

		<article class="formatted">
			<h1 class="page-title"><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</article>

	<?php endwhile; endif; ?>

	</section>

	<?php get_sidebar(); ?>

</div>

<?php get_footer(); ?>