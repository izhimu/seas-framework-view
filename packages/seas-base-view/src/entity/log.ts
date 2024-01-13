import { TagMap } from "../types";

export interface Log {
  id: string | null;
  requestUrl: string | null;
  method: string | null;
  params: string | null;
  result: string | null;
  requestDate: string | null;
  requestDateStart: number | null;
  requestDateEnd: number | null;
  userId: string | null;
  account: string | null;
  userName: string | null;
  logName: string | null;
  logType: string | null;
  ip: string | null;
  status: string | null;
  runtime: number | null;
  runtimeValue: string | null;
}

export const dLog = (): Log => ({
  id: null,
  requestUrl: null,
  method: null,
  params: null,
  result: null,
  requestDate: null,
  requestDateStart: null,
  requestDateEnd: null,
  userId: null,
  account: null,
  userName: null,
  logName: null,
  logType: null,
  ip: null,
  status: null,
  runtime: null,
  runtimeValue: null,
});

export const mMethod = new Map<string, TagMap>([
  [
    "OTHER",
    {
      title: "其他",
      tag: "default",
    },
  ],
  [
    "GET",
    {
      title: "GET",
      tag: "success",
    },
  ],
  [
    "POST",
    {
      title: "POST",
      tag: "info",
    },
  ],
  [
    "PUT",
    {
      title: "PUT",
      tag: "warning",
    },
  ],
  [
    "DELETE",
    {
      title: "DELETE",
      tag: "error",
    },
  ],
]);

export const oMethod = [
  {
    label: "GET",
    value: "GET",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "PUT",
    value: "PUT",
  },
  {
    label: "DELETE",
    value: "DELETE",
  },
];
