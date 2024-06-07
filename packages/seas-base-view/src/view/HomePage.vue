<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NIcon,
  NEl,
  NButton,
  NSpace,
  NCard,
  NDropdown,
  NDrawer,
  NScrollbar,
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

const userStore = useUserStore();
const themeStore = useThemeStore();
const commonStore = useCommonStore();
const configStore = useConfigStore();
const menuStore = useMenuStore();
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const { renderIcon } = useIcon();
const { menuRef, menuCollapsed, menuOptions, loadMenuData, handleMenuClick } =
  useMenu();
const { logoOptions, handleLogoClick } = useLogo();

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

/**
 * 事件监听
 */
event.on("routerChange", (data) => {
  menuStore.active = data;
});
event.on("toLogin", () => {
  userStore.logout();
  router.push({ path: "/login" });
});

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
          <n-layout-content>
            <n-el class="home-header">
              <n-el class="home-top"></n-el>
              <n-space class="home-esc" justify="end" size="small">
                <n-button quaternary circle @click="handleThemeClick">
                  <n-icon :component="themeIcon" />
                </n-button>
                <n-dropdown :options="escOptions" @select="handleEscClick">
                  <n-button quaternary round
                    >{{ userStore.current.userName }}
                  </n-button>
                </n-dropdown>
              </n-space>
            </n-el>
          </n-layout-content>
          <n-layout-content class="home-content">
            <n-scrollbar style="max-height: calc(100vh - 64px)">
              <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                  <component :is="Component" />
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
  grid-template-columns: auto 200px;
}

.home-menu {
  height: 100vh;
}

.home-esc {
  display: flex;
  align-items: center;
  background-color: var(--card-color);
  border: 1px solid var(--divider-color);
  border-radius: 32px;
  margin: 6px 0;
  padding-right: 12px;
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
