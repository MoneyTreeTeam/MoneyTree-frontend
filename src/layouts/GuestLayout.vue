<script setup lang="ts">
import { ref } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
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
		<!-- Navbar -->
		 <div class="guest-layout__navbar">
			<Navbar @toggle-sidebar="toggleSidebar" />
		</div>

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
@use "@/assets/styles/layouts/guest-layout.scss";
</style>
