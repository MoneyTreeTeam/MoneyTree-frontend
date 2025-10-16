<script setup lang="ts">
import GuestLayout from "@/layouts/GuestLayout.vue";
import { useHead } from "@vueuse/head";

// Set the title of the page
useHead({
	title: "MoneyTree | 500 - Serverfout",
	meta: [{ name: "description", content: "Er is een serverfout opgetreden. Probeer het later opnieuw" }],
});
</script>

<template>
	<GuestLayout>
		
	</GuestLayout>
</template>
