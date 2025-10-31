/**
 * useStepNavigation Composable
 * 
 * Manages the state and logic for step-based navigation components.
 * It provides reactive state for the current step and functions to move between steps.
 * 
 * @functions
 * - currentStep: A ref holding the current active step index.
 * - isFirstStep: A computed property that returns true if the current step is the first one.
 * - isLastStep: A computed property that returns true if the current step is the last one.
 * - goToFirstStep: A function to navigate to the first step.
 * - goToPreviousStep: A function to navigate to the previous step.
 * - goToNextStep: A function to navigate to the next step.
 * - goToLastStep: A function to navigate to the last step.
 * - goToStep: A function to navigate to a specific step by index.
 * 
 * @module useStepNavigationComposable
 */

import { ref, computed } from 'vue';

export function useStepNavigation(totalSteps: number, initialStep = 0) {
  const currentStep = ref(initialStep);

  const isFirstStep = computed(() => currentStep.value === 0);
  const isLastStep = computed(() => currentStep.value === totalSteps - 1);

  const goToFirstStep = () => {
    currentStep.value = 0;
  };

  const goToPreviousStep = () => {
    if (!isFirstStep.value) {
      currentStep.value--;
    }
  };

  const goToNextStep = () => {
    if (!isLastStep.value) {
      currentStep.value++;
    }
  };

  const goToLastStep = () => {
    currentStep.value = totalSteps - 1;
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      currentStep.value = step;
    }
  };

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    goToFirstStep,
    goToPreviousStep,
    goToNextStep,
    goToLastStep,
    goToStep,
  };
}
