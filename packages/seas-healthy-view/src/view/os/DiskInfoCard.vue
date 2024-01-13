<script setup lang="ts">
import {
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NProgress,
  NScrollbar,
  NSpace,
  NEllipsis,
  NEmpty,
} from "naive-ui";
import { onMounted, reactive } from "vue";
import { Disk } from "../../entity/os.ts";
import { disk } from "../../request/os.ts";

const diskInfo = reactive<Array<Disk>>([]);
const ellipsisStyle = { maxWidth: "200px" };

const loadDiskInfo = () => {
  disk().then((res) => {
    Object.assign(diskInfo, res.data);
  });
};

onMounted(() => {
  loadDiskInfo();
});
</script>

<template>
  <n-card title="磁盘信息">
    <n-empty v-if="diskInfo.length === 0" class="empty" />
    <n-scrollbar v-else x-scrollable>
      <n-space :wrap="false">
        <template v-for="item in diskInfo" :key="item.uuid">
          <n-card hoverable embedded class="diskItem" :title="item.name">
            <n-descriptions
              label-placement="left"
              :column="1"
              :content-style="{
                width: '200px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }"
            >
              <n-descriptions-item label="文件系统">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.type }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="存储路径">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.volume }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="磁盘容量">
                {{ item.usedStr }} / {{ item.totalStr }}
                <n-progress
                  class="progress"
                  type="line"
                  :percentage="
                    Number(((item.used / item.total) * 100).toFixed(1))
                  "
                  :indicator-placement="'inside'"
                />
              </n-descriptions-item>
            </n-descriptions>
          </n-card>
        </template>
      </n-space>
    </n-scrollbar>
  </n-card>
</template>

<style scoped>
.progress {
  width: 200px;
  margin-top: 10px;
}

.diskItem {
  width: 330px;
  margin: 10px 0 10px 0;
}

.empty {
  height: 226px;
}
</style>
