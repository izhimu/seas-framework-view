import { ref } from "vue";
import { Store } from "vuex";
import { UploadCustomRequestOptions, UploadFileInfo } from "naive-ui";
import { upload, getInfos, del, downloadUrl } from "../request/file.ts";
import { File, File as FileInfo } from "../entity/file.ts";

const toFileList = (
  file: FileInfo,
  fileList: UploadFileInfo[],
  store: Store<any>
) => {
  const fileObj: UploadFileInfo = {
    id: file.id,
    name: `${file.fileName}.${file.fileSuffix}`,
    type: file.contentType,
    status: "finished",
  };
  if (file.fileUrl) {
    const user = store.state.security.loginUser;
    if (user) {
      fileObj.url = downloadUrl(file.id, user.token);
    }
  }
  fileList.push(fileObj);
};

export default function useUpload(store: Store<any>) {
  const bindId = ref();
  const fileList = ref<UploadFileInfo[]>([]);
  let finishFun: (files: Array<File>) => void;
  const onFinish = (fun: (files: Array<File>) => void) => {
    finishFun = fun;
  };
  let removeFun: (id: string) => void;
  const onRemove = (fun: (id: string) => void) => {
    removeFun = fun;
  };

  const fileUpload = ({
    file,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions) => {
    const formData = new FormData();
    if (bindId.value) {
      formData.append("bindId", bindId.value);
    }
    formData.append(file.name, file.file as File);
    upload(formData, ({ loaded, total }) => {
      onProgress({ percent: total ? Math.ceil((loaded / total) * 100) : 1 });
    })
      .then((res) => {
        if (res.code === "000") {
          fileList.value.pop();
          res.data?.forEach((item) => toFileList(item, fileList.value, store));
          if (finishFun) {
            finishFun(res.data);
          }
          onFinish();
        } else {
          onError();
        }
      })
      .catch((e) => {
        console.error(e);
        onError();
      });
  };

  const fileLoad = () => {
    fileList.value = [];
    getInfos(bindId.value).then((res) => {
      res.data?.forEach((item) => toFileList(item, fileList.value, store));
    });
  };

  const fileRemove = (data: {
    file: UploadFileInfo;
    fileList: UploadFileInfo[];
  }) => {
    if (data.file.id) {
      del(data.file.id);
      if (removeFun) {
        removeFun(data.file.id);
      }
    }
  };

  return {
    bindId,
    fileList,
    fileUpload,
    fileLoad,
    fileRemove,
    onFinish,
    onRemove,
  };
}
