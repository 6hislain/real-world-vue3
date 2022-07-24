import { createStore } from "vuex";
import { reactive } from "vue";
import EventService from "@/services/EventService";

export default createStore({
  state: { user: "6hislain", events: [], event: {} },
  getters: {},
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
      // .catch((error) => console.error(error));
    },
    fetchEvents({ commit }) {
      return EventService.getEvents().then((response) => {
        commit("SET_EVENTS", response.data);
      });
      // .catch((error) => throw (error));
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id);

      if (existingEvent) commit("SET_EVENT", existingEvent);
      else
        return EventService.getEvent(id).then((response) => {
          commit("SET_EVENT", response.data);
        });
      // .catch((error) => throw (error));
    },
  },
  modules: {},
});

export const GStore = reactive({ flashMessage: "", event: null });
