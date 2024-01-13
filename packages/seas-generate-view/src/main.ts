import { newRouter, newStore, newApi, newApp } from "@izhimu/seas-core/src";
import generateRouter from "./router";

// Vuex
const store = newStore().build();

// 路由
const router = newRouter().add(generateRouter()).build("generate/info");

// 请求
newApi().build();

// App
newApp().use(store).use(router).mount().authDirective(store);
