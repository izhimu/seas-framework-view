# @izhimu/seas-generate-view

Code generation tools providing template-based code generation, scaffolding, and project initialization.

## Overview

`@izhimu/seas-generate-view` provides powerful code generation capabilities including template management, custom generators, and project scaffolding tools.

## Installation

```bash
pnpm add @izhimu/seas-generate-view
```

## Key Features

### 1. Code Generator

#### CodeGenerator

```vue
<script setup lang="ts">
import { CodeGenerator } from '@izhimu/seas-generate-view'

const handleGenerate = async (template: string, config: any) => {
  const result = await generateApi.execute({
    template,
    config
  })
  return result
}
</script>

<template>
  <CodeGenerator @generate="handleGenerate" />
</template>
```

### 2. Template Manager

#### TemplateLibrary

```vue
<script setup lang="ts">
import { TemplateLibrary } from '@izhimu/seas-generate-view'
</script>

<template>
  <TemplateLibrary />
</template>
```

## API Reference

| Component | Description |
|-----------|-------------|
| `CodeGenerator` | Code generation interface |
| `TemplateLibrary` | Template management |
| `Scaffolder` | Project scaffolding |

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
