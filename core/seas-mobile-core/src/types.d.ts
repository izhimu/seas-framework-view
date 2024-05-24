/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DefineComponent,
  ComponentOptionsMixin,
  AllowedComponentProps,
  ComponentCustomProps,
  EmitsOptions,
  VNodeProps,
} from "vue";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import { NotificationApiInjection } from "naive-ui/lib/notification/src/NotificationProvider";
import { TableBaseColumn } from "naive-ui/lib/data-table/src/interface";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";

export {};

declare global {
  type KMPJsBridge = {
    callNative: (
      methodName: string,
      params?: string,
      callback?: (data: string) => void,
    ) => void;
  };
  interface Window {
    $message: MessageApiInjection;
    $notification: NotificationApiInjection;
    $loadingBar: LoadingBarApiInjection;
    kmpJsBridge: KMPJsBridge;
    token: string;
  }
}

export declare type Icon = DefineComponent<
  any,
  any,
  any,
  any,
  any,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<any>,
  any
>;

export declare type Column<T> = TableBaseColumn<T> & { sortKey?: string };

export declare type Columns<T> = Array<Column<T>>;

export declare type TagMap = {
  title: string;
  tag: "default" | "success" | "error" | "warning" | "info" | "primary";
};
