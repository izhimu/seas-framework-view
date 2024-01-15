import { ref, reactive } from "vue";
import { defineStore } from "pinia";

const useCommonStore = defineStore("core.common", () => {
  const name = ref<string>("Seas开发框架");
  const auth = reactive<string[]>([]);
  return { name, auth };
});

export default useCommonStore;
