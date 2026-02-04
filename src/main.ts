import "./assets/main.css";
import "vfonts/FiraCode.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

app.use(pinia);
app.mount("#app");
