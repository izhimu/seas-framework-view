import { RouteRecordRaw } from "vue-router";

const generateRouter = (): RouteRecordRaw[] => {
  return [
    {
      path: "generate/info",
      name: "generate.info",
      component: () => import("../view/InfoPage.vue"),
    },
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

export default generateRouter;
