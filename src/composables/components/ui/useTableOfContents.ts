/**
 * useTableOfContents Composable
 *
 * Manages logic for a Table of Contents that interacts with step-based navigation.
 * Handles navigation between sections, subsections, and smooth scrolling to target elements.
 *
 * @functions
 * - activeTocId: Ref holding current active section or subsection ID
 * - scrollToId: Scrolls to element by ID with navbar offset and highlight effect
 * - handleTocNavigation: Handles TOC navigation with section/subsection support
 *
 * @features
 * - Smooth scrolling with navbar offset calculation
 * - Temporary highlight effect on navigated elements
 * - Synchronization with step navigation
 * - Support for nested subsections
 * - Automatic active ID tracking
 *
 * @module useTableOfContentsComposable
 */
import { ref, watch, nextTick } from 'vue';
import type { Ref } from 'vue';

interface Section {
  id: string;
  [key: string]: any;
}

/**
 * Composable to manage the logic for a Table of Contents that interacts with a step-based navigation.
 *
 * @param sections - A ref containing the array of sections
 * @param currentStep - A ref representing the current active step index
 * @param goToStep - A function to change the current step
 * @returns Object containing activeTocId ref and handleTocNavigation function
 */
export function useTableOfContents(sections: Ref<Section[]>, currentStep: Ref<number>, goToStep: (step: number) => void) {
  // Initialize active TOC ID with the first section's ID, or empty string if no sections
  const activeTocId = ref(sections.value[0]?.id || '');

  /**
   * Scrolls to a specific element by ID with navbar offset compensation
   * Adds temporary highlight effect to visually indicate the target element
   * 
   * @param id - The ID of the element to scroll to
   */
  const scrollToId = (id: string) => {
    // Find the target element in the DOM
    const el = document.getElementById(id);
    if (el) {
      // Calculate scroll position accounting for fixed navbar height
      const navbarHeight = 72; // TODO: Should be a global variable
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      // Smoothly scroll to the calculated position
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

      // Add temporary highlight effect for visual feedback
      el.classList.add('highlighted');
      setTimeout(() => {
        el.classList.remove('highlighted');
      }, 2000);
    }
  };

  /**
   * Handles navigation when a TOC item is clicked
   * Updates step navigation and scrolls to the target section or subsection
   * 
   * @param sectionIndex - The index of the section to navigate to
   * @param subsectionId - Optional ID of the subsection within the section
   */
  const handleTocNavigation = ({ sectionIndex, subsectionId }: { sectionIndex: number; subsectionId?: string }) => {
    // Navigate to the selected step
    goToStep(sectionIndex);
    
    // Determine target ID: use subsection ID if provided, otherwise use section ID
    const targetId = subsectionId || sections.value[sectionIndex].id;
    activeTocId.value = targetId;

    // Wait for DOM update before scrolling
    nextTick(() => {
      scrollToId(targetId);
    });
  };

  // Watch for step changes from navigation buttons and sync the active TOC ID
  watch(currentStep, (newStepIndex) => {
    // Get the section ID for the new step
    const newSectionId = sections.value[newStepIndex]?.id;
    if (newSectionId) {
      activeTocId.value = newSectionId;
    }
  });

  return {
    activeTocId,
    handleTocNavigation,
  };
}
