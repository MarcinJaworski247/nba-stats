<template>
  <div id="app">
    <div class="nav">
      <the-navigation />
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>
<script>
import "@/assets/styles/main.scss";
import TheNavigation from "@/components/App/TheNavigation";
export default {
  components: { TheNavigation },
};
</script>
