/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue";
import { defineStore } from "pinia";

export type TabItem = {
  key: string;
  name: string;
};

const useMenuStore = defineStore("base.menu", () => {
  const active = ref<any>(null);
  const tabs = ref<TabItem[]>([]);
  return { active, tabs };
});

export default useMenuStore;
