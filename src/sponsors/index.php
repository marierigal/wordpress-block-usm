<?php
/**
 * @package usm-block/players
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function usmb_sponsors_block_init() {
  register_block_type(
    __DIR__,
    array(
      'render_callback' => 'usmb_sponsors_block_render_callback',
    )
  );
}
add_action( 'init', 'usmb_sponsors_block_init' );

/**
 * This function is called when the block is being rendered on the front end of the site
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 */
function usmb_sponsors_block_render_callback( $attributes, $content, $block_instance ) {
  ob_start();

  wp_enqueue_style( 'flickity', 'https://unpkg.com/flickity@2/dist/flickity.min.css', false, 2, 'all' );
  wp_enqueue_script( 'flickity', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js', false, 2, true );

  require plugin_dir_path( __FILE__ ) . 'render.php';

  return ob_get_clean();
}
