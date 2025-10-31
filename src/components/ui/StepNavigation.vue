<script setup lang="ts">
/**
 * StepNavigation Component
 * 
 * A stateless UI component for navigating through a series of steps.
 * It displays navigation buttons and page numbers, emitting events on user interaction.
 * 
 * @features
 * - Provides 'First', 'Previous', 'Next', and 'Last' navigation buttons.
 * - Displays the current step number and the total number of steps.
 * - Disables buttons when they are not applicable (first or last step).
 * - Optionally displays a summary text, e.g., "Showing 1 of 5 results".
 * 
 * @module StepNavigationComponent v                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
 */

import { computed } from 'vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const props = defineProps<{
  currentStep: number;
  totalSteps: number;
  showSummary?: boolean;
}>();

const emit = defineEmits(['update:step']);

const isFirstStep = computed(() => props.currentStep === 0);
const isLastStep = computed(() => props.currentStep === props.totalSteps - 1);

const pageNumbers = computed(() => {
  return Array.from({ length: props.totalSteps }, (_, i) => i);
});

</script>

<template>
  <div class="step-navigation">
    <div class="step-navigation__main">
      <div class="step-navigation__group">
        <BaseButton
          icon="mdi:page-first"
          variant="tertiary"
          :disabled="isFirstStep"
          @click="emit('update:step', 0)"
        />

        <BaseButton
          icon="mdi:chevron-left"
          variant="secondary"
          :disabled="isFirstStep"
          @click="emit('update:step', currentStep - 1)"
        />
      </div>

      <div class="step-navigation__pages">
        <button 
          v-for="page in pageNumbers" 
          :key="page" 
          class="step-navigation__page-number" 
          :class="{ 'step-navigation__page-number--active': page === currentStep }"
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
          @click="emit('update:step', currentStep + 1)"
        />

        <BaseButton
          icon="mdi:page-last"
          variant="tertiary"
          :disabled="isLastStep"
          @click="emit('update:step', totalSteps - 1)"
        />
      </div>
    </div>
    <div v-if="showSummary" class="step-navigation__summary">
      <p>Toont {{ currentStep + 1 }} van {{ totalSteps }} beschikbare pagina's</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/step-navigation.scss";
</style>