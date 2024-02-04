<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { NCard, NInput, NButton, NDataTable, NSpace, NIcon } from "naive-ui";
import { usePage, useTableButton, SearchIcon } from "@izhimu/seas-core";
import { dMqtUser as defEntity } from "../entity/mqtUser";
import { page, del } from "../request/mqtUser";
import DataForm from "./MqtUserForm.vue";

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
} = usePage(page, reactive(defEntity()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "用户名",
    key: "username",
    sorter: true,
    sortOrder: false,
    sortKey: "username",
  },
  {
    title: "密码",
    key: "password",
    sorter: true,
    sortOrder: false,
    sortKey: "password",
  },
  {
    title: "订阅权限",
    key: "topicAuth",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "修改",
          "info",
          "mqt.user.update",
          () => {
            formRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          },
        ),
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "mqt.user.delete",
          () => {
            if (rowData.id) {
              del(rowData.id).then(queryPage);
            }
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
              v-model:value="search.username"
              placeholder="用户名"
              clearable
            />
            <n-input
              v-model:value="search.password"
              placeholder="密码"
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
            <n-space>
              <n-button
                v-auth="'mqt.user.add'"
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
    <data-form ref="formRef" @success="queryPage" />
  </div>
</template>

<style scoped></style>
