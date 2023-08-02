<?php
$category = $attributes['category'];

if (array_key_exists($category, USM_PLAYER_CATEGORY_POSITION_MAP)) :
  $positions = USM_PLAYER_CATEGORY_POSITION_MAP[$category];

  $query = new WP_Query([
    'post_type' => 'usmp_player',
    'posts_per_page' => -1,
    'meta_key' => 'usmp_player_position',
    'orderby' => [
      'meta_value' => 'ASC',
      'title' => 'ASC',
    ],
    'meta_query' => [
      [
        'key' => 'usmp_player_position',
        'value' => $positions,
        'compare' => 'IN',
      ],
    ],
  ]);

  if ($query->have_posts()) :
?>
<div <?= wp_kses_data(get_block_wrapper_attributes()); ?>>
  <h3 class="usmb-players__title"><?= USM_PLAYER_CATEGORIES[$category] ?></h3>

  <ol class="usmb-players__list">
<?php
    while ($query->have_posts()) : $query->the_post();
      $post_id = get_the_ID();
      $last_name = get_post_meta($post_id, 'usmp_player_last_name', true);
      $first_name = get_post_meta($post_id, 'usmp_player_first_name', true);
      $position = get_post_meta($post_id, 'usmp_player_position', true);
      $height = get_post_meta($post_id, 'usmp_player_height', true);
      $weight = get_post_meta($post_id, 'usmp_player_weight', true);
      $history = get_post_meta($post_id, 'usmp_player_history', true);
      $birth_year = get_post_meta($post_id, 'usmp_player_birth_year', true);
      $age = $birth_year ? date('Y') - $birth_year : '';
      $thumbnail = get_the_post_thumbnail_url($post_id, 'medium');
?>
    <li class="usmb-players__list__player">
    <?php if ($thumbnail) : ?>
      <img class="usmb-players__list__player__thumbnail" src="<?= $thumbnail ?>" alt="Portrait de <?= $first_name ?> <?= $last_name ?>">
    <?php else : ?>
      <img class="usmb-players__list__player__thumbnail" src="<?= USMB_ASSETS_URL . 'images/blank-player.png' ?>" alt="">
    <?php endif; ?>

      <div class="usmb-players__list__player__info">
        <h4 class="usmb-players__list__player__info__name"><?= $first_name ?> <?= $last_name ?></h4>

        <p class="usmb-players__list__player__info__position"><?= USM_PLAYER_POSITIONS[$position] ?? USM_STAFF_POSITIONS[$position] ?? '-' ?></p>

        <hr class="usmb-players__list__player__info__separator"/>

        <p class="usmb-players__list__player__info__age">
          <?= $age ?> <span class="usmb-players__list__player__info__age__label"><?= __('years', 'usmb') ?></span>
        </p>

        <p class="usmb-players__list__player__info__body">
          <?= $height ?> <span class="usmb-players__list__player__info__body__label">cm</span> |
          <?= $weight ?> <span class="usmb-players__list__player__info__body__label">kg</span>
        </p>

        <hr class="usmb-players__list__player__info__separator"/>

        <p class="usmb-players__list__player__info__history"><?= $history ?></p>
      </div>
    </li>
<?php
    endwhile;
?>
  </ol>
</div>
<?php
  endif;
endif;
wp_reset_postdata();
?>
