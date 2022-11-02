import "@/lib/jw.scss";
import "@/assets/css/index.scss";
import "github-markdown-css";

import RUi from "@/lib/index";
// import "r-ui/dist/lib/r-ui.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(RUi);

app.mount("#app");
