<script setup lang="ts">
import { ref, reactive } from "vue";
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
  NTime,
  useMessage,
} from "naive-ui";
import { sm2 } from "sm-crypto";
import { ChevronForward as ArrowIcon } from "@vicons/ionicons5";
import { CoreStore } from "@izhimu/seas-core";
import { system, webview } from "../assets/js/osInfo";
import { encrypt, login } from "../request/security";
import { dEncryptKey, dLogin, dLoginUser } from "../entity/security";
import VerifyBox from "../components/VerifyBox.vue";

/**
 * 挂载全局对象
 */
window.$message = useMessage();

const store = useStore();
const formRef = ref<FormInst | null>(null);
const time = ref(new Date());
const loading = ref(false);
const verifyRef = ref();
const { state }: { state: CoreStore } = store;

const emit = defineEmits(["unlock"]);

setInterval(() => {
  time.value = new Date();
}, 1000);

const rules = ref<FormRules>({
  tmpPassword: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
});

const model = reactive(dLogin());

const encryptKey = reactive(dEncryptKey());

const loginUser = reactive(dLoginUser());

const getEncryptKey = async () => {
  const res = await encrypt();
  Object.assign(encryptKey, res.data);
};

const handleUnlockClick = (e: MouseEvent) => {
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
    encryptKey.publicKey
  );
  if (!encryptPassword) {
    return;
  }
  model.account = store.state.security.lockUser?.account;
  model.passwordKey = encryptKey.key;
  model.password = `04${encryptPassword}`;
  model.timestamp = new Date().getTime();
  model.deviceName = webview();
  model.systemVersion = system().name;
  model.tmpPassword = null;
  login(model)
    .then((res) => {
      if (res.code === "000") {
        Object.assign(loginUser, res.data);
        loginUser.account = store.state.security.lockUser?.account;
        store.commit("setLoginUser", loginUser);
        store.commit("setLockUser", null);
        emit("unlock");
      } else {
        getEncryptKey();
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const onSuccess = (v: { key: string; verify: string }) => {
  if (v) {
    model.verifyCode = v.verify;
    model.verifyCodeKey = v.key;
    loginHandler();
  }
};
</script>

<template>
  <div>
    <div class="inner-header">
      <n-layout-content :class="state.theme ? 'lock-page-dark' : 'lock-page'">
        <div class="lock-grid">
          <div class="lock-head">
            <div class="lock-title">Seas</div>
            <div class="lock-time">
              <n-time :time="time" format="HH:mm:ss" />
            </div>
          </div>
        </div>
        <div class="lock-grid">
          <div class="lock-form">
            <n-card title="系统管理员">
              <n-form
                ref="formRef"
                :model="model"
                :rules="rules"
                :show-require-mark="false"
              >
                <n-form-item path="tmpPassword" label="密码">
                  <n-input
                    v-model:value="model.tmpPassword"
                    type="password"
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
                        @click="handleUnlockClick"
                      >
                        <template #icon>
                          <n-icon>
                            <arrow-icon />
                          </n-icon>
                        </template>
                        解锁
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
      <verify-box ref="verifyRef" @on-success="onSuccess" />
    </div>
  </div>
</template>

<style scoped>
/*noinspection CssUnusedSymbol*/
.lock-page {
  height: 100vh;
  position: relative;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
}

/*noinspection CssUnusedSymbol*/
.lock-page-dark {
  height: 100vh;
  position: relative;
  background: linear-gradient(60deg, rgb(35, 24, 77) 0%, rgb(0, 65, 77) 100%);
}

.lock-grid {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-form {
  width: 360px;
}

.lock-head {
  margin: 10% 0 6% 0;
}

.lock-title {
  color: #ffffff;
  font-size: 40px;
  text-align: center;
}

.lock-time {
  color: #ffffff;
  margin-top: 24px;
  font-size: 80px;
  text-align: center;
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
