import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { Template as Entity, TemplateAssets } from "../entity/template";

const url = "/gen/template";

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

export const assets = (id: string): Promise<Result<Array<TemplateAssets>>> => {
  return api().get(`${url}/assets/${id}`);
};

export const assetsSave = (
  assetsList: Array<TemplateAssets>
): Promise<Result<Array<TemplateAssets>>> => {
  return api().post(`${url}/assets`, assetsList);
};

export const list = (): Promise<Result<Array<Entity>>> => {
  return api().get(`${url}/list`);
};
