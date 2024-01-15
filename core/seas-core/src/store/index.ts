import { createPinia as create, Pinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const createPinia = (): Pinia => {
  const pinia = create();
  pinia.use(createPersistedState({ auto: true, storage: localStorage }));
  return pinia;
};
export { default as useCommonStore } from "./common";
export { default as useThemeStore } from "./theme";
