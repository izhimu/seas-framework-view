import { createSeasApp, useCommonStore } from "@izhimu/seas-core";
import { useConfigStore } from "@izhimu/seas-base-view";
import "@izhimu/seas-base-view/init";
import "@izhimu/seas-generate-view/init";
import "@izhimu/seas-healthy-view/init";
import "@izhimu/seas-job-view/init";
import "@izhimu/seas-security-view/init";
import "@izhimu/seas-mqtt-view/init";
import "@izhimu/seas-ai-view/init";

// App
createSeasApp();

const commonStore = useCommonStore();
const configStore = useConfigStore();
commonStore.name = "Seas 开发框架";
configStore.logo.icon = true;
