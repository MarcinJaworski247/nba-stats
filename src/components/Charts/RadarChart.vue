<template>
  <apexchart
    type="radar"
    :height="400"
    :width="400"
    :options="chartOptions"
    :series="series"
    v-if="series[0].data.length === 5"
    class="chart"
  />
</template>
<script>
import { getAvgRbByPos } from "@/services/dataService";

export default {
  name: "RadarChart",
  data() {
    return {
      series: [
        {
          name: "Avg RB",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 550,
          type: "radar",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: ["PG", "SG", "PF", "C", "SF"],
        },
        stroke: {
          width: 2,
          colors: ["#be7c00"],
        },
        markers: {
          size: 5,
          colors: ["orange"],
          hover: {
            size: 10,
          },
        },
        fill: {
          colors: ["#ffcd6f"],
        },
        dataLabels: {
          enabled: true,
          background: {
            enabled: true,
            borderRadius: 2,
          },
          formatter: function (val) {
            return `${val} RPG`;
          },
        },
      },
    };
  },
  mounted() {
    const data = getAvgRbByPos();

    this.series[0].data.push(data.pg.toFixed(2));
    this.series[0].data.push(data.sg.toFixed(2));
    this.series[0].data.push(data.pf.toFixed(2));
    this.series[0].data.push(data.c.toFixed(2));
    this.series[0].data.push(data.sf.toFixed(2));
  },
};
</script>
<style scoped>
.chart {
  z-index: 9999;
}
</style>
