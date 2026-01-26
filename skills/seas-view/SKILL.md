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
---

# SEAS Framework View

SEAS Framework View is a monorepo-based Vue 3 frontend framework designed for building enterprise applications. It provides a modular architecture with reusable core libraries and feature-specific package modules, supporting both desktop (Naive UI) and mobile (Vant) development patterns.

## Framework Overview

### Architecture

The framework follows a monorepo structure using pnpm workspaces with two main directories:

- **`core/`**: Reusable core libraries that can be depended upon by SEAS-based projects
  - `@izhimu/seas-core`: Core functionality library with essential framework features
  - `@izhimu/seas-common`: Common utilities and helper functions
  - `@izhimu/seas-mobile-core`: Mobile-specific core functionality

- **`packages/`**: Feature-specific modules containing UI pages and components
  - `@izhimu/seas-base-view`: Base UI components and layouts
  - `@izhimu/seas-security-view`: Security and authentication components
  - `@izhimu/seas-storage-view`: Storage management interfaces
  - `@izhimu/seas-job-view`: Job scheduling and task management
  - `@izhimu/seas-healthy-view`: Health monitoring and diagnostics
  - `@izhimu/seas-generate-view`: Code generation tools
  - `@izhimu/seas-mqtt-view`: MQTT messaging interfaces
  - `@izhimu/seas-ai-view`: AI integration components
  - `@izhimu/seas-form-view`: Form building and validation

**Key distinction**: Core libraries (`core/`) provide foundational functionality that can be used by external projects. Package modules (`packages/`) contain feature-specific UI implementations and can depend on both core libraries and each other.

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
- **sm-crypto 0.3+**: SM2/SM3/SM4 encryption algorithms (Chinese national standard)
- **qs 6.14+**: Query string parsing and utilities
- **@fingerprintjs/fingerprintjs 4.6+**: Browser fingerprinting
- **highlight.js 11.11+**: Syntax highlighting

### Build Tools & Quality

- **ESLint 9.26+**: Code linting and quality checks
- **Prettier 3.5+**: Code formatting
- **TypeScript configurations**: `@tsconfig/node22`, `@vue/tsconfig`
- **Vite plugins**: `@vitejs/plugin-vue`, `vite-plugin-vue-devtools`

### Package Manager

- **pnpm 9.7.1+**: Fast, disk space efficient package manager
- **Workspaces**: Monorepo support using `workspace:*` protocol

## Development Workflow

### Development Commands

Start development servers:

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
```

### Build Commands

```bash
# Build all packages
pnpm run build

# Individual packages are built via their own build scripts
# Packages use Vite for optimized production builds
```

### Package-Specific Development

When working on a specific package, use filtered commands:

```bash
# Example: Work only on security view
pnpm --filter @izhimu/seas-security-view run dev

# Example: Build only the base view
pnpm --filter @izhimu/seas-base-view run build
```

### Running Multiple Packages

To run multiple packages in parallel:

```bash
# Use the --parallel flag with multiple filters
pnpm --parallel --filter @izhimu/seas-base-view --filter @izhimu/seas-security-view run dev
```

### Common Development Workflow

1. **Install dependencies**: `pnpm install`
2. **Start development**: `pnpm run dev` or `pnpm run dev:<package>`
3. **Type checking**: `pnpm run type-check`
4. **Lint code**: `pnpm run lint`
5. **Build for production**: `pnpm run build`
6. **Test changes**: Verify in browser
7. **Commit changes**: Use Conventional Commits format

## Development Standards

### Code Style Requirements

- **Language**: TypeScript for all new code
- **Vue API**: Composition API with `<script setup>` syntax
- **Indentation**: 2 spaces (no tabs)
- **Line width**: 100 characters maximum
- **Component naming**: PascalCase (e.g., `UserProfile.vue`, `DataTable.vue`)

### Component Development Standards

```vue
<script setup lang="ts">
// Use TypeScript with script setup
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
  (e: 'delete', id: number): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <!-- Template structure with proper element hierarchy -->
  <div class="user-profile">
    <h1>{{ title }}</h1>
    <!-- Component content -->
  </div>
</template>

<style scoped>
/* Always use scoped CSS for component styles */
.user-profile {
  padding: 16px;
}
</style>
```

### Commit Message Standards

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Valid types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code refactoring
- `test`: Test-related changes
- `chore`: Build/tooling changes
- `ui`: UI/style updates

**Examples**:
```
feat(security): add password strength component

Add a new password strength indicator component with
real-time validation and visual feedback.

Closes #123
```

```
fix(storage): resolve file upload timeout issue

Increase timeout duration for large file uploads to prevent
connection errors.
```

## Component Development Patterns

### Standard Vue Component Structure

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NCard, NInput } from 'naive-ui'

// TypeScript interfaces for props
interface Props {
  modelValue: string
  disabled?: boolean
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  maxLength: 100
})

// TypeScript interfaces for emits
interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'submit', data: FormData): void
}

const emit = defineEmits<Emits>()

// Reactive state
const localValue = ref(props.modelValue)
const isLoading = ref(false)

// Computed properties
const charCount = computed(() => localValue.value.length)
const isValid = computed(() => charCount.value > 0)

// Methods
const handleSubmit = async () => {
  isLoading.value = true
  try {
    const formData = new FormData()
    formData.append('value', localValue.value)
    emit('submit', formData)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div class="component-container">
    <NCard title="Form Component">
      <NInput
        v-model:value="localValue"
        :disabled="disabled"
        :maxlength="maxLength"
        @update:value="emit('update:modelValue', $event)"
      />
      <p class="char-count">{{ charCount }} / {{ maxLength }}</p>
      <NButton
        type="primary"
        :loading="isLoading"
        :disabled="!isValid"
        @click="handleSubmit"
      >
        Submit
      </NButton>
    </NCard>
  </div>
</template>

<style scoped>
.component-container {
  max-width: 600px;
  margin: 0 auto;
}

.char-count {
  margin: 8px 0;
  color: #999;
  font-size: 12px;
}
</style>
```

### Desktop Components (Naive UI)

```vue
<script setup lang="ts">
import { NButton, NCard, NDataTable, NEmpty } from 'naive-ui'

interface RowData {
  id: number
  name: string
  status: string
}

const columns = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Status', key: 'status' }
]

const data = ref<RowData[]>([])
const loading = ref(false)
</script>

<template>
  <NCard title="Data Table">
    <NDataTable
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="{ pageSize: 10 }"
    />
    <NEmpty v-if="!loading && data.length === 0" description="No data available" />
  </NCard>
</template>
```

### Mobile Components (Vant)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VanButton, VanCard, VanEmpty, VanList } from 'vant'

interface Item {
  id: number
  title: string
  desc: string
}

const list = ref<Item[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // Load more data
  loading.value = false
}
</script>

<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    @load="onLoad"
  >
    <van-card
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :desc="item.desc"
    />
    <van-empty v-if="!loading && list.length === 0" description="暂无数据" />
  </van-list>
</template>
```

## State Management Patterns

### Pinia Store Definition

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface UserInfo {
  id: number
  name: string
  email: string
  role: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    // State
    const userInfo = ref<UserInfo | null>(null)
    const token = ref<string>('')

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => userInfo.value?.role === 'admin')

    // Actions
    const setUserInfo = (info: UserInfo) => {
      userInfo.value = info
    }

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
      isAdmin,
      setUserInfo,
      setToken,
      logout
    }
  },
  {
    // Enable persistence
    persist: {
      key: 'user-store',
      storage: localStorage,
      paths: ['userInfo', 'token']
    }
  }
)
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
userStore.setUserInfo({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
})

// Use in template with auto-completion
</script>

<template>
  <div v-if="userStore.isAuthenticated">
    <p>Welcome, {{ userStore.userInfo?.name }}</p>
    <button @click="userStore.logout">Logout</button>
  </div>
  <div v-else>
    <p>Please login</p>
  </div>
</template>
```

### Store Composition

```typescript
// stores/combined.ts
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useAppStore } from './app'

export const useCombinedStore = defineStore('combined', () => {
  const userStore = useUserStore()
  const appStore = useAppStore()

  const appContext = computed(() => ({
    user: userStore.userInfo,
    theme: appStore.theme,
    language: appStore.language
  }))

  const initialize = async () => {
    await userStore.fetchUserInfo()
    await appStore.loadSettings()
  }

  return {
    appContext,
    initialize
  }
})
```

### Store Organization Best Practices

1. **One store per domain**: Group related state (user, app, settings)
2. **Use composition pattern**: Combine stores for complex state
3. **Enable persistence selectively**: Only persist necessary state
4. **Type everything**: Use TypeScript interfaces for all state
5. **Keep actions simple**: Single responsibility per action

## Package Dependency Guidelines

### Core Library Dependencies

Packages should depend on core libraries for fundamental functionality:

```json
{
  "name": "@izhimu/seas-base-view",
  "dependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-common": "workspace:*"
  }
}
```

**Key points**:
- Use `workspace:*` protocol for monorepo dependencies
- `@izhimu/seas-core` provides core framework functionality
- `@izhimu/seas-common` provides shared utilities
- `@izhimu/seas-mobile-core` for mobile-specific packages

### Inter-Package Dependencies

Packages can depend on each other:

```json
{
  "name": "@izhimu/seas-base-view",
  "devDependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-security-view": "workspace:*",
    "@izhimu/seas-ai-view": "workspace:*"
  }
}
```

**Example from seas-base-view**:
- Depends on `@izhimu/seas-security-view` for authentication components
- Depends on `@izhimu/seas-ai-view` for AI integration features

### Best Practices for Dependencies

1. **Minimize coupling**: Only depend on what's necessary
2. **Use devDependencies**: For development-time package dependencies
3. **Version consistently**: Use `workspace:*` for all monorepo dependencies
4. **Document dependencies**: Comment why each dependency is needed
5. **Avoid circular dependencies**: Prevent dependency cycles between packages

### Importing from Dependencies

```typescript
// Import from core library
import { SomeUtility } from '@izhimu/seas-common'
import { useAuth } from '@izhimu/seas-core'

// Import from other packages
import { LoginForm } from '@izhimu/seas-security-view'
import { AIAssistant } from '@izhimu/seas-ai-view'
```

## Routing and Navigation

### Vue Router 4 Configuration

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    children: [
      {
        path: 'profile',
        name: 'ProfileSettings',
        component: () => import('@/views/settings/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check authentication
    const isAuthenticated = /* check auth */
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
```

### Integration with Naive UI Menu

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NMenu, NLayout, NLayoutSider } from 'naive-ui'

const router = useRouter()
const route = useRoute()

const menuOptions = computed(() => [
  {
    label: 'Home',
    key: 'Home',
    icon: () => h(HomeIcon),
    onClick: () => router.push({ name: 'Home' })
  },
  {
    label: 'Users',
    key: 'Users',
    icon: () => h(UserIcon),
    onClick: () => router.push({ name: 'Users' })
  },
  {
    label: 'Settings',
    key: 'Settings',
    icon: () => h(SettingsIcon),
    children: [
      {
        label: 'Profile',
        key: 'ProfileSettings',
        onClick: () => router.push({ name: 'ProfileSettings' })
      }
    ]
  }
])

const activeKey = computed(() => route.name as string)
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
    >
      <NMenu
        :collapsed="false"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
      />
    </n-layout-sider>
    <n-layout>
      <router-view />
    </n-layout>
  </n-layout>
</template>
```

### Integration with Naive UI Layout

```vue
<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter } from 'naive-ui'
</script>

<template>
  <n-layout>
    <n-layout-header bordered style="height: 64px; padding: 24px;">
      SEAS Framework
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <router-view />
    </n-layout-content>
    <n-layout-footer bordered style="padding: 24px;">
      © 2026 SEAS Framework
    </n-layout-footer>
  </n-layout>
</template>
```

### Common Routing Scenarios

**Programmatic navigation**:
```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to route
router.push({ name: 'Users' })
router.push({ path: '/users/123' })

// Navigate with query params
router.push({ path: '/search', query: { q: 'keyword' } })

// Navigate back
router.back()
router.go(-1)
```

**Route parameters**:
```typescript
// Define route with parameters
{
  path: '/users/:id',
  name: 'UserDetail',
  component: () => import('@/views/UserDetail.vue')
}

// Access parameters
const route = useRoute()
const userId = computed(() => route.params.id as string)
```

## Testing and Quality Assurance

### Type Checking

All code must pass TypeScript type checking before commits:

```bash
# Run type checking
pnpm run type-check

# Or use vue-tsc directly
vue-tsc --noEmit
```

**Requirements**:
- All new code must have proper TypeScript types
- Use `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` when type is truly unknown
- Enable strict mode in `tsconfig.json`

### ESLint Configuration

```bash
# Run ESLint
pnpm run lint

# Fix issues automatically
pnpm run lint --fix
```

**ESLint rules**:
- Vue 3 best practices
- TypeScript conventions
- Import organization
- Code formatting (2 spaces, no trailing whitespace)

### Prettier Configuration

```bash
# Format code with Prettier
pnpm run format
```

**Prettier rules**:
- 2 space indentation
- Single quotes for strings
- Semicolons required
- 100 character line width
- Trailing commas in objects/arrays

### Quality Checklist

Before committing code, ensure:

1. ✅ TypeScript type checking passes: `pnpm run type-check`
2. ✅ ESLint checking passes: `pnpm run lint`
3. ✅ Code is formatted: `pnpm run format`
4. ✅ Build succeeds: `pnpm run build`
5. ✅ Components follow Vue 3 Composition API
6. ✅ Props have TypeScript interfaces
7. ✅ Events use `defineEmits` with types
8. ✅ Styles are scoped
9. ✅ Commit message follows Conventional Commits

## Build and Deployment

### Build Process

SEAS Framework uses Vite for optimized production builds:

```bash
# Build all packages
pnpm run build

# Build specific package
pnpm --filter @izhimu/seas-base-view run build
```

### Build Output

**Location**: Each package has its own `dist/` directory

**Output formats**:
- ES modules: `dist/index.js`
- TypeScript declarations: `dist/index.d.ts`
- Source maps: `dist/index.js.map`

**Example structure**:
```
packages/seas-base-view/
├── dist/
│   ├── index.js          # ES module output
│   ├── index.d.ts        # TypeScript declarations
│   └── assets/           # Static assets
```

### Publishing Packages

```bash
# Publish to internal registry
pnpm run publish

# Publish to open registry
pnpm run publish:open
```

**Registry configuration**:
- **Internal**: `https://izhimu-npm.pkg.coding.net/seas/npm-releases/`
- **Open**: `https://izhimu-npm.pkg.coding.net/seas/npm-releases-open/`

**Publishing workflow**:
1. Update version in `package.json`
2. Build all packages: `pnpm run build`
3. Run tests and quality checks
4. Publish: `pnpm run publish`
5. Tag release in git

### Version Management

SEAS Framework uses semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking API changes
- **MINOR**: Backward-compatible new features
- **PATCH**: Bug fixes

All packages share the same version (managed in root `package.json`).

## AI Assistant Integration

### Context for Code Generation

When generating code for SEAS Framework, AI assistants should:

1. **Understand monorepo structure**:
   - Core libraries in `core/` for reusable functionality
   - Package modules in `packages/` for feature-specific UI
   - Use `workspace:*` protocol for inter-package dependencies

2. **Use appropriate imports**:
   ```typescript
   // Import from core
   import { Utility } from '@izhimu/seas-common'

   // Import from packages
   import { Component } from '@izhimu/seas-security-view'
   ```

3. **Follow framework conventions**:
   - Vue 3 Composition API with `<script setup>`
   - TypeScript interfaces for all types
   - Naive UI for desktop, Vant for mobile
   - Pinia for state management
   - Scoped CSS for component styles

4. **Match existing patterns**:
   - Use similar component structure to existing code
   - Follow naming conventions (PascalCase components)
   - Maintain consistent file organization

### Troubleshooting Common Issues

#### Dependency Resolution Issues

**Problem**: Module not found errors for workspace dependencies

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Verify workspace links
pnpm list --depth=0
```

**Prevention**:
- Always use `workspace:*` for monorepo dependencies
- Run `pnpm install` after adding new dependencies
- Check `package.json` paths are correct

#### Build Issues

**Problem**: Build fails with type errors

**Solution**:
```bash
# Run type check first
pnpm run type-check

# Fix type errors
# - Add missing type definitions
# - Fix incorrect prop types
# - Resolve import paths

# Rebuild
pnpm run build
```

**Common causes**:
- Missing `lang="ts"` on `<script>` tags
- Incorrect import paths
- Missing type definitions for third-party libraries

#### Runtime Errors

**Problem**: Component fails to render or throws runtime errors

**Solutions**:

1. **Check console for errors**: Browser devTools will show specific errors
2. **Verify props are passed correctly**: Ensure props match interface
3. **Check router configuration**: Ensure routes are properly defined
4. **Verify store initialization**: Ensure Pinia stores are created before use

**Example debugging**:
```vue
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
  console.log('Props:', props)
  console.log('Store data:', store.data)
})
</script>
```

#### Import Path Issues

**Problem**: Imports fail or resolve to wrong modules

**Solution**:
```typescript
// Use absolute imports with @ alias
import { Component } from '@/components/Component'

// Or use relative imports
import { Component } from '../components/Component'

// Check tsconfig.json paths configuration
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Debugging Tips for AI Agents

1. **Always check error messages**: They contain specific line numbers and issues
2. **Verify dependencies**: Ensure all required packages are installed
3. **Check TypeScript types**: Many issues are caught at compile time
4. **Use browser devTools**: Vue DevTools provides component inspection
5. **Test incrementally**: Build small pieces and test before combining
6. **Read existing code**: Use similar components as templates
7. **Validate YAML frontmatter**: Ensure skill files have valid YAML

## Best Practices Summary

### Component Development
- Use `<script setup lang="ts">` for all components
- Define props with TypeScript interfaces
- Type events with `defineEmits<T>()`
- Always scope component styles
- Use composition API over options API

### State Management
- Create one store per domain
- Enable persistence for necessary state
- Use computed properties for derived state
- Compose stores for complex scenarios
- Keep actions simple and focused

### Dependencies
- Use `workspace:*` for monorepo packages
- Prefer core libraries over external dependencies
- Document why each dependency is needed
- Keep dependencies minimal
- Run `pnpm install` after dependency changes

### Code Quality
- Run type checking before commits
- Format code with Prettier
- Fix ESLint issues
- Follow Conventional Commits
- Test in both desktop and mobile contexts

### Performance
- Use `v-show` vs `v-if` appropriately
- Lazy load routes with dynamic imports
- Computed properties for expensive calculations
- Avoid unnecessary reactivity
- Use `v-memo` for expensive lists

## Additional Resources

- **Framework Documentation**: See individual package README files
- **Component Examples**: Check `packages/*/src/examples/` directories
- **Contributing Guidelines**: See `CONTRIBUTING.md` in root
- **Issue Tracker**: Report bugs and feature requests on GitHub

---

This skill documentation provides AI assistants with comprehensive context for working with SEAS Framework View. Follow these patterns and conventions to ensure code quality and consistency across the framework.
