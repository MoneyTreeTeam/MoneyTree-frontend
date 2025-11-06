import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
	// Main Application Routes
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/app/Home.vue"),
		meta: {
			title: "Home",
		},
	},

	// User Guide Route
	{
		path: "/handleiding",
		name: "UserGuide",
		component: () => import("@/views/app/UserGuide.vue"),
		meta: {
			title: "Handleiding",
		},
	},

	// Help & Support Routes
	{
		path: "/contact",
		name: "Contact",
		component: () => import("@/views/help/Contact.vue"),
		meta: {
			title: "Contact",
		},
	},

	// Legal & Policy Routes
	{
		path: "/algemene-voorwaarden",
		name: "AlgemeneVoorwaarden",
		component: () => import("@/views/policies/AlgemeneVoorwaarden.vue"),
		meta: {
			title: "Algemene Voorwaarden",
		},
	},
	{
		path: "/cookies",
		name: "Cookies",
		component: () => import("@/views/policies/Cookies.vue"),
		meta: {
			title: "Cookiebeleid",
		},
	},
	{
		path: "/privacyverklaring",
		name: "Privacyverklaring",
		component: () => import("@/views/policies/Privacyverklaring.vue"),
		meta: {
			title: "Privacyverklaring",
		},
	},

	// Error Routes
	{
		path: "/500",
		name: "ServerError",
		component: () => import("@/views/errors/ServerError500.vue"),
		meta: {
			title: "Serverfout",
		},
	},
	{
		path: "/404",
		name: "NotFound",
		component: () => import("@/views/errors/NotFound404.vue"),
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
