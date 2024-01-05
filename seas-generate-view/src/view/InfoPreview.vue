<script setup lang="ts">
import { ref } from "vue";
import {
  NModal,
  NSpace,
  NButton,
  NTabs,
  NTabPane,
  NCode,
  NCard,
  NScrollbar,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core";
import { TemplateAssets } from "../entity/template";

const { showModel, close } = useFormModel();

const fileTab = ref<string>();
const fileList = ref<Array<TemplateAssets>>([]);

const openModel = (list: Array<TemplateAssets>) => {
  if (list && list[0].id) {
    fileList.value = list;
    fileTab.value = list[0].id;
    showModel.value = true;
  }
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 100%; height: 100vh"
    preset="card"
    title="预览"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="close"
  >
    <n-tabs
      v-model:value="fileTab"
      type="card"
      :animated="true"
      tab-style="min-width: 80px;"
    >
      <n-tab-pane
        v-for="file in fileList"
        :key="file.id"
        :name="file.id"
        :tab="file.assetsName"
      >
        <n-scrollbar style="height: calc(100vh - 240px)">
          <n-card embedded :bordered="false">
            <n-code
              :code="file.assetsDataStr ?? ''"
              :language="file.assetsType"
            />
          </n-card>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>
    <template #action>
      <n-space justify="end">
        <n-button @click="close">关闭</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
