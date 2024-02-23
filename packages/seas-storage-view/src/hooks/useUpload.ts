import { ref } from "vue";
import { UploadCustomRequestOptions, UploadFileInfo } from "naive-ui";
import { upload, getInfos, del, downloadUrl } from "../request/file.ts";
import { File as FileInfo } from "../entity/file.ts";

const toFileList = (file: FileInfo, fileList: UploadFileInfo[]) => {
  const fileObj: UploadFileInfo = {
    id: file.id,
    name: `${file.fileName}.${file.fileSuffix}`,
    type: file.contentType,
    status: "finished",
  };
  if (file.fileUrl) {
    fileObj.url = downloadUrl(file.id);
  }
  fileList.push(fileObj);
};

export default function useUpload() {
  const bindId = ref();
  const fileList = ref<UploadFileInfo[]>([]);
  let finishFun: (files: Array<FileInfo>) => void;
  const onFinish = (fun: (files: Array<FileInfo>) => void) => {
    finishFun = fun;
  };
  let removeFun: (id: string) => void;
  const onRemove = (fun: (id: string) => void) => {
    removeFun = fun;
  };

  const fileUpload = ({
    file,
    // eslint-disable-next-line no-shadow
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
          res.data?.forEach((item) => toFileList(item, fileList.value));
          if (finishFun) {
            finishFun(res.data ?? []);
          }
          onFinish();
        } else {
          onError();
        }
      })
      .catch(() => {
        onError();
      });
  };

  const fileLoad = () => {
    fileList.value = [];
    getInfos(bindId.value).then((res) => {
      res.data?.forEach((item) => toFileList(item, fileList.value));
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
