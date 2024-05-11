import { ref } from "vue";
import { defineStore } from "pinia";

const useCommonStore = defineStore("core.common", () => {
  const name = ref<string>("Seas开发框架");
  const auth = ref<string[]>([]);
  const menu = ref<string[]>([]);
  const currentRoute = ref<string>("");
  const resetAuth = () => {
    auth.value = [];
    menu.value = [];
  };
  return { name, auth, menu, currentRoute, resetAuth };
});

export default useCommonStore;
