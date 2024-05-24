import { Account } from "./account";

export interface User {
  id: string | null;
  userName: string | null;
  userSex: 0 | 1 | 2 | null;
  birthday: string | null;
  signature: string | null;
  mobile: string | null;
  email: string | null;
  face: string | null;
  faceSmall: string | null;
  status: 0 | 1 | 2 | 3 | null;
  accounts: Array<Account>;
  account: string | null;
  orgId: string | number | null;
  orgName: string | null;
  roleIds: Array<string> | null;
  roleNames: Array<string> | null;
}
