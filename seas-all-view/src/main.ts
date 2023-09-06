import {
  newRouter,
  newStore,
  newApi,
  newApp,
  corePermit,
  coreStore,
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
import { jobRouter, jobInitIcon } from "@izhimu/seas-job-view";
import { healthyRouter, healthyInitIcon } from "@izhimu/seas-healthy-view";
import {
  baseRouter,
  baseHomePage,
  baseInitIcon,
  basePermit,
  baseStore,
} from "@izhimu/seas-base-view";

// Vuex
const store = newStore()
  .add(coreStore)
  .add(securityStore)
  .add(baseStore)
  .build();

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .home(securityHomeRouter())
  .home(jobRouter())
  .home(healthyRouter())
  .home(baseRouter())
  .homePage(baseHomePage())
  .addBeforeEach(
    securityHandler(store, [...corePermit, ...securityPermit, ...basePermit])
  )
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

// 图标加载
jobInitIcon();
healthyInitIcon();
baseInitIcon();
