import { Store } from "vuex";
import {
  RouteLocationNormalized,
  RouteRecordName,
  RouteRecordRaw,
} from "vue-router";

export const securityRootRouter = (): RouteRecordRaw[] => [
  {
    path: "/login",
    name: "login",
    component: () => import("../view/LoginPage.vue"),
  },
];

export const securityHomeRouter = (): RouteRecordRaw[] => [
  {
    path: "/403",
    name: "403",
    component: () => import("../view/403Page.vue"),
  },
];

export const securityPermit = ["login", "403"];

export const securityHandler =
  (store: Store, allPermit: Array<RouteRecordName | null | undefined>) =>
  (to: RouteLocationNormalized) => {
    if (to.name === "login" && store.state.security.loginUser) {
      return "/";
    }
    if (to.name !== "login" && !store.state.security.loginUser) {
      return "/login";
    }
    if (
      allPermit.indexOf(to.name) === -1 &&
      store.state.security.authComponents.indexOf(to.name) === -1
    ) {
      return "/403";
    }
    return true;
  };
