import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import healthyRouter from "./router";
import loadIcons from "./style";

group("healthy init");
addHomeRoute(healthyRouter());
debug("loaded route");
loadIcons();
debug("loaded icon");
end();
