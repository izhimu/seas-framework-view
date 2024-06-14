import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { type MenuOption } from "naive-ui";
import { useIcon, useCommonStore } from "@izhimu/seas-core";
import { auth } from "../request/menu";
import { useMenuStore } from "../store";

export type MenuOptions = Array<MenuOption>;
export default function useMenu() {
  const router = useRouter();
  const commonStore = useCommonStore();
  const menuRef = ref();
  const menuStore = useMenuStore();
  const { iconMap } = useIcon();
  const menuActiveKey = ref<unknown>(null);
  const menuCollapsed = ref(false);
  const menuOptions = reactive<MenuOptions>([]);
  const loadMenuData = () => {
    const map = new Map();
    auth().then((res) => {
      if (res.code !== "000" || !res.data) {
        return;
      }
      commonStore.resetAuth();
      res.data.forEach((item) => {
        if (item.id && item.id !== "1" && item.menuCode && item.menuName) {
          if (item.menuType === 0) {
            map.set(item.id, {
              id: item.id,
              label: item.menuName,
              key: item.menuCode,
              icon: iconMap.get(item.menuCode),
            });
            commonStore.menu.push(item.menuCode);
          } else {
            commonStore.auth.push(item.menuCode);
          }
        }
      });
      res.data.forEach((item) => {
        if (
          item.id &&
          item.parentId &&
          item.parentId !== "0" &&
          item.menuType === 0
        ) {
          const parent = map.get(item.parentId);
          if (parent) {
            (parent.children || (parent.children = [])).push(map.get(item.id));
          } else {
            menuOptions.push(map.get(item.id));
          }
        }
      });
      if (menuStore.active) {
        menuRef.value?.showOption(menuStore.active);
      }
    });
  };
  const handleMenuClick = (key: string, item: MenuOption) => {
    router.push({ name: key });
    if (!menuStore.tabs.some((tab) => tab.key === key)) {
      menuStore.tabs.push({ key, name: item.label?.toString() ?? "" });
    }
  };
  return {
    menuRef,
    menuActiveKey,
    menuCollapsed,
    menuOptions,
    loadMenuData,
    handleMenuClick,
  };
}
