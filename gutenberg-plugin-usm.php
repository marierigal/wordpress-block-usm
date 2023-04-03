<?php
/**
 * Plugin Name:       USM Plugin blocks
 * Description:       Custom blocks for USM web site
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Marie Rigal
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       usmb
 * Domain Path:       usmb
 *
 * @package           usm-block
 */

/**
 * Load all translations for our plugin from the MO file.
 */
function usmb_load_textdomain() {
  load_plugin_textdomain( 'usmb', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'usmb_load_textdomain' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function usmb_register_blocks() {
  register_block_type( __DIR__ . '/build/team-referents' );

	if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * Passes translations to JavaScript.
     */
		wp_set_script_translations( 'usmb-domain-js', 'usmb', plugin_dir_path( __FILE__ ) . 'languages' );
	}
}
add_action( 'init', 'usmb_register_blocks' );