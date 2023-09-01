<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  FormInst,
  FormRules,
  NModal,
  NSpace,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NSpin,
  NSelect,
  NDatePicker,
  NCheckbox,
  useMessage,
  NCollapseTransition,
} from "naive-ui";
import { useFormModel } from "@izhimu/seas-core";
import { dTimer, oType, oUnit } from "../entity/timer";
import { get, save, update } from "../request/timer";
import CronCreate from "../components/CronCreate.vue";

const message = useMessage();
const { btnLoading, dataLoading, showModel, addStatus, open, close } =
  useFormModel();

const emits = defineEmits(["success"]);

const cronRef = ref();

const init = ref(true);
const unit = ref("s");
const dateRange = ref();
const model = reactive(dTimer());
const formRef = ref<FormInst>();
const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: "请输入任务名称",
    },
  ],
  key: [
    {
      required: true,
      message: "请输入任务标识",
    },
  ],
  type: [
    {
      required: true,
      message: "请输入定时类型",
    },
  ],
  expression: [
    {
      required: true,
      message: "请输入定时规则",
    },
  ],
  classPath: [
    {
      required: true,
      message: "请输入类路径",
    },
  ],
});

const openModel = (id?: string) => {
  Object.assign(model, dTimer());
  unit.value = "s";
  dateRange.value = undefined;
  open(!id);
  if (id) {
    dataLoading.value = true;
    get(id)
      .then((res) => {
        Object.assign(model, res.data);
        if (model.expression && model.type && model.type === 2) {
          const num = model.expression.match(/\d+/g);
          const str = model.expression.match(/[a-z|A-Z]+/g);
          [model.expression] = num ?? [""];
          [unit.value] = str ?? ["s"];
        }
        if (model.startTime && model.endTime) {
          dateRange.value = [model.startTime, model.endTime];
        }
      })
      .finally(() => {
        dataLoading.value = false;
      });
  }
};

const onSuccess = () => {
  message.success("提交成功");
  emits("success");
};

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (model.type === 2) {
        model.expression += unit.value;
      }
      if (dateRange.value) {
        [model.startTime, model.endTime] = dateRange.value;
      } else {
        model.startTime = null;
        model.endTime = null;
      }
      btnLoading.value = true;
      if (addStatus.value) {
        if (init.value) {
          model.status = 1;
        }
        save(model)
          .then(() => {
            onSuccess();
            close();
          })
          .finally(() => {
            btnLoading.value = false;
          });
      } else {
        model.status = 1;
        update(model)
          .then(() => {
            onSuccess();
            close();
          })
          .finally(() => {
            btnLoading.value = false;
          });
      }
    }
  });
};

const handleSelectChange = () => {
  model.expression = null;
  if (model.type === 1) {
    model.startTime = null;
    model.endTime = null;
    dateRange.value = null;
  }
};

const handleCron = () => {
  cronRef.value.open();
};

const handleCronCreate = (val: string) => {
  model.expression = val;
};

defineExpose({
  openModel,
});
</script>

<template>
  <n-modal
    v-model:show="showModel"
    style="width: 500px"
    preset="card"
    :title="addStatus ? '新增' : '修改'"
    :bordered="false"
    :segmented="{ content: true, action: true }"
    :mask-closable="false"
    @close="close"
  >
    <n-spin :show="dataLoading">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name" label="任务名称">
          <n-input
            v-model:value="model.name"
            placeholder="请输入任务名称"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="key" label="任务标识">
          <n-input
            v-model:value="model.key"
            placeholder="请输入任务标识"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="type" label="定时类型">
          <n-select
            v-model:value="model.type"
            filterable
            :options="oType"
            @update:value="handleSelectChange"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="expression" label="定时规则">
          <n-input-group v-if="model.type === 0">
            <n-input
              v-model:value="model.expression"
              placeholder="请输入Cron表达式"
              @keydown.enter.prevent
            />
            <n-button ghost :style="{ width: '80px' }" @click="handleCron"
              >生成</n-button
            >
          </n-input-group>
          <n-date-picker
            v-else-if="model.type === 1"
            v-model:formatted-value="model.expression"
            class="fill-width"
            type="datetime"
            clearable
            placeholder="请选择执行时间"
            @keydown.enter.prevent
          />
          <n-input-group v-else-if="model.type === 2">
            <n-input
              v-model:value="model.expression"
              :allow-input="(value: string) => !value || /^\d+$/.test(value)"
              class="fill-width"
              placeholder="请输入间隔时间"
              @keydown.enter.prevent
            />
            <n-select
              v-model:value="unit"
              :style="{ width: '100px' }"
              :options="oUnit"
              @keydown.enter.prevent
            />
          </n-input-group>
        </n-form-item>
        <n-collapse-transition :show="model.type !== 1">
          <n-form-item path="startTime" label="起止时间">
            <n-date-picker
              v-model:formatted-value="dateRange"
              class="fill-width"
              type="datetimerange"
              clearable
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-collapse-transition>
        <n-form-item path="classPath" label="类路径">
          <n-input
            v-model:value="model.classPath"
            placeholder="请输入类路径"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="param" label="参数">
          <n-input
            v-model:value="model.param"
            type="textarea"
            placeholder="请输入参数"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-checkbox v-if="addStatus" v-model:checked="init"
          >立即生效
        </n-checkbox>
      </n-form>
    </n-spin>
    <template #action>
      <n-space justify="end">
        <n-button @click="close">关闭</n-button>
        <n-button
          type="info"
          :loading="btnLoading"
          :disabled="dataLoading"
          @click="handleSubmit"
          >提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
  <cron-create ref="cronRef" @create="handleCronCreate" />
</template>

<style scoped></style>
