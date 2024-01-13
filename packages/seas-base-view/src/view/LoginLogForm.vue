<script setup lang="ts">
import { reactive } from "vue";
import {
  NModal,
  NDescriptions,
  NDescriptionsItem,
  NTag,
  NIcon,
} from "naive-ui";
import {
  LogoWindows,
  LogoChrome,
  LogoApple,
  LogoEdge,
  LogoFirefox,
  Globe,
  LogoTux,
} from "@vicons/ionicons5";
import { useFormModel } from "@izhimu/seas-core/src";
import { LoginLog, dLoginLog, mStatus } from "../entity/loginLog";

const { showModel } = useFormModel();

const model = reactive(dLoginLog());

const openModel = async (data: LoginLog) => {
  showModel.value = true;
  Object.assign(model, data);
};

const closeModel = () => {
  showModel.value = false;
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 800px"
    preset="card"
    title="详情"
    :bordered="false"
    :segmented="{ content: true, action: false }"
    :mask-closable="false"
    @close="closeModel"
  >
    <n-descriptions label-placement="left">
      <n-descriptions-item label="账号">
        {{ model.account }}
      </n-descriptions-item>
      <n-descriptions-item label="用户">
        {{ model.userName }}
      </n-descriptions-item>
      <n-descriptions-item label="状态">
        <n-tag size="small" :type="mStatus.get(model.status ?? -1)?.tag">
          {{ mStatus.get(model.status ?? -1)?.title }}
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="IP">
        {{ model.loginIp }}
      </n-descriptions-item>
      <n-descriptions-item label="地址">
        {{ model.loginAddress }}
      </n-descriptions-item>
      <n-descriptions-item label="时间">
        {{ model.loginTime }}
      </n-descriptions-item>
      <n-descriptions-item label="设备">
        <n-tag size="small">
          {{ model.loginDevice ? model.loginDevice : "未知" }}
          <template #icon>
            <n-icon
              :component="
                (model.loginDevice?.indexOf('Chrome') ?? -1) >= 0
                  ? LogoChrome
                  : (model.loginDevice?.indexOf('IE') ?? -1) >= 0 ||
                      (model.loginDevice?.indexOf('Edge') ?? -1) >= 0
                    ? LogoEdge
                    : (model.loginDevice?.indexOf('Safari') ?? -1) >= 0
                      ? LogoApple
                      : (model.loginDevice?.indexOf('Firefox') ?? -1) >= 0
                        ? LogoFirefox
                        : Globe
              "
            />
          </template>
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="系统">
        <n-tag size="small">
          {{ model.loginOsVersion ? model.loginOsVersion : "未知" }}
          <template #icon>
            <n-icon
              :component="
                (model.loginOsVersion?.indexOf('Windows') ?? -1) >= 0
                  ? LogoWindows
                  : (model.loginOsVersion?.indexOf('Chrome') ?? -1) >= 0
                    ? LogoChrome
                    : (model.loginOsVersion?.indexOf('Mac') ?? -1) >= 0
                      ? LogoApple
                      : LogoTux
              "
            />
          </template>
        </n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="版本">
        <n-tag size="small"> v{{ model.loginVersion }} </n-tag>
      </n-descriptions-item>
    </n-descriptions>
  </n-modal>
</template>

<style scoped></style>
