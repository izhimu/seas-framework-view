import Qs from "qs";
import { TreeOption } from "naive-ui/es/tree/src/interface";
import { Page, Result, api } from "@izhimu/seas-core/src";
import { Org } from "../entity/org";

const url = "/bas/org";
export function tree(search?: Org): Promise<Result<Array<TreeOption>>> {
  return api().get(`${url}/tree`, {
    params: { ...search },
    paramsSerializer: {
      serialize(params) {
        return Qs.stringify(params, {
          arrayFormat: "indices",
          allowDots: true,
        });
      },
    },
  });
}

export function page(
  // eslint-disable-next-line no-shadow
  page: Page<Org>,
  search: Org,
): Promise<Result<Page<Org>>> {
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
}

export function get(id: string): Promise<Result<Org>> {
  return api().get(`${url}/${id}`);
}

export function save(data: Org): Promise<Result<void>> {
  return api().post(`${url}`, data);
}

export function update(data: Org): Promise<Result<void>> {
  return api().put(`${url}`, data);
}

export function del(id: string): Promise<Result<void>> {
  return api().delete(`${url}/${id}`);
}
