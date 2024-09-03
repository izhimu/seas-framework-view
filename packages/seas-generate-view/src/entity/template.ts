export interface Template {
  id: string | null;
  templateName: string | null;
  templateVersion: string | null;
  remark: string | null;
  ext: string | null;
}

export const pTemplate = (): Template => ({
  id: null,
  templateName: null,
  templateVersion: null,
  remark: null,
  ext: null,
});

export const dTemplate = (): Template => ({
  id: null,
  templateName: null,
  templateVersion: null,
  remark: null,
  ext: null,
});

export interface TemplateAssets {
  id: string | null;
  templateId: string | null;
  assetsName: string | null;
  assetsType: string | null;
  assetsDataStr: string | null;
  outPath: string | null;
  tabId: string;
}

export const pTemplateAssets = (): TemplateAssets => ({
  id: null,
  templateId: null,
  assetsName: null,
  assetsType: null,
  assetsDataStr: null,
  outPath: null,
  tabId: "",
});

export const dTemplateAssets = (): TemplateAssets => ({
  id: null,
  templateId: null,
  assetsName: null,
  assetsType: null,
  assetsDataStr: null,
  outPath: null,
  tabId: "",
});

export const valData = [
  {
    name: "作者",
    key: "author",
  },
  {
    name: "包名",
    key: "packageName",
  },
  {
    name: "表名",
    key: "tableName",
  },
  {
    name: "描述",
    key: "tableDesc",
  },
  {
    name: "类名",
    key: "className",
  },
  {
    name: "文件名",
    key: "fileName",
  },
  {
    name: "路径名",
    key: "pathName",
  },
  {
    name: "键名",
    key: "keyName",
  },
  {
    name: "字段名",
    key: "fieldList[].fieldName",
  },
  {
    name: "显示名",
    key: "fieldList[].showName",
  },
  {
    name: "属性名",
    key: "fieldList[].attrName",
  },
  {
    name: "字段类型",
    key: "fieldList[].fieldType",
  },
  {
    name: "java类型",
    key: "fieldList[].javaType",
  },
  {
    name: "js类型",
    key: "fieldList[].jsType",
  },
  {
    name: "主键",
    key: "fieldList[].isPk",
  },
  {
    name: "可空",
    key: "fieldList[].isNull",
  },
  {
    name: "可插入",
    key: "fieldList[].insertable",
  },
  {
    name: "列表显示",
    key: "fieldList[].listable",
  },
  {
    name: "可查询",
    key: "fieldList[].searchable",
  },
  {
    name: "可排序",
    key: "fieldList[].sortable",
  },
  {
    name: "查询模式",
    key: "fieldList[].searchType",
  },
  {
    name: "导包",
    key: "importList",
  },
  {
    name: "导包Search",
    key: "importSearch",
  },
];
