# @izhimu/seas-security-view

Security and authentication components providing user management, access control, and security features for SEAS applications.

## Overview

`@izhimu/seas-security-view` provides comprehensive security components including login/logout, user management, role-based access control (RBAC), permission management, and authentication workflows.

## Installation

```bash
# For SEAS framework packages (using workspace protocol)
pnpm add @izhimu/seas-security-view

# For external projects
pnpm add @izhimu/seas-security-view --registry=https://izhimu-npm.pkg.coding.net/seas/npm-releases/
```

## Key Features

### 1. Authentication

#### Login Component

```vue
<script setup lang="ts">
import { LoginForm } from '@izhimu/seas-security-view'

const handleLogin = async (credentials: LoginCredentials) => {
  try {
    await authApi.login(credentials)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <LoginForm @login="handleLogin" />
</template>
```

#### Logout Component

```vue
<script setup lang="ts">
import { LogoutButton } from '@izhimu/seas-security-view'

const handleLogout = async () => {
  await authApi.logout()
  router.push('/login')
}
</script>

<template>
  <LogoutButton @logout="handleLogout" />
</template>
```

### 2. User Management

#### UserList

```vue
<script setup lang="ts">
import { UserList, UserCreateModal, UserEditModal } from '@izhimu/seas-security-view'

const loading = ref(false)
const users = ref([])

const fetchUsers = async () => {
  loading.value = true
  users.value = await userApi.getList()
  loading.value = false
}

const handleCreate = () => {
  // Show create modal
}

const handleEdit = (user: User) => {
  // Show edit modal
}

const handleDelete = async (user: User) => {
  await userApi.delete(user.id)
  fetchUsers()
}
</script>

<template>
  <UserList
    :data="users"
    :loading="loading"
    @create="handleCreate"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>
```

#### UserDetail

```vue
<script setup lang="ts">
import { UserDetail } from '@izhimu/seas-security-view'

const userId = ref(1)
const user = ref(null)

onMounted(async () => {
  user.value = await userApi.getDetail(userId.value)
})
</script>

<template>
  <UserDetail :data="user" />
</template>
```

### 3. Role Management

#### RoleList

```vue
<script setup lang="ts">
import { RoleList, RoleCreateModal } from '@izhimu/seas-security-view'

const roles = ref([
  { id: 1, name: 'Admin', description: 'Administrator' },
  { id: 2, name: 'User', description: 'Regular user' }
])

const handleAssignPermissions = (role: Role) => {
  // Show permission assignment modal
}
</script>

<template>
  <RoleList
    :data="roles"
    @assign-permissions="handleAssignPermissions"
  />
</template>
```

#### PermissionTree

```vue
<script setup lang="ts">
import { PermissionTree } from '@izhimu/seas-security-view'

const permissions = ref([
  {
    id: 'user',
    label: 'User Management',
    children: [
      { id: 'user:read', label: 'View Users' },
      { id: 'user:write', label: 'Create/Edit Users' },
      { id: 'user:delete', label: 'Delete Users' }
    ]
  }
])

const selectedPermissions = ref(['user:read'])

const handleSave = async () => {
  await roleApi.assignPermissions(roleId, selectedPermissions.value)
}
</script>

<template>
  <PermissionTree
    v-model="selectedPermissions"
    :data="permissions"
    @save="handleSave"
  />
</template>
```

### 4. Access Control

#### PermissionGuard

Route guard for permission checking.

```vue
<script setup lang="ts">
import { PermissionGuard } from '@izhimu/seas-security-view'
</script>

<template>
  <PermissionGuard permission="user:write">
    <NButton type="primary">Create User</NButton>
  </PermissionGuard>
</template>
```

#### RoleGuard

Component guard for role checking.

```vue
<script setup lang="ts">
import { RoleGuard } from '@izhimu/seas-security-view'
</script>

<template>
  <RoleGuard :roles="['admin', 'manager']">
    <div>Admin or Manager content</div>
  </RoleGuard>
</template>
```

#### v-permission Directive

Vue directive for permission-based rendering.

```vue
<template>
  <NButton v-permission="'user:write'">Create User</NButton>
  <NButton v-permission="'user:delete'">Delete User</NButton>
</template>
```

### 5. Password Management

#### ChangePassword

```vue
<script setup lang="ts">
import { ChangePassword } from '@izhimu/seas-security-view'

const handleChangePassword = async (data: ChangePasswordData) => {
  await userApi.changePassword({
    oldPassword: data.oldPassword,
    newPassword: data.newPassword
  })
}
</script>

<template>
  <ChangePassword @submit="handleChangePassword" />
</template>
```

#### PasswordStrength

```vue
<script setup lang="ts">
import { PasswordStrength } from '@izhimu/seas-security-view'

const password = ref('')
</script>

<template>
  <NInput v-model:value="password" type="password" />
  <PasswordStrength :password="password" />
</template>
```

### 6. Session Management

#### SessionInfo

```vue
<script setup lang="ts">
import { SessionInfo } from '@izhimu/seas-security-view'
</script>

<template>
  <SessionInfo
    :show-ip="true"
    :show-login-time="true"
    :show-device="true"
  />
</template>
```

#### SessionList

```vue
<script setup lang="ts">
import { SessionList } from '@izhimu/seas-security-view'

const sessions = ref([])

onMounted(async () => {
  sessions.value = await sessionApi.getList()
})

const handleRevoke = async (sessionId: string) => {
  await sessionApi.revoke(sessionId)
  sessions.value = sessions.value.filter(s => s.id !== sessionId)
}
</script>

<template>
  <SessionList
    :data="sessions"
    @revoke="handleRevoke"
  />
</template>
```

### 7. Two-Factor Authentication (2FA)

#### TwoFactorSetup

```vue
<script setup lang="ts">
import { TwoFactorSetup } from '@izhimu/seas-security-view'

const handleSetup = async (data: TwoFactorData) => {
  await userApi.enable2FA(data)
}
</script>

<template>
  <TwoFactorSetup @setup="handleSetup" />
</template>
```

#### TwoFactorVerify

```vue
<script setup lang="ts">
import { TwoFactorVerify } from '@izhimu/seas-security-view'

const handleVerify = async (code: string) => {
  await authApi.verify2FA(code)
}
</script>

<template>
  <TwoFactorVerify @verify="handleVerify" />
</template>
```

## Authentication Flow

### Login with 2FA

```typescript
import { useAuth } from '@izhimu/seas-security-view'

const auth = useAuth()

// Step 1: Initial login
const loginResult = await auth.login({
  username: 'user@example.com',
  password: 'password'
})

// Step 2: Check if 2FA required
if (loginResult.requires2FA) {
  // Show 2FA input
  const verifyResult = await auth.verify2FA({
    code: '123456',
    token: loginResult.token
  })
}

// Step 3: Access granted
console.log('Authenticated:', auth.isAuthenticated.value)
console.log('User:', auth.user.value)
```

### Token Refresh

```typescript
import { useAuth } from '@izhimu/seas-security-view'

const auth = useAuth()

// Auto-refresh token
auth.setupTokenRefresh({
  refreshToken: 'refresh-token',
  refreshInterval: 15 * 60 * 1000  // 15 minutes
})
```

## Permission System

### Permission Format

Permissions follow the format: `resource:action`

Examples:
- `user:read` - View users
- `user:write` - Create/edit users
- `user:delete` - Delete users
- `post:publish` - Publish posts
- `system:config` - System configuration

### Permission Checking

```typescript
import { usePermission } from '@izhimu/seas-security-view'

const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

// Single permission
if (hasPermission('user:write')) {
  // User can write
}

// Any permission
if (hasAnyPermission(['user:write', 'user:delete'])) {
  // User has at least one
}

// All permissions
if (hasAllPermissions(['user:read', 'user:write'])) {
  // User has all
}
```

### Dynamic Permissions

```typescript
import { usePermission } from '@izhimu/seas-security-view'

const { can } = usePermission()

// Dynamic permission check
if (can('edit', user)) {
  // Can edit this specific user
}
```

## User Profile

#### ProfileForm

```vue
<script setup lang="ts">
import { ProfileForm } from '@izhimu/seas-security-view'

const userProfile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '13800138000',
  avatar: ''
})

const handleSave = async (data: UserProfile) => {
  await userApi.updateProfile(data)
}
</script>

<template>
  <ProfileForm
    :model="userProfile"
    @save="handleSave"
  />
</template>
```

#### AvatarUpload

```vue
<script setup lang="ts">
import { AvatarUpload } from '@izhimu/seas-security-view'

const handleUpload = async (file: File) => {
  const result = await userApi.uploadAvatar(file)
  return result.url
}
</script>

<template>
  <AvatarUpload
    :current-avatar="user.avatar"
    @upload="handleUpload"
  />
</template>
```

## Security Best Practices

### Password Policy

```typescript
import { usePasswordPolicy } from '@izhimu/seas-security-view'

const {
  validate,
  requirements
} = usePasswordPolicy({
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
  preventUserInfo: true  // Prevent using name/email in password
})

const result = validate('MyPassword123!')
if (!result.valid) {
  console.error('Password issues:', result.errors)
}
```

### Security Headers

```typescript
import { useSecurityHeaders } from '@izhimu/seas-security-view'

const headers = useSecurityHeaders({
  enableCSP: true,
  enableXSSProtection: true,
  enableFrameGuard: true,
  enableHSTS: true
})
```

### Rate Limiting

```typescript
import { useRateLimit } from '@izhimu/seas-security-view'

const { checkLimit, resetLimit } = useRateLimit('login', {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000  // 15 minutes
})

// Check before login
if (await checkLimit(identifier)) {
  // Proceed with login
} else {
  // Rate limit exceeded
  console.error('Too many attempts')
}
```

## API Reference

### Components

| Component | Description |
|-----------|-------------|
| `LoginForm` | Login form with validation |
| `LogoutButton` | Logout button |
| `UserList` | User list with actions |
| `UserDetail` | User detail view |
| `UserCreateModal` | Create user modal |
| `UserEditModal` | Edit user modal |
| `RoleList` | Role list management |
| `PermissionTree` | Permission tree with checkboxes |
| `PermissionGuard` | Permission-based component guard |
| `RoleGuard` | Role-based component guard |
| `ChangePassword` | Change password form |
| `PasswordStrength` | Password strength indicator |
| `SessionInfo` | Current session information |
| `SessionList` | Active sessions list |
| `TwoFactorSetup` | 2FA setup wizard |
| `TwoFactorVerify` | 2FA verification input |
| `ProfileForm` | User profile form |
| `AvatarUpload` | Avatar upload component |

### Composables

| Composable | Description |
|------------|-------------|
| `useAuth` | Authentication state and methods |
| `usePermission` | Permission checking utilities |
| `usePasswordPolicy` | Password validation |
| `useSecurityHeaders` | Security header generation |
| `useRateLimit` | Rate limiting |

### Directives

| Directive | Description |
|-----------|-------------|
| `v-permission` | Permission-based rendering |
| `v-role` | Role-based rendering |

## Integration Example

### Protecting Routes

```typescript
// router/index.ts
import { createRouter } from 'vue-router'
import { useAuth } from '@izhimu/seas-security-view'

const router = createRouter({...})
const auth = useAuth()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated.value) {
      return next({ name: 'Login' })
    }

    if (to.meta.permission && !auth.hasPermission(to.meta.permission)) {
      return next({ name: 'Forbidden' })
    }
  }
  next()
})
```

## Best Practices

1. **Always validate on server** - Client-side checks are UX only
2. **Use HTTPS** - Never transmit credentials over HTTP
3. **Implement rate limiting** - Prevent brute force attacks
4. **Log security events** - Track login attempts, permission changes
5. **Regular security audits** - Review permissions and access logs
6. **Keep dependencies updated** - Security patches
7. **Use strong password policy** - Enforce complexity requirements
8. **Implement 2FA** - For sensitive operations

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core authentication utilities
- [`@izhimu/seas-base-view`](./seas-base-view.md) - Base UI components
- [`@izhimu/seas-ai-view`](./seas-ai-view.md) - AI security features
