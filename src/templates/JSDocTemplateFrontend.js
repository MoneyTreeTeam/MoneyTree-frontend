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
 * PROFESSIONAL COMMUNICATION STANDARDS:
 * - NO emoticons or emoji in any comments, documentation, or code
 * - Use professional, clear language throughout all documentation
 * - Maintain formal tone in JSDoc comments and inline comments
 * - Keep descriptions concise and technical without casual expressions
 * 
 * VUE FILE FORMATTING STANDARDS:
 * - NO extra empty lines after opening tags: <template>, <script>, <style>
 * - NO extra empty lines before closing tags: </template>, </script>, </style>
 * - Start content immediately after opening tag
 * - End content immediately before closing tag
 * - Example: <template>\n<div>content</div>\n</template>
 * - Example: <script setup lang="ts">\nimport { ref } from 'vue';\n</script>
 * - Example: <style scoped lang="scss">\n.component { }\n</style>
 * 
 * SCSS FILE IMPORT REQUIREMENTS:
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
 * CODE FORMATTING RULES - MULTI-LINE VS SINGLE-LINE:
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
 * - Use when 3+ component props/attributes
 * - Use when function has 4+ parameters
 * - Use for complex object destructuring
 * - Maintain consistent indentation (2 spaces for JS/TS, 4 spaces for template attributes)
 * 
 * SINGLE-LINE GUIDELINES:
 * - Keep when under 80 characters
 * - Keep when 1-2 simple parameters
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
 * COMMENT DOCUMENTATION GUIDELINES:
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
 * DIRECTORY-SPECIFIC DOCUMENTATION RULES:
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
 * @example GUIDELINES - Include @example ONLY for these component types:
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
/**
 * CODE READABILITY RULES:
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
 * TYPESCRIPT INTERFACE REQUIREMENTS:
 * - Always define Props interface for component props
 * - Always define Emits interface for component events
 * - Use withDefaults() for optional props with default values
 * - Type all emit functions with proper event signatures
 * - Example: interface Props { title: string; isVisible?: boolean; }
 * - Example: interface Emits { (e: 'update:modelValue', value: string): void; }
 * 
 * (Remove this @note, @placement and @example GUIDELINES sections when implementing in actual files)
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