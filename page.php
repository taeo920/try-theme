<?php the_post(); ?>

<div class="row">
	<section id="primary" class="col-sm-8">
		<article class="formatted">
			<h1 class="page-title"><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</article>
	</section>

	<?php try_get_sidebar(); ?>
</div>