import { newRouter, newApi, newApp } from "@izhimu/seas-core/src";
import jobRouter from "./router";

// 路由
const router = newRouter().add(jobRouter()).build("job/timer");

// 请求
newApi().build();

// App
newApp().use(router).mount();
