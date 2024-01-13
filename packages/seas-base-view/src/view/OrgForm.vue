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
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core/src";
import { get, save, update } from "../request/org";
import { dOrg } from "../entity/org";
import DictSelect from "../components/DictSelect.vue";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();

const emits = defineEmits(["success"]);

const formRef = ref<FormInst | null>(null);
const model = reactive(dOrg());

const rules = ref<FormRules>({
  orgName: [
    {
      required: true,
      message: "请输入组织名称",
    },
  ],
  orgType: [
    {
      required: true,
      message: "请选择组织类型",
    },
  ],
});

const openModel = (parentId: string, id?: string) => {
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
  Object.assign(model, dOrg());
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
          .then((data) => {
            if (data.code !== "000") {
              return;
            }
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
        <n-form-item path="orgName" label="名称">
          <n-input
            v-model:value="model.orgName"
            placeholder="请输入组织名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="orgType" label="类型">
          <dict-select
            v-model:value="model.orgType"
            code="org.type"
            placeholder="请选择组织类型"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="orgAddress" label="地址">
          <n-input
            v-model:value="model.orgAddress"
            placeholder="请输入组织地址"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="managerName" label="负责人">
          <n-input
            v-model:value="model.managerName"
            placeholder="请输入组织负责人"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="managerMobile" label="联系方式">
          <n-input
            v-model:value="model.managerMobile"
            placeholder="请输入联系方式"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="sort" label="排序">
          <n-input-number
            v-model:value="model.sort"
            placeholder="请输入排序序号"
            :precision="0"
            style="width: 100%"
          />
        </n-form-item>
        <n-form-item path="remark" label="备注">
          <n-input
            v-model:value="model.remarks"
            placeholder="请输入备注"
            type="textarea"
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
