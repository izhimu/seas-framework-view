## 1. Setup and File Structure

- [x] 1.1 Verify `skills/seas-view/` directory exists (create if needed)
- [x] 1.2 Review existing Agent SKILLS examples (e.g., `.gemini/skills/openspec-*/SKILL.md`) to understand format
- [x] 1.3 Prepare YAML frontmatter metadata fields (name, description, license, compatibility, metadata)

## 2. Create YAML Frontmatter

- [x] 2.1 Add `name: seas-view` field
- [x] 2.2 Add `description` field explaining the skill purpose
- [x] 2.3 Add `license: Apache-2.0` field (matching framework license)
- [x] 2.4 Add `compatibility` field noting this is for SEAS framework
- [x] 2.5 Add `metadata` section with author and version information
- [x] 2.6 Validate YAML syntax is correct

## 3. Document Framework Overview

- [x] 3.1 Write introduction section explaining SEAS Framework View purpose
- [x] 3.2 Document monorepo structure (core/ and packages/ directories)
- [x] 3.3 Explain the framework is Vue 3 + TypeScript + Vite based
- [x] 3.4 List all available package modules (seas-base-view, seas-security-view, etc.)

## 4. Document Architecture (Core vs Packages)

- [x] 4.1 Create section for core libraries documentation
- [x] 4.2 Document `@izhimu/seas-core` (core functionality library)
- [x] 4.3 Document `@izhimu/seas-common` (common utilities library)
- [x] 4.4 Document `@izhimu/seas-mobile-core` (mobile-specific core library)
- [x] 4.5 Explain that core libraries can be depended upon by SEAS-based projects
- [x] 4.6 Create section for package modules documentation
- [x] 4.7 Document package modules as feature-specific UI pages and components
- [x] 4.8 List all package names and their purposes (base, security, storage, job, healthy, generate, mqtt, ai, form)
- [x] 4.9 Explain that packages can depend on each other

## 5. Document Technology Stack

- [x] 5.1 List core technologies: Vue 3.5+, TypeScript, Vite 6+
- [x] 5.2 Document UI libraries: Naive UI (desktop), Vant (mobile)
- [x] 5.3 Document state management: Pinia with persistence plugin
- [x] 5.4 Document routing: Vue Router 4
- [x] 5.5 Document other dependencies: ECharts, axios, mitt, sm-crypto, qs
- [x] 5.6 Document build tools: ESLint, Prettier, TypeScript configurations
- [x] 5.7 Document package manager: pnpm >= 9.7.1 with workspaces
- [x] 5.8 Note version requirements for Node.js (>= 18)

## 6. Document Development Workflow

- [x] 6.1 List all development commands (`pnpm run dev`, `pnpm run dev:base`, etc.)
- [x] 6.2 Explain what each dev command does
- [x] 6.3 Document build commands (`pnpm run build`)
- [x] 6.4 Explain how to develop specific packages using filtered commands
- [x] 6.5 Document how to run multiple packages in parallel
- [x] 6.6 Provide examples of common development workflows

## 7. Document Development Standards

- [x] 7.1 Specify code style requirements: TypeScript, Vue 3 Composition API with `<script setup>`
- [x] 7.2 Document indentation: 2 spaces, no tabs
- [x] 7.3 Document line width limit: 100 characters
- [x] 7.4 Specify component naming: PascalCase
- [x] 7.5 Require TypeScript interfaces for props definitions
- [x] 7.6 Document use of `defineEmits` for events
- [x] 7.7 Specify scoped CSS for component styles
- [x] 7.8 Document Conventional Commits format
- [x] 7.9 List valid commit types: feat, fix, docs, style, refactor, test, chore, ui
- [x] 7.10 Provide commit message examples

## 8. Document Component Development Patterns

- [x] 8.1 Create example showing standard Vue component structure
- [x] 8.2 Demonstrate `<script setup>` syntax with TypeScript
- [x] 8.3 Show proper TypeScript type definitions for props
- [x] 8.4 Show proper TypeScript type definitions for emits
- [x] 8.5 Include example using Naive UI components (NButton, NCard, etc.)
- [x] 8.6 Include example using Vant components for mobile
- [x] 8.7 Demonstrate template structure with proper element hierarchy
- [x] 8.8 Show scoped styles example

## 9. Document State Management Patterns

- [x] 9.1 Explain Pinia store usage in SEAS
- [x] 9.2 Demonstrate how to define a Pinia store
- [x] 9.3 Show state persistence using pinia-plugin-persistedstate
- [x] 9.4 Provide examples of store composition
- [x] 9.5 Show how to use stores in Vue components
- [x] 9.6 Document best practices for store organization

## 10. Document Package Dependency Guidelines

- [x] 10.1 Explain that packages should depend on `@izhimu/seas-core` for core functionality
- [x] 10.2 Show how to reference workspace packages using `workspace:*` protocol
- [x] 10.3 Provide example from existing package.json (e.g., core/seas-core/package.json)
- [x] 10.4 Explain inter-package dependencies
- [x] 10.5 Show example from seas-base-view depending on seas-security-view
- [x] 10.6 Document best practices for managing dependencies

## 11. Document Routing and Navigation

- [x] 11.1 Explain Vue Router 4 usage
- [x] 11.2 Demonstrate route configuration patterns
- [x] 11.3 Show how to define routes
- [x] 11.4 Explain route integration with Naive UI menu components
- [x] 11.5 Explain route integration with Naive UI layout components
- [x] 11.6 Provide examples of common routing scenarios

## 12. Document Testing and Quality Assurance

- [x] 12.1 Document TypeScript type checking requirement
- [x] 12.2 Specify type checking commands (`pnpm run type-check` or `vue-tsc`)
- [x] 12.3 Explain that all code must pass type checking before commits
- [x] 12.4 Document ESLint usage and configuration
- [x] 12.5 Document Prettier usage and configuration
- [x] 12.6 Provide lint checking commands
- [x] 12.7 Explain that linting must pass before building
- [x] 12.8 Document build validation process

## 13. Document Build and Deployment

- [x] 13.1 Explain Vite build process
- [x] 13.2 Show how to build all packages (`pnpm run build`)
- [x] 13.3 Explain build output locations
- [x] 13.4 Explain build output formats
- [x] 13.5 Document publishing commands
- [x] 13.6 Document npm registry configuration
- [x] 13.7 Explain the npm registry used for SEAS packages
- [x] 13.8 Show example of publishing workflow

## 14. Document AI Assistant Integration

- [x] 14.1 Provide context about monorepo structure for AI agents
- [x] 14.2 Guide agents to use appropriate dependencies and imports
- [x] 14.3 Ensure guidance for generating SEAS-compliant code
- [x] 14.4 Document common issues and solutions for troubleshooting
- [x] 14.5 Include guidance on dependency resolution issues
- [x] 14.6 Include guidance on build issues
- [x] 14.7 Include guidance on runtime errors
- [x] 14.8 Provide debugging tips for AI agents

## 15. Review and Validate

- [x] 15.1 Verify all 12 requirements from specs are covered
- [x] 15.2 Check that YAML frontmatter is properly formatted
- [x] 15.3 Ensure all code examples follow SEAS conventions
- [x] 15.4 Validate that core vs package distinction is clear
- [x] 15.5 Verify technology versions are current
- [x] 15.6 Check that all commands are accurate
- [x] 15.7 Ensure desktop and mobile patterns are both covered
- [x] 15.8 Validate that workspace dependency patterns are clear
- [x] 15.9 Review for consistency with CONTRIBUTING.md
- [x] 15.10 Test by having an AI agent read and parse the file

## 16. Finalize and Commit

- [x] 16.1 Perform final review of complete SKILL.md file
- [x] 16.2 Ensure file is saved at `skills/seas-view/SKILL.md`
- [x] 16.3 Verify file follows Agent SKILLS specification
- [x] 16.4 Commit the file with appropriate Conventional Commit message
- [x] 16.5 Update CHANGELOG if needed
