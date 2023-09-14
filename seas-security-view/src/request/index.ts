import { Store } from "vuex";
import { event } from "@izhimu/seas-core";
import { ResponseRejectedInterceptorFunc } from "@izhimu/seas-core/src/request/index.ts";
import { LoginUser } from "../entity/security";

export const securityRequestInterceptor = (store: Store) => (config) => {
  const user: LoginUser | null = store.state.security.loginUser;
  // 鉴权信息处理
  if (user) {
    config.headers.set("X-Auth-Token", user.token);
  }
  return config;
};

export const securityResponseRejectedInterceptor =
  (): ResponseRejectedInterceptorFunc => (error) => {
    const { response } = error;
    if (response.data) {
      const { data } = response;
      if (data.code) {
        if (data.code === "014") {
          event.emit("toLogin");
        }
      }
      window.$message.error(data.tips);
      return Promise.reject(data);
    }
    return true;
  };
