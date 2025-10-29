<script setup lang="ts">
/**
 * Navbar Component
 *
 * Fixed navigation bar for mobile-only layout (max-width: 767px).
 * Provides branding, home navigation, and sidebar toggle functionality.
 *
 * @features
 * - MoneyTree branding with logo and text
 * - Click-to-home navigation on logo
 * - Hamburger menu to toggle sidebar
 * - Fixed positioning with z-index layering
 * - Mobile-first responsive design
 * - Accessible with proper ARIA labels
 * - Full width layout without max-width constraints
 *
 * @dependencies
 * - vue-router - For programmatic navigation
 * - @iconify/vue - Hamburger menu icon
 *
 * @emits
 * - toggle-sidebar - Emitted when hamburger menu is clicked
 *
 * @example
 * ```vue
 * <Navbar @toggle-sidebar="handleSidebarToggle" />
 * ```
 *
 * @module NavbarComponent
 */

import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const router = useRouter();

/**
 * Emits toggle-sidebar event to parent component
 */
const emit = defineEmits<{
	"toggle-sidebar": [];
}>();

/**
 * Navigates to home page when logo is clicked
 */
const goToHome = () => {
	router.push("/home");
};

/**
 * Toggles the sidebar open/closed state
 */
const toggleSidebar = () => {
	emit("toggle-sidebar");
};
</script>

<template>
	<nav class="navbar">
		<div class="navbar__container">
			<!-- Logo -->
			<button class="navbar__logo" aria-label="Ga naar home" @click="goToHome">
				<div class="navbar__logo-icon-wrapper">
					<img
						class="navbar__logo-icon"
						src="/images/logos/moneytree-logo-yellow.png"
						alt="MoneyTree Logo"
					/>
				</div>
				<span class="navbar__logo-text">MoneyTree</span>
			</button>

			<!-- Hamburger Menu -->
			<button
				class="navbar__hamburger"
				aria-label="Open sidebar menu"
				@click="toggleSidebar"
			>
				<Icon icon="mdi:hamburger-menu" class="navbar__hamburger-icon" />
			</button>
		</div>
	</nav>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/layout/navbar.scss";
</style>