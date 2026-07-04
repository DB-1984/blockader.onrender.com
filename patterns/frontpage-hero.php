<?php
/**
 * Title: Front Page Hero
 * Slug: blockader/frontpage-hero
 * Inserter: false
 */
?>

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

    <!-- wp:spacer {"height":"25px"} -->
    <div style="height:25px" aria-hidden="true" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->

    <!-- wp:columns {"verticalAlignment":"center","align":"wide","className":"front-hero","style":{"spacing":{"padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50"}}}} -->
    <div class="wp-block-columns alignwide are-vertically-aligned-center front-hero"
        style="padding-right:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">

        <!-- wp:column {"verticalAlignment":"center"} -->
        <div class="wp-block-column is-vertically-aligned-center">

            <!-- wp:group {"tagName":"main","className":"front-hero-content","layout":{"type":"default"}} -->
            <main class="wp-block-group front-hero-content">

                <!-- wp:site-title {"level":2,"className":"hero-text","style":{"elements":{"link":{"color":{"text":"var:preset|color|contrast"}}},"spacing":{"padding":{"right":"0","left":"0"}}},"textColor":"contrast","fontSize":"hero"} /-->

                <!-- wp:site-tagline {"className":"hero-tagline","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"textColor":"contrast"} /-->

            </main>
            <!-- /wp:group -->

        </div>
        <!-- /wp:column -->

        <!-- wp:column {"verticalAlignment":"center"} -->
        <div class="wp-block-column is-vertically-aligned-center">

            <!-- wp:image {"aspectRatio":"1","scale":"cover","sizeSlug":"full","linkDestination":"none","align":"center","className":"hero-image"} -->
            <figure class="wp-block-image aligncenter size-full hero-image">
                <img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/TMaeM.jpg' ) ); ?>" alt=""
                    style="aspect-ratio:1;object-fit:cover" />
            </figure>
            <!-- /wp:image -->

        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

    <!-- wp:spacer {"height":"50px"} -->
    <div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->

</div>
<!-- /wp:group -->