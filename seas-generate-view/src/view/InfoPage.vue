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
  NTag,
  NCheckbox,
  NSwitch,
  NText,
  useMessage,
} from "naive-ui";
import { BrowsersOutline } from "@vicons/ionicons5";
import { onMounted, reactive, ref, h, VNode } from "vue";
import { useTableButton } from "@izhimu/seas-core";
import { Columns } from "@izhimu/seas-core/src/types";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { useDownload } from "@izhimu/seas-storage-view";
import { get, create, preview } from "../request/info";
import { list as datasourceList, tables } from "../request/datasource";
import { list as templateList } from "../request/template";
import { FieldInfo, dInfo, oSearchType } from "../entity/info";
import InfoPreview from "./InfoPreview.vue";

const message = useMessage();
const { ofBlob } = useDownload();
const { actionButton } = useTableButton();

const previewRef = ref();

const loading = ref(false);
const previewLoading = ref(false);
const createLoading = ref(false);
const sourceRef = ref<Array<SelectMixedOption>>([]);
const tableRef = ref<Array<string>>([]);
const templateRef = ref<Array<SelectMixedOption>>([]);
const tableLikeRef = ref();
const model = reactive(dInfo());

const sort = (list: Array<FieldInfo>) => {
  for (let i = 0; i < list.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    list[i].sort = i;
  }
};
const up = (list: Array<FieldInfo>, index: number) => {
  if (index !== 0) {
    // eslint-disable-next-line prefer-destructuring,no-param-reassign
    list[index] = list.splice(index - 1, 1, list[index])[0];
    sort(list);
  }
};
const down = (list: Array<FieldInfo>, index: number) => {
  if (index !== list.length - 1) {
    // eslint-disable-next-line prefer-destructuring,no-param-reassign
    list[index] = list.splice(index + 1, 1, list[index])[0];
    sort(list);
  }
};

const hInput = (rowData: FieldInfo, field: string) =>
  h(NInput, {
    value: rowData[field],
    disabled: !!rowData.isPk,
    onUpdateValue(value) {
      // eslint-disable-next-line no-param-reassign
      rowData[field] = value;
    },
  });

const hCheckboxTitle = (title: string, field: string) =>
  h(
    NCheckbox,
    {
      defaultChecked: true,
      onUpdateChecked(value) {
        // eslint-disable-next-line no-param-reassign
        model.fieldList
          .filter((item) => !item.isPk)
          .forEach((item) => {
            item[field] = value ? 1 : 0;
          });
      },
    },
    { default: () => title },
  );

const hSwitch = (rowData: FieldInfo, field: string) =>
  h(NSwitch, {
    checkedValue: 1,
    uncheckedValue: 0,
    value: rowData[field] ?? 0,
    disabled: !!rowData.isPk,
    onUpdateValue(value) {
      // eslint-disable-next-line no-param-reassign
      rowData[field] = value;
    },
  });

const columns: Columns<FieldInfo> = [
  {
    title: "排序",
    key: "no",
    fixed: "left",
    width: 90,
    render: (_, rowIndex) => [
      actionButton(
        "↑",
        "info",
        undefined,
        () => up(model.fieldList, rowIndex),
        {
          style: "margin-right: 8px;",
          disabled: rowIndex === 0,
        },
      ),
      actionButton(
        "↓",
        "info",
        undefined,
        () => down(model.fieldList, rowIndex),
        {
          disabled: rowIndex === model.fieldList.length - 1,
        },
      ),
    ],
  },
  {
    title: "字段名称",
    key: "fieldName",
    fixed: "left",
    width: 200,
    render(rowData) {
      const arr: VNode[] = [
        h(NText, { strong: true }, { default: () => rowData.fieldName }),
      ];
      if (rowData.isPk) {
        arr.push(
          h(NTag, { type: "info", size: "small" }, { default: () => "P" }),
        );
      }
      if (rowData.isPk) {
        arr.push(
          h(NTag, { type: "warning", size: "small" }, { default: () => "N" }),
        );
      }
      return h(NSpace, { size: "small" }, { default: () => arr });
    },
  },
  {
    title: "显示名称",
    key: "showName",
    fixed: "left",
    width: 200,
    render: (rowData) => hInput(rowData, "showName"),
  },
  {
    title: "属性名称",
    key: "attrName",
    render: (rowData) => hInput(rowData, "attrName"),
  },
  {
    title: "字段类型",
    key: "fieldType",
    render: (rowData) => hInput(rowData, "fieldType"),
  },
  {
    title: "Java类型",
    key: "javaType",
    render: (rowData) => hInput(rowData, "javaType"),
  },
  {
    title: "Js类型",
    key: "jsType",
    render: (rowData) => hInput(rowData, "jsType"),
  },
  {
    key: "insertable",
    width: 120,
    title: () => hCheckboxTitle("新增编辑", "insertable"),
    render: (rowData) => hSwitch(rowData, "insertable"),
  },
  {
    key: "listable",
    width: 120,
    title: () => hCheckboxTitle("列表显示", "listable"),
    render: (rowData) => hSwitch(rowData, "listable"),
  },
  {
    key: "searchable",
    width: 120,
    title: () => hCheckboxTitle("查询", "searchable"),
    render: (rowData) => hSwitch(rowData, "searchable"),
  },
  {
    key: "sortable",
    width: 120,
    title: () => hCheckboxTitle("排序", "sortable"),
    render: (rowData) => hSwitch(rowData, "sortable"),
  },
  {
    title: "查询类型",
    key: "searchType",
    render: (rowData) =>
      h(NSelect, {
        value: rowData.searchType ?? "LIKE",
        disabled: rowData.searchable === 0,
        options: oSearchType,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.searchType = value;
        },
      }),
  },
];

const loadSource = () => {
  datasourceList().then((res) => {
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

const loadTemplate = () => {
  templateList().then((res) => {
    if (res.data) {
      res.data.forEach((item) => {
        if (item.templateName && item.id) {
          templateRef.value.push({
            label: item.templateName,
            value: item.id,
          });
        }
      });
    }
  });
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

const underlineToHump = (str: string) => {
  let s = str;
  if (s.slice(0, 1) === "_") {
    s = s.slice(1);
  }
  return s.replace(/([^_])_+([^_])/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase();
  });
};

const handleTableClick = (v: string) => {
  model.tableName = v;
  if (model.sourceId && model.tableName) {
    loading.value = true;
    get(model.sourceId, model.tableName)
      .then((res) => {
        if (res.code) {
          Object.assign(model, res.data);
          if (model.fieldList.length === 0) {
            message.warning("当前表无字段信息！");
          }
          if (model.tablePrefix) {
            const str = model.tableName?.replace(model.tablePrefix, "");
            if (str) {
              const name = underlineToHump(str);
              model.className = name.charAt(0).toUpperCase() + name.slice(1);
            }
          }
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

const paramVerify = (): boolean => {
  if (!model.tableName) {
    message.warning("请选择表!");
    return false;
  }
  if (!model.templateId) {
    message.warning("请选择模板!");
    return false;
  }
  if (!model.packageName) {
    message.warning("请填写包名!");
    return false;
  }
  return true;
};

const handlePreviewClick = () => {
  if (paramVerify()) {
    previewLoading.value = true;
    preview(model)
      .then((res) => {
        if (res.data) {
          previewRef.value.openModel(res.data);
        }
      })
      .finally(() => {
        previewLoading.value = false;
      });
  }
};

const handleCreateClick = () => {
  if (paramVerify()) {
    createLoading.value = true;
    create(model)
      .then((blob) => {
        ofBlob(blob, `${model.className}.zip`);
      })
      .finally(() => {
        createLoading.value = false;
      });
  }
};

const firstUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleUpdateClassName = (val: string) => {
  if (model.tableName) {
    // eslint-disable-next-line no-eval
    const tableName = model.tableName.replace(eval(`/^${val}/g`), "");
    const str = tableName.split("_");
    model.className = str.map(firstUpper).join("");
  }
};

onMounted(() => {
  loadSource();
  loadTemplate();
});
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
            placeholder="查询表名"
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
                    placeholder="表名"
                  />
                  <n-input
                    v-model:value="model.tableDesc"
                    style="width: 220px"
                    placeholder="说明"
                  />
                  <n-input
                    v-model:value="model.className"
                    style="width: 220px"
                    placeholder="类名"
                  />
                </n-space>
              </n-card>
              <n-card>
                <div style="height: calc(100vh - 258px)">
                  <n-data-table
                    :loading="loading"
                    :bordered="false"
                    :columns="columns"
                    :data="model.fieldList"
                    max-height="calc(100vh - 258px)"
                    :scroll-x="2000"
                  ></n-data-table>
                </div>
              </n-card>
              <n-card>
                <n-space justify="space-between">
                  <n-space>
                    <n-select
                      v-model:value="model.templateId"
                      style="width: 220px"
                      :options="templateRef"
                      placeholder="请选择模板"
                    ></n-select>
                    <n-input
                      v-model:value="model.packageName"
                      style="width: 220px"
                      placeholder="请输入包名"
                    />
                    <n-input
                      v-model:value="model.author"
                      style="width: 220px"
                      placeholder="请输入作者"
                    />
                    <n-input
                      v-model:value="model.tablePrefix"
                      style="width: 220px"
                      placeholder="请输入表前缀"
                      @input="handleUpdateClassName"
                    />
                  </n-space>
                  <n-space justify="end">
                    <n-button
                      type="primary"
                      :disabled="loading"
                      :loading="previewLoading"
                      @click="handlePreviewClick"
                      >预览
                    </n-button>
                    <n-button
                      type="success"
                      :disabled="loading"
                      :loading="createLoading"
                      @click="handleCreateClick"
                      >生成
                    </n-button>
                  </n-space>
                </n-space>
              </n-card>
            </n-space>
          </n-card>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <info-preview ref="previewRef" />
  </div>
</template>

<style scoped></style>
