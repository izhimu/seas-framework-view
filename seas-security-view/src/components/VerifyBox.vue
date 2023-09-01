<script setup lang="ts">
import { ref } from "vue";
import { NModal } from "naive-ui";
import VerifySlide from "./VerifySlide.vue";

const emits = defineEmits(["onSuccess", "onError"]);

const showModel = ref(false);

const show = () => {
  showModel.value = true;
};

const close = () => {
  showModel.value = false;
};

const onSuccess = (captchaVerification: string) => {
  close();
  emits("onSuccess", captchaVerification);
};

defineExpose({
  show,
});
</script>
<template>
  <n-modal
    v-model:show="showModel"
    preset="card"
    title="请完成安全验证"
    size="small"
    style="width: 342px; user-select: none"
    :mask-closable="false"
  >
    <VerifySlide
      ref="instance"
      @on-success="onSuccess"
      @on-error="emits('onError')"
    />
  </n-modal>
</template>
<style></style>
