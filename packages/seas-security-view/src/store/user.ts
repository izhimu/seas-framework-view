import { reactive } from "vue";
import { defineStore } from "pinia";
import { useCommonStore } from "@izhimu/seas-core";
import {
  type LockUser,
  type LoginUser,
  dLoginUser,
  dLockUser,
} from "../entity/security";

const useUserStore = defineStore("security.user", () => {
  const current = reactive<LoginUser>(dLoginUser());
  const locked = reactive<LockUser>(dLockUser());
  const login = (user: LoginUser) => {
    Object.assign(current, user);
    Object.assign(locked, dLockUser());
  };
  const lock = () => {
    Object.assign(locked, current);
    Object.assign(current, dLoginUser());
  };
  const logout = () => {
    Object.assign(current, dLoginUser());
    Object.assign(locked, dLockUser());
    useCommonStore().resetAuth();
  };
  const isLogin = () => current.account !== "";
  return { current, locked, login, lock, logout, isLogin };
});

export default useUserStore;
