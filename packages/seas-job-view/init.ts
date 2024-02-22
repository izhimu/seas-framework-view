import { debug, group, end, addHomeRoute } from "@izhimu/seas-core";
import { jobRouter, jobLoadIcons } from "./src";

group("job init");
addHomeRoute(jobRouter());
debug("loaded route");
jobLoadIcons();
debug("loaded icon");
end();
