import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import { createHead } from "@vueuse/head";
import { defineRule, configure } from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import nl from '@vee-validate/i18n/dist/locale/nl.json';

// Import components and plugins
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/main.scss";

// VeeValidate configuration
Object.keys(all).forEach(rule => {
  if (typeof all[rule] === 'function') {
    defineRule(rule, all[rule]);
  }
});

configure({
  generateMessage: localize({ nl }),
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

setLocale('nl');

// Create Vue application instance with all plugins
createApp(App)
	.use(router) // Vue Router for navigation
	.use(createHead()) // Head management for SEO (enables useHead in components)
	.component("Icon", Icon) // Global Icon component registration
	.mount("#app");
