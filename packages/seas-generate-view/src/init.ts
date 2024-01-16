import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import generateRouter from "./router";
import loadIcons from "./style";

group("generate init");
addHomeRoute(generateRouter());
debug("loaded route");
loadIcons();
debug("loaded icon");
end();
