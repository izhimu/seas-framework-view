import { createPinia, Pinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const createSeasPinia = (): Pinia => {
  const pinia = createPinia();
  pinia.use(createPersistedState({ auto: true, storage: localStorage }));
  return pinia;
};
export { default as useCommonStore } from "./common";
export { default as useThemeStore } from "./theme";
