<script setup lang="ts">
/**
 * Input Component
 *
 * A reusable input component that integrates with VeeValidate for form validation.
 * It supports various input types, including text, email, password, and date.
 * Follows BEM naming methodology for CSS classes.
 *
 * @features
 * - VeeValidate integration for form validation
 * - Multiple input types support (text, email, password, date)
 * - Error state display with validation messages
 * - Hover and focus states
 * - Disabled state support
 * - Accessible with proper labels and ARIA attributes
 * 
 * @example
 * <template>
 *  <Input
 *    name="email"
 *    type="email"
 *    label="Email Address"
 *    placeholder="Enter your email"
 *    :rules="required|email"
 *  />
 *
 * @module InputComponent
 */

import { toRef } from "vue";
import { useField } from "vee-validate";
import type { RuleExpression } from "vee-validate";

interface Props {
    id: string;
    name: string;
    type?: "text" | "email" | "password" | "date";
    label: string;
    placeholder?: string;
    rules?: RuleExpression<string>;
    disabled?: boolean;
    required?: boolean;
    textarea?: boolean;
    rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    placeholder: "",
    rules: undefined,
    disabled: false,
    required: false,
    textarea: false,
    rows: 4,
});

const { value, errorMessage, handleBlur, handleChange } = useField(toRef(props, "name"), props.rules, {
    label: props.label,
});

</script>

<template>
	<div class="input">
		<label :for="id" class="input__label">
			{{ label }}
			<span v-if="required" class="input__required" aria-label="verplicht">*</span>
		</label>
        
		<textarea
			v-if="textarea"
			:id="id"
			v-model="value"
			:name="name"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:rows="rows"
			:class="['input__field', 'input__field--textarea', { 'input__field--error': !!errorMessage }]"
			:aria-invalid="!!errorMessage"
			:aria-describedby="errorMessage ? `${id}-error` : undefined"
			:aria-required="required"
			@blur="handleBlur"
			@change="handleChange"
		></textarea>

		<input
			v-else
			:id="id"
			v-model="value"
			:type="type"
			:name="name"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:class="['input__field', { 'input__field--error': !!errorMessage }]"
			:aria-invalid="!!errorMessage"
			:aria-describedby="errorMessage ? `${id}-error` : undefined"
			:aria-required="required"
			@blur="handleBlur"
			@change="handleChange"
		/>
		<span :id="`${id}-error`" class="input__error" role="alert">
			{{ errorMessage || "&nbsp;" }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
	@use "@/assets/styles/components/forms/input.scss";
</style>
