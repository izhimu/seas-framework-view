import { createPinia, Pinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export default (): Pinia => {
  const pinia = createPinia();
  pinia.use(createPersistedState({ auto: true, storage: localStorage }));
  return pinia;
};
