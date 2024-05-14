<script setup lang="ts">
import { ref } from "vue";
import { sm2 } from "sm-crypto";
import VerifySlide from "../components/VerifySlide.vue";
import { EncryptData } from "../entity/login.ts";

const instance = ref<InstanceType<typeof VerifySlide>>();

const onSuccess = (captchaVerification: string) => {
  const jsBridge = window.kmpJsBridge;
  jsBridge.callNative(
    "verifyCode",
    JSON.stringify(captchaVerification),
    async (data: string) => {
      const encryptData: EncryptData = JSON.parse(data);
      if (encryptData.login.password) {
        encryptData.login.password = sm2.doEncrypt(
          encryptData.login.password,
          encryptData.publicKey,
        );
        jsBridge.callNative("sm2", JSON.stringify(encryptData.login));
      }
    },
  );
};

const onError = () => {};
</script>

<template>
  <VerifySlide ref="instance" @on-success="onSuccess" @on-error="onError" />
</template>

<style scoped></style>
