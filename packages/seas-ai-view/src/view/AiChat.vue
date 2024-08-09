<script setup lang="ts">
import { useUserStore } from "@izhimu/seas-security-view";
import ChatWindow from "../components/ChatWindow.vue";

const userStore = useUserStore();

const source = new EventSource(
  `/api/sse?X-Auth-Token=${userStore.current.token}`,
);
source.onmessage = (event) => {
  console.log(event);
};
</script>

<template>
  <div class="test">
    <chat-window />
  </div>
</template>

<style scoped>
.test {
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
