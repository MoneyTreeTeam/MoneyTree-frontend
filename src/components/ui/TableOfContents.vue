<script setup lang="ts">
/**
 * TableOfContents
 *
 * A reusable table of contents component that emits navigation events.
 * Supports expandable/collapsible subsections with an accordion effect.
 *
 * @features
 * - Renders nested list based on items prop
 * - Emits navigate event when link is clicked
 * - Expandable/collapsible subsections with accordion effect
 * - Fully accessible with ARIA attributes
 * - Active section highlighting with visual indicators
 * - Smooth transitions for expand/collapse animations
 *
 * @dependencies
 * - @iconify/vue - For chevron icons in expandable sections
 * - BaseContainer.vue - Container wrapper with consistent styling
 *
 * @example
 * ```vue
 * <TableOfContents
 *     :items="tocItems"
 *     :activeId="activeTocId"
 *     title="In deze handleiding"
 *     @navigate="handleTocNavigation"
 * />
 * ```
 *
 * @module TableOfContents
 * @author FiksUp
 * @version 1.0.0
 * @date 01-11-2025
 * @license Proprietary - FiksUp License (see LICENSE file)
 * @copyright 2025 FiksUp. All rights reserved.
 */
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseContainer from './BaseContainer.vue';

// --- INTERFACES ---
interface TocSubItem {
  id: string;
  step: string;
  title: string;
}

interface TocItem {
  id: string;
  label: string;
  subsections?: TocSubItem[];
}

interface Props {
  title?: string;
  items: TocItem[];
  activeId: string;
}

interface Emits {
  (e: 'navigate', payload: { sectionIndex: number; subsectionId?: string }): void;
}

// --- PROPS & EMITS ---
withDefaults(defineProps<Props>(), {
  title: 'in deze handleiding',
});
const emit = defineEmits<Emits>();

// --- STATE ---
const expandedItems = ref<Set<string>>(new Set());

// --- METHODS ---
/**
 * Emits a navigate event to the parent component.
 * @param sectionIndex - The index of the main section.
 * @param subsectionId - The optional ID of the subsection.
 */
const requestNavigation = (sectionIndex: number, subsectionId?: string) => {
  emit('navigate', { sectionIndex, subsectionId });
};

/**
 * Toggles the expanded state of a TOC item.
 * @param id - The ID of the item to toggle.
 */
const toggleExpand = (id: string) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  } else {
    expandedItems.value.add(id);
  }
};

/**
 * Checks if a TOC item is currently expanded.
 * @param id - The ID of the item to check.
 * @returns True if the item is expanded, otherwise false.
 */
const isExpanded = (id: string) => expandedItems.value.has(id);

</script>

<template>
  <BaseContainer>
    <nav class="toc" aria-label="Inhoudsopgave">
      <h2 class="toc__title">{{ title }}</h2>
      <ul class="toc__list" role="list">
        <li 
          v-for="(item, index) in items" 
          :key="item.id" 
          class="toc__item" 
          :class="{ active: activeId === item.id || activeId.startsWith(`${item.id}-`) }"
        >
          <div class="toc__item-row" @click="toggleExpand(item.id)">
            <a 
              :href="`#${item.id}`" 
              :aria-label="`Ga naar sectie ${item.label}`"
              :aria-current="activeId === item.id ? 'location' : undefined"
              class="toc__link"
              @click.prevent.stop="requestNavigation(index)"
            >
              {{ item.label }}
            </a>
            
            <button 
              v-if="item.subsections && item.subsections.length > 0"
              type="button"
              class="toc__toggle-btn"
              :aria-expanded="isExpanded(item.id)"
              :aria-label="`Vouw sectie ${item.label} uit/in`"
              :aria-controls="`toc-subsection-${item.id}`"
            >
              <Icon 
                icon="mdi:chevron-down" 
                class="toc__chevron-icon"
                aria-hidden="true"
              />
            </button>
          </div>
          
          <transition name="accordion">
            <ul 
              v-if="item.subsections && isExpanded(item.id)" 
              :id="`toc-subsection-${item.id}`"
              class="toc__subsections"
              role="list"
            >
              <li 
                v-for="subitem in item.subsections" 
                :key="subitem.id"
                class="toc__subsection-item"
                :class="{ active: activeId === subitem.id }"
              >
                <a 
                  :href="`#${subitem.id}`" 
                  :aria-label="`Ga naar subsectie ${subitem.step} ${subitem.title}`"
                  :aria-current="activeId === subitem.id ? 'location' : undefined"
                  class="toc__subsection-link"
                  @click.prevent.stop="requestNavigation(index, subitem.id)"
                >
                  <span class="toc__subsection-step">{{ subitem.step }}</span>
                  <span class="toc__subsection-title">{{ subitem.title }}</span>
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>
  </BaseContainer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/ui/table-of-contents.scss';
</style>