import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import { aiRouter, aiLoadIcons } from "./src";

group("ai init");
addHomeRoute(aiRouter());
debug("loaded route");
aiLoadIcons();
debug("loaded icon");
end();
