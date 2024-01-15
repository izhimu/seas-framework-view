import { App, Component, createApp as create, Plugin } from "vue";
import { useCommonStore } from "./store";
import SeasApp from "./App.vue";

export interface AppConfig {
  root?: Component;
  mount?: string;
  plugins?: Array<Plugin>;
  authDirectiveName?: string;
  autoRegisterPlugin: boolean;
}

export const createApp = (appConfig?: AppConfig): App => {
  const app = create(appConfig?.root ?? SeasApp);
  if (appConfig?.plugins) {
    appConfig.plugins.forEach((plugin) => {
      app.use(plugin);
    });
  }
  app.mount(appConfig?.mount ?? "#app");
  // 权限指令
  const commonStore = useCommonStore();
  app.directive(appConfig?.authDirectiveName ?? "auth", {
    mounted(el, binding) {
      if (commonStore.auth.indexOf(binding.value) === -1) {
        el.remove();
      }
    },
  });
  return app;
};
