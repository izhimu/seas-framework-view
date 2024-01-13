import { TagMap } from "../types";

export interface Datasource {
  id: string | null;
  dsName: string | null;
  dsType: string | null;
  dsUrl: string | null;
  dsUser: string | null;
  dsPwd: string | null;
  remark: string | null;
  dbName: string | null;
}

export const pDatasource = (): Datasource => ({
  id: null,
  dsName: null,
  dsType: null,
  dsUrl: null,
  dsUser: null,
  dsPwd: null,
  remark: null,
  dbName: null,
});

export const dDatasource = (): Datasource => ({
  id: null,
  dsName: null,
  dsType: null,
  dsUrl: null,
  dsUser: null,
  dsPwd: null,
  remark: null,
  dbName: null,
});

export const oType = [
  {
    label: "PostgreSQL",
    value: "POSYTGRSQL",
  },
  {
    label: "Mysql",
    value: "MYSQL",
  },
  {
    label: "Oracle",
    value: "ORACLE",
  },
  {
    label: "SqlServer",
    value: "SQLSERVER",
  },
];

export const mType = new Map<string, TagMap>([
  [
    "POSYTGRSQL",
    {
      title: "PostgreSQL",
      tag: "info",
    },
  ],
  [
    "MYSQL",
    {
      title: "Mysql",
      tag: "success",
    },
  ],
  [
    "ORACLE",
    {
      title: "Oracle",
      tag: "error",
    },
  ],
  [
    "SQLSERVER",
    {
      title: "SqlServer",
      tag: "warning",
    },
  ],
]);
