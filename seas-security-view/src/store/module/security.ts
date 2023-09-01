import { ModuleTree } from "vuex";
import { LockUser, LoginUser } from "../../entity/security.ts";

export interface SecurityState {
  loginUser: LoginUser | null;
  lockUser: LockUser | null;
  authComponents: string[];
}

export const securityStore: ModuleTree<SecurityState> = {
  security: {
    state: {
      loginUser: null,
      lockUser: null,
      authComponents: [],
    },
    mutations: {
      setLoginUser(state, loginUser) {
        state.loginUser = loginUser;
      },
      setLockUser(state, lockUser) {
        state.lockUser = lockUser;
      },
      setAuthComponents(state, authComponents) {
        state.authComponents = authComponents;
      },
    },
  },
};
