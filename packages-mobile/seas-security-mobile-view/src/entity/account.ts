export interface Account {
  id: string | null;
  userAccount: string | null;
  userCertificate: string | null;
  passwordKey: string | null;
  tmpPassword: string | null;
  status: number | null;
}

export interface Password extends Account {
  originalPassword: string | null;
  newPassword: string | null;
  originalCertificate: string | null;
}

export const dAccount = (): Account => ({
  id: null,
  userAccount: null,
  userCertificate: null,
  passwordKey: null,
  tmpPassword: null,
  status: 0,
});

export const dPassword = (): Password => ({
  id: null,
  userAccount: null,
  userCertificate: null,
  passwordKey: null,
  tmpPassword: null,
  status: null,
  originalPassword: null,
  newPassword: null,
  originalCertificate: null,
});
