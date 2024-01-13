export interface Captcha {
  blockImage?: string;
  originalImage?: string;
  result?: boolean;
  secretKey: string;
  token?: string;
  pointJson?: string;
  tips?: string;
}

export const dCaptcha = (): Captcha => ({
  blockImage: "",
  originalImage: "",
  result: false,
  secretKey: "",
  token: "",
  pointJson: undefined,
});
