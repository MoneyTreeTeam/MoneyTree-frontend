https://moneytreeteam.github.io/MoneyTree-frontend/

# MoneyTree Frontend

> A modern, production-ready Vue 3 application built with TypeScript, featuring mobile-first responsive design, scroll animations, and comprehensive documentation.

## Project Description

MoneyTree is a comprehensive Vue 3 frontend application designed to provide an interactive user guide experience. Built with TypeScript for type safety and Vite for lightning-fast development, this application demonstrates best practices in modern frontend development.

---

## Tech Stack

| Technology          | Version  | Purpose                                    |
| ------------------- | -------- | ------------------------------------------ |
| **Vue.js**          | ^3.5.13  | Progressive JavaScript framework           |
| **TypeScript**      | ^5.7.2   | Type-safe JavaScript development           |
| **Vite**            | ^6.3.5   | Lightning-fast build tool and dev server   |
| **Vue Router**      | ^4.5.0   | Official routing library for Vue           |
| **VeeValidate**     | ^4.13.2  | Form validation framework for Vue          |
| **Yup**             | ^1.4.0   | Schema validation and data validation      |
| **Sass/SCSS**       | ^1.86.0  | Advanced CSS preprocessor                  |
| **Iconify**         | ^4.3.0   | Universal icon framework                   |
| **ESLint**          | ^9.37.0  | Code quality and consistency               |
| **Prettier**        | ^3.6.2   | Opinionated code formatter                 |
| **VueUse/Head**     | ^2.0.0   | Dynamic meta tags & SEO management         |
| **Lint-Staged**     | ^16.2.6  | Pre-commit code formatting                 |

---

## Design Philosophy

### Mobile-First Responsive Design
This template follows a **mobile-first responsive approach**:
- Starts with mobile optimization (320px base)
- Progressively enhances for larger viewports
- Fully responsive across all device sizes
- Performance optimized with mobile as priority
- Smooth transitions between breakpoints

### SCSS Architecture
```
assets/styles/
├── base/               # Foundation styles
│   ├── _colors.scss   # Color palette and theme colors
│   ├── _global.scss   # Global HTML/body styles
│   ├── _mixins.scss   # Reusable SCSS mixins and functions
│   ├── _reset.scss    # CSS reset and normalization
│   ├── _shadows.scss  # Shadow tokens and elevation
│   ├── _typography.scss # Font families, sizes, weights
│   └── _variables.scss  # Spacing, breakpoints, z-index
├── components/         # Component-specific styles
│   ├── buttons/       # Button components
│   ├── forms/         # Form elements (input, checkbox, etc.)
│   ├── layout/        # Header, footer, navbar, sidebar
│   ├── table/         # Data table components
│   ├── ui/            # UI utilities (modals, breadcrumbs, etc.)
│   └── user-guide/    # User guide specific styles
├── layouts/           # Layout wrappers and page structures
├── utils/             # Utility classes and animations
│   ├── _animations.scss    # Scroll animations and transitions
│   └── _notifications.scss # Toast and notification styles
└── views/             # Page-specific styles
    └── app/          # Application page styles
```

---

## Project Structure

```
src/
├── assets/                    # Static assets and styles
│   └── styles/               # SCSS architecture
│       ├── main.scss         # Main SCSS entry point
│       ├── base/             # Foundation styles (colors, typography, etc.)
│       ├── components/       # Component-specific styles
│       ├── layouts/          # Layout-specific styles
│       ├── utils/            # Utilities and animations
│       └── views/            # Page-specific styles
├── components/                # Reusable Vue components
│   ├── buttons/              # Button components (BaseButton)
│   ├── form/                 # Form components (Input, Checkbox, etc.)
│   ├── general/              # General purpose components
│   ├── layout/               # Layout components (Header, Footer, Navbar, Sidebar)
│   ├── table/                # Data table components
│   ├── ui/                   # UI utilities (Modal, Container, Breadcrumbs, etc.)
│   └── user-guide/           # User guide step components
├── composables/               # Vue composition functions
│   ├── components/           # Component-specific composables
│   │   └── ui/              # UI component logic
│   └── global/              # Global reusable composables
├── data/                      # Static JSON data files
│   ├── components/           # Component-related data
│   │   └── layout/          # Layout component data
│   └── views/               # View-related data
│       └── app/             # Application view data
├── layouts/                   # Layout wrappers (GuestLayout)
├── plugins/                   # Vue plugins and extensions
├── router/                    # Vue Router configuration
│   └── index.ts             # Route definitions
├── templates/                 # Documentation templates (JSDoc)
├── validations/               # Form validation logic
│   └── validations.ts       # Validation schemas
└── views/                     # Page components
    ├── app/                  # Main application views (Home, UserGuide)
    ├── errors/               # Error pages (404, 500)
    ├── help/                 # Help pages (Contact)
    └── policies/             # Legal pages (Privacy, Terms, Cookies)
```

---

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Vue-frontend-only-template

# Install dependencies
npm install
```

---

## Available Commands

| Command                 | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Start development server on http://localhost:3000|
| `npm run build`         | Build for production with type checking          |
| `npm run preview`       | Preview production build locally                 |
| `npm run lint`          | Run ESLint and auto-fix issues                   |
| `npm run format`        | Format all staged files with Prettier            |
| `npm run format:item`   | Format specific file(s) with Prettier            |

### Running the Development Server

```bash
npm run dev
```
The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://0.0.0.0:3000 (accessible from other devices)

### Building for Production

```bash
# Build with TypeScript type checking
npm run build

# Preview the production build
npm run preview
```

### Code Formatting

```bash
# Format all staged files (runs automatically with lint-staged)
npm run format

# Format specific file or files
npm run format:item -- src/views/app/Home.vue
npm run format:item -- "src/components/**/*.vue"
```

---

## Styling Methodology

### Global SCSS Variables
All SCSS files use a centralized base import system:

**Available Base Imports:**
- `_colors.scss` - Color palette, primary/secondary colors, text colors
- `_typography.scss` - Font families, sizes (h1-h6, p1-p5), weights
- `_variables.scss` - Responsive breakpoints, font weights, and border widths
- `_mixins.scss` - Reusable functions (responsive containers, gradients, etc.)
- `_shadows.scss` - Shadow tokens and elevation system
- `_global.scss` - Global HTML/body styles and utilities
- `_reset.scss` - CSS normalization and reset

### Responsive Breakpoints
```scss
// Breakpoint variables defined in _variables.scss
$breakpoint-mobile-small: 480px;  // Small mobile devices (max-width)
$breakpoint-mobile: 767px;        // Mobile devices (max-width)
$breakpoint-tablet: 768px;        // Tablet and desktop (min-width)

// Responsive mixins available in _mixins.scss
@include mobile-small {
  // Styles for max-width: 480px (small mobile)
}

@include mobile {
  // Styles for max-width: 767px (mobile)
}

@include tablet {
  // Styles for min-width: 768px (tablet and desktop)
}
```

**Usage Example:**
```scss
.my-component {
  padding: 2rem;
  
  @include mobile {
    padding: 1.5rem; // Applied on mobile (≤767px)
  }
  
  @include mobile-small {
    padding: 1rem; // Applied on small mobile (≤480px)
  }
}

---

## Configuration Files

| File                    | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `vite.config.ts`        | Vite build and dev server configuration    |
| `tsconfig.json`         | TypeScript compiler options                |
| `eslint.config.js`      | ESLint rules and plugins                   |
| `.prettierrc`           | Prettier formatting rules                  |
| `.editorconfig`         | Editor consistency settings                |

---

## Code Style Guidelines

### ESLint Rules
- Vue 3 recommended rules enabled
- TypeScript strict mode
- Unused variables show warnings
- Multi-word component names not required

### Prettier Configuration
- **Tab Width**: 4 spaces
- **Use Tabs**: true
- **Semicolons**: Required
- **Quotes**: Double quotes
- **Trailing Commas**: All
- **Bracket Spacing**: true
- **Vue Indent Script and Style**: true
- **CSS Order**: Alphabetical (via prettier-plugin-css-order)

---

## Best Practices

### Component Development
1. **Naming Conventions**: 
   - Components: PascalCase (e.g., `UserProfile.vue`)
   - Composables: camelCase with `use` prefix (e.g., `useAuth.ts`)
   - SCSS files: kebab-case with underscore prefix (e.g., `_user-profile.scss`)

2. **TypeScript Types**: 
   - Always define interfaces for props and emits
   - Use proper type annotations for all functions
   - Avoid `any` type unless absolutely necessary

3. **SCSS Structure**:
   - Use scoped styles in single-file components
   - Import base SCSS variables via `@use` (not `@import`)
   - Follow BEM naming methodology for classes
   - Each component must have a dedicated SCSS file in matching directory

4. **Code Organization**:
   - Use `@/` alias for src directory imports
   - Group related functionality in composables
   - Keep validation logic centralized in `/validations`
   - Store static data in `/data` directory as JSON

5. **Accessibility**:
   - Include proper ARIA labels and roles
   - Ensure keyboard navigation works
   - Maintain sufficient color contrast
   - Support screen readers with semantic HTML

6. **Performance**:
   - Lazy-load routes when appropriate
   - Use computed properties over watchers
   - Implement scroll animations with Intersection Observer
   - Optimize images and assets

---

## Key Features

### Scroll-Based Animations
The template includes a built-in scroll animation system:
- **Automatic fade-in animations** when elements enter viewport
- **Intersection Observer API** for performance
- **Respects user preferences** (prefers-reduced-motion)
- **Staggered animations** for sequential elements
- **Easy to use**: Just add `data-animate` attribute to any element

### SEO & Meta Management
- **Dynamic meta tags** with VueUse Head
- **Configurable page titles** and descriptions
- **Semantic HTML** structure throughout
- **Sitemap and robots.txt** included

---

## Contributing

When working with a team:

1. **Run linting** before committing:
   ```bash
   npm run lint
   ```

2. **Format your code**:
   ```bash
   npm run format
   ```

3. **Ensure type safety**:
   ```bash
   npm run build
   ```

---

## Author

**MoneyTree Development Team**

---

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Sass Documentation](https://sass-lang.com/)