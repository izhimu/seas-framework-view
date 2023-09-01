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
import { FormItemRule } from "naive-ui/lib/form/src/interface";
import { useFormModel } from "@izhimu/seas-core";
import { get, save, update, usable } from "../request/conf";
import { dConf as defEntity } from "../entity/conf";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();

const emits = defineEmits(["success"]);

const formRef = ref<FormInst | null>(null);
const model = reactive(defEntity());

const rules = ref<FormRules>({
  confName: [
    {
      required: true,
      message: "请输入配置名称",
    },
  ],
  confKey: [
    {
      required: true,
      trigger: "blur",
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          if (!value) {
            reject(Error("请输入配置标识"));
          }
          usable(model.id, value).then((res) => {
            if (res.data ?? false) {
              resolve();
            } else {
              reject(Error("配置标识已存在，请更换"));
            }
          });
        });
      },
    },
  ],
  confValue: [
    {
      required: true,
      message: "请输入配置值",
    },
  ],
});

const openModel = (id?: string) => {
  Object.assign(model, defEntity());
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
        <n-form-item path="confName" label="名称">
          <n-input
            v-model:value="model.confName"
            placeholder="请输入配置名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="confKey" label="标识">
          <n-input
            v-model:value="model.confKey"
            placeholder="请输入配置标识"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="confValue" label="值">
          <n-input
            v-model:value="model.confValue"
            placeholder="请输入配置值"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="confInfo" label="备注">
          <n-input
            v-model:value="model.confInfo"
            type="textarea"
            placeholder="请输入备注"
            @keydown.enter.prevent
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
