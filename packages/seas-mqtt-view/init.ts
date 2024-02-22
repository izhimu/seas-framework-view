import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import { mqttRouter, mqttLoadIcons } from "./src";

group("mqtt init");
addHomeRoute(mqttRouter());
debug("loaded route");
mqttLoadIcons();
debug("loaded icon");
end();
