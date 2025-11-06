<script setup lang="ts">
/**
 * StarRating Component
 *
 * A reusable star rating component that allows users to select a rating.
 * Integrates with VeeValidate for form validation.
 *
 * @module components/form/StarRating
 * @author FiksUp
 * @version 1.0.0
 * @date 05-11-2025
 * @license Proprietary - FiksUp License
 * @copyright 2025 FiksUp. All rights reserved.
 */

import { toRef, ref } from 'vue';
import { useField } from 'vee-validate';
import type { RuleExpression } from 'vee-validate';

interface Props {
  id: string;
  name: string;
  label: string;
  rules?: RuleExpression<number>;
}

const props = defineProps<Props>();

const { value, errorMessage } = useField(toRef(props, 'name'), props.rules, {
  label: props.label,
});

const hoverRating = ref(0);

const setRating = (rating: number) => {
  value.value = rating;
};

const setHoverRating = (rating: number) => {
  hoverRating.value = rating;
};

const resetHoverRating = () => {
  hoverRating.value = 0;
};
</script>

<template>
  <div class="star-rating">
    <label :for="id" class="star-rating__label">{{ label }}</label>
    <div class="star-rating__stars" @mouseleave="resetHoverRating">
      <span
        v-for="star in 5"
        :key="star"
        class="star-rating__star"
        :class="{ 'star-rating__star--filled': star <= (hoverRating || value) }"
        @mouseover="setHoverRating(star)"
        @click="setRating(star)"
      >
        &#9733;
      </span>
    </div>
    <span v-if="errorMessage" class="star-rating__error-message">{{ errorMessage }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/components/forms/star-rating.scss';
</style>
