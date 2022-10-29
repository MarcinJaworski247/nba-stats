<template>
  <nav class="routes">
    <router-link :to="{ name: `court` }">Court</router-link>
    <router-link :to="{ name: `map` }">Map</router-link>
    <router-link :to="{ name: `scatter` }">Scatter plot</router-link>
  </nav>
</template>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #808080;
  font-size: 22px;
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    color: orange;
  }

  &.router-link-exact-active {
    color: orange;
    text-decoration: underline;
  }
}

.routes {
  width: 67%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff4e6;
}
</style>
