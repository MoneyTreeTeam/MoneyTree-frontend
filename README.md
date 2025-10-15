# MoneyTree Frontend Template

> A modern, production-ready Vue 3 frontend template built with TypeScript, focusing on mobile-first responsive design and code quality.

## Project Description

This is a comprehensive Vue 3 frontend template designed for building scalable, maintainable web applications. The template includes pre-configured components, routing, styling architecture, and development tools to kickstart your project with best practices from day one.

---

## Tech Stack

| Technology          | Version  | Purpose                                    |
| ------------------- | -------- | ------------------------------------------ |
| **Vue.js**          | ^3.5.13  | Progressive JavaScript framework           |
| **TypeScript**      | ^5.7.2   | Type-safe JavaScript development           |
| **Vite**            | ^6.3.5   | Lightning-fast build tool and dev server   |
| **Vue Router**      | ^4.5.0   | Official routing library for Vue           |
| **Sass/SCSS**       | ^1.86.0  | Advanced CSS preprocessor                  |
| **Iconify**         | ^4.3.0   | Universal icon framework                   |
| **ESLint**          | ^9.37.0  | Code quality and consistency               |
| **Prettier**        | ^3.6.2   | Opinionated code formatter                 |
| **VueUse**          | ^2.0.0   | Dynamic meta tags & SEO Management         |

---

## Design Philosophy

### Mobile-Only Design
This template is specifically designed for **mobile devices only** (smartphones):
- Optimized for viewports up to **767px** (max mobile width)
- No tablet or desktop breakpoints needed
- Focused, streamlined mobile user experience
- Performance optimized for mobile networks

### SCSS Architecture
```
assets/styles/
├── base/          # Variables, colors, typography, mixins
├── components/    # Component-specific styles
├── layouts/       # Layout wrappers and layout-specific helpers
├── forms/         # Form elements and validation styles
├── utils/         # Utility classes and helper functions
└── views/         # Page-specific styles
```

---

## Project Structure

```
src/
├── assets/              # Static assets and styles
├── components/          # Reusable Vue components
│   ├── form/           # Form components (Input, Dropdown, etc.)
│   ├── general/        # Buttons, breadcrumbs
│   ├── layout/         # Header, footer, navbar
│   ├── table/          # Data table components
│   └── ui/             # UI utilities (scrollbar, etc.)
├── composables/         # Vue composition functions
├── layouts/             # Layout wrappers
├── plugins/             # Vue plugins
├── router/              # Vue Router configuration
├── validations/         # Form validation logic
└── views/               # Page components
    ├── app/            # Main application views
    ├── errors/         # Error pages (404, 500)
    ├── help/           # Help pages (FAQ, Contact)
    └── policies/       # Legal pages (Privacy, Terms)
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

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Start development server on http://localhost:3000|
| `npm run build`      | Build for production with type checking          |
| `npm run preview`    | Preview production build locally                 |
| `npm run lint`       | Run ESLint and auto-fix issues                   |
| `npm run format`     | Format code with Prettier                        |

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

---

## Styling Methodology

### Global SCSS Variables
All SCSS files automatically import base variables:
- `variables.scss` - Spacing, sizes, breakpoints
- `colors.scss` - Color palette and themes
- `typography.scss` - Font families, sizes, weights
- `mixins.scss` - Reusable CSS functions
- `shadows.scss` - Shadow tokens and elevation styles

### Mobile Viewport
```scss
// Mobile Only (no breakpoints needed)
$mobile-max: 767px;  // Maximum mobile width

// All styles are mobile-first by default
// No media queries needed for tablet/desktop
```

### Usage Example
```vue
<style lang="scss" scoped>
.component {
  // Default mobile styles (320px - 767px)
  padding: 1rem;
  font-size: 14px;
  
  // No tablet/desktop styles needed
  // Application is mobile-only
}
</style>
```

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
- **Tabs**: Enabled (no spaces)
- **Semicolons**: Required
- **Quotes**: Double quotes
- **Trailing Commas**: All
- **CSS Order**: Alphabetical sorting

---

## Best Practices

1. **Component Naming**: Use PascalCase for components
2. **Props & Emits**: Always define TypeScript types
3. **Composables**: Prefix with `use` (e.g., `useAuth`)
4. **SCSS**: Use scoped styles in components
5. **Imports**: Use `@/` alias for src directory
6. **Validation**: Centralize validation logic in `/validations`

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