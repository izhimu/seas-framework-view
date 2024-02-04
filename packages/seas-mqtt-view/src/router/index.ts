import { RouteRecordRaw } from "vue-router";

const mqttRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "mqtt/user",
      name: "mqtt.user",
      component: () => import("../view/MqtUserPage.vue"),
    },
  ];
};

export default mqttRouter;
