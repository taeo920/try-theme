<?php the_post(); ?>

<div class="container">
	<section class="row">
		<article class="col-sm-8">
			<h1 class="page-title"><?php the_title(); ?></h1>
			<div class="page-content composition">
				<?php the_content(); ?>
			</div>

			<section class="comments">
				<?php comments_template(); ?>
			</section>
		</article>

		<?php try_get_sidebar(); ?>
	</section>
</div>