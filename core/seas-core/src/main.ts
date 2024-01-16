/* eslint-disable no-console */
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
import { debug, group, end, MASCOT } from "./utils/log";
import { version } from "../package.json";

console.log(
  "%c__________________ ________\n" +
    "__  ___/  _ \\  __ `/_  ___/\n" +
    "_(__  )/  __/ /_/ /_(__  )\n" +
    "/____/ \\___/\\__,_/ /____/\n\n" +
    `%c${MASCOT} seas-framework-view: v${version}\n\n`,
  "color:#00E5E5;",
  "color:#7F7B63;",
);

export interface AppConfig {
  root?: Component;
  mount?: string;
  plugins?: Array<Plugin>;
  authDirectiveName?: string;
  autoRegisterPlugin?: boolean;
}

export const createApp = (appConfig?: AppConfig): App => {
  group("create app start");
  const app: App = create(appConfig?.root ?? SeasApp);
  // 插件注册
  if (appConfig?.plugins && appConfig.plugins.length > 0) {
    appConfig.plugins.forEach((plugin) => {
      app.use(plugin);
    });
  } else if (appConfig?.autoRegisterPlugin ?? true) {
    createRequest();
    debug("auto loaded axios");
    app.use(createPinia());
    debug("auto loaded pinia");
    app.use(createRouter());
    debug("auto loaded router");
  }
  debug("loaded all plugins");
  app.mount(appConfig?.mount ?? "#app");
  debug("mounted");
  // 权限指令
  const commonStore = useCommonStore();
  app.directive(appConfig?.authDirectiveName ?? "auth", (el, binding) => {
    if (commonStore.auth.indexOf(binding.value) === -1) {
      el.remove();
    }
  });
  debug("loaded auth directive");
  end();
  return app;
};
