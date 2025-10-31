<script setup lang="ts">
/**
 * BaseButton Component
 *
 * A versatile button component supporting multiple variants (Primary, Secondary, Tertiary),
 * types, sizes, and states. Features built-in loading states, icon support, navigation back
 * functionality, and various semantic button types for different user actions throughout the application.
 *
 * @functions
 * - buttonClass: Computed property that generates dynamic CSS classes based on props
 * - handleClick: Handles button click events, including router.back() when goBack prop is true
 *
 * @features
 * - Three visual variants (primary, secondary, tertiary)
 * - Multiple button types (button, submit, reset, cancel, delete)
 * - Size variations (small, medium, large) optimized for mobile-first
 * - Icon support with proper spacing
 * - Loading state with integrated loader component
 * - Disabled state handling
 * - Click animation effects
 * - Navigation back functionality with router.back()
 * - Semantic styling for different actions
 * - Full width and auto width options
 * - Accessibility support with proper type attributes
 *
 * @dependencies
 * - vue-router - For programmatic navigation (router.back())
 * - @iconify/vue - For displaying icons
 * - SCSS: colors from base styles
 *
 * @example
 * ```vue
 * <!-- Primary submit button with loading state -->
 * <BaseButton
 *     label="Save Changes"
 *     variant="primary"
 *     type="submit"
 *     size="medium"
 *     icon="mdi:content-save"
 *     :processing="isSubmitting"
 *     :disabled="!isFormValid"
 * />
 *
 * <!-- Back button with router.back() -->
 * <BaseButton
 *     label="Terug"
 *     variant="secondary"
 *     type="button"
 *     size="small"
 *     icon="mdi:arrow-left"
 *     :go-back="true"
 * />
 *
 * <!-- Tertiary delete button -->
 * <BaseButton
 *     label="Delete Item"
 *     variant="tertiary"
 *     type="delete"
 *     size="small"
 *     icon="mdi:delete"
 * />
 * ```
 *
 * @module BaseButtonComponent
 */
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  type?: 'button' | 'submit' | 'reset' | 'cancel' | 'delete';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  disabled?: boolean;
  processing?: boolean;
  form?: string;
  goBack?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'primary', 
  type: 'button',
  size: 'medium',
  icon: '',
  disabled: false,
  processing: false,
  form: '',
  goBack: false
});

const router = useRouter();

const isIconOnly = computed(() => props.icon && !props.label);

const buttonClass = computed(() => {
  return [
    'base-button',
    `base-button--${props.variant}`,
    `base-button--${props.size}`,
    `base-button--${props.type}`,
    { 'base-button--icon-only': isIconOnly.value }
  ];
});

/**
 * Handles button click events
 * If goBack prop is true, navigates to previous page using router.back()
 * Otherwise, emits click event to parent component
 * 
 * @returns {void}
 */
const handleClick = () => {
	if (props.goBack) {
		router.back();
	}
};
</script>

<template>
    <button
        :class="buttonClass"
        :type="type === 'submit' ? 'submit' : 'button'"
        :disabled="disabled || processing"
        :form="form || undefined"
        @click="handleClick"
    >
    <template v-if="processing">
        <span class="base-button__loader"></span>
    </template>
    
    <template v-else>
        <Icon
            v-if="icon"
            :icon="icon"
            class="base-button__icon"
        />
        <span v-if="label">{{ label }}</span>
    </template>
    </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/buttons/base-button.scss';
</style>
