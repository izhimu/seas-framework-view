import { TagMap } from "../types";

export interface LoginLog {
  id: string | null;
  loginTime: string | null;
  loginTimeStart: number | null;
  loginTimeEnd: number | null;
  loginDeviceId: string | null;
  loginDevice: string | null;
  loginIp: string | null;
  loginAddress: string | null;
  loginVersion: string | null;
  loginOsVersion: string | null;
  userId: string | null;
  userName: string | null;
  accountId: string | null;
  account: string | null;
  status: 0 | 1 | 2 | 3 | 4 | 5 | null;
}

export const dLoginLog = (): LoginLog => ({
  id: null,
  loginTime: null,
  loginTimeStart: null,
  loginTimeEnd: null,
  loginDeviceId: null,
  loginDevice: null,
  loginIp: null,
  loginAddress: null,
  loginVersion: null,
  loginOsVersion: null,
  userId: null,
  userName: null,
  accountId: null,
  account: null,
  status: null,
});

export const mStatus = new Map<number, TagMap>([
  [
    -1,
    {
      title: "未知",
      tag: "default",
    },
  ],
  [
    0,
    {
      title: "登录",
      tag: "success",
    },
  ],
  [
    1,
    {
      title: "退出",
      tag: "info",
    },
  ],
  [
    2,
    {
      title: "密码错误",
      tag: "warning",
    },
  ],
  [
    3,
    {
      title: "多次重试",
      tag: "error",
    },
  ],
  [
    4,
    {
      title: "禁用",
      tag: "error",
    },
  ],
  [
    5,
    {
      title: "登录失败",
      tag: "warning",
    },
  ],
]);

export const oStatus = [
  {
    label: "登录",
    value: 0,
  },
  {
    label: "退出",
    value: 1,
  },
  {
    label: "密码错误",
    value: 2,
  },
  {
    label: "多次重试",
    value: 3,
  },
  {
    label: "禁用",
    value: 4,
  },
  {
    label: "登录失败",
    value: 5,
  },
];
