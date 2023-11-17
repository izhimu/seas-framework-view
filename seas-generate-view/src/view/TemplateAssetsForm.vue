<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  FormInst,
  FormRules,
  NModal,
  NSpace,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSpin,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NTabs,
  NTabPane,
  NCard,
  NTag,
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core";
import { TemplateAssets, dTemplateAssets as entity } from "../entity/template";
import { assets, assetsSave } from "../request/template";

const message = useMessage();
const { btnLoading, dataLoading, showModel, open, close } = useFormModel();

const emits = defineEmits(["success"]);

let index = 0;
const fileTab = ref<string>();
const fileList = ref<Array<TemplateAssets>>([]);
const titleRef = ref("模板资源");
const versionRef = ref();
const idRef = ref<string>();
const formRef = ref<FormInst>();
const model = reactive(entity());
const rules = ref<FormRules>({
  templateName: [
    {
      required: true,
      message: "请输入模板名称",
    },
  ],
  templateVersion: [
    {
      required: true,
      message: "请输入模板版本",
    },
  ],
});

const handleTabAdd = () => {
  index += 1;
  const templateAssets = entity();
  templateAssets.tabId = `${new Date().getTime()}${Math.round(
    Math.random() * 10
  )}`;
  templateAssets.templateId = idRef.value ?? null;
  templateAssets.assetsName = `新建文件${index}`;
  fileList.value.push(templateAssets);
  fileTab.value = templateAssets.tabId;
  model.assetsName = templateAssets.assetsName;
  model.outPath = templateAssets.outPath;
};

const openModel = (id?: string, title?: string, version?: string) => {
  index = 0;
  fileTab.value = undefined;
  fileList.value = [];
  titleRef.value = "模板资源";
  versionRef.value = undefined;
  Object.assign(model, entity());
  if (title) {
    titleRef.value = `${title}资源管理`;
  }
  if (version) {
    versionRef.value = version;
  }
  open(!id);
  if (id) {
    idRef.value = id;
    dataLoading.value = true;
    assets(id)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          fileList.value = res.data;
          const first = fileList.value[0];
          model.assetsName = first.assetsName;
          model.outPath = first.outPath;
          fileTab.value = first.id ?? undefined;
        } else {
          handleTabAdd();
        }
      })
      .finally(() => {
        dataLoading.value = false;
      });
  } else {
    handleTabAdd();
  }
};

const onSuccess = () => {
  message.success("提交成功");
  emits("success");
};

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      btnLoading.value = true;
      assetsSave(fileList.value)
        .then(() => {
          onSuccess();
          close();
        })
        .finally(() => {
          btnLoading.value = false;
        });
    }
  });
};

const handleTabChange = (name: string) => {
  fileTab.value = name;
  const { value: file } = fileList;
  const nameIndex = file.findIndex((v) => v.id === name || v.tabId === name);
  model.assetsName = file[nameIndex]?.assetsName;
  model.outPath = file[nameIndex]?.outPath;
};

const handleTabClose = (name: string) => {
  const { value: file } = fileList;
  if (file.length === 1) {
    return;
  }
  const nameIndex = file.findIndex((v) => v.id === name || v.tabId === name);
  file.splice(nameIndex, 1);
  if (name === fileTab.value) {
    handleTabChange(
      file[Math.min(nameIndex, file.length - 1)]?.id ||
        file[Math.min(nameIndex, file.length - 1)]?.tabId
    );
  }
};

const handleInputChange = () => {
  const { value: file } = fileList;
  const nameIndex = file.findIndex(
    (v) => v.id === fileTab.value || v.tabId === fileTab.value
  );
  file[nameIndex].assetsName = model.assetsName;
  file[nameIndex].outPath = model.outPath;
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
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    :content-style="{ padding: 0 }"
    @close="close"
  >
    <template #header>
      {{ titleRef }}
      <n-tag v-if="versionRef">{{ versionRef }}</n-tag>
    </template>
    <n-layout has-sider>
      <n-layout-sider bordered content-style="padding: 24px;">
        <n-spin :show="dataLoading">
          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="name" label="资源名称">
              <n-input
                v-model:value="model.assetsName"
                placeholder="请输入资源名称"
                @change="handleInputChange"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="name" label="输出路径">
              <n-input
                v-model:value="model.outPath"
                placeholder="请输入输出路径"
                @change="handleInputChange"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
        </n-spin>
      </n-layout-sider>
      <n-layout>
        <n-layout-content>
          <n-card :bordered="false">
            <n-tabs
              v-model:value="fileTab"
              type="card"
              :animated="true"
              :addable="true"
              :closable="true"
              tab-style="min-width: 80px;"
              :on-update:value="handleTabChange"
              @close="handleTabClose"
              @add="handleTabAdd"
            >
              <n-tab-pane
                v-for="file in fileList"
                :key="file.id ? file.id : file.tabId"
                :name="file.id ? file.id : file.tabId"
                :tab="file.assetsName ?? ''"
              >
                <n-input
                  v-model:value="file.assetsData"
                  style="height: calc(100vh - 240px)"
                  type="textarea"
                  placeholder="请输入模板文件内容"
                />
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <template #action>
      <n-space justify="end">
        <n-button @click="close">关闭</n-button>
        <n-button
          type="info"
          :loading="btnLoading"
          :disabled="dataLoading"
          @click="handleSubmit"
          >提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
