import {
  debug,
  group,
  end,
  addHomeRoute,
  addPermit,
  setHomeComponent,
} from "@izhimu/seas-core";
import { basePermit, baseHomePage, baseRouter, baseLoadIcons } from "./src";

group("base init");
addHomeRoute(baseRouter());
debug("loaded route");
setHomeComponent(baseHomePage);
debug("loaded home page");
addPermit(basePermit);
debug("loaded route permit");
baseLoadIcons();
debug("loaded icon");
end();
