<script setup lang="ts">
import { NSpace, NGrid, NGi } from "naive-ui";
import CpuInfoCard from "./os/CpuInfoCard.vue";
import MemoryInfoCard from "./os/MemoryInfoCard.vue";
import DiskInfoCard from "./os/DiskInfoCard.vue";
import NetworkInfoCard from "./os/NetworkInfoCard.vue";
</script>

<template>
  <div>
    <div class="box-content">
      <n-space vertical size="large">
        <CpuInfoCard />
        <n-grid x-gap="12" cols="4" item-responsive>
          <n-gi>
            <MemoryInfoCard />
          </n-gi>
          <n-gi span="0:3">
            <DiskInfoCard />
          </n-gi>
        </n-grid>
        <NetworkInfoCard />
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
