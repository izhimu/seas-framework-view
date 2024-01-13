import { App, Component, createApp as create, Plugin } from "vue";
import { Store } from "vuex";
import CoreApp from "./App.vue";

export interface ISeasApp {
  innerApp: App;

  authDirective(codeList: string[], name: string): this;

  use(plugin: Plugin): this;

  mount(root: string): this;

  icon(...funcs: Array<() => void>): this;

  app(): App;
}

export class SeasApp implements ISeasApp {
  innerApp: App;

  constructor(appComponent: Component = CoreApp) {
    this.innerApp = create(appComponent);
  }

  authDirective(store: Store<any>, name = "auth"): this {
    this.innerApp?.directive(name, {
      mounted(el, binding) {
        if (
          store.state?.security?.authComponents?.indexOf(binding.value) === -1
        ) {
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

  mount(root = "#app"): this {
    this.innerApp.mount(root);
    return this;
  }

  icon(...funcs): this {
    funcs.forEach((func) => {
      func();
    });
    return this;
  }

  app(): App {
    return this.innerApp;
  }
}

export const newApp = (appComponent: Component = CoreApp) =>
  new SeasApp(appComponent);
