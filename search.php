<?php get_header(); ?>

<div id="content" class="main col2-right-layout">
	<section id="primary" class="col-main" >

		<?php
		$tmp_search = new WP_Query('s=' . wp_specialchars($_GET['s']) . '&show_posts=-1&posts_per_page=-1');
		$count = $tmp_search->post_count;
		?>

		<h1 class="archive page-title"><?php echo $count; ?> Result<?php if($count != 1){ echo 's'; } ?> for '<?php echo wp_specialchars($s, 1); ?>'</h1>
		<ul>

			<?php if(have_posts()) : while(have_posts()) : the_post();
			$keys = explode( " ", $s );
			$title 	= preg_replace( '/('.implode('|', $keys) .')/iu', '<strong class="highlight">\0</strong>', get_the_title() );
			$excerpt = preg_replace( '/('.implode('|', $keys) .')/iu', '<strong class="highlight">\0</strong>', get_the_excerpt() );
			?>

				<li class="post" id="<?php the_ID(); ?>">
					<h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php echo $title; ?></a></h2>
					<div class="formatted">
						<?php echo $excerpt; ?> <a href="<?php the_permalink(); ?>">Read more</a>
					</div>
				</li>

			<?php endwhile; else : ?>

				<li class="post">
					<h2>Posts Not Found</h2>
					<p>No posts were found that match your criteria.</p>
				</li>

			<?php endif; ?>

		</ul>
		<div class="post-nav">
			<div class="prev"><?php next_posts_link('&laquo; Older Entries') ?></div>
			<div class="next"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
		</div>

	</section>

	<?php get_sidebar(); ?>

</div>

<?php get_footer(); ?>