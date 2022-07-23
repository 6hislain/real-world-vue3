import { createRouter, createWebHistory } from "vue-router";
import EventRegister from "../views/event/Register";
import EventDetails from "../views/event/Details";
import EventLayout from "../views/event/Layout";
import EventEdit from "../views/event/Edit";
import EventList from "../views/EventList";
import AboutView from "../views/AboutView";
import NotFound from "../views/NotFound";
import NetworkError from "../views/NetworkError";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    props: true,
    path: "/events/:id",
    name: "EventLayout",
    component: EventLayout,
    children: [
      { path: "", name: "EventDetails", component: EventDetails },
      { path: "edit", name: "EventEdit", component: EventEdit },
      { path: "register", name: "EventRegister", component: EventRegister },
    ],
  },
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
    },
  },
  { path: "/about", name: "About", component: AboutView },
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  { path: "/network-error", name: "NetworkError", component: NetworkError },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
