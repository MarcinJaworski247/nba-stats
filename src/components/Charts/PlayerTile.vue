<template>
  <div class="tile-wrapper">
    <div class="tile">
      <img :src="image" alt="" class="avatar" loading="lazy" />
    </div>
    <div class="name">
      {{ name }}
      <div class="stats">{{ avg.toFixed(2) }} RPG</div>
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
<style scoped>
.tile-wrapper {
  width: 120px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.tile {
  border: 2px solid #808080;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  overflow: hidden;
  z-index: 999;
  transition: 0.3s ease;
}
.tile:hover {
  border-color: orange;
}
.avatar {
  border-radius: 50%;
  max-width: 100%;
  max-height: 100%;
}
</style>
