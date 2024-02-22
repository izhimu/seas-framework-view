import { type Result, api } from "@izhimu/seas-core";
import { EncryptKey, Login, LoginUser } from "../entity/security";

const url = "/security";

export function encrypt(): Promise<Result<EncryptKey>> {
  return api().get(`${url}/encrypt/key`);
}

export function login(data: Login): Promise<Result<LoginUser>> {
  return api().post(`${url}/login`, data);
}

export function logout(): Promise<Result<void>> {
  return api().post(`${url}/logout`);
}
