<!--suppress CssUnresolvedCustomProperty, CssUnusedSymbol -->
<script setup lang="ts">
import { NFloatButton, NIcon, NCard } from "naive-ui";
import { Aperture } from "@vicons/ionicons5";
import { ref } from "vue";
import ChatWindow from "@izhimu/seas-ai-view/src/components/ChatWindow.vue";

const showChat = ref(false);

const right = ref(-24);
</script>

<template>
  <n-card
    :bordered="false"
    :class="['chat-card', showChat ? 'chat-show' : 'chat-hide']"
    header-class="chat-title"
    title="智能助理"
    size="small"
    closable
    content-class="chat-card-content"
    @close="showChat = false"
  >
    <chat-window :background-blur="true" />
  </n-card>
  <n-float-button
    :right="right"
    :bottom="60"
    :class="['chat-button', !showChat ? 'button-show' : 'button-hide']"
    @click="showChat = !showChat"
    @mouseenter="right = 8"
    @mouseleave="right = -24"
  >
    <n-icon size="24px">
      <Aperture />
    </n-icon>
  </n-float-button>
</template>

<style scoped>
.chat-button {
  width: 48px !important;
  height: 48px;
  z-index: 4999;
  transition: all 0.3s ease-in-out;
}

.button-show {
  transform: scale(1);
}

.button-hide {
  transform: scale(0);
}

.chat-box {
  width: 500px;
  height: 700px;
  position: fixed;
  bottom: 84px;
  right: 32px;
  z-index: 5000;
}

.chat-card {
  position: fixed;
  bottom: 84px;
  right: 32px;
  z-index: 5000;
  width: 500px;
  height: 700px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  transition: transform 0.3s ease-in-out;
  background-color: transparent;
}

.chat-show {
  transform: scale(1);
  transform-origin: 476px 676px;
}

.chat-hide {
  transform: scale(0);
  transform-origin: 476px 676px;
}
</style>

<style>
.chat-card .n-card__content {
  padding: 0 !important;
}

.chat-card-content {
  width: 500px;
  height: 650px;
}

.chat-title {
  background-color: var(--base-color);
}
</style>
