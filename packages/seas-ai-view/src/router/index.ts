import { RouteRecordRaw } from "vue-router";

const aiRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "ai/chat",
      name: "ai.chat",
      component: () => import("../view/AiChat.vue"),
    },
  ];
};

export default aiRouter;
