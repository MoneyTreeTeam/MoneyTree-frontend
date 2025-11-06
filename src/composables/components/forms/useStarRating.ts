/**
 * Star Rating Composable
 *
 * Manages star rating state and interactions for review forms.
 * Integrates with VeeValidate for form validation.
 *
 * @functions
 * - useStarRating: Initialize star rating with VeeValidate integration
 *
 * @features
 * - VeeValidate field integration for validation
 * - Hover state management for visual feedback
 * - Rating value management (1-5 stars)
 * - Error message handling from validation schema
 *
 * @example
 * ```typescript
 * import { useStarRating } from '@/composables/components/forms/useStarRating';
 *
 * const { rating, ratingError, hoverRating, setRating, setHoverRating, clearHoverRating } = useStarRating();
 *
 * // In template:
 * // @click="setRating(3)"
 * // @mouseenter="setHoverRating(3)"
 * // @mouseleave="clearHoverRating"
 * ```
 *
 * @module useStarRating
 */

import { ref } from "vue";
import { useField } from "vee-validate";

/**
 * Initialize star rating with VeeValidate integration
 *
 * @returns Object containing rating state and management functions
 */
export const useStarRating = () => {
	const hoverRating = ref<number>(0);

	// Use VeeValidate's useField for rating validation
	const {
		value: rating,
		errorMessage: ratingError,
		setValue: setRatingValue,
	} = useField<number>("rating", undefined, {
		initialValue: 0,
	});

	/**
	 * Sets the rating value when a star is clicked
	 *
	 * @param value - Rating value (1-5)
	 */
	const setRating = (value: number) => {
		setRatingValue(value);
	};

	/**
	 * Sets hover rating for visual feedback
	 *
	 * @param value - Rating value being hovered (1-5)
	 */
	const setHoverRating = (value: number) => {
		hoverRating.value = value;
	};

	/**
	 * Clears hover rating when mouse leaves star
	 */
	const clearHoverRating = () => {
		hoverRating.value = 0;
	};

	/**
	 * Resets rating to initial state
	 */
	const resetRating = () => {
		setRatingValue(0);
		hoverRating.value = 0;
	};

	return {
		rating,
		ratingError,
		hoverRating,
		setRating,
		setHoverRating,
		clearHoverRating,
		resetRating,
	};
};
