<script setup lang="ts">
/**
 * BaseContainer Component
 *
 * Reusable container component with consistent border styling and hover effects.
 * Used to wrap content sections with a professional card-like appearance.
 *
 * @features
 * - Consistent border and padding
 * - Hover effects (shadow + transform)
 * - Flexible content via slot
 * - Mobile-first responsive design
 *
 * @example
 * ```vue
 * <BaseContainer>
 *   <h3>Title</h3>
 *   <p>Content goes here...</p>
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