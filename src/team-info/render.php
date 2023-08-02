<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package gutenberg-examples
 */

  $icon = isset($attributes['icon']) ? wp_kses_post($attributes['icon']) : '';
  $iconStyle = isset($attributes['iconStyle']) ? $attributes['iconStyle'] : '';
  $title = isset($attributes['title']) ? wp_kses_post($attributes['title']) : '';
  $content = isset($attributes['content']) ? wp_kses_post($attributes['content']) : '';
  $isList = isset($attributes['isList']) ? $attributes['isList'] : false;
?>
<div <?= wp_kses_data(get_block_wrapper_attributes()); ?>>
  <div class="usmb-team-info__icon-wrapper">
    <i class="usmb-team-info__icon-wrapper__icon <?= $iconStyle ?> fa-<?= $icon ?>"></i>
  </div>

  <div class="usmb-team-info__content-wrapper">
    <h3 class="usmb-team-info__content-wrapper__title"><?= $title; ?></h3>

    <?php if ($isList): ?>
      <ul class="usmb-team-info__content-wrapper__content">
    <?php else: ?>
      <div class="usmb-team-info__content-wrapper__content">
    <?php endif ?>

    <?= $content; ?>

    <?php if ($isList): ?>
      </ul>
    <?php else: ?>
      </div>
    <?php endif ?>
    </ul>
  </div>
</div>
