export interface Template {
  id: string | null;
  templateName: string | null;
  templateVersion: string | null;
  remark: string | null;
}

export const pTemplate = (): Template => ({
  id: null,
  templateName: null,
  templateVersion: null,
  remark: null,
});

export const dTemplate = (): Template => ({
  id: null,
  templateName: null,
  templateVersion: null,
  remark: null,
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
    template: "author",
  },
  {
    name: "包名",
    template: "packageName",
  },
  {
    name: "表名",
    template: "tableName",
  },
  {
    name: "描述",
    template: "tableDesc",
  },
  {
    name: "类名",
    template: "className",
  },
  {
    name: "字段名",
    template: "fieldList[].fieldName",
  },
  {
    name: "显示名",
    template: "fieldList[].showName",
  },
  {
    name: "属性名",
    template: "fieldList[].attrName",
  },
  {
    name: "字段类型",
    template: "fieldList[].fieldType",
  },
  {
    name: "java类型",
    template: "fieldList[].javaType",
  },
  {
    name: "js类型",
    template: "fieldList[].jsType",
  },
  {
    name: "主键",
    template: "fieldList[].isPk",
  },
  {
    name: "可空",
    template: "fieldList[].isNull",
  },
  {
    name: "可插入",
    template: "fieldList[].insertable",
  },
  {
    name: "列表显示",
    template: "fieldList[].listable",
  },
  {
    name: "可查询",
    template: "fieldList[].searchable",
  },
  {
    name: "可排序",
    template: "fieldList[].sortable",
  },
  {
    name: "查询模式",
    template: "fieldList[].searchType",
  },
  {
    name: "导包",
    template: "importList",
  },
  {
    name: "导包Search",
    template: "importSearch",
  },
];
