<?php

function blockader_setup() {
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/theme.css' );
}

add_action( 'after_setup_theme', 'blockader_setup' );

function blockader_enqueue_styles() {
    wp_enqueue_style(
        'blockader-theme',
        get_theme_file_uri( 'assets/css/theme.css' ),
        [],
        wp_get_theme()->get( 'Version' )
    );
}

add_action( 'wp_enqueue_scripts', 'blockader_enqueue_styles' );

function blockader_register_blocks() {
    register_block_type(
        get_theme_file_path( 'build/associated-posts' )
    );

    register_block_type(
        get_theme_file_path( 'build/blockader-banner' )
    );

    register_block_type(
        get_theme_file_path( 'build/live-rest-search' )
    );
}

add_action( 'init', 'blockader_register_blocks' );