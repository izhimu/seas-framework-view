import { newRouter, newStore, newApi, newApp } from "@izhimu/seas-core/src";
import healthyRouter from "./router/healthy.ts";

// Vuex
const store = newStore().build();

// 路由
const router = newRouter().add(healthyRouter()).build("healthy/os");

// 请求
newApi().build();

// App
newApp().use(store).use(router).mount();
