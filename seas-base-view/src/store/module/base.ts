import { ModuleTree } from "vuex";

export interface LogoConfig {
  icon: boolean;
  iconSrc: string;
  iconSize: string;
  title: string | null;
  titleWidth: string;
}

export interface BaseState {
  logoConfig: LogoConfig | null;
}

export const baseStore: ModuleTree<BaseState> = {
  base: {
    state: {
      logoConfig: {
        icon: true,
        iconSrc: "/img/logo.png",
        iconSize: "32",
        titleWidth: "284px",
      },
    },
    mutations: {
      setLogoConfig(state, config) {
        state.logoConfig = config;
      },
    },
  },
};
