<script setup lang="ts">
import {
  NSpace,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NSelect,
  NButton,
  NScrollbar,
  NInput,
  NDivider,
  NDataTable,
} from "naive-ui";
import { BrowsersOutline } from "@vicons/ionicons5";
import { onMounted, reactive, ref } from "vue";
import { Columns } from "@izhimu/seas-core/src/types";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { get } from "../request/info";
import { list, tables } from "../request/datasource";
import { FieldInfo, dInfo } from "../entity/info";

const sourceRef = ref<Array<SelectMixedOption>>([]);
const tableRef = ref<Array<string>>([]);
const tableLikeRef = ref();
const model = reactive(dInfo());
const columns: Columns<FieldInfo> = [
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
];

const loadSource = () => {
  list().then((res) => {
    if (res.data) {
      res.data.forEach((item) => {
        if (item.dsName && item.id) {
          sourceRef.value.push({
            label: item.dsName,
            value: item.id,
          });
        }
      });
    }
  });
};

const loadTables = () => {
  if (model.sourceId) {
    tables(model.sourceId, tableLikeRef.value).then((res) => {
      if (res.data) {
        tableRef.value = res.data;
      }
    });
  }
};

const handleSourceChange = (v: string) => {
  model.sourceId = v;
  tableLikeRef.value = null;
  loadTables();
};

const handleLikeChange = (v: string) => {
  tableLikeRef.value = v;
  loadTables();
};

const handleTableClick = (v: string) => {
  model.tableName = v;
  if (model.sourceId && model.tableName) {
    get(model.sourceId, model.tableName).then((res) => {
      if (res.data) {
        Object.assign(model, res.code);
      }
    });
  }
};

onMounted(() => loadSource());
</script>

<template>
  <div>
    <n-layout has-sider>
      <n-layout-sider bordered content-style="padding: 24px;">
        <n-space vertical size="large">
          <n-select
            v-model:value="model.sourceId"
            filterable
            :options="sourceRef"
            :on-update:value="handleSourceChange"
            @keydown.enter.prevent
          />
          <n-input
            v-model:value="tableLikeRef"
            placeholder="请输入表名"
            :on-update:value="handleLikeChange"
          />
        </n-space>
        <n-divider />
        <n-scrollbar style="height: calc(100vh - 180px)">
          <n-button
            v-for="item in tableRef"
            :key="item"
            quaternary
            size="small"
            @click="handleTableClick(item)"
          >
            <template #icon>
              <BrowsersOutline />
            </template>
            {{ item }}
          </n-button>
        </n-scrollbar>
      </n-layout-sider>
      <n-layout>
        <n-layout-content bordered>
          <n-card :bordered="false">
            <n-space vertical size="large">
              <n-card>
                <n-space>
                  <n-input
                    v-model:value="model.tableName"
                    readonly
                    style="width: 220px"
                    placeholder="请输入表名"
                  />
                  <n-input
                    v-model:value="model.tableDesc"
                    style="width: 220px"
                    placeholder="请输入说明"
                  />
                  <n-input
                    v-model:value="model.className"
                    style="width: 220px"
                    placeholder="请输入类名"
                  />
                </n-space>
              </n-card>
              <n-card>
                <div style="height: calc(100vh - 258px)">
                  <n-data-table
                    :bordered="false"
                    :columns="columns"
                    :data="model.fieldList"
                    max-height="calc(100vh - 258px)"
                  ></n-data-table>
                </div>
              </n-card>
              <n-card>
                <n-space justify="space-between">
                  <n-space>
                    <n-select
                      v-model:value="model.templateId"
                      style="width: 220px"
                      placeholder="请选择模板"
                    ></n-select>
                    <n-input
                      v-model:value="model.author"
                      style="width: 220px"
                      placeholder="请输入作者"
                    />
                    <n-input
                      v-model:value="model.tablePrefix"
                      style="width: 220px"
                      placeholder="请输入表前缀"
                    />
                  </n-space>
                  <n-space justify="end">
                    <n-button type="primary">预览</n-button>
                    <n-button type="success">生成</n-button>
                  </n-space>
                </n-space>
              </n-card>
            </n-space>
          </n-card>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped></style>
