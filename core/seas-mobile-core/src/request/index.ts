import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { type ExtendAxiosRequestConfig } from "../entity";

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

export const createSeasRequest = (requestConfig?: RequestConfig) => {
  instance = axios.create({
    baseURL: requestConfig?.path ?? apiPath,
    timeout: requestConfig?.timeout ?? 60000,
  });
  if (requestConfig?.path) {
    apiPath = requestConfig.path;
  }
  // 请求拦截器
  instance.interceptors.request.use((config: ExtendAxiosRequestConfig) => {
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
      const { response } = error;
      if (!response) {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
};

export const api = (): AxiosInstance => instance;

export const path = () => apiPath;
