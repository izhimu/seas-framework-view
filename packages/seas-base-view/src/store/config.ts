import { reactive } from "vue";
import { defineStore } from "pinia";

export interface LogoConfig {
  icon: boolean;
  iconSrc: string;
  iconSize: string;
  iconStyle: object;
  title: string;
  titleStyle: object;
}

export interface HomeConfig {
  menuCollapsed: boolean;
}

export const dLogoConfig = (): LogoConfig => ({
  icon: true,
  iconSrc: "/img/logo.png",
  iconSize: "32",
  iconStyle: { margin: "16px" },
  title: "",
  titleStyle: { width: "284px" },
});

export const dHomeConfig = (): HomeConfig => ({
  menuCollapsed: false,
});

export const useConfigStore = defineStore("base.config", () => {
  const logo = reactive<LogoConfig>(dLogoConfig());
  const home = reactive<HomeConfig>(dHomeConfig());
  return { logo, home };
});
