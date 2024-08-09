<!--suppress CssUnresolvedCustomProperty, CssUnusedSymbol -->
<script setup lang="ts">
import {
  NInput,
  NButton,
  NInputGroup,
  NUpload,
  NUploadTrigger,
  NUploadFileList,
  NScrollbar,
  NCollapseTransition,
  NFlex,
  NFloatButton,
  NIcon,
} from "naive-ui";
import { onMounted, ref, nextTick, reactive } from "vue";
import { ChevronDown } from "@vicons/ionicons5";
import { AiHistory } from "../entity/aiHistory";
import { list } from "../request/aiHistory";
import { useAiStore } from "../store";
import MarkdownRender from "./MarkdownRender.vue";
import { dAiInput } from "../entity/aiChat";
import { chat } from "../request/aiChat";

const props = withDefaults(
  defineProps<{
    backgroundBlur: boolean | null;
  }>(),
  {
    backgroundBlur: false,
  },
);

const aiStore = useAiStore();
const messages = ref<AiHistory[]>([]);

const chatRef = ref();

const toEnd = (
  behavior: "auto" | "instant" | "smooth" = "smooth",
  timeout = false,
) => {
  nextTick(() => {
    if (timeout) {
      setTimeout(() => {
        chatRef.value?.scrollIntoView({ block: "end", behavior });
      }, 300);
    } else {
      chatRef.value?.scrollIntoView({ block: "end", behavior });
    }
  });
};

const disableButton = ref(true);
const handleInputUpdate = (value: string) => {
  disableButton.value = value.trim().length === 0;
};

const loading = ref(false);
const model = reactive(dAiInput());
model.chatId = aiStore.chatId;
const handleSubmit = () => {
  if (disableButton.value) {
    return;
  }
  messages.value.push({
    id: new Date().getTime().toString(),
    chatId: model.chatId,
    sort: null,
    role: "USER",
    token: null,
    totalToken: null,
    messageStr: model.msg,
  });
  toEnd();
  loading.value = true;
  disableButton.value = true;
  toEnd("smooth", true);
  chat(model)
    .then((res) => {
      if (res.data) {
        model.chatId = res.data.chatId;
        aiStore.chatId = res.data.chatId;
        messages.value.push({
          id: new Date().getTime().toString(),
          chatId: res.data.chatId,
          sort: null,
          role: "ASSISTANT",
          token: null,
          totalToken: null,
          messageStr: res.data.msg,
        });
        toEnd("smooth", true);
      }
    })
    .finally(() => {
      loading.value = false;
      disableButton.value = false;
      model.msg = "";
    });
};

const handleReset = () => {
  aiStore.chatId = "";
  messages.value = [];
};

const loadHistory = () => {
  if (aiStore.chatId) {
    list(aiStore.chatId).then((res) => {
      if (res.data) {
        messages.value = res.data;
        toEnd("auto");
      }
    });
  }
};

const scrollRef = ref();
const compensateHeight = ref(0);
const resizeObserver = new ResizeObserver((entries) => {
  if (entries) {
    const entry = entries[0];
    compensateHeight.value = entry.target.clientHeight;
  }
});

const showBottom = ref(false);
const handleScroll = (e) => {
  showBottom.value =
    e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight > 20;
};

onMounted(() => {
  loadHistory();
  const element = document.querySelector(".input-container");
  if (element) {
    resizeObserver.observe(element);
  }
});
</script>

<template>
  <n-scrollbar
    ref="scrollRef"
    :on-scroll="handleScroll"
    :class="props.backgroundBlur ? 'chat-main-bg-blur' : 'chat-main-bg-color'"
  >
    <div ref="chatRef" class="chat-window">
      <div class="chat-container">
        <n-collapse-transition
          v-for="(message, index) in messages"
          :key="message.id"
          :show="
            message.role === 'USER' || index < messages.length - 1 || !loading
          "
        >
          <div class="chat-item">
            <div
              :class="[
                message.role === 'USER' ? 'chat-right' : 'chat-left',
                'chat-content',
              ]"
            >
              <markdown-render :content="message.messageStr" />
            </div>
          </div>
        </n-collapse-transition>
        <n-collapse-transition :show="loading">
          <div class="chat-item">
            <div :class="['chat-left', 'chat-content']">
              <div class="dot-flashing"></div>
            </div>
          </div>
        </n-collapse-transition>
        <div :style="{ height: compensateHeight + 'px' }"></div>
        <n-collapse-transition :show="showBottom">
          <n-float-button
            left="calc(50% - 20px)"
            :bottom="160"
            position="absolute"
            @click="toEnd()"
          >
            <n-icon size="22px">
              <ChevronDown />
            </n-icon>
          </n-float-button>
        </n-collapse-transition>
      </div>
      <div
        :class="[
          'input-container',
          !props.backgroundBlur
            ? 'input-container-bg-blur'
            : 'input-container-bg-color',
        ]"
      >
        <n-upload abstract class="input-file">
          <n-flex>
            <n-upload-trigger #="{ handleClick }" abstract>
              <n-button
                size="small"
                type="info"
                tertiary
                round
                @click="handleClick"
              >
                上传附件
              </n-button>
            </n-upload-trigger>
            <n-button
              size="small"
              type="error"
              tertiary
              round
              @click="handleReset"
            >
              清空会话
            </n-button>
          </n-flex>
          <n-upload-file-list class="file-list" />
        </n-upload>
        <n-input-group>
          <n-input
            v-model:value="model.msg"
            size="large"
            round
            clearable
            placeholder="输入您想说的，按Enter发送"
            @keyup.enter="handleSubmit"
            @update:value="handleInputUpdate"
          />
          <n-button
            type="info"
            size="large"
            round
            :disabled="disableButton"
            @click="handleSubmit"
            >发送
          </n-button>
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
  background-color: var(--base-color);
  max-width: calc(100% - 32px);
}

.chat-right {
  border-top-right-radius: unset;
  float: right;
  background-color: var(--info-color-suppl);
  color: #fff;
}

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
  bottom: 20px;
  width: calc(100% - 64px);
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 6px 24px 0,
    rgba(0, 0, 0, 0.08) 0 0 0 1px;
}

.input-container-bg-color {
  background-color: var(--base-color);
}

.input-container-bg-blur {
  background-color: color-mix(
    in srgb,
    var(--base-color),
    rgb(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(24px);
}

.input-file {
  margin-bottom: 8px;
}

.file-list {
  margin: 12px 0;
  width: 100%;
}

.dot-flashing {
  margin: 8px 48px;
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: var(--primary-color);
  animation: dotFlashing 0.5s infinite linear alternate;
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
  border-radius: 4px;
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
  border-radius: 4px;
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

<style>
.chat-main-bg-color {
  background-color: var(--divider-color);
}

.chat-main-bg-blur {
  background-color: color-mix(
    in srgb,
    var(--divider-color),
    rgb(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(12px);
}
</style>
