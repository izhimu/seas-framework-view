import Qs from "qs";
import { TreeOption } from "naive-ui/es/tree/src/interface";
import { Page, Result, api } from "@izhimu/seas-core/src";
import { Menu } from "../entity/menu";

const url = "/bas/menu";

export function tree(search?: Menu): Promise<Result<Array<TreeOption>>> {
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
  page: Page<Menu>,
  search: Menu,
): Promise<Result<Page<Menu>>> {
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

export function get(id: string): Promise<Result<Menu>> {
  return api().get(`${url}/${id}`);
}

export function save(data: Menu): Promise<Result<void>> {
  return api().post(`${url}`, data);
}

export function update(data: Menu): Promise<Result<void>> {
  return api().put(`${url}`, data);
}

export function del(id: string): Promise<Result<void>> {
  return api().delete(`${url}/${id}`);
}

export function auth(): Promise<Result<Array<Menu>>> {
  return api().get(`${url}/auth`);
}
