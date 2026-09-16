<?php

$image_url = $attributes['imageUrl'] ?? '';

if ( function_exists( 'str_starts_with' ) && str_starts_with( $image_url, 'file:./' ) ) {
	$image_url = str_replace(
		'file:./',
		get_theme_file_uri() . '/',
		$image_url
	);
}

$button_background_color       = $attributes['buttonBackgroundColor'] ?? '';
$button_text_color             = $attributes['buttonTextColor'] ?? '';
$button_hover_background_color = $attributes['buttonHoverBackgroundColor'] ?? '';
$button_hover_text_color       = $attributes['buttonHoverTextColor'] ?? '';

$custom_styles =
	'--banner-button-bg:' . esc_attr( $button_background_color ?: 'var(--wp--preset--color--contrast)' ) . ';' .
	'--banner-button-text:' . esc_attr( $button_text_color ?: 'var(--wp--preset--color--base)' ) . ';' .
	'--banner-button-hover-bg:' . esc_attr( $button_hover_background_color ?: 'var(--wp--preset--color--accent)' ) . ';' .
	'--banner-button-hover-text:' . esc_attr( $button_hover_text_color ?: 'var(--wp--preset--color--contrast)' ) . ';';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'blockader-banner',
		'style' => $custom_styles,
	)
);

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="blockader-banner__inner">

		<div class="blockader-banner__content">

			<h1 class="blockader-banner__heading">
				<?php echo wp_kses_post( $attributes['heading'] ?? 'Build Loud.' ); ?>
			</h1>

			<p class="blockader-banner__text">
				<?php echo wp_kses_post( $attributes['content'] ?? 'A stripped-back WordPress block theme with custom blocks and bold typography.' ); ?>
			</p>

			<div class="blockader-banner__actions">
				<a class="blockader-banner__button" href="<?php echo esc_url( $attributes['buttonUrl'] ?? '#' ); ?>">
					<span><?php echo esc_html( $attributes['buttonText'] ?? 'Learn More' ); ?></span>
				</a>
			</div>

		</div>

		<div class="blockader-banner__media">
			<img
				src="<?php echo esc_url( $image_url ); ?>"
				alt="<?php echo esc_attr( $attributes['imageAlt'] ?? '' ); ?>"
			/>
		</div>

	</div>

</section>