import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { Datasource as Entity } from "../entity/datasource";

const url = "/gen/datasource";

export const page = (
  // eslint-disable-next-line no-shadow
  page: Page<Entity>,
  search: Entity
): Promise<Result<Page<Entity>>> => {
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

export const get = (id: string): Promise<Result<Entity>> => {
  return api().get(`${url}/${id}`);
};

export const save = (data: Entity): Promise<Result<void>> => {
  return api().post(`${url}`, data);
};

export const update = (data: Entity): Promise<Result<void>> => {
  return api().put(`${url}`, data);
};

export const del = (id: string): Promise<Result<void>> => {
  return api().delete(`${url}/${id}`);
};

export const test = (id: string): Promise<Result<boolean>> => {
  return api().post(`${url}/test/${id}`);
};

export const list = (): Promise<Result<Array<Entity>>> => {
  return api().get(`${url}/list`);
};

export const tables = (
  id: string,
  like?: string
): Promise<Result<Array<string>>> => {
  if (like) {
    return api().get(`${url}/tables/${id}?like=${like}`);
  }
  return api().get(`${url}/tables/${id}`);
};
