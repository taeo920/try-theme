<?php get_header(); ?>

<main class="main">
	<div class="container">
		<div class="row">
			<section id="primary" class="col-sm-8">
				<?php if(have_posts()) : while(have_posts()) : the_post(); ?>

					<article class="formatted">
						<h1 class="page-title"><?php the_title(); ?></h1>
						<?php the_content(); ?>
					</article>

				<?php endwhile; endif; ?>
			</section>
			<?php get_sidebar(); ?>
		</div>
	</div>
</main>

<?php get_footer(); ?>