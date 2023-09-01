export interface Account {
  id: string | null;
  userAccount: string | null;
  userCertificate: string | null;
  passwordKey: string | null;
  tmpPassword: string | null;
  status: number | null;
}

export const dAccount = (): Account => ({
  id: null,
  userAccount: null,
  userCertificate: null,
  passwordKey: null,
  tmpPassword: null,
  status: 0,
});
