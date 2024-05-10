import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
import "./components/naiveui/styles/index.less";

createApp(App).use(naive).mount("#app");
