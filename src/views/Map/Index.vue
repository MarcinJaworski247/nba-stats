<template>
  <div>
    <app-header
      text="Ilość wygranych meczów drużyn i ich przynależność do konferencji"
    />
    <div class="legend">
      <div class="color blue"></div>
      Konferencja wschodnia
    </div>
    <div class="legend">
      <div class="color red"></div>
      Konferencja zachodnia
    </div>
    <div>
      <Map />
    </div>
  </div>
</template>
<script>
import Map from "@/components/Charts/Map";
import AppHeader from "@/components/App/AppHeader";

export default {
  name: "MapIndex",
  components: {
    Map,
    AppHeader,
  },
};
</script>
<style scoped>
.chart-wrapper {
  display: flex;
  justify-content: center;
}
.legend {
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  color: #808080;
  font-size: 0.9rem;
}
.color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 16px;
}
.red {
  background: #ff7a7a;
}
.blue {
  background: #7ad9ff;
}
</style>
