import { InternalAxiosRequestConfig } from "axios";

export interface ExtendAxiosRequestConfig extends InternalAxiosRequestConfig {
  disableBar?: boolean;
}

/**
 * 统一响应实体
 */
export interface Result<T> {
  trackId: string;
  code: string;
  tips?: string;
  err?: string;
  data?: T;
}

/**
 * 排序实体
 */
export interface Order {
  column: string;
  asc: boolean;
}

/**
 * 分页实体
 */
export interface Page<T> {
  pages?: number;
  total?: number;
  size?: number;
  current?: number;
  orders?: Order[];
  records?: T[];
}

/**
 * 选择器数据
 */
export interface Select {
  label: string;
  value: string;
}
