import { RouteRecordRaw } from "vue-router";
import { addHomeRoute, addPermit, setHomeComponent } from "@izhimu/seas-core";

export const baseHomePage = () => () => import("../view/HomePage.vue");
export const baseIndexPage = () => () => import("../view/IndexPage.vue");

export const baseRouter = (index = baseIndexPage()): RouteRecordRaw[] => {
  return [
    {
      path: "index",
      name: "index",
      component: index,
    },
    {
      path: "system/role",
      name: "system.role",
      component: () => import("../view/RolePage.vue"),
    },
    {
      path: "system/user",
      name: "system.user",
      component: () => import("../view/UserPage.vue"),
    },
    {
      path: "system/org",
      name: "system.org",
      component: () => import("../view/OrgPage.vue"),
    },
    {
      path: "system/dict",
      name: "system.dict",
      component: () => import("../view/DictPage.vue"),
    },
    {
      path: "system/menu",
      name: "system.menu",
      component: () => import("../view/MenuPage.vue"),
    },
    {
      path: "system/conf",
      name: "system.conf",
      component: () => import("../view/ConfPage.vue"),
    },
    {
      path: "log/login/log",
      name: "log.login.log",
      component: () => import("../view/LoginLogPage.vue"),
    },
    {
      path: "log/log",
      name: "log.log",
      component: () => import("../view/LogPage.vue"),
    },
  ];
};

export const basePermit = ["index"];

addPermit(basePermit);
addHomeRoute(baseRouter());
setHomeComponent(baseHomePage());
