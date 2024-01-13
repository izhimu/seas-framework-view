export interface FieldInfo {
  sort: number | null;
  fieldName: string | null;
  showName: string | null;
  attrName: string | null;
  fieldType: string | null;
  javaType: string | null;
  jsType: string | null;
  isPk: number | null;
  isNull: number | null;
  insertable: number | null;
  listable: number | null;
  searchable: number | null;
  sortable: number | null;
  searchType: string | null;
  controlType: string | null;
  validateType: string | null;
}

export interface Info {
  packageName: string | null;
  sourceId: string | null;
  templateId: string | null;
  author: string | null;
  tableName: string | null;
  tableDesc: string | null;
  tablePrefix: string | null;
  className: string | null;
  fieldList: Array<FieldInfo>;
}

export const dFieldInfo = (): FieldInfo => ({
  sort: 0,
  fieldName: null,
  showName: null,
  attrName: null,
  fieldType: null,
  javaType: null,
  jsType: null,
  isPk: 0,
  isNull: 0,
  insertable: 1,
  listable: 1,
  searchable: 1,
  sortable: 1,
  searchType: null,
  controlType: null,
  validateType: null,
});

export const dInfo = (): Info => ({
  packageName: null,
  sourceId: null,
  templateId: null,
  author: null,
  tableName: null,
  tableDesc: null,
  tablePrefix: null,
  className: null,
  fieldList: [],
});

export const oSearchType = [
  {
    label: "模糊",
    value: "LIKE",
  },
  {
    label: "等于",
    value: "EQUALS",
  },
  {
    label: "左模糊",
    value: "LIKE_L",
  },
  {
    label: "右模糊",
    value: "LIKE_R",
  },
  {
    label: "包含",
    value: "IN",
  },
  {
    label: "不包含",
    value: "NOT_IN",
  },
  {
    label: "大于",
    value: "GT",
  },
  {
    label: "大于等于",
    value: "GE",
  },
  {
    label: "小于",
    value: "LT",
  },
  {
    label: "小于等于",
    value: "LE",
  },
];
