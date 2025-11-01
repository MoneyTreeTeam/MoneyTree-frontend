/**
 * [Name]
 * 
 * [One-line summary of what this does.]
 * [Optional: Mention if it's part of a larger system or feature.]
 * 
 * @placement For Vue 3 + Vite + TypeScript: Place JSDoc inside <script setup lang="ts"> tag for .vue files, or at the top before imports for .ts files.
 * 
 * @note This JSDoc template is adaptable for any Vue component, composable, or module.
 * Use only relevant @tags based on your file's actual content:
 * - ALWAYS include: description, @module, @author, @version, @date, @license, @copyright
 * - CONDITIONALLY add: @functions (only if actual functions exist), @features (for component capabilities), 
 *   @dependencies (for external imports), @example (see specific guidelines below)
 * - For simple templates (like headers) with minimal logic, focus on description and required metadata only
 * 
 * ============================================================================
 * PROFESSIONAL COMMUNICATION STANDARDS
 * ============================================================================
 * 
 * - NO emoticons or emoji in any comments, documentation, or code
 * - Use professional, clear language throughout all documentation
 * - Maintain formal tone in JSDoc comments and inline comments
 * - Keep descriptions concise and technical without casual expressions
 * 
 * ============================================================================
 * FILE NAMING & IMPORT RULES
 * ============================================================================
 * 
 * FILE NAMING CONVENTIONS:
 * - Use PascalCase for Vue components (LoginForm.vue, UserTable.vue)
 * - Use kebab-case for routes (/moneytree-page, /user-profile)
 * - Use camelCase for composables and utilities (useAuth.ts, fetchData.ts, formatDate.ts)
 * - Use kebab-case for SCSS files (_login-form.scss, _user-table.scss)
 * - Use SCREAMING_SNAKE_CASE for constants (API_BASE_URL, MAX_RETRY_COUNT)
 * - Use PascalCase for TypeScript interfaces and types (UserData, AuthState)
 * 
 * EXPORT CONVENTIONS:
 * - Default exports ONLY for Vue components (.vue files)
 * - Named exports for utilities, composables, types, and constants
 * - Never use default exports for .ts files
 * - Example Vue component: export default defineComponent({ ... }) or <script setup>
 * - Example composable: export const useAuth = () => { ... }
 * - Example interface: export interface UserData { ... }
 * - Example constant: export const API_BASE_URL = '...';
 * 
 * IMPORT ORDER STANDARDS:
 * 1. External libraries (Vue, Pinia, VeeValidate, etc.)
 * 2. Composables (@/composables/*)
 * 3. Components (@/components/*)
 * 4. Local files (types, utils, constants, validations)
 * 5. Styles (SCSS imports in <style> tag only)
 * 
 * IMPORT ORDER EXAMPLE:
 * ```typescript
 * // 1. External libraries
 * import { ref, computed, onMounted } from 'vue';
 * import { useRouter } from 'vue-router';
 * import { useField, useForm } from 'vee-validate';
 * 
 * // 2. Composables
 * import { useAuth } from '@/composables/useAuth';
 * import { useLocale } from '@/composables/useLocale';
 * 
 * // 3. Components
 * import LoginForm from '@/components/auth/login/LoginForm.vue';
 * import AppLoader from '@/components/common/AppLoader.vue';
 * 
 * // 4. Local files
 * import type { UserData } from '@/types/user';
 * import { loginSchema } from '@/validations/authValidation';
 * import { formatDate } from '@/utils/dateUtils';
 * ```
 * 
 * ============================================================================
 * CODING PRINCIPLES & BEST PRACTICES
 * ============================================================================
 * 
 * DRY PRINCIPLE (Don't Repeat Yourself):
 * - Reuse logic across components using composables and utilities
 * - NEVER copy-paste code between similar components
 * - Extract shared functionality into composables (/src/composables/)
 * - Create utility functions for common operations (/src/utils/)
 * - Use Pinia stores for shared state management (/src/store/)
 * - Example: Extract form validation logic into useValidation.ts composable
 * - Example: Create formatCurrency.ts utility instead of duplicating formatting code
 * 
 * SOC PRINCIPLE (Separation of Concerns):
 * - Keep data logic, UI, and business rules separated into distinct layers
 * - Data fetching → composables (/src/composables/)
 * - UI rendering → components (/src/components/)
 * - Business validation → validations (/src/validations/)
 * - API communication → API services (/src/api/)
 * - State management → Pinia stores (/src/store/)
 * - Type definitions → types (/src/types/)
 * - NEVER mix concerns within a single file
 * - Example: Component calls composable → composable validates → composable calls API
 * 
 * KISS PRINCIPLE (Keep It Simple, Stupid):
 * - Prefer simple, readable code over clever, complex abstractions
 * - Each function or component should do ONE thing well
 * - Avoid over-engineering solutions for simple problems
 * - Use descriptive names instead of comments when possible
 * - Break complex logic into smaller, manageable functions
 * - Favor explicit code over implicit behavior
 * - Example: Use clear variable names like isUserAuthenticated instead of isAuth
 * 
 * ============================================================================
 * CODE LAYERING PRINCIPLES
 * ============================================================================
 * 
 * LAYER STRUCTURE (Never mix logic between layers):
 * 
 * - Presentation Layer → Vue components & layouts (/src/components/, /src/views/)
 *   Responsibilities: UI rendering, user interaction, displaying data
 *   NEVER: Direct API calls, business logic, data transformation
 * 
 * - Logic Layer → Composables & Pinia stores (/src/composables/, /src/store/)
 *   Responsibilities: Business logic, state management, data orchestration
 *   NEVER: Direct DOM manipulation, UI-specific code
 * 
 * - Data Layer → API services (/src/api/)
 *   Responsibilities: API communication, data transformation, external service integration
 *   NEVER: UI logic, component-specific state
 * 
 * LAYER FLOW EXAMPLE:
 * Vue component → calls composable → composable calls API service → API returns data → composable processes → component renders
 * 
 * ============================================================================
 * STATE MANAGEMENT STANDARDS
 * ============================================================================
 * 
 * PINIA STORE USAGE (Shared State Only):
 * - Use Pinia for shared state management ONLY
 * - Store authentication state, user profile, global configurations
 * - DO NOT store temporary data (form inputs, UI toggles, modal states)
 * - DO NOT store component-specific state
 * - Always type state, getters, and actions with TypeScript
 * - Example use cases: useAuthStore() for login state, user tokens, permissions
 * - Example use cases: useAppStore() for theme, language, global settings
 * 
 * LOCAL STATE MANAGEMENT:
 * - Keep local UI state inside components using ref() or reactive()
 * - Use composables for reusable local state logic
 * - Form inputs should use v-model with local refs
 * - Loading states should be local unless shared across multiple routes
 * - Modal states should be local unless controlled globally
 * - Example: const isModalOpen = ref(false); // Component-specific
 * - Example: const searchQuery = ref(''); // Component-specific
 * 
 * STATE TYPE REQUIREMENTS:
 * - Always define TypeScript interfaces for Pinia store state
 * - Type all getters with explicit return types
 * - Type all action parameters and return values
 * - Example: interface AuthState { user: User | null; token: string; }
 * - Example: state: (): AuthState => ({ user: null, token: '' })
 * - Example: getters: { isAuthenticated: (state): boolean => !!state.token }
 * 
 * ============================================================================
 * PERFORMANCE RULES
 * ============================================================================
 * 
 * LAZY-LOADING STRATEGY:
 * - Use lazy-loading for route components to reduce initial bundle size
 * - APPLY TO: Large or infrequently visited pages (dashboards, admin panels, reports, settings)
 * - DO NOT APPLY TO: Critical or frequently accessed pages (login, homepage, main layouts)
 * - Syntax: component: () => import('@/views/manager/auth/ManagerLogin.vue')
 * - Group related lazy-loaded routes using webpackChunkName comment
 * - Example: component: () => import(/* webpackChunkName: "admin" *\/ '@/views/admin/Dashboard.vue')
 * 
 * REACTIVITY OPTIMIZATION:
 * - Prefer computed() over watch() when possible for better performance
 * - Use watch() only when side effects are required (API calls, localStorage updates)
 * - Avoid unnecessary reactive() wrapping for primitive values (use ref() instead)
 * - Track shared state in Pinia, local UI state in component refs
 * - Use shallowRef() for large objects that don't need deep reactivity
 * - Use shallowReactive() for objects with many nested properties when only top-level changes matter
 * - Example: const count = computed(() => items.value.length); // Better than watch
 * 
 * DEBOUNCING EXPENSIVE OPERATIONS:
 * - Apply debouncing to input validation, search, autocomplete
 * - Debounce any function triggered rapidly by user input
 * - Reduces unnecessary processing and API calls
 * - Use VueUse useDebounceFn or lodash debounce
 * - Typical debounce delay: 300ms for search, 500ms for validation
 * - Example: import { useDebounceFn } from '@vueuse/core';
 * - Example: const debouncedSearch = useDebounceFn(searchUsers, 300);
 * 
 * CLEANUP & MEMORY MANAGEMENT:
 * - ALWAYS clean up event listeners and watchers on component unmount
 * - Use onUnmounted() or onBeforeUnmount() lifecycle hook to remove listeners
 * - Clear intervals and timeouts in onUnmounted()
 * - Unsubscribe from external services (WebSockets, EventEmitter)
 * - Stop watchers that were created with watch() or watchEffect()
 * - Prevents memory leaks and improves application stability
 * - Example: onUnmounted(() => { window.removeEventListener('resize', handler); });
 * - Example: const stopWatch = watch(...); onUnmounted(() => stopWatch());
 * 
 * ============================================================================
 * ACCESSIBILITY STANDARDS (WCAG 2.1 AA COMPLIANCE)
 * ============================================================================
 * 
 * SEMANTIC HTML & ARIA (COMPONENT-BASED):
 * - Use semantic HTML or your accessible components BEFORE adding manual ARIA attributes.
 * - Prefer your button components (<PrimaryButton>, <SecondaryButton>, <TertiaryButton>) over raw <button> or <div role="button">:
 *     - <PrimaryButton> → main/primary actions (e.g., Save, Submit)
 *     - <SecondaryButton> → secondary actions (e.g., Cancel, Reset)
 *     - <TertiaryButton> → neutral or alternative actions
 * - Every interactive component MUST have an accessible label:
 *     - Buttons: via label prop (e.g., <PrimaryButton label="Save Changes" />)
 *     - Inputs: via label prop (e.g., <Input id="email" label="Email" />)
 * - Use aria-label only when visible text is missing or insufficient.
 * - Use role attributes ONLY when necessary (e.g., <nav role="navigation" aria-label="Main menu">)
 * - Form inputs MUST have associated labels (automatically handled by Input component).
 * - Example buttons with labels:
 *     <PrimaryButton label="Save Changes" />
 *     <SecondaryButton label="Cancel" />
 *     <TertiaryButton label="More Options" />
 * - Example navigation:
 *     <nav role="navigation" aria-label="Main menu"></nav>
 * - Example form input:
 *     <Input id="email" type="email" label="Email" />
 * 
 * KEYBOARD NAVIGATION:
 * - ALL interactive elements MUST be keyboard accessible (focusable)
 * - Support Tab, Enter, Space, Arrow keys where appropriate
 * - Implement skip-to-content links for main content area
 * - Ensure logical tab order (avoid positive tabindex values)
 * - Trap focus within modals and dialogs (prevent focus outside)
 * - Return focus to trigger element when closing modals
 * - Example: @keydown.enter="submitForm" @keydown.esc="closeModal"
 * - Example: <a href="#main-content" class="skip-link">Skip to content</a>
 * 
 * FOCUS MANAGEMENT (COMPONENT-BASED & MODERN):
 * - All interactive elements MUST have visible focus states
 *   - Buttons, links, inputs, selects, textareas, custom components
 * - NEVER remove outlines without providing a visible alternative
 * - Use :focus-visible for keyboard-specific focus styling
 *   - Modern browsers automatically hide focus for mouse interactions
 * - Maintain minimum 2px thickness with sufficient color contrast
 *   - Your SCSS already provides: *:focus-visible { outline: 2px solid $color-primary; outline-offset: 2px; }
 * 
 * AUTO-FOCUS FOR MODALS AND DIALOGS:
 * - When opening modals or dialogs, automatically focus the first interactive element
 * - Use useAutoFocus() composable from @/composables/global/useAutoFocus for automatic focus management
 * - Supports CSS selectors (simplest) or refs (advanced control)
 * - Includes automatic focus restoration, element validation, and DOM existence checks
 * 
 * RECOMMENDED APPROACH - Using CSS selector (simplest, no boilerplate):
 *     import { useAutoFocus } from '@/composables/global/useAutoFocus';
 *     
 *     // Auto-focus on component mount with selector
 *     useAutoFocus(null, { selector: '#email', initialValue: true, delay: 100 });
 *     
 *     <Input id="email" type="email" label="Email" />
 * 
 * ALTERNATIVE APPROACH - Using ref for manual control:
 *     import { ref } from 'vue';
 *     import { useAutoFocus } from '@/composables/global/useAutoFocus';
 *     
 *     const inputRef = ref(null);
 *     const { focused, setFocus, removeFocus } = useAutoFocus(inputRef, { 
 *       initialValue: true,
 *       delay: 100
 *     });
 *     
 *     <input ref="inputRef" type="text" placeholder="Type here..." />
 * 
 * AUTO-FOCUS ON VISIBILITY CHANGE (modals, dialogs):
 *     import { ref, watch } from 'vue';
 *     import { useAutoFocus } from '@/composables/global/useAutoFocus';
 *     
 *     const isModalOpen = ref(false);
 *     const { focused } = useAutoFocus(null, { selector: '#modal-input' });
 *     
 *     watch(isModalOpen, (isOpen) => {
 *       if (isOpen) focused.value = true;
 *     });
 * 
 * FOCUS RESTORATION (built-in):
 * - useAutoFocus automatically stores and restores focus to the previous element on unmount
 * - Includes safety checks: validates element exists in DOM before restoration
 * - Prevents errors when previous element was removed from DOM
 * - Use restoreFocus: false option to disable automatic restoration if needed
 * - Example: useAutoFocus(null, { selector: '#input', restoreFocus: true }); // default
 * 
 * FOCUS VALIDATION (built-in):
 * - Automatically validates if element is focusable before attempting focus
 * - Checks: disabled state, hidden attribute, visibility, display properties
 * - Logs clear warnings when focus fails with context for debugging
 * - Prevents focus on elements with tabindex="-1" unless programmatically set
 * 
 * GLOBAL FOCUS STYLES (Applied via accessibility.scss):
 * - Button components: PrimaryButton, SecondaryButton, TertiaryButton inherit focus-visible styles
 * - Input components: Input.vue, Select.vue, Textarea.vue apply focus-visible outlines
 * - Link elements: All <a> tags receive consistent focus indicators
 * - Custom components: Extend base focus-visible styles for consistency
 * 
 * FOCUS-VISIBLE SCSS EXAMPLE:
 *     button:focus-visible,
 *     input:focus-visible,
 *     select:focus-visible,
 *     textarea:focus-visible,
 *     a:focus-visible {
 *       outline: 2px solid $color-primary;
 *       outline-offset: 2px;
 *       transition: outline-offset $transition-fast;
 *     }
 * 
 * ARIA LIVE REGIONS FOR DYNAMIC CONTENT:
 * - Announce dynamic content updates to screen readers using aria-live regions
 * - Use aria-live="polite" for non-critical updates
 * - Use aria-live="assertive" for critical/urgent messages
 * - Example: <div aria-live="polite" aria-atomic="true">{{ statusMessage }}</div>
 * 
 * ACCESSIBILITY ENHANCEMENTS:
 * - High contrast mode support via SCSS @media (prefers-contrast: high)
 * - Forced colors mode support via @media (forced-colors: active)
 * - Reduced motion support via @media (prefers-reduced-motion: reduce)
 * - All accessibility styles centralized in accessibility.scss
 * 
 * COLOR CONTRAST REQUIREMENTS:
 * - Ensure sufficient color contrast ratio ≥ 4.5:1 for normal text
 * - Large text (18pt+ or 14pt+ bold) requires ≥ 3:1 contrast ratio
 * - UI components and graphics require ≥ 3:1 contrast ratio
 * - NEVER rely on color alone to convey information
 * - Provide text labels, icons, or patterns in addition to color coding
 * - Test contrast using browser DevTools accessibility panel or online contrast checkers
 * - Example: Error messages should have icon + red color, not just red color
 * 
 * IMAGES & MEDIA:
 * - ALL informative images MUST have descriptive alt text
 * - Decorative images should use alt="" (empty alt, not missing)
 * - Complex images (charts, diagrams) need detailed descriptions via aria-describedby
 * - Provide captions or transcripts for video content
 * - Ensure audio content has text alternatives
 * - Example: <img src="logo.png" alt="FiksUp company logo">
 * - Example: <img src="decoration.svg" alt="" role="presentation">
 * 
 * ============================================================================
 * VUE FILE FORMATTING STANDARDS
 * ============================================================================
 * 
 * - NO extra empty lines after opening tags: <template>, <script>, <style>
 * - NO extra empty lines before closing tags: </template>, </script>, </style>
 * - Start content immediately after opening tag
 * - End content immediately before closing tag
 * - Example: <template>\n<div>content</div>\n</template>
 * - Example: <script setup lang="ts">\nimport { ref } from 'vue';\n</script>
 * - Example: <style scoped lang="scss">\n.component { }\n</style>
 * 
 * ============================================================================
 * SCSS FILE IMPORT REQUIREMENTS
 * ============================================================================
 * 
 * - EVERY Vue component MUST have a dedicated SCSS file
 * - SCSS file location MUST mirror component directory structure in /assets/styles/
 * - Use @use import syntax in <style> tag, NOT @import
 * - Import path MUST match component location pattern
 * 
 * SCSS IMPORT PATTERN:
 * - Component: /src/components/auth/login/LoginForm.vue
 * - SCSS file: /src/assets/styles/auth/login/_login-form.scss (with underscore)
 * - Import: @use '@/assets/styles/auth/login/login-form.scss'; (without underscore)
 * 
 * SCSS FILE NAMING CONVENTION:
 * - Convert PascalCase component name to kebab-case
 * - ALWAYS use underscore prefix for SCSS file creation (_component-name.scss)
 * - NEVER include underscore prefix in Vue component @use imports
 * - Examples: LoginForm.vue → _login-form.scss (file) → login-form.scss (import)
 * - Examples: UserTable.vue → _user-table.scss (file) → user-table.scss (import)
 * 
 * UNDERSCORE PREFIX RULES:
 * - SCSS FILE: Create with underscore (_primary-button.scss)
 * - VUE IMPORT: Import without underscore (primary-button.scss)
 * - REASON: Underscore indicates Sass partial, prevents direct compilation
 * - STANDARD: Sass convention for modular architecture and dependency management
 * 
 * SCSS STRUCTURE REQUIREMENTS:
 * - SCSS file MUST follow SCSSTemplateFrontend.js guidelines
 * - MUST include required base imports: colors, typography, variables, mixins
 * - MUST use BEM methodology for class naming
 * - MUST organize with proper section headers and alphabetical property ordering
 * 
 * ============================================================================
 * CODE FORMATTING RULES - MULTI-LINE VS SINGLE-LINE
 * ============================================================================
 * 
 * TEMPLATE ATTRIBUTES - Component formatting based on complexity:
 * 
 * SIMPLE COMPONENTS (1-2 props, no complex logic):
 * ✅ GOOD (single-line for simple cases):
 * <AppLoader v-if="isLoading" />
 * <Icon name="search" />
 * <Button @click="handleClick" />
 * 
 * COMPLEX COMPONENTS (3+ props, conditional logic, events):
 * ✅ GOOD (multi-line for clarity and readability):
 * <LoginForm 
 *     v-if="currentState === 'login' && !isLoading" 
 *     @loading="handleViewLoading" 
 * />
 * 
 * <LoginInput
 *     v-model:email="email"
 *     v-model:password="password"
 *     :email-error="emailError"
 *     :password-error="passwordError"
 *     :show-password-input="true"
 * />
 * 
 * ❌ AVOID (single-line when component has multiple props):
 * <LoginInput v-model:email="email" v-model:password="password" :email-error="emailError" :password-error="passwordError" :show-password-input="true" />
 * 
 * CONDITIONAL RENDERING WITH COMPLEX LOGIC:
 * ✅ GOOD (multi-line for readability):
 * <SmsVerificationForm 
 *     v-else-if="currentState === 'sms-verification'" 
 * />
 * 
 * <UserTable 
 *     v-if="users.length > 0 && !isLoading" 
 *     :users="filteredUsers"
 *     @edit="handleEdit"
 *     @delete="handleDelete"
 * />
 * 
 * MULTI-LINE FORMATTING RULES:
 * - Use 4 spaces for indentation within component tags
 * - Each prop/directive on separate line
 * - Closing tag on same indentation as opening tag
 * - Maintain consistent spacing between attributes
 * 
 * JAVASCRIPT/TYPESCRIPT - Keep single-line when readable, use multi-line for clarity:
 * ✅ GOOD (single-line when clear):
 * const { value: email, errorMessage: emailError } = useField<string>('email');
 * const submitForm = handleSubmit(async (values) => {
 *   await login(values.email, values.password, values.remember, switchToSmsVerification);
 * });
 * 
 * ❌ AVOID (unnecessary multi-line when parameters are short):
 * const submitForm = handleSubmit(async (values) => {
 *   await login(
 *     values.email, 
 *     values.password, 
 *     values.remember, 
 *     switchToSmsVerification
 *   );
 * });
 * 
 * MULTI-LINE GUIDELINES:
 * - Use when 80+ characters per line
 * - Use when 3 or more component props/attributes → break into multiple lines
 * - Use when function has 5+ parameters
 * - Use for complex object destructuring
 * - Maintain consistent indentation (2 spaces for JS/TS, 4 spaces for template attributes)
 * 
 * SINGLE-LINE GUIDELINES:
 * - Keep when under 80 characters
 * - Keep when 1-4 simple parameters
 * - Keep for simple assignments and declarations
 * - Keep for short, readable expressions
 * - Use for simple components with minimal props
 * 
 * COMPONENT INDENTATION STANDARDS:
 * - Template: Use 4 spaces for component attributes when multi-line
 * - Script: Use 2 spaces for JavaScript/TypeScript code
 * - Style: Use 2 spaces for SCSS/CSS code
 * - Consistent indentation throughout each section
 * 
 * ROUTER NAVIGATION GUIDELINES:
 * - Use <router-link> when navigating to another page/component
 *   - Recommended for primary navigation, CTAs, menus, or links that should be crawlable by search engines
 *   - Preserves standard link behavior (ctrl+click, right-click, open in new tab)
 *   - Improves accessibility: screenreaders recognize it as a link
 *   - Keep the inner component (e.g., BaseButton) styled normally inside <router-link>
 *
 * - Use $router.push in @click only when:
 *   - Additional logic is required before navigation (e.g., analytics tracking, conditional redirect, async operations)
 *   - The element is a button performing an action rather than pure navigation
 *   - SEO and link behavior are not required
 * 
 * ============================================================================
 * COMMENT DOCUMENTATION GUIDELINES
 * ============================================================================
 * 
 * FULL JSDoc DOCUMENTATION (with all tags):
 * - Complex Vue components that need detailed documentation
 * - Public utility composables (useLocale.ts, useClipboard.ts)
 * - Complex utilities that require explanation
 * - API services with multiple methods
 * - Complex stores with multiple actions
 * 
 * MINIMAL JSDoc (description + basic metadata only):
 * - Simple Vue components (headers, footers, basic layouts)
 * - Simple utilities (single function, self-explanatory)
 * - Type definitions and interfaces
 * - Simple validation schemas
 * 
 * INLINE COMMENTS ONLY (NO JSDoc):
 * - Configuration files (vite.config.ts, tsconfig.json, etc.)
 * - Simple router files
 * - Basic index.ts export files
 * - SCSS/CSS files (use CSS comments)
 * - JSON files (no comments)
 * 
 * INLINE COMMENTS - WHEN & HOW TO USE:
 * 
 * GOLDEN RULE: Only comment where code logic isn't immediately obvious
 * 
 * ALWAYS USE COMMENTS FOR:
 * 1. Section separators between major code blocks: // --- COMPOSABLES INITIALIZATION ---
 * 2. Complex object initialization: // Map component names to actual components for dynamic rendering
 * 3. ALL functions with parameters: Multi-line JSDoc (2-3 lines + @param tags)
 * 4. ALL computed properties: Multi-line JSDoc (2-3 lines describing transformation/logic)
 * 5. Step-by-step logic WITHIN complex functions/computed: Inline comments per step
 * 
 * NEVER USE COMMENTS FOR:
 * 1. Import statements (self-explanatory from names)
 * 2. Simple variable assignments (const data = jsonData.data)
 * 3. Self-documenting code with clear variable names
 * 4. Obvious Vue template syntax
 * 
 * FORMATTING RULES:
 * - Section separators: // --- SECTION NAME IN CAPS ---
 * - Single-line comments: Start with capital, no period at end
 * - Multi-line JSDoc: 2-3 lines description + @param/@returns if applicable
 * - Inline comments: Place ABOVE code line, explain the "why" not just "what"
 * - Always maintain professional tone without emoji or casual language
 * 
 * EXAMPLE PATTERNS (use generic placeholder names):
 * 
 * ✅ CORRECT:
 * // Map step identifiers to component instances for dynamic rendering
 * const stepComponents = { StepOne, StepTwo, StepThree };
 * 
 * // --- COMPOSABLES INITIALIZATION ---
 * const router = useRouter();
 * 
 * /**
 *  * Handles item selection and updates active state
 *  * Triggers navigation callback if provided
 *  * 
 *  * @param selectedItem - The selected menu item object
 *  * @param itemIndex - Position in the menu list
 *  *\/
 * const handleItemClick = ({ selectedItem, itemIndex }) => { ... };
 * 
 * /**
 *  * Transform raw data into structured format for display
 *  * Creates hierarchy with parent categories and child items
 *  *\/
 * const formattedItems = computed(() => rawData.map(...));
 * 
 * /**
 *  * Build navigation breadcrumb path dynamically
 *  * Format: Dashboard > Category > Subcategory (if exists)
 *  *\/
 * const breadcrumbPath = computed(() => {
 *   // Initialize with root item
 *   const pathItems = [{ label: 'Dashboard', path: '/' }];
 *   
 *   // Get current category from state
 *   const currentCategory = categories[activeIndex.value];
 *   if (!currentCategory) return pathItems;
 *   
 *   // Check if subcategory is selected
 *   const activeSubcategory = currentCategory.children?.find(child => child.id === selectedId.value);
 *   
 *   if (activeSubcategory) {
 *     // Add both category and subcategory to path
 *     pathItems.push({ label: currentCategory.name, path: currentCategory.route });
 *     pathItems.push({ label: activeSubcategory.name, path: activeSubcategory.route });
 *   } else {
 *     // Add only category to path
 *     pathItems.push({ label: currentCategory.name, path: currentCategory.route });
 *   }
 *   
 *   return pathItems;
 * });
 * 
 * ❌ INCORRECT:
 * // Import Vue functions
 * import { ref } from 'vue';
 * 
 * // Get user data
 * const userData = apiResponse.userData;
 * 
 * // This computed returns items
 * const displayItems = computed(() => rawData);
 * 
 * APPLY THIS STANDARD TO:
 * - All Vue components (especially complex pages like UserGuide.vue)
 * - All composables with exported functions
 * - All utilities with business logic
 * - Configuration files only where logic needs explanation
 * 
 * ============================================================================
 * DIRECTORY-SPECIFIC DOCUMENTATION RULES
 * ============================================================================
 * 
 * /src/components/ - VUE COMPONENTS
 * - FULL JSDoc: Complex interactive components (forms, tables, modals)
 * - MINIMAL JSDoc: Simple UI components (buttons, inputs, cards)
 * - NO JSDoc: Basic layout components (headers, footers)
 * 
 * /src/composables/ - COMPOSABLES
 * - NO @example: Composables used ONLY internally (useAuth.ts, useValidation.ts)
 * - FULL JSDoc + @example: Reusable composables (useLocale.ts, useClipboard.ts)
 * - MINIMAL JSDoc: Simple composables with single purpose
 * 
 * /src/utils/ - UTILITIES
 * - FULL JSDoc: Complex utilities with multiple parameters
 * - MINIMAL JSDoc: Simple utilities (capitalizeFirstLetter.ts)
 * - Format: Brief description + @functions only
 * 
 * /src/types/ - TYPE DEFINITIONS
 * - MINIMAL JSDoc: Brief description + @module info only
 * - NO @functions, NO @example, NO @features
 * 
 * /src/api/ - API SERVICES
 * - FULL JSDoc: Complex API classes with multiple methods
 * - MINIMAL JSDoc: Simple API helpers
 * - NO @example: API usage is documented in composables
 * 
 * /src/store/ - PINIA STORES
 * - FULL JSDoc: Complex stores with multiple actions/getters
 * - MINIMAL JSDoc: Simple stores
 * - NO @example: Store usage documented in components
 * 
 * /src/validations/ - VALIDATION SCHEMAS
 * - MINIMAL JSDoc: Brief description + @functions for schema names
 * - NO @example, NO @features
 * 
 * /src/views/ - PAGE COMPONENTS
 * - NO JSDoc: Simple page wrappers
 * - MINIMAL JSDoc: Pages with specific functionality
 * 
 * /src/router/ - ROUTING
 * - NO JSDoc: Simple route definitions
 * - Inline comments: Brief explanation of route purpose
 * 
 * /src/plugins/ - VUE PLUGINS
 * - FULL JSDoc: Complex plugins (i18n.ts)
 * - MINIMAL JSDoc: Simple plugins
 * - NO @example: Plugin usage is in main.ts
 * 
 * ROOT CONFIG FILES
 * - NO JSDoc: vite.config.ts, tsconfig.json, package.json
 * - Inline comments: Brief sections explanation
 * 
 * /src/assets/styles/ - SCSS FILES
 * - NO JSDoc: Use CSS block comments
 * - Include: purpose, author, date information only
 * 
 * ============================================================================
 * @example GUIDELINES - Include @example ONLY for these component types
 * ============================================================================
 * 
 * INCLUDE @example for:
 * - Reusable UI components (Input.vue, Button.vue, Checkbox.vue)
 * - Public utility composables (useLocale.ts, useClipboard.ts)
 * - Complex utility functions with non-obvious usage
 * - Components that require specific prop combinations
 * 
 * DO NOT include @example for:
 * - useAuth.ts, useValidation.ts (internal to specific features)
 * - Page components (Login.vue, Dashboard.vue)
 * - API services (usage documented in composables)
 * - Type definitions and interfaces
 * - Stores (usage documented in components)
 * - Simple utilities (capitalizeFirstLetter.ts)
 * - Configuration files
 * - Router files
 * - Layout components
 * 
 * EXAMPLE FORMAT for UI components:
 * Show exact template usage with props, v-model, events, and TypeScript types
 * 
 * EXAMPLE FORMAT for composables:
 * Show import, destructuring, and usage with return types
 * 
 * ============================================================================
 * CODE READABILITY RULES
 * ============================================================================
 * 
 * AVOID JSDoc when:
 * - Code is self-explanatory from filename and structure
 * - Adding JSDoc would make file cluttered
 * - File is primarily configuration or simple exports
 * 
 * USE JSDoc when:
 * - Component/function has complex behavior
 * - External usage needs explanation
 * - Business logic requires context
 * 
 * ============================================================================
 * TYPESCRIPT INTERFACE REQUIREMENTS
 * ============================================================================
 * 
 * - Always define Props interface for component props
 * - Always define Emits interface for component events
 * - Use withDefaults() for optional props with default values
 * - Type all emit functions with proper event signatures
 * - Example: interface Props { title: string; isVisible?: boolean; }
 * - Example: interface Emits { (e: 'update:modelValue', value: string): void; }
 * 
 * ============================================================================
 * TEMPLATE USAGE FOR ACTUAL FILES
 * ============================================================================
 * 
 * When implementing this template in actual files, use the following structure:
 * (Remove the @note, @placement and @example GUIDELINES sections)
 * 
 * @functions
 * - [functionName1]: [Brief summary]
 * - [functionName2]: [Brief summary, if applicable]
 * 
 * @features
 * - [Feature 1]
 * - [Feature 2]
 * - [Feature 3]
 * 
 * @dependencies
 * - [Library or module 1] - [Short usage description]
 * - [Library or module 2] - [Short usage description]
 * 
 * @example
 * ```typescript
 * // FOR REUSABLE UI COMPONENTS - Show exact template usage:
 * // <ComponentName 
 * //     v-model="value"
 * //     :prop="value"
 * //     @event="handler"
 * // />
 * 
 * // FOR PUBLIC UTILITY COMPOSABLES - Show import and usage:
 * import { useComposable } from '@/composables/useComposable';
 * 
 * const { data, loading, error } = useComposable();
 * 
 * // FOR COMPLEX UTILITIES - Show import and usage:
 * import { utilityFunction } from '@/utils/utilityFunction';
 * 
 * const result = utilityFunction(parameter);
 * ```
 * 
 * @module [ModuleName]
 * @author FiksUp
 * @version 1.0.0
 * @date [DD-MM-YYYY] - Set to the current date when created or modified
 * @see https://www.fiksup.nl/[page] (only if actual official page exists)
 * @see https://[related-docs-component-usage-url] (include official documentation page for components only if relevant links exist)
 * @license Proprietary - FiksUp License (see LICENSE file)
 * @copyright 2025 FiksUp. All rights reserved.
 */
