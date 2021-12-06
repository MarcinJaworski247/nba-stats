<template>
  <div class="tile-wrapper">
    <div class="tile">
      <img :src="image" alt="" class="avatar" loading="lazy" />
    </div>
    <div class="name">
      {{ name }},
      <div class="stats">{{ avg.toFixed(2) }}PPG</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayerTile",
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    avg: {
      type: Number,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
  },
};
</script>
