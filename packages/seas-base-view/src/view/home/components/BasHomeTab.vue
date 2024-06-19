<script setup lang="ts">
import { useRouter } from "vue-router";
import { h, nextTick, onMounted, ref, watch } from "vue";
import { NButton, NDropdown, NEl, NFlex, NIcon, NTag } from "naive-ui";
import { Menu as IconMenu } from "@vicons/ionicons5";
import { useMenuStore } from "../../../store";
import { TabItem } from "../../../store/menu.ts";

const router = useRouter();
const menuStore = useMenuStore();

// 页签渲染
const tabType = (key: string): "info" | "default" =>
  menuStore.active === key ? "info" : "default";
const handleTabClick = (key: string) => {
  router.push({ name: key });
};
const handleTabClose = (tab: TabItem) => {
  const index = menuStore.tabs.indexOf(tab);
  menuStore.tabs.splice(index, 1);
  if (menuStore.active === tab.key) {
    if (index <= menuStore.tabs.length - 1) {
      router.push({ name: menuStore.tabs[index].key });
    } else if (index !== 0) {
      router.push({ name: menuStore.tabs[index - 1].key });
    } else {
      router.push("/index");
    }
  }
};

// 右键菜单渲染
const currentTab = ref<TabItem>();
const showTabOption = ref(false);
const tabOptionX = ref(0);
const tabOptionY = ref(0);
const tabOption = [
  {
    key: "close",
    label: "关闭",
  },
  {
    key: "closeOther",
    label: "关闭其他标签页",
  },
  {
    key: "closeAll",
    label: "关闭所有标签页",
  },
];
const handleTabContextMenu = (e: MouseEvent, tab: TabItem) => {
  e.preventDefault();
  currentTab.value = tab;
  showTabOption.value = false;
  nextTick().then(() => {
    showTabOption.value = true;
    tabOptionX.value = e.clientX;
    tabOptionY.value = e.clientY;
  });
};
const handleTabClickoutside = () => {
  showTabOption.value = false;
};
const handleTabOptionSelect = (key: string) => {
  showTabOption.value = false;
  if (key === "close") {
    if (currentTab.value) {
      handleTabClose(currentTab.value);
    }
  } else if (key === "closeOther") {
    if (currentTab.value) {
      menuStore.tabs.length = 0;
      menuStore.tabs.push(currentTab.value);
      if (menuStore.active !== currentTab.value.key) {
        router.push({ name: currentTab.value.key });
      }
    }
  } else if (key === "closeAll") {
    menuStore.tabs.length = 0;
    router.push("/index");
  }
};

// 标签页合并渲染
const tabList = ref<TabItem[]>([]);
const tabMergeList = ref<TabItem[]>([]);
const topRef = ref();
const topWidth = ref(0);
const tabRef = ref();
const tabWidth = ref(0);
const updateTabWidth = () => {
  if (tabRef.value) {
    tabWidth.value = tabRef.value.$el.offsetWidth;
  }
};
const updateTopWidth = () => {
  if (topRef.value) {
    topWidth.value = topRef.value.$el.offsetWidth;
  }
};
const updateTabList = () => {
  tabList.value.length = 0;
  Object.assign(tabList.value, menuStore.tabs);
};
const updateTabMergeList = () => {
  if (
    topWidth.value - (tabWidth.value ?? 0) <= 82 &&
    tabList.value.length > 0
  ) {
    const tab = tabList.value.shift();
    if (tab) {
      tabMergeList.value.push(tab);
    }
  } else if (
    topWidth.value - (tabWidth.value ?? 0) >= 192 &&
    tabMergeList.value.length > 0
  ) {
    const tab = tabMergeList.value.pop();
    if (tab) {
      tabList.value.unshift(tab);
    }
  }
};
const renderTabMerge = ({ option }) => {
  return h(
    NFlex,
    {},
    {
      default: () =>
        h(
          NTag,
          {
            style: {
              cursor: "pointer",
              margin: "3px 6px",
            },
            type: tabType(option.key),
            size: "large",
            bordered: false,
            closable: true,
            onClick: () => handleTabClick(option.key),
            onClose: () => handleTabClose(option),
            onContextmenu: (e) => handleTabContextMenu(e, option),
          },
          { default: () => option.name },
        ),
    },
  );
};

onMounted(() => {
  watch(menuStore.tabs, () => {
    tabMergeList.value.length = 0;
    updateTabList();
  });
  watch(tabList.value, () => {
    nextTick(() => {
      updateTopWidth();
      updateTabWidth();
      updateTabMergeList();
    });
  });
  updateTabList();
  window.addEventListener("resize", () => {
    updateTopWidth();
    updateTabMergeList();
  });
});
</script>

<template>
  <n-flex ref="topRef" class="home-tab" :wrap="false">
    <n-dropdown
      trigger="hover"
      :options="tabMergeList"
      :render-option="renderTabMerge"
    >
      <n-button
        class="home-tab-merge"
        :style="{
          width: 0,
          opacity: tabMergeList.length > 0 ? 1 : 0,
          marginLeft: `${tabMergeList.length > 0 ? 0 : -47}px`,
        }"
        quaternary
        round
        :type="
          tabMergeList.some((tab) => tab.key === menuStore.active)
            ? 'info'
            : 'default'
        "
      >
        <template #icon>
          <n-icon><icon-menu /></n-icon>
        </template>
      </n-button>
    </n-dropdown>
    <n-el class="home-tab-list">
      <n-flex ref="tabRef" :wrap="false">
        <n-tag
          v-for="tab in tabList"
          :key="tab.key"
          :type="tabType(tab.key)"
          class="home-tab-item"
          size="large"
          :bordered="false"
          round
          closable
          @click="handleTabClick(tab.key)"
          @close="handleTabClose(tab)"
          @contextmenu="handleTabContextMenu($event, tab)"
          >{{ tab.name }}
        </n-tag>
      </n-flex>
    </n-el>
  </n-flex>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="tabOptionX"
    :y="tabOptionY"
    :options="tabOption"
    :show="showTabOption"
    :on-clickoutside="handleTabClickoutside"
    @select="handleTabOptionSelect"
  />
</template>

<style scoped>
.home-tab {
  width: 100%;
  margin: auto 16px auto 0;
}

.home-tab-merge {
  transition: all 0.3s;
}

.home-tab-list {
  overflow: hidden;
  white-space: nowrap;
}
.home-tab-item {
  cursor: pointer;
}
</style>
