<?php
/**
 * Plugin Name:       USM Plugin blocks
 * Description:       Blocks personnalisés pour le site web USM
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           2.1.0
 * Author:            Marie Rigal
 * Author URI:        https://github.com/marierigal
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       usmb
 * Domain Path:       /languages
 *
 * @package           usm-block
 */

define( 'USMB_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets/' );

/**
 * Register blocks
 */
include_once( plugin_dir_path( __FILE__ ) . 'build/team-info/index.php' );
include_once( plugin_dir_path( __FILE__ ) . 'build/players/index.php' );
include_once( plugin_dir_path( __FILE__ ) . 'build/sponsors/index.php' );

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
 if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * Passes translations to JavaScript.
     */
    wp_set_script_translations( 'usmb-domain-js', 'usmb', plugin_dir_path( __FILE__ ) . 'languages' );
  }
}
add_action( 'init', 'usmb_register_blocks' );

// Add inline CSS in the admin head with the style tag
function usmb_admin_styles() {
    echo '<style type="text/css" id="usmp_admin_styles">
:root {
  --white: #ffffff;
  --light: #9aa2a8;
  --dark: #1d1d1c;
  --primary: #52ae32;
  --secondary: #2e509e;
  --tertiary: #fbcb00;
  --tertiary-dark: #cc902e;
}
</style>';
}
add_action( 'admin_head', 'usmb_admin_styles' );
