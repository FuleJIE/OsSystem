import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ClickOutside from "vue-click-outside";
import VCalendar from "v-calendar";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import * as VCharts from "v-charts";
Vue.use(VCharts);

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

import * as moment from "moment";
Vue.prototype.$moment = moment;

import("./helpers/rightClick");
import("./assets/css/transition.css");

Vue.config.productionTip = false;
Vue.directive("ClickOutside", ClickOutside);

Vue.component("VCalendar", VCalendar);

Vue.use(VCalendar);

Vue.use(ElementUI);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
