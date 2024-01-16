import {
  debug,
  group,
  end,
  addHomeRoute,
  addPermit,
  setHomeComponent,
} from "@izhimu/seas-core";
import { baseHomePage, baseRouter, basePermit } from "./router";
import loadIcons from "./style";

group("[base] init");
addHomeRoute(baseRouter());
debug("loaded route");
setHomeComponent(baseHomePage());
debug("loaded home page");
addPermit(basePermit);
debug("loaded route permit");
loadIcons();
debug("loaded icon");
end();
