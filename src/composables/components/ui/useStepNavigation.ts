/**
 * useStepNavigation Composable
 *
 * Manages state and logic for step-based navigation components.
 * Provides reactive state for current step and functions to navigate between steps.
 *
 * @functions
 * - currentStep: Ref holding current active step index (0-based)
 * - isFirstStep: Computed property returning true if on first step
 * - isLastStep: Computed property returning true if on last step
 * - goToFirstStep: Navigate to first step (index 0)
 * - goToPreviousStep: Navigate to previous step (decrements index)
 * - goToNextStep: Navigate to next step (increments index)
 * - goToLastStep: Navigate to last step (totalSteps - 1)
 * - goToStep: Navigate to specific step by index (with bounds checking)
 *
 * @module useStepNavigationComposable
 */
import { ref, computed } from 'vue';

/**
 * Composable for managing step-based navigation state and controls
 * 
 * @param totalSteps - Total number of steps available for navigation
 * @param initialStep - Optional starting step index (defaults to 0)
 * @returns Object containing navigation state and control functions
 */
export function useStepNavigation(totalSteps: number, initialStep = 0) {

  // --- STATE ---
  // Track current active step (0-based index)
  const currentStep = ref(initialStep);

  // --- COMPUTED PROPERTIES ---
  // Check if currently on the first & last step
  const isFirstStep = computed(() => currentStep.value === 0);
  const isLastStep = computed(() => currentStep.value === totalSteps - 1);

  // --- NAVIGATION METHODS ---
  /**
   * Navigate to the first step (index 0)
   */
  const goToFirstStep = () => {
    currentStep.value = 0;
  };

  /**
   * Navigate to the previous step
   * Only decrements if not already on first step
   */
  const goToPreviousStep = () => {
    if (!isFirstStep.value) {
      currentStep.value--;
    }
  };

  /**
   * Navigate to the next step
   * Only increments if not already on last step
   */
  const goToNextStep = () => {
    if (!isLastStep.value) {
      currentStep.value++;
    }
  };

  /**
   * Navigate to the last step (totalSteps - 1)
   */
  const goToLastStep = () => {
    currentStep.value = totalSteps - 1;
  };

  /**
   * Navigate to a specific step by index
   * Validates step is within valid range before navigating
   * 
   * @param step - Target step index (0-based)
   */
  const goToStep = (step: number) => {
    // Validate step is within bounds
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
