import { createRouter, createPinia, createApp } from "@izhimu/seas-core/src";
import "@izhimu/seas-base-view";
import "@izhimu/seas-generate-view";
import "@izhimu/seas-healthy-view";
import "@izhimu/seas-job-view/src";
import "@izhimu/seas-security-view";

// App
createApp({
  plugins: [createPinia(), createRouter()],
});
