<script setup lang="ts">
/**
 * BreadCrumbs Component
 * 
 * @description A dynamic breadcrumb component that displays the user's navigation path.
 *
 * @props
 * - items: An array of breadcrumb items, where each item is an object with `text` and an optional `to` for the link.
 *
 * @features
 * - Dynamically generates breadcrumbs from a prop.
 * - The last item is always displayed as active and is not a link.
 * - Includes a separator icon between items.
 *
 * @dependencies
 * - @iconify/vue: For the separator icon.
 *
 * @example
 * <BreadCrumbs :items="[{ text: 'Home', to: '/' }, { text: 'Handleiding' }]" />
 *
 * @module BreadCrumbsComponent
 */

import { Icon } from '@iconify/vue';

interface BreadcrumbItem {
  text: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <nav aria-label="breadcrumb" class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumbs__item"
      >
        <router-link
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="breadcrumbs__link"
        >
          {{ item.text }}
        </router-link>
        <span v-else class="breadcrumbs__text" :class="{ 'breadcrumbs__text--active': index === items.length - 1 }">
          {{ item.text }}
        </span>
        <Icon
          v-if="index < items.length - 1"
          icon="mdi:chevron-right"
          class="breadcrumbs__separator"
        />
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/breadcrumbs.scss";
</style>
