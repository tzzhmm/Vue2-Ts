import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/aboutSec",
    name: "AboutSec",
    component: () =>
      import("../views/AboutSec.vue")
  },
  {
    path: "/newpage",
    name: "NewPage",
    component: () =>
      import("../views/new-pages.vue")
  },
  {
    path: '/serve/:myRouterParams',
    name: 'Serve',
    component: () => 
      import("../views/serve.vue")
  },
  {
    path: '/routerQuery',
    name: 'RouterQuery',
    component: () => 
      import("../views/routerQuery.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
