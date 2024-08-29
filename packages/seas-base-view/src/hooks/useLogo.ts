import { reactive, h } from "vue";
import { useRouter } from "vue-router";
import { type MenuOption, NImage } from "naive-ui";
import { useCommonStore } from "@izhimu/seas-core";
import { useConfigStore } from "../store";

export type MenuOptions = Array<MenuOption>;
export default function useLogo() {
  const router = useRouter();
  const commonStore = useCommonStore();
  const configStore = useConfigStore();
  const logoOptions = reactive<MenuOptions>([
    {
      key: "_logo_",
      label: () =>
        h(
          "div",
          {
            style: configStore.logo.titleStyle,
          },
          {
            default: () =>
              configStore.logo.title
                ? configStore.logo.title
                : commonStore.name,
          },
        ),
      icon: () =>
        h(NImage, {
          src: configStore.logo.iconSrc,
          height: configStore.logo.iconSize,
          style: configStore.logo.iconStyle,
          previewDisabled: true,
        }),
    },
  ]);
  const handleLogoClick = () => {
    router.push("/index");
  };
  return {
    logoOptions,
    handleLogoClick,
  };
}
