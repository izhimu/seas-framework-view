---
name: seas-view
description: Comprehensive skill documentation for SEAS Framework View - a Vue 3 + TypeScript monorepo framework with modular architecture. Guides AI assistants in understanding framework structure, development patterns, and best practices.
license: Apache-2.0
compatibility: SEAS Framework View 1.1.34+, requires Node.js >= 18, pnpm >= 9.7.1
metadata:
  author: izhimu
  version: "1.1.34"
  framework: "Vue 3.5+ | TypeScript 5.8+ | Vite 6+"
  lastUpdated: "2026-01-26"
  documentationIndex: "README.md"
---

# SEAS Framework View

SEAS Framework View is a monorepo-based Vue 3 frontend framework designed for building enterprise applications. It provides a modular architecture with reusable core libraries and feature-specific package modules, supporting both desktop (Naive UI) and mobile (Vant) development patterns.

## 📚 Documentation Index

**For detailed module documentation, see the [Documentation Index](README.md)**

Quick links:
- **[Core Libraries](#core-libraries)** - Foundational functionality
- **[Package Modules](#package-modules)** - Feature-specific UI components
- **[Technology Stack](#technology-stack)** - Framework and tools
- **[Development Workflow](#development-workflow)** - Commands and processes
- **[Component Patterns](#component-development-patterns)** - Vue 3 examples
- **[State Management](#state-management-patterns)** - Pinia usage
- **[Best Practices](#best-practices)** - Coding standards

## Framework Overview

### Architecture

The framework follows a monorepo structure using pnpm workspaces:

**Core Libraries** (`core/`):
- [`@izhimu/seas-core`](core/seas-core.md) - Core functionality with HTTP, auth, encryption
- [`@izhimu/seas-common`](core/seas-common.md) - Common utilities and helpers
- [`@izhimu/seas-mobile-core`](core/seas-mobile-core.md) - Mobile-specific features

**Package Modules** (`packages/`):
- [`@izhimu/seas-base-view`](packages/seas-base-view.md) - Base UI components and layouts
- [`@izhimu/seas-security-view`](packages/seas-security-view.md) - Authentication and access control
- [`@izhimu/seas-ai-view`](packages/seas-ai-view.md) - AI integration and chat interfaces
- [`@izhimu/seas-storage-view`](packages/seas-storage-view.md) - File storage and management
- [`@izhimu/seas-job-view`](packages/seas-job-view.md) - Job scheduling and tasks
- [`@izhimu/seas-healthy-view`](packages/seas-healthy-view.md) - Health monitoring
- [`@izhimu/seas-generate-view`](packages/seas-generate-view.md) - Code generation tools
- [`@izhimu/seas-mqtt-view`](packages/seas-mqtt-view.md) - MQTT messaging
- [`@izhimu/seas-form-view`](packages/seas-form-view.md) - Form building and validation

**Key distinction**: Core libraries provide foundational functionality for external projects. Package modules contain feature-specific UI implementations.

## Technology Stack

### Core Technologies

- **Vue 3.5+**: Progressive JavaScript framework using Composition API
- **TypeScript 5.8+**: Typed JavaScript for enhanced developer experience
- **Vite 6+**: Next-generation build tool for rapid development
- **Node.js >= 18**: Runtime environment requirement

### UI Libraries

- **Desktop**: Naive UI 2.41+ - comprehensive Vue 3 component library
- **Mobile**: Vant 4.9+ - mobile UI components built for Vue 3

### State Management & Routing

- **Pinia 3.0+**: Official Vue state management library
- **pinia-plugin-persistedstate 4.2+**: State persistence plugin
- **Vue Router 4.5+**: Official routing solution for Vue.js

### Additional Dependencies

- **ECharts 5.6+**: Data visualization library
- **axios 1.9+**: HTTP client for API requests
- **mitt 3.0+**: Event emitter for component communication
- **sm-crypto 0.3+**: SM2/SM3/SM4 encryption algorithms
- **qs 6.14+**: Query string parsing and utilities
- **@fingerprintjs/fingerprintjs 4.6+**: Browser fingerprinting
- **highlight.js 11.11+**: Syntax highlighting

### Build Tools & Quality

- **ESLint 9.26+**: Code linting and quality checks
- **Prettier 3.5+**: Code formatting
- **TypeScript**: `@tsconfig/node22`, `@vue/tsconfig`
- **Vite**: `@vitejs/plugin-vue`, `vite-plugin-vue-devtools`

### Package Manager

- **pnpm 9.7.1+**: Fast, disk space efficient package manager
- **Workspaces**: Monorepo support using `workspace:*` protocol

## Development Workflow

### Development Commands

```bash
# Start all packages in parallel
pnpm run dev

# Start specific package
pnpm run dev:base          # Base view components
pnpm run dev:generate      # Code generation tools
pnpm run dev:healthy       # Health monitoring
pnpm run dev:job           # Job scheduling
pnpm run dev:security      # Security components
pnpm run dev:storage       # Storage management
pnpm run dev:mqtt          # MQTT messaging
pnpm run dev:ai            # AI integration
pnpm run dev:mobile-security  # Mobile security view

# Build all packages
pnpm run build

# Build specific package
pnpm --filter @izhimu/seas-base-view run build
```

### Package-Specific Development

```bash
# Work on specific package using filter
pnpm --filter @izhimu/seas-security-view run dev

# Run multiple packages in parallel
pnpm --parallel --filter @izhimu/seas-base-view --filter @izhimu/seas-security-view run dev
```

## Development Standards

### Code Style Requirements

- **Language**: TypeScript for all new code
- **Vue API**: Composition API with `<script setup>` syntax
- **Indentation**: 2 spaces (no tabs)
- **Line width**: 100 characters maximum
- **Component naming**: PascalCase (e.g., `UserProfile.vue`)

### Component Development Standards

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Props must use TypeScript interfaces
interface Props {
  userId: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title'
})

// Events must be explicitly typed
interface Emits {
  (e: 'update', value: string): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <div class="component">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
/* Always use scoped CSS */
.component {
  padding: 16px;
}
</style>
```

### Commit Message Standards

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]
```

**Valid types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ui`

**Examples**:
```
feat(security): add password strength component
fix(storage): resolve file upload timeout issue
docs(seas-ai-view): update AI integration examples
```

## Component Development Patterns

### Standard Vue Component Structure

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NCard } from 'naive-ui'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = ref(props.modelValue)
const isValid = computed(() => localValue.value.length > 0)

onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div class="component-container">
    <NCard title="Component">
      <!-- Content -->
    </NCard>
  </div>
</template>

<style scoped>
.component-container {
  max-width: 600px;
}
</style>
```

### Desktop Components (Naive UI)

```vue
<script setup lang="ts">
import { NButton, NDataTable } from 'naive-ui'

const columns = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' }
]

const data = ref([])
</script>

<template>
  <NDataTable :columns="columns" :data="data" />
</template>
```

### Mobile Components (Vant)

```vue
<script setup lang="ts">
import { VanButton, VanList } from 'vant'

const list = ref([])
const loading = ref(false)
</script>

<template>
  <van-list v-model:loading="loading" :finished="true">
    <van-card v-for="item in list" :key="item.id" />
  </van-list>
</template>
```

## State Management Patterns

### Pinia Store Definition

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string>('')

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const logout = () => {
    userInfo.value = null
    token.value = ''
  }

  return {
    userInfo,
    token,
    isAuthenticated,
    setToken,
    logout
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage
  }
})
```

### Using Stores in Components

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// Access state
console.log(userStore.userInfo)
console.log(userStore.isAuthenticated)

// Call actions
userStore.setToken('new-token')
</script>

<template>
  <div v-if="userStore.isAuthenticated">
    Welcome, {{ userStore.userInfo?.name }}
  </div>
</template>
```

## Package Dependency Guidelines

### Core Library Dependencies

```json
{
  "dependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-common": "workspace:*"
  }
}
```

### Inter-Package Dependencies

```json
{
  "devDependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-security-view": "workspace:*",
    "@izhimu/seas-ai-view": "workspace:*"
  }
}
```

**Example**: `seas-base-view` depends on `seas-security-view` for authentication and `seas-ai-view` for AI features.

### Importing from Dependencies

```typescript
// Import from core
import { http, useAuth } from '@izhimu/seas-core'
import { formatDate, isEmail } from '@izhimu/seas-common'

// Import from packages
import { LoginForm } from '@izhimu/seas-security-view'
import { ChatBox } from '@izhimu/seas-ai-view'
```

## Routing and Navigation

### Vue Router 4 Configuration

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
```

### Integration with Naive UI

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NMenu } from 'naive-ui'

const router = useRouter()

const menuOptions = computed(() => [
  {
    label: 'Home',
    key: 'Home',
    onClick: () => router.push({ name: 'Home' })
  }
])
</script>

<template>
  <NMenu :options="menuOptions" />
</template>
```

## Testing and Quality Assurance

### Quality Checklist

Before committing code:

1. ✅ Type checking: `pnpm run type-check`
2. ✅ Linting: `pnpm run lint`
3. ✅ Build: `pnpm run build`
4. ✅ Components follow Vue 3 Composition API
5. ✅ Props have TypeScript interfaces
6. ✅ Events use `defineEmits` with types
7. ✅ Styles are scoped
8. ✅ Commit follows Conventional Commits

## Build and Deployment

### Build Process

```bash
# Build all packages
pnpm run build

# Build specific package
pnpm --filter @izhimu/seas-base-view run build
```

### Publishing

```bash
# Publish to internal registry
pnpm run publish

# Publish to open registry
pnpm run publish:open
```

**Registry**: `https://izhimu-npm.pkg.coding.net/seas/npm-releases/`

## AI Assistant Integration

### Quick Reference for AI Agents

**When working with SEAS Framework:**

1. **Understand the structure**:
   - Core libraries in `core/` for reusable functionality
   - Package modules in `packages/` for UI features
   - Use `workspace:*` for monorepo dependencies

2. **Use appropriate imports**:
   ```typescript
   import { http } from '@izhimu/seas-core'
   import { formatDate } from '@izhimu/seas-common'
   import { DataTable } from '@izhimu/seas-base-view'
   import { LoginForm } from '@izhimu/seas-security-view'
   ```

3. **Follow patterns**:
   - Vue 3 Composition API with `<script setup>`
   - TypeScript for all types
   - Naive UI for desktop, Vant for mobile
   - Pinia for state management

4. **Read module docs**:
   - Working on authentication? → See [`@izhimu/seas-security-view`](packages/seas-security-view.md)
   - Building forms? → See [`@izhimu/seas-form-view`](packages/seas-form-view.md)
   - Adding AI features? → See [`@izhimu/seas-ai-view`](packages/seas-ai-view.md)

### Troubleshooting

**Dependency Issues**:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build Issues**:
```bash
pnpm run type-check
# Fix type errors
pnpm run build
```

**Runtime Errors**:
- Check browser console for specific errors
- Verify props match TypeScript interfaces
- Ensure Pinia stores are initialized
- Check router configuration

## Best Practices Summary

### Component Development
- Use `<script setup lang="ts">`
- Define props with TypeScript interfaces
- Type events with `defineEmits<T>()`
- Always scope component styles

### State Management
- One store per domain
- Enable persistence for necessary state
- Use computed for derived state
- Keep actions simple

### Dependencies
- Use `workspace:*` for monorepo packages
- Prefer core libraries over external
- Run `pnpm install` after dependency changes
- Minimize coupling

### Code Quality
- Type check before commits
- Format with Prettier
- Fix ESLint issues
- Follow Conventional Commits

## Additional Resources

- **[Documentation Index](README.md)** - Complete module documentation
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](../../CHANGELOG.md)** - Version history

## Module Quick Links

### Core Libraries
- **[@izhimu/seas-core](core/seas-core.md)** - HTTP, auth, encryption, composables
- **[@izhimu/seas-common](core/seas-common.md)** - String, number, date utilities
- **[@izhimu/seas-mobile-core](core/seas-mobile-core.md)** - Device detection, touch, mobile

### Package Modules
- **[@izhimu/seas-base-view](packages/seas-base-view.md)** - Layouts, tables, forms
- **[@izhimu/seas-security-view](packages/seas-security-view.md)** - Auth, users, roles, permissions
- **[@izhimu/seas-ai-view](packages/seas-ai-view.md)** - Chat, prompts, AI workflows
- **[@izhimu/seas-storage-view](packages/seas-storage-view.md)** - File upload/management
- **[@izhimu/seas-job-view](packages/seas-job-view.md)** - Job scheduling
- **[@izhimu/seas-healthy-view](packages/seas-healthy-view.md)** - Health monitoring
- **[@izhimu/seas-generate-view](packages/seas-generate-view.md)** - Code generation
- **[@izhimu/seas-mqtt-view](packages/seas-mqtt-view.md)** - MQTT messaging
- **[@izhimu/seas-form-view](packages/seas-form-view.md)** - Dynamic forms

---

This SKILL.md provides an overview of SEAS Framework View. For detailed module documentation, refer to the individual module files listed above or see the [Documentation Index](README.md).
