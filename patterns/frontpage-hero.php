<?php
/**
 * Title: Front Page Hero
 * Slug: blockader/frontpage-hero
 * Categories: featured
 */
?>

<!-- wp:group {"className":"front-page-hero","layout":{"type":"constrained"}} -->
<div class="wp-block-group front-page-hero">

    <!-- wp:spacer {"height":"25px"} -->
    <div style="height:25px" aria-hidden="true" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->

    <!-- wp:columns {"verticalAlignment":"center","align":"wide","className":"front-hero"} -->
    <div class="wp-block-columns alignwide are-vertically-aligned-center front-hero">

        <!-- wp:column {"verticalAlignment":"center"} -->
        <div class="wp-block-column is-vertically-aligned-center">

            <!-- wp:group {"className":"front-hero-content","layout":{"type":"default"}} -->
            <div class="wp-block-group front-hero-content">

                <!-- wp:site-title {"level":2,"className":"hero-text","textColor":"contrast","fontSize":"hero"} /-->

                <!-- wp:paragraph {"className":"hero-tagline","backgroundColor":"neon","textColor":"contrast"} -->
                <p class="hero-tagline has-contrast-color has-neon-background-color has-text-color has-background">A
                    minimalist, brutalist, lightning-fast theme with a custom live RESTful search block, a custom
                    associated page/post block, and a custom promo banner.</p>
                <!-- /wp:paragraph -->

            </div>
            <!-- /wp:group -->

        </div>
        <!-- /wp:column -->

        <!-- wp:column {"verticalAlignment":"center"} -->
        <div class="wp-block-column is-vertically-aligned-center">

            <!-- wp:image {"sizeSlug":"full","linkDestination":"none","align":"center","className":"hero-image"} -->
            <figure class="wp-block-image aligncenter size-full hero-image">
                <img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/TMaeM.jpg' ) ); ?>" alt="" />
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