import { h, VNode } from "vue";
import { NIcon } from "naive-ui";
import { SearchSharp } from "@vicons/ionicons5";
import { Icon } from "../types";

export const SearchIcon = SearchSharp;

const iconMap = new Map<string, () => VNode>();

export default function useIcon() {
  const renderIcon = (icon: Icon) => {
    return () => h(NIcon, null, { default: () => h(icon) });
  };

  const loadIcon = (key: string, icon: Icon) => {
    iconMap.set(key, renderIcon(icon));
  };

  return { renderIcon, loadIcon, iconMap, SearchIcon };
}
