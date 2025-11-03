import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/app/Home.vue";
import UserGuide from "@/views/app/UserGuide.vue";
import Contact from "@/views/help/Contact.vue";
import AlgemeneVoorwaarden from "@/views/policies/AlgemeneVoorwaarden.vue";
import Cookies from "@/views/policies/Cookies.vue";
import Privacyverklaring from "@/views/policies/Privacyverklaring.vue";
import NotFound404 from "@/views/errors/NotFound404.vue";
import ServerError500 from "@/views/errors/ServerError500.vue";

const routes = [
	// Main Application Routes
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: "Home",
		},
	},

	// User Guide Route
	{
		path: "/handleiding",
		name: "UserGuide",
		component: UserGuide,
		meta: {
			title: "Handleiding",
		},
	},

	// Help & Support Routes
	{
		path: "/contact",
		name: "Contact",
		component: Contact,
		meta: {
			title: "Contact",
		},
	},

	// Legal & Policy Routes
	{
		path: "/algemene-voorwaarden",
		name: "AlgemeneVoorwaarden",
		component: AlgemeneVoorwaarden,
		meta: {
			title: "Algemene Voorwaarden",
		},
	},
	{
		path: "/cookies",
		name: "Cookies",
		component: Cookies,
		meta: {
			title: "Cookiebeleid",
		},
	},
	{
		path: "/privacyverklaring",
		name: "Privacyverklaring",
		component: Privacyverklaring,
		meta: {
			title: "Privacyverklaring",
		},
	},

	// Error Routes
	{
		path: "/500",
		name: "ServerError",
		component: ServerError500,
		meta: {
			title: "Serverfout",
		},
	},
	{
		path: "/404",
		name: "NotFound",
		component: NotFound404,
		meta: {
			title: "Pagina niet gevonden",
		},
	},

	// Catch-all 404 (Must be last!)
	{
		path: "/:pathMatch(.*)*",
		redirect: "/404",
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(_to, _from, savedPosition) {
		// Scroll to top on route change, or restore previous position
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

// Global navigation guard for error handling
router.onError((error) => {
	console.error("Router error:", error);
	router.push({ name: "ServerError" });
});

export default router;
