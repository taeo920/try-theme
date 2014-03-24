<?php /* Template Name: Home */ ?>
<?php get_header(); ?>

<main id="content" class="main col1-layout">
	<section id="primary" class="col-main" >

	<?php if(have_posts()) : while(have_posts()) : the_post(); ?>

		<article class="formatted">
			<h1 class="page-title"><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</article>

	<?php endwhile; endif; ?>

	</section> <!-- end #primary -->
</main>

<?php get_footer(); ?>