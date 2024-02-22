import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import { healthyRouter, healthyLoadIcons } from "./src";

group("healthy init");
addHomeRoute(healthyRouter());
debug("loaded route");
healthyLoadIcons();
debug("loaded icon");
end();
