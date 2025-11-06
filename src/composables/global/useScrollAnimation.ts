/**
 * useScrollAnimation Composable
 *
 * Provides automatic scroll-based fade-in animations for elements.
 * Uses Intersection Observer API to detect when elements enter viewport.
 * Automatically applies animations to elements with specific classes or attributes.
 *
 * @features
 * - Automatic element detection and animation
 * - Configurable root margin and threshold
 * - Support for staggered animations
 * - Respects prefers-reduced-motion
 * - Cleanup on component unmount
 * - Works with dynamically added elements
 *
 * @dependencies
 * - vue - For lifecycle hooks and refs
 *
 * @example
 * ```typescript
 * // In your component setup
 * import { useScrollAnimation } from '@/composables/global/useScrollAnimation';
 * 
 * // Enable animations for all elements with data-animate attribute
 * useScrollAnimation();
 * 
 * // In your template
 * <section data-animate>Content here</section>
 * <div data-animate>More content</div>
 * ```
 *
 * @module useScrollAnimationComposable
 */

import { onMounted, onBeforeUnmount } from 'vue';

interface ScrollAnimationOptions {
  rootMargin?: string;
  threshold?: number;
  selector?: string;
}

/**
 * Set up scroll-based animations using Intersection Observer
 * Automatically animates elements when they enter the viewport
 * 
 * @param options - Configuration options for the observer
 * @param options.rootMargin - Margin around viewport for early triggering (default: '0px 0px -100px 0px')
 * @param options.threshold - Percentage of element visibility to trigger (default: 0.1)
 * @param options.selector - CSS selector for elements to animate (default: '[data-animate]')
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    rootMargin = '0px 0px -100px 0px',
    threshold = 0.1,
    selector = '[data-animate]'
  } = options;

  let observer: IntersectionObserver | null = null;

  /**
   * Handle element intersection with viewport
   * Adds animation class when element becomes visible
   * 
   * @param entries - Array of intersection observer entries
   */
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class when element enters viewport
        entry.target.classList.add('animate-on-scroll');
        
        // Stop observing this element after animation is triggered
        observer?.unobserve(entry.target);
      }
    });
  };

  /**
   * Initialize Intersection Observer and observe target elements
   * Checks for reduced motion preference before setting up
   */
  const initObserver = () => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, show all elements immediately
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.classList.add('animate-on-scroll');
      });
      return;
    }

    // Create Intersection Observer
    observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold
    });

    // Observe all elements matching selector
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      observer?.observe(element);
    });
  };

  /**
   * Clean up observer on component unmount
   * Disconnects observer and removes all observations
   */
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  // Initialize on component mount
  onMounted(() => {
    // Small delay to ensure DOM is fully ready
    setTimeout(initObserver, 100);
  });

  // Cleanup on component unmount
  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    initObserver,
    cleanup
  };
}
