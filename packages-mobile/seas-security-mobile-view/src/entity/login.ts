export interface Login {
  account?: string;
  password?: string;
  passwordKey?: boolean;
  verifyCode: string;
  verifyCodeKey?: string;
  deviceType?: string;
  deviceId?: string;
  deviceName?: string;
  timestamp?: number;
  version?: string;
  systemVersion?: string;
}

export interface EncryptData {
  login: Login;
  publicKey: string;
}
