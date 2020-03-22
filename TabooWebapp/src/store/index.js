import Vue from "vue";
import Vuex from "vuex";
import setup from "./setup.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    setup: setup
  }
});
