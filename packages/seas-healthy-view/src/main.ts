import { createRequest, newRouter, newApp } from "@izhimu/seas-core/src";
import healthyRouter from "./router";

// 路由
const router = newRouter().add(healthyRouter()).build("healthy/os");

// 请求
createRequest();

// App
newApp().use(router).mount();
