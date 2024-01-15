<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  NModal,
  NForm,
  FormRules,
  NFormItem,
  NInput,
  NSpace,
  NButton,
  useMessage,
} from "naive-ui";
import { sm2 } from "sm-crypto";
import { useFormModel } from "@izhimu/seas-core";
import { dEncryptKey, encrypt, useUserStore } from "@izhimu/seas-security-view";
import { dPassword } from "../entity/account";
import { changePassword } from "../request/user";

const userStore = useUserStore();
const message = useMessage();
const { btnLoading, showModel } = useFormModel();

const model = reactive(dPassword());
const formRef = ref();

const rules = ref<FormRules>({
  originalPassword: [
    {
      required: true,
      message: "请输入原密码",
    },
  ],
  newPassword: [
    {
      required: true,
      message: "请输入新密码",
    },
  ],
  tmpPassword: [
    {
      required: true,
      validator: (_, value: string) => {
        if (!value) {
          return new Error("请再次输入新密码");
        }
        if (model.newPassword !== model.tmpPassword) {
          return new Error("两次新密码输入不一致");
        }
        return true;
      },
    },
  ],
});

const openModel = async () => {
  Object.assign(model, dPassword());
  showModel.value = true;
};

const closeModel = () => {
  showModel.value = false;
};

const encryptKey = reactive(dEncryptKey());
const getEncryptKey = async () => {
  const res = await encrypt();
  Object.assign(encryptKey, res.data);
};

const handleSubmit = async () => {
  const errors = await formRef.value?.validate();
  if (errors) {
    return;
  }
  await getEncryptKey();
  if (!model.originalPassword || !model.newPassword) {
    return;
  }
  const encryptOriginalPassword = sm2.doEncrypt(
    model.originalPassword,
    encryptKey.publicKey,
  );
  const encryptNewPassword = sm2.doEncrypt(
    model.newPassword,
    encryptKey.publicKey,
  );
  if (!encryptNewPassword || !encryptOriginalPassword) {
    return;
  }
  model.userAccount = userStore.current.account;
  model.userCertificate = `04${encryptNewPassword}`;
  model.originalCertificate = `04${encryptOriginalPassword}`;
  model.passwordKey = encryptKey.key;

  model.originalPassword = null;
  model.newPassword = null;
  model.tmpPassword = null;

  btnLoading.value = true;
  changePassword(model)
    .then((res) => {
      if (res.data) {
        message.success("密码修改成功");
        closeModel();
      } else {
        message.error(res.tips ?? "密码修改失败");
      }
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 600px"
    preset="card"
    title="修改密码"
    :bordered="false"
    :segmented="{ content: true, action: false }"
    :mask-closable="false"
    @close="closeModel"
  >
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="originalPassword" label="原密码">
        <n-input
          v-model:value="model.originalPassword"
          type="password"
          :input-props="{ autocomplete: 'new-password' }"
          placeholder="请输入原密码"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="newPassword" label="新密码">
        <n-input
          v-model:value="model.newPassword"
          type="password"
          :input-props="{ autocomplete: 'new-password' }"
          placeholder="请输入新密码"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="tmpPassword" label="确认密码">
        <n-input
          v-model:value="model.tmpPassword"
          type="password"
          :input-props="{ autocomplete: 'new-password' }"
          placeholder="请再次输入新密码"
          @keydown.enter.prevent
        />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space justify="end">
        <n-button @click="closeModel">关闭</n-button>
        <n-button type="info" :loading="btnLoading" @click="handleSubmit"
          >提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
