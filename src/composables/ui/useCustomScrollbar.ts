/**
 * Custom Scrollbar Composable
 *
 * Provides reusable custom scrollbar styling for Vue components with consistent
 * appearance and behavior across webkit and Firefox browsers.
 *
 * @features
 * - Consistent scrollbar styling across browsers
 * - Hover effects with smooth transitions
 * - Transparent track with visible thumb on interaction
 * - Configurable width and colors
 *
 * @returns Object containing CSS class name and styles
 *
 * @example
 * ```vue
 * <script setup>
 * import { useCustomScrollbar } from '@/composables/ui/useCustomScrollbar'
 *
 * const { scrollbarClass } = useCustomScrollbar()
 * </script>
 *
 * <template>
 *   <div :class="scrollbarClass">
 *     <!-- Scrollable content -->
 *   </div>
 * </template>
 * ```
 */

export function useCustomScrollbar() {
	// CSS class name for the scrollbar styling
	const scrollbarClass = "custom-scrollbar";

	return {
		scrollbarClass,
	};
}
