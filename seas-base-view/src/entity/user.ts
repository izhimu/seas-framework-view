import { Account } from "./account";
import { TagMap } from "../types";

export interface User {
  id: string | null;
  userName: string | null;
  userSex: 0 | 1 | 2 | null;
  birthday: string | null;
  signature: string | null;
  mobile: string | null;
  email: string | null;
  face: string | null;
  faceSmall: string | null;
  status: 0 | 1 | null;
  accounts: Array<Account>;
  account: string | null;
  orgId: string | number | null;
  orgName: string | null;
  roleIds: Array<string> | null;
  roleNames: Array<string> | null;
}

export const pUser = (): User => ({
  id: null,
  userName: null,
  userSex: null,
  birthday: null,
  signature: null,
  mobile: null,
  email: null,
  face: null,
  faceSmall: null,
  status: null,
  accounts: [],
  account: null,
  orgId: null,
  orgName: null,
  roleIds: null,
  roleNames: null,
});

export const dUser = (): User => ({
  id: null,
  userName: null,
  userSex: 0,
  birthday: null,
  signature: null,
  mobile: null,
  email: null,
  face: null,
  faceSmall: null,
  status: 0,
  accounts: [],
  account: null,
  orgId: null,
  orgName: null,
  roleIds: null,
  roleNames: null,
});

export interface UserRole {
  roleId: string | null;
  userIds: string[] | null;
}

export const dUserRole = (): UserRole => ({
  roleId: null,
  userIds: null,
});

export const oSex = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

export const oStatus = [
  {
    label: "正常",
    value: 0,
  },
  {
    label: "锁定",
    value: 1,
  },
];

export const mSex = new Map<number, TagMap>([
  [
    0,
    {
      title: "保密",
      tag: "warning",
    },
  ],
  [
    1,
    {
      title: "男",
      tag: "info",
    },
  ],
  [
    2,
    {
      title: "女",
      tag: "info",
    },
  ],
]);

export const mStatus = new Map<number, TagMap>([
  [
    -1,
    {
      title: "其他",
      tag: "warning",
    },
  ],
  [
    0,
    {
      title: "正常",
      tag: "success",
    },
  ],
  [
    1,
    {
      title: "锁定",
      tag: "error",
    },
  ],
]);
