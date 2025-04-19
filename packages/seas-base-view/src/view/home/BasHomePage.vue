<script setup lang="ts">
import { ref } from "vue";
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NLayoutHeader,
  NEl,
  NScrollbar,
} from "naive-ui";
import { event } from "@izhimu/seas-core";
import { useUserStore } from "@izhimu/seas-security-view";
import { useRouter } from "vue-router";
import { useMenuStore, useConfigStore } from "../../store";
import BasHomeTab from "./components/BasHomeTab.vue";
import BasHomeMenu from "./components/BasHomeMenu.vue";
import BasHomeTools from "./components/BasHomeTools.vue";
import BasHomeAiChat from "./components/BasHomeAiChat.vue";

const router = useRouter();
const userStore = useUserStore();
const menuStore = useMenuStore();
const configStore = useConfigStore();
// -- 事件监听 --
event.on("routerChange", (data) => {
  menuStore.active = data;
});
event.on("toLogin", () => {
  userStore.logout();
  router.push({ path: "/login" });
});

const menuCollapsed = ref(false);
</script>

<template>
  <div>
    <n-layout>
      <n-layout has-sider>
        <n-layout-sider
          class="home-menu"
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="200"
          :collapsed="menuCollapsed"
          :native-scrollbar="false"
          show-trigger
          :inverted="configStore.home.menuInverted"
          @collapse="menuCollapsed = true"
          @expand="menuCollapsed = false"
        >
          <bas-home-menu :collapsed="menuCollapsed" />
        </n-layout-sider>
        <n-layout>
          <n-layout-header>
            <n-el class="home-header">
              <n-el class="home-top">
                <bas-home-tab />
              </n-el>
              <n-el class="home-tools">
                <bas-home-tools />
              </n-el>
            </n-el>
          </n-layout-header>
          <n-layout-content class="home-content">
            <n-scrollbar style="max-height: calc(100vh - 56px)">
              <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                  <keep-alive>
                    <component :is="Component" />
                  </keep-alive>
                </transition>
              </router-view>
            </n-scrollbar>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout>
    <bas-home-ai-chat v-if="configStore.home.aiChat" />
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.home-logo .n-menu-item {
  height: 44px;
}

.home-logo .n-menu-divider {
  margin-bottom: 0;
}
</style>

<style scoped>
.home-header {
  padding: 0 16px;
  height: 56px;
  display: grid;
  grid-template-columns: auto max-content;
}

.home-menu {
  height: 100vh;
}

.home-top {
  display: flex;
}

/*noinspection CssUnresolvedCustomProperty*/
.home-tools {
  height: 52px;
  display: flex;
  align-items: center;
  margin: auto 0;
  padding: 0 12px;
  background-color: var(--card-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);
}

/*noinspection CssUnusedSymbol*/
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

/*noinspection CssUnusedSymbol*/
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

/*noinspection CssUnusedSymbol*/
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
