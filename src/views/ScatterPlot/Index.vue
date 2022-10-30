<template>
  <div>
    <app-primary-header
      text="Average minutes spent on court and points average by age range"
    />
    <scatter-plot />
    <div class="mt-3">
      <app-secondary-header text="Measures of distribution" class="mb-2" />
      <measures-data-grid :data="data" />
    </div>
    <div class="mt-3">
      <app-secondary-header
        text="Pearson's linear correlation coefficients"
        class="mb-2"
      />
      <div class="caption mb-2">
        Correlation coefficient between average minutes and points:
        <strong>{{ mpg_ppg_corr }}</strong>
        ({{ getCorrInterpretation(mpg_ppg_corr) }})
      </div>
      <div class="caption mb-2">
        Correlation coefficient between average minutes and age:
        <strong>{{ mpg_age_corr }}</strong>
        ({{ getCorrInterpretation(mpg_age_corr) }})
      </div>
      <div class="caption mb-2">
        Correlation coefficient between average points and age:
        <strong>{{ ppg_age_corr }}</strong>
        ({{ getCorrInterpretation(ppg_age_corr) }})
      </div>
    </div>
  </div>
</template>
<script>
import ScatterPlot from "@/components/Charts/ScatterPlot";
import AppPrimaryHeader from "@/components/App/AppPrimaryHeader";
import AppSecondaryHeader from "@/components/App/AppSecondaryHeader";
import MeasuresDataGrid from "@/components/DataGrids/MeasuresDataGrid";

import {
  getAllPlayersMpg,
  getAllPlayersPpg,
  getAllPlayersAge,
} from "@/services/dataService";

import {
  getCorrInterpretation,
  pearsonCorrelation,
  getMeasuresOfDistribution,
} from "@/services/mathService";

export default {
  name: "ScatterPlotIndex",
  components: {
    ScatterPlot,
    AppPrimaryHeader,
    AppSecondaryHeader,
    MeasuresDataGrid,
  },
  data() {
    return {
      data: [],
      mpg_ppg_corr: null,
      mpg_age_corr: null,
      ppg_age_corr: null,
      getCorrInterpretation,
    };
  },
  computed: {},
  methods: {
    calculatePearsonCorrelation() {
      this.mpg_ppg_corr = pearsonCorrelation(
        getAllPlayersMpg(),
        getAllPlayersPpg()
      );

      this.mpg_age_corr = pearsonCorrelation(
        getAllPlayersMpg(),
        getAllPlayersAge()
      );

      this.ppg_age_corr = pearsonCorrelation(
        getAllPlayersPpg(),
        getAllPlayersAge()
      );
    },
    getStats() {
      const minutesMeasures = getMeasuresOfDistribution("MPG");
      this.data.push(minutesMeasures);
      const ageMeasures = getMeasuresOfDistribution("Age");
      this.data.push(ageMeasures);
      const pointsMeasures = getMeasuresOfDistribution("PPG");
      this.data.push(pointsMeasures);
    },
  },
  mounted() {
    this.getStats();
    this.calculatePearsonCorrelation();
  },
};
</script>
