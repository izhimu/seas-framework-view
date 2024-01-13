<script setup lang="ts">
import { useRouter } from "vue-router";
import { NResult, NButton } from "naive-ui";

const router = useRouter();
</script>

<template>
  <n-result
    class="state-box"
    status="403"
    title="403 禁止访问"
    description="总有些门是对你关闭的"
  >
    <template #footer>
      <n-button @click="router.push('/')">返回首页</n-button>
    </template>
  </n-result>
</template>

<style scoped></style>
