/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue";
import { defineStore } from "pinia";

const useAiStore = defineStore("ai", () => {
  const chatId = ref<string>("");
  return { chatId };
});

export default useAiStore;
