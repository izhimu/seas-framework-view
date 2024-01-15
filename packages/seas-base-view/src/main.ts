import { newRouter, newApi, newApp, corePermit } from "@izhimu/seas-core/src";
import {
  securityRootRouter,
  securityHomeRouter,
  securityHandler,
  securityPermit,
  securityRequestInterceptor,
  securityResponseRejectedInterceptor,
} from "@izhimu/seas-security-view/src";
import { baseRouter, basePermit } from "./router";
import baseInitIcon from "./style";

// 路由
const router = newRouter()
  .root(securityRootRouter())
  .add(securityHomeRouter())
  .add(baseRouter())
  .home(() => import("./view/HomePage.vue"))
  .addBeforeEach(
    securityHandler([...corePermit, ...securityPermit, ...basePermit]),
  )
  .build();

// 请求
newApi()
  .addRequestInterceptor(securityRequestInterceptor())
  .addResponseRejectedInterceptor(securityResponseRejectedInterceptor())
  .build();

// App
newApp().use(router).mount().icon(baseInitIcon);
