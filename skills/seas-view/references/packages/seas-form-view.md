# @izhimu/seas-form-view

Form building and validation components providing dynamic form generation, form designer, and advanced validation.

## Overview

`@izhimu/seas-form-view` provides comprehensive form management including drag-and-drop form builder, dynamic form rendering, validation rules, and form templates.

## Installation

```bash
pnpm add @izhimu/seas-form-view
```

## Key Features

### 1. Form Builder

#### FormBuilder

```vue
<script setup lang="ts">
import { FormBuilder } from '@izhimu/seas-form-view'

const formSchema = ref({
  fields: [
    {
      type: 'input',
      name: 'username',
      label: 'Username',
      required: true
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      required: true
    }
  ]
})
</script>

<template>
  <FormBuilder v-model="formSchema" />
</template>
```

### 2. Dynamic Forms

#### DynamicForm

```vue
<script setup lang="ts">
import { DynamicForm } from '@izhimu/seas-form-view'

const handleSubmit = async (data: any) => {
  console.log('Form data:', data)
}
</script>

<template>
  <DynamicForm
    :schema="formSchema"
    @submit="handleSubmit"
  />
</template>
```

## API Reference

| Component | Description |
|-----------|-------------|
| `FormBuilder` | Drag-and-drop form designer |
| `DynamicForm` | Dynamic form renderer |
| `FormTemplate` | Form template library |
| `ValidationEditor` | Validation rule editor |

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
- [`@izhimu/seas-base-view`](./seas-base-view.md) - Base form components
