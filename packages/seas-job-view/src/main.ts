import { newRouter, newStore, newApi, newApp } from "@izhimu/seas-core/src";
import jobRouter from "./router";

// Vuex
const store = newStore().build();

// 路由
const router = newRouter().add(jobRouter()).build("job/timer");

// 请求
newApi().build();

// App
newApp().use(store).use(router).mount();
