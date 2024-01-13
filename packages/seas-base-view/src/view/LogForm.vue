<script setup lang="ts">
import { reactive } from "vue";
import {
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NModal,
  NSpin,
  NTag,
  NScrollbar,
  NCode,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core/src";
import { dLog, mMethod } from "../entity/log";
import { get } from "../request/log";

const { dataLoading, showModel } = useFormModel();

const model = reactive(dLog());

const openModel = async (id: string) => {
  Object.assign(model, dLog());
  showModel.value = true;
  dataLoading.value = true;
  get(id)
    .then((res) => {
      Object.assign(model, res.data);
      if (model.params) {
        model.params = JSON.stringify(JSON.parse(model.params), null, 2);
      }
      if (model.result) {
        model.result = JSON.stringify(JSON.parse(model.result), null, 2);
      }
    })
    .finally(() => {
      dataLoading.value = false;
    });
};

const closeModel = () => {
  showModel.value = false;
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 800px"
    preset="card"
    title="详情"
    :bordered="false"
    :segmented="{ content: true, action: false }"
    :mask-closable="false"
    @close="closeModel"
  >
    <n-spin :show="dataLoading">
      <n-descriptions label-placement="left">
        <n-descriptions-item label="名称">
          {{ model.logName }}
        </n-descriptions-item>
        <n-descriptions-item label="路径">
          {{ model.requestUrl }}
        </n-descriptions-item>
        <n-descriptions-item label="方法">
          <n-tag size="small" :type="mMethod.get(model.method ?? 'OTHER')?.tag">
            {{ model.method }}
          </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="状态">
          {{ model.status }}
        </n-descriptions-item>
        <n-descriptions-item label="时间">
          {{ model.requestDate }}
        </n-descriptions-item>
        <n-descriptions-item label="耗时">
          {{ model.runtimeValue }}
        </n-descriptions-item>
        <n-descriptions-item label="用户">
          {{ model.userName }}
        </n-descriptions-item>
        <n-descriptions-item label="账号">
          {{ model.account }}
        </n-descriptions-item>
        <n-descriptions-item label="IP">
          {{ model.ip }}
        </n-descriptions-item>
      </n-descriptions>
      <n-card embedded title="请求参数" class="card">
        <n-scrollbar style="max-height: 200px">
          <n-code :code="model.params ?? ''" language="json" />
        </n-scrollbar>
      </n-card>
      <n-card embedded title="响应参数" class="card">
        <n-scrollbar style="max-height: 200px">
          <n-code :code="model.result ?? ''" language="json" />
        </n-scrollbar>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
