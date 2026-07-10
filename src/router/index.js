import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/aboutme",
    name: "aboutme",
    component: () => import("../views/AboutMe.vue"),
  },
  {
    path: "/grade",
    name: "grade",
    component: () => import("../views/GradeExecute.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("../views/Shop.vue"),
  },
  {
    path: "/shop/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetail.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
