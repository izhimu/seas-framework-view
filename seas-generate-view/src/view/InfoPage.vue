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
  useMessage,
} from "naive-ui";
import { BrowsersOutline } from "@vicons/ionicons5";
import { onMounted, reactive, ref, h } from "vue";
import { useTableButton } from "@izhimu/seas-core";
import { Columns } from "@izhimu/seas-core/src/types";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { get } from "../request/info";
import { list as datasourceList, tables } from "../request/datasource";
import { list as templateList } from "../request/template";
import { FieldInfo, dInfo, oSearchType } from "../entity/info";

const message = useMessage();
const { actionButton } = useTableButton();

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

const columns: Columns<FieldInfo> = [
  {
    title: "排序",
    key: "no",
    fixed: "left",
    width: 90,
    render(rowData, rowIndex) {
      return [
        actionButton(
          "↑",
          "info",
          undefined,
          () => {
            up(model.fieldList, rowIndex);
          },
          {
            style: "margin-right: 8px;",
            disabled: rowIndex === 0,
          }
        ),
        actionButton(
          "↓",
          "info",
          undefined,
          () => {
            down(model.fieldList, rowIndex);
          },
          {
            disabled: rowIndex === model.fieldList.length - 1,
          }
        ),
      ];
    },
  },
  {
    title: "字段名称",
    key: "fieldName",
    fixed: "left",
    width: 200,
  },
  {
    title: "显示名称",
    key: "showName",
    fixed: "left",
    width: 200,
    render(rowData) {
      return h(NInput, {
        value: rowData.showName,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.showName = value;
        },
      });
    },
  },
  {
    title: "属性名称",
    key: "attrName",
    render(rowData) {
      return h(NInput, {
        value: rowData.attrName,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.attrName = value;
        },
      });
    },
  },
  {
    title: "字段类型",
    key: "fieldType",
    render(rowData) {
      return h(NInput, {
        value: rowData.fieldType,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.fieldType = value;
        },
      });
    },
  },
  {
    title: "Java类型",
    key: "javaType",
    render(rowData) {
      return h(NInput, {
        value: rowData.javaType,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.javaType = value;
        },
      });
    },
  },
  {
    title: "Js类型",
    key: "jsType",
    render(rowData) {
      return h(NInput, {
        value: rowData.jsType,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.jsType = value;
        },
      });
    },
  },
  {
    title: "是否主键",
    key: "isPk",
    width: 100,
    render(rowData) {
      return h(
        NTag,
        {
          type: rowData.isPk ? "info" : undefined,
        },
        { default: () => (rowData.isPk ? "是" : "否") }
      );
    },
  },
  {
    title: "是否非空",
    key: "isNull",
    width: 100,
    render(rowData) {
      return h(
        NTag,
        {
          type: rowData.isNull ? "warning" : undefined,
        },
        { default: () => (rowData.isNull ? "是" : "否") }
      );
    },
  },
  {
    key: "insertable",
    width: 120,
    title() {
      return h(
        NCheckbox,
        {
          onUpdateChecked(value) {
            // eslint-disable-next-line no-param-reassign
            model.fieldList.forEach((item) => {
              item.insertable = value ? 1 : 0;
            });
          },
        },
        { default: () => "新增编辑" }
      );
    },
    render(rowData) {
      return h(NSwitch, {
        checkedValue: 1,
        uncheckedValue: 0,
        value: rowData.insertable ?? 0,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.insertable = value;
        },
      });
    },
  },
  {
    key: "listable",
    width: 120,
    title() {
      return h(
        NCheckbox,
        {
          onUpdateChecked(value) {
            // eslint-disable-next-line no-param-reassign
            model.fieldList.forEach((item) => {
              item.listable = value ? 1 : 0;
            });
          },
        },
        { default: () => "列表显示" }
      );
    },
    render(rowData) {
      return h(NSwitch, {
        checkedValue: 1,
        uncheckedValue: 0,
        value: rowData.listable ?? 0,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.listable = value;
        },
      });
    },
  },
  {
    key: "searchable",
    width: 120,
    title() {
      return h(
        NCheckbox,
        {
          onUpdateChecked(value) {
            // eslint-disable-next-line no-param-reassign
            model.fieldList.forEach((item) => {
              item.searchable = value ? 1 : 0;
            });
          },
        },
        { default: () => "查询" }
      );
    },
    render(rowData) {
      return h(NSwitch, {
        checkedValue: 1,
        uncheckedValue: 0,
        value: rowData.searchable ?? 0,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.searchable = value;
        },
      });
    },
  },
  {
    key: "sortable",
    width: 120,
    title() {
      return h(
        NCheckbox,
        {
          onUpdateChecked(value) {
            // eslint-disable-next-line no-param-reassign
            model.fieldList.forEach((item) => {
              item.sortable = value ? 1 : 0;
            });
          },
        },
        { default: () => "排序" }
      );
    },
    render(rowData) {
      return h(NSwitch, {
        checkedValue: 1,
        uncheckedValue: 0,
        value: rowData.sortable ?? 0,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.sortable = value;
        },
      });
    },
  },
  {
    title: "查询类型",
    key: "searchType",
    render(rowData) {
      return h(NSelect, {
        value: rowData.searchType ?? "LIKE",
        disabled: rowData.searchable === 0,
        options: oSearchType,
        onUpdateValue(value) {
          // eslint-disable-next-line no-param-reassign
          rowData.searchType = value;
        },
      });
    },
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
    get(model.sourceId, model.tableName).then((res) => {
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
    });
  }
};

const paramVerify = () => {
  if (!model.tableName) {
    message.warning("请选择表!");
  }
  if (!model.templateId) {
    message.warning("请选择模板!");
  }
  if (!model.packageName) {
    message.warning("请填写包名!");
  }
};

const handlePreviewClick = () => {
  paramVerify();
};

const handleCreateClick = () => {
  paramVerify();
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
                    />
                  </n-space>
                  <n-space justify="end">
                    <n-button type="primary" @click="handlePreviewClick"
                      >预览
                    </n-button>
                    <n-button type="success" @click="handleCreateClick"
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
  </div>
</template>

<style scoped></style>
