import { ExtendAxiosRequestConfig, Result, api } from "@izhimu/seas-core/src";
import { CpuInfo, Disk, Memory, Network, Sensors } from "../entity/os.ts";

const url = "/hea/os";

export function info(): Promise<Result<string>> {
  return api().get(`${url}/info`);
}

export function memory(): Promise<Result<Memory>> {
  return api().get(`${url}/memory`, <ExtendAxiosRequestConfig>{
    disableBar: true,
  });
}

export function sensors(): Promise<Result<Sensors>> {
  return api().get(`${url}/sensors`, <ExtendAxiosRequestConfig>{
    disableBar: true,
  });
}

export function disk(): Promise<Result<Array<Disk>>> {
  return api().get(`${url}/disk`);
}

export function network(): Promise<Result<Array<Network>>> {
  return api().get(`${url}/network`);
}

export function cpu(): Promise<Result<CpuInfo>> {
  return api().get(`${url}/cpu`, <ExtendAxiosRequestConfig>{
    disableBar: true,
  });
}
