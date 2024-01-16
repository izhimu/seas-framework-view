/* eslint-disable no-console */
import {
  createApp as create,
  type App,
  type Component,
  type Plugin,
  type Directive,
} from "vue";
import { createPinia } from "./store";
import { createRequest } from "./request";
import { createRouter } from "./router";
import SeasApp from "./App.vue";
import { debug, group, end, MASCOT } from "./utils/log";
import { version } from "../package.json";

console.log(
  "%c\n__________________ ________\n" +
    "__  ___/  _ \\  __ `/_  ___/\n" +
    "_(__  )/  __/ /_/ /_(__  )\n" +
    "/____/ \\___/\\__,_/ /____/\n\n" +
    `%c${MASCOT} seas-framework-view: v${version}\n`,
  "color:#00E5E5;",
  "color:#7F7B63;",
);

export type DirectiveFunction = { name: string; directive: Directive };

export const directives: Array<DirectiveFunction> = [];

export const addDirective = (directive: DirectiveFunction): void => {
  directives.push(directive);
};

export interface AppConfig {
  root?: Component;
  mount?: string;
  plugins?: Array<Plugin>;
  directives?: DirectiveFunction;
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
  if (appConfig?.directives) {
    directives.push(appConfig.directives);
  }
  directives.forEach((directive) => {
    app.directive(directive.name, directive.directive);
  });
  debug("loaded directives");
  end();
  return app;
};
