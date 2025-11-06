<script setup lang="ts">
/**
 * Contact & Review Component
 *
 * Dual-purpose page for user inquiries and product reviews.
 * Features a dynamic form that adapts based on selected request type.
 *
 * @features
 * - VeeValidate form validation with Yup schema
 * - Dynamic form fields based on request type (Contact/Review)
 * - Star rating system for reviews (1-5 stars)
 * - Responsive grid layout with centered form
 * - Semantic HTML structure with proper ARIA labels
 * - Real-time form validation feedback
 * - Form submission handling
 *
 * @requestTypes
 * - contact: Standard contact form for support inquiries
 * - review: Product review form with star rating system
 *
 * @dependencies
 * - vue - For reactive state management (ref, computed, watch)
 * - @vueuse/head - For managing page metadata (title, description)
 * - vee-validate - For form validation (useForm)
 * - useStarRating - Custom composable for star rating functionality
 * - GuestLayout.vue - Main layout wrapper
 * - BaseContainer.vue - Responsive container component
 * - Input.vue - Reusable input component with textarea support
 * - Select.vue - Reusable select dropdown component
 * - BaseButton.vue - Primary button component
 * - contactSchema - Validation schema for contact form
 * - reviewSchema - Validation schema for review form
 *
 * @module ContactReviewComponent
 */

import { ref, computed, watch } from "vue";
import { useHead } from "@vueuse/head";
import { useForm } from "vee-validate";
import { useStarRating } from "@/composables/components/forms/useStarRating";
import { useFormSubmit } from "@/composables/api/useFormSubmit";
import GuestLayout from "@/layouts/GuestLayout.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import Input from "@/components/form/Input.vue";
import Select from "@/components/form/Select.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import { contactSchema, reviewSchema } from "@/validations/contactValidation";

// --- PAGE METADATA ---
useHead({
	title: "MoneyTree | Contact & Review",
	meta: [
		{
			name: "description",
			content: "Neem contact met ons op voor vragen of deel je ervaring door een review achter te laten",
		},
	],
});

// --- FORM STATE ---
type RequestType = "contact" | "review";
const requestType = ref<RequestType>("contact");

/**
 * Dynamic validation schema based on request type
 * Switches between contactSchema and reviewSchema
 */
const validationSchema = computed(() => {
	return requestType.value === "review" ? reviewSchema : contactSchema;
});

// --- COMPOSABLES INITIALIZATION ---
const { handleSubmit, resetForm } = useForm({
	validationSchema,
});

const { rating, ratingError, hoverRating, setRating, setHoverRating, clearHoverRating, resetRating } =
	useStarRating();

const { submitForm, isSubmitting } = useFormSubmit({
	email: "MoneyTreeTeamHR@gmail.com",
	template: "table",
	captcha: false,
	onSuccess: () => {
		console.log("Email successfully sent!");
		// TODO: Show success notification
		resetForm();
		resetRating();
	},
	onError: (error) => {
		console.error("Failed to send email:", error);
		// TODO: Show error notification
	},
});

// --- WATCHERS ---
// Watch for requestType changes to reset form and rating
watch(requestType, () => {
	resetRating();
	resetForm();
});

/**
 * Handle form submission
 * Submits form data to FormSubmit.co for email delivery
 * Includes rating value for reviews
 *
 * @param values - Form values from VeeValidate
 */
const onSubmit = handleSubmit(async (values) => {
	try {
		// Prepare submission data
		const isReview = requestType.value === "review";
		
		// Create email subject based on request type
		const emailSubject = isReview
			? `Review (${values.firstname} ${values.lastname})`
			: `MoneyTree Contact: ${(values as any).subject || 'Geen onderwerp'}`;

		// Prepare form data (rename 'subject' field to avoid conflict with _subject)
		const submissionData: Record<string, string | number | boolean> = isReview
			? {
					Voornaam: values.firstname,
					Achternaam: values.lastname,
					Email: values.email,
					Beoordeling: `${rating.value} van 5 sterren`,
					Bericht: (values as any).message || '',
					Type: "Review",
				}
			: {
					Voornaam: values.firstname,
					Achternaam: values.lastname,
					Email: values.email,
					Onderwerp: (values as any).subject || '',
					Bericht: (values as any).message || '',
					Type: "Contact",
				};

		// Submit via FormSubmit.co
		await submitForm({
			subject: emailSubject,
			...submissionData,
		});
	} catch (error) {
		console.error("Form submission error:", error);
	}
});
</script>

<template>
	<GuestLayout>
		<section class="contact fade-in-initial">
			<!-- Page Header -->
			<header class="contact__header">
				<h1 class="contact__title">Contact & Review</h1>
				<p class="contact__description">
					Heb je een vraag of wil je je ervaring delen? Kies hieronder wat voor jou van toepassing is.
				</p>
			</header>

			<!-- Contact & Review Form -->
			<BaseContainer class="contact__form-section">
				<form class="contact__form" @submit="onSubmit">
					<!-- Request Type Selector -->
					<Select
						id="request-type"
						v-model="requestType"
						name="requestType"
						label="Type aanvraag"
						placeholder="Selecteer een type"
						:options="[
							{ value: 'contact', label: 'Contact & Hulp' },
							{ value: 'review', label: 'Review Achterlaten' }
						]"
						required
					/>

					<!-- Personal Information Grid -->
					<div class="contact__form-group">
						<Input
							id="contact-firstname"
							name="firstname"
							type="text"
							label="Voornaam"
							placeholder="Voer je voornaam in"
							required
						/>

						<Input
							id="contact-lastname"
							name="lastname"
							type="text"
							label="Achternaam"
							placeholder="Voer je achternaam in"
							required
						/>
					</div>

					<Input
						id="contact-email"
						name="email"
						type="email"
						label="E-mailadres"
						placeholder="Voer je e-mailadres in"
						required
					/>

					<!-- Contact-specific fields -->
					<template v-if="requestType === 'contact'">
						<Input
							id="contact-subject"
							name="subject"
							type="text"
							label="Onderwerp"
							placeholder="Waar gaat je vraag over?"
							required
						/>
					</template>

					<!-- Review-specific fields -->
					<template v-if="requestType === 'review'">
						<!-- Star Rating -->
						<div class="contact__form-field">
							<label class="contact__label">
								Beoordeling
								<span class="contact__required" aria-label="verplicht">*</span>
							</label>
							<div class="contact__rating">
								<button
									v-for="star in 5"
									:key="star"
									type="button"
									class="contact__star"
									:class="{
										'contact__star--active': star <= (hoverRating || rating),
										'contact__star--hover': star <= hoverRating,
									}"
									:aria-label="`${star} ${star === 1 ? 'ster' : 'sterren'}`"
									@click="setRating(star)"
									@mouseenter="setHoverRating(star)"
									@mouseleave="clearHoverRating"
								>
									★
								</button>
								<span v-if="rating > 0" class="contact__rating-text">
									{{ rating }} van 5 sterren
								</span>
							</div>
							<span class="contact__error-message">{{ ratingError || "&nbsp;" }}</span>
						</div>
					</template>

					<!-- Message Field -->
					<Input
						id="contact-message"
						name="message"
						:label="requestType === 'review' ? 'Jouw review' : 'Bericht'"
						:placeholder="
							requestType === 'review' ? 'Deel je ervaring met ons' : 'Voer je bericht in'
						"
						textarea
						:rows="3"
						:required="requestType === 'contact'"
					/>

					<!-- Submit Button -->
					<div class="contact__actions">
						<BaseButton
							:label="requestType === 'review' ? 'Review Versturen' : 'Bericht Versturen'"
							variant="primary"
							size="large"
							type="submit"
							:disabled="isSubmitting"
						/>
					</div>
				</form>
			</BaseContainer>
		</section>
	</GuestLayout>
</template>

<style lang="scss" scoped>
	@use "@/assets/styles/views/help/contact.scss";
</style>
