import { Result, api } from "@izhimu/seas-core/src";
import { Captcha } from "../entity/captcha";

const url = "/captcha";

export function get(data: Captcha): Promise<Result<Captcha>> {
  return api().post(`${url}/get`, data);
}

export function check(data: Captcha): Promise<Result<Captcha>> {
  return api().post(`${url}/check`, data);
}
