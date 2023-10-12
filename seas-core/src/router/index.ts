import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordName,
  RouteRecordRaw,
} from "vue-router";
import event from "../event";

export type BeforeEachFunc = (to: RouteLocationNormalized) => string | boolean;

export interface ISeasRouter {
  rootRoutes: RouteRecordRaw[];
  homeRoutes: RouteRecordRaw[];
  homePageComponent: any;
  beforeEachFuncs: BeforeEachFunc[];

  root(value: RouteRecordRaw[]): this;

  add(value: RouteRecordRaw[]): this;

  home(page: any): this;

  addBeforeEach(func: BeforeEachFunc): this;

  build(): Router;
}

export class SeasRouter implements ISeasRouter {
  static value: Router;

  rootRoutes: RouteRecordRaw[] = [];

  homeRoutes: RouteRecordRaw[] = [];

  homePageComponent: any = null;

  beforeEachFuncs: BeforeEachFunc[] = [];

  root(value: RouteRecordRaw[]): this {
    this.rootRoutes.push(...value);
    return this;
  }

  add(value: RouteRecordRaw[]): this {
    this.homeRoutes.push(...value);
    return this;
  }

  home(page: any): this {
    this.homePageComponent = page;
    return this;
  }

  addBeforeEach(func: BeforeEachFunc): this {
    this.beforeEachFuncs.push(func);
    return this;
  }

  build(redirect = "index"): Router {
    SeasRouter.value = createRouter({
      history: createWebHistory(),
      routes: [
        ...this.rootRoutes,
        {
          path: "/",
          name: "home",
          redirect,
          component: this.homePageComponent,
          children: [
            {
              path: "404",
              name: "404",
              component: () => import("../view/404Page.vue"),
            },
            ...this.homeRoutes,
          ],
        },
      ],
    });
    const allPage: Array<RouteRecordName | null | undefined> = SeasRouter.value
      .getRoutes()
      .flatMap((v) => v.name);
    SeasRouter.value.beforeEach((to) => {
      if (allPage.indexOf(to.name) === -1) {
        return "/404";
      }
      if (this.beforeEachFuncs.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const beforeEachFunc of this.beforeEachFuncs) {
          const result = beforeEachFunc(to);
          if (result !== true) {
            return result;
          }
        }
      }
      event.emit("routerChange", to.name);
      return true;
    });
    return SeasRouter.value;
  }
}

export const router = () => SeasRouter.value;

export const newRouter = () => new SeasRouter();

export const corePermit = ["home", "404"];
