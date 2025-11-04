<script setup lang="ts">
/**
 * Home View
 *
 * Landing page for MoneyTree smart object guide.
 * Target audience: Young adults who struggle with saving or their saving progress.
 *
 * @features
 * - Hero header with value proposition and background image
 * - Scroll hint for user engagement
 * - Feature highlights showcasing CPX capabilities
 * - Call-to-action section linking to comprehensive guide
 * - Mobile-first responsive design
 * - Semantic HTML structure with proper IDs
 *
 * @dependencies
 * - GuestLayout - Main layout wrapper
 * - BaseButton - CTA buttons
 * - BaseContainer - Feature card containers
 * - DividerLine - Section separators
 * - ScrollHint - Interactive scroll indicator
 * - @iconify/vue - Feature icons
 * - @vueuse/head - Meta tags management
 *
 * @module HomeView
 */

import GuestLayout from "@/layouts/GuestLayout.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import DividerLine from "@/components/ui/DividerLine.vue";
import ScrollHint from "@/components/ui/ScrollHint.vue";
import { Icon } from "@iconify/vue";
import { useHead } from "@vueuse/head";

// Set the page meta information
useHead({
	title: "MoneyTree | Home",
	meta: [
		{
			name: "description",
			content:
				"Welkom op de homepagina van MoneyTree, een interactieve handleiding om je spaargeld te laten groeien. Ontdek hoe MoneyTree, gebouwd met de Circuit Playground Express, jongvolwassenen helpt hun spaarprogressie visueel en fysiek te ervaren.",
		},
	],
});
</script>

<template>
	<GuestLayout>
		<!-- Hero Section -->
		<header id="hero" class="home__header">
			<div class="home__header-bg-wrapper">
				<img
					src="/images/moneytree-background.png"
					alt="MoneyTree plant met groeiende dollars"
					class="home__header-bg-image"
				/>
			</div>
			<div class="home__header-wrapper container">
				<div class="home__header-content">
					<h1 class="home__title">
						<span class="home__title-highlight">Groei je&nbsp;spaargeld,</span> zie het
						groeien
					</h1>
					<p class="home__subtitle">
						Speciaal voor jongvolwassenen die moeite hebben met sparen en hun
						financiële groei.
					</p>
					<p class="home__description">
						Worstelt jij met het opbouwen van spaargeld? Vind je het lastig om
						consistent te blijven? MoneyTree maakt sparen inzichtelijk en
						motiverend door je vooruitgang visueel te tonen. Zie elke euro groeien
						en bereik eindelijk je financiële doelen.
					</p>

					<div class="home__header-cta">
						<router-link to="/handleiding" class="home__cta-link">
							<BaseButton
								label="Start met groeien"
								variant="primary"
								size="large"
								icon="mdi:arrow-right"
								type="button"
								class="home__hero-button"
							/>
						</router-link>
					</div>
				</div>

				<div class="home__header-image">
					<img
						src="/images/moneytree-header-landing-page.png"
						alt="MoneyTree visual"
						class="home__hero-image"
					/>
				</div>
			</div>
			
			<ScrollHint target-id="features" class="container" />
		</header>

		<!-- Features Section -->
		<section id="features" class="home__features container">
			<h2 class="home__features-title">Waarom MoneyTree?</h2>
			<p class="home__features-description">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				Odio mollitia asperiores placeat magni minima iste id quidem suscipit nam non.
			</p>

			<div class="home__features-list">
				<BaseContainer>
					<div class="home__feature-content">
						<div class="home__feature-icon">
							<Icon icon="mdi:lightbulb-on-outline" />
						</div>
						<div class="home__feature-text">
							<h3 class="home__feature-title">Visuele progressie</h3>
							<p class="home__feature-description">
								Het smart object geeft direct visuele feedback .. wanneer je
								spaart. Zie je vooruitgang fysiek groeien op je bureau.
							</p>
						</div>
					</div>
				</BaseContainer>

				<BaseContainer>
					<div class="home__feature-content">
						<div class="home__feature-icon">
							<Icon icon="mdi:hand-coin" />
						</div>
						<div class="home__feature-text">
							<h3 class="home__feature-title">Haalbare doelen</h3>
							<p class="home__feature-description">
								Stel realistische spaardoelen in en volg je voortgang stap voor
								stap. Klein beginnen, groot eindigen.
							</p>
						</div>
					</div>
				</BaseContainer>

				<BaseContainer>
					<div class="home__feature-content">
						<div class="home__feature-icon">
							<Icon icon="mdi:chip" />
						</div>
						<div class="home__feature-text">
							<h3 class="home__feature-title">Circuit Playground Express</h3>
							<p class="home__feature-description">
								Gebouwd met professionele hardware. De CPX bevat sensoren,
								NeoPixel LED's en speaker voor een complete interactieve ervaring.
							</p>
						</div>
					</div>
				</BaseContainer>

				<BaseContainer>
					<div class="home__feature-content">
						<div class="home__feature-icon">
							<Icon icon="mdi:trophy" />
						</div>
						<div class="home__feature-text">
							<h3 class="home__feature-title">Jouw persoonlijke vooruitgang</h3>
							<p class="home__feature-description">
								Elke stap die je zet is een prestatie. Maak sparen tot iets groots
								voor jezelf en vier je eigen succes.
							</p>
						</div>
					</div>
				</BaseContainer>
			</div>
		</section>

		<div class="home__divider-wrapper container">
			<DividerLine />
		</div>
		
		<!-- CTA Section -->
		<section id="cta" class="home__cta-section">
			<div class="home__cta-section-content container">
				<h2 class="home__cta-title">Klaar om te groeien?</h2>
				<p class="home__cta-description">
					Leer hoe MoneyTree jou kan helpen met onze uitgebreide handleiding
				</p>
				<router-link to="/handleiding" class="home__cta-link">
					<BaseButton
						label="Bekijk de handleiding"
						variant="primary"
						size="medium"
						icon="mdi:book-open-page-variant"
						type="button"
					/>
				</router-link>
			</div>
		</section>
	</GuestLayout>
</template>

<style scoped lang="scss">
@use "@/assets/styles/views/app/home.scss";
</style>
