import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue-apexcharts";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "@/assets/styles/main.scss";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
