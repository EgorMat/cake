import  Vue from 'vue';
import Vuex from 'vuex';
import cake from './modules/cake.js';

Vue.use(Vuex);
 const store =  new Vuex.Store({
  modules: {
   cake
  },
  strict : true,
})


export default store;
