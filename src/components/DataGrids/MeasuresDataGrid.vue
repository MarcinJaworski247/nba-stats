<template>
  <dx-data-grid
    :data-source="data"
    :show-borders="true"
    :word-wrap-enabled="true"
    :allow-column-resizing="true"
  >
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Attribute"
      data-field="attribute"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Quantity"
      data-field="quantity"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Average"
      data-field="average"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Geometric mean"
      data-field="geometricMean"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Root mean square"
      data-field="rootMeanSquare"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Mean"
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
      caption="Q1"
      data-field="q1"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Q3"
      data-field="q3"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Stdv"
      data-field="stdv"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Variance"
      data-field="variance"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="IQR"
      data-field="iqr"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Mean absolute deviation"
      data-field="meanAbsoluteDeviation"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Quarter deviation"
      data-field="quarterDeviation"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Coefficient of variation"
      data-field="coefficientOfVariation"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Kurtosis"
      data-field="kurtosis"
    />
    <dx-column
      :allow-sorting="false"
      alignment="center"
      caption="Skewness"
      data-field="skewness"
    />
  </dx-data-grid>
</template>
<script>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

export default {
  name: "ReboundsDataGrid",
  components: {
    DxDataGrid,
    DxColumn,
  },
  props: {
    data: {
      type: Array,
      required: false,
    },
  },
};
</script>
