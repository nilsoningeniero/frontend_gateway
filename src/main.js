import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import axios from "axios";
import store from './store';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsc29uLXMiLCJhIjoiY2xkNmJidGNtMGY4cDNyc2RnNDhndG5pbyJ9.-KUDlICF54BXHDAy9nFv_Q';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(axios);

if(! navigator.geolocation) {
  alert('Tú navegador no soporta el Geolocation');
  throw new Error('Tú navegador no soporta el Geolocation')
}

axios.defaults.baseURL='http://localhost:8000';

store.dispatch("getUsuario");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
