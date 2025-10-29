<script setup lang="ts">
/**
 * BaseButton Component
 *
 * A versatile button component supporting multiple variants (Primary, Secondary, Tertiary),
 * types, sizes, and states. Features built-in loading states, icon support, and various
 * semantic button types for different user actions throughout the application.
 *
 * @functions
 * - buttonClass: Computed property that generates dynamic CSS classes based on props
 *
 * @features
 * - Three visual variants (primary, secondary, tertiary)
 * - Multiple button types (button, submit, reset, cancel, delete)
 * - Size variations (small, medium, large) optimized for mobile-first
 * - Icon support with proper spacing
 * - Loading state with integrated loader component
 * - Disabled state handling
 * - Click animation effects
 * - Semantic styling for different actions
 * - Full width and auto width options
 * - Accessibility support with proper type attributes
 *
 * @dependencies
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
 * <!-- Secondary cancel button -->
 * <BaseButton
 *     label="Cancel"
 *     variant="secondary"
 *     type="cancel"
 *     size="small"
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
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'primary',
  type: 'button',
  size: 'medium',
  icon: '',
  disabled: false,
  processing: false,
  form: ''
});

const buttonClass = computed(() => {
  return [
    'base-button',
    `base-button--${props.variant}`,
    `base-button--${props.size}`,
    `base-button--${props.type}`
  ];
});
</script>

<template>
    <button
        :class="buttonClass"
        :type="type === 'submit' ? 'submit' : 'button'"
        :disabled="disabled || processing"
        :form="form || undefined"
    >
    <template v-if="processing">
        <span class="base-button__loader"></span>
    </template>
    
    <template v-else>
        <Icon
            v-if="icon"
            :icon="icon"
            :class="{ 'base-button__icon': label, 'base-button__icon--no-text': !label }"
        />
        {{ label }}
    </template>
    </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/buttons/base-button.scss';
</style>
