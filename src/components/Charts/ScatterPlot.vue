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
    <!-- <div @click="dataVisible = !dataVisible" class="subtitle mt-3">
      <span class="mr-2">Dane</span>
      <i class="fas fa-chevron-down"></i>
    </div>
    <div v-if="dataVisible">
      <data-grid :headers="headers" :data="data" />
    </div> -->
    <div class="subtitle mt-3">
      <span class="mr-2">Satystyki opisowe</span>
    </div>
    <div>
      <data-grid :headers="statsHeaders" :data="statsData" />
    </div>
  </div>
</template>
<script>
// service
import { getMinsByAgeRange } from "@/services/dataService";
// components
import DataGrid from "@/components/App/DataGrid";

// simple satistics
import * as ss from "simple-statistics";

export default {
  name: "ScatterPlot",
  components: {
    DataGrid,
  },
  data() {
    return {
      isLoading: false,
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
      headers: ["Zawodnik", "Wiek", "MPG", "PPG"],
      data: [],
      dataVisible: false,
      statsHeaders: ["Atrybut", "Min", "Max", "Avg", "Stdv", "Q1", "Q3", "IQR"],
      statsData: [],
    };
  },
  mounted() {
    // this.isLoading = true;
    const ranges = getMinsByAgeRange();

    this.series.push(ranges.range1);
    this.series.push(ranges.range2);
    this.series.push(ranges.range3);
    this.series.push(ranges.range4);

    for (const player of ranges.range1.data) {
      this.data.push([player[3], player[1], player[0], player[2]]);
    }
    for (const player of ranges.range2.data) {
      this.data.push([player[3], player[1], player[0], player[2]]);
    }
    for (const player of ranges.range3.data) {
      this.data.push([player[3], player[1], player[0], player[2]]);
    }
    for (const player of ranges.range4.data) {
      this.data.push([player[3], player[1], player[0], player[2]]);
    }

    const ages = [];
    const mpgs = [];
    const ppgs = [];

    for (const player of ranges.range1.data) {
      ages.push(player[1]);
      mpgs.push(player[0]);
      ppgs.push(player[2]);
    }
    for (const player of ranges.range2.data) {
      ages.push(player[1]);
      mpgs.push(player[0]);
      ppgs.push(player[2]);
    }
    for (const player of ranges.range3.data) {
      ages.push(player[1]);
      mpgs.push(player[0]);
      ppgs.push(player[2]);
    }
    for (const player of ranges.range4.data) {
      ages.push(player[1]);
      mpgs.push(player[0]);
      ppgs.push(player[2]);
    }

    // age stats
    const ageMin = ss.min(ages);
    const ageMax = ss.max(ages);
    const ageAvg = ss.average(ages);
    const ageStdv = ss.standardDeviation(ages);
    const ageQ1 = ss.quantile(ages, 0.25);
    const ageQ2 = ss.quantile(ages, 0.75);
    const ageIqr = ss.interquartileRange(ages);

    this.statsData.push([
      "Wiek",
      ageMin,
      ageMax,
      Number(ageAvg).toFixed(2),
      Number(ageStdv).toFixed(2),
      ageQ1,
      ageQ2,
      Number(ageIqr).toFixed(2),
    ]);

    // mpg stats
    const mpgMin = ss.min(mpgs);
    const mpgMax = ss.max(mpgs);
    const mpgAvg = ss.average(mpgs);
    const mpgStdv = ss.standardDeviation(mpgs);
    const mpgQ1 = ss.quantile(mpgs, 0.25);
    const mpgQ2 = ss.quantile(mpgs, 0.75);
    const mpgIqr = ss.interquartileRange(mpgs);

    this.statsData.push([
      "MPG",
      mpgMin,
      mpgMax,
      Number(mpgAvg).toFixed(2),
      Number(mpgStdv).toFixed(2),
      mpgQ1,
      mpgQ2,
      Number(mpgIqr).toFixed(2),
    ]);

    // ppg stats
    const ppgMin = ss.min(ppgs);
    const ppgMax = ss.max(ppgs);
    const ppgAvg = ss.average(ppgs);
    const ppgStdv = ss.standardDeviation(ppgs);
    const ppgQ1 = ss.quantile(ppgs, 0.25);
    const ppgQ2 = ss.quantile(ppgs, 0.75);
    const ppgIqr = ss.interquartileRange(ppgs);

    this.statsData.push([
      "PPG",
      ppgMin,
      ppgMax,
      Number(ppgAvg).toFixed(2),
      Number(ppgStdv).toFixed(2),
      ppgQ1,
      ppgQ2,
      Number(ppgIqr).toFixed(2),
    ]);

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>
<style scoped>
.loader {
  margin-top: 64px;
}
.subtitle {
  color: #808080;
}
.mr-2 {
  margin-right: 16px;
}
.mt-3 {
  margin-top: 24px;
}
.chart-wrapper {
  display: flex;
  justify-content: center;
}
</style>
