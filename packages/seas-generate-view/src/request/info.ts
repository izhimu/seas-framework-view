import { Result, api } from "@izhimu/seas-core/src";
import { Info as Entity } from "../entity/info";
import { TemplateAssets } from "../entity/template.ts";

const url = "/gen/info";

export const get = (id: string, table: string): Promise<Result<Entity>> => {
  return api().get(`${url}?sourceId=${id}&table=${table}`);
};

export const create = (data: Entity): Promise<Blob> => {
  return api().post(`${url}/create`, data, { responseType: "blob" });
};

export const preview = (
  data: Entity,
): Promise<Result<Array<TemplateAssets>>> => {
  return api().post(`${url}/preview`, data);
};
