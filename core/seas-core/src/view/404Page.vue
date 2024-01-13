<script setup lang="ts">
import { useRouter } from "vue-router";
import { NResult, NButton } from "naive-ui";

const router = useRouter();
</script>

<template>
  <n-result
    class="state-box"
    status="404"
    title="404 资源不存在"
    description="生活总归带点荒谬"
  >
    <template #footer>
      <n-button @click="router.push('/')">返回首页</n-button>
    </template>
  </n-result>
</template>

<style scoped></style>
