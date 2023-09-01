import { h, ref } from "vue";
import { NButton, NInput, NSpace } from "naive-ui";
import { DialogApiInjection } from "naive-ui/lib/dialog/src/DialogProvider";
import { FormValidationStatus } from "naive-ui/lib/form/src/interface";

interface ConfirmFunc<T> {
  (value: T): void;
}

export default function useAgainDialog<T>(
  dialog: DialogApiInjection,
  title: string,
  emphasize: string,
  info: string,
  verifyInfo: string,
  onConfirm: ConfirmFunc<T>
) {
  const status = ref<FormValidationStatus>();
  const verify = ref();
  const closeAgainDialog = () => {
    dialog.destroyAll();
    status.value = undefined;
    verify.value = undefined;
  };
  const openAgainDialog = (param: T) => {
    dialog.warning({
      title,
      content: () => [
        h(
          "div",
          {
            style: {
              color: "red",
              padding: "10px 0 0 0",
            },
          },
          { default: () => emphasize }
        ),
        h(
          "div",
          {
            style: {
              padding: "0 0 10px 0",
            },
          },
          { default: () => info }
        ),
        h(NInput, {
          placeholder: verifyInfo,
          status: status.value,
          onChange: (v) => {
            verify.value = v;
          },
        }),
      ],
      action: () => [
        h(
          NSpace,
          {
            justify: "end",
          },
          {
            default: () => [
              h(
                NButton,
                {
                  size: "small",
                  onClick: closeAgainDialog,
                },
                { default: () => "取消" }
              ),
              h(
                NButton,
                {
                  type: "info",
                  size: "small",
                  onClick: () => {
                    if (verify.value === verifyInfo) {
                      onConfirm(param);
                    } else {
                      status.value = "error";
                    }
                  },
                },
                { default: () => "确认" }
              ),
            ],
          }
        ),
      ],
      onClose: closeAgainDialog,
    });
  };

  return { openAgainDialog, closeAgainDialog };
}
