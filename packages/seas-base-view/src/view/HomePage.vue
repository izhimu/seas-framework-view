<script setup lang="ts">
import { nextTick, onMounted, ref, shallowRef, watch, h } from "vue";
import { useRouter } from "vue-router";
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NLayoutHeader,
  NMenu,
  NIcon,
  NEl,
  NButton,
  NFlex,
  NCard,
  NDropdown,
  NDrawer,
  NScrollbar,
  NTag,
  useMessage,
  useDialog,
} from "naive-ui";
import {
  PersonCircle,
  LockClosed,
  Share,
  Sunny,
  Moon,
  Key,
  Menu as IconMenu,
} from "@vicons/ionicons5";
import LockPage from "@izhimu/seas-security-view/src/view/LockPage.vue";
import { logout } from "@izhimu/seas-security-view/src/request/security";
import {
  useIcon,
  event,
  useThemeStore,
  useCommonStore,
} from "@izhimu/seas-core";
import { useUserStore } from "@izhimu/seas-security-view";
import { useConfigStore, useMenuStore } from "../store";
import UserInfo from "./UserInfo.vue";
import ChangePasswordForm from "./ChangePasswordForm.vue";
import { useLogo, useMenu } from "../hooks";
import { TabItem } from "../store/menu.ts";

const configStore = useConfigStore();

// -- 菜单区域 --
const { logoOptions, handleLogoClick } = useLogo();
const { menuRef, menuCollapsed, menuOptions, loadMenuData, handleMenuClick } =
  useMenu();

// -- 页签区域 --
const router = useRouter();
const menuStore = useMenuStore();
const tabType = (key: string): "info" | "default" =>
  menuStore.active === key ? "info" : "default";
const handleTabClick = (key: string) => {
  router.push({ name: key });
};
const handleTabClose = (tab: TabItem) => {
  const index = menuStore.tabs.indexOf(tab);
  menuStore.tabs.splice(index, 1);
  if (menuStore.active === tab.key) {
    if (index <= menuStore.tabs.length - 1) {
      router.push({ name: menuStore.tabs[index].key });
    } else if (index !== 0) {
      router.push({ name: menuStore.tabs[index - 1].key });
    } else {
      router.push("/index");
    }
  }
};

const currentTab = ref<TabItem>();
const showTabOption = ref(false);
const tabOptionX = ref(0);
const tabOptionY = ref(0);
const tabOption = [
  {
    key: "close",
    label: "关闭",
  },
  {
    key: "closeOther",
    label: "关闭其他标签页",
  },
  {
    key: "closeAll",
    label: "关闭所有标签页",
  },
];
const handleTabContextMenu = (e: MouseEvent, tab: TabItem) => {
  e.preventDefault();
  currentTab.value = tab;
  showTabOption.value = false;
  nextTick().then(() => {
    showTabOption.value = true;
    tabOptionX.value = e.clientX;
    tabOptionY.value = e.clientY;
  });
};
const handleTabClickoutside = () => {
  showTabOption.value = false;
};
const handleTabOptionSelect = (key: string) => {
  showTabOption.value = false;
  if (key === "close") {
    if (currentTab.value) {
      handleTabClose(currentTab.value);
    }
  } else if (key === "closeOther") {
    if (currentTab.value) {
      menuStore.tabs.length = 0;
      menuStore.tabs.push(currentTab.value);
      if (menuStore.active !== currentTab.value.key) {
        router.push({ name: currentTab.value.key });
      }
    }
  } else if (key === "closeAll") {
    menuStore.tabs.length = 0;
    router.push("/index");
  }
};

const tabList = ref<TabItem[]>([]);
const tabMergeList = ref<TabItem[]>([]);
const topRef = ref();
const topWidth = ref(0);
const tabRef = ref();
const tabWidth = ref(0);
const updateTabWidth = () => {
  if (tabRef.value) {
    tabWidth.value = tabRef.value.$el.offsetWidth;
  }
};
const updateTopWidth = () => {
  if (topRef.value) {
    topWidth.value = topRef.value.$el.offsetWidth;
  }
};
const updateTabList = () => {
  tabList.value.length = 0;
  Object.assign(tabList.value, menuStore.tabs);
};
const updateTabMergeList = () => {
  if (
    topWidth.value - (tabWidth.value ?? 0) <= 82 &&
    tabList.value.length > 0
  ) {
    const tab = tabList.value.shift();
    if (tab) {
      tabMergeList.value.push(tab);
    }
  } else if (
    topWidth.value - (tabWidth.value ?? 0) >= 192 &&
    tabMergeList.value.length > 0
  ) {
    const tab = tabMergeList.value.pop();
    if (tab) {
      tabList.value.unshift(tab);
    }
  }
};
const renderTabMerge = ({ option }) => {
  return h(
    NFlex,
    {},
    {
      default: () =>
        h(
          NTag,
          {
            style: {
              cursor: "pointer",
              margin: "3px 6px",
            },
            type: tabType(option.key),
            size: "large",
            bordered: false,
            closable: true,
            onClick: () => handleTabClick(option.key),
            onClose: () => handleTabClose(option),
            onContextmenu: (e) => handleTabContextMenu(e, option),
          },
          { default: () => option.name },
        ),
    },
  );
};

// -- 系统菜单 --
const userStore = useUserStore();
const themeStore = useThemeStore();
const dialog = useDialog();
const message = useMessage();
const { renderIcon } = useIcon();
/**
 * 切换主题
 */
const themeIcon = shallowRef(themeStore.isDark() ? Moon : Sunny);
const handleThemeClick = () => {
  themeIcon.value = themeStore.isDark() ? Sunny : Moon;
  themeStore.toggle();
};

/**
 * 系统菜单
 */
const userInfoRef = ref();
const lock = ref(false);
const escOptions = [
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(PersonCircle),
  },
  {
    label: "修改密码",
    key: "password",
    icon: renderIcon(Key),
  },
  {
    label: "临时锁定",
    key: "lock",
    icon: renderIcon(LockClosed),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(Share),
  },
];

const changePasswordRef = ref();
const handlePassword = () => {
  changePasswordRef.value.openModel();
};

const handleLock = () => {
  dialog.create({
    title: "临时锁定",
    content: "是否确定临时锁定？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      logout().then((res) => {
        if (res.code === "000") {
          userStore.lock();
          lock.value = true;
        }
      });
    },
  });
};

const handleLogout = () => {
  dialog.create({
    title: "退出登录",
    content: "是否确定退出系统？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      logout().then((res) => {
        if (res.code === "000") {
          userStore.logout();
          message.success("退出成功");
          router.push({ path: "/login" });
        }
      });
    },
  });
};

const handleEscClick = (key: string) => {
  if (key === "profile") {
    userInfoRef.value.open();
  } else if (key === "password") {
    handlePassword();
  } else if (key === "lock") {
    handleLock();
  } else if (key === "logout") {
    handleLogout();
  }
};
const handleUnlock = () => {
  lock.value = false;
};

// -- 事件监听 --
event.on("routerChange", (data) => {
  menuStore.active = data;
});
event.on("toLogin", () => {
  userStore.logout();
  router.push({ path: "/login" });
});

const commonStore = useCommonStore();
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

  watch(menuStore.tabs, () => {
    tabMergeList.value.length = 0;
    updateTabList();
  });
  watch(tabList.value, () => {
    nextTick(() => {
      updateTopWidth();
      updateTabWidth();
      updateTabMergeList();
    });
  });
  updateTabList();
  window.addEventListener("resize", () => {
    updateTopWidth();
    updateTabMergeList();
  });
});
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
          :width="260"
          :collapsed="menuCollapsed"
          :native-scrollbar="false"
          show-trigger
          @collapse="menuCollapsed = true"
          @expand="menuCollapsed = false"
        >
          <n-menu
            :value="null"
            :collapsed="menuCollapsed"
            :collapsed-width="64"
            :icon-size="configStore.logo.iconSize"
            :options="logoOptions"
            :on-update:value="handleLogoClick"
            class="home-logo"
          />
          <n-scrollbar style="height: calc(100vh - 70px)">
            <n-menu
              ref="menuRef"
              v-model:value="menuStore.active"
              :collapsed="menuCollapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :on-update:value="handleMenuClick"
            />
          </n-scrollbar>
        </n-layout-sider>
        <n-layout>
          <n-layout-header>
            <n-el class="home-header">
              <n-el ref="topRef" class="home-top">
                <n-flex class="home-tab" :wrap="false">
                  <n-dropdown
                    trigger="hover"
                    :options="tabMergeList"
                    :render-option="renderTabMerge"
                  >
                    <n-button
                      class="home-tab-merge"
                      :style="{
                        width: 0,
                        opacity: tabMergeList.length > 0 ? 1 : 0,
                        marginLeft: `${tabMergeList.length > 0 ? 0 : -47}px`,
                      }"
                      quaternary
                      round
                      :type="
                        tabMergeList.some((tab) => tab.key === menuStore.active)
                          ? 'info'
                          : 'default'
                      "
                    >
                      <template #icon>
                        <n-icon><icon-menu /></n-icon>
                      </template>
                    </n-button>
                  </n-dropdown>
                  <n-el class="home-tab-list">
                    <n-flex ref="tabRef" :wrap="false">
                      <n-tag
                        v-for="tab in tabList"
                        :key="tab.key"
                        :type="tabType(tab.key)"
                        class="home-tab-item"
                        size="large"
                        :bordered="false"
                        round
                        closable
                        @click="handleTabClick(tab.key)"
                        @close="handleTabClose(tab)"
                        @contextmenu="handleTabContextMenu($event, tab)"
                        >{{ tab.name }}
                      </n-tag>
                    </n-flex>
                  </n-el>
                </n-flex>
                <n-dropdown
                  placement="bottom-start"
                  trigger="manual"
                  :x="tabOptionX"
                  :y="tabOptionY"
                  :options="tabOption"
                  :show="showTabOption"
                  :on-clickoutside="handleTabClickoutside"
                  @select="handleTabOptionSelect"
                />
              </n-el>
              <n-flex class="home-esc" justify="end" size="small">
                <n-button quaternary circle @click="handleThemeClick">
                  <n-icon :component="themeIcon" />
                </n-button>
                <n-dropdown :options="escOptions" @select="handleEscClick">
                  <n-button quaternary round
                    >{{ userStore.current.userName }}
                  </n-button>
                </n-dropdown>
              </n-flex>
            </n-el>
          </n-layout-header>
          <n-layout-content class="home-content">
            <n-scrollbar style="max-height: calc(100vh - 64px)">
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
    <n-drawer
      v-model:show="lock"
      :close-on-esc="false"
      :mask-closable="false"
      placement="top"
      height="100vh"
    >
      <lock-page @unlock="handleUnlock" />
    </n-drawer>
    <n-card style="display: none"></n-card>
    <user-info ref="userInfoRef" @logout="handleLogout" @lock="handleLock" />
    <change-password-form ref="changePasswordRef" />
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.home-logo .n-menu-item {
  height: 52px;
}

.home-logo .n-menu-divider {
  margin-bottom: 0;
}
</style>

<style scoped>
.home-header {
  padding: 0 16px;
  height: 64px;
  display: grid;
  grid-template-columns: auto 174px;
}

.home-menu {
  height: 100vh;
}

.home-top {
  display: flex;
}

.home-tab {
  width: 100%;
  margin: auto 16px auto 0;
}

.home-tab-merge {
  transition: all 0.3s;
}

.home-tab-list {
  overflow: hidden;
  white-space: nowrap;
}
.home-tab-item {
  cursor: pointer;
}

/*noinspection CssUnresolvedCustomProperty*/
.home-esc {
  height: 52px;
  display: flex;
  align-items: center;
  border-radius: 32px;
  margin: auto 0;
  padding-right: 12px;
  background-color: var(--card-color);
  border: 1px solid var(--divider-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);
}

.home-logo {
  padding: 0;
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
