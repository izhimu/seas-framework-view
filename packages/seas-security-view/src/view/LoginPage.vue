<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from "vue";
import { useStore } from "vuex";
import {
  FormInst,
  FormRules,
  NForm,
  NFormItem,
  NLayoutContent,
  NRow,
  NCol,
  NInput,
  NButton,
  NCard,
  NIcon,
  useNotification,
  useMessage,
  useOsTheme,
  useLoadingBar,
  darkTheme,
} from "naive-ui";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { sm2 } from "sm-crypto";
import { ChevronForward as ArrowIcon } from "@vicons/ionicons5";
import { CoreStore, router } from "@izhimu/seas-core/src";
import { system, webview } from "../assets/js/osInfo";
import { encrypt, login } from "../request/security";
import { dEncryptKey, dLogin, dLoginUser } from "../entity/security";
import VerifyBox from "../components/VerifyBox.vue";

/**
 * 挂载全局对象
 */
window.$message = useMessage();
window.$notification = useNotification();
window.$loadingBar = useLoadingBar();

const store = useStore();
const message = useMessage();
const notification = useNotification();
const formRef = ref<FormInst | null>(null);
const loading = ref(false);
const verifyRef = ref();
const { state } = store;
const { core: coreStore }: { core: CoreStore } = state;

const rules = ref<FormRules>({
  account: [
    {
      required: true,
      message: "请输入账号",
    },
  ],
  tmpPassword: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
});

const model = reactive(dLogin());
const loginUser = reactive(dLoginUser());

const encryptKey = reactive(dEncryptKey());
const getEncryptKey = async () => {
  const res = await encrypt();
  Object.assign(encryptKey, res.data);
};

const handleLoginClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      verifyRef.value.show();
    }
  });
};

const loginHandler = async () => {
  if (!model.tmpPassword) {
    return;
  }
  loading.value = true;
  await getEncryptKey();
  const encryptPassword = sm2.doEncrypt(
    model.tmpPassword,
    encryptKey.publicKey,
  );

  if (!encryptPassword) {
    return;
  }
  model.passwordKey = encryptKey.key;
  model.password = `04${encryptPassword}`;
  model.timestamp = new Date().getTime();
  const fpPromise = FingerprintJS.load();
  const fp = await fpPromise;
  const result = await fp.get();
  model.deviceId = result.visitorId;
  model.deviceName = webview();
  model.systemVersion = system().name;
  model.tmpPassword = null;
  login(model)
    .then((res) => {
      if (res.code === "000") {
        Object.assign(loginUser, res.data);
        loginUser.account = model.account;
        store.commit("setLoginUser", loginUser);
        store.commit("setLockUser", null);
        message.success("登录成功");
        router().push({ path: "/" });
      } else {
        getEncryptKey();
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

/**
 * 自动切换主题
 */
const osTheme = useOsTheme();
const themeNight = computed(() => !!store.state.core.theme);
const autoTheme = () => {
  if (osTheme.value === "dark" && !themeNight.value) {
    const n = notification.create({
      title: "深色模式",
      content: "当前系统为深色模式，是否将页面切换为深色模式",
      duration: 10000,
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: "primary",
            onClick: () => {
              n.destroy();
              store.commit("switchTheme", darkTheme);
            },
          },
          {
            default: () => "切换",
          },
        ),
    });
  }
};

const onSuccess = (v: { key: string; verify: string }) => {
  if (v) {
    model.verifyCode = v.verify;
    model.verifyCodeKey = v.key;
    loginHandler();
  }
};

onMounted(() => {
  autoTheme();
});
</script>

<template>
  <div>
    <div class="inner-header">
      <n-layout-content
        :class="coreStore.theme ? 'login-page-dark' : 'login-page'"
      >
        <div class="login-grid">
          <div class="login-head">
            <div class="login-title">{{ coreStore.appName }}</div>
          </div>
        </div>
        <div class="login-grid">
          <div class="login-form">
            <n-card title="登录">
              <n-form
                ref="formRef"
                :model="model"
                :rules="rules"
                :show-require-mark="false"
              >
                <n-form-item path="account" label="账号">
                  <n-input
                    v-model:value="model.account"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <n-form-item path="tmpPassword" label="密码">
                  <n-input
                    v-model:value="model.tmpPassword"
                    type="password"
                    show-password-on="mousedown"
                    autocomplete="off"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                  <n-col :span="24">
                    <div style="display: flex; justify-content: flex-end">
                      <n-button
                        round
                        type="primary"
                        :loading="loading"
                        @click="handleLoginClick"
                      >
                        <template #icon>
                          <n-icon>
                            <arrow-icon />
                          </n-icon>
                        </template>
                        登录
                      </n-button>
                    </div>
                  </n-col>
                </n-row>
              </n-form>
            </n-card>
          </div>
        </div>
      </n-layout-content>
    </div>
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            :fill="state.theme ? 'rgba(9,4,38,0.7)' : 'rgba(255,255,255,0.7)'"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            :fill="state.theme ? 'rgba(9,4,38,0.5)' : 'rgba(255,255,255,0.5)'"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            :fill="state.theme ? 'rgba(9,4,38,0.3)' : 'rgba(255,255,255,0.3)'"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="7"
            :fill="state.theme ? 'rgb(9,4,38)' : 'rgb(255,255,255)'"
          />
        </g>
      </svg>
    </div>
    <verify-box ref="verifyRef" @on-success="onSuccess" />
  </div>
</template>

<style scoped>
/*noinspection CssUnusedSymbol*/
.login-page {
  height: 100vh;
  position: relative;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
}

/*noinspection CssUnusedSymbol*/
.login-page-dark {
  height: 100vh;
  position: relative;
  background: linear-gradient(60deg, rgb(35, 24, 77) 0%, rgb(0, 65, 77) 100%);
}

.login-grid {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 360px;
}

.login-head {
  margin: 100px 0 60px 0;
}

.login-title {
  color: #ffffff;
  font-size: 40px;
}

.inner-header {
  height: calc(100vh - 150px);
}

.waves {
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: -6px;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/
@media (max-height: 650px) {
  .waves {
    display: none;
  }
}
</style>
