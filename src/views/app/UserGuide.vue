<script setup lang="ts">
import GuestLayout from "@/layouts/GuestLayout.vue";
import { useHead } from "@vueuse/head";

// Set the title of the page
useHead({
	title: "MoneyTree | User Guide",
	meta: [
		// Basic SEO
		{ name: "description", content: "Complete user guide for using MoneyTree" },
	],
});
</script>

<template>
	<GuestLayout>
		
	</GuestLayout>
</template>
