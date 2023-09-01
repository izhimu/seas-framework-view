import { newRouter, newStore, newApi, newApp } from "@izhimu/seas-core";
import { jobRouter } from "@izhimu/seas-job-view";

// Vuex
const store = newStore().build();

// 路由
const router = newRouter().home(jobRouter()).build("job/timer");

// 请求
newApi().build();

// App
newApp().use(store).use(router).mount();
