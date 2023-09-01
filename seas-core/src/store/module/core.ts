import { ModuleTree } from "vuex";
import { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";

export interface CoreStore {
  theme: BuiltInGlobalTheme | null;
  authComponents: string[];
}

export const coreStore: ModuleTree<CoreStore> = {
  core: {
    state: {
      theme: null,
    },
    mutations: {
      switchTheme(state, theme) {
        state.theme = theme;
      },
    },
  },
};
