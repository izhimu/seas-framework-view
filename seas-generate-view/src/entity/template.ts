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
  assetsData: string | null;
  outPath: string | null;
  tabId: string;
}

export const pTemplateAssets = (): TemplateAssets => ({
  id: null,
  templateId: null,
  assetsName: null,
  assetsData: null,
  outPath: null,
  tabId: "",
});

export const dTemplateAssets = (): TemplateAssets => ({
  id: null,
  templateId: null,
  assetsName: null,
  assetsData: null,
  outPath: null,
  tabId: "",
});
