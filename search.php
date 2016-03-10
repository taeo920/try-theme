<?php global $wp_query; ?>

<div class="container">
	<section class="posts posts-search row" >
		<div class="col-sm-12">
			<h1 class="posts-title">
				<?php echo $wp_query->found_posts; ?> Result<?php if($count != 1) { echo 's'; } ?> for "<?php the_search_query(); ?>"
			</h1>

			<ul class="posts-list">
				<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
					<li class="post" id="<?php the_ID(); ?>">
						<h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<div class="post-excerpt composition">
							<?php the_excerpt(); ?> <a href="<?php the_permalink(); ?>">Read more</a>
						</div>
					</li>
				<?php endwhile; else : ?>
					<li class="post">
						<h2 class="post-title">Posts Not Found</h2>
						<p class="post-byline">No posts were found that match your criteria.</p>
					</li>
				<?php endif; ?>
			</ul>

			<div class="pagination">
				<div class="pagination-prev"><?php next_posts_link('&laquo; Older Entries') ?></div>
				<div class="pagination-next"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
			</div>
		</div>
	</section>
</div>