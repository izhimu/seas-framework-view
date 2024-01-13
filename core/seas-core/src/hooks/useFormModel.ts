import { ref } from "vue";

export default function useFormModel() {
  const btnLoading = ref(false);
  const dataLoading = ref(false);
  const showModel = ref(false);
  const addStatus = ref(true);

  let afterCloseFunc: () => void = () => null;

  const open = (add?: boolean) => {
    showModel.value = true;
    addStatus.value = add ?? true;
  };

  const afterClose = (func: () => void) => {
    afterCloseFunc = func;
  };

  const close = () => {
    showModel.value = false;
    btnLoading.value = false;
    dataLoading.value = false;
    afterCloseFunc();
  };

  return {
    btnLoading,
    dataLoading,
    showModel,
    addStatus,
    afterClose,
    open,
    close,
  };
}
