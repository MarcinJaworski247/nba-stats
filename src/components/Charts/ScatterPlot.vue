<template>
  <div>
    <div class="chart-wrapper">
      <apexchart
        type="bubble"
        :height="650"
        :width="1000"
        :options="chartOptions"
        :series="series"
        v-if="!isLoading && series.length === 4"
      />
    </div>
  </div>
</template>
<script>
// service
import { getMinsByAgeRange } from "@/services/dataService";

export default {
  name: "ScatterPlot",
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 450,
          type: "bubble",
          zoom: {
            enabled: false,
            type: "xy",
          },
          toolbar: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
        },
        theme: {
          palette: "palette2",
        },
        bubble: {
          minBubbleRadius: 10,
          maxBubbleRadius: 32,
        },
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function (val) {
              return `${parseFloat(val).toFixed(2)} MPG`;
            },
          },
          title: {
            text: "Minutes per game",
            style: {
              fontSize: "20px",
              fontFamily: "Roboto, sans-serif",
              color: "#808080",
              fontWeight: 300,
            },
          },
        },
        yaxis: {
          tickAmount: 9,
          min: 18,
          max: 36,
          labels: {
            show: true,
            formatter: function (val) {
              return `${val} years old`;
            },
          },
          title: {
            text: "Players age",
            style: {
              fontSize: "20px",
              fontFamily: "Roboto, sans-serif",
              color: "#808080",
              fontWeight: 300,
            },
          },
        },
      },
    };
  },
  mounted() {
    const ranges = getMinsByAgeRange();
    this.series.push(ranges.range1);
    this.series.push(ranges.range2);
    this.series.push(ranges.range3);
    this.series.push(ranges.range4);
  },
};
</script>
