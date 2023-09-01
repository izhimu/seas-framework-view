<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
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
  TreeOption,
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton, useTree } from "@izhimu/seas-core";
import { pOrg } from "../entity/org";
import { tree, page, del } from "../request/org";
import OrgForm from "./OrgForm.vue";

const formRef = ref();

const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(pOrg()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "orgName",
    sorter: true,
    sortOrder: false,
    sortKey: "org_name",
  },
  {
    title: "类型",
    key: "orgTypeName",
    sorter: true,
    sortOrder: false,
    sortKey: "org_type",
  },
  {
    title: "地址",
    key: "orgAddress",
  },
]);
const { treeData, treeLoading, treePattern, nodeProps, queryTreeData } =
  useTree(tree, ({ option }: { option: TreeOption }) => {
    return {
      onClick() {
        if (option.disabled) {
          return;
        }
        search.parentId = option.key ?? null;
        queryPage();
      },
    };
  });
const { actionButton, confirmButton } = useTableButton();

columns.value.push({
  title: "操作",
  key: "actions",
  render(rowData) {
    return [
      actionButton(
        "修改",
        "info",
        "system.org.update",
        () => {
          formRef.value.openModel(search.parentId, rowData.id);
        },
        {
          style: "margin-right: 8px;",
        }
      ),
      confirmButton(
        "删除",
        "确认删除数据？",
        "error",
        "system.org.delete",
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
      ),
    ];
  },
});

const handleSearchClick = (e: MouseEvent) => {
  e.preventDefault();
  queryPage();
};

const handleAddClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value.openModel(search.parentId);
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
                    v-model:value="search.orgName"
                    placeholder="组织名称"
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
                      v-auth="'system.org.add'"
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
    <org-form ref="formRef" @success="handleFormSuccess" />
  </div>
</template>

<style scoped></style>
