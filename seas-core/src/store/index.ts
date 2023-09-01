import { createStore, ModuleTree, Store } from "vuex";
import { coreStore } from "./module/core.ts";

export interface ISeasStore {
  value: Store | null;
  modules: ModuleTree;
  add(value: object): this;
  build(): Store;
}
export class SeasStore implements ISeasStore {
  value: Store = null;

  modules: ModuleTree = {};

  add(value: ModuleTree): this {
    this.modules = Object.assign(this.modules, value);
    return this;
  }

  build(): Store {
    this.add(coreStore);
    this.value = createStore({
      modules: this.modules,
    });
    return this.value;
  }
}

export const newStore = () => new SeasStore();
