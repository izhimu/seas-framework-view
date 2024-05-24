import {
  useCommonStore,
  type DirectiveFunction,
} from "@izhimu/seas-mobile-core";

const authDirective = (): DirectiveFunction => ({
  name: "auth",
  directive: (el, binding) => {
    const commonStore = useCommonStore();
    if (commonStore.auth.indexOf(binding.value) === -1) {
      el.remove();
    }
  },
});

export default authDirective;
