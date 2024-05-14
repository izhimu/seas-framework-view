<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Icon as VanIcon, Image as VanImage, showNotify } from "vant";
import { sm2 } from "sm-crypto";
import { get, check } from "../request/captcha";
import { Captcha, dCaptcha } from "../entity/captcha";

const { clientWidth } = document.documentElement;
const scale = clientWidth / 310;

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

let compensate = 0;

function start(e: TouchEvent | MouseEvent) {
  moveTime.start = +new Date();
  const x = e instanceof MouseEvent ? e.clientX : e.touches[0].pageX;
  const barAreaLeft = barArea.value.getBoundingClientRect().left;
  const moveLeft = x - barAreaLeft;
  compensate = 23.5 * scale - moveLeft;
  startLeft.value = Math.floor(moveLeft);
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
    if (moveLeft >= barArea.value.offsetWidth - compensate - 23.5 * scale) {
      moveLeft = barArea.value.offsetWidth - compensate - 23.5 * scale;
    }
    if (moveLeft <= -compensate + 23.5 * scale) {
      moveLeft = -compensate + 23.5 * scale;
    }
    // 拖动后小方块的left值
    moveStyle.blockLeft = moveLeft - startLeft.value;
    moveStyle.barWidth = moveLeft - startLeft.value + 23.5 * scale;
  }
}

// 鼠标松开
function end() {
  moveTime.end = +new Date();
  // 判断是否重合
  if (status.value && isEnd.value === false) {
    const moveLeftDistance = moveStyle.blockLeft / scale;

    captcha.pointJson = `04${sm2.doEncrypt(
      JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
      captcha.secretKey,
    )}`;

    check(captcha).then((res) => {
      if (res.code === "000" && res.data && res.data.result) {
        [[, moveStyle.blockBg], [, moveStyle.barBg]] = colors;
        isEnd.value = true;
        showNotify({
          type: "success",
          message: `${((moveTime.end - moveTime.start) / 1000).toFixed(
            2,
          )}s 验证成功`,
        });
        const content = `${captcha.token}${JSON.stringify({
          x: moveLeftDistance,
          y: 5.0,
        })}`;
        const captchaVerification = sm2.doEncrypt(content, captcha.secretKey);
        emits("onSuccess", {
          key: captcha.token,
          verify: `04${captchaVerification}`,
        });
      } else {
        [[, , moveStyle.blockBg], [, , moveStyle.barBg]] = colors;
        setTimeout(() => {
          refreshCaptcha();
        }, 1000);
        showNotify({
          type: "danger",
          message: "验证失败",
        });
        emits("onError");
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
  <div class="verify-img-out" :style="{ marginBottom: `${scale * 14}px` }">
    <div
      class="verify-img-panel"
      :style="{ width: `${310 * scale}px`, height: `${155 * scale}px` }"
    >
      <van-image
        v-show="!loading"
        :src="`data:image/png;base64,${captcha.originalImage}`"
        :width="`${310 * scale}px`"
        :height="`${155 * scale}px`"
      />
      <div class="verify-refresh-panel">
        <van-icon
          class="verify-refresh"
          name="replay"
          :size="22"
          color="#ffffff"
          @click="refreshCaptcha"
        />
      </div>
    </div>
  </div>
  <!-- 公共部分 -->
  <div
    ref="barArea"
    class="verify-bar-area"
    :style="{
      height: `${47 * scale}px`,
      lineHeight: `${47 * scale}px`,
      borderRadius: `${47 * scale}px`,
    }"
  >
    <div
      class="verify-left-bar"
      :style="{
        backgroundColor: moveStyle.barBg,
        width: `${moveStyle.barWidth}px`,
        height: `${47 * scale}px`,
        borderRadius: `${47 * scale}px 0 0 ${47 * scale}px`,
      }"
    >
      <div
        class="verify-move-block"
        :style="{
          '--background-color': moveStyle.blockBg,
          left: `${moveStyle.blockLeft}px`,
          width: `${47 * scale}px`,
          height: `${47 * scale}px`,
          borderRadius: `${47 * scale}px`,
        }"
        @touchstart="start"
        @mousedown="start"
      >
        <van-icon :size="22" name="arrow" color="#ffffff" />
        <div class="verify-sub-block" :style="{ top: `-${169 * scale}px` }">
          <van-image
            v-show="!loading"
            :src="`data:image/png;base64,${captcha.blockImage}`"
            :width="scale * 47"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.verify-img-panel {
  box-sizing: content-box;
  position: relative;
}

.verify-img-panel .verify-refresh-panel {
  margin: 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.verify-refresh-panel {
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
}

.verify-bar-area {
  position: relative;
  text-align: center;
  box-sizing: content-box;
  background-color: rgb(239, 239, 245);
}

.verify-bar-area .verify-left-bar {
  transition: background-color 0.3s;
}

.verify-bar-area .verify-move-block {
  --background-color: #448cfe;
  color: #ffffff;
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
}

.verify-bar-area .verify-move-block .verify-sub-block {
  position: absolute;
  text-align: center;
  z-index: 3;
}

.verify-bar-area .verify-left-bar {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  box-sizing: content-box;
}
</style>
