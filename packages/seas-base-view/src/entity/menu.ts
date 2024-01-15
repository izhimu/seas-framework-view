import { TagMap } from "../types";

export interface Menu {
  id: string | null;
  parentId: string | null;
  sort: number | null;
  menuName: string | null;
  menuCode: string | null;
  menuType: 0 | 1 | null;
  menuIcon: string | null;
  menuUrl: string | null;
  menuComponent: string | null;
  remarks: string | null;
  display: 0 | 1 | null;
}

export const pMenu = (): Menu => ({
  id: null,
  parentId: "1",
  sort: null,
  menuName: null,
  menuCode: null,
  menuType: null,
  menuIcon: null,
  menuUrl: null,
  menuComponent: null,
  remarks: null,
  display: null,
});

export const dMenu = (): Menu => ({
  id: null,
  parentId: null,
  sort: 0,
  menuName: null,
  menuCode: null,
  menuType: 0,
  menuIcon: null,
  menuUrl: null,
  menuComponent: null,
  remarks: null,
  display: 1,
});

export const mType = new Map<number, TagMap>([
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
      title: "菜单",
      tag: "info",
    },
  ],
  [
    1,
    {
      title: "按钮",
      tag: "success",
    },
  ],
]);

export const mDisplay = new Map<number, TagMap>([
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
      title: "否",
      tag: "default",
    },
  ],
  [
    1,
    {
      title: "是",
      tag: "info",
    },
  ],
]);
