import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { MqtUser } from "../entity/mqtUser";

const url = "/mqt/user";

export const page = (
  // eslint-disable-next-line no-shadow
  page: Page<MqtUser>,
  search: MqtUser,
): Promise<Result<Page<MqtUser>>> => {
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

export const get = (id: string): Promise<Result<MqtUser>> => {
  return api().get(`${url}/${id}`);
};

export const save = (data: MqtUser): Promise<Result<void>> => {
  return api().post(`${url}`, data);
};

export const update = (data: MqtUser): Promise<Result<void>> => {
  return api().put(`${url}`, data);
};

export const del = (id: string): Promise<Result<void>> => {
  return api().delete(`${url}/${id}`);
};
