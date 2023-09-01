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
  NRadio,
  NRadioGroup,
  NSpin,
  NTransfer,
  NTabs,
  NTabPane,
  NScrollbar,
  NTree,
  NCard,
  NSwitch,
  NSelect,
  NEmpty,
  NIcon,
  useMessage,
} from "naive-ui";
import { Option } from "naive-ui/es/transfer/src/interface";
import { useStore } from "vuex";
import { CheckboxOutline } from "@vicons/ionicons5";
import { useFormModel, useTree } from "@izhimu/seas-core";
import {
  get,
  save,
  update,
  user,
  updateUser,
  authMenu,
  updateAuthMenu,
  authOrg,
  updateAuthOrg,
} from "../request/role";
import { snowflake } from "../request/common";
import { list } from "../request/user";
import {
  dRole,
  dAuthMenu,
  dAuthOrg,
  oType,
  oEnable,
  mType,
} from "../entity/role";
import { dUserRole } from "../entity/user";
import { tree as menuTree } from "../request/menu";
import { tree as orgTree } from "../request/org";

const store = useStore();
const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();

const emits = defineEmits(["success"]);

const formRef = ref<FormInst | null>(null);
const model = reactive(dRole());
const userModel = reactive(dUserRole());
const userList = ref<Option[]>([]);

const rules = ref<FormRules>({
  roleName: [
    {
      required: true,
      message: "请输入角色名称",
    },
  ],
});

const {
  treeData: menuData,
  treePattern: menuPattern,
  queryTreeData: queryMenu,
} = useTree(menuTree);
const {
  treeData: orgData,
  treePattern: orgPattern,
  queryTreeData: queryOrg,
} = useTree(orgTree);

const menuValue = reactive(dAuthMenu());
const orgValue = reactive(dAuthOrg());

const loadMenu = () => {
  queryMenu();
  if (menuValue.roleId) {
    authMenu(menuValue.roleId).then((res) => {
      if (res.code === "000" && res.data) {
        menuValue.menuIds = res.data;
      }
    });
  }
};

const loadOrg = () => {
  queryOrg();
  if (orgValue.roleId) {
    authOrg(orgValue.roleId).then((res) => {
      if (res.code === "000" && res.data) {
        orgValue.orgIds = res.data;
      }
    });
  }
};

const openModel = async (id?: string) => {
  userList.value = [];
  showModel.value = true;
  addStatus.value = !id;
  const listData = await list();
  listData.data?.forEach((v) => {
    userList.value.push({
      label: v.userName ?? "",
      value: v.id ?? "",
    });
  });
  if (id) {
    dataLoading.value = true;
    userModel.roleId = id;
    menuValue.roleId = id;
    orgValue.roleId = id;
    const roleRes = await get(id);
    Object.assign(model, roleRes.data);
    const userRes = await user(id);
    userModel.userIds = userRes.data ?? null;
  } else {
    const idRes = await snowflake();
    model.id = idRes.data ?? null;
    userModel.roleId = idRes.data ?? null;
    menuValue.roleId = idRes.data ?? null;
    orgValue.roleId = idRes.data ?? null;
  }
  loadMenu();
  loadOrg();
  dataLoading.value = false;
};

const closeModel = () => {
  Object.assign(model, dRole());
  Object.assign(userModel, dUserRole());
  Object.assign(menuValue, dAuthMenu());
  Object.assign(orgValue, dAuthOrg());
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
      await updateUser(userModel);
      await updateAuthMenu(menuValue);
      await updateAuthOrg(orgValue);
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
            <n-form-item path="roleName" label="名称">
              <n-input
                v-model:value="model.roleName"
                placeholder="请输入角色名称"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="enable" label="状态">
              <n-radio-group v-model:value="model.enable">
                <n-space>
                  <n-radio
                    v-for="item in oEnable"
                    :key="'role.enable' + item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item path="sort" label="优先级">
              <n-input-number
                v-model:value="model.sort"
                placeholder="请输入优先级"
                class="fill-width"
                :precision="0"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="roleDesc" label="描述">
              <n-input
                v-model:value="model.roleDesc"
                placeholder="请输入角色描述"
                type="textarea"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane
          v-if="store.state.authComponents.indexOf('system.role.user') !== -1"
          class="tab-box"
          name="user"
          tab="用户分配"
          display-directive="show:lazy"
        >
          <n-transfer
            ref="transfer"
            v-model:value="userModel.userIds"
            style="width: 100%; height: 382px"
            virtual-scroll
            :options="userList"
            filterable
          />
        </n-tab-pane>
        <n-tab-pane
          v-if="store.state.authComponents.indexOf('system.role.menu') !== -1"
          class="tab-box"
          name="menu"
          tab="菜单权限"
          display-directive="show:lazy"
        >
          <n-card>
            <n-scrollbar style="height: 340px">
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
        <n-tab-pane
          v-if="store.state.authComponents.indexOf('system.role.dept') !== -1"
          class="tab-box"
          name="dept"
          tab="数据权限"
          display-directive="show:lazy"
        >
          <n-form inline>
            <n-form-item path="authType" label="权限模式">
              <n-select
                v-model:value="model.authType"
                style="width: 370px"
                :options="oType"
                placeholder="请选择权限模式"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="deptCascade" label="层级关联">
              <n-switch
                v-model:value="model.deptCascade"
                :checked-value="1"
                :unchecked-value="0"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
          <n-card>
            <n-scrollbar style="height: 253px">
              <n-space v-if="model.authType === 1" vertical :size="12">
                <n-input
                  v-model:value="orgPattern"
                  placeholder="搜索"
                  clearable
                />
                <!--suppress TypeScriptValidateTypes -->
                <n-tree
                  v-model:checked-keys="orgValue.orgIds"
                  block-line
                  checkable
                  :check-on-click="true"
                  :cascade="model.deptCascade === 1"
                  default-expand-all
                  :pattern="orgPattern"
                  :data="orgData"
                />
              </n-space>
              <n-empty
                v-else
                style="margin-top: 100px"
                :description="'已选择：' + mType.get(model.authType ?? 4)"
              >
                <template #icon>
                  <n-icon>
                    <checkbox-outline />
                  </n-icon>
                </template>
              </n-empty>
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
  height: 400px;
}
</style>
