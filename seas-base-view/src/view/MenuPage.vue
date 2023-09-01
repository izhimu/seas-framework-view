<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
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
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton, useTree } from "@izhimu/seas-core";
import { pMenu, Menu, mType, mDisplay } from "../entity/menu";
import { tree, page, del } from "../request/menu";
import MenuForm from "./MenuForm.vue";

const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(pMenu()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "menuName",
    sorter: true,
    sortOrder: false,
    sortKey: "menu_name",
  },
  {
    title: "标识",
    key: "menuCode",
    sorter: true,
    sortOrder: false,
    sortKey: "menu_code",
  },
  {
    title: "地址",
    key: "menuUrl",
  },
  {
    title: "类型",
    key: "menuType",
    sorter: true,
    sortOrder: false,
    sortKey: "menu_type",
    render(rowData) {
      const tagMap = mType.get(rowData.menuType ?? -1);
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
  {
    title: "是否显示",
    key: "display",
    sorter: true,
    sortOrder: false,
    sortKey: "display",
    render(rowData) {
      const tagMap = mDisplay.get(rowData.display ?? -1);
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

const menuRef = ref();

columns.value.push({
  title: "操作",
  key: "actions",
  render(rowData: Menu) {
    const button: Array<any> = [];
    button.push(
      actionButton(
        "修改",
        "info",
        "system.menu.update",
        () => {
          menuRef.value.openModel(search.parentId, rowData.id);
        },
        {
          style: "margin-right: 8px;",
        }
      )
    );
    button.push(
      confirmButton(
        "删除",
        "确认删除数据？",
        "error",
        "system.menu.delete",
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
    return button;
  },
});

const handleSearchClick = (e: MouseEvent) => {
  e.preventDefault();
  queryPage();
};

const handleAddClick = (e: MouseEvent) => {
  e.preventDefault();
  menuRef.value.openModel(search.parentId);
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
                    v-model:value="search.menuName"
                    placeholder="菜单名称"
                    clearable
                  />
                  <n-input
                    v-model:value="search.menuCode"
                    placeholder="菜单标识"
                    clearable
                  />
                  <n-input
                    v-model:value="search.menuUrl"
                    placeholder="菜单地址"
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
                      v-auth="'system.menu.add'"
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
    <menu-form ref="menuRef" @success="handleFormSuccess" />
  </div>
</template>

<style scoped></style>
