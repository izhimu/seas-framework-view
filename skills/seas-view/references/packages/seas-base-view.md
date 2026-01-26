# @izhimu/seas-base-view

Base UI components and foundational layouts for SEAS framework desktop applications.

## Overview

`@izhimu/seas-base-view` provides essential UI components, layouts, and design patterns used across all SEAS desktop applications. It serves as the foundation for building consistent enterprise applications with Naive UI components.

## Installation

```bash
# For SEAS framework packages (using workspace protocol)
pnpm add @izhimu/seas-base-view

# For external projects
pnpm add @izhimu/seas-base-view --registry=https://izhimu-npm.pkg.coding.net/seas/npm-releases/
```

## Dependencies

```json
{
  "devDependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-security-view": "workspace:*",
    "@izhimu/seas-ai-view": "workspace:*"
  }
}
```

## Key Features

### 1. Layout Components

#### Main Layout

```vue
<script setup lang="ts">
import { AppLayout, Sidebar, Header, Content } from '@izhimu/seas-base-view'

const menuOptions = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: () => h(DashboardIcon)
  },
  {
    label: 'Users',
    key: 'users',
    icon: () => h(UserIcon)
  }
]
</script>

<template>
  <AppLayout>
    <Sidebar :options="menuOptions" />
    <Header title="SEAS Application" />
    <Content>
      <router-view />
    </Content>
  </AppLayout>
</template>
```

#### Sidebar

Collapsible sidebar with menu items and icons.

```vue
<script setup lang="ts">
import { Sidebar } from '@izhimu/seas-base-view'

const collapsed = ref(false)
const menuOptions = ref([
  {
    label: 'Home',
    key: 'home',
    icon: renderIcon(HomeOutlined)
  },
  {
    label: 'Management',
    key: 'management',
    icon: renderIcon(SettingsOutlined),
    children: [
      { label: 'Users', key: 'users' },
      { label: 'Roles', key: 'roles' }
    ]
  }
])
</script>

<template>
  <Sidebar
    v-model:collapsed="collapsed"
    :options="menuOptions"
    :collapsed-width="64"
    :width="240"
  />
</template>
```

#### Header

Application header with user info and actions.

```vue
<script setup lang="ts">
import { Header } from '@izhimu/seas-base-view'

const userMenuOptions = [
  {
    label: 'Profile',
    key: 'profile'
  },
  {
    label: 'Settings',
    key: 'settings'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Logout',
    key: 'logout'
  }
]

const handleUserMenuSelect = (key: string) => {
  console.log('Menu selected:', key)
}
</script>

<template>
  <Header
    title="Application Title"
    :user-menu-options="userMenuOptions"
    @user-menu-select="handleUserMenuSelect"
  />
</template>
```

### 2. Data Display Components

#### DataTable

Enhanced table component with sorting, filtering, and pagination.

```vue
<script setup lang="ts">
import { DataTable } from '@izhimu/seas-base-view'

interface RowData {
  id: number
  name: string
  email: string
  status: string
  createdAt: string
}

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'Name', key: 'name', width: 200 },
  { title: 'Email', key: 'email', width: 250 },
  { title: 'Status', key: 'status', width: 120 },
  { title: 'Created', key: 'createdAt', width: 180 }
]

const data = ref<RowData[]>([])
const loading = ref(false)
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0
})

const fetchData = async () => {
  loading.value = true
  // API call
  data.value = await api.getUsers()
  pagination.value.itemCount = 100
  loading.value = false
}
</script>

<template>
  <DataTable
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    @page-change="fetchData"
  />
</template>
```

#### Card

Flexible card component for content grouping.

```vue
<script setup lang="ts">
import { Card } from '@izhimu/seas-base-view'
</script>

<template>
  <Card title="User Information" :bordered="false">
    <template #header-extra>
      <NButton size="small" @click="handleEdit">
        Edit
      </NButton>
    </template>
    <p>User details here...</p>
  </Card>
</template>
```

#### DescriptionList

Key-value pair display component.

```vue
<script setup lang="ts">
import { DescriptionList } from '@izhimu/seas-base-view'

const items = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Status', value: 'Active' }
]
</script>

<template>
  <DescriptionList :items="items" :column="2" />
</template>
```

### 3. Form Components

#### SearchForm

Quick search form with common filters.

```vue
<script setup lang="ts">
import { SearchForm } from '@izhimu/seas-base-view'

const searchModel = ref({
  keyword: '',
  status: null,
  dateRange: null
})

const handleSearch = () => {
  console.log('Search:', searchModel.value)
}

const handleReset = () => {
  searchModel.value = {
    keyword: '',
    status: null,
    dateRange: null
  }
}
</script>

<template>
  <SearchForm
    v-model="searchModel"
    @search="handleSearch"
    @reset="handleReset"
  >
    <NFormItem label="Keyword">
      <NInput v-model:value="searchModel.keyword" placeholder="Search..." />
    </NFormItem>
    <NFormItem label="Status">
      <NSelect v-model:value="searchModel.status" :options="statusOptions" />
    </NFormItem>
  </SearchForm>
</template>
```

#### EditForm

Form component with validation.

```vue
<script setup lang="ts">
import { EditForm } from '@izhimu/seas-base-view'

interface FormData {
  name: string
  email: string
  role: string
}

const formRef = ref()
const formData = ref<FormData>({
  name: '',
  email: '',
  role: ''
})

const rules = {
  name: [
    { required: true, message: 'Name is required', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  // Submit logic
}
</script>

<template>
  <EditForm
    ref="formRef"
    :model="formData"
    :rules="rules"
    @submit="handleSubmit"
  >
    <NFormItem label="Name" path="name">
      <NInput v-model:value="formData.name" />
    </NFormItem>
    <NFormItem label="Email" path="email">
      <NInput v-model:value="formData.email" />
    </NFormItem>
    <NFormItem label="Role" path="role">
      <NSelect v-model:value="formData.role" :options="roleOptions" />
    </NFormItem>
  </EditForm>
</template>
```

### 4. Feedback Components

#### ResultPage

Result page for success/error states.

```vue
<script setup lang="ts">
import { ResultPage } from '@izhimu/seas-base-view'
</script>

<template>
  <ResultPage
    status="success"
    title="Operation Successful"
    subtitle="Your changes have been saved"
  >
    <template #extra>
      <NButton type="primary" @click="goBack">
        Back to List
      </NButton>
    </template>
  </ResultPage>
</template>
```

#### EmptyState

Empty state component for no data scenarios.

```vue
<script setup lang="ts">
import { EmptyState } from '@izhimu/seas-base-view'
</script>

<template>
  <EmptyState
    description="No data found"
    :image="emptyImage"
  >
    <template #action>
      <NButton type="primary" @click="handleCreate">
        Create New
      </NButton>
    </template>
  </EmptyState>
</template>
```

### 5. Navigation Components

#### Breadcrumb

Breadcrumb navigation component.

```vue
<script setup lang="ts">
import { Breadcrumb } from '@izhimu/seas-base-view'

const routes = [
  { label: 'Home', path: '/' },
  { label: 'Management', path: '/management' },
  { label: 'Users', path: '/management/users' }
]
</script>

<template>
  <Breadcrumb :routes="routes" />
</template>
```

#### Tabs

Tab navigation component.

```vue
<script setup lang="ts">
import { Tabs } from '@izhimu/seas-base-view'

const activeTab = ref('info')

const tabs = [
  { key: 'info', label: 'Information' },
  { key: 'settings', label: 'Settings' },
  { key: 'logs', label: 'Logs' }
]
</script>

<template>
  <Tabs v-model="activeTab" :options="tabs">
    <template #info>
      <div>Info content</div>
    </template>
    <template #settings>
      <div>Settings content</div>
    </template>
    <template #logs>
      <div>Logs content</div>
    </template>
  </Tabs>
</template>
```

### 6. Common Components

#### ActionButtons

Standard action buttons for tables and forms.

```vue
<script setup lang="ts">
import { ActionButtons } from '@izhimu/seas-base-view'

const actions = [
  {
    label: 'Edit',
    key: 'edit',
    icon: EditIcon,
    type: 'primary'
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: DeleteIcon,
    type: 'error'
  }
]

const handleAction = (key: string, row: any) => {
  console.log('Action:', key, 'Row:', row)
}
</script>

<template>
  <ActionButtons
    :actions="actions"
    :row="rowData"
    @action="handleAction"
  />
</template>
```

#### StatusTag

Status display tag component.

```vue
<script setup lang="ts">
import { StatusTag } from '@izhimu/seas-base-view'
</script>

<template>
  <StatusTag status="active" />    <!-- Active -->
  <StatusTag status="inactive" />  <!-- Inactive -->
  <StatusTag status="pending" />   <!-- Pending -->
  <StatusTag status="error" />     <!-- Error -->
</template>
```

#### CodeHighlight

Code syntax highlighting component.

```vue
<script setup lang="ts">
import { CodeHighlight } from '@izhimu/seas-base-view'

const code = ref(`
function hello() {
  console.log('Hello World')
}
`)
</script>

<template>
  <CodeHighlight :code="code" language="javascript" />
</template>
```

## Common Patterns

### Page Template

Standard page structure for list/detail views.

```vue
<script setup lang="ts">
import { useListPage } from '@izhimu/seas-base-view'

const {
  loading,
  data,
  pagination,
  searchModel,
  handleSearch,
  handleReset,
  fetchData
} = useListPage({
  apiFn: api.getUsers
})
</script>

<template>
  <div class="page-container">
    <SearchForm
      v-model="searchModel"
      @search="handleSearch"
      @reset="handleReset"
    />
    <DataTable
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
    />
  </div>
</template>
```

### Modal Template

Modal dialog with form.

```vue
<script setup lang="ts">
import { useModal } from '@izhimu/seas-base-view'

const {
  visible,
  open,
  close,
  formRef,
  formData,
  handleSubmit
} = useModal({
  apiFn: api.createUser
})

const openCreateModal = () => {
  open()
}
</script>

<template>
  <NButton type="primary" @click="openCreateModal">
    Create
  </NButton>

  <NModal v-model:show="visible">
    <NCard title="Create User" style="width: 600px">
      <EditForm
        ref="formRef"
        :model="formData"
        @submit="handleSubmit"
      >
        <!-- Form fields -->
      </EditForm>
    </NCard>
  </NModal>
</template>
```

## API Reference

### Components

| Component | Description |
|-----------|-------------|
| `AppLayout` | Main application layout |
| `Sidebar` | Collapsible sidebar with menu |
| `Header` | Application header bar |
| `DataTable` | Enhanced data table |
| `Card` | Content card container |
| `SearchForm` | Search form with filters |
| `EditForm` | Form with validation |
| `ResultPage` | Success/error result page |
| `EmptyState` | Empty state display |
| `Breadcrumb` | Breadcrumb navigation |
| `Tabs` | Tab navigation |
| `ActionButtons` | Action button group |
| `StatusTag` | Status display tag |

### Composables

| Composable | Description |
|------------|-------------|
| `useListPage` | List page logic |
| `useModal` | Modal dialog logic |
| `useTable` | Table state management |
| `useForm` | Form validation logic |

## Styling

Components use SEAS theme tokens for consistent styling:

```vue
<style scoped>
.page-container {
  padding: var(--seas-spacing-lg);
  background: var(--seas-color-bg);
}
</style>
```

## Best Practices

1. **Use standard page templates** - Maintain consistency across applications
2. **Follow responsive design** - Components adapt to different screen sizes
3. **Implement proper error handling** - Show user-friendly error messages
4. **Optimize table performance** - Use virtualization for large datasets
5. **Provide loading states** - Show loading indicators during async operations
6. **Validate forms early** - Show validation errors immediately
7. **Use semantic HTML** - Maintain accessibility standards

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
- [`@izhimu/seas-security-view`](./seas-security-view.md) - Security components
- [`@izhimu/seas-ai-view`](./seas-ai-view.md) - AI integration components
