<?php the_post(); ?>

<div class="container">
	<section class="article row">
		<article class="composition col-sm-8">
			<h1 class="page-title"><?php the_title(); ?></h1>
			<?php the_content(); ?>
			<section class="comments">
				<?php comments_template(); ?>
			</section>
		</article>

		<?php try_get_sidebar(); ?>
	</section>
</div>