<script setup lang="ts">
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
				<img
					class="navbar__logo-icon"
					src="/images/moneytree-logo-yellow.png"
					alt="MoneyTree Logo"
				/>
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