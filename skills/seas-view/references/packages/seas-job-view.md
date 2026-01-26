# @izhimu/seas-job-view

Job scheduling and task management components providing cron jobs, async tasks, and workflow orchestration.

## Overview

`@izhimu/seas-job-view` provides comprehensive job management including scheduled tasks, job monitoring, workflow orchestration, and execution history.

## Installation

```bash
pnpm add @izhimu/seas-job-view
```

## Key Features

### 1. Job Scheduler

#### JobList

```vue
<script setup lang="ts">
import { JobList } from '@izhimu/seas-job-view'

const jobs = ref([
  {
    id: '1',
    name: 'Daily Backup',
    cron: '0 2 * * *',
    status: 'active'
  }
])
</script>

<template>
  <JobList :jobs="jobs" />
</template>
```

### 2. Task Execution

#### TaskMonitor

```vue
<script setup lang="ts">
import { TaskMonitor } from '@izhimu/seas-job-view'
</script>

<template>
  <TaskMonitor />
</template>
```

## API Reference

| Component | Description |
|-----------|-------------|
| `JobList` | List of scheduled jobs |
| `JobEditor` | Job CRUD editor |
| `TaskMonitor` | Real-time task monitoring |
| `ExecutionHistory` | Job execution history |

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
