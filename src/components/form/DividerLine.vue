<script setup lang="ts">
/**
 * DividerLine Component
 *
 * A simple visual divider component that renders a horizontal line using CSS.
 * Used to separate form sections or content areas with a subtle visual break.
 *
 * @features
 * - Pure CSS implementation using ::before pseudo-element
 * - Follows BEM methodology for styling consistency
 * - Flexible vertical spacing with standard margins
 * - Lightweight component with no JavaScript logic
 * - Fully accessible with semantic HTML structure
 *
 * @dependencies
 * - SCSS: colors, variables, mixins from base styles
 *
 * @example
 * ```vue
 * <DividerLine />
 * ```
 *
 * @module DividerLineComponent
 * @author FiksUp
 * @version 1.0.0
 * @date 26-10-2025
 * @license Proprietary - FiksUp License (see LICENSE file)
 * @copyright 2025 FiksUp. All rights reserved.
 */
</script>

<template>
    <div 
        class="divider divider--line" 
        role="separator" 
        aria-orientation="horizontal">
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/form/divider-line.scss';
</style>
