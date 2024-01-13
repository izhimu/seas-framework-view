import { RouteRecordRaw } from "vue-router";

const healthyRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "healthy/os",
      name: "healthy.os",
      component: () => import("../view/OsPage.vue"),
    },
  ];
};

export default healthyRouter;
