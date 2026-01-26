# @izhimu/seas-mobile-core

Mobile-specific core library providing essential functionality for mobile applications in the SEAS framework.

## Overview

`@izhimu/seas-mobile-core` extends the core SEAS functionality with mobile-specific features, utilities, and components optimized for mobile browsers and web views. It builds upon `@izhimu/seas-core` and `@izhimu/seas-common` while adding mobile-first capabilities.

## Installation

```bash
# For SEAS framework packages (using workspace protocol)
pnpm add @izhimu/seas-mobile-core

# For external projects
pnpm add @izhimu/seas-mobile-core --registry=https://izhimu-npm.pkg.coding.net/seas/npm-releases/
```

## Key Features

### 1. Device Detection

Detect device type, operating system, and browser capabilities.

```typescript
import { useDevice } from '@izhimu/seas-mobile-core'

const {
  isMobile,
  isTablet,
  isDesktop,
  isIOS,
  isAndroid,
  isWeChat,
  isAlipay,
  browser,
  os
} = useDevice()

// Check device type
if (isMobile.value) {
  // Mobile-specific logic
}

// Check platform
if (isIOS.value) {
  // iOS-specific handling
}

// Check environment
if (isWeChat.value) {
  // WeChat browser integration
}
```

### 2. Touch Gesture Handling

Enhanced touch gesture support for mobile interactions.

```typescript
import {
  useSwipe,
  usePinch,
  useLongPress
} from '@izhimu/seas-mobile-core'

// Swipe gestures
const { direction, length } = useSwipe(element, {
  onSwipe() {
    console.log('Swiped:', direction.value)
  },
  onSwipeEnd() {
    console.log('Swipe distance:', length.value)
  }
})

// Pinch to zoom
const { scale } = usePinch(element, {
  onPinch() {
    console.log('Scale:', scale.value)
  }
})

// Long press
const { pressed } = useLongPress(element, {
  delay: 500,
  onLongPress() {
    console.log('Long pressed!')
  }
})
```

### 3. Viewport & Screen Utilities

Mobile viewport and screen management utilities.

```typescript
import {
  useViewport,
  useScreenOrientation,
  useSafeArea
} from '@izhimu/seas-mobile-core'

// Viewport size
const { width, height, pixelRatio } = useViewport()

// Screen orientation
const { orientation, isPortrait, isLandscape } = useScreenOrientation()

// Safe area (notch, home indicator)
const { top, right, bottom, left } = useSafeArea()

// Apply safe area padding
const containerStyle = computed(() => ({
  paddingTop: `${top.value}px`,
  paddingBottom: `${bottom.value}px`
}))
```

### 4. Virtual Scroll

Optimized list rendering for large datasets on mobile.

```vue
<script setup lang="ts">
import { VirtualList } from '@izhimu/seas-mobile-core'

const items = ref(Array(10000).fill(0).map((_, i) => ({
  id: i,
  text: `Item ${i}`
}))
</script>

<template>
  <VirtualList
    :items="items"
    :item-height="50"
    :visible-height="600"
  >
    <template #default="{ item }">
      <div class="item">{{ item.text }}</div>
    </template>
  </VirtualList>
</template>
```

### 5. Pull to Refresh

Pull-to-refresh component for mobile lists.

```vue
<script setup lang="ts">
import { PullRefresh } from '@izhimu/seas-mobile-core'

const loading = ref(false)
const list = ref([])

const onRefresh = async () => {
  loading.value = true
  list.value = await fetchData()
  loading.value = false
}
</script>

<template>
  <PullRefresh
    v-model="loading"
    @refresh="onRefresh"
  >
    <div v-for="item in list" :key="item.id">
      {{ item.text }}
    </div>
  </PullRefresh>
</template>
```

### 6. Infinite Scroll

Infinite scroll for loading more content.

```vue
<script setup lang="ts">
import { InfiniteScroll } from '@izhimu/seas-mobile-core'

const items = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoadMore = async () => {
  if (finished.value) return

  loading.value = true
  const newItems = await fetchMore()
  items.value.push(...newItems)

  if (newItems.length === 0) {
    finished.value = true
  }
  loading.value = false
}
</script>

<template>
  <InfiniteScroll
    :loading="loading"
    :finished="finished"
    @load="onLoadMore"
  >
    <div v-for="item in items" :key="item.id">
      {{ item.text }}
    </div>
  </InfiniteScroll>
</template>
```

### 7. Mobile Navigation

Mobile-specific navigation patterns.

```vue
<script setup lang="ts">
import { MobileNav, TabBar } from '@izhimu/seas-mobile-core'

const activeTab = ref('home')

const tabs = [
  { name: 'home', label: '首页', icon: 'home-o' },
  { name: 'search', label: '搜索', icon: 'search' },
  { name: 'settings', label: '设置', icon: 'setting-o' }
]
</script>

<template>
  <MobileNav>
    <TabBar v-model="activeTab">
      <TabBar.Item
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :icon="tab.icon"
      >
        {{ tab.label }}
      </TabBar.Item>
    </TabBar>
  </MobileNav>
</template>
```

### 8. Camera & Gallery

Access mobile camera and photo gallery.

```typescript
import {
  useCamera,
  useGallery
} from '@izhimu/seas-mobile-core'

// Camera
const { takePhoto, video } = useCamera()

const capturePhoto = async () => {
  const photo = await takePhoto({
    quality: 80,
    allowEdit: false,
    resultType: 'base64'
  })
  console.log('Photo captured:', photo.dataUrl)
}

// Gallery
const { selectPhoto, selectMultiple } = useGallery()

const chooseFromGallery = async () => {
  const photos = await selectMultiple({
    maximumCount: 5,
    quality: 80
  })
  console.log('Selected photos:', photos)
}
```

### 9. Geolocation

Mobile geolocation with enhanced options.

```typescript
import { useGeolocation } from '@izhimu/seas-mobile-core'

const {
  coords,
  error,
  loading,
  getCurrentPosition,
  watchPosition,
  clearWatch
} = useGeolocation()

// Get current position
const getLocation = async () => {
  await getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  })
  console.log('Position:', coords.value)
}

// Watch position changes
const watchId = watchPosition((position) => {
  console.log('Position updated:', position)
})
```

### 10. Vibration & Haptic Feedback

Vibration API and haptic feedback.

```typescript
import { useVibration, useHaptic } from '@izhimu/seas-mobile-core'

// Vibration
const { vibrate } = useVibration()

vibrate(200)  // Vibrate for 200ms
vibrate([100, 50, 100])  // Pattern

// Haptic feedback
const { impact, notification, selectionChanged } = useHaptic()

impact('heavy')  // Heavy impact
notification('success')  // Success notification
selectionChanged()  // Selection changed feedback
```

### 11. Clipboard

Enhanced clipboard functionality.

```typescript
import { useClipboard } from '@izhimu/seas-mobile-core'

const {
  text,
  copied,
  copy,
  paste
} = useClipboard()

// Copy text
await copy('Text to copy')
console.log('Copied:', copied.value)

// Paste text
const pastedText = await paste()
console.log('Pasted:', pastedText)
```

### 12. Mobile Performance

Performance optimization utilities for mobile.

```typescript
import {
  useIdleCallback,
  useRequestIdleCallback,
  optimizeImages,
  lazyLoad
} from '@izhimu/seas-mobile-core'

// Idle callback
const { register, cancel } = useIdleCallback()

const taskId = register(() => {
  // Run during browser idle time
  console.log('Running idle task')
})

// Image optimization
optimizeImages({
  maxWidth: 800,
  quality: 0.8,
  lazyLoad: true
})

// Lazy load components
const HeavyComponent = lazyLoad(() =>
  import('./HeavyComponent.vue')
)
```

## Mobile UI Components

### Vant Integration

Pre-configured Vant components with SEAS styling.

```vue
<script setup lang="ts">
import {
  VanButton,
  VanCell,
  VanCellGroup,
  VanNavBar,
  VanTabBar,
  VanToast
} from '@izhimu/seas-mobile-core'
</script>

<template>
  <VanNavBar title="SEAS Mobile" left-arrow />

  <VanCellGroup>
    <VanCell title="Cell 1" value="Content" />
    <VanCell title="Cell 2" is-link />
  </VanCellGroup>

  <VanButton type="primary" block>
    Submit
  </VanButton>
</template>
```

## Mobile-Specific Composables

### useSwipeBack

Swipe back gesture for navigation.

```typescript
import { useSwipeBack } from '@izhimu/seas-mobile-core'

const { canSwipeBack, swipeBack } = useSwipeBack()

router.beforeEach((to, from, next) => {
  if (canSwipeBack.value) {
    // Enable swipe back gesture
  }
  next()
})
```

### useKeyboard

Mobile keyboard handling.

```typescript
import { useKeyboard } from '@izhimu/seas-mobile-core'

const {
  visible,
  height,
  dismiss
} = useKeyboard()

// Adjust layout when keyboard shows
const bottomOffset = computed(() =>
  visible.value ? `${height.value}px` : '0'
)
```

## API Reference

### Device Detection

| Property | Description |
|----------|-------------|
| `isMobile` | Is mobile device |
| `isTablet` | Is tablet device |
| `isIOS` | Is iOS platform |
| `isAndroid` | Is Android platform |
| `isWeChat` | Is WeChat browser |
| `isAlipay` | Is Alipay browser |

### Viewport

| Property | Description |
|----------|-------------|
| `width` | Viewport width |
| `height` | Viewport height |
| `pixelRatio` | Device pixel ratio |

### Safe Area

| Property | Description |
|----------|-------------|
| `top` | Top safe area (notch) |
| `right` | Right safe area |
| `bottom` | Bottom safe area (home indicator) |
| `left` | Left safe area |

## Dependencies

`@izhimu/seas-mobile-core` depends on:
- `@izhimu/seas-core` - Core functionality
- `@izhimu/seas-common` - Common utilities
- `vant` - Mobile UI components
- `vue` - Vue 3 framework

## Best Practices

1. **Always test on real devices** - Emulators don't catch all mobile issues
2. **Optimize images** - Use appropriate sizes and formats for mobile
3. **Minimize re-renders** - Mobile devices have less processing power
4. **Use virtual scrolling** - For long lists to maintain performance
5. **Handle safe areas** - Account for notches and home indicators
6. **Test touch targets** - Ensure interactive elements are at least 44x44px
7. **Consider offline** - Mobile devices frequently lose connectivity

## See Also

- [`@izhimu/seas-core`](./seas-core.md) - Core functionality library
- [`@izhimu/seas-common`](./seas-common.md) - Common utilities library
- [`@izhimu/seas-security-mobile-view`](../packages/seas-security-mobile-view.md) - Mobile security components
