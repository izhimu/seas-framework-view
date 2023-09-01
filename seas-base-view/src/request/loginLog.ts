import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { LoginLog } from "../entity/loginLog";

const url = "/bas/account/log";

export function page(
  // eslint-disable-next-line no-shadow
  page: Page<LoginLog>,
  search: LoginLog
): Promise<Result<Page<LoginLog>>> {
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

export function get(id: string): Promise<Result<LoginLog>> {
  return api().get(`${url}/${id}`);
}
