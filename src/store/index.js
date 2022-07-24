import { createStore } from "vuex";
import { reactive } from "vue";

export default createStore({
  state: { user: "6hislain" },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});

export const GStore = reactive({ flashMessage: "", event: null });
