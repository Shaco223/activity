import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import flexiable from "@/lib/flexiable";
import request from "./lib/Request";
import "@/styles/index.scss"; // global css
import { Image as VanImage } from 'vant';

Vue.config.productionTip = false


Vue.use(flexiable);
Vue.use(request);
Vue.use(VanImage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
