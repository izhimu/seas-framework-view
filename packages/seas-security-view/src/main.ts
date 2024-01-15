import { newRouter, newApi, newApp, corePermit } from "@izhimu/seas-core/src";
import {
  securityRootRouter,
  securityHomeRouter,
  securityHandler,
  securityPermit,
} from "./router";
import {
  securityRequestInterceptor,
  securityResponseRejectedInterceptor,
} from "./request";

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .add(securityHomeRouter())
  .addBeforeEach(securityHandler([...corePermit, ...securityPermit]))
  .build();

// 请求
newApi()
  .addRequestInterceptor(securityRequestInterceptor())
  .addResponseRejectedInterceptor(securityResponseRejectedInterceptor())
  .build();

// App
newApp().use(router).mount();
