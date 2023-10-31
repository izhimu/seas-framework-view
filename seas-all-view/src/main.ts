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
const store = newStore().add(securityStore).add(baseStore).build();

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .add(securityHomeRouter())
  .add(jobRouter())
  .add(healthyRouter())
  .add(baseRouter())
  .home(baseHomePage())
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
  .use(store)
  .use(router)
  .mount()
  .authDirective(store)
  .icon(baseInitIcon, jobInitIcon, healthyInitIcon);
