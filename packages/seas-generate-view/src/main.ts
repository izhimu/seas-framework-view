import { newRouter, newApi, newApp } from "@izhimu/seas-core/src";
import generateRouter from "./router";

// 路由
const router = newRouter().add(generateRouter()).build("generate/info");

// 请求
newApi().build();

// App
newApp().use(router).mount();
