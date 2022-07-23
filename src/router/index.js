import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventDetails from "../views/EventDetails.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  { path: "/", name: "EventList", component: EventList },
  {
    props: true,
    path: "/event/:id",
    name: "EventDetails",
    component: EventDetails,
  },
  { path: "/about", name: "About", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
