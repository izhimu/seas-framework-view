import { TagMap } from "../types";

export interface Dict {
  id: string | null;
  parentId: string | number | null;
  dictName: string | null;
  dictCode: string | null;
  fixed: number | null;
  hasChildren: number | null;
  sort: number | null;
}

export const pDict = (): Dict => ({
  id: null,
  parentId: "1",
  dictName: null,
  dictCode: null,
  fixed: null,
  hasChildren: null,
  sort: null,
});

export const dDict = (): Dict => ({
  id: null,
  parentId: null,
  dictName: null,
  dictCode: null,
  fixed: 0,
  hasChildren: null,
  sort: 0,
});

export const mFixed = new Map<number, TagMap>([
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
      title: "用户字典",
      tag: "info",
    },
  ],
  [
    1,
    {
      title: "系统字典",
      tag: "warning",
    },
  ],
]);
