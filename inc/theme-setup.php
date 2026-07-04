<?php

function blockader_enqueue_styles() {
    wp_enqueue_style(
        'blockader-theme',
        get_theme_file_uri( 'assets/css/theme.css' ),
        [],
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'blockader_enqueue_styles' );

function blockader_enqueue_editor_styles() {
    wp_enqueue_style(
        'blockader-editor-theme',
        get_theme_file_uri( 'assets/css/theme.css' ),
        [],
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'enqueue_block_editor_assets', 'blockader_enqueue_editor_styles' );

function blockader_register_assets() {

    $editor_asset = include get_theme_file_path( 'build/index.asset.php' );

    wp_register_script(
        'blockader-editor',
        get_theme_file_uri( 'build/index.js' ),
        $editor_asset[ 'dependencies' ],
        $editor_asset[ 'version' ]
    );

    wp_add_inline_script(
        'blockader-editor',
        'window.blockaderTheme = window.blockaderTheme || {}; window.blockaderTheme.themeUrl = ' . wp_json_encode( get_theme_file_uri() ) . ';',
        'before'
    );

    $search_asset = include get_theme_file_path( 'build/live-rest-search.asset.php' );

    wp_register_script(
        'blockader-live-rest-search',
        get_theme_file_uri( 'build/live-rest-search.js' ),
        $search_asset[ 'dependencies' ],
        $search_asset[ 'version' ],
        true
    );
}
add_action( 'init', 'blockader_register_assets' );

function blockader_register_blocks() {
    register_block_type( get_theme_file_path( 'blocks/associated-posts' ) );
    register_block_type( get_theme_file_path( 'blocks/blockader-banner' ) );
    register_block_type( get_theme_file_path( 'blocks/live-rest-search' ) );
}
add_action( 'init', 'blockader_register_blocks' );