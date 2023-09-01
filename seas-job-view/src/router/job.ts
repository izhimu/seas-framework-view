import { RouteRecordRaw } from "vue-router";
import jobInitIcon from "../style/job.ts";

const jobRouter = (): RouteRecordRaw[] => {
  jobInitIcon();
  return [
    {
      path: "job/timer",
      name: "job.timer",
      component: () => import("../view/TimerPage.vue"),
    },
  ];
};

export default jobRouter;
