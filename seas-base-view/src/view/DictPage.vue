<script setup lang="ts">
import { h, onMounted, reactive, ref, VNode } from "vue";
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NInput,
  NButton,
  NDataTable,
  NSpace,
  NIcon,
  NTree,
  NSpin,
  NTag,
  TreeOption,
  useDialog,
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import {
  useAgainDialog,
  usePage,
  useTableButton,
  useTree,
} from "@izhimu/seas-core";
import { Dict, pDict, mFixed } from "../entity/dict";
import { tree, page, del } from "../request/dict";
import DictForm from "./DictForm.vue";

const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(pDict()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "dictName",
    sorter: true,
    sortOrder: false,
    sortKey: "dict_name",
  },
  {
    title: "编号",
    key: "dictCode",
    sorter: true,
    sortOrder: false,
    sortKey: "dict_code",
  },
  {
    title: "类型",
    key: "fixed",
    render(rowData) {
      const tagMap = mFixed.get(rowData.fixed ?? -1);
      return h(
        NTag,
        {
          type: tagMap?.tag,
        },
        {
          default: () => tagMap?.title,
        }
      );
    },
  },
]);
const { treeData, treeLoading, treePattern, nodeProps, queryTreeData } =
  useTree(tree, ({ option }: { option: TreeOption }) => {
    return {
      onClick() {
        search.parentId = option.key ?? null;
        queryPage();
      },
    };
  });
const { actionButton, confirmButton } = useTableButton();
const dialog = useDialog();
const { openAgainDialog, closeAgainDialog } = useAgainDialog<Dict>(
  dialog,
  "确认删除",
  "删除系统字典可能会导致系统运行不稳定！",
  "如仍要删除，请在下方输入框中输入‘确认删除’，并点击确认按钮。",
  "确认删除",
  (value) => {
    if (value.id) {
      del(value.id).then((res) => {
        if (res.code === "000") {
          queryPage();
          queryTreeData();
          closeAgainDialog();
        }
      });
    }
  }
);

const dictRef = ref();

columns.value.push({
  title: "操作",
  key: "actions",
  render(rowData: Dict) {
    const button: Array<VNode | null> = [];
    button.push(
      actionButton(
        "修改",
        "info",
        "system.dict.update",
        () => {
          dictRef.value.openModel(search.parentId, rowData.id);
        },
        {
          style: "margin-right: 8px;",
        }
      )
    );
    if (rowData.fixed === 0) {
      button.push(
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "system.dict.delete",
          () => {
            if (rowData.id) {
              del(rowData.id).then((res) => {
                if (res.code === "000") {
                  queryPage();
                  queryTreeData();
                }
              });
            }
          }
        )
      );
    } else {
      button.push(
        actionButton("删除", "error", "system.dict.delete", () => {
          openAgainDialog(rowData);
        })
      );
    }
    return button;
  },
});

const handleSearchClick = (e: MouseEvent) => {
  e.preventDefault();
  queryPage();
};

const handleAddClick = (e: MouseEvent) => {
  e.preventDefault();
  dictRef.value.openModel(search.parentId);
};

const handleFormSuccess = () => {
  queryPage();
  queryTreeData();
};

onMounted(() => {
  queryTreeData();
  queryPage();
});
</script>

<template>
  <div>
    <div class="box-content">
      <n-layout>
        <n-layout has-sider>
          <n-layout-sider>
            <n-card style="height: calc(100vh - 100px)">
              <n-space vertical :size="12">
                <n-input
                  v-model:value="treePattern"
                  placeholder="搜索"
                  clearable
                />
                <n-spin :show="treeLoading">
                  <n-tree
                    :pattern="treePattern"
                    :data="treeData"
                    block-line
                    :node-props="nodeProps"
                  />
                </n-spin>
              </n-space>
            </n-card>
          </n-layout-sider>
          <n-layout-content content-style="padding-left: 12px;">
            <n-space vertical size="large">
              <n-card>
                <n-space>
                  <n-input
                    v-model:value="search.dictName"
                    placeholder="字典名称"
                    clearable
                  />
                  <n-input
                    v-model:value="search.dictCode"
                    placeholder="字典编号"
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
                      v-auth="'system.dict.add'"
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
          </n-layout-content>
        </n-layout>
      </n-layout>
    </div>
    <dict-form ref="dictRef" @success="handleFormSuccess" />
  </div>
</template>

<style scoped></style>
