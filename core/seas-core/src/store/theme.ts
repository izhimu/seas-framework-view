import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { lightTheme, darkTheme } from "naive-ui";

const useThemeStore = defineStore("core.theme", () => {
  const themeRef = ref<"light" | "dark">("light");
  const theme = computed(() =>
    themeRef.value === "light" ? lightTheme : darkTheme,
  );
  const dark = () => {
    themeRef.value = "dark";
  };
  const light = () => {
    themeRef.value = "light";
  };
  const isDark = () => {
    return themeRef.value === "dark";
  };
  const toggle = () => {
    themeRef.value = isDark() ? "light" : "dark";
  };
  return { themeRef, theme, light, dark, isDark, toggle };
});

export default useThemeStore;
