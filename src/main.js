import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import ApexCharts library
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
// import ApexChart component globally
Vue.component("apexchart", VueApexCharts);

//FontAwesome
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
