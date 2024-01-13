import { Result, api } from "@izhimu/seas-core/src";

const url = "/bas/common";

// eslint-disable-next-line import/prefer-default-export
export function snowflake(): Promise<Result<string>> {
  return api().get(`${url}/snowflake`);
}
