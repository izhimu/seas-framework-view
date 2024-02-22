import {
  debug,
  group,
  end,
  addHomeRoute,
  addRootRoute,
  addBeforeEach,
  addPermit,
  addRequestInterceptor,
  addResponseRejectedInterceptor,
  addDirective,
} from "@izhimu/seas-core";
import {
  securityPermit,
  authDirective,
  securityHandler,
  securityHomeRouter,
  securityRootRouter,
  securityRequestInterceptor,
  securityResponseRejectedInterceptor,
} from "./src";

group("security init");
addRootRoute(securityRootRouter());
debug("loaded root route");
addHomeRoute(securityHomeRouter());
debug("loaded home route");
addPermit(securityPermit);
debug("loaded route permit");
addBeforeEach(securityHandler());
debug("loaded route before each");
addRequestInterceptor(securityRequestInterceptor());
debug("loaded axios request interceptor");
addResponseRejectedInterceptor(securityResponseRejectedInterceptor());
debug("loaded axios response rejected interceptor");
addDirective(authDirective());
debug("loaded auth directive");
end();
