import { ModuleTree } from "vuex";
import { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";

export interface CoreStore {
  theme: BuiltInGlobalTheme | null;
  appName: string;
}

export const coreStore: ModuleTree<CoreStore> = {
  core: {
    state: {
      theme: null,
      appName: "Seas开发框架",
    },
    mutations: {
      switchTheme(state, theme) {
        state.theme = theme;
      },
      setAppName(state, appName) {
        state.appName = appName;
      },
    },
  },
};
