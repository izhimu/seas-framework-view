import {
  createApp as create,
  type App,
  type Component,
  type Plugin,
} from "vue";
import { createPinia, useCommonStore } from "./store";
import { createRequest } from "./request";
import { createRouter } from "./router";
import SeasApp from "./App.vue";

export interface AppConfig {
  root?: Component;
  mount?: string;
  plugins?: Array<Plugin>;
  authDirectiveName?: string;
  autoRegisterPlugin?: boolean;
}

export const createApp = (appConfig?: AppConfig): App => {
  const app: App = create(appConfig?.root ?? SeasApp);
  // 插件注册
  if (appConfig?.plugins && appConfig.plugins.length > 0) {
    appConfig.plugins.forEach((plugin) => {
      app.use(plugin);
    });
  } else if (appConfig?.autoRegisterPlugin ?? true) {
    createRequest();
    app.use(createPinia());
    app.use(createRouter());
  }
  app.mount(appConfig?.mount ?? "#app");
  // 权限指令
  const commonStore = useCommonStore();
  app.directive(appConfig?.authDirectiveName ?? "auth", (el, binding) => {
    if (commonStore.auth.indexOf(binding.value) === -1) {
      el.remove();
    }
  });
  return app;
};
