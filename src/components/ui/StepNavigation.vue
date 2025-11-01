<script setup lang="ts">
/**
 * StepNavigation Component
 *
 * A stateless UI component for navigating through a series of steps.
 * Displays navigation buttons and page numbers, emitting events on user interaction.
 *
 * @features
 * - First, Previous, Next, and Last navigation buttons
 * - Individual page number buttons for direct navigation
 * - Current step number and total steps display
 * - Automatic button disabling at first and last steps
 * - Optional summary text (e.g., "Toont 1 van 4 beschikbare pagina's")
 * - Icon-based navigation with consistent styling
 *
 * @dependencies
 * - BaseButton.vue - Reusable button component with icon support
 *
 * @example
 * ```vue
 * <StepNavigation
 *     :currentStep="currentStep"
 *     :totalSteps="sections.length"
 *     :showSummary="true"
 *     @update:step="goToStep"
 * />
 * ```
 *
 * @module StepNavigationComponent
 */

import { computed } from 'vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const props = defineProps<{
  currentStep: number;
  totalSteps: number;
  showSummary?: boolean;
}>();

const emit = defineEmits(['update:step']);

/**
 * Check if currently on the first step
 * Used to disable first/previous navigation buttons
 */
const isFirstStep = computed(() => props.currentStep === 0);

/**
 * Check if currently on the last step
 * Used to disable next/last navigation buttons
 */
const isLastStep = computed(() => props.currentStep === props.totalSteps - 1);

/**
 * Generate array of page numbers for navigation buttons
 * Creates zero-based index array matching totalSteps count
 */
const pageNumbers = computed(() => {
  return Array.from({ length: props.totalSteps }, (_, i) => i);
});

</script>

<template>
  <nav class="step-navigation" aria-label="Stap navigatie">
    <div class="step-navigation__main" role="group" aria-label="Navigatieknoppen">
      <div class="step-navigation__group">
        <BaseButton
          icon="mdi:page-first"
          variant="tertiary"
          :disabled="isFirstStep"
          aria-label="Ga naar eerste pagina"
          @click="emit('update:step', 0)"
        />

        <BaseButton
          icon="mdi:chevron-left"
          variant="secondary"
          :disabled="isFirstStep"
          aria-label="Ga naar vorige pagina"
          @click="emit('update:step', currentStep - 1)"
        />
      </div>

      <div class="step-navigation__pages" role="group" aria-label="Pagina nummers">
        <button 
          v-for="page in pageNumbers" 
          :key="page" 
          type="button"
          class="step-navigation__page-number" 
          :class="{ 'step-navigation__page-number--active': page === currentStep }"
          :aria-label="`Ga naar pagina ${page + 1}`"
          :aria-current="page === currentStep ? 'page' : undefined"
          @click="emit('update:step', page)"
        >
          {{ page + 1 }}
        </button>
      </div>

      <div class="step-navigation__group">
        <BaseButton
          icon="mdi:chevron-right"
          variant="secondary"
          :disabled="isLastStep"
          aria-label="Ga naar volgende pagina"
          @click="emit('update:step', currentStep + 1)"
        />

        <BaseButton
          icon="mdi:page-last"
          variant="tertiary"
          :disabled="isLastStep"
          aria-label="Ga naar laatste pagina"
          @click="emit('update:step', totalSteps - 1)"
        />
      </div>
    </div>
    <div v-if="showSummary" class="step-navigation__summary" role="status" aria-live="polite">
      <p>Toont {{ currentStep + 1 }} van {{ totalSteps }} beschikbare pagina's</p>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/step-navigation.scss";
</style>