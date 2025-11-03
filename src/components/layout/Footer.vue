<script setup lang="ts">
/**
 * Footer Component
 *
 * Application footer with branding, social media links, and legal navigation.
 * Uses semantic HTML with proper navigation structure combined with Vue Router.
 *
 * @features
 * - MoneyTree branding with logo
 * - Social media links with external rel attributes
 * - Legal navigation with semantic list structure and router-link integration
 * - Copyright notice with divider
 * - Mobile-first responsive design
 * - Accessible navigation with proper ARIA labels
 *
 * @dependencies
 * - @iconify/vue - Social media icons
 * - DividerLine - Visual separator component
 *
 * @module FooterComponent
 */

import { Icon } from "@iconify/vue";
import DividerLine from "@/components/ui/DividerLine.vue";
</script>

<template>
	<footer class="footer">
		<div class="footer__container">
			<!-- Branding Section -->
			<router-link to="/" class="footer__branding-link" aria-label="Ga naar homepagina">
				<div class="footer__branding">
					<div class="footer__logo-wrapper">
						<img
							class="footer__logo"
							src="/images/logos/moneytree-logo-yellow.png"
							alt="MoneyTree Logo"
						/>
					</div>
					<span class="footer__brand-text">MoneyTree</span>
				</div>
			</router-link>
			<!-- Social Media Links -->
			<div class="footer__socials" @click.prevent>
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					class="footer__social-link"
					aria-label="Volg ons op X (Twitter)"
				>
					<Icon icon="mdi:twitter" class="footer__social-icon" />
				</a>
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					class="footer__social-link"
					aria-label="Volg ons op LinkedIn"
				>
					<Icon icon="mdi:linkedin" class="footer__social-icon" />
				</a>
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					class="footer__social-link"
					aria-label="Volg ons op Instagram"
				>
					<Icon icon="mdi:instagram" class="footer__social-icon" />
				</a>
			</div>

			<!-- Legal Links -->
			<nav class="footer__nav" aria-label="Footer navigatie" @click.prevent>
				<ul class="footer__nav-list">
					<li class="footer__nav-item">
						<router-link to="/algemene-voorwaarden" class="footer__nav-link">
							Algemene voorwaarden
						</router-link>
					</li>
					<li class="footer__nav-item">
						<router-link to="/cookies" class="footer__nav-link">
							Cookies
						</router-link>
					</li>
					<li class="footer__nav-item">
						<router-link to="/contact" class="footer__nav-link">
							FAQ
						</router-link>
					</li>
					<li class="footer__nav-item">
						<router-link to="/privacyverklaring" class="footer__nav-link">
							Privacyverklaring
						</router-link>
					</li>
				</ul>
			</nav>

			<DividerLine />

			<!-- Copyright -->
			<div class="footer__copyright">
				<p>&copy; Copyright 2025 MoneyTree</p>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/layout/footer.scss";
</style>
