<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  NImage,
  NSpin,
  NIcon,
  NIconWrapper,
  NAlert,
  NCollapseTransition,
} from "naive-ui";
import {
  Sync as RefreshIcon,
  ChevronForward as ForwardIcon,
} from "@vicons/ionicons5";
import { sm2 } from "sm-crypto";
import { get, check } from "../request/captcha";
import { Captcha, dCaptcha } from "../entity/captcha";

const colors = [
  ["#448cfe", "#5cb85c", "#d9534f"],
  ["#80b0ff", "#81b881", "#d97d79"],
];

const dMoveStyle = () => ({
  blockLeft: 0,
  blockBg: colors[0][0],
  barWidth: 0,
  barBg: colors[1][0],
});

const emits = defineEmits(["onSuccess", "onError"]);

const captcha = reactive<Captcha>(dCaptcha());

const loading = ref(false);

const tipsType = ref<"default" | "error" | "info" | "success" | "warning">(
  "info",
);

const moveTime = reactive({
  start: 0,
  end: 0,
});
const moveStyle = reactive(dMoveStyle());

const status = ref(false); // 鼠标状态
const isEnd = ref(false); // 是够验证完成
const startLeft = ref(0);

const barArea = ref();

/**
 * 加载验证数据
 */
const loadCaptcha = () => {
  loading.value = true;
  get(captcha)
    .then((res) => {
      if (res.code === "000") {
        Object.assign(captcha, res.data);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

/**
 * 刷新验证数据
 */
const refreshCaptcha = () => {
  isEnd.value = false;
  Object.assign(moveStyle, dMoveStyle());
  loadCaptcha();
};

function start(e: TouchEvent | MouseEvent) {
  moveTime.start = +new Date();
  const x = e instanceof MouseEvent ? e.clientX : e.touches[0].pageX;
  startLeft.value = Math.floor(x - barArea.value.getBoundingClientRect().left);
  moveTime.start = +new Date(); // 开始滑动的时间
  if (isEnd.value === false) {
    [[moveStyle.blockBg], [moveStyle.barBg]] = colors;
    e.stopPropagation();
    status.value = true;
  }
}

// 鼠标移动
function move(e: TouchEvent | MouseEvent) {
  if (status.value && isEnd.value === false) {
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].pageX;
    const barAreaLeft = barArea.value.getBoundingClientRect().left;
    let moveLeft = x - barAreaLeft; // 小方块相对于父元素的left值
    if (moveLeft >= barArea.value.offsetWidth - 23) {
      moveLeft = barArea.value.offsetWidth - 23;
    }
    if (moveLeft <= 0) {
      moveLeft = 25;
    }
    // 拖动后小方块的left值
    moveStyle.blockLeft = moveLeft - startLeft.value;
    moveStyle.barWidth = moveLeft - startLeft.value + 20;
  }
}

// 鼠标松开
function end() {
  moveTime.end = +new Date();
  // 判断是否重合
  if (status.value && isEnd.value === false) {
    const moveLeftDistance = moveStyle.blockLeft;

    captcha.pointJson = `04${sm2.doEncrypt(
      JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
      captcha.secretKey,
    )}`;

    check(captcha).then((res) => {
      if (res.code === "000" && res.data && res.data.result) {
        [[, moveStyle.blockBg], [, moveStyle.barBg]] = colors;
        isEnd.value = true;
        tipsType.value = "success";
        captcha.tips = `${((moveTime.end - moveTime.start) / 1000).toFixed(
          2,
        )}s 验证成功`;
        const content = `${captcha.token}${JSON.stringify({
          x: moveLeftDistance,
          y: 5.0,
        })}`;
        const captchaVerification = sm2.doEncrypt(content, captcha.secretKey);
        setTimeout(() => {
          tipsType.value = "info";
          captcha.tips = "";
          emits("onSuccess", {
            key: captcha.token,
            verify: `04${captchaVerification}`,
          });
        }, 1000);
      } else {
        [[, , moveStyle.blockBg], [, , moveStyle.barBg]] = colors;
        setTimeout(() => {
          refreshCaptcha();
        }, 1000);
        emits("onError");
        tipsType.value = "error";
        captcha.tips = "验证失败";
        setTimeout(() => {
          tipsType.value = "info";
          captcha.tips = "";
        }, 1000);
      }
    });
    status.value = false;
  }
}

function init() {
  loadCaptcha();

  window.removeEventListener("touchmove", (e) => {
    move(e);
  });
  window.removeEventListener("mousemove", (e) => {
    move(e);
  });
  window.removeEventListener("touchend", () => {
    end();
  });
  window.removeEventListener("mouseup", () => {
    end();
  });
  window.addEventListener("touchmove", (e) => {
    move(e);
  });
  window.addEventListener("mousemove", (e) => {
    move(e);
  });
  window.addEventListener("touchend", () => {
    end();
  });
  window.addEventListener("mouseup", () => {
    end();
  });
}

onMounted(() => {
  init();
});
</script>
<template>
  <n-spin :show="loading">
    <div class="verify-img-out">
      <div class="verify-img-panel">
        <n-image
          v-show="!loading"
          :src="`data:image/png;base64,${captcha.originalImage}`"
          preview-disabled
        />
        <n-icon-wrapper
          class="verify-refresh"
          :size="30"
          :border-radius="15"
          color="#ffffff36"
          icon-color="#ffffff"
        >
          <n-icon size="20" @click="refreshCaptcha">
            <refresh-icon />
          </n-icon>
        </n-icon-wrapper>

        <n-collapse-transition :show="!!captcha.tips">
          <n-alert class="verify-img-tips" :type="tipsType"
            >{{ captcha.tips }}
          </n-alert>
        </n-collapse-transition>
      </div>
    </div>
    <!-- 公共部分 -->
    <div ref="barArea" class="verify-bar-area">
      <div
        class="verify-left-bar"
        :style="{
          backgroundColor: moveStyle.barBg,
          width: `${moveStyle.barWidth}px`,
        }"
      >
        <div
          class="verify-move-block"
          :style="{
            '--background-color': moveStyle.blockBg,
            left: `${moveStyle.blockLeft}px`,
          }"
          @touchstart="start"
          @mousedown="start"
        >
          <n-icon size="22">
            <forward-icon />
          </n-icon>
          <div class="verify-sub-block">
            <n-image
              v-show="!loading"
              :src="`data:image/png;base64,${captcha.blockImage}`"
              preview-disabled
            />
          </div>
        </div>
      </div>
    </div>
  </n-spin>
</template>
<style>
.verify-img-out {
  height: 166px;
}

.verify-img-panel {
  width: 310px;
  height: 155px;
  box-sizing: content-box;
  position: relative;
}

.verify-img-panel .verify-refresh {
  margin: 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.verify-img-tips {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: unset;
  z-index: 10;
}

.verify-bar-area {
  width: 310px;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-align: center;
  box-sizing: content-box;
  border-radius: 20px;
  /*noinspection CssUnresolvedCustomProperty*/
  background-color: var(--n-border-color);
}

.verify-bar-area .verify-left-bar {
  border-radius: 20px 0 0 20px;
  transition: background-color 0.3s;
}

.verify-bar-area .verify-move-block {
  --background-color: #448cfe;
  /*noinspection CssUnresolvedCustomProperty*/
  color: var(--n-color-modal);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  box-sizing: content-box;
  background-color: var(--background-color);
  transition:
    background-color 0.3s,
    color 0.3s;
  border-radius: 20px;
}

.verify-bar-area .verify-move-block .verify-sub-block {
  width: 40px;
  height: 160px;
  top: -166px;

  position: absolute;
  text-align: center;
  z-index: 3;
}

.verify-bar-area .verify-left-bar {
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  box-sizing: content-box;
}
</style>
