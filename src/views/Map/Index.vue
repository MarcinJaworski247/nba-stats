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
  getMeasuresOfDistribution,
} from "@/services/mathService";

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
    calculatePearsonCorrelation() {
      this.wins_conf_corr = pearsonCorrelation(
        getTeamsWins(),
        getAllTeamsConf()
      );
    },
  },
  mounted() {
    const gamesMeasures = getMeasuresOfDistribution("Won games");
    this.data.push(gamesMeasures);
    this.calculatePearsonCorrelation();
  },
};
</script>
