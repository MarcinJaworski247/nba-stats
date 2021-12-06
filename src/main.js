import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import ApexCharts library
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
// import ApexChart component globally
Vue.component("apexchart", VueApexCharts);

//FontAwesome
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// devextreme styles
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

// my styles
import "@/assets/styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
