<script setup lang="ts">
import { h, onMounted, reactive, ref, VNode } from "vue";
import {
  NCard,
  NInput,
  NButton,
  NDataTable,
  NSpace,
  NIcon,
  NTag,
  NSelect,
  NLayout,
  NLayoutSider,
  NSpin,
  NTree,
  NLayoutContent,
  TreeOption,
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton, useTree } from "@izhimu/seas-core/src";
import { pUser, oSex, oStatus, mSex, mStatus } from "../entity/user";
import { page, del, unlock } from "../request/user";
import UserForm from "./UserForm.vue";
import { tree } from "../request/org.ts";

const roleRef = ref();
const { actionButton, confirmButton } = useTableButton();
const {
  columns,
  pagination,
  pageLoading,
  pageData,
  search,
  queryPage,
  handleSorter,
} = usePage(page, reactive(pUser()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "userName",
    sorter: true,
    sortOrder: false,
    sortKey: "user_name",
  },
  {
    title: "组织",
    key: "orgName",
  },
  {
    title: "性别",
    key: "userSex",
    sorter: true,
    sortOrder: false,
    sortKey: "user_sex",
    render(rowData) {
      const tagMap = mSex.get(rowData.userSex ?? 0);
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
    title: "生日",
    key: "birthday",
    sorter: true,
    sortOrder: false,
    sortKey: "birthday",
  },
  {
    title: "手机号",
    key: "mobile",
    sorter: true,
    sortOrder: false,
    sortKey: "mobile",
  },
  {
    title: "邮箱",
    key: "email",
    sorter: true,
    sortOrder: false,
    sortKey: "email",
  },
  {
    title: "状态",
    key: "status",
    sorter: true,
    sortOrder: false,
    sortKey: "status",
    render(rowData) {
      const tagMap = mStatus.get(rowData.status ?? -1);
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
    title: "操作",
    key: "actions",
    render(rowData) {
      const actions: Array<VNode | null> = [];
      actions.push(
        actionButton(
          "修改",
          "info",
          "system.user.update",
          () => {
            roleRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          },
        ),
      );
      if (rowData.status === 3) {
        actions.push(
          confirmButton(
            "解除锁定",
            "确认解除临时锁定状态？",
            "warning",
            "system.user.unlock",
            () => {
              if (rowData.id) {
                unlock(rowData.id).then(queryPage);
              }
            },
            undefined,
            {
              style: "margin-right: 8px;",
            },
          ),
        );
      }
      actions.push(
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "system.user.delete",
          () => {
            if (rowData.id) {
              del(rowData.id).then(queryPage);
            }
          },
        ),
      );
      return actions;
    },
  },
]);

const { treeData, treeLoading, treePattern, nodeProps, queryTreeData } =
  useTree(tree, ({ option }: { option: TreeOption }) => {
    return {
      onClick() {
        if (option.disabled) {
          return;
        }
        search.orgId = option.key ?? null;
        queryPage();
      },
    };
  });

const handleSearchClick = (e: MouseEvent) => {
  e.preventDefault();
  queryPage();
};

const handleAddClick = (e: MouseEvent) => {
  e.preventDefault();
  roleRef.value.openModel();
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
                    v-model:value="search.userName"
                    placeholder="名称"
                    clearable
                  />
                  <n-input
                    v-model:value="search.mobile"
                    placeholder="手机号"
                    clearable
                  />
                  <n-input
                    v-model:value="search.email"
                    placeholder="邮箱"
                    clearable
                  />
                  <n-select
                    v-model:value="search.userSex"
                    placeholder="性别"
                    filterable
                    clearable
                    :options="oSex"
                  />
                  <n-select
                    v-model:value="search.status"
                    placeholder="状态"
                    filterable
                    clearable
                    :options="oStatus"
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
                      v-auth="'system.user.add'"
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
    <user-form ref="roleRef" :org-id="search.orgId" @success="queryPage" />
  </div>
</template>

<style scoped></style>
