import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import { generateRouter, generateLoadIcons } from "./src";

group("generate init");
addHomeRoute(generateRouter());
debug("loaded route");
generateLoadIcons();
debug("loaded icon");
end();
