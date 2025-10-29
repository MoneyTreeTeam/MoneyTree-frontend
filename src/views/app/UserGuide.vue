<script setup lang="ts">
/**
 * UserGuide View
 *
 * Comprehensive user guide for MoneyTree application.
 * Provides detailed instructions and documentation for users.
 *
 * @features
 * - Complete user documentation
 * - Step-by-step instructions
 * - Mobile-first responsive design
 *
 * @module UserGuideView
 */

import GuestLayout from "@/layouts/GuestLayout.vue";
import { useHead } from "@vueuse/head";

// Set the title of the page
useHead({
	title: "MoneyTree | Handleiding",
	meta: [
		{
			name: "description",
			content:
				"Complete gebruikershandleiding voor MoneyTree.",
		},
	],
});
</script>

<template>
	<GuestLayout>
		<div class="user-guide">
			<header class="user-guide__header">
				<h1 class="user-guide__title">Handleiding</h1>
				<p class="user-guide__description">
					Welkom bij de MoneyTree handleiding.
				</p>
			</header>

			<div class="user-guide__content">
				<!-- Content komt hier -->
				<p>Handleiding content komt binnenkort...</p>
			</div>
		</div>
	</GuestLayout>
</template>

<style scoped lang="scss">
@use "@/assets/styles/views/app/user-guide.scss";
</style>
