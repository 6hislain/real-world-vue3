import { createRouter, createWebHistory } from "vue-router";
import EventRegister from "../views/event/Register";
import EventDetails from "../views/event/Details";
import EventLayout from "../views/event/Layout";
import EventEdit from "../views/event/Edit";
import EventList from "../views/EventList";
import NotFound from "../views/NotFound";
import NetworkError from "../views/NetworkError";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import { GStore } from "@/store";

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
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404)
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          else return { name: "NetworkError" };
        });
    },
    children: [
      { path: "", name: "EventDetails", component: EventDetails },
      { path: "register", name: "EventRegister", component: EventRegister },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView"), // code splitting, lazy loading
  },
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
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorized = true; // should be function to check permission
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = "Sorry, you are not authorized to view this page";
    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);
    if (from.href) return false;
    else return { path: "/" };
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
