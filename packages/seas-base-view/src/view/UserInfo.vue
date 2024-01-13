<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  NDrawer,
  NCard,
  NSpace,
  NAvatar,
  NDivider,
  NIcon,
  NButton,
} from "naive-ui";
import { LockClosedOutline, LogOutOutline } from "@vicons/ionicons5";
import { current } from "../request/user";
import { dUser } from "../entity/user";

const emit = defineEmits(["logout", "lock"]);

const active = ref(false);
const userInfo = reactive(dUser());

const open = () => {
  current().then((res) => {
    if (res.data) {
      Object.assign(userInfo, res.data);
    }
  });
  active.value = true;
};

const handleLogout = () => {
  emit("logout");
};

const handleLock = () => {
  emit("lock");
};

defineExpose({ open });
</script>

<template>
  <n-drawer
    v-model:show="active"
    :width="400"
    placement="right"
    :auto-focus="false"
  >
    <n-card :bordered="false" class="card">
      <n-space vertical align="center">
        <n-avatar round :size="80" src="/img/logo.png" color="#ffffff" />
        <div class="name">{{ userInfo.userName }}</div>
        <div>当前登录账号：{{ userInfo.account }}</div>
        <n-divider class="line" />
        <n-space justify="center" :size="40">
          <n-button
            tertiary
            circle
            type="info"
            size="large"
            @click="handleLogout"
          >
            <template #icon>
              <n-icon>
                <log-out-outline />
              </n-icon>
            </template>
          </n-button>
          <n-button
            tertiary
            circle
            type="warning"
            size="large"
            @click="handleLock"
          >
            <template #icon>
              <n-icon>
                <lock-closed-outline />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-drawer>
</template>

<style scoped>
.card {
  padding-top: 60px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.line {
  width: 360px;
}
</style>
