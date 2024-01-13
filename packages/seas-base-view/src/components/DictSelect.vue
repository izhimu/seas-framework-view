<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Size } from "naive-ui/es/select/src/interface";
import { NSelect, NInput } from "naive-ui";
import { select } from "../request/dict";

interface Props {
  value: string | null;
  code: string;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  filterable?: boolean;
}

// noinspection TypeScriptValidateTypes
const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  size: "medium",
  filterable: true,
});

const emit = defineEmits(["update:value", "on-update:value"]);

const options = ref();
const valueRef = ref(props.value ?? null);
const labelRef = ref();

const findLabel = () => {
  if (!options.value) {
    return;
  }
  const filter = options.value.filter((v) => v.value === valueRef.value);
  if (filter.length > 0) {
    labelRef.value = filter[0].label;
  }
};

watch(
  () => props.value,
  (value) => {
    valueRef.value = value;
    findLabel();
  },
);

watch(valueRef, (nv) => {
  emit("update:value", nv);
});

const handleUpdateValue = (value) => {
  emit("on-update:value", value);
};

onMounted(() => {
  select(props.code).then((res) => {
    if (res.code === "000") {
      options.value = res.data;
      findLabel();
    }
  });
});
</script>

<template>
  <n-select
    v-if="!readonly"
    v-model:value="valueRef"
    :options="options"
    :placeholder="placeholder ?? null"
    :size="size ?? 'medium'"
    :disabled="disabled"
    :clearable="clearable ?? false"
    :multiple="multiple ?? false"
    :filterable="filterable ?? true"
    style="width: 100%"
    @update:value="handleUpdateValue"
  />
  <n-input v-else v-model:value="labelRef" :readonly="true" />
</template>

<style scoped></style>
