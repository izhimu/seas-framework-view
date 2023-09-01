<script setup lang="ts">
import { NCard, NDescriptions, NDescriptionsItem, NProgress } from "naive-ui";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { dMemory } from "../../entity/os.ts";
import { memory } from "../../request/os.ts";

const memoryInfo = reactive(dMemory());
const interval = ref();

const loadMemoryInfo = () => {
  memory().then((res) => {
    Object.assign(memoryInfo, res.data);
  });
};

onMounted(() => {
  loadMemoryInfo();
  interval.value = setInterval(() => loadMemoryInfo(), 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <n-card title="内存信息">
    <n-descriptions
      label-placement="left"
      :column="1"
      class="card"
      :content-style="{ width: 'calc(100% - 70px)' }"
    >
      <n-descriptions-item label="物理内存">
        {{ memoryInfo.usedStr }} / {{ memoryInfo.totalStr }}
        <n-progress
          class="progress"
          type="line"
          status="info"
          :percentage="
            Number(((memoryInfo.used / memoryInfo.total) * 100).toFixed(1))
          "
          :indicator-placement="'inside'"
        />
      </n-descriptions-item>
      <n-descriptions-item label="虚拟内存">
        {{ memoryInfo.virtualInUseStr }} / {{ memoryInfo.virtualMaxStr }}
        <n-progress
          class="progress"
          type="line"
          status="success"
          :percentage="
            Number(
              ((memoryInfo.virtualInUse / memoryInfo.virtualMax) * 100).toFixed(
                1
              )
            )
          "
          :indicator-placement="'inside'"
        />
      </n-descriptions-item>
      <n-descriptions-item label="交换内存">
        {{ memoryInfo.swapUsedStr }} / {{ memoryInfo.swapTotalStr }}
        <n-progress
          class="progress"
          type="line"
          status="warning"
          :percentage="
            Number(
              ((memoryInfo.swapUsed / memoryInfo.swapTotal) * 100).toFixed(1)
            )
          "
          :indicator-placement="'inside'"
        />
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

<style scoped>
.card {
  margin: 28px 0;
}

.progress {
  margin-top: 10px;
}
</style>
