import Qs from "qs";
import { Page, Result, Select, api } from "@izhimu/seas-core/src";
import { Role, AuthMenu, AuthOrg } from "../entity/role";
import { UserRole } from "../entity/user";
import { BasAuthTopic } from "../entity/basTopic.ts";

const url = "/bas/role";

export function page(
  // eslint-disable-next-line no-shadow
  page: Page<Role>,
  search: Role,
): Promise<Result<Page<Role>>> {
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

export function get(id: string): Promise<Result<Role>> {
  return api().get(`${url}/${id}`);
}

export function save(data: Role): Promise<Result<void>> {
  return api().post(`${url}`, data);
}

export function update(data: Role): Promise<Result<void>> {
  return api().put(`${url}`, data);
}

export function del(id: string): Promise<Result<void>> {
  return api().delete(`${url}/${id}`);
}

export function authMenu(id: string): Promise<Result<Array<string>>> {
  return api().get(`${url}/auth/menu/${id}`);
}

export function updateAuthMenu(data: AuthMenu): Promise<Result<void>> {
  return api().post(`${url}/auth/menu`, data);
}

export function authOrg(id: string): Promise<Result<Array<string>>> {
  return api().get(`${url}/auth/org/${id}`);
}

export function updateAuthOrg(data: AuthOrg): Promise<Result<void>> {
  return api().post(`${url}/auth/org`, data);
}

export function user(id: string): Promise<Result<Array<string>>> {
  return api().get(`${url}/user/${id}`);
}

export function updateUser(data: UserRole): Promise<Result<void>> {
  return api().post(`${url}/user`, data);
}

export function select(): Promise<Result<Array<Select>>> {
  return api().get(`${url}/select`);
}

export function topic(id: string): Promise<Result<Array<string>>> {
  return api().get(`${url}/topic/${id}`);
}

export function updateTopic(data: BasAuthTopic): Promise<Result<void>> {
  return api().post(`${url}/topic`, data);
}
