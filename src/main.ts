import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import { createHead } from "@vueuse/head";

// Import components and plugins
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/main.scss";

// Create Vue application instance with all plugins
createApp(App)
	.use(router) // Vue Router for navigation
	.use(createHead()) // Head management for SEO (enables useHead in components)
	.component("Icon", Icon) // Global Icon component registration
	.mount("#app");
