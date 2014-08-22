<?php the_post(); ?>

<div class="row">
	<section id="primary" class="col-sm-8">
			<article class="formatted">
				<h1 class="post-title"><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</article>

			<section id="comment-section">
				<?php comments_template(); ?>
			</section>
	</section>
	
	<?php try_get_sidebar(); ?>
</div>