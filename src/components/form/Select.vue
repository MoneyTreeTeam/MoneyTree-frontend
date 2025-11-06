<script setup lang="ts">
/**
 * Select Component
 *
 * A reusable select dropdown component that integrates with VeeValidate for form validation.
 * Follows BEM naming methodology for CSS classes and matches Input component styling.
 *
 * @features
 * - VeeValidate integration for form validation
 * - Multiple options support with value/label pairs
 * - Error state display with validation messages
 * - Hover and focus states
 * - Disabled state support
 * - Accessible with proper labels and ARIA attributes
 * - Consistent styling with Input component
 * - Native browser dropdown styling (cross-platform compatible)
 *
 * @example
 * ```vue
 * <Select
 *     id="country"
 *     name="country"
 *     label="Land"
 *     placeholder="Selecteer een land"
 *     :options="[
 *         { value: 'nl', label: 'Nederland' },
 *         { value: 'be', label: 'België' }
 *     ]"
 *     required
 * />
 * ```
 *
 * @module SelectComponent
 */

import { toRef, watch } from "vue";
import { useField } from "vee-validate";
import type { RuleExpression } from "vee-validate";

interface SelectOption {
	value: string | number;
	label: string;
}

interface Props {
	id: string;
	name: string;
	label: string;
	options: SelectOption[];
	modelValue?: string | number;
	placeholder?: string;
	rules?: RuleExpression<string>;
	disabled?: boolean;
	required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "",
	placeholder: "Selecteer een optie",
	rules: undefined,
	disabled: false,
	required: false,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: string | number): void;
	(e: "change", value: string | number): void;
}>();

const { value, errorMessage, handleBlur } = useField(toRef(props, "name"), props.rules, {
	label: props.label,
	initialValue: props.modelValue?.toString() || '',
});

/**
 * Watch for external modelValue changes and sync with internal field value
 * This ensures the select stays in sync when parent component updates modelValue
 */
watch(
	() => props.modelValue,
	(newValue) => {
		if (newValue !== undefined && newValue !== null) {
			value.value = newValue.toString();
		}
	}
);

/**
 * Handles select change event
 * Updates VeeValidate field value and emits events
 *
 * @param event - DOM change event
 */
const handleSelectChange = (event: Event) => {
	const target = event.target as HTMLSelectElement;
	const newValue = target.value;
	value.value = newValue;
	emit("update:modelValue", newValue);
	emit("change", newValue);
};
</script>

<template>
	<div class="select">
		<label :for="id" class="select__label">
			{{ label }}
			<span v-if="required" class="select__required" aria-label="verplicht">*</span>
		</label>

		<select
			:id="id"
			:value="value"
			:name="name"
			:disabled="disabled"
			:required="required"
			:class="['select__field', { 'select__field--error': !!errorMessage }]"
			:aria-invalid="!!errorMessage"
			:aria-describedby="errorMessage ? `${id}-error` : undefined"
			:aria-required="required"
			@blur="handleBlur"
			@change="handleSelectChange"
		>
			<option value="" disabled :selected="!value" hidden>{{ placeholder }}</option>
			<option v-for="option in options" :key="option.value" :value="option.value">
				{{ option.label }}
			</option>
		</select>
        
		<span :id="`${id}-error`" class="select__error" role="alert">
			{{ errorMessage || "&nbsp;" }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
	@use "@/assets/styles/components/forms/select.scss";
</style>
