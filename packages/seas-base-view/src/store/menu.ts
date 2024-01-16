import { ref } from "vue";
import { defineStore } from "pinia";

const useMenuStore = defineStore("base.menu", () => {
  const active = ref<unknown>(null);
  return { active };
});

export default useMenuStore;
