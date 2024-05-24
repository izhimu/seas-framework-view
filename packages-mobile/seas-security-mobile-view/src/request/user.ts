import { Result, api } from "@izhimu/seas-mobile-core";
import { User } from "../entity/user";

const url = "/bas/user";

export function current(): Promise<Result<User>> {
  return api().get(`${url}/current`);
}
