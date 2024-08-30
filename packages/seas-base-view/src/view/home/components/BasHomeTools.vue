<script setup lang="ts">
import {
  NButton,
  NCard,
  NDrawer,
  NDropdown,
  NFlex,
  NIcon,
  useDialog,
  useMessage,
} from "naive-ui";
import { ref, shallowRef } from "vue";
import {
  PersonCircle,
  LockClosed,
  Share,
  Sunny,
  Moon,
  Key,
  Expand,
  Contract,
} from "@vicons/ionicons5";
import { useIcon, useThemeStore } from "@izhimu/seas-core";
import { useUserStore } from "@izhimu/seas-security-view";
import { logout } from "@izhimu/seas-security-view/src/request/security.ts";
import { useRouter } from "vue-router";
import LockPage from "@izhimu/seas-security-view/src/view/LockPage.vue";
import UserInfo from "../../UserInfo.vue";
import ChangePasswordForm from "../../ChangePasswordForm.vue";

/**
 * 切换主题
 */
const themeStore = useThemeStore();
const themeIcon = shallowRef(themeStore.isDark() ? Moon : Sunny);
const handleThemeClick = () => {
  themeIcon.value = themeStore.isDark() ? Sunny : Moon;
  themeStore.toggle();
};

/**
 * 切换全屏
 */
const fullScreen = ref(false);
const fullScreenIcon = shallowRef(Expand);
const handleFullScreenClick = () => {
  if (document.fullscreenEnabled) {
    fullScreenIcon.value = fullScreen.value ? Expand : Contract;
    fullScreen.value = !fullScreen.value;
    if (fullScreen.value) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
};

/**
 * 系统菜单
 */
const userStore = useUserStore();
const dialog = useDialog();
const message = useMessage();
const { renderIcon } = useIcon();
const router = useRouter();
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
</script>

<template>
  <n-flex justify="end" size="small">
    <n-button quaternary circle @click="handleThemeClick">
      <n-icon :component="themeIcon" />
    </n-button>
    <n-button quaternary circle @click="handleFullScreenClick">
      <n-icon :component="fullScreenIcon" />
    </n-button>
    <n-dropdown :options="escOptions" @select="handleEscClick">
      <n-button quaternary round>{{ userStore.current.userName }} </n-button>
    </n-dropdown>
  </n-flex>
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
</template>

<style scoped></style>
