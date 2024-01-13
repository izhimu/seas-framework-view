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
  NSelect,
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core/src";
import { dDatasource as entity, oType } from "../entity/datasource";
import { get, save, update } from "../request/datasource";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus, open, close } =
  useFormModel();

const emits = defineEmits(["success"]);

const model = reactive(entity());
const formRef = ref<FormInst>();
const rules = ref<FormRules>({
  dsName: [
    {
      required: true,
      message: "请输入数据源名称",
    },
  ],
  dbName: [
    {
      required: true,
      message: "请输入数据库名称",
    },
  ],
  dsType: [
    {
      required: true,
      message: "请选择数据源类型",
    },
  ],
  dsUrl: [
    {
      required: true,
      message: "请输入数据源地址",
    },
  ],
  dsUser: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  dsPwd: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
});

const openModel = (id?: string) => {
  Object.assign(model, entity());
  open(!id);
  if (id) {
    dataLoading.value = true;
    get(id)
      .then((res) => {
        Object.assign(model, res.data);
      })
      .finally(() => {
        dataLoading.value = false;
      });
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
      if (addStatus.value) {
        save(model)
          .then(() => {
            onSuccess();
            close();
          })
          .finally(() => {
            btnLoading.value = false;
          });
      } else {
        update(model)
          .then(() => {
            onSuccess();
            close();
          })
          .finally(() => {
            btnLoading.value = false;
          });
      }
    }
  });
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 500px"
    preset="card"
    :title="addStatus ? '新增' : '修改'"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="close"
  >
    <n-spin :show="dataLoading">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name" label="数据源名称">
          <n-input
            v-model:value="model.dsName"
            placeholder="请输入数据源名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="name" label="数据库名称">
          <n-input
            v-model:value="model.dbName"
            placeholder="请输入数据库名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="type" label="数据源类型">
          <n-select
            v-model:value="model.dsType"
            filterable
            :options="oType"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="name" label="数据源地址">
          <n-input
            v-model:value="model.dsUrl"
            placeholder="请输入数据源地址"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="name" label="用户名">
          <n-input
            v-model:value="model.dsUser"
            placeholder="请输入用户名"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="name" label="密码">
          <n-input
            v-model:value="model.dsPwd"
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="param" label="备注">
          <n-input
            v-model:value="model.remark"
            type="textarea"
            placeholder="请输入备注"
            @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
    </n-spin>
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
