<!--suppress ALL -->
<script setup lang="ts">
import { computed, reactive } from "vue";
import {
  NConfigProvider,
  NNotificationProvider,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NScrollbar,
  NEl,
  zhCN,
  dateZhCN,
  GlobalThemeOverrides,
} from "naive-ui";
import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import rust from "highlight.js/lib/languages/rust";
import { useThemeStore } from "./store";

const themeStore = useThemeStore();

/**
 * 主题配置
 */
const bodyColor = computed(() =>
  themeStore.isDark() ? "#101014FF" : "#F8F8F8",
);
const themeOverrides: GlobalThemeOverrides = reactive({
  common: {
    primaryColor: "#448cfe",
    primaryColorHover: "#5d9cff",
    primaryColorPressed: "#3b7ce5",
    primaryColorSuppl: "#205dbe",
    bodyColor,
  },
});

/**
 * 代码高亮
 */
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("rust", rust);
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="themeStore.theme"
    :theme-overrides="themeOverrides"
    :hljs="hljs"
  >
    <n-notification-provider placement="bottom-right">
      <n-message-provider :max="1">
        <n-dialog-provider>
          <n-loading-bar-provider>
            <n-scrollbar style="max-height: 100vh">
              <n-el class="app-space">
                <router-view v-slot="{ Component }">
                  <transition name="fade-bottom" mode="out-in">
                    <component :is="Component" />
                  </transition>
                </router-view>
              </n-el>
            </n-scrollbar>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.app-space {
  width: 100vw;
  height: 100vh;
  border-radius: unset;
}

/*noinspection CssUnusedSymbol*/
.box-content {
  padding: 16px;
}

.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.fade-bottom-enter-from {
  opacity: 0;
  transform: translateY(-10%);
}

.fade-bottom-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

.fill-width {
  width: 100%;
}

.state-box {
  margin: 10%;
}
</style>
