import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store/index.js';
// import routes from './routes.js';
import * as firebase from "firebase";
import * as firestore from "firebase/firestore"

import * as VueGL from "vue-gl";

Object.keys(VueGL).forEach(name => {
    Vue.component(name, VueGL[name]);
});

Vue.use(VueRouter);
Vue.config.productionTip = false


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCE1P3sxVCMQ0ZEybCbwfoYi4Zb4sjCXZo",
    authDomain: "cake-777a8.firebaseapp.com",
    databaseURL: "https://cake-777a8.firebaseio.com",
    projectId: "cake-777a8",
    storageBucket: "cake-777a8.appspot.com",
    messagingSenderId: "858160831729"
  };
  firebase.initializeApp(config);





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

export const storage = firebase.storage();
