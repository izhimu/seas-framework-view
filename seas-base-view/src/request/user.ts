import Qs from "qs";
import { Page, Result, Select, api } from "@izhimu/seas-core";
import { User } from "../entity/user";
import { Password } from "../entity/account";

const url = "/bas/user";
const accountUrl = "/bas/account";

export function page(
  // eslint-disable-next-line no-shadow
  page: Page<User>,
  search: User
): Promise<Result<Page<User>>> {
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

export function get(id: string): Promise<Result<User>> {
  return api().get(`${url}/${id}`);
}

export function save(data: User): Promise<Result<void>> {
  return api().post(`${url}`, data);
}

export function update(data: User): Promise<Result<void>> {
  return api().put(`${url}`, data);
}

export function del(id: string): Promise<Result<void>> {
  return api().delete(`${url}/${id}`);
}

export function list(): Promise<Result<Array<User>>> {
  return api().get(`${url}/list`);
}

export function like(search: string): Promise<Result<Array<Select>>> {
  return api().get(`${url}/like?search=${search}`);
}

export function likeAccount(search: string): Promise<Result<Array<Select>>> {
  return api().get(`${accountUrl}/like?search=${search}`);
}

export function current(): Promise<Result<User>> {
  return api().get(`${url}/current`);
}

export function checkAccount(data: object): Promise<Result<boolean>> {
  return api().post(`${accountUrl}/check`, data);
}

export function changePassword(data: Password): Promise<Result<boolean>> {
  return api().post(`${accountUrl}/change/password`, data);
}

export function unlock(id: string): Promise<Result<boolean>> {
  return api().post(`${url}/unlock/${id}`);
}
