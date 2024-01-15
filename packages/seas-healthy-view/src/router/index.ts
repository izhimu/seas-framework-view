import { RouteRecordRaw } from "vue-router";
import { addHomeRoute } from "@izhimu/seas-core";

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

addHomeRoute(healthyRouter());
