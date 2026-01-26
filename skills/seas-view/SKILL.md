---
name: seas-view
description: SEAS Framework View skill for AI assistants. Vue 3 + TypeScript monorepo framework with modular architecture. Provides guidance on framework structure, development patterns, and best practices.
license: Apache-2.0
compatibility: SEAS Framework View 1.1.34+, Node.js >= 18, pnpm >= 9.7.1
metadata:
  author: izhimu
  version: "1.1.34"
  framework: "Vue 3.5+ | TypeScript 5.8+ | Vite 6+"
  lastUpdated: "2026-01-26"
  references: "references/"
---

# SEAS Framework View

SEAS Framework View is a monorepo-based Vue 3 frontend framework for enterprise applications with modular architecture, supporting both desktop (Naive UI) and mobile (Vant) development.

## Quick Start

**For AI assistants working with SEAS:**

1. **Start here** - Read this SKILL.md for framework overview and patterns
2. **Module details** - See `references/` directory for specific module documentation
3. **Follow patterns** - Vue 3 Composition API, TypeScript, workspace dependencies

## Architecture

### Monorepo Structure

```
core/              # Core libraries (reusable by external projects)
├── seas-core      # HTTP, auth, encryption, composables
├── seas-common    # Utilities: string, number, date, validation
└── seas-mobile-core # Mobile: device detection, gestures, mobile UI

packages/          # Feature-specific UI modules
├── seas-base-view     # Layouts, tables, forms
├── seas-security-view # Auth, users, roles, permissions
├── seas-ai-view       # Chat, prompts, AI workflows
├── seas-storage-view  # File upload/management
├── seas-job-view      # Job scheduling
├── seas-healthy-view  # Health monitoring
├── seas-generate-view # Code generation
├── seas-mqtt-view     # MQTT messaging
└── seas-form-view     # Dynamic forms
```

**Key**: Core libs = foundational functionality. Packages = feature-specific UI implementations.

## Module Documentation

Detailed module docs are in `references/`:

**Core Libraries:**
- [`@izhimu/seas-core`](references/core/seas-core.md) - HTTP, auth, encryption
- [`@izhimu/seas-common`](references/core/seas-common.md) - Utilities
- [`@izhimu/seas-mobile-core`](references/core/seas-mobile-core.md) - Mobile features

**Package Modules:**
- [`@izhimu/seas-base-view`](references/packages/seas-base-view.md) - Base UI
- [`@izhimu/seas-security-view`](references/packages/seas-security-view.md) - Security
- [`@izhimu/seas-ai-view`](references/packages/seas-ai-view.md) - AI integration
- [`@izhimu/seas-storage-view`](references/packages/seas-storage-view.md) - Storage
- [`@izhimu/seas-job-view`](references/packages/seas-job-view.md) - Jobs
- [`@izhimu/seas-healthy-view`](references/packages/seas-healthy-view.md) - Health
- [`@izhimu/seas-generate-view`](references/packages/seas-generate-view.md) - Code gen
- [`@izhimu/seas-mqtt-view`](references/packages/seas-mqtt-view.md) - MQTT
- [`@izhimu/seas-form-view`](references/packages/seas-form-view.md) - Forms

## Technology Stack

**Core**: Vue 3.5+, TypeScript 5.8+, Vite 6+, Node.js >= 18
**Desktop**: Naive UI 2.41+
**Mobile**: Vant 4.9+
**State**: Pinia 3.0+ with persistence plugin
**Routing**: Vue Router 4.5+
**Build**: ESLint 9.26+, Prettier 3.5+
**Package Manager**: pnpm 9.7.1+ with workspaces

## Development Commands

```bash
# Start all packages
pnpm run dev

# Start specific package
pnpm run dev:base | dev:security | dev:ai | dev:storage | etc.

# Build all
pnpm run build

# Build specific package
pnpm --filter @izhimu/seas-base-view run build

# Work on specific package
pnpm --filter @izhimu/seas-security-view run dev
```

## Code Standards

**Required**:
- TypeScript for all code
- Vue 3 Composition API with `<script setup>`
- 2-space indentation, 100-char line width
- PascalCase component names
- TypeScript interfaces for props
- Typed events with `defineEmits<T>()`
- Scoped CSS for components

**Example Component**:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  userId: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Default'
})

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()
</script>

<template>
  <div class="component">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.component {
  padding: 16px;
}
</style>
```

**Commit Messages**: Conventional Commits format

```
feat(security): add password strength component
fix(storage): resolve file upload timeout
docs(seas-ai-view): update AI examples
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ui`

## Component Patterns

### Desktop (Naive UI)

```vue
<script setup lang="ts">
import { NButton, NDataTable } from 'naive-ui'
import { ref } from 'vue'

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

### Mobile (Vant)

```vue
<script setup lang="ts">
import { VanList, VanCard } from 'vant'
import { ref } from 'vue'

const list = ref([])
const loading = ref(false)
</script>

<template>
  <van-list v-model:loading="loading" :finished="true">
    <van-card v-for="item in list" :key="item.id" />
  </van-list>
</template>
```

## State Management (Pinia)

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

  return { userInfo, token, isAuthenticated, setToken }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage
  }
})
```

**Usage**:

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
// userStore.userInfo, userStore.isAuthenticated, userStore.setToken()
</script>
```

## Dependencies

**Core libraries** (for packages):

```json
{
  "dependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-common": "workspace:*"
  }
}
```

**Inter-package**:

```json
{
  "devDependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-security-view": "workspace:*"
  }
}
```

**Importing**:

```typescript
// From core
import { http, useAuth } from '@izhimu/seas-core'
import { formatDate, isEmail } from '@izhimu/seas-common'

// From packages
import { LoginForm } from '@izhimu/seas-security-view'
import { ChatBox } from '@izhimu/seas-ai-view'
```

## Routing (Vue Router 4)

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

## Quality Checklist

Before committing:

1. ✅ Type checking: `pnpm run type-check`
2. ✅ Linting: `pnpm run lint`
3. ✅ Build: `pnpm run build`
4. ✅ Vue 3 Composition API used
5. ✅ Props have TypeScript interfaces
6. ✅ Events are typed
7. ✅ CSS is scoped
8. ✅ Conventional Commit message

## For AI Assistants

### When Working with SEAS

**1. Understand the structure**:
- Core libraries in `core/` for reusable functionality
- Package modules in `packages/` for UI features
- Use `workspace:*` protocol for monorepo dependencies

**2. Use appropriate imports**:
```typescript
import { http } from '@izhimu/seas-core'
import { formatDate } from '@izhimu/seas-common'
import { DataTable } from '@izhimu/seas-base-view'
import { LoginForm } from '@izhimu/seas-security-view'
```

**3. Follow patterns**:
- Vue 3 Composition API with `<script setup>`
- TypeScript for all types
- Naive UI for desktop, Vant for mobile
- Pinia for state management

**4. Read module docs when needed**:
- Authentication work? → [`@izhimu/seas-security-view`](references/packages/seas-security-view.md)
- Building forms? → [`@izhimu/seas-form-view`](references/packages/seas-form-view.md)
- AI features? → [`@izhimu/seas-ai-view`](references/packages/seas-ai-view.md)
- Mobile development? → [`@izhimu/seas-mobile-core`](references/core/seas-mobile-core.md)

### Troubleshooting

**Dependency issues**:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build issues**:
```bash
pnpm run type-check  # Fix type errors first
pnpm run build
```

**Runtime errors**:
- Check browser console
- Verify props match TypeScript interfaces
- Ensure Pinia stores initialized
- Check router configuration

## Best Practices

**Component Development**:
- Use `<script setup lang="ts">`
- Define props with TypeScript interfaces
- Type events with `defineEmits<T>()`
- Always scope styles

**State Management**:
- One store per domain
- Enable persistence for necessary state
- Use computed for derived state
- Keep actions simple

**Dependencies**:
- Use `workspace:*` for monorepo packages
- Prefer core libraries over external deps
- Run `pnpm install` after dependency changes
- Minimize coupling

**Code Quality**:
- Type check before commits
- Format with Prettier
- Fix ESLint issues
- Follow Conventional Commits

## Resources

- **Module docs**: See `references/` directory
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](../../CHANGELOG.md)** - Version history

---

This SKILL.md provides framework overview and patterns. For detailed module documentation, see the `references/` directory.
