# @izhimu/seas-core

Core functionality library providing essential framework features and utilities for SEAS-based applications.

## Overview

`@izhimu/seas-core` is the foundational library that provides core functionality shared across all SEAS framework packages. It includes essential utilities, composables, and base components that can be used by any SEAS-based project.

## Installation

```bash
# For SEAS framework packages (using workspace protocol)
pnpm add @izhimu/seas-core

# For external projects
pnpm add @izhimu/seas-core --registry=https://izhimu-npm.pkg.coding.net/seas/npm-releases/
```

## Key Features

### 1. HTTP Client & API Communication

Provides a configured axios instance with interceptors for API requests.

```typescript
import { http } from '@izhimu/seas-core'

// GET request
const response = await http.get('/api/users')

// POST request
const data = await http.post('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// With interceptors for auth headers
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 2. Authentication & Authorization

Core authentication utilities for managing user sessions and permissions.

```typescript
import { useAuth } from '@izhimu/seas-core'

const {
  isAuthenticated,
  user,
  token,
  login,
  logout,
  checkPermission
} = useAuth()

// Login
await login({
  username: 'user@example.com',
  password: 'password'
})

// Check permissions
if (checkPermission('user:write')) {
  // User has write permission
}

// Logout
logout()
```

### 3. Event Bus

Event emitter for component communication using mitt.

```typescript
import { eventBus } from '@izhimu/seas-core'

// Emit events
eventBus.emit('user:login', { userId: 123 })

// Listen to events
eventBus.on('user:login', (data) => {
  console.log('User logged in:', data.userId)
})

// Clean up
eventBus.off('user:login')
```

### 4. Encryption & Security

Security utilities including SM2/SM3/SM4 encryption (Chinese national standard).

```typescript
import { sm2, sm3, sm4 } from '@izhimu/seas-core'

// SM2 asymmetric encryption
const encrypted = sm2.doEncrypt('plaintext', publicKey)
const decrypted = sm2.doDecrypt(encrypted, privateKey)

// SM3 hash
const hash = sm3('data')

// SM4 symmetric encryption
const encrypted = sm4.encrypt('plaintext', key)
const decrypted = sm4.decrypt(encrypted, key)
```

### 5. Utility Functions

Common utility functions for everyday development tasks.

```typescript
import {
  formatDate,
  debounce,
  throttle,
  deepClone,
  isEmail,
  isPhone
} from '@izhimu/seas-core'

// Date formatting
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// Debounce function calls
const debouncedSearch = debounce(searchAPI, 300)

// Deep clone objects
const cloned = deepClone(originalObject)

// Validation
isEmail('user@example.com')  // true
isPhone('13800138000')       // true
```

### 6. Composables

Vue 3 composables for common functionality.

```typescript
import {
  useRequest,
  useLocalStorage,
  useSessionStorage,
  useWindowSize
} from '@izhimu/seas-core'

// HTTP request with loading state
const { data, loading, error, execute } = useRequest(() =>
  http.get('/api/users')
)

// Local storage reactive state
const token = useLocalStorage('token', '')

// Session storage reactive state
const sessionData = useSessionStorage('session', {})

// Window size reactive state
const { width, height } = useWindowSize()
```

## Base Components

### NButton Enhancement

Enhanced button component with loading states and permissions.

```vue
<script setup lang="ts">
import { NButton } from '@izhimu/seas-core'
</script>

<template>
  <NButton
    type="primary"
    :loading="isLoading"
    :permission="'user:write'"
    @click="handleSubmit"
  >
    Submit
  </NButton>
</template>
```

## API Reference

### HTTP Client

| Method | Description |
|--------|-------------|
| `http.get(url, config)` | GET request |
| `http.post(url, data, config)` | POST request |
| `http.put(url, data, config)` | PUT request |
| `http.delete(url, config)` | DELETE request |
| `http.setBaseUrl(url)` | Set base URL |
| `http.setToken(token)` | Set auth token |

### Auth Composable

| Property/Method | Description |
|-----------------|-------------|
| `isAuthenticated` | Computed boolean |
| `user` | Current user object |
| `token` | Auth token string |
| `login(credentials)` | Login method |
| `logout()` | Logout method |
| `checkPermission(permission)` | Check user permission |

## Dependencies

`@izhimu/seas-core` depends on:
- `@izhimu/seas-common` - Common utilities
- `vue` - Vue 3 framework
- `axios` - HTTP client
- `pinia` - State management
- `mitt` - Event emitter
- `sm-crypto` - Encryption algorithms
- `naive-ui` - UI components

## Usage in SEAS Packages

Most SEAS packages depend on `@izhimu/seas-core` for core functionality:

```json
{
  "dependencies": {
    "@izhimu/seas-core": "workspace:*"
  }
}
```

```typescript
// Import in your components
import { http, useAuth, eventBus } from '@izhimu/seas-core'
```

## Best Practices

1. **Always use the HTTP client** instead of axios directly - it includes interceptors and error handling
2. **Use composables** for reactive state management instead of direct API calls
3. **Clean up event listeners** when components unmount
4. **Handle encryption errors** - SM algorithms may throw on invalid input
5. **Use permission checks** before showing sensitive UI elements

## See Also

- [`@izhimu/seas-common`](./seas-common.md) - Common utilities library
- [`@izhimu/seas-mobile-core`](./seas-mobile-core.md) - Mobile-specific core library
