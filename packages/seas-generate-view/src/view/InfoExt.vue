<script setup lang="ts">
import {
  NModal,
  NDynamicInput,
  NScrollbar,
  NInput,
  NInputGroup,
  NTooltip,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core";
import { ref, watch } from "vue";

interface Param {
  name: string;
  key: string;
  value: string;
}

interface Props {
  value: Param[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
});

const emit = defineEmits(["update:value", "on-update:value"]);

const valueRef = ref(props.value);

watch(
  () => props.value,
  (nv) => {
    valueRef.value = nv;
  },
);

watch(valueRef, (nv) => {
  emit("update:value", nv);
});

const { showModel, close } = useFormModel();

const openModel = () => {
  showModel.value = true;
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 600px; height: 500px"
    preset="card"
    title="附加参数"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="close"
  >
    <n-scrollbar style="max-height: 390px">
      <n-dynamic-input
        v-model:value="valueRef"
        preset="pair"
        :on-create="() => ({ name: '', key: '', value: '' })"
      >
        <template #default="{ value }">
          <n-input-group>
            <n-tooltip trigger="hover" :disabled="!value.name">
              <template #trigger>
                <n-input
                  v-model:value="value.key"
                  placeholder="参数名"
                  style="width: 50%"
                />
              </template>
              {{ value.name }}
            </n-tooltip>
            <n-input
              v-model:value="value.value"
              placeholder="默认值"
              style="width: 50%"
            />
          </n-input-group>
        </template>
      </n-dynamic-input>
    </n-scrollbar>
  </n-modal>
</template>

<style scoped></style>
