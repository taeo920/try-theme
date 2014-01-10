<?php get_header(); ?>

<div id="content" class="main col2-right-layout">

	<?php include('section-slider.php') ?>

	<section id="primary" class="col-main" >
		<ol class="post-list">
			<?php if(have_posts()) : while(have_posts()) : the_post(); ?>

				<li class="post formatted" id="post-<?php the_ID(); ?>">
					<h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p class="byline">Posted by <?php the_author_posts_link(); ?> on <?php the_time('F j, Y'); ?> in <?php the_category(', '); ?> | <?php comments_number(); ?></p>
					<?php the_excerpt(); ?>
				</li>

			<?php endwhile; else : ?>

				<li class="post">
					<h2>Posts Not Found</h2>
					<p>No posts were found that match your criteria.</p>
				</li>

			<?php endif; ?>
		</ol>

		<div class="post-nav">
			<div class="prev"><?php next_posts_link('&laquo; Older Entries') ?></div>
			<div class="next"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
		</div>
	</section>

	<?php get_sidebar(); ?>

</div>

<?php get_footer(); ?>