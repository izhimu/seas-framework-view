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
  useMessage,
} from "naive-ui";
import { usePage, useTableButton, SearchIcon } from "@izhimu/seas-core/src";
import { Type } from "naive-ui/lib/button/src/interface";
import { pDatasource as param, mType, oType } from "../entity/datasource";
import { page, del, test } from "../request/datasource";
import FormModel from "./DatasourceForm.vue";

type TestResult = {
  type: Type;
  name: string;
  disabled: boolean;
};

const testMap = new Map();
const message = useMessage();
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
} = usePage(page, reactive(param()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex: number) {
      return rowIndex + 1;
    },
  },
  {
    title: "数据源名称",
    key: "dsName",
    sorter: true,
    sortOrder: false,
    sortKey: "ds_name",
  },
  {
    title: "数据库名称",
    key: "dbName",
    sorter: true,
    sortOrder: false,
    sortKey: "db_name",
  },
  {
    title: "类型",
    key: "dsType",
    sorter: true,
    sortOrder: false,
    sortKey: "ds_type",
    render(rowData) {
      const tagMap = mType.get(rowData.dsType ?? "");
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
    title: "地址",
    key: "dsUrl",
    sorter: true,
    sortOrder: false,
    sortKey: "ds_url",
  },
  {
    title: "备注",
    key: "remark",
    sorter: true,
    sortOrder: false,
    sortKey: "remark",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      let testResult;
      if (!testMap.has(rowData.id)) {
        testResult = reactive<TestResult>({
          type: "info",
          name: "测试连接",
          disabled: false,
        });
        testMap.set(rowData.id, testResult);
      } else {
        testResult = testMap.get(rowData.id);
      }
      return [
        actionButton(
          "修改",
          "info",
          "gen.datasource.update",
          () => {
            formRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          },
        ),
        actionButton(
          testResult.name,
          testResult.type,
          "gen.datasource.test",
          () => {
            if (rowData.id) {
              testResult.type = "info";
              testResult.name = "连接中...";
              testResult.disabled = true;
              test(rowData.id)
                .then((res) => {
                  if (res.data === true) {
                    testResult.type = "success";
                    testResult.name = "连接成功";
                  } else {
                    testResult.type = "warning";
                    testResult.name = "连接失败";
                    if (res.tips) {
                      message.warning(res.tips);
                    }
                  }
                })
                .catch(() => {
                  testResult.name = "测试连接";
                })
                .finally(() => {
                  testResult.disabled = false;
                });
            }
          },
          {
            style: "margin-right: 8px;",
            disabled: testResult.disabled,
          },
        ),
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "gen.datasource.delete",
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
              v-model:value="search.dsName"
              placeholder="数据源名称"
              clearable
            />
            <n-input
              v-model:value="search.dbName"
              placeholder="数据库名称"
              clearable
            />
            <n-select
              v-model:value="search.dsType"
              placeholder="类型"
              filterable
              clearable
              :options="oType"
            />
            <n-input
              v-model:value="search.dsUrl"
              placeholder="地址"
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
                v-auth="'gen.datasource.add'"
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
  </div>
</template>

<style scoped></style>
