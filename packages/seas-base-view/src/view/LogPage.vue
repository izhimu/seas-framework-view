<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import {
  NButton,
  NCard,
  NDataTable,
  NDatePicker,
  NIcon,
  NInput,
  NSelect,
  NSpace,
  NTag,
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton, Select } from "@izhimu/seas-core/src";
import { dLog, mMethod, oMethod } from "../entity/log";
import { page } from "../request/log";
import { like } from "../request/user";
import LogForm from "./LogForm.vue";

const userOption = ref<Select[]>([]);
const userSelectLoading = ref(false);

const requestDateSearch = ref(null);
const logRef = ref();
const { actionButton } = useTableButton();
const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(dLog()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "logName",
    sorter: true,
    sortOrder: false,
    sortKey: "log_name",
  },
  {
    title: "路径",
    key: "requestUrl",
    sorter: true,
    sortOrder: false,
    sortKey: "request_url",
  },
  {
    title: "方法",
    key: "method",
    sorter: true,
    sortOrder: false,
    sortKey: "method",
    render(rowData) {
      const tagMap = mMethod.get(rowData.method ?? "OTHER");
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
    title: "账号",
    key: "account",
    sorter: true,
    sortOrder: false,
    sortKey: "account",
  },
  {
    title: "用户",
    key: "userName",
    sorter: true,
    sortOrder: false,
    sortKey: "user_name",
  },
  {
    title: "状态码",
    key: "status",
    sorter: true,
    sortOrder: false,
    sortKey: "status",
  },
  {
    title: "时间",
    key: "requestDate",
    sorter: true,
    sortOrder: false,
    sortKey: "request_date",
  },
  {
    title: "耗时",
    key: "runtimeValue",
    sorter: true,
    sortOrder: false,
    sortKey: "runtime",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "详情",
          "info",
          "log.log.see",
          () => {
            logRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          },
        ),
      ];
    },
  },
]);

const handleSearchClick = (e: MouseEvent) => {
  e.preventDefault();
  queryPage();
};
const handleUserSearch = (query: string) => {
  if (!query.length) {
    userOption.value = [];
    return;
  }
  userSelectLoading.value = true;
  like(query)
    .then((res) => {
      if (res.data) {
        userOption.value = res.data;
      }
    })
    .finally(() => {
      userSelectLoading.value = false;
    });
};

const requestDateChange = (v: [number, number]) => {
  if (v) {
    [search.requestDateStart, search.requestDateEnd] = v;
  }
};

const requestDateClear = () => {
  search.requestDateStart = null;
  search.requestDateEnd = null;
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
              v-model:value="search.logName"
              placeholder="名称"
              clearable
            />
            <n-input
              v-model:value="search.requestUrl"
              placeholder="地址"
              clearable
            />
            <n-select
              v-model:value="search.method"
              placeholder="方法"
              clearable
              filterable
              :options="oMethod"
            />
            <n-select
              v-model:value="search.userId"
              placeholder="用户"
              clearable
              filterable
              remote
              :loading="userSelectLoading"
              :options="userOption"
              @search="handleUserSearch"
            />
            <n-date-picker
              v-model:value="requestDateSearch"
              placeholder="时间"
              type="datetimerange"
              clearable
              @update:value="requestDateChange"
              @clear="requestDateClear"
            />
            <n-input
              v-model:value="search.status"
              placeholder="状态码"
              clearable
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
    <LogForm ref="logRef" />
  </div>
</template>

<style scoped></style>
