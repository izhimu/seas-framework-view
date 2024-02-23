import { AxiosProgressEvent } from "axios";
import { Result, api, path } from "@izhimu/seas-core";
import { useUserStore } from "@izhimu/seas-security-view";
import { File } from "../entity/file.ts";

const url = "/sto/file";

const getToken = () => {
  let token;
  try {
    const userStore = useUserStore();
    token = userStore.current.token;
    // eslint-disable-next-line no-empty
  } catch (_) {}
  return token;
};

export function getInfo(id: string): Promise<Result<File>> {
  return api().get(`${url}/info/${id}`);
}

export function getInfos(bindId: string): Promise<Result<Array<File>>> {
  return api().get(`${url}/info/bind/${bindId}`);
}

export function getInfosToCompression(bindId: string): Promise<Result<File>> {
  return api().get(`${url}/info/bind/compression/${bindId}`);
}

export function del(id: string): Promise<Result<void>> {
  return api().delete(`${url}/info/${id}`);
}

export function dels(bindId: string): Promise<Result<void>> {
  return api().delete(`${url}/info/bind/${bindId}`);
}

export function snowflake(): Promise<Result<string>> {
  return api().get(`${url}/info/snowflake`);
}

export function download(id: string): Promise<Blob> {
  return api().get(`${url}/${id}`, { responseType: "blob" });
}

export function downloads(bindId: string): Promise<Blob> {
  return api().get(`${url}/bind/${bindId}`, { responseType: "blob" });
}

export function upload(
  forms: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
): Promise<Result<Array<File>>> {
  return api().post(`${url}`, forms, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
}

export function downloadUrl(id: string): string {
  const token = getToken();
  if (token) {
    return `${path()}${url}/${id}?X-Auth-Token=${token}`;
  }
  return `${path()}${url}/${id}`;
}

export function downloadsUrl(bindId: string): string {
  const token = getToken();
  if (token) {
    return `${path()}${url}/bind/${bindId}?X-Auth-Token=${token}`;
  }
  return `${path()}${url}/bind/${bindId}`;
}

export function previewUrl(id: string): string {
  const token = getToken();
  if (token) {
    return `${path()}${url}/preview/pdf/${id}?X-Auth-Token=${token}`;
  }
  return `${path()}${url}/preview/pdf/${id}`;
}
