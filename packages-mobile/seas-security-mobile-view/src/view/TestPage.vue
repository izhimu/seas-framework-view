<script setup lang="ts">
import {
  NavBar as VanNavBar,
  Field as VanField,
  Sticky as VanSticky,
  Button as VanButton,
} from "vant";
import { useRect } from "@vant/use";
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
  <van-sticky>
    <van-nav-bar safe-area-inset-top />
  </van-sticky>
  <van-field
    v-for="i in 50"
    :key="i"
    v-model="authStore.token"
    label="Token"
    placeholder="Load Token"
  />
</template>

<style scoped></style>
