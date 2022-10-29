<template>
  <div>
    <app-primary-header text="Won games by team and conference" />
    <div class="legend">
      <div class="color blue"></div>
      Eastern conference
    </div>
    <div class="legend">
      <div class="color red"></div>
      Western conference
    </div>
    <div>
      <Map />
    </div>
    <div class="mt-3">
      <app-secondary-header text="Measures of distribution" class="mb-2" />
      <measures-data-grid :data="data" />
    </div>
    <div class="mt-3">
      <app-secondary-header
        text="Pearson's linear correlation coefficient"
        class="mb-2"
      />
      <div class="caption mb-2">
        Correlation coefficient between amount of won games and belonging to
        conference:
        <strong>{{ wins_conf_corr }}</strong>
        ({{ getCorrInterpretation(wins_conf_corr) }})
      </div>
    </div>
  </div>
</template>
<script>
import Map from "@/components/Charts/Map";
import AppPrimaryHeader from "@/components/App/AppPrimaryHeader";
import AppSecondaryHeader from "@/components/App/AppSecondaryHeader";
import MeasuresDataGrid from "@/components/DataGrids/MeasuresDataGrid";

import { getTeamsWins, getAllTeamsConf } from "@/services/dataService";
import {
  getCorrInterpretation,
  pearsonCorrelation,
} from "@/services/mathService";

import * as ss from "simple-statistics";

export default {
  name: "MapIndex",
  components: {
    Map,
    AppPrimaryHeader,
    AppSecondaryHeader,
    MeasuresDataGrid,
  },
  data() {
    return {
      data: [],
      wins_conf_corr: null,
      getCorrInterpretation,
    };
  },
  methods: {
    calculateWinsStats() {
      const allStats = getTeamsWins();
      const attribute = "Won games";
      const average = ss.average(allStats).toFixed(2);
      const mean = ss.mean(allStats).toFixed(2);
      const mode = ss.mode(allStats).toFixed(2);
      const geometricMean = ss.geometricMean(allStats).toFixed(2);
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
      this.wins_conf_corr = pearsonCorrelation(
        getTeamsWins(),
        getAllTeamsConf()
      );
    },
  },
  mounted() {
    this.calculateWinsStats();
    this.calculatePearsonCorrelation();
  },
};
</script>
