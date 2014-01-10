<?php /* Template Name: Three Column */ ?>
<?php get_header(); ?>

<div id="content" class="main col3-layout">
	<div class="col-wrapper">
		<section id="primary" class="col-main" >

		<?php if(have_posts()) : while(have_posts()) : the_post(); ?>

			<article class="formatted">
				<h1 class="page-title"><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</article>

		<?php endwhile; endif; ?>

		</section> <!-- end #primary -->

		<?php get_sidebar('left'); ?>

	</div> <!-- end .col-wrapper -->

	<?php get_sidebar(); ?>

</div>

<?php get_footer(); ?>