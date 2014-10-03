<?php the_post(); ?>

<div class="row">
	<section id="primary" class="col-sm-8">
		<article class="article formatted">
			<h1 class="article-title"><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</article>

		<section class="comments">
			<?php comments_template(); ?>
		</section>
	</section>

	<?php try_get_sidebar(); ?>
</div>