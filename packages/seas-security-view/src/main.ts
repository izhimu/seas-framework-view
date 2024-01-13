import {
  newRouter,
  newStore,
  newApi,
  newApp,
  corePermit,
} from "@izhimu/seas-core/src";
import {
  securityRootRouter,
  securityHomeRouter,
  securityHandler,
  securityPermit,
} from "./router";
import { securityStore } from "./store/module/security.ts";
import {
  securityRequestInterceptor,
  securityResponseRejectedInterceptor,
} from "./request";

// Vuex
const store = newStore().add(securityStore).build();

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .add(securityHomeRouter())
  .addBeforeEach(securityHandler(store, [...corePermit, ...securityPermit]))
  .build();

// 请求
newApi()
  .addRequestInterceptor(securityRequestInterceptor(store))
  .addResponseRejectedInterceptor(securityResponseRejectedInterceptor())
  .build();

// App
newApp()
  .use(store)
  .use(router)
  .mount()
  .authDirective(store.state.security.authComponents);
