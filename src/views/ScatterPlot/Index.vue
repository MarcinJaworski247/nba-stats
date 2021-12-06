<template>
  <div>
    <app-header
      text="Średnia ilość minut spędzonych na boisku i średnia punktów według przedziału wieku"
    />
    <scatter-plot />
  </div>
</template>
<script>
import ScatterPlot from "@/components/Charts/ScatterPlot";

import AppHeader from "@/components/App/AppHeader";

export default {
  name: "ScatterPlotIndex",
  components: {
    ScatterPlot,
    AppHeader,
  },
};
</script>
<style scoped>
/* .chart-wrapper {
  display: flex;
  justify-content: center;
} */
</style>
