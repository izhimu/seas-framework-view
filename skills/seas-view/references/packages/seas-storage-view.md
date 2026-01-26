# @izhimu/seas-storage-view

Storage management components providing file upload, download, and storage organization features.

## Overview

`@izhimu/seas-storage-view` provides comprehensive storage management including file uploads/downloads, folder organization, file previews, and integration with various storage backends (local, S3, OSS, etc.).

## Installation

```bash
pnpm add @izhimu/seas-storage-view
```

## Key Features

### 1. File Upload

#### FileUploader

```vue
<script setup lang="ts">
import { FileUploader } from '@izhimu/seas-storage-view'

const handleUpload = async (files: File[]) => {
  const result = await storageApi.upload({
    files,
    path: '/uploads'
  })
  return result
}
</script>

<template>
  <FileUploader
    multiple
    :max-size="10485760"
    accept="image/*,.pdf,.doc"
    @upload="handleUpload"
  />
</template>
```

### 2. File Manager

#### FileManager

```vue
<script setup lang="ts">
import { FileManager } from '@izhimu/seas-storage-view'

const currentPath = ref('/')

const handleNavigate = (path: string) => {
  currentPath.value = path
}
</script>

<template>
  <FileManager
    :path="currentPath"
    @navigate="handleNavigate"
  />
</template>
```

### 3. Image Gallery

#### ImageGallery

```vue
<script setup lang="ts">
import { ImageGallery } from '@izhimu/seas-storage-view'

const images = ref([])
</script>

<template>
  <ImageGallery
    :images="images"
    :preview="true"
  />
</template>
```

## API Reference

| Component | Description |
|-----------|-------------|
| `FileUploader` | File upload component |
| `FileManager` | File/folder browser |
| `ImageGallery` | Image gallery with preview |
| `FilePreview` | File preview component |
| `StorageQuota` | Storage usage display |

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
