// import dependancies
import stores from '@/scripts/stores/stores';
import Vuex from 'vuex';
import Vue from 'vue';

// make sure vue uses vuex
Vue.use(Vuex);

// Are we not in production
const debug = process.env.NODE_ENV !== 'production'

// init a new vuestore instance
export default new Vuex.Store({
  modules: stores
})