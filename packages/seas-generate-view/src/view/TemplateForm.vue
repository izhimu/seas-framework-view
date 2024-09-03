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
  NInputGroup,
  NSpin,
  NDynamicInput,
  NScrollbar,
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core/src";
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

const extParam = ref();

const openModel = (id?: string) => {
  Object.assign(model, entity());
  open(!id);
  if (id) {
    dataLoading.value = true;
    get(id)
      .then((res) => {
        Object.assign(model, res.data);
        if (model.ext) {
          extParam.value = JSON.parse(model.ext);
        }
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
      if (extParam.value) {
        model.ext = JSON.stringify(extParam.value);
      }
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
        <n-form-item path="templateName" label="模板名称">
          <n-input
            v-model:value="model.templateName"
            placeholder="请输入模板名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="templateVersion" label="模板版本">
          <n-input
            v-model:value="model.templateVersion"
            placeholder="请输入模板版本"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="remark" label="备注">
          <n-input
            v-model:value="model.remark"
            type="textarea"
            placeholder="请输入备注"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="extParam" label="附加参数">
          <n-scrollbar style="max-height: 170px">
            <n-dynamic-input
              v-model:value="extParam"
              preset="pair"
              :on-create="() => ({ key: '', value: '' })"
            >
              <template #default="{ value }">
                <n-input-group>
                  <n-input
                    v-model:value="value.name"
                    placeholder="说明"
                    style="width: 33%"
                  />
                  <n-input
                    v-model:value="value.key"
                    placeholder="参数名"
                    style="width: 33%"
                  />
                  <n-input
                    v-model:value="value.value"
                    placeholder="默认值"
                    style="width: 33%"
                  />
                </n-input-group>
              </template>
            </n-dynamic-input>
          </n-scrollbar>
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
