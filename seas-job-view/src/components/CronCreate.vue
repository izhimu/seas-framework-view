<script setup lang="ts">
import {
  NButton,
  NModal,
  NSpace,
  NTabs,
  NTabPane,
  NRadio,
  NRadioGroup,
  NInput,
  NInputNumber,
  NText,
  NCheckboxGroup,
  NCheckbox,
  NGrid,
  NGi,
  NFormItem,
} from "naive-ui";
import { reactive, ref, watch } from "vue";
import { useFormModel } from "@izhimu/seas-core";

interface Item {
  type: number;
  rule: Array<number>;
}

interface Cron {
  seconds: Item;
  minutes: Item;
  hours: Item;
  days: Item;
  months: Item;
  weeks: Item;
}

const { showModel, open, close, afterClose } = useFormModel();

const emit = defineEmits(["create"]);

const defVal = (): Cron => ({
  seconds: {
    type: 0,
    rule: [],
  },
  minutes: {
    type: 0,
    rule: [],
  },
  hours: {
    type: 0,
    rule: [],
  },
  days: {
    type: 0,
    rule: [],
  },
  months: {
    type: 0,
    rule: [],
  },
  weeks: {
    type: 0,
    rule: [],
  },
});

const cronVal = ref("* * * * * *");

const cron = reactive<Cron>(defVal());

const cronBuild = (item: Item): string => {
  // 从...到...
  if (item.type === 1) {
    if (item.rule.length < 2) {
      item.rule = [0, 0];
    }
    return `${item.rule[0]}-${item.rule[1]}`;
  }
  // 从...开始，每...
  if (item.type === 2) {
    if (item.rule.length < 2) {
      item.rule = [0, 0];
    }
    return `${item.rule[0]}/${item.rule[1]}`;
  }
  // 指定
  if (item.type === 3) {
    if (
      item.rule.length < 1 ||
      (item.rule.length > 2 && item.rule[0] === item.rule[1])
    ) {
      item.rule = [0];
    }
    return item.rule.join(",");
  }
  // 工作日
  if (item.type === 4) {
    if (item.rule.length < 1 || item.rule[0] < 1 || item.rule[0] > 31) {
      item.rule = [1];
    }
    return `${item.rule[0]}W`;
  }
  // 最后一天
  if (item.type === 5) {
    return "L";
  }
  return "*";
};

watch(
  () => cron,
  (val) => {
    const seconds = cronBuild(val.seconds);
    const minutes = cronBuild(val.minutes);
    const hours = cronBuild(val.hours);
    const days = cronBuild(val.days);
    const months = cronBuild(val.months);
    const weeks = cronBuild(val.weeks);
    cronVal.value = `${seconds} ${minutes} ${hours} ${days} ${months} ${weeks}`;
  },
  { deep: true }
);

const handleFocus = (item: Item, type: number) => {
  item.type = type;
};

const handleInputChange = (
  val: number | null,
  item: Item,
  index: number,
  def: number
) => {
  item.rule[index] = val ?? def;
};

const handleCheckboxChange = (val, item: Item) => {
  item.rule = val;
};

const handleCreate = () => {
  emit("create", cronVal.value);
  close();
};

afterClose(() => {
  cronVal.value = "";
  Object.assign(cron, defVal());
});

defineExpose({
  open,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 700px"
    preset="card"
    title="Cron表达式生成"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="close"
  >
    <n-form-item label="Cron表达式" label-placement="left">
      <n-input v-model:value="cronVal" readonly />
    </n-form-item>
    <n-tabs type="segment" animated>
      <n-tab-pane
        class="rule-box"
        name="seconds"
        tab="秒"
        display-directive="show:lazy"
      >
        <n-radio-group v-model:value="cron.seconds.type" name="seconds">
          <n-space vertical>
            <n-radio class="line" :value="0"> 每秒</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.seconds, 1)"
            >
              <n-radio :value="1">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.seconds, 0, 0)"
              />
              <n-text>到</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.seconds, 1, 0)"
              />
              <n-text>秒</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.seconds, 2)"
            >
              <n-radio :value="2">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.seconds, 0, 0)"
              />
              <n-text>秒开始，每</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.seconds, 1, 0)"
              />
              <n-text>秒执行一次</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.seconds, 3)"
            >
              <n-radio :value="3">指定</n-radio>
              <n-checkbox-group
                @update:value="handleCheckboxChange($event, cron.seconds)"
              >
                <n-grid x-gap="8" :cols="10">
                  <n-gi v-for="i in 60" :key="'seconds' + i">
                    <n-checkbox :value="i - 1" :label="String(i - 1)" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-space>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane
        class="rule-box"
        name="minutes"
        tab="分"
        display-directive="show:lazy"
      >
        <n-radio-group v-model:value="cron.minutes.type" name="minutes">
          <n-space vertical>
            <n-radio class="line" :value="0"> 每分钟</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.minutes, 1)"
            >
              <n-radio :value="1">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.minutes, 0, 0)"
              />
              <n-text>到</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.minutes, 1, 0)"
              />
              <n-text>分钟</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.minutes, 2)"
            >
              <n-radio :value="2">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.minutes, 0, 0)"
              />
              <n-text>分钟开始，每</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.minutes, 1, 0)"
              />
              <n-text>分钟执行一次</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.minutes, 3)"
            >
              <n-radio :value="3">指定</n-radio>
              <n-checkbox-group
                @update:value="handleCheckboxChange($event, cron.minutes)"
              >
                <n-grid x-gap="8" :cols="10">
                  <n-gi v-for="i in 60" :key="'minutes' + i">
                    <n-checkbox :value="i - 1" :label="String(i - 1)" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-space>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane
        class="rule-box"
        name="hours"
        tab="时"
        display-directive="show:lazy"
      >
        <n-radio-group v-model:value="cron.hours.type" name="hours">
          <n-space vertical>
            <n-radio class="line" :value="0"> 每小时</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.hours, 1)"
            >
              <n-radio :value="1">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="23"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.hours, 0, 0)"
              />
              <n-text>到</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="23"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.hours, 1, 0)"
              />
              <n-text>小时</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.hours, 2)"
            >
              <n-radio :value="2">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="59"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.hours, 0, 0)"
              />
              <n-text>分钟开始，每</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="23"
                :min="0"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.hours, 1, 0)"
              />
              <n-text>小时执行一次</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.hours, 3)"
            >
              <n-radio :value="3">指定</n-radio>
              <n-checkbox-group
                @update:value="handleCheckboxChange($event, cron.hours)"
              >
                <n-grid x-gap="8" :cols="6">
                  <n-gi v-for="i in 24" :key="'hours' + i">
                    <n-checkbox :value="i - 1" :label="String(i - 1)" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-space>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane
        class="rule-box"
        name="days"
        tab="日"
        display-directive="show:lazy"
      >
        <n-radio-group v-model:value="cron.days.type" name="days">
          <n-space vertical>
            <n-radio class="line" :value="0"> 每日</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.days, 1)"
            >
              <n-radio :value="1">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="31"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.days, 0, 0)"
              />
              <n-text>到</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="31"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.days, 1, 0)"
              />
              <n-text>日</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.days, 2)"
            >
              <n-radio :value="2">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="31"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.days, 0, 0)"
              />
              <n-text>日开始，每</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="31"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.days, 1, 0)"
              />
              <n-text>日执行一次</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.days, 4)"
            >
              <n-radio :value="4">每月</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="31"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.days, 0, 0)"
              />
              <n-text>号最近的那个工作日</n-text>
            </n-space>
            <n-radio class="line" :value="5">本月最后一天</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.days, 3)"
            >
              <n-radio :value="3">指定</n-radio>
              <n-checkbox-group
                @update:value="handleCheckboxChange($event, cron.days)"
              >
                <n-grid x-gap="8" :cols="7">
                  <n-gi v-for="i in 31" :key="'days' + i">
                    <n-checkbox :value="i" :label="String(i)" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-space>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane
        class="rule-box"
        name="months"
        tab="月"
        display-directive="show:lazy"
      >
        <n-radio-group v-model:value="cron.months.type" name="months">
          <n-space vertical>
            <n-radio class="line" :value="0"> 每月</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.months, 1)"
            >
              <n-radio :value="1">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="12"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.months, 0, 0)"
              />
              <n-text>到</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="12"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.months, 1, 0)"
              />
              <n-text>月</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.months, 2)"
            >
              <n-radio :value="2">周期从</n-radio>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="12"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.months, 0, 0)"
              />
              <n-text>月开始，每</n-text>
              <n-input-number
                style="width: 60px"
                :show-button="false"
                :max="12"
                :min="1"
                :precision="0"
                size="small"
                @update:value="handleInputChange($event, cron.months, 1, 0)"
              />
              <n-text>月执行一次</n-text>
            </n-space>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.months, 3)"
            >
              <n-radio :value="3">指定</n-radio>
              <n-checkbox-group
                @update:value="handleCheckboxChange($event, cron.months)"
              >
                <n-grid x-gap="8" :cols="6">
                  <n-gi v-for="i in 12" :key="'months' + i">
                    <n-checkbox :value="i" :label="String(i)" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-space>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane
        class="rule-box"
        name="weeks"
        tab="周"
        display-directive="show:lazy"
      >
        <n-radio-group v-model:value="cron.weeks.type" name="weeks">
          <n-space vertical>
            <n-radio class="line" :value="0"> 每周</n-radio>
            <n-space
              class="line"
              size="small"
              @click="handleFocus(cron.weeks, 3)"
            >
              <n-radio :value="3">指定</n-radio>
              <n-checkbox-group
                @update:value="handleCheckboxChange($event, cron.weeks)"
              >
                <n-grid x-gap="8" :cols="7">
                  <n-gi v-for="i in 7" :key="'weeks' + i">
                    <n-checkbox :value="i" :label="String(i)" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-space>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
    </n-tabs>
    <template #action>
      <n-space justify="end">
        <n-button @click="close">关闭</n-button>
        <n-button type="info" @click="handleCreate">生成</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped>
.line {
  line-height: 32px;
}

.rule-box {
  height: 400px;
}
</style>
