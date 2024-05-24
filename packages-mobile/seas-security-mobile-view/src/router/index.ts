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
} from "@izhimu/seas-mobile-core";
import { useAuthStore } from "../store";

export const securityRootRouter = (): RouteRecordRaw[] => [
  {
    path: "/test",
    name: "test",
    component: () => import("../view/TestPage.vue"),
  },
  {
    path: "/verify",
    name: "verify",
    component: () => import("../view/VerifyPage.vue"),
  },
];

export const securityPermit = ["verify", "test"];

export const securityHomeRouter = (): RouteRecordRaw[] => [];

export const securityHandler =
  (allPermit?: Array<RouteRecordName | null | undefined>) =>
  (to: RouteLocationNormalized) => {
    const authStore = useAuthStore();
    if (to.query.token) {
      authStore.token = to.query.token as string;
    }
    if (allPermit) {
      permits.push(...allPermit);
    }
    if (permits.indexOf(to.name) >= 0) {
      return true;
    }
    if (!authStore.token) {
      return "/404";
    }
    const commonStore = useCommonStore();
    if (
      permits.indexOf(to.name) === -1 &&
      to.name &&
      commonStore.menu.indexOf(to.name.toString()) === -1
    ) {
      return "/404";
    }
    return true;
  };

addPermit(securityPermit);
addRootRoute(securityRootRouter());
addHomeRoute(securityHomeRouter());
addBeforeEach(securityHandler());
