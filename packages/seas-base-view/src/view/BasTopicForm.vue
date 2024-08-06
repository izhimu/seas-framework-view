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
  NTabs,
  NTabPane,
  NCard,
  NTree,
  NScrollbar,
  useMessage,
} from "naive-ui";
import { useFormModel, useCommonStore, useTree } from "@izhimu/seas-core";
import {
  get,
  save,
  update,
  topicMenu,
  updateTopicMenu,
} from "../request/basTopic";
import { dBasTopic as defEntity, dBasTopicMenu } from "../entity/basTopic";
import { tree as menuTree } from "../request/menu.ts";
import { snowflake } from "../request/common.ts";

const commonStore = useCommonStore();
const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();

const emits = defineEmits(["success"]);

const formRef = ref<FormInst | null>(null);
const model = reactive(defEntity());

const rules = ref<FormRules>({
  topicName: [{ required: true, message: "请输入主题名称", trigger: "blur" }],
  topicCode: [{ required: true, message: "请输入主题标识", trigger: "blur" }],
});

const {
  treeData: menuData,
  treePattern: menuPattern,
  queryTreeData: queryMenu,
} = useTree(menuTree);
const menuValue = reactive(dBasTopicMenu());

const loadMenu = () => {
  queryMenu();
  if (menuValue.topicId) {
    topicMenu(menuValue.topicId).then((res) => {
      if (res.code === "000" && res.data) {
        menuValue.menuIds = res.data;
      }
    });
  }
};

const openModel = async (id?: string) => {
  showModel.value = true;
  addStatus.value = !id;
  if (id) {
    dataLoading.value = true;
    menuValue.topicId = id;
    const res = await get(id);
    Object.assign(model, res.data);
  } else {
    const idRes = await snowflake();
    model.id = idRes.data ?? null;
    menuValue.topicId = idRes.data ?? null;
  }
  loadMenu();
  dataLoading.value = false;
};

const closeModel = () => {
  Object.assign(model, defEntity());
  Object.assign(model, dBasTopicMenu());
  showModel.value = false;
};

const onSuccess = () => {
  message.success("提交成功");
  emits("success");
};

const handleSubmit = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      btnLoading.value = true;
      if (addStatus.value) {
        await save(model);
      } else {
        await update(model);
      }
      await updateTopicMenu(menuValue);
      btnLoading.value = false;
      onSuccess();
      closeModel();
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
    :content-style="{ paddingTop: '6px' }"
    preset="card"
    :title="addStatus ? '新增' : '修改'"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="closeModel"
  >
    <n-spin :show="dataLoading">
      <n-tabs type="line" size="large" animated>
        <n-tab-pane
          class="tab-box"
          name="base"
          tab="基本信息"
          display-directive="show:lazy"
        >
          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="topicName" label="主题名称">
              <n-input
                v-model:value="model.topicName"
                placeholder="请输入主题名称"
              />
            </n-form-item>
            <n-form-item path="topicCode" label="主题标识">
              <n-input
                v-model:value="model.topicCode"
                placeholder="请输入主题标识"
              />
            </n-form-item>
            <n-form-item path="indexUrl" label="首页地址">
              <n-input
                v-model:value="model.indexUrl"
                placeholder="请输入首页地址"
              />
            </n-form-item>
            <n-form-item path="sort" label="排序">
              <n-input-number
                v-model:value="model.sort"
                class="fill-width"
                :min="0"
              />
            </n-form-item>
            <n-form-item path="remarks" label="备注">
              <n-input
                v-model:value="model.remarks"
                type="textarea"
                placeholder="请输入备注"
              />
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane
          v-if="commonStore.auth.indexOf('bas.topic.menu') !== -1"
          class="tab-box"
          name="menu"
          tab="分配菜单"
          display-directive="show:lazy"
        >
          <n-card>
            <n-scrollbar style="height: 400px">
              <n-space vertical :size="12">
                <n-input
                  v-model:value="menuPattern"
                  placeholder="搜索"
                  clearable
                />
                <!--suppress TypeScriptValidateTypes -->
                <n-tree
                  v-model:checked-keys="menuValue.menuIds"
                  v-model:indeterminate-keys="menuValue.menuPIds"
                  block-line
                  checkable
                  cascade
                  :check-on-click="true"
                  default-expand-all
                  :pattern="menuPattern"
                  :data="menuData"
                />
              </n-space>
            </n-scrollbar>
          </n-card>
        </n-tab-pane>
      </n-tabs>
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

<style scoped>
.tab-box {
  height: 480px;
}
</style>
