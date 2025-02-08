import "./assets/main.css";
import "material-icons/iconfont/material-icons.css";
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from "vue";
import { createPinia } from "pinia";

// Importer les polices
import '@fontsource/oswald'; // Importer la police Oswald
import '@fontsource/montserrat-alternates'; // Importer la police Montserrat Alternates
import '@fontsource/montserrat'; // Importer la police Montserrat
import '@fontsource/nunito'; // Importer la police Nunito

import App from "./App.vue";
// import router from "./router";
import './index.css'

const app = createApp(App);

app.use(createPinia());
// app.use(router);

app.mount("#app");
