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

import * as ss from "simple-statistics";

import {
  getAllPlayersMpg,
  getAllPlayersPpg,
  getAllPlayersAge,
} from "@/services/dataService";

import {
  getCorrInterpretation,
  pearsonCorrelation,
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
    calculateMpgStats() {
      const allStats = getAllPlayersMpg();
      const attribute = "MPG";
      const average = ss.average(allStats).toFixed(2);
      const mean = ss.mean(allStats).toFixed(2);
      const mode = ss.mode(allStats).toFixed(2);
      const geometricMean = ss.geometricMean(allStats);
      const rootMeanSquare = ss.rootMeanSquare(allStats).toFixed(2);
      const stdv = ss.standardDeviation(allStats).toFixed(2);
      const q1 = ss.quantile(allStats, 0.25).toFixed(2);
      const q3 = ss.quantile(allStats, 0.75).toFixed(2);
      const iqr = ss.interquartileRange(allStats).toFixed(2);
      const variance = ss.variance(allStats).toFixed(2);
      const meanAbsoluteDeviation = ss
        .medianAbsoluteDeviation(allStats)
        .toFixed(2);
      const quarterDeviation = (iqr / 2).toFixed(2);
      const coefficientOfVariation = ss
        .coefficientOfVariation(allStats)
        .toFixed(2);
      const kurtosis = ss.sampleKurtosis(allStats).toFixed(2);
      const skewness = ss.sampleSkewness(allStats).toFixed(2);
      const quantity = allStats.length;

      this.data.push({
        attribute: attribute,
        average: average,
        mean: mean,
        mode: mode,
        geometricMean: geometricMean,
        rootMeanSquare: rootMeanSquare,
        stdv: stdv,
        q1: q1,
        q3: q3,
        iqr: iqr,
        variance: variance,
        meanAbsoluteDeviation: meanAbsoluteDeviation,
        quarterDeviation: quarterDeviation,
        coefficientOfVariation: coefficientOfVariation,
        kurtosis: kurtosis,
        skewness,
        quantity: quantity,
      });
    },
    calculatePpgStats() {
      const allStats = getAllPlayersPpg();
      const attribute = "PPG";
      const average = ss.average(allStats).toFixed(2);
      const mean = ss.mean(allStats).toFixed(2);
      const mode = ss.mode(allStats).toFixed(2);
      const geometricMean = ss.geometricMean(allStats);
      const rootMeanSquare = ss.rootMeanSquare(allStats).toFixed(2);
      const stdv = ss.standardDeviation(allStats).toFixed(2);
      const q1 = ss.quantile(allStats, 0.25).toFixed(2);
      const q3 = ss.quantile(allStats, 0.75).toFixed(2);
      const iqr = ss.interquartileRange(allStats).toFixed(2);
      const variance = ss.variance(allStats).toFixed(2);
      const meanAbsoluteDeviation = ss
        .medianAbsoluteDeviation(allStats)
        .toFixed(2);
      const quarterDeviation = (iqr / 2).toFixed(2);
      const coefficientOfVariation = ss
        .coefficientOfVariation(allStats)
        .toFixed(2);
      const kurtosis = ss.sampleKurtosis(allStats).toFixed(2);
      const skewness = ss.sampleSkewness(allStats).toFixed(2);
      const quantity = allStats.length;

      this.data.push({
        attribute: attribute,
        average: average,
        mean: mean,
        mode: mode,
        geometricMean: geometricMean,
        rootMeanSquare: rootMeanSquare,
        stdv: stdv,
        q1: q1,
        q3: q3,
        iqr: iqr,
        variance: variance,
        meanAbsoluteDeviation: meanAbsoluteDeviation,
        quarterDeviation: quarterDeviation,
        coefficientOfVariation: coefficientOfVariation,
        kurtosis: kurtosis,
        skewness,
        quantity: quantity,
      });
    },
    calculateAgeStats() {
      const allStats = getAllPlayersAge();
      const attribute = "Age";
      const average = ss.average(allStats).toFixed(2);
      const mean = ss.mean(allStats).toFixed(2);
      const mode = ss.mode(allStats).toFixed(2);
      const geometricMean = ss.geometricMean(allStats);
      const rootMeanSquare = ss.rootMeanSquare(allStats).toFixed(2);
      const stdv = ss.standardDeviation(allStats).toFixed(2);
      const q1 = ss.quantile(allStats, 0.25).toFixed(2);
      const q3 = ss.quantile(allStats, 0.75).toFixed(2);
      const iqr = ss.interquartileRange(allStats).toFixed(2);
      const variance = ss.variance(allStats).toFixed(2);
      const meanAbsoluteDeviation = ss
        .medianAbsoluteDeviation(allStats)
        .toFixed(2);
      const quarterDeviation = (iqr / 2).toFixed(2);
      const coefficientOfVariation = ss
        .coefficientOfVariation(allStats)
        .toFixed(2);
      const kurtosis = ss.sampleKurtosis(allStats).toFixed(2);
      const skewness = ss.sampleSkewness(allStats).toFixed(2);
      const quantity = allStats.length;

      this.data.push({
        attribute: attribute,
        average: average,
        mean: mean,
        mode: mode,
        geometricMean: geometricMean,
        rootMeanSquare: rootMeanSquare,
        stdv: stdv,
        q1: q1,
        q3: q3,
        iqr: iqr,
        variance: variance,
        meanAbsoluteDeviation: meanAbsoluteDeviation,
        quarterDeviation: quarterDeviation,
        coefficientOfVariation: coefficientOfVariation,
        kurtosis: kurtosis,
        skewness,
        quantity: quantity,
      });
    },
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
  },
  mounted() {
    this.calculateMpgStats();
    this.calculatePpgStats();
    this.calculateAgeStats();
    this.calculatePearsonCorrelation();
  },
};
</script>
