import {
  debug,
  group,
  end,
  addHomeRoute,
  addRootRoute,
} from "@izhimu/seas-mobile-core";
import { securityHomeRouter, securityRootRouter } from "./src";

group("security init");
addRootRoute(securityRootRouter());
debug("loaded root route");
addHomeRoute(securityHomeRouter());
debug("loaded auth directive");
end();
