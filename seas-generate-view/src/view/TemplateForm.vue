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
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core";
import { dTemplate as entity } from "../entity/template";
import { get, save, update } from "../request/template";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus, open, close } =
  useFormModel();

const emits = defineEmits(["success"]);

const model = reactive(entity());
const formRef = ref<FormInst>();
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
        <n-form-item path="name" label="模板名称">
          <n-input
            v-model:value="model.templateName"
            placeholder="请输入模板名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="name" label="模板版本">
          <n-input
            v-model:value="model.templateVersion"
            placeholder="请输入模板版本"
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
