<script setup lang="ts">
import {
  NInput,
  NButton,
  NInputGroup,
  NUpload,
  NScrollbar,
  NSpin,
} from "naive-ui";
import { onMounted, ref, nextTick } from "vue";
import { AiHistory } from "../entity/aiHistory";
import { list } from "../request/aiHistory";
import { useAiStore } from "../store";
import MarkdownRender from "./MarkdownRender.vue";

const aiStore = useAiStore();
aiStore.chatId = "1821089654937919488";
const messages = ref<AiHistory[]>([]);

const paddingHeight = ref(0);
const compensateHeight = ref(0);
const resizeObserver = new ResizeObserver((entries) => {
  if (entries && paddingHeight.value === 0) {
    const entry = entries[0];
    compensateHeight.value = entry.target.clientHeight;
  }
});

const scrollRef = ref();
const chatRef = ref();

onMounted(() => {
  list(aiStore.chatId).then((res) => {
    if (res.data) {
      messages.value = res.data;
      nextTick(() => {
        chatRef.value?.scrollIntoView({ behavior: "smooth", block: "end" });
      });
      if (res.data.length === 0) {
        paddingHeight.value =
          Number(
            scrollRef.value?.scrollbarInstRef.yBarSizePx.replace("px", ""),
          ) - 32;
        compensateHeight.value = paddingHeight.value;
      } else {
        paddingHeight.value = 0;
      }
    }
  });
  const element = document.querySelector(".input-container");
  if (element) {
    resizeObserver.observe(element);
  }
});
</script>

<template>
  <n-scrollbar ref="scrollRef">
    <div ref="chatRef" class="chat-window">
      <div class="chat-container">
        <div v-for="message in messages" :key="message.id" class="chat-item">
          <div
            :class="[
              message.role === 'USER' ? 'chat-right' : 'chat-left',
              'chat-content',
            ]"
          >
            <markdown-render :content="message.messageStr" />
          </div>
        </div>
        <div class="chat-item">
          <div :class="['chat-left', 'chat-content']">
            <div class="dot-flashing"></div>
          </div>
        </div>
        <div :style="{ height: compensateHeight + 'px' }"></div>
      </div>
      <div class="input-container">
        <n-upload class="input-file">
          <n-button size="small" type="info" tertiary round>上传附件</n-button>
        </n-upload>
        <n-input-group>
          <n-input size="large" round clearable />
          <n-button type="info" size="large" round>发送</n-button>
        </n-input-group>
      </div>
    </div>
  </n-scrollbar>
</template>

<style scoped>
.chat-window {
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  /*noinspection CssUnresolvedCustomProperty*/
  background-color: var(--action-color);
}

.chat-container {
  flex: 1;
}

.chat-item {
  margin-bottom: 16px;
  display: inline-block;
  width: 100%;
}

.chat-content {
  padding: 10px 16px;
  border-radius: 16px;
  /*noinspection CssUnresolvedCustomProperty*/
  background-color: var(--base-color);
  max-width: calc(100% - 32px);
}

/*noinspection ALL*/
.chat-right {
  border-top-right-radius: unset;
  float: right;
  /*noinspection CssUnresolvedCustomProperty*/
  background-color: var(--primary-color-hover);
  color: #fff;
}

/*noinspection ALL*/
.chat-left {
  border-top-left-radius: unset;
  float: left;
}

.input-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px;
  border-radius: 16px;
  position: absolute;
  bottom: 14px;
  width: calc(100% - 64px);
  /*noinspection CssUnresolvedCustomProperty*/
  background-color: color-mix(
    in srgb,
    var(--base-color),
    rgb(255, 255, 255, 0.2)
  );
  /*noinspection CssUnresolvedCustomProperty*/
  box-shadow: var(--box-shadow-1);
  backdrop-filter: blur(24px);
}

.input-file {
  margin-bottom: 8px;
}

.dot-flashing {
  margin: 8px 48px;
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: var(--primary-color);
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before {
  left: -14px;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: var(--primary-color);
}

.dot-flashing::after {
  left: 14px;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: var(--primary-color);
}

@keyframes dotFlashing {
  0% {
    background-color: var(--primary-color);
  }
  100% {
    background-color: var(--base-color);
  }
}
</style>
