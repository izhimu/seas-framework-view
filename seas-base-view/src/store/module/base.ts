import { ModuleTree } from "vuex";

export interface LogoConfig {
  icon: boolean;
  iconSrc: string;
  iconSize: string;
  iconStyle: object;
  title: string | null;
  titleStyle: object;
}

export interface HomeConfig {
  menuCollapsed: boolean;
}

export interface BaseState {
  logoConfig: LogoConfig | null;
  homeConfig: HomeConfig | null;
}

export const baseStore: ModuleTree<BaseState> = {
  base: {
    state: {
      logoConfig: {
        icon: true,
        iconSrc: "/img/logo.png",
        iconSize: "32",
        iconStyle: { margin: "16px" },
        titleStyle: { width: "284px" },
      },
      homeConfig: {
        menuCollapsed: true,
      },
    },
    mutations: {
      setLogoConfig(state, config) {
        Object.assign(state.logoConfig, config);
      },
      setHomeConfig(state, config) {
        Object.assign(state.homeConfig, config);
      },
    },
  },
};
