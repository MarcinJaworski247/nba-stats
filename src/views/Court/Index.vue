<template>
  <div>
    <app-primary-header
      text="Rebounds averages by position and league leaders"
    />
    <div class="mt-5">
      <court />
    </div>
    <div class="mt-15">
      <app-secondary-header text="Measures of distribution" class="mb-2" />
      <measures-data-grid :data="data" />
    </div>
    <div class="mt-3">
      <app-secondary-header
        text="Pearson's linear correlation coefficient"
        class="mb-2"
      />
      <div class="caption mb-2">
        <span>
          Correlation coefficient between rebounds average and position:
        </span>
        <strong>{{ pos_rb_corr }}</strong>
        ({{ getCorrInterpretation(pos_rb_corr) }})
      </div>
    </div>
  </div>
</template>
<script>
import Court from "@/components/Charts/Court";
import AppPrimaryHeader from "@/components/App/AppPrimaryHeader";
import AppSecondaryHeader from "@/components/App/AppSecondaryHeader";
import MeasuresDataGrid from "@/components/DataGrids/MeasuresDataGrid";
import * as ss from "simple-statistics";
import {
  getAllPlayersRb,
  getAllPlayersPositions,
} from "@/services/dataService";

import {
  getCorrInterpretation,
  pearsonCorrelation,
} from "@/services/mathService";

export default {
  name: "CourtIndex",
  components: {
    Court,
    AppPrimaryHeader,
    AppSecondaryHeader,
    MeasuresDataGrid,
  },
  data() {
    return {
      pos_rb_corr: null,
      data: [],
      getCorrInterpretation,
    };
  },
  methods: {
    calculatePearsonCorrelation() {
      this.pos_rb_corr = pearsonCorrelation(
        getAllPlayersRb(),
        getAllPlayersPositions()
      );
    },
    calculateRbStats() {
      const allStats = getAllPlayersRb();
      const attribute = "RB";
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
  },
  mounted() {
    this.calculatePearsonCorrelation();
    this.calculateRbStats();
  },
};
</script>
