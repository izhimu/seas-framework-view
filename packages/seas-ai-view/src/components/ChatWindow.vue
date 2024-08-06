<script setup lang="ts">
import { NCard, NInput, NFlex, NButton } from "naive-ui";
</script>

<template>
  <n-card :bordered="false">
    <div class="chat-window">
      <div class="chat-container">
        <n-card
          class="chat-item"
          size="small"
          :bordered="false"
          embedded
          title="自己"
        >
          <div class="chat-content">
            <p>你好，欢迎使用SEAS AI View</p>
          </div>
        </n-card>
        <n-card
          class="chat-item"
          size="small"
          :bordered="false"
          embedded
          header-style="border-radius: 20px"
          title="AI"
        >
          <div class="chat-content">
            <p>
              SEAS AI
              View是一个基于NLP的智能客服系统，你可以通过它与客服人员进行聊天
            </p>
          </div>
        </n-card>
      </div>
      <div class="input-container">
        <n-flex>
          <n-input class="input" size="large" round />
          <n-button>发送</n-button>
        </n-flex>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
}

.chat-container {
  flex: 1;
}

.input-container {
  height: 80px;
  background-color: #00acc1;
}

.input {
  width: calc(100% - 100px);
}

.chat-item {
  margin-bottom: 16px;
}
</style>
