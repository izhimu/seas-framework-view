import { ref } from "vue";
import { defineStore } from "pinia";
import { type GlobalTheme, darkTheme } from "naive-ui";

const useThemeStore = defineStore("core.theme", () => {
  const theme = ref<GlobalTheme | null>(null);
  const dark = () => {
    theme.value = darkTheme;
  };
  const light = () => {
    theme.value = null;
  };
  const toggle = () => {
    theme.value = theme.value ? null : darkTheme;
  };
  return { theme, light, dark, toggle };
});

export default useThemeStore;
