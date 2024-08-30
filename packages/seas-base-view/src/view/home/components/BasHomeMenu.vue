<script setup lang="ts">
import { NMenu, NScrollbar, NDropdown } from "naive-ui";
import { useCommonStore } from "@izhimu/seas-core";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useLogo, useMenu } from "../../../hooks";
import { useConfigStore, useMenuStore } from "../../../store";

const props = defineProps<{
  collapsed?: boolean;
}>();

const router = useRouter();
const commonStore = useCommonStore();
const menuStore = useMenuStore();
const configStore = useConfigStore();
const { logoOptions, handleLogoClick } = useLogo();
const { menuRef, menuOptions, loadMenuData, handleMenuClick } = useMenu();

const topicRef = ref();

onMounted(() => {
  loadMenuData();
  // 加载历史路由
  if (
    commonStore.currentRoute !== "" &&
    router
      .getRoutes()
      .flatMap((v) => v.name)
      .indexOf(commonStore.currentRoute) >= 0
  ) {
    router.push({ name: commonStore.currentRoute });
  }
});
</script>

<template>
  <n-menu
    class="home-logo"
    :value="null"
    :collapsed="props.collapsed"
    :collapsed-width="64"
    :icon-size="configStore.logo.iconSize"
    :options="logoOptions"
    :on-update:value="handleLogoClick"
    :inverted="configStore.home.menuInverted"
  />
  <n-scrollbar style="height: calc(100vh - 120px)">
    <n-menu
      ref="menuRef"
      v-model:value="menuStore.active"
      :collapsed="props.collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :on-update:value="handleMenuClick"
      :inverted="configStore.home.menuInverted"
    />
  </n-scrollbar>
  <n-dropdown trigger="click" :width="240" :options="[]">
    <n-menu
      ref="topicRef"
      value="topic"
      :collapsed="props.collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="[
        {
          label: '主题1',
          key: 'topic',
        },
      ]"
    />
  </n-dropdown>
</template>

<style>
.home-logo .n-menu-item {
  height: 52px;
}
</style>
