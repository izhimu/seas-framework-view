import { RouteRecordRaw } from "vue-router";
import { addHomeRoute } from "@izhimu/seas-core";

const jobRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "job/timer",
      name: "job.timer",
      component: () => import("../view/TimerPage.vue"),
    },
  ];
};

export default jobRouter;

addHomeRoute(jobRouter());
