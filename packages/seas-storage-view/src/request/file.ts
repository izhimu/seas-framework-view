import { AxiosProgressEvent } from "axios";
import { Result, api, path } from "@izhimu/seas-core";
import { File } from "../entity/file.ts";

const url = "/sto/file";

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

export function downloadUrl(id: string, token?: string): string {
  if (token) {
    return `${path()}${url}/${id}?X-Auth-Token=${token}`;
  }
  return `${path()}${url}/${id}`;
}

export function downloadsUrl(bindId: string, token?: string): string {
  if (token) {
    return `${path()}${url}/bind/${bindId}?X-Auth-Token=${token}`;
  }
  return `${path()}${url}/bind/${bindId}`;
}

export function previewUrl(id: string, token?: string): string {
  if (token) {
    return `${path()}${url}/preview/pdf/${id}?X-Auth-Token=${token}`;
  }
  return `${path()}${url}/preview/pdf/${id}`;
}
