<script setup lang="ts">
/**
 * UserGuide Component
 * @description Comprehensive user guide for the MoneyTree application, providing detailed instructions and documentation.
 *
 * @features
 * - Displays the user documentation for the MoneyTree application.
 * - Includes a dynamic breadcrumb for easy navigation within the guide.
 * - Uses a step navigation component to guide the user through the content.
 * - Content is structured for clarity and ease of use.
 *
 * @dependencies
 * - GuestLayout: The main layout wrapper.
 * - BreadCrumbs: The breadcrumb component.
 * - StepNavigation: The step navigation component.
 * - @vueuse/head: For managing page metadata.
 * - useStepNavigation: Composable for step navigation logic.
 * - Step1, Step2, Step3, Step4: Components for each step's content.
 *
 * @module UserGuideComponent
 */

import GuestLayout from "@/layouts/GuestLayout.vue";
import BreadCrumbs from '@/components/ui/BreadCrumbs.vue';
import StepNavigation from '@/components/ui/StepNavigation.vue';
import Step1 from '@/components/user-guide/Step1.vue';
import Step2 from '@/components/user-guide/Step2.vue';
import Step3 from '@/components/user-guide/Step3.vue';
import Step4 from '@/components/user-guide/Step4.vue';
import { computed } from 'vue';
import { useHead } from "@vueuse/head";
import { useStepNavigation } from '@/composables/components/ui/useStepNavigation';

const steps = [
  { id: 'aan-de-slag', title: 'Aan de slag', component: Step1 },
  { id: 'eerste-gebruik', title: 'Eerste gebruik', component: Step2 },
  { id: 'batterij-voeding', title: 'Batterij/voeding', component: Step3 },
  { id: 'probleemoplossing', title: 'Probleemoplossing', component: Step4 },
];

const { currentStep, goToStep } = useStepNavigation(steps.length);

// Set the title of the page
useHead({
	title: "MoneyTree | Handleiding",
	meta: [
		{
			name: "description",
			content:
				"Complete gebruikershandleiding voor MoneyTree.",
		},
	],
});

const breadcrumbItems = computed(() => {
  const items = [{ text: 'Handleiding', to: '/handleiding' }];
  items.push({ text: steps[currentStep.value].title });
  return items;
});

const currentStepComponent = computed(() => {
  return steps[currentStep.value].component;
});

</script>

<template>
	<GuestLayout>
    <BreadCrumbs :items="breadcrumbItems" />
		<div class="user-guide">
			<header class="user-guide__header">
				<h1 class="user-guide__title">Handleiding</h1>
				<p class="user-guide__description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, ea?
				</p>
			</header>

      <div class="user-guide__content">
        <StepNavigation
          :current-step="currentStep"
          :total-steps="steps.length"
          class="user-guide__navigation--top"
          @update:step="goToStep"
        />

        <div class="user-guide__main-content">
          <component :is="currentStepComponent" />
        </div>

        <StepNavigation
          :current-step="currentStep"
          :total-steps="steps.length"
          class="user-guide__navigation--bottom"
          :show-summary="true"
          @update:step="goToStep"
        />
      </div>
		</div>
	</GuestLayout>
</template>

<style scoped lang="scss">
@use "@/assets/styles/views/app/user-guide.scss";
</style>
