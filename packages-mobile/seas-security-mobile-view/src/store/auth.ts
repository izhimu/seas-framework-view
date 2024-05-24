import { ref } from "vue";
import { defineStore } from "pinia";

const useAuthStore = defineStore("security.auth", () => {
  const menus = ref<string[]>([]);
  const token = ref<string>("");
  return { menus, token };
});

export default useAuthStore;
