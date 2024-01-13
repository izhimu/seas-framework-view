<script setup lang="ts">
import {
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NScrollbar,
  NSpace,
  NTag,
  NIcon,
  NEllipsis,
  NEmpty,
} from "naive-ui";
import { CaretUp, CaretDown } from "@vicons/ionicons5";
import { onMounted, reactive } from "vue";
import { Network } from "../../entity/os.ts";
import { network } from "../../request/os.ts";

const networkInfo = reactive<Array<Network>>([]);
const ellipsisStyle = { maxWidth: "200px" };

const loadNetworkInfo = () => {
  network().then((res) => {
    Object.assign(networkInfo, res.data);
  });
};

onMounted(() => {
  loadNetworkInfo();
});
</script>

<template>
  <n-card title="网络信息">
    <n-empty v-if="networkInfo.length === 0" class="empty" />
    <n-scrollbar v-else x-scrollable>
      <n-space :wrap="false">
        <template v-for="item in networkInfo" :key="item.id">
          <n-card hoverable embedded class="networkItem" :title="item.name">
            <n-descriptions label-placement="left" :column="1">
              <n-descriptions-item label="网络别名">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.alias }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="设备名称">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.displayName }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="网络状态">
                <n-tag
                  :type="item.status === 'UP' ? 'success' : 'error'"
                  size="small"
                >
                  {{ item.status }}
                </n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="IPv4地址">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.ipv4 }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="IPv6地址">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.ipv6 }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="MAC地址">
                <n-ellipsis :style="ellipsisStyle">
                  {{ item.mac }}
                </n-ellipsis>
              </n-descriptions-item>
              <n-descriptions-item label="MTU">
                {{ item.mtu }}
              </n-descriptions-item>
              <n-descriptions-item label="速率">
                {{ item.speed }} Mbps
              </n-descriptions-item>
              <n-descriptions-item label="上行数据">
                <n-icon :component="CaretUp" size="16" color="#18a058" />
                {{ item.bytesSent }}
              </n-descriptions-item>
              <n-descriptions-item label="下行数据">
                <n-icon :component="CaretDown" size="16" color="#d03050" />
                {{ item.bytesRecv }}
              </n-descriptions-item>
            </n-descriptions>
          </n-card>
        </template>
      </n-space>
    </n-scrollbar>
  </n-card>
</template>

<style scoped>
.networkItem {
  width: 330px;
  margin: 10px 0 10px 0;
}

.empty {
  height: 442px;
}
</style>
