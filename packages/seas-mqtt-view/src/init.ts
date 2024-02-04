import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import mqttRouter from "./router";
import loadIcons from "./style";

group("mqtt init");
addHomeRoute(mqttRouter());
debug("loaded route");
loadIcons();
debug("loaded icon");
end();
