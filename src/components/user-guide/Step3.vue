<script setup lang="ts">
/**
 * Step3 Component
 *
 * Content component for the third step of the user guide (Batterij & Voeding).
 * Displays section header, description, and subsections with structured content.
 *
 * @features
 * - Renders section header with title and description
 * - Displays subsections with step numbering
 * - Supports multiple content paragraphs per subsection
 * - Consistent styling through step-content.scss
 *
 * @module Step3Component
 */
// --- INTERFACES ---
interface SubSection {
  id: string;
  step: string;
  title: string;
  label: string;
  content: string[];
}

interface Section {
  id: string;
  title: string;
  label: string;
  description: string;
  component: string;
  subSections: SubSection[];
}

// --- PROPS ---
defineProps<{ 
  section: Section 
}>();

</script>

<template>
  <article class="step-content">
    <header class="step-content__header">
      <h2 class="step-content__title">{{ section.title }}</h2>
      <p class="step-content__description">{{ section.description }}</p>
    </header>

    <section 
      v-for="item in section.subSections" 
      :id="item.id"
      :key="item.id" 
      class="step-content__subsection"
      :aria-labelledby="`${item.id}-heading`"
    >
      <h3 :id="`${item.id}-heading`">{{ item.step }} {{ item.title }}</h3>
      <p v-for="(paragraph, index) in item.content" :key="index">{{ paragraph }}</p>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/user-guide/step-content.scss';
</style>
