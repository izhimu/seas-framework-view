import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { BasTopic, BasTopicMenu } from "../entity/basTopic";

const url = "/bas/topic";

export const page = (
  // eslint-disable-next-line no-shadow
  page: Page<BasTopic>,
  search: BasTopic,
): Promise<Result<Page<BasTopic>>> => {
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

export const get = (id: string): Promise<Result<BasTopic>> => {
  return api().get(`${url}/${id}`);
};

export const save = (data: BasTopic): Promise<Result<void>> => {
  return api().post(`${url}`, data);
};

export const update = (data: BasTopic): Promise<Result<void>> => {
  return api().put(`${url}`, data);
};

export const del = (id: string): Promise<Result<void>> => {
  return api().delete(`${url}/${id}`);
};

export const topicMenu = (id: string): Promise<Result<Array<string>>> => {
  return api().get(`${url}/menu/${id}`);
};

export const updateTopicMenu = (data: BasTopicMenu): Promise<Result<void>> => {
  return api().post(`${url}/menu`, data);
};

export const list = (): Promise<Result<Array<BasTopic>>> => {
  return api().get(`${url}/list`);
};

export const authList = (): Promise<Result<Array<BasTopic>>> => {
  return api().get(`${url}/auth/list`);
};
