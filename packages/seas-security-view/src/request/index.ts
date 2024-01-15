import {
  event,
  addRequestInterceptor,
  addResponseRejectedInterceptor,
} from "@izhimu/seas-core";
import { useUserStore } from "../store";

export const securityRequestInterceptor = () => (config) => {
  const userStore = useUserStore();
  // 鉴权信息处理
  if (userStore.isLogin()) {
    config.headers.set("X-Auth-Token", userStore.current.token);
  }
  return config;
};

export const securityResponseRejectedInterceptor = () => (error) => {
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

addRequestInterceptor(securityRequestInterceptor());
addResponseRejectedInterceptor(securityResponseRejectedInterceptor());
