import { RouteRecordRaw } from "vue-router";
import healthyInitIcon from "../style/healthy.ts";

const healthyRouter = (): RouteRecordRaw[] => {
  healthyInitIcon();
  return [
    {
      path: "healthy/os",
      name: "healthy.os",
      component: () => import("../view/OsPage.vue"),
    },
  ];
};

export default healthyRouter;
