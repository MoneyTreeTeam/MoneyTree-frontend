<script setup lang="ts">
/**
 * Step1 Component
 *
 * Content component for the first step of the user guide (Aan de slag).
 * Displays section header, description, and subsections with structured content.
 *
 * @features
 * - Renders section header with title and description
 * - Displays subsections with step numbering
 * - Supports multiple content paragraphs per subsection
 * - Consistent styling through step-content.scss
 *
 * @module Step1Component
 */
import BaseContainer from '@/components/ui/BaseContainer.vue';

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

interface UserGuideInfo {
  version: string;
  lastUpdated: string;
  author: string;
  targetAudience: string;
}

// --- PROPS ---
defineProps<{ 
  section: Section;
  userGuideInfo?: UserGuideInfo;
}>();

</script>

<template>
  <article :id="section.id" class="step-content">
    <!-- Intro/Versie Info Blok - alleen voor Step 1 -->
    <BaseContainer v-if="userGuideInfo" class="step-content__intro-block">
      <div class="step-content__intro-content">
        <h3 class="step-content__intro-title">Handleiding Informatie</h3>
        <div class="step-content__intro-item">
          <strong>Versie:</strong> {{ userGuideInfo.version }} | <strong>Laatste update:</strong> {{ userGuideInfo.lastUpdated }}
        </div>
        <div class="step-content__intro-item">
          <strong>Auteurs:</strong> {{ userGuideInfo.author }}
        </div>
        <div class="step-content__intro-item">
          <strong>Doelgroep:</strong> {{ userGuideInfo.targetAudience }}
        </div>
      </div>
    </BaseContainer>

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
