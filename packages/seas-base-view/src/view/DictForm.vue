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
  NInputNumber,
  NSpin,
  NRadio,
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core/src";
import { get, save, update } from "../request/dict";
import { dDict } from "../entity/dict";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();

const emits = defineEmits(["success"]);

const formRef = ref<FormInst | null>(null);
const model = reactive(dDict());

const rules = ref<FormRules>({
  dictName: [
    {
      required: true,
      message: "请输入字典名称",
    },
  ],
  dictCode: [
    {
      required: true,
      message: "请输入字典编号",
    },
  ],
});

const openModel = (parentId: string, id?: string) => {
  Object.assign(model, dDict());
  model.parentId = parentId;
  showModel.value = true;
  addStatus.value = !id;
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

const closeModel = () => {
  showModel.value = false;
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
            closeModel();
          })
          .finally(() => {
            btnLoading.value = false;
          });
      } else {
        update(model)
          .then(() => {
            onSuccess();
            closeModel();
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
    @close="closeModel"
  >
    <n-spin :show="dataLoading">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="dictName" label="名称">
          <n-input
            v-model:value="model.dictName"
            placeholder="请输入字典名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="dictCode" label="编号">
          <n-input
            v-model:value="model.dictCode"
            :disabled="!addStatus && model.fixed === 1"
            placeholder="请输入字典编号"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item v-if="addStatus" path="fixed" label="类型">
          <n-radio
            :checked="model.fixed === 0"
            value="0"
            name="fixed"
            @change="model.fixed = 0"
          >
            用户字典
          </n-radio>
          <n-radio
            :checked="model.fixed === 1"
            value="1"
            name="fixed"
            @change="model.fixed = 1"
          >
            系统字典
          </n-radio>
        </n-form-item>
        <n-form-item path="sort" label="排序">
          <n-input-number
            v-model:value="model.sort"
            :precision="0"
            placeholder="请输入排序序号"
            style="width: 100%"
          />
        </n-form-item>
      </n-form>
    </n-spin>
    <template #action>
      <n-space justify="end">
        <n-button @click="closeModel">关闭</n-button>
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
