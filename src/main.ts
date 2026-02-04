import "./assets/main.css";
import "vfonts/FiraCode.css";

import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.mount("#app");
