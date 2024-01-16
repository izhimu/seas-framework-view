import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import jobRouter from "./router";
import loadIcons from "./style";

group("job init");
addHomeRoute(jobRouter());
debug("loaded route");
loadIcons();
debug("loaded icon");
end();
