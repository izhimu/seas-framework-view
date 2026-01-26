# @izhimu/seas-healthy-view

Health monitoring and diagnostics components providing system health checks, metrics visualization, and alerting.

## Overview

`@izhimu/seas-healthy-view` provides comprehensive health monitoring including system metrics, service health checks, performance monitoring, and alert management.

## Installation

```bash
pnpm add @izhimu/seas-healthy-view
```

## Key Features

### 1. Health Dashboard

#### HealthOverview

```vue
<script setup lang="ts">
import { HealthOverview } from '@izhimu/seas-healthy-view'
</script>

<template>
  <HealthOverview />
</template>
```

### 2. Metrics Visualization

#### MetricsChart

```vue
<script setup lang="ts">
import { MetricsChart } from '@izhimu/seas-healthy-view'
</script>

<template>
  <MetricsChart type="cpu" />
</template>
```

## API Reference

| Component | Description |
|-----------|-------------|
| `HealthOverview` | System health overview |
| `MetricsChart` | Performance metrics charts |
| `ServiceStatus` | Service status indicators |
| `AlertList` | Alert management |

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
