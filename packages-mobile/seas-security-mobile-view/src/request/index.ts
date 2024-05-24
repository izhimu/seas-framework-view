import {
  event,
  addRequestInterceptor,
  addResponseRejectedInterceptor,
} from "@izhimu/seas-mobile-core";
import { useAuthStore } from "../store";

export const securityRequestInterceptor = () => (config) => {
  const authStore = useAuthStore();
  // 鉴权信息处理
  if (authStore.token) {
    config.headers.set("X-Auth-Token", authStore.token);
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
    return Promise.reject(data);
  }
  return true;
};

addRequestInterceptor(securityRequestInterceptor());
addResponseRejectedInterceptor(securityResponseRejectedInterceptor());
