import { RouteRecordRaw } from "vue-router";

const healthyRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "generate/datasource",
      name: "generate.datasource",
      component: () => import("../view/DatasourcePage.vue"),
    },
    {
      path: "generate/template",
      name: "generate.template",
      component: () => import("../view/TemplatePage.vue"),
    },
  ];
};

export default healthyRouter;
