import {
  newRouter,
  newStore,
  newApi,
  newApp,
  corePermit,
} from "@izhimu/seas-core";
import {
  securityRootRouter,
  securityHomeRouter,
  securityHandler,
  securityPermit,
  securityStore,
  securityRequestInterceptor,
  securityResponseRejectedInterceptor,
} from "@izhimu/seas-security-view";
import baseRouter from "./router/base.ts";

// Vuex
const store = newStore().add(securityStore).build();

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .home(securityHomeRouter())
  .home(baseRouter())
  .homePage(() => import("./view/HomePage.vue"))
  .addBeforeEach(securityHandler(store, [...corePermit, ...securityPermit]))
  .build();

// 请求
newApi()
  .addRequestInterceptor(securityRequestInterceptor(store))
  .addResponseRejectedInterceptor(securityResponseRejectedInterceptor())
  .build();

// App
newApp()
  .authDirective(store.state.security.authComponents)
  .use(store)
  .use(router)
  .mount();
