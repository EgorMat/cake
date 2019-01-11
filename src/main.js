import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store/index.js';
// import routes from './routes.js';
import * as firebase from "firebase";
import * as firestore from "firebase/firestore"
import * as THREE from 'three';
import * as VueGL from "vue-gl";

Object.keys(VueGL).forEach(name => {
    Vue.component(name, VueGL[name]);
});

Vue.use(VueRouter);
Vue.config.productionTip = false








// const router  = new VueRouter({
//   mode: 'history',
//   routes
// })



new Vue({
  el: '#app',
  store,
  // router,
  render: h => h(App)
})
