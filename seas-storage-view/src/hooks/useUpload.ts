import { ref } from "vue";
import { useStore } from "vuex";
import { UploadCustomRequestOptions, UploadFileInfo } from "naive-ui";
import { upload, getInfos, del } from "../request/file.ts";
import { File as FileInfo } from "../entity/file.ts";

const store = useStore();
const toFileList = (file: FileInfo, fileList: UploadFileInfo[]) => {
  const fileObj: UploadFileInfo = {
    id: file.id,
    name: `${file.fileName}.${file.fileSuffix}`,
    type: file.contentType,
    status: "finished",
  };
  if (file.fileUrl) {
    const user = store.state.loginUser;
    if (user) {
      fileObj.url = `${file.fileUrl}?token=${user.token}`;
    }
  }
  fileList.push(fileObj);
};

export default function useUpload() {
  const bindId = ref();
  const fileList = ref<UploadFileInfo[]>([]);

  const fileUpload = ({
    file,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions) => {
    const formData = new FormData();
    formData.append("bindId", bindId.value);
    formData.append(file.name, file.file as File);
    upload(formData, ({ loaded, total }) => {
      onProgress({ percent: total ? Math.ceil((loaded / total) * 100) : 1 });
    })
      .then((res) => {
        if (res.code === "000") {
          fileList.value.pop();
          res.data?.forEach((item) => toFileList(item, fileList.value));
          onFinish();
        } else {
          onError();
        }
      })
      .catch(() => onError());
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
    }
  };

  return { bindId, fileList, fileUpload, fileLoad, fileRemove };
}
