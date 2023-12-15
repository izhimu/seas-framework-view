import { Result, api } from "@izhimu/seas-core";
import { Info as Entity } from "../entity/info";

const url = "/gen/info";

export const get = (id: string, table: string): Promise<Result<Entity>> => {
  return api().get(`${url}?sourceId=${id}&table=${table}`);
};

export const create = (data: Entity): Promise<Result<null>> => {
  return api().post(`${url}/create`, data);
};

export const preview = (data: Entity): Promise<Result<null>> => {
  return api().post(`${url}/preview`, data);
};
