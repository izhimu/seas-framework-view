import {
  RouteLocationNormalized,
  RouteRecordName,
  RouteRecordRaw,
} from "vue-router";
import {
  useCommonStore,
  addPermit,
  addRootRoute,
  addHomeRoute,
  addBeforeEach,
  permits,
} from "@izhimu/seas-core";
import { useUserStore } from "../store";

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
  (allPermit?: Array<RouteRecordName | null | undefined>) =>
  (to: RouteLocationNormalized) => {
    const userStore = useUserStore();
    const commonStore = useCommonStore();
    if (to.name === "login" && userStore.isLogin()) {
      return "/";
    }
    if (permits.indexOf(to.name) >= 0) {
      return true;
    }
    if (to.name !== "login" && !userStore.isLogin()) {
      return "/login";
    }
    if (allPermit) {
      permits.push(...allPermit);
    }
    if (
      permits.indexOf(to.name) === -1 &&
      to.name &&
      commonStore.menu.indexOf(to.name.toString()) === -1
    ) {
      return "/403";
    }
    return true;
  };

addPermit(securityPermit);
addRootRoute(securityRootRouter());
addHomeRoute(securityHomeRouter());
addBeforeEach(securityHandler());
