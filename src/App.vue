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
<style scoped>
.main-content {
  margin: 32px;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  min-width: 1200px;
  margin-top: 96px;
  padding-bottom: 96px;
}
.nav {
  width: 100%;
  height: 60px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 10000;
  background: #fff4e6;
}
</style>
