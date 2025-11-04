<script setup lang="ts">
	/**
	 * UserGuide Component
	 *
	 * Comprehensive user guide for the MoneyTree application.
	 * Provides step-by-step documentation with interactive navigation and table of contents.
	 *
	 * @features
	 * - Dynamic step-based navigation system
	 * - Interactive table of contents with subsection support
	 * - Breadcrumb navigation for current location tracking
	 * - Smooth scrolling to sections and subsections
	 * - Highlighted section on navigation
	 * - Component-based content organization
	 *
	 * @dependencies
	 * - vue-router - For routing functionality
	 * - @vueuse/head - For managing page metadata (title, description)
	 * - GuestLayout.vue - Main layout wrapper
	 * - BreadCrumbs.vue - Breadcrumb navigation component
	 * - StepNavigation.vue - Step navigation controls
	 * - TableOfContents.vue - Interactive table of contents
	 * - Step1-4.vue - Individual step content components
	 * - useStepNavigation - Composable for step navigation logic
	 * - useTableOfContents - Composable for TOC interaction logic
	 *
	 * @module UserGuideComponent
	 */

	import { computed, toRef, watch } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useHead } from "@vueuse/head";
	import { useStepNavigation } from "@/composables/components/ui/useStepNavigation";
	import { useTableOfContents } from "@/composables/components/ui/useTableOfContents";
	import GuestLayout from "@/layouts/GuestLayout.vue";
	import BreadCrumbs from "@/components/ui/BreadCrumbs.vue";
	import StepNavigation from "@/components/ui/StepNavigation.vue";
	import TableOfContents from "@/components/ui/TableOfContents.vue";
	import Step1 from "@/components/user-guide/Step1.vue";
	import Step2 from "@/components/user-guide/Step2.vue";
	import Step3 from "@/components/user-guide/Step3.vue";
	import Step4 from "@/components/user-guide/Step4.vue";
	import userGuideContent from "@/data/views/app/userGuideContent.json";

	// Map component names to actual components for dynamic rendering
	const stepComponentMap: { [key: string]: any } = {
		Step1,
		Step2,
		Step3,
		Step4,
	};

	const userGuide = userGuideContent.userGuide;
	const sections = toRef(userGuide, "sections");

	// --- COMPOSABLES INITIALIZATION ---
	const router = useRouter();
	const route = useRoute();
	const { currentStep, goToStep } = useStepNavigation(sections.value.length);
	const { activeTocId, handleTocNavigation } = useTableOfContents(sections, currentStep, goToStep);

	// --- NAVIGATION HANDLERS ---
	/**
	 * Handles breadcrumb navigation clicks
	 * Routes to home on first breadcrumb, navigates to section on second
	 *
	 * @param item - The breadcrumb item that was clicked
	 * @param index - Position in the breadcrumb trail (0 = root, 1 = section, etc.)
	 */
	const handleBreadcrumbNavigation = ({ item, index }: { item: { text: string; to?: string }; index: number }) => {
		// Navigate to home page if root breadcrumb clicked
		if (index === 0 && item.to) {
			router.push(item.to);
		} else if (index === 1) {
			// Find section matching breadcrumb text and navigate to it
			const sectionIndex = sections.value.findIndex((s) => s.title === item.text);
			if (sectionIndex !== -1) {
				handleTocNavigation({ sectionIndex });
			}
		}
	};

	// --- PAGE METADATA ---
	useHead({
		title: "MoneyTree | Handleiding",
		meta: [
			{
				name: "description",
				content: userGuide.description,
			},
		],
	});

	// --- COMPUTED PROPERTIES ---
	/**
	 * Transform sections data into format required by TableOfContents component
	 * Maps each section with its title and subsections for TOC display
	 */
	const tocItems = computed(() =>
		sections.value.map((section) => ({
			id: section.id,
			label: section.title,
			subsections: section.subSections.map((sub) => ({
				id: sub.id,
				label: sub.label,
			})),
		})),
	);

	/**
	 * Generate breadcrumb trail based on current navigation state
	 * Creates hierarchical path showing current location in guide structure
	 * Format: Handleiding > Section Title > Subsection Title (if applicable)
	 */
	const breadcrumbItems = computed(() => {
		// Initialize with root breadcrumb
		const items: { text: string; to?: string }[] = [{ text: "Handleiding", to: "/handleiding" }];

		// Retrieve current section from navigation state
		const currentSection = sections.value[currentStep.value];
		if (!currentSection) return items;

		// Check if user is viewing a subsection
		const activeSubSection = currentSection.subSections.find((sub) => sub.id === activeTocId.value);

		if (activeSubSection) {
			// Build full path: root > section > subsection
			items.push({ text: currentSection.title, to: "#" });
			items.push({ text: activeSubSection.label });
		} else {
			// Build path with section only: root > section
			items.push({ text: currentSection.title });
		}

		return items;
	});

	/**
	 * Get the data for the currently active step
	 * Returns section object with title, description, and subsections
	 */
	const currentStepData = computed(() => {
		return sections.value[currentStep.value];
	});

	/**
	 * Resolve the Vue component for the current step
	 * Dynamically maps component name from JSON to actual component
	 */
	const currentStepComponent = computed(() => {
		const componentName = sections.value[currentStep.value]?.component;
		return componentName ? stepComponentMap[componentName] : null;
	});

	// --- WATCHERS ---
	/**
	 * Synchronize URL hash with component navigation state
	 * Runs on component mount and whenever URL hash changes
	 * Handles both main sections and subsections from URL
	 */
	watch(
		() => route.hash,
		(hash) => {
			if (hash) {
				// Extract ID from hash (remove # prefix)
				const id = hash.substring(1);
				
				// Check if hash matches a main section
				const sectionIndex = sections.value.findIndex((s) => s.id === id);

				if (sectionIndex !== -1) {
					// Navigate to main section
					goToStep(sectionIndex);
				} else {
					// Hash doesn't match section, search subsections
					for (let i = 0; i < sections.value.length; i++) {
						const subSectionIndex = sections.value[i].subSections.findIndex((sub) => sub.id === id);
						if (subSectionIndex !== -1) {
							// Found matching subsection, navigate to it
							handleTocNavigation({ sectionIndex: i, subsectionIndex: subSectionIndex });
							break;
						}
					}
				}
			} else {
				// No hash present, navigate to first section
				goToStep(0);
			}
		},
		{ immediate: true },
	);
</script>

<template>
	<GuestLayout>
		<BreadCrumbs :items="breadcrumbItems" @navigate="handleBreadcrumbNavigation" />
		<div class="user-guide container">
			<header class="user-guide__header">
				<h1 class="user-guide__title">{{ userGuide.title }}</h1>
				<p class="user-guide__description">{{ userGuide.description }}</p>
			</header>

			<div class="user-guide__toc-wrapper">
				<TableOfContents
					title="Op deze pagina"
					:items="tocItems"
					:active-id="activeTocId"
					@navigate="handleTocNavigation"
				/>
			</div>

			<div class="user-guide__content">
				<StepNavigation
					:current-step="currentStep"
					:total-steps="sections.length"
					class="user-guide__navigation--top"
					@update:step="goToStep"
				/>

				<div class="user-guide__main-content">
					<component :is="currentStepComponent" :section="currentStepData" />
				</div>

				<StepNavigation
					:current-step="currentStep"
					:total-steps="sections.length"
					class="user-guide__navigation--bottom"
					:show-summary="true"
					@update:step="goToStep"
				/>
			</div>
		</div>
	</GuestLayout>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/views/app/user-guide.scss";
</style>
