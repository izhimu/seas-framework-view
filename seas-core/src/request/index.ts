import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ExtendAxiosRequestConfig } from "../entity/core.ts";

export type RequestInterceptorFunc = (
  config: ExtendAxiosRequestConfig
) => ExtendAxiosRequestConfig;

export type ResponseFulfilledInterceptorFunc = (
  response: AxiosResponse
) => void;

export type ResponseRejectedInterceptorFunc = (
  error: any
) => Promise<any> | boolean;

export interface ISeasApi {
  requestInterceptors: Array<RequestInterceptorFunc>;
  responseFulfilledInterceptors: Array<ResponseFulfilledInterceptorFunc>;
  responseRejectedInterceptors: Array<ResponseRejectedInterceptorFunc>;

  addRequestInterceptor(interceptor: RequestInterceptorFunc): this;

  addResponseFulfilledInterceptor(
    interceptor: ResponseFulfilledInterceptorFunc
  ): this;

  addResponseRejectedInterceptor(
    interceptor: ResponseRejectedInterceptorFunc
  ): this;

  build(): AxiosInstance;
}

export const apiPath = "/api";

export class SeasApi implements ISeasApi {
  static instance: AxiosInstance;

  requestInterceptors: Array<RequestInterceptorFunc> = [];

  responseFulfilledInterceptors: Array<ResponseFulfilledInterceptorFunc> = [];

  responseRejectedInterceptors: Array<ResponseRejectedInterceptorFunc> = [];

  addRequestInterceptor(interceptor: RequestInterceptorFunc): this {
    this.requestInterceptors.push(interceptor);
    return this;
  }

  addResponseFulfilledInterceptor(
    interceptor: ResponseFulfilledInterceptorFunc
  ): this {
    this.responseFulfilledInterceptors.push(interceptor);
    return this;
  }

  addResponseRejectedInterceptor(
    interceptor: ResponseRejectedInterceptorFunc
  ): this {
    this.responseRejectedInterceptors.push(interceptor);
    return this;
  }

  build(path = apiPath, timeout = 60000): AxiosInstance {
    SeasApi.instance = axios.create({
      baseURL: path,
      timeout,
    });

    // 请求拦截器
    SeasApi.instance.interceptors.request.use(
      (config: ExtendAxiosRequestConfig) => {
        // 加载条
        if (!config.disableBar) {
          window.$loadingBar?.start();
        }
        let tmpConfig = config;
        this.requestInterceptors.forEach((interceptor) => {
          tmpConfig = interceptor(config);
        });
        // 空参数处理
        if (config.params) {
          config.params = Object.keys(config.params)
            .filter(
              (key) =>
                config.params[key] !== null && config.params[key] !== undefined
            )
            .reduce((acc, key) => ({ ...acc, [key]: config.params[key] }), {});
        }
        return tmpConfig;
      }
    );

    // 响应拦截器
    SeasApi.instance.interceptors.response.use(
      (response) => {
        this.responseFulfilledInterceptors.forEach((interceptor) => {
          interceptor(response);
        });
        const { data } = response;
        // 加载条
        if (data.code !== "000" && data.tips) {
          window.$message.warning(data.tips);
          window.$loadingBar?.error();
        }
        window.$loadingBar?.finish();
        return data;
      },
      (error) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const interceptor of this.responseRejectedInterceptors) {
          const result = interceptor(error);
          if (result !== true) {
            return result;
          }
        }
        // 加载条
        window.$loadingBar?.error();
        const { response } = error;
        if (!response) {
          window.$notification.error({
            content: "错误",
            meta: "网络连接异常，请检查网络！",
          });
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return SeasApi.instance;
  }
}

export const api = () => SeasApi.instance;

export const newApi = () => new SeasApi();
