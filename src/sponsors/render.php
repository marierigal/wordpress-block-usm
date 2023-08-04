<?php
$category = $attributes['category'];

$query = new WP_Query([
  'post_type' => 'usmp_sponsor',
  'posts_per_page' => -1,
  'orderby' => [
    'title' => 'ASC',
  ],
  'meta_query' => [
    [
      'key' => 'usmp_sponsor_engagement_level',
      'value' => $category,
      'compare' => 'IS',
    ],
  ],
]);
?>
<div <?= wp_kses_data(get_block_wrapper_attributes()); ?>>
  <h3 class="usmb-sponsors__title"><?= USM_SPONSOR_ENGAGEMENT_LEVELS[$category] ?></h3>

<?php if ($query->have_posts()) : ?>
  <ol class="usmb-sponsors__carousel" data-flickity='{ "wrapAround": true, "autoPlay": true, "contain": true }'>
<?php
  while ($query->have_posts()) : $query->the_post();
    $post_id = get_the_ID();
    $website = get_post_meta($post_id, 'usmp_sponsor_website', true);
    $thumbnail = get_the_post_thumbnail_url($post_id, 'medium');
?>
    <li class="usmb-sponsors__carousel__sponsor">
      <?php if ($website) : ?>
        <a class="usmb-sponsors__carousel__sponsor__link" href="<?= $website ?>" target="_blank">
      <?php endif; ?>

      <?php if ($thumbnail) : ?>
        <img class="usmb-sponsors__carousel__sponsor__thumbnail" src="<?= $thumbnail ?>" alt="Logo de <?= the_title() ?>">
      <?php else : ?>
        <div class="usmb-sponsors__carousel__sponsor__thumbnail"></div>
      <?php endif; ?>

      <h4 class="usmb-sponsors__carousel__sponsor__name"><?= the_title() ?></h4>

      <div class="usmb-sponsors__carousel__sponsor__content"><?= wp_strip_all_tags(get_the_content()) ?></div>

      <?php if ($website) : ?>
        </a>
      <?php endif; ?>
    </li>
<?php
  endwhile;
?>
  </ol>

<?php else : ?>
  <p class="usmb-sponsors__empty"><?= __('Aucun sponsor pour le moment.', 'usmb') ?></p>
<?php endif; ?>

</div>
<?php wp_reset_postdata();?>
