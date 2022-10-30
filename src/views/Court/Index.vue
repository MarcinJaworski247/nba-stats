<template>
  <div>
    <app-primary-header
      text="Rebounds averages by position and league leaders"
    />
    <div class="mt-5">
      <court />
    </div>
    <div class="mt-10">
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
import {
  getAllPlayersRb,
  getAllPlayersPositions,
} from "@/services/dataService";

import {
  getCorrInterpretation,
  pearsonCorrelation,
  getMeasuresOfDistribution,
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
  },
  mounted() {
    this.calculatePearsonCorrelation();
    const reboundsMeasures = getMeasuresOfDistribution("RB");
    this.data.push(reboundsMeasures);
  },
};
</script>
