export interface Login {
  account: string;
  password: string;
  passwordKey: string;
  verifyCode?: string;
  verifyCodeKey?: string;
  deviceType: "WEB";
  deviceId?: string;
  deviceName?: string;
  timestamp: number;
  version?: string;
  systemVersion?: string;
  tmpPassword: string | null;
}

export interface EncryptKey {
  key: string;
  publicKey: string;
}

export interface LoginUser {
  token: string;
  tokenTimeout: number;
  pwdExpired: boolean;
  userId: string;
  account: string;
  userName: string;
}

export interface LockUser {
  account: string;
  userName: string;
}

export const dLogin = (): Login => ({
  account: "",
  password: "",
  passwordKey: "",
  verifyCode: "",
  verifyCodeKey: "",
  deviceType: "WEB",
  deviceId: "",
  deviceName: "",
  timestamp: 0,
  version: "0.0.1",
  systemVersion: "",
  tmpPassword: null,
});

export const dEncryptKey = (): EncryptKey => ({
  key: "",
  publicKey: "",
});

export const dLoginUser = (): LoginUser => ({
  token: "",
  tokenTimeout: 0,
  pwdExpired: false,
  userId: "",
  account: "",
  userName: "",
});

export const dLockUser = (): LockUser => ({
  account: "",
  userName: "",
});
