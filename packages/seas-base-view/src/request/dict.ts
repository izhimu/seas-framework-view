import Qs from "qs";
import { TreeOption } from "naive-ui/es/tree/src/interface";
import { Page, Result, Select, api } from "@izhimu/seas-core/src";
import { Dict } from "../entity/dict";

const url = "/bas/dict";

export function tree(search?: Dict): Promise<Result<Array<TreeOption>>> {
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
  page: Page<Dict>,
  search: Dict,
): Promise<Result<Page<Dict>>> {
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

export function get(id: string): Promise<Result<Dict>> {
  return api().get(`${url}/${id}`);
}

export function save(data: Dict): Promise<Result<void>> {
  return api().post(`${url}`, data);
}

export function update(data: Dict): Promise<Result<void>> {
  return api().put(`${url}`, data);
}

export function del(id: string): Promise<Result<void>> {
  return api().delete(`${url}/${id}`);
}

export function select(code: string): Promise<Result<Array<Select>>> {
  return api().get(`${url}/select`, {
    params: { code },
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
