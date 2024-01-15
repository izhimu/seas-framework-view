import { h } from "vue";
import { Type } from "naive-ui/lib/button/src/interface";
import { MaybeArray } from "naive-ui/lib/_utils";
import { NButton, NPopconfirm } from "naive-ui";
import { useCommonStore } from "../store";

export default function useTableButton() {
  const commonStore = useCommonStore();
  const actionButton = (
    name: string,
    type: Type,
    auth?: string,
    onClick?: MaybeArray<(e: MouseEvent) => void>,
    config?: object,
  ) => {
    if (auth && commonStore.auth.indexOf(auth) === -1) {
      return null;
    }
    return h(
      NButton,
      {
        tertiary: true,
        size: "small",
        type,
        auth,
        onClick,
        ...config,
      },
      { default: () => name },
    );
  };

  const confirmButton = (
    name: string,
    title: string,
    type: Type,
    auth?: string,
    onPositiveClick?: (e: MouseEvent) => any,
    onNegativeClick?: (e: MouseEvent) => any,
    config?: object,
  ) => {
    if (auth && commonStore.auth.indexOf(auth) === -1) {
      return null;
    }
    return h(
      NPopconfirm,
      {
        auth,
        onPositiveClick,
        onNegativeClick,
      },
      {
        trigger: () =>
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              type,
              ...config,
            },
            { default: () => name },
          ),
        default: () => title,
      },
    );
  };
  return { actionButton, confirmButton };
}
