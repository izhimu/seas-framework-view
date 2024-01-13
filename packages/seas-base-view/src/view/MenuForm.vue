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
  NCollapseTransition,
  useMessage,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core/src";
import { get, save, update } from "../request/menu";
import { dMenu } from "../entity/menu";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();

const emits = defineEmits(["success"]);

const formRef = ref<FormInst | null>(null);
const model = reactive(dMenu());

const rules = ref<FormRules>({
  menuName: [
    {
      required: true,
      message: "请输入菜单名称",
    },
  ],
  menuCode: [
    {
      required: true,
      message: "请输入菜单标识",
    },
  ],
});

const openModel = (parentId: string, id?: string) => {
  Object.assign(model, dMenu());
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
        <n-form-item path="menuName" label="名称">
          <n-input
            v-model:value="model.menuName"
            placeholder="请输入菜单名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="menuCode" label="标识">
          <n-input
            v-model:value="model.menuCode"
            placeholder="请输入菜单标识"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="menuType" label="类型">
          <n-radio
            :checked="model.menuType === 0"
            value="0"
            name="menuTypeRadio"
            @change="model.menuType = 0"
          >
            菜单
          </n-radio>
          <n-radio
            :checked="model.menuType === 1"
            value="0"
            name="menuTypeRadio"
            @change="model.menuType = 1"
          >
            按钮
          </n-radio>
        </n-form-item>
        <n-collapse-transition :show="model.menuType === 0">
          <n-form-item path="menuUrl" label="地址">
            <n-input
              v-model:value="model.menuUrl"
              placeholder="请输入路由地址"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="menuUrl" label="组件">
            <n-input
              v-model:value="model.menuComponent"
              placeholder="请输入组件地址"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-collapse-transition>
        <n-form-item path="sort" label="排序">
          <n-input-number
            v-model:value="model.sort"
            placeholder="请输入排序序号"
            :precision="0"
            style="width: 100%"
          />
        </n-form-item>
        <n-form-item path="display" label="是否显示">
          <n-radio
            :checked="model.display === 1"
            value="0"
            name="displayRadio"
            @change="model.display = 1"
          >
            是
          </n-radio>
          <n-radio
            :checked="model.display === 0"
            value="0"
            name="displayRadio"
            @change="model.display = 0"
          >
            否
          </n-radio>
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
