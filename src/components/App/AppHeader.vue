<template>
  <div class="header">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: "AppHeader",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped></style>
