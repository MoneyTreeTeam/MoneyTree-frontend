/**
 * FormSubmit Composable
 *
 * Handles form submission to FormSubmit.co email service.
 * Provides a simple interface for sending form data via email without a backend.
 *
 * @functions
 * - useFormSubmit: Initialize FormSubmit service with configuration
 *
 * @features
 * - Email delivery via FormSubmit.co service
 * - Configurable email recipient and subject
 * - Automatic FormData conversion
 * - Error handling and loading states
 * - Custom template and captcha settings
 * - Success/error callbacks support
 *
 * @example
 * ```typescript
 * import { useFormSubmit } from '@/composables/api/useFormSubmit';
 *
 * const { submitForm, isSubmitting, error } = useFormSubmit({
 *     email: 'recipient@example.com',
 *     onSuccess: () => console.log('Email sent!'),
 *     onError: (err) => console.error('Failed:', err)
 * });
 *
 * await submitForm({
 *     subject: 'Contact Form',
 *     name: 'John Doe',
 *     message: 'Hello'
 * });
 * ```
 *
 * @module useFormSubmit
 */

import { ref } from "vue";

interface FormSubmitConfig {
	email: string;
	template?: "box" | "table" | "plain";
	captcha?: boolean;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

interface FormSubmitData {
	subject: string;
	[key: string]: string | number | boolean;
}

/**
 * Initialize FormSubmit service with configuration
 *
 * @param config - FormSubmit configuration object
 * @returns Object containing submit function and state
 */
export const useFormSubmit = (config: FormSubmitConfig) => {
	const isSubmitting = ref(false);
	const error = ref<Error | null>(null);

	/**
	 * Submit form data to FormSubmit.co
	 * Converts data to FormData and sends via POST request
	 *
	 * @param data - Form data to submit (must include subject)
	 * @throws Error if submission fails
	 */
	const submitForm = async (data: FormSubmitData): Promise<void> => {
		isSubmitting.value = true;
		error.value = null;

		try {
			// FormSubmit.co endpoint
			const endpoint = `https://formsubmit.co/${config.email}`;

			// Create FormData
			const formData = new FormData();

			// Add FormSubmit configuration
			formData.append("_subject", data.subject);
			formData.append("_template", config.template || "box");
			formData.append("_captcha", config.captcha ? "true" : "false");

			// Add all form fields
			Object.entries(data).forEach(([key, value]) => {
				if (key !== "subject") {
					formData.append(key, String(value));
				}
			});

			// Submit to FormSubmit.co
			const response = await fetch(endpoint, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Form submission failed: ${response.statusText}`);
			}

			// Call success callback
			if (config.onSuccess) {
				config.onSuccess();
			}
		} catch (err) {
			error.value = err instanceof Error ? err : new Error("Unknown error occurred");

			// Call error callback
			if (config.onError) {
				config.onError(error.value);
			}

			throw error.value;
		} finally {
			isSubmitting.value = false;
		}
	};

	return {
		submitForm,
		isSubmitting,
		error,
	};
};
