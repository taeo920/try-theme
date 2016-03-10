<div class="container">
	<div class="row">
		<?php get_template_part('partials/carousel'); ?>
	</div>
	<div class="row">
		<section class="posts col-sm-8">
			<ol class="posts-list">
				<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
					<?php try_get_template_part('partials', 'loop-post'); ?>
				<?php endwhile; else : ?>
					<?php try_get_template_part('partials', 'loop-post-not-found'); ?>
				<?php endif; ?>
			</ol>

			<?php try_get_template_part('partials', 'pagination'); ?>
		</section>

		<?php try_get_sidebar(); ?>
	</div>
</div>