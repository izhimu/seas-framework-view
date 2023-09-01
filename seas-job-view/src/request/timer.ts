import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { Timer } from "../entity/timer.ts";

const url = "/job/timer";

export const page = (
  // eslint-disable-next-line no-shadow
  page: Page<Timer>,
  search: Timer
): Promise<Result<Page<Timer>>> => {
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

export const get = (id: string): Promise<Result<Timer>> => {
  return api().get(`${url}/${id}`);
};

export const save = (data: Timer): Promise<Result<void>> => {
  return api().post(`${url}`, data);
};

export const update = (data: Timer): Promise<Result<void>> => {
  return api().put(`${url}`, data);
};

export const del = (id: string): Promise<Result<void>> => {
  return api().delete(`${url}/${id}`);
};

export const exec = (data: Timer): Promise<Result<void>> => {
  return api().post(`${url}/exec`, data);
};
