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
  securityStore,
  securityRequestInterceptor,
  securityResponseRejectedInterceptor,
} from "@izhimu/seas-security-view/src";
import { baseRouter, basePermit } from "./router";
import baseInitIcon from "./style";
import { baseStore } from "./store/module/base.ts";

// Vuex
const store = newStore().add(securityStore).add(baseStore).build();

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .add(securityHomeRouter())
  .add(baseRouter())
  .home(() => import("./view/HomePage.vue"))
  .addBeforeEach(
    securityHandler(store, [...corePermit, ...securityPermit, ...basePermit]),
  )
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
  .authDirective(store.state.security.authComponents)
  .icon(baseInitIcon);
