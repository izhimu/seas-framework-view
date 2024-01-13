import { TagMap } from "../types";

export interface Timer {
  id: string | null;
  name: string | null;
  key: string | null;
  type: 0 | 1 | 2 | null;
  expression: string | null;
  classPath: string | null;
  param: string | null;
  startTime: string | null;
  endTime: string | null;
  status: 0 | 1 | 2 | null;
}

export const pTimer = (): Timer => ({
  id: null,
  name: null,
  key: null,
  type: null,
  expression: null,
  classPath: null,
  param: null,
  startTime: null,
  endTime: null,
  status: null,
});

export const dTimer = (): Timer => ({
  id: null,
  name: null,
  key: null,
  type: 0,
  expression: null,
  classPath: null,
  param: null,
  startTime: null,
  endTime: null,
  status: null,
});

export const oType = [
  {
    label: "Cron",
    value: 0,
  },
  {
    label: "间隔执行",
    value: 2,
  },
  {
    label: "定时执行",
    value: 1,
  },
];

export const oStatus = [
  {
    label: "就绪",
    value: 0,
  },
  {
    label: "运行",
    value: 1,
  },
  {
    label: "完成",
    value: 2,
  },
  {
    label: "异常",
    value: 3,
  },
];

export const oUnit = [
  {
    label: "毫秒",
    value: "ms",
  },
  {
    label: "秒",
    value: "s",
  },
  {
    label: "分钟",
    value: "min",
  },
  {
    label: "小时",
    value: "h",
  },
  {
    label: "天",
    value: "d",
  },
];

export const mType = new Map<number, TagMap>([
  [
    0,
    {
      title: "Cron",
      tag: "default",
    },
  ],
  [
    1,
    {
      title: "定时执行",
      tag: "default",
    },
  ],
  [
    2,
    {
      title: "间隔执行",
      tag: "default",
    },
  ],
]);

export const mStatus = new Map<number, TagMap>([
  [
    0,
    {
      title: "就绪",
      tag: "warning",
    },
  ],
  [
    1,
    {
      title: "运行",
      tag: "info",
    },
  ],
  [
    2,
    {
      title: "完成",
      tag: "success",
    },
  ],
  [
    3,
    {
      title: "异常",
      tag: "error",
    },
  ],
]);
