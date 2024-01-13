<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import {
  NCard,
  NInput,
  NButton,
  NDataTable,
  NSpace,
  NIcon,
  NSelect,
  NTag,
} from "naive-ui";
import { usePage, useTableButton, SearchIcon } from "@izhimu/seas-core/src";
import { pTimer, oStatus, mType, mStatus } from "../entity/timer";
import { page, del, update, exec } from "../request/timer";
import TimerForm from "./TimerForm.vue";

const formRef = ref();
const { actionButton, confirmButton } = useTableButton();
const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(pTimer()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex: number) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "name",
    sorter: true,
    sortOrder: false,
    sortKey: "name",
  },
  {
    title: "标识",
    key: "key",
    sorter: true,
    sortOrder: false,
    sortKey: "key",
  },
  {
    title: "定时类型",
    key: "type",
    sorter: true,
    sortOrder: false,
    sortKey: "type",
    render(rowData) {
      const tagMap = mType.get(rowData.type ?? -1);
      return h(
        NTag,
        {
          type: tagMap?.tag,
        },
        {
          default: () => tagMap?.title,
        },
      );
    },
  },
  {
    title: "定时规则",
    key: "expression",
    sorter: true,
    sortOrder: false,
    sortKey: "expression",
  },
  {
    title: "开始时间",
    key: "startTime",
    sorter: true,
    sortOrder: false,
    sortKey: "start_time",
  },
  {
    title: "结束时间",
    key: "endTime",
    sorter: true,
    sortOrder: false,
    sortKey: "end_time",
  },
  {
    title: "状态",
    key: "status",
    sorter: true,
    sortOrder: false,
    sortKey: "status",
    render(rowData) {
      const tagMap = mStatus.get(rowData.status ?? -1);
      return h(
        NTag,
        {
          type: tagMap?.tag,
        },
        {
          default: () => tagMap?.title,
        },
      );
    },
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      const btn = [];
      const runBtn = confirmButton(
        "运行",
        "确认运行？",
        "info",
        "job.timer.run",
        () => {
          if (rowData.id) {
            update({
              ...pTimer(),
              id: rowData.id,
              status: 1,
            }).then(queryPage);
          }
        },
        undefined,
        {
          style: "margin-right: 8px;",
        },
      );
      const pauseBtn = confirmButton(
        "暂停",
        "确认暂停？",
        "info",
        "job.timer.pause",
        () => {
          if (rowData.id) {
            update({
              ...pTimer(),
              id: rowData.id,
              status: 0,
            }).then(queryPage);
          }
        },
        undefined,
        {
          style: "margin-right: 8px;",
        },
      );
      const execBtn = confirmButton(
        "执行",
        "确认立即执行？",
        "success",
        "job.timer.exec",
        () => {
          if (rowData.id) {
            exec({
              ...pTimer(),
              id: rowData.id,
            }).then(queryPage);
          }
        },
        undefined,
        {
          style: "margin-right: 8px;",
        },
      );
      const updateBtn = actionButton(
        "修改",
        "info",
        "job.timer.update",
        () => {
          formRef.value.openModel(rowData.id);
        },
        {
          style: "margin-right: 8px;",
        },
      );
      const delBtn = confirmButton(
        "删除",
        "确认删除数据？",
        "error",
        "job.timer.delete",
        () => {
          if (rowData.id) {
            del(rowData.id).then(queryPage);
          }
        },
      );
      if (rowData.status === 0) {
        btn.push(runBtn);
        btn.push(execBtn);
      } else if (rowData.status === 1) {
        btn.push(pauseBtn);
        btn.push(execBtn);
      }
      return [...btn, updateBtn, delBtn];
    },
  },
]);

const handleSearchClick = (e: MouseEvent) => {
  e.preventDefault();
  queryPage();
};

const handleAddClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value.openModel();
};

onMounted(() => queryPage());
</script>

<template>
  <div>
    <div class="box-content">
      <n-space vertical size="large">
        <n-card>
          <n-space>
            <n-input
              v-model:value="search.name"
              placeholder="任务名称"
              clearable
            />
            <n-input
              v-model:value="search.key"
              placeholder="任务标识"
              clearable
            />
            <n-select
              v-model:value="search.status"
              placeholder="状态"
              filterable
              clearable
              :options="oStatus"
            />
            <n-button type="info" @click="handleSearchClick">
              <template #icon>
                <n-icon>
                  <search-icon />
                </n-icon>
              </template>
              搜索
            </n-button>
          </n-space>
        </n-card>
        <n-card>
          <n-space vertical :size="12">
            <n-space>
              <n-button
                v-auth="'job.timer.add'"
                strong
                secondary
                type="info"
                @click="handleAddClick"
                >新增
              </n-button>
            </n-space>
            <n-data-table
              remote
              :loading="pageLoading"
              :bordered="false"
              :columns="columns"
              :data="pageData"
              :pagination="pagination"
              @update:sorter="handleSorter"
              @update:page="queryPage"
            />
          </n-space>
        </n-card>
      </n-space>
    </div>
    <timer-form ref="formRef" @success="queryPage" />
  </div>
</template>

<style scoped></style>
