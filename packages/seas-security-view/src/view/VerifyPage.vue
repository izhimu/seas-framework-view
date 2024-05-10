<script setup lang="ts">
import { ref } from "vue";
import VerifySlide from "../components/VerifySlide.vue";

const instance = ref<InstanceType<typeof VerifySlide>>();

const onSuccess = (captchaVerification: string) => {
  console.log(captchaVerification);
};

const onError = () => {};
</script>

<template>
  <VerifySlide ref="instance" @on-success="onSuccess" @on-error="onError" />
</template>

<style scoped></style>
