<script setup lang="ts">
import { onMounted, reactive, ref, h } from "vue";
import {
  NCard,
  NInput,
  NButton,
  NDataTable,
  NSpace,
  NIcon,
  NTag,
} from "naive-ui";
import { SearchSharp as SearchIcon } from "@vicons/ionicons5";
import { usePage, useTableButton } from "@izhimu/seas-core/src";
import { pRole, mEnable } from "../entity/role";
import { page, del } from "../request/role";
import RoleForm from "./RoleForm.vue";

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
} = usePage(page, reactive(pRole()), [
  {
    title: "序号",
    key: "no",
    render(rowData, rowIndex) {
      return rowIndex + 1;
    },
  },
  {
    title: "名称",
    key: "roleName",
    sorter: true,
    sortOrder: false,
    sortKey: "role_name",
  },
  {
    title: "描述",
    key: "roleDesc",
  },
  {
    title: "状态",
    key: "enable",
    sorter: true,
    sortOrder: false,
    sortKey: "enable",
    render(rowData) {
      const tagMap = mEnable.get(rowData.enable ?? 0);
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
    title: "创建时间",
    key: "createdTime",
    sorter: true,
    sortOrder: false,
    sortKey: "created_time",
  },
  {
    title: "操作",
    key: "actions",
    render(rowData) {
      return [
        actionButton(
          "修改",
          "info",
          "system.role.update",
          () => {
            roleRef.value.openModel(rowData.id);
          },
          {
            style: "margin-right: 8px;",
          },
        ),
        confirmButton(
          "删除",
          "确认删除数据？",
          "error",
          "system.role.delete",
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
  roleRef.value.openModel();
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
              v-model:value="search.roleName"
              placeholder="角色名称"
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
                v-auth="'system.role.add'"
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
    <role-form ref="roleRef" @success="queryPage" />
  </div>
</template>

<style scoped></style>
