import { RouteRecordRaw } from "vue-router";
import { addRootRoute, addHomeRoute } from "@izhimu/seas-mobile-core";

export const securityRootRouter = (): RouteRecordRaw[] => [
  {
    path: "/verify",
    name: "verify",
    component: () => import("../view/VerifyPage.vue"),
  },
];

export const securityHomeRouter = (): RouteRecordRaw[] => [];

addRootRoute(securityRootRouter());
addHomeRoute(securityHomeRouter());
