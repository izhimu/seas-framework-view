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
  NDatePicker,
  NCheckbox,
  NCollapseTransition,
  NDivider,
  NDynamicInput,
  NGrid,
  NGi,
  NTreeSelect,
  NRadio,
  NSwitch,
  useMessage,
} from "naive-ui";
import { FormItemRule } from "naive-ui/lib/form/src/interface";
import { sm2 } from "sm-crypto";
import { Value } from "async-validator/dist-types/interface";
import { useFormModel, useTree } from "@izhimu/seas-core";
import { dEncryptKey } from "@izhimu/seas-security-view/src/entity/security";
import { encrypt } from "@izhimu/seas-security-view/src/request/security";
import { checkAccount, get, save, update } from "../request/user";
import { Account, dAccount } from "../entity/account";
import { User, dUser, oSex } from "../entity/user";
import { tree } from "../request/org";
import { select } from "../request/role";

const props = defineProps<{
  orgId: string | number | null;
}>();

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus } = useFormModel();
const { treeData, queryTreeData } = useTree(tree);

const emits = defineEmits(["success"]);

const dModel: User = dUser();
dModel.accounts = [dAccount()];
const formRef = ref<FormInst | null>(null);
const model = reactive<User>(dModel);
const addAccount = ref(false);
const roleOption = ref();

const rules = ref<FormRules>({
  userName: [
    {
      required: true,
      message: "请输入用户名称",
    },
  ],
  orgId: [
    {
      required: true,
      message: "请选择所属组织",
    },
  ],
});

const accountRule = ref<FormItemRule>({
  trigger: "input",
  validator: (rule: any, value: Value) => {
    const { field } = rule;
    const index = field.substring(field.indexOf("[") + 1, field.indexOf("]"));
    const account: Account = model.accounts[index];
    if (value === null || value === "") {
      return new Error("请输入账号");
    }
    return new Promise<void>((resolve, reject) => {
      checkAccount({ id: account.id, userAccount: value }).then((res) => {
        if (res.data) {
          resolve();
        } else {
          reject(Error("账号重复，请使用其他账号"));
        }
      });
    });
  },
});

const certificateRule = ref<FormItemRule>({
  trigger: "input",
  message: "请输入密码",
  validator: (rule: unknown, value: Value) => {
    return addStatus && value !== null && value !== "";
  },
});

const encryptKey = reactive(dEncryptKey());
const getEncryptKey = async () => {
  const res = await encrypt();
  Object.assign(encryptKey, res.data);
};

const openModel = (id?: string) => {
  addAccount.value = false;
  showModel.value = true;
  addStatus.value = !id;
  if (props.orgId) {
    model.orgId = props.orgId;
  }
  queryTreeData();
  select().then((res) => {
    if (res.data) {
      roleOption.value = res.data;
    }
  });
  if (id) {
    dataLoading.value = true;
    get(id)
      .then((res) => {
        Object.assign(model, res.data);
        if (model.accounts?.length) {
          addAccount.value = true;
        }
      })
      .finally(() => {
        dataLoading.value = false;
      });
  }
};

const closeModel = () => {
  showModel.value = false;
  Object.assign(model, dUser());
  model.accounts = [dAccount()];
  Object.assign(encryptKey, dEncryptKey());
};

const onSuccess = () => {
  message.success("提交成功");
  emits("success");
};

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (!addAccount.value) {
        model.accounts = [];
      }
      if (model.accounts?.length) {
        await getEncryptKey();
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < model.accounts.length; i++) {
          const item = model.accounts[i];
          if (item.tmpPassword) {
            const encryptPassword = sm2.doEncrypt(
              item.tmpPassword,
              encryptKey.publicKey
            );
            if (!encryptPassword) {
              return;
            }
            item.userCertificate = `04${encryptPassword}`;
            item.passwordKey = encryptKey.key;
            item.tmpPassword = null;
          }
        }
      }
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

const handleAccountCreate = () => dAccount();

const handleStatusChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  model.status = value === "0" ? 0 : 1;
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 800px"
    preset="card"
    :title="addStatus ? '新增' : '修改'"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="closeModel"
  >
    <n-spin :show="dataLoading">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-grid :cols="2" x-gap="36">
          <n-gi>
            <n-form-item path="userName" label="名称">
              <n-input
                v-model:value="model.userName"
                placeholder="请输入用户名称"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="mobile" label="手机号">
              <n-input
                v-model:value="model.mobile"
                placeholder="请输入手机号"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="userSex" label="性别">
              <n-select
                v-model:value="model.userSex"
                placeholder="请选择用户性别"
                :options="oSex"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="roleIds" label="角色">
              <n-select
                v-model:value="model.roleIds"
                :options="roleOption"
                multiple
                placeholder="请选择角色"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="orgId" label="组织">
              <n-tree-select
                v-model:value="model.orgId"
                :options="treeData"
                placeholder="请选择组织"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="email" label="邮箱">
              <n-input
                v-model:value="model.email"
                placeholder="请输入邮箱"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="birthday" label="生日">
              <n-date-picker
                v-model:formatted-value="model.birthday"
                placeholder="请选择用户日期"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="status" label="状态">
              <n-radio
                :checked="model.status === 0"
                value="0"
                name="status"
                @change="handleStatusChange"
              >
                正常
              </n-radio>
              <n-radio
                :checked="model.status === 1"
                value="1"
                name="status"
                @change="handleStatusChange"
              >
                禁用
              </n-radio>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-checkbox v-model:checked="addAccount"> 同时创建账号</n-checkbox>
        <n-divider />
        <n-collapse-transition :show="addAccount">
          <!--suppress TypeScriptValidateTypes -->
          <n-dynamic-input
            v-model:value="model.accounts"
            :on-create="handleAccountCreate"
            #="{ index, value }"
          >
            <div style="display: flex; align-items: center; width: 100%">
              <n-form-item
                ignore-path-change
                :path="`accounts[${index}].userAccount`"
                :show-label="false"
                :rule="accountRule"
              >
                <n-input
                  v-model:value="model.accounts[index].userAccount"
                  type="text"
                  placeholder="请输入账号"
                  style="width: 300px; margin-right: 12px"
                  :disabled="!!value.id"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item
                ignore-path-change
                :path="`accounts[${index}].tmpPassword`"
                :show-label="false"
                :rule="certificateRule"
              >
                <n-input
                  v-model:value="model.accounts[index].tmpPassword"
                  :placeholder="value.id ? '修改密码' : '请输入密码'"
                  style="width: 300px; margin-right: 12px"
                  type="password"
                  :input-props="{ autocomplete: 'new-password' }"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item
                ignore-path-change
                :path="`accounts[${index}].status`"
                :show-label="false"
              >
                <n-switch
                  v-model:value="value.status"
                  :default-value="0"
                  :checked-value="0"
                  :unchecked-value="1"
                />
              </n-form-item>
            </div>
          </n-dynamic-input>
        </n-collapse-transition>
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
