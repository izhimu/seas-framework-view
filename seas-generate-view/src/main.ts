import { newRouter, newStore, newApi, newApp } from "@izhimu/seas-core";
import generateRouter from "./router/generate.ts";

// Vuex
const store = newStore().build();

// 路由
const router = newRouter().add(generateRouter()).build("generate/info");

// 请求
newApi().build();

// App
newApp().use(store).use(router).mount().authDirective(store);
