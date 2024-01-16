import { createDiscreteApi } from "naive-ui";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { type ExtendAxiosRequestConfig } from "../entity";
import { useThemeStore } from "../store";

let instance: AxiosInstance;

export type RequestInterceptorFunc = (
  config: ExtendAxiosRequestConfig,
) => ExtendAxiosRequestConfig;

export type ResponseFulfilledInterceptorFunc = (
  response: AxiosResponse,
) => void;

export type ResponseRejectedInterceptorFunc = (
  // eslint-disable-next-line
  error: any,
  // eslint-disable-next-line
) => Promise<any> | boolean;

export interface RequestConfig {
  path?: string;
  timeout?: number;
  requestInterceptors?: Array<RequestInterceptorFunc>;
  responseFulfilledInterceptors?: Array<ResponseFulfilledInterceptorFunc>;
  responseRejectedInterceptors?: Array<ResponseRejectedInterceptorFunc>;
}

const requestInterceptors: Array<RequestInterceptorFunc> = [];
const responseFulfilledInterceptors: Array<ResponseFulfilledInterceptorFunc> =
  [];
const responseRejectedInterceptors: Array<ResponseRejectedInterceptorFunc> = [];
let apiPath: string = "/api";

export const addRequestInterceptor = (interceptor: RequestInterceptorFunc) => {
  requestInterceptors.push(interceptor);
};

export const addResponseFulfilledInterceptor = (
  interceptor: ResponseFulfilledInterceptorFunc,
) => {
  responseFulfilledInterceptors.push(interceptor);
};

export const addResponseRejectedInterceptor = (
  interceptor: ResponseRejectedInterceptorFunc,
) => {
  responseRejectedInterceptors.push(interceptor);
};

export const createRequest = (requestConfig?: RequestConfig) => {
  const { message, notification, loadingBar } = createDiscreteApi([
    "message",
    "notification",
    "loadingBar",
  ]);
  instance = axios.create({
    baseURL: requestConfig?.path ?? apiPath,
    timeout: requestConfig?.timeout ?? 60000,
  });
  if (requestConfig?.path) {
    apiPath = requestConfig.path;
  }
  // 请求拦截器
  instance.interceptors.request.use((config: ExtendAxiosRequestConfig) => {
    // 加载条
    if (!config.disableBar) {
      loadingBar.start();
    }
    // 自定义拦截器
    let newConfig = config;
    requestInterceptors.push(...(requestConfig?.requestInterceptors ?? []));
    requestInterceptors.forEach((interceptor) => {
      newConfig = interceptor(config);
    });
    // 空参数处理
    if (config.params) {
      config.params = Object.keys(config.params)
        .filter(
          (key) =>
            config.params[key] !== null && config.params[key] !== undefined,
        )
        .reduce((acc, key) => ({ ...acc, [key]: config.params[key] }), {});
    }
    return newConfig;
  });

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      responseFulfilledInterceptors.push(
        ...(requestConfig?.responseFulfilledInterceptors ?? []),
      );
      responseFulfilledInterceptors.forEach((interceptor) => {
        interceptor(response);
      });
      const { data } = response;
      // 加载条
      if (data.code !== "000" && data.tips) {
        message.warning(data.tips);
        loadingBar.error();
      }
      loadingBar.finish();
      return data;
    },
    (error) => {
      responseRejectedInterceptors.push(
        ...(requestConfig?.responseRejectedInterceptors ?? []),
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const interceptor of responseRejectedInterceptors) {
        const result = interceptor(error);
        if (result !== true) {
          return result;
        }
      }
      // 加载条
      loadingBar.error();
      const { response } = error;
      if (!response) {
        notification.error({
          content: "错误",
          meta: "网络连接异常，请检查网络！",
        });
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
};

export const api = (): AxiosInstance => instance;

export const path = () => apiPath;
