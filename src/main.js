import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config"; // Importando PrimeVue
import "primeicons/primeicons.css"; // Ícones

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
