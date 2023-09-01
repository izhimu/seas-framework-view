<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { NCard, NInput, NButton, NDataTable, NSpace, NIcon } from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton } from "@izhimu/seas-core";
import { dConf as defEntity } from "../entity/conf";
import { page, del } from "../request/conf";
import DataForm from "./ConfForm.vue";

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
    title: "名称",
    key: "confName",
    sorter: true,
    sortOrder: false,
    sortKey: "conf_name",
  },
  {
    title: "标识",
    key: "confKey",
    sorter: true,
    sortOrder: false,
    sortKey: "conf_key",
  },
  {
    title: "值",
    key: "confValue",
    sorter: true,
    sortOrder: false,
    sortKey: "conf_value",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "修改",
          "info",
          "system.conf.update",
          () => {
            formRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          }
        ),
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "system.conf.delete",
          () => {
            if (rowData.id) {
              del(rowData.id).then(queryPage);
            }
          }
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
              v-model:value="search.confName"
              placeholder="配置名称"
              clearable
            />
            <n-input
              v-model:value="search.confKey"
              placeholder="配置标识"
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
                v-auth="'system.conf.add'"
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
