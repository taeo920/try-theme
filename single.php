<?php get_header(); ?>

<main class="main">
	<div class="container">
		<div class="row">
			<section id="primary" class="col-sm-8" >
				<?php if(have_posts()) : while(have_posts()) : the_post(); ?>

					<article class="formatted">
						<h1 class="post-title"><?php the_title(); ?></h1>
						<?php the_content(); ?>
					</article>

					<section id="comment-section">
						<?php comments_template(); ?>
					</section>

				<?php endwhile; else : ?>

					<div class="post">
						<h2>Posts Not Found</h2>
						<p>No posts were found that match your criteria.</p>
					</div>

				<?php endif; ?>
			</section>
			<?php get_sidebar(); ?>
		</div>
	</div>
</main>

<?php get_footer(); ?>