import { RouteRecordRaw } from "vue-router";

export const baseRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "index",
      name: "index",
      component: () => import("../view/IndexPage.vue"),
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
