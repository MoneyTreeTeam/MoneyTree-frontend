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
import TableOfContents from "@/components/ui/TableOfContents.vue";
import { useHead } from "@vueuse/head";
import content from "@/data/content.json";

// Get user guide content
const userGuide = content.userGuide;

// Create TOC items from sections
const tocItems = userGuide.sections.map((section) => ({
	id: section.id,
	label: section.label,
	subsections: section.subsections?.map((sub) => ({
		id: sub.id,
		label: sub.label,
	})),
}));

// Set the title of the page
useHead({
	title: `MoneyTree | ${userGuide.title}`,
	meta: [
		{
			name: "description",
			content: userGuide.description,
		},
	],
});
</script>

<template>
	<GuestLayout>
		<div class="user-guide">
			<header class="user-guide__header">
				<h1 class="user-guide__title">{{ userGuide.title }}</h1>
				<p class="user-guide__description">{{ userGuide.description }}</p>
			</header>

			<div class="user-guide__content">
				<TableOfContents title="Op deze pagina" :items="tocItems" />

				<!-- <section
					v-for="section in userGuide.sections"
					:id="section.id"
					:key="section.id"
				>
					<h2>{{ section.title }}</h2>
					<p>{{ section.content }}</p>

					<section
						v-for="subsection in section.subsections"
						:id="subsection.id"
						:key="subsection.id"
						class="subsection"
					>
						<h3>{{ subsection.title }}</h3>
						<p>{{ subsection.content }}</p>
					</section>
				</section> -->
			</div>
		</div>
	</GuestLayout>
</template>

<style scoped lang="scss">
@use "@/assets/styles/views/app/user-guide.scss";
</style>
