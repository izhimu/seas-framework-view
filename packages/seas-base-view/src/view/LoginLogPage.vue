<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import {
  NCard,
  NInput,
  NButton,
  NDataTable,
  NSpace,
  NIcon,
  NTag,
  NSelect,
  NDatePicker,
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton, Select } from "@izhimu/seas-core/src";
import { dLoginLog, mStatus, oStatus } from "../entity/loginLog";
import { page } from "../request/loginLog";
import { like, likeAccount } from "../request/user";
import LoginLogForm from "./LoginLogForm.vue";

const accountOption = ref<Select[]>([]);
const userOption = ref<Select[]>([]);
const accountSelectLoading = ref(false);
const userSelectLoading = ref(false);

const loginTimeSearch = ref(null);
const loginLogRef = ref();
const { actionButton } = useTableButton();
const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(dLoginLog()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "账号",
    key: "account",
    sorter: true,
    sortOrder: false,
    sortKey: "account_id",
  },
  {
    title: "用户",
    key: "userName",
    sorter: true,
    sortOrder: false,
    sortKey: "user_id",
  },
  {
    title: "IP",
    key: "loginIp",
    sorter: true,
    sortOrder: false,
    sortKey: "login_ip",
  },
  {
    title: "地址",
    key: "loginAddress",
    sorter: true,
    sortOrder: false,
    sortKey: "login_address",
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
    title: "时间",
    key: "loginTime",
    sorter: true,
    sortOrder: false,
    sortKey: "login_time",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "详情",
          "info",
          "log.login.log.see",
          () => {
            loginLogRef.value.openModel(rowData);
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

const handleAccountSearch = (query: string) => {
  if (!query.length) {
    accountOption.value = [];
    return;
  }
  accountSelectLoading.value = true;
  likeAccount(query)
    .then((res) => {
      if (res.data) {
        accountOption.value = res.data;
      }
    })
    .finally(() => {
      accountSelectLoading.value = false;
    });
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

const loginTimeChange = (v: [number, number]) => {
  if (v) {
    [search.loginTimeStart, search.loginTimeEnd] = v;
  }
};

const loginTimeClear = () => {
  search.loginTimeStart = null;
  search.loginTimeEnd = null;
};

onMounted(() => queryPage());
</script>

<template>
  <div>
    <div class="box-content">
      <n-space vertical size="large">
        <n-card>
          <n-space>
            <n-select
              v-model:value="search.accountId"
              placeholder="账号"
              clearable
              filterable
              remote
              :loading="accountSelectLoading"
              :options="accountOption"
              @search="handleAccountSearch"
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
            <n-input
              v-model:value="search.loginIp"
              placeholder="IP"
              clearable
            />
            <n-input
              v-model:value="search.loginAddress"
              placeholder="地址"
              clearable
            />
            <n-date-picker
              v-model:value="loginTimeSearch"
              placeholder="时间"
              type="datetimerange"
              clearable
              @update:value="loginTimeChange"
              @clear="loginTimeClear"
            />
            <n-select
              v-model:value="search.status"
              placeholder="状态"
              clearable
              filterable
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
    <LoginLogForm ref="loginLogRef" />
  </div>
</template>

<style scoped></style>
