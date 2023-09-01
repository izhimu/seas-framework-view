import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { Conf } from "../entity/conf";

const url = "/bas/conf";

export const page = (
  // eslint-disable-next-line no-shadow
  page: Page<Conf>,
  search: Conf
): Promise<Result<Page<Conf>>> => {
  return api().get(`${url}/page`, {
    params: { ...page, ...search },
    paramsSerializer: {
      serialize(params) {
        return Qs.stringify(params, {
          arrayFormat: "indices",
          allowDots: true,
        });
      },
    },
  });
};

export const get = (id: string): Promise<Result<Conf>> => {
  return api().get(`${url}/${id}`);
};

export const save = (data: Conf): Promise<Result<void>> => {
  return api().post(`${url}`, data);
};

export const update = (data: Conf): Promise<Result<void>> => {
  return api().put(`${url}`, data);
};

export const del = (id: string): Promise<Result<void>> => {
  return api().delete(`${url}/${id}`);
};

export const getConf = (key: string): Promise<Result<Conf>> => {
  return api().get(`${url}/get?key=${key}`);
};

export const usable = (
  id: string | null,
  key: string
): Promise<Result<boolean>> => {
  return api().get(`${url}/usable?key=${key}${id ? `&id=${id}` : ""}`);
};
