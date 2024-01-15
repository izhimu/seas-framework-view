import {
  createRouter as create,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordName,
  RouteRecordRaw,
} from "vue-router";
import { Component } from "vue";
import event from "../event";

export type BeforeEachFunc = (to: RouteLocationNormalized) => string | boolean;

export type PermitNames = Array<RouteRecordName | null | undefined>;

export interface RouterConfig {
  redirect?: string;
  roots?: RouteRecordRaw[];
  homes?: RouteRecordRaw[];
  homeComponent?: Component;
  beforeEachFunctions?: BeforeEachFunc[];
}

const roots: RouteRecordRaw[] = [];
const homes: RouteRecordRaw[] = [];
const beforeEachFunctions: BeforeEachFunc[] = [];
let homeComponent: Component = {};

export const permits: PermitNames = [];

export const addPermit = (permit: string[]): void => {
  permits.push(...permit);
};

export const addRootRoute = (root: RouteRecordRaw[]): void => {
  roots.push(...root);
};

export const addHomeRoute = (home: RouteRecordRaw[]): void => {
  homes.push(...home);
};

export const addBeforeEach = (beforeEach: BeforeEachFunc): void => {
  beforeEachFunctions.push(beforeEach);
};

export const setHomeComponent = (component: Component): void => {
  homeComponent = component;
};

export const createRouter = (routerConfig?: RouterConfig): Router => {
  const router = create({
    history: createWebHistory(),
    routes: [
      ...roots,
      ...(routerConfig?.roots ?? []),
      {
        path: "/",
        name: "home",
        redirect: routerConfig?.redirect ?? "/index",
        component: routerConfig?.homeComponent ?? homeComponent,
        children: [
          {
            path: "404",
            name: "404",
            component: () => import("../view/404Page.vue"),
          },
          ...homes,
          ...(routerConfig?.homes ?? []),
        ],
      },
    ],
  });

  const allPage: Array<RouteRecordName | null | undefined> = router
    .getRoutes()
    .flatMap((v) => v.name);
  router.beforeEach((to) => {
    if (allPage.indexOf(to.name) === -1) {
      return "/404";
    }
    beforeEachFunctions.push(...(routerConfig?.beforeEachFunctions ?? []));
    // eslint-disable-next-line no-restricted-syntax
    for (const beforeEachFunc of beforeEachFunctions) {
      const result = beforeEachFunc(to);
      if (result !== true) {
        return result;
      }
    }
    event.emit("routerChange", to.name);
    return true;
  });
  return router;
};

export const corePermit = ["home", "404"];

addPermit(corePermit);
