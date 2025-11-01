<script setup lang="ts">
/**
 * BreadCrumbs Component
 *
 * A dynamic breadcrumb navigation component that displays the current page location.
 * Provides visual hierarchy and easy navigation through the application structure.
 *
 * @features
 * - Dynamically generates breadcrumbs from items prop
 * - Last item displayed as active (non-clickable) text
 * - Previous items are clickable navigation links
 * - Chevron separator icons between items
 * - Hover effects on clickable breadcrumbs
 * - Accessible navigation with semantic HTML
 *
 * @dependencies
 * - @iconify/vue - For chevron separator icons
 *
 * @example
 * ```vue
 * <BreadCrumbs 
 *     :items="breadcrumbItems" 
 *     @navigate="handleBreadcrumbNavigation" 
 * />
 * ```
 *
 * @module BreadCrumbsComponent
 */
import { Icon } from '@iconify/vue';

interface BreadcrumbItem {
  text: string;
  [key: string]: any; // Allow other properties like 'to'
}

interface Props {
  items: BreadcrumbItem[];
}

interface Emits {
  (e: 'navigate', payload: { item: BreadcrumbItem; index: number }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

/**
 * Handles the click event on a breadcrumb item.
 * Emits a navigate event only for items that are not the last one.
 * 
 * @param item - The breadcrumb item that was clicked.
 * @param index - The index of the clicked item.
 */
const handleClick = (item: BreadcrumbItem, index: number) => {
  // Only emit for items that are not the last one
  if (index < props.items.length - 1) {
    emit('navigate', { item, index });
  }
};

</script>

<template>
  <nav aria-label="Breadcrumb" class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumbs__item"
      >
        <a
          v-if="index < items.length - 1"
          href="#"
          class="breadcrumbs__link"
          :aria-label="`Ga naar ${item.text}`"
          @click.prevent="handleClick(item, index)"
        >
          {{ item.text }}
        </a>
        <span 
          v-else 
          class="breadcrumbs__text" 
          :class="{ 'breadcrumbs__text--active': index === items.length - 1 }"
          aria-current="page"
        >
          {{ item.text }}
        </span>
        <Icon
          v-if="index < items.length - 1"
          icon="mdi:chevron-right"
          class="breadcrumbs__separator"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/breadcrumbs.scss";
</style>
