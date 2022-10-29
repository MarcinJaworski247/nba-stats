<template>
  <h1 class="primary-header">
    {{ text }}
  </h1>
</template>
<script>
export default {
  name: "AppPrimaryHeader",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.primary-header {
  color: #808080;
  font-size: 20px;
  font-weight: 500;
}
</style>
