import { App, Component, createApp as create, Plugin } from "vue";
import CoreApp from "./App.vue";

export interface ISeasApp {
  innerApp: App;

  authDirective(codeList: string[], name: string): this;

  use(plugin: Plugin): this;

  mount(root: string): App;
}

export class SeasApp implements ISeasApp {
  innerApp: App;

  constructor(appComponent: Component = CoreApp) {
    this.innerApp = create(appComponent);
  }

  authDirective(codeList: string[], name = "auth"): this {
    this.innerApp?.directive(name, {
      mounted(el, binding) {
        if (codeList.indexOf(binding.value) === -1) {
          el.remove();
        }
      },
    });
    return this;
  }

  use(plugin: Plugin): this {
    this.innerApp.use(plugin);
    return this;
  }

  mount(root = "#app"): App {
    this.innerApp.mount(root);
    return this.innerApp;
  }
}

export const newApp = (appComponent: Component = CoreApp) =>
  new SeasApp(appComponent);
