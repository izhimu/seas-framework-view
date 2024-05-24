<script setup lang="ts">
import { Field as VanField } from "vant";
import { onMounted } from "vue";
import { current } from "../request/user";
import { useAuthStore } from "../store";

const authStore = useAuthStore();

onMounted(() => {
  current().then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <van-field v-model="authStore.token" label="Token" placeholder="Load Token" />
</template>

<style scoped></style>
