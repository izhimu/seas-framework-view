import { RouteRecordRaw } from "vue-router";

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
