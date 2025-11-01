<script setup lang="ts">
/**
 * BaseContainer Component
 *
 * Reusable container wrapper with consistent styling and hover effects.
 * Used to wrap content sections with a professional card-like appearance.
 *
 * @features
 * - Consistent border, padding, and border-radius
 * - Hover effects with subtle border color change
 * - Flexible content via default slot
 * - White background with divider border
 * - Smooth transitions for interactive feedback
 *
 * @example
 * ```vue
 * <BaseContainer>
 *     <h3>Section Title</h3>
 *     <p>Content goes here...</p>
 * </BaseContainer>
 * ```
 *
 * @module BaseContainerComponent
 */
</script>

<template>
	<div class="base-container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/base-container.scss";
</style>