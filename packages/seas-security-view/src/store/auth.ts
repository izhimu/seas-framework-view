import { ref } from "vue";
import { defineStore } from "pinia";

const useAuthStore = defineStore("security.auth", () => {
  const menus = ref<string[]>([]);
  return { menus };
});

export default useAuthStore;
