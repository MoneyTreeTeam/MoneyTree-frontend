<script setup lang="ts">
/**
 * ScrollHint Component
 *
 * Interactive scroll indicator that encourages users to scroll down to see more content.
 * Includes smooth scroll functionality and animated chevron icon.
 *
 * @features
 * - Smooth scroll to target section on click
 * - Animated bounce effect on chevron icon
 * - Hover and focus states for better UX
 * - Configurable target section ID
 * - Mobile-first responsive design
 * - Accessible with proper ARIA labels
 *
 * @dependencies
 * - @iconify/vue - For chevron icon
 * - SCSS: colors, typography from base styles
 *
 * @example
 * ```vue
 * <ScrollHint target-id="features" />
 * ```
 *
 * @module ScrollHintComponent
 */

import { Icon } from "@iconify/vue";

interface Props {
	targetId?: string;
	label?: string;
}

const props = withDefaults(defineProps<Props>(), {
	targetId: "features",
	label: "Scroll naar beneden",
});

/**
 * Smoothly scrolls to the target section with offset for fixed navbar
 * Calculates the navbar height and scrolls to position that accounts for it
 * 
 * @returns {void}
 */
const scrollToTarget = () => {
	const targetElement = document.getElementById(props.targetId);
	if (targetElement) {
		const navbarHeight = 72; // 4.5rem = 72px (navbar height)
		const elementPosition = targetElement.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth"
		});
	}
};
</script>

<template>
	<button
		class="scroll-hint"
		aria-label="Scroll naar de volgende sectie"
		@click="scrollToTarget"
	>
		<span class="scroll-hint__text">{{ label }}</span>
		<Icon icon="mdi:chevron-down" class="scroll-hint__icon" />
	</button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/scroll-hint.scss";
</style>
