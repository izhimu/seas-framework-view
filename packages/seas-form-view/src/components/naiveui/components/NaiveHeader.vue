<template>
  <n-layout-header class="btn-bar">
    <n-space justify="end">
      <slot></slot>
      <n-button
        v-if="$attrs.uploadJson"
        text
        size="small"
        @click="$emit('uploadJson')"
      >
        导入JSON
      </n-button>
      <n-button
        v-if="$attrs.clearable"
        text
        size="small"
        @click="$emit('clearable')"
      >
        清空
      </n-button>
      <n-button
        v-if="$attrs.preview"
        text
        size="small"
        @click="$emit('preview')"
      >
        预览
      </n-button>
      <n-button
        v-if="$attrs.generateJson"
        text
        size="small"
        @click="$emit('generateJson')"
      >
        生成JSON
      </n-button>
      <n-button
        v-if="$attrs.generateCode"
        text
        size="small"
        @click="$emit('generateCode')"
      >
        生成代码
      </n-button>
    </n-space>
  </n-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NaiveHeader",
  components: {
  },
  emits: ["uploadJson", "clearable", "preview", "generateJson", "generateCode"],
});
</script>
