import { TagMap } from "../types";

export interface Role {
  id: string | null;
  createdTime: string | null;
  roleName: string | null;
  roleDesc: string | null;
  enable: number | null;
  sort: number | null;
  authType: number | null;
  deptCascade: number | undefined;
}

export const dRole = (): Role => ({
  id: null,
  createdTime: null,
  roleName: null,
  roleDesc: null,
  enable: 1,
  sort: 0,
  authType: 2,
  deptCascade: 1,
});

export const pRole = (): Role => ({
  id: null,
  createdTime: null,
  roleName: null,
  roleDesc: null,
  enable: null,
  sort: null,
  authType: null,
  deptCascade: undefined,
});

export interface AuthMenu {
  roleId: string | null;
  menuIds: string[] | undefined;
  menuPIds: string[] | undefined;
}

export const dAuthMenu = (): AuthMenu => ({
  roleId: null,
  menuIds: undefined,
  menuPIds: undefined,
});

export interface AuthOrg {
  roleId: string | null;
  orgIds: string[] | undefined;
}

export const dAuthOrg = (): AuthOrg => ({
  roleId: null,
  orgIds: undefined,
});

export const oType = [
  {
    label: "全部数据权限",
    value: 0,
  },
  {
    label: "自定义数据权限",
    value: 1,
  },
  {
    label: "本部门及下级部门数据权限",
    value: 2,
  },
  {
    label: "本部门数据权限",
    value: 3,
  },
  {
    label: "仅自己数据权限",
    value: 4,
  },
];

export const oEnable = [
  {
    label: "启用",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];

export const mEnable = new Map<number, TagMap>([
  [
    0,
    {
      title: "禁用",
      tag: "warning",
    },
  ],
  [
    1,
    {
      title: "启用",
      tag: "success",
    },
  ],
]);

export const mType = new Map<number, string>([
  [0, "全部数据权限"],
  [1, "自定义数据权限"],
  [2, "本部门及下级部门数据权限"],
  [3, "本部门数据权限"],
  [4, "仅自己数据权限"],
]);
