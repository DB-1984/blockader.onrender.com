<?php

$selected_posts = $attributes['selectedPosts'] ?? [];
$heading        = $attributes['heading'] ?? 'Related Content';
$show_excerpt   = $attributes['showExcerpt'] ?? false;
$show_image     = $attributes['showImage'] ?? false;
$excerpt_length = absint( $attributes['excerptLength'] ?? 20 );

if ( empty( $selected_posts ) ) {
    return;
}

$post_ids = array_column( $selected_posts, 'id' );

$query = new WP_Query( [
    'post_type'      => [ 'post', 'page' ],
    'post__in'       => $post_ids,
    'orderby'        => 'post__in',
    'posts_per_page' => count( $post_ids ),
    'post_status'    => 'publish',
] );

if ( ! $query->have_posts() ) {
    return;
}
?>

<div <?php echo get_block_wrapper_attributes( [ 'class' => 'associated-posts-block' ] ); ?>>

    <h3 class="associated-posts-heading">
        <?php echo wp_kses_post( $heading ); ?>
    </h3>

    <ul class="associated-posts-list">
        <?php while ( $query->have_posts() ) : $query->the_post(); ?>

            <li class="associated-posts-item">
                <a class="associated-posts-item-link" href="<?php echo esc_url( get_permalink() ); ?>">

                    <span class="post-type">
                        <?php echo esc_html( get_post_type() ); ?>
                    </span>

                    <?php if ( $show_image && has_post_thumbnail() ) : ?>
                        <div class="associated-posts-thumbnail">
                            <?php the_post_thumbnail( 'thumbnail' ); ?>
                        </div>
                    <?php endif; ?>

                    <div class="associated-posts-item-inner">
                        <span class="post-title">
                            <?php the_title(); ?>
                        </span>

                        <?php if ( $show_excerpt ) : ?>
                            <span class="post-excerpt">
                                <?php echo esc_html( wp_trim_words( get_the_excerpt(), $excerpt_length, '...' ) ); ?>
                            </span>
                        <?php endif; ?>
                    </div>

                </a>
            </li>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    </ul>

</div>