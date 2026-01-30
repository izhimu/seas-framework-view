## ADDED Requirements

### Requirement: AI assistant documentation file exists
The system SHALL provide a comprehensive skill documentation file at `skills/seas-view/SKILL.md` that follows the Agent SKILLS specification format with proper frontmatter metadata.

#### Scenario: Verify skill file structure
- **WHEN** an AI agent reads the `skills/seas-view/SKILL.md` file
- **THEN** the file SHALL contain valid YAML frontmatter with `name`, `description`, `license`, `compatibility`, and `metadata` fields
- **AND** the file SHALL be located in the `skills/seas-view/` directory

### Requirement: Framework architecture documentation
The skill documentation SHALL describe the SEAS framework monorepo architecture, clearly distinguishing between core libraries and package modules.

#### Scenario: Document core libraries
- **WHEN** an AI agent needs to understand core library dependencies
- **THEN** the documentation SHALL describe `core/seas-core`, `core/seas-common`, and `core/seas-mobile-core` as reusable libraries
- **AND** SHALL explain that these can be depended upon by projects using the SEAS framework
- **AND** SHALL provide the package names (`@izhimu/seas-core`, `@izhimu/seas-common`, `@izhimu/seas-mobile-core`)

#### Scenario: Document package modules
- **WHEN** an AI agent needs to understand package modules
- **THEN** the documentation SHALL describe packages like `seas-base-view`, `seas-security-view`, `seas-storage-view`, etc.
- **AND** SHALL explain that each package contains UI pages and components for specific features
- **AND** SHALL indicate these packages can also be used as dependencies in SEAS-based projects

### Requirement: Technology stack documentation
The skill SHALL document all technologies and frameworks used in SEAS, including versions where critical.

#### Scenario: List core technologies
- **WHEN** an AI agent queries the technology stack
- **THEN** the documentation SHALL list: Vue 3.5+, TypeScript, Vite 6+, Naive UI, Pinia, Vue Router 4, ECharts
- **AND** SHALL include mobile technologies: Vant for mobile components
- **AND** SHALL specify package manager: pnpm >= 9.7.1

#### Scenario: Document build and tooling
- **WHEN** an AI agent needs to understand build configuration
- **THEN** the documentation SHALL describe the build process using Vite
- **AND** SHALL mention ESLint, Prettier, and TypeScript configurations
- **AND** SHALL explain the monorepo structure using pnpm workspaces

### Requirement: Development workflow documentation
The skill SHALL provide clear documentation of development workflows, commands, and processes.

#### Scenario: Document development commands
- **WHEN** an AI agent needs to start development
- **THEN** the documentation SHALL list all available dev commands (`pnpm run dev`, `pnpm run dev:base`, etc.)
- **AND** SHALL explain what each command does
- **AND** SHALL include build commands (`pnpm run build`)

#### Scenario: Document package development
- **WHEN** an AI agent works on a specific package
- **THEN** the documentation SHALL explain how to develop individual packages using filtered commands
- **AND** SHALL provide examples of package-specific development workflows

### Requirement: Development standards and best practices
The skill SHALL document coding standards, conventions, and best practices for SEAS framework development.

#### Scenario: Code style conventions
- **WHEN** an AI agent generates or modifies code
- **THEN** the documentation SHALL specify: TypeScript usage, Vue 3 Composition API with `<script setup>`, 2-space indentation
- **AND** SHALL require PascalCase for component names
- **AND** SHALL mandate TypeScript interfaces for props definitions

#### Scenario: Commit message conventions
- **WHEN** an AI agent creates commits
- **THEN** the documentation SHALL specify Conventional Commits format
- **AND** SHALL list valid commit types: feat, fix, docs, style, refactor, test, chore, ui
- **AND** SHALL provide commit message examples

### Requirement: Component development patterns
The skill SHALL document common patterns and examples for component development in SEAS.

#### Scenario: Vue component structure
- **WHEN** an AI agent creates a new Vue component
- **THEN** the documentation SHALL show the standard component structure using `<script setup>`, template, and scoped styles
- **AND** SHALL demonstrate proper TypeScript type definitions for props and emits
- **AND** SHALL include examples of using Naive UI components

#### Scenario: State management patterns
- **WHEN** an AI agent implements state management
- **THEN** the documentation SHALL explain Pinia store usage
- **AND** SHALL demonstrate state persistence using pinia-plugin-persistedstate
- **AND** SHALL provide examples of store composition and usage in components

### Requirement: Package dependency guidelines
The skill SHALL document how packages should depend on each other and on core libraries.

#### Scenario: Core library usage
- **WHEN** an AI agent adds dependencies to a package
- **THEN** the documentation SHALL explain that packages should depend on `@izhimu/seas-core` for core functionality
- **AND** SHALL show how to reference workspace packages using `workspace:*` protocol
- **AND** SHALL provide examples from existing package.json files

#### Scenario: Inter-package dependencies
- **WHEN** an AI agent needs to use components from another package
- **THEN** the documentation SHALL explain how packages can depend on each other
- **AND** SHALL show examples from existing packages (e.g., seas-base-view depending on seas-security-view)

### Requirement: Routing and navigation patterns
The skill SHALL document how routing is structured in SEAS applications.

#### Scenario: Vue Router configuration
- **WHEN** an AI agent sets up routing
- **THEN** the documentation SHALL explain Vue Router 4 usage
- **AND** SHALL demonstrate route configuration patterns
- **AND** SHALL show how to integrate with Naive UI's menu and layout components

### Requirement: Testing and quality assurance
The skill SHALL document testing requirements and quality assurance processes.

#### Scenario: Type checking
- **WHEN** an AI agent verifies code quality
- **THEN** the documentation SHALL require running TypeScript type checking
- **AND** SHALL specify the command: `pnpm run type-check` or `vue-tsc`
- **AND** SHALL explain that all code must pass type checking before commits

#### Scenario: Code linting
- **WHEN** an AI agent checks code style
- **THEN** the documentation SHALL specify ESLint and Prettier usage
- **AND** SHALL provide commands for running lint checks
- **AND** SHALL explain that linting must pass before building

### Requirement: Build and deployment documentation
The skill SHALL document how to build and deploy SEAS framework packages.

#### Scenario: Build process
- **WHEN** an AI agent needs to build the project
- **THEN** the documentation SHALL explain the build process using Vite
- **AND** SHALL show how to build all packages (`pnpm run build`)
- **AND** SHALL explain build output locations and formats

#### Scenario: Publishing packages
- **WHEN** an AI agent needs to publish packages
- **THEN** the documentation SHALL document the publishing commands and registry configuration
- **AND** SHALL explain the npm registry used for SEAS packages

### Requirement: Integration with AI assistants
The skill SHALL provide specific guidance for AI assistants working with SEAS framework.

#### Scenario: AI agent code generation context
- **WHEN** an AI agent generates code for SEAS
- **THEN** the documentation SHALL provide context about the monorepo structure
- **AND** SHALL guide the agent to use appropriate dependencies and imports
- **AND** SHALL ensure generated code follows SEAS conventions

#### Scenario: AI agent troubleshooting
- **WHEN** an AI agent helps debug SEAS applications
- **THEN** the documentation SHALL provide common issues and solutions
- **AND** SHALL include guidance on dependency resolution, build issues, and runtime errors
