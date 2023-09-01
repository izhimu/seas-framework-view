import Qs from "qs";
import { Page, Result, api } from "@izhimu/seas-core";
import { Log } from "../entity/log";

const url = "/bas/log";

export function page(
  // eslint-disable-next-line no-shadow
  page: Page<Log>,
  search: Log
): Promise<Result<Page<Log>>> {
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

export function get(id: string): Promise<Result<Log>> {
  return api().get(`${url}/${id}`);
}
