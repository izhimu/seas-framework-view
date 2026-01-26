# @izhimu/seas-mqtt-view

MQTT messaging components providing real-time communication, device management, and message monitoring.

## Overview

`@izhimu/seas-mqtt-view` provides comprehensive MQTT integration including connection management, topic subscription, message publishing/receiving, and device monitoring.

## Installation

```bash
pnpm add @izhimu/seas-mqtt-view
```

## Key Features

### 1. MQTT Client

#### MqttConnector

```vue
<script setup lang="ts">
import { MqttConnector } from '@izhimu/seas-mqtt-view'

const handleConnect = async (config: MqttConfig) => {
  await mqttApi.connect(config)
}
</script>

<template>
  <MqttConnector @connect="handleConnect" />
</template>
```

### 2. Message Viewer

#### MessageViewer

```vue
<script setup lang="ts">
import { MessageViewer } from '@izhimu/seas-mqtt-view'
</script>

<template>
  <MessageViewer topic="sensor/+" />
</template>
```

## API Reference

| Component | Description |
|-----------|-------------|
| `MqttConnector` | MQTT connection manager |
| `MessageViewer` | Real-time message viewer |
| `TopicTree` | Topic subscription tree |
| `DeviceMonitor` | IoT device monitoring |

## See Also

- [`@izhimu/seas-core`](../core/seas-core.md) - Core functionality
