import { createSeasApp } from "@izhimu/seas-core";
import "../init";

// App
createSeasApp({
  router: {
    redirect: "/ai/chat",
  },
});
