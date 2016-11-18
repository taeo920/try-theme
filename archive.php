<div class="container">
	<div class="row">
		<section class="col-sm-8">
			<?php if ( have_posts() ) : the_post(); ?>
				<h1 class="page-title">
					<?php if ( is_tag() ) : ?>
						<?php single_tag_title(); ?>
					<?php elseif ( is_day() ) : ?>
						Daily Archives: <?php the_time('F jS, Y'); ?>
					<?php elseif ( is_month() ) : ?>
						Monthly Archives: <?php the_time('F, Y'); ?>
					<?php elseif ( is_year() ) : ?>
						Yearly Archives: <?php the_time('Y'); ?>
					<?php else : ?>
						<?php single_cat_title(); ?>
					<?php endif; ?>
				</h1>
			<?php endif; rewind_posts(); ?>

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