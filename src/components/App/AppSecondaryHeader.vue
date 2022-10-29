<template>
  <h2 class="secondary-header">
    {{ text }}
  </h2>
</template>
<script>
export default {
  name: "AppSecondaryHeader",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.secondary-header {
  color: #808080;
  font-size: 18px;
  font-weight: 500;
}
</style>
