<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { NCard, NInput, NButton, NDataTable, NSpace, NIcon } from "naive-ui";
import { usePage, useTableButton, SearchIcon } from "@izhimu/seas-core";
import { pTemplate as param } from "../entity/template";
import { page, del } from "../request/template";
import FormModel from "./TemplateForm.vue";
import TemplateAssets from "./TemplateAssetsForm.vue";

const formRef = ref();
const templateAssetsRef = ref();
const { actionButton, confirmButton } = useTableButton();
const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(param()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex: number) {
      return rowIndex + 1;
    },
  },
  {
    title: "模板名称",
    key: "templateName",
    sorter: true,
    sortOrder: false,
    sortKey: "template_name",
  },
  {
    title: "模板版本",
    key: "templateVersion",
    sorter: true,
    sortOrder: false,
    sortKey: "template_version",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "修改",
          "info",
          "gen.template.update",
          () => {
            formRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          }
        ),
        actionButton(
          "模板资源",
          "info",
          "gen.template.assets",
          () => {
            templateAssetsRef.value.openModel(
              rowData.id,
              rowData.templateName,
              rowData.templateVersion
            );
          },
          {
            style: "margin-right: 8px;",
          }
        ),
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "gen.template.delete",
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
              v-model:value="search.templateName"
              placeholder="模板名称"
              clearable
            />
            <n-input
              v-model:value="search.templateVersion"
              placeholder="模板版本"
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
                v-auth="'gen.template.add'"
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
    <form-model ref="formRef" @success="queryPage" />
    <template-assets ref="templateAssetsRef" @success="queryPage" />
  </div>
</template>

<style scoped></style>
