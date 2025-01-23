import "./assets/main.css";
import "material-icons/iconfont/material-icons.css";
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
// import router from "./router";
import './index.css'

const app = createApp(App);

app.use(createPinia());
// app.use(router);

app.mount("#app");
