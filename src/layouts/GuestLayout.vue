<script setup lang="ts">
/**
 * GuestLayout
 *
 * Main layout wrapper for unauthenticated users (mobile-only).
 * Contains header with hamburger menu, overlay sidebar, content area, and footer.
 * Sidebar is hidden by default and toggles via hamburger icon in header.
 *
 * @features
 * - Mobile-only responsive design (max-width: 767px)
 * - Overlay sidebar navigation (hidden by default)
 * - Header with hamburger menu toggle
 * - Footer with legal links
 * - Slot for dynamic page content
 *
 * @dependencies
 * - Header.vue - Top navigation with hamburger menu
 * - Sidebar.vue - Overlay navigation menu
 * - Footer.vue - Bottom navigation with legal links
 *
 * @module GuestLayoutComponent
 */

import { ref } from "vue";
import Header from "@/components/layout/Header.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

// Sidebar state management
const isSidebarOpen = ref(false);

/**
 * Toggles the sidebar open/closed state
 * @emits toggle-sidebar - Emitted from Header component
 */
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

/**
 * Closes the sidebar
 * @emits close - Emitted from Sidebar component or backdrop click
 */
const closeSidebar = () => {
	isSidebarOpen.value = false;
};
</script>

<template>
	<div class="guest-layout">
		<!-- Header -->
		<div class="guest-layout__header">
			<Header @toggle-sidebar="toggleSidebar" />
		</div>

		<!-- Sidebar -->
		<aside class="guest-layout__sidebar">
			<Sidebar :is-open="isSidebarOpen" @close="closeSidebar" />
		</aside>

		<!-- Main content -->
		<main class="guest-layout__content">
			<slot />
		</main>

		<!-- Footer -->
		<div class="guest-layout__footer">
			<Footer />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/layout/guest-layout.scss";
</style>
