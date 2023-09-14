<script setup lang="ts">
import { computed, h, onMounted, ref, shallowRef } from "vue";
import { useStore } from "vuex";
import { RouterLink, useRouter } from "vue-router";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NIcon,
  NEl,
  NButton,
  NImage,
  NSpace,
  NCard,
  NDropdown,
  NDrawer,
  NScrollbar,
  useMessage,
  useDialog,
  useNotification,
  useLoadingBar,
  darkTheme,
  MenuOption,
} from "naive-ui";
import {
  PersonCircle,
  LockClosed,
  Share,
  Sunny,
  Moon,
} from "@vicons/ionicons5";
import LockPage from "@izhimu/seas-security-view/src/view/LockPage.vue";
import { logout } from "@izhimu/seas-security-view/src/request/security";
import { useIcon, event, CoreStore } from "@izhimu/seas-core";
import { SecurityState } from "@izhimu/seas-security-view";
import { auth } from "../request/menu";
import UserInfo from "./UserInfo.vue";
import { BaseState } from "../store/module/base.ts";

/**
 * 挂载全局对象
 */
window.$message = useMessage();
window.$notification = useNotification();
window.$loadingBar = useLoadingBar();

const store = useStore();
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const { renderIcon, iconMap } = useIcon();
const {
  core: coreStore,
  security: securityStore,
  base: baseStore,
}: { core: CoreStore; security: SecurityState; base: BaseState } = store.state;

const renderLink = (name: string, title: string) => {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name,
        },
      },
      { default: () => title }
    );
};

const activeKey = ref<unknown>(null);
const collapsed = ref(true);
const menuOptions = ref();
const loadMenuData = () => {
  const result: Array<MenuOption> = [];
  const authComponents: string[] = [];
  const map = new Map();
  auth().then((res) => {
    if (res.code === "000") {
      res.data?.forEach((item) => {
        if (item.id && item.id !== "1" && item.menuCode && item.menuName) {
          if (item.menuType === 0) {
            if (item.menuUrl === "") {
              map.set(item.id, {
                id: item.id,
                label: item.menuName,
                key: item.menuCode,
              });
            } else {
              map.set(item.id, {
                id: item.id,
                label: renderLink(item.menuCode, item.menuName),
                key: item.menuCode,
              });
            }
            const icon = iconMap.get(item.menuCode);
            if (icon) {
              map.get(item.id).icon = icon;
            }
          }
          authComponents.push(item.menuCode);
        }
      });
      res.data?.forEach((item) => {
        if (
          item.id &&
          item.parentId &&
          item.parentId !== "0" &&
          item.menuType === 0
        ) {
          const parent = map.get(item.parentId);
          if (parent) {
            (parent.children || (parent.children = [])).push(map.get(item.id));
          } else {
            result.push(map.get(item.id));
          }
        }
      });
      menuOptions.value = result;
      store.commit("setAuthComponents", authComponents);
    }
  });
};

/**
 * 切换主题
 */
const themeNight = computed(() => !!store.state.core.theme);
const themeIcon = shallowRef(themeNight.value ? Moon : Sunny);
const theme = (isNight: boolean) => {
  themeIcon.value = isNight ? Moon : Sunny;
  store.commit("switchTheme", isNight ? darkTheme : null);
};
const handleThemeClick = () => theme(!themeNight.value);

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

const handleLock = () => {
  dialog.create({
    title: "临时锁定",
    content: "是否确定临时锁定？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      logout().then((res) => {
        if (res.code === "000") {
          const lockUser = {
            account: store.state.security?.loginUser?.account,
            userName: "系统管理员",
          };
          store.commit("setLoginUser", null);
          store.commit("setLockUser", lockUser);
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
          store.commit("setLoginUser", null);
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
  activeKey.value = data;
});
event.on("toLogin", () => {
  store.commit("setLoginUser", null);
  router.push({ path: "/login" });
});

onMounted(() => {
  loadMenuData();
});
</script>

<template>
  <div>
    <n-layout>
      <n-layout-header>
        <n-el class="home-header n-card n-card--bordered">
          <n-el
            class="home-logo"
            :style="{ width: baseStore.logoConfig?.titleWidth }"
            @click="router.push('/index')"
          >
            <n-image
              v-if="baseStore.logoConfig?.icon"
              preview-disabled
              :src="baseStore.logoConfig?.iconSrc"
              :height="baseStore.logoConfig.iconSize"
              style="margin: 16px"
            />
            <n-el class="home-logo-text">{{
              baseStore.logoConfig?.title ?? coreStore.appName
            }}</n-el>
          </n-el>
          <n-el class="home-top"></n-el>
          <n-space class="home-esc" justify="end" size="small">
            <n-button quaternary circle @click="handleThemeClick">
              <n-icon :component="themeIcon" />
            </n-button>
            <n-dropdown :options="escOptions" @select="handleEscClick">
              <n-button quaternary round>{{
                securityStore?.loginUser?.userName
              }}</n-button>
            </n-dropdown>
          </n-space>
        </n-el>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          class="home-menu"
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="260"
          :collapsed="collapsed"
          :native-scrollbar="false"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
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
  </div>
</template>

<style scoped>
.home-header {
  padding: 0 16px;
  height: 64px;
  display: grid;
  grid-template-columns: 284px calc(100vw - 600px) auto;
}

.home-menu {
  height: calc(100vh - 64px);
}

.home-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.home-logo-text {
  font-size: 20px;
  font-weight: bold;
}

.home-esc {
  display: flex;
  align-items: center;
  width: 284px;
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
