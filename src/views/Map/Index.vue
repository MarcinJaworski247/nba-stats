<template>
  <div>
    <app-header
      text="Ilość wygranych meczów drużyn i ich przynależność do konferencji"
    />
    <div class="legend">
      <div class="color blue"></div>
      Konferencja wschodnia
    </div>
    <div class="legend">
      <div class="color red"></div>
      Konferencja zachodnia
    </div>
    <div>
      <Map />
    </div>
    <div class="mt-3">
      <app-header text="Miary rozkładu" class="mb-2" />
      <dx-data-grid
        :data-source="data"
        :show-borders="true"
        :wordWrapEnabled="true"
      >
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Atrybut"
          data-field="attribute"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Ilość rekordów"
          data-field="quantity"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Średnia arytmetyczna"
          data-field="average"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Średnia geometryczna"
          data-field="geometricMean"
        />
        <!-- <dx-column caption="Średnia harmoniczna" data-field="quantity" /> -->
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Średnia kwadratowa"
          data-field="rootMeanSquare"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Mediana"
          data-field="mean"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Mode"
          data-field="mode"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Kwantyl .25"
          data-field="q1"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Kwantyl .75"
          data-field="q3"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Odchylenie standardowe"
          data-field="stdv"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Wariancja"
          data-field="variance"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Rozstęp międzykwartylowy"
          data-field="iqr"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Odchylenie przeciętne"
          data-field="meanAbsoluteDeviation"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Odchylenie kwartylne"
          data-field="quarterDeviation"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Współczynnik zmienności"
          data-field="coefficientOfVariation"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Kurtoza"
          data-field="kurtosis"
        />
        <dx-column
          :allow-sorting="false"
          alignment="center"
          caption="Współczynnik skośności"
          data-field="skewness"
        />
      </dx-data-grid>
    </div>
    <div class="mt-3">
      <app-header
        text="Współczynnik korelacji liniowej Pearsona"
        class="mb-2"
      />
      <div class="caption mb-2">
        Wsp. korelacji pomiędzy ilością wygranych meczów a przynależnością do
        danej konferencji:
        <strong>{{ wins_conf_corr }}</strong> ({{
          getCorrInterpretation(wins_conf_corr)
        }})
      </div>
    </div>
  </div>
</template>
<script>
// components
import Map from "@/components/Charts/Map";
import AppHeader from "@/components/App/AppHeader";

// DevExtreme
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

// service
import { getTeamsWins, getAllTeamsConf } from "@/services/dataService";
import {
  getCorrInterpretation,
  pearsonCorrelation,
} from "@/services/mathService";

// simple satistics
import * as ss from "simple-statistics";

export default {
  name: "MapIndex",
  components: {
    Map,
    AppHeader,
    DxDataGrid,
    DxColumn,
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
      const attribute = "Wygrane mecze";
      const average = ss.average(allStats).toFixed(2);
      const mean = ss.mean(allStats).toFixed(2);
      const mode = ss.mode(allStats).toFixed(2);
      const geometricMean = ss.geometricMean(allStats).toFixed(2);
      // const harmonicMean = ss.harmonicMean(allStats);
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
      // const giniCoefficient
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
