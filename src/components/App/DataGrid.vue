<template>
  <div>
    <span class="title">{{ title }}</span>
    <table style="margin-top: 16px">
      <thead>
        <tr>
          <th
            v-for="(item, index) in headers"
            :key="index"
            align="left"
            class="cell header"
            v-bind:class="{ 'wide-cell': wide }"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" class="data-row">
          <td
            v-for="(cell, index) in row"
            :key="index"
            align="left"
            class="cell"
            v-bind:class="{
              'wide-cell': wide,
              blue: cell === 'wschodnia',
              red: cell === 'zachodnia',
            }"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "DataGrid",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    wide: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style scoped>
.title {
  color: #808080;
  font-size: 1.2rem;
}
.header {
  color: #808080;
  font-weight: 400;
}
.mb-3 {
  margin-bottom: 24px;
}
.wide-cell {
  width: 200px !important;
}
.cell {
  width: 160px;
}
.blue {
  color: #7ad9ff;
}
.red {
  color: #ff7a7a;
}
.data-row:hover {
  color: orange;
}
</style>
