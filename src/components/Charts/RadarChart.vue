<template>
  <apexchart
    class="chart"
    type="radar"
    :height="450"
    :width="450"
    :options="chartOptions"
    :series="series"
    v-if="series[0].data.length === 5"
  />
</template>
<script>
// service
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
          categories: [
            "Point Guards",
            "Shooting Guards",
            "Power Forwards",
            "Centers",
            "Small Forwards",
          ],
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
            return `${val} RB`;
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
