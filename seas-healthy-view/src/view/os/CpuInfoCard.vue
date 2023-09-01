<script setup lang="ts">
import {
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NGi,
  NGrid,
  NLog,
  NProgress,
  NTag,
  NSpace,
  NNumberAnimation,
  NStatistic,
  NIcon,
} from "naive-ui";
import {
  PersonCircle,
  SyncCircle,
  ListCircle,
  Speedometer,
} from "@vicons/ionicons5";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { cpu, info, sensors } from "../../request/os.ts";
import { dCpuInfo, dSensors } from "../../entity/os.ts";

const cpuInfo = reactive(dCpuInfo());
const sensorsInfo = reactive(dSensors());
const interval = ref();
const osInfo = ref();
const oldNum = ref(0);

const loadCpuInfo = () => {
  oldNum.value = cpuInfo.sys + cpuInfo.user;
  cpu().then((res) => {
    Object.assign(cpuInfo, res.data);
  });
};

const loadOsInfo = () => {
  info().then((res) => {
    osInfo.value = res.data;
  });
};

const loadSensorsInfo = () => {
  sensors().then((res) => {
    Object.assign(sensorsInfo, res.data);
  });
};

onMounted(() => {
  loadOsInfo();
  loadCpuInfo();
  loadSensorsInfo();
  interval.value = setInterval(() => {
    loadCpuInfo();
    loadSensorsInfo();
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <n-card title="CPU信息">
    <n-grid x-gap="12" :cols="4" item-responsive>
      <n-gi>
        <n-space justify="center" style="padding: 20px">
          <n-progress
            type="multiple-circle"
            :circle-gap="0.5"
            :percentage="[cpuInfo.free, cpuInfo.user, cpuInfo.sys]"
            :color="[
              'var(--info-color)',
              'var(--success-color)',
              'var(--warning-color)',
            ]"
            :rail-style="[
              { stroke: 'var(--info-color)', opacity: 0.2 },
              { stroke: 'var(--success-color)', opacity: 0.2 },
              { stroke: 'var(--warning-color)', opacity: 0.2 },
            ]"
          >
            <n-statistic tabular-nums>
              <n-number-animation
                ref="numberAnimationInstRef"
                :from="oldNum"
                :to="cpuInfo.sys + cpuInfo.user"
                :precision="2"
                :duration="1000"
              />
              %
            </n-statistic>
          </n-progress>
        </n-space>
        <n-space justify="center">
          <n-tag type="info" size="small" round :bordered="false">
            空闲: {{ cpuInfo.free }} %
            <template #icon>
              <n-icon :component="SyncCircle" />
            </template>
          </n-tag>
          <n-tag type="success" size="small" round :bordered="false">
            用户: {{ cpuInfo.user }} %
            <template #icon>
              <n-icon :component="PersonCircle" />
            </template>
          </n-tag>
          <n-tag type="warning" size="small" round :bordered="false">
            系统: {{ cpuInfo.sys }} %
            <template #icon>
              <n-icon :component="ListCircle" />
            </template>
          </n-tag>
        </n-space>
      </n-gi>
      <n-gi span="0:3">
        <n-grid :cols="2" item-responsive>
          <n-gi>
            <n-descriptions
              label-placement="left"
              :column="1"
              :content-style="{ width: 'calc(100% - 70px)' }"
            >
              <n-descriptions-item label="系统版本">
                {{ osInfo }}
              </n-descriptions-item>
              <n-descriptions-item label="CPU型号">
                <n-log
                  :font-size="16"
                  :line-height="1.5"
                  :rows="9"
                  :log="cpuInfo.model"
                />
              </n-descriptions-item>
            </n-descriptions>
          </n-gi>
          <n-gi>
            <n-descriptions label-placement="left" :column="1">
              <n-descriptions-item label="CPU温度">
                {{ sensorsInfo.cpuTemperature }} °C
              </n-descriptions-item>
              <n-descriptions-item label="CPU电压">
                {{ sensorsInfo.cpuVoltage }} V
              </n-descriptions-item>
              <n-descriptions-item label="风扇转速">
                <n-space>
                  <n-tag
                    v-for="(fan, index) in sensorsInfo.fanSpeeds"
                    :key="index"
                    size="small"
                    round
                    :bordered="false"
                  >
                    {{ fan }} rpm
                    <template #icon>
                      <n-icon :component="Speedometer" /> </template
                  ></n-tag>
                </n-space>
              </n-descriptions-item>
            </n-descriptions>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<style scoped></style>
