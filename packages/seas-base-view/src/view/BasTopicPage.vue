<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { NCard, NInput, NButton, NDataTable, NSpace, NIcon } from "naive-ui";
import { usePage, useTableButton, SearchIcon } from "@izhimu/seas-core";
import { dBasTopic as defEntity } from "../entity/basTopic";
import { page, del } from "../request/basTopic";
import DataForm from "./BasTopicForm.vue";

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
    render(_, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "主题名称",
    key: "topicName",
    sorter: true,
    sortOrder: false,
    sortKey: "topic_name",
  },
  {
    title: "主题标识",
    key: "topicCode",
    sorter: true,
    sortOrder: false,
    sortKey: "topic_code",
  },
  {
    title: "首页地址",
    key: "indexUrl",
    sorter: true,
    sortOrder: false,
    sortKey: "index_url",
  },
  {
    title: "排序",
    key: "sort",
    sorter: true,
    sortOrder: false,
    sortKey: "sort",
  },
  {
    title: "备注",
    key: "remarks",
    sorter: true,
    sortOrder: false,
    sortKey: "remarks",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "修改",
          "info",
          "bas.topic.update",
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
          "bas.topic.delete",
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
              v-model:value="search.topicName"
              placeholder="主题名称"
              clearable
            />
            <n-input
              v-model:value="search.topicCode"
              placeholder="主题标识"
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
                v-auth="'bas.topic.add'"
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
