# @izhimu/seas-common

Common utilities and helper functions library providing reusable functionality across SEAS framework.

## Overview

`@izhimu/seas-common` is a utility library that provides common helper functions, type definitions, and utilities used throughout the SEAS framework. It's designed to be lightweight and dependency-free, making it suitable for use in any SEAS-based project.

## Installation

```bash
# For SEAS framework packages (using workspace protocol)
pnpm add @izhimu/seas-common

# For external projects
pnpm add @izhimu/seas-common --registry=https://izhimu-npm.pkg.coding.net/seas/npm-releases/
```

## Categories of Utilities

### 1. String Utilities

```typescript
import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  truncate,
  generateUUID,
  slugify
} from '@izhimu/seas-common'

// Case conversion
capitalize('hello world')  // 'Hello world'
camelCase('hello-world')   // 'helloWorld'
kebabCase('helloWorld')    // 'hello-world'
snakeCase('helloWorld')    // 'hello_world'

// String manipulation
truncate('Long text here', 10)  // 'Long text ...'

// Generate unique identifiers
generateUUID()  // '550e8400-e29b-41d4-a716-446655440000'

// URL-friendly strings
slugify('Hello World!')  // 'hello-world'
```

### 2. Number Utilities

```typescript
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  random,
  clamp,
  round
} from '@izhimu/seas-common'

// Number formatting
formatNumber(1234.56)     // '1,234.56'
formatCurrency(99.99)     // '¥99.99'
formatPercent(0.85)       // '85%'

// Math operations
random(1, 10)            // Random number between 1-10
clamp(5, 0, 10)          // 5 (clamped within range)
clamp(15, 0, 10)         // 10 (clamped to max)
round(3.14159, 2)        // 3.14
```

### 3. Date & Time Utilities

```typescript
import {
  formatDate,
  formatTime,
  formatRelative,
  addDays,
  subtractDays,
  isValidDate,
  parseDate
} from '@izhimu/seas-common'

// Date formatting
formatDate(new Date())                    // '2026-01-26'
formatDate(new Date(), 'YYYY-MM-DD')      // '2026-01-26'
formatDate(new Date(), 'YYYY年MM月DD日')  // '2026年01月26日'

// Time formatting
formatTime(new Date())                    // '15:30:45'
formatTime(new Date(), 'HH:mm')           // '15:30'

// Relative time
formatRelative(new Date())                // '今天 15:30'
formatRelative(addDays(new Date(), 1))    // '明天 15:30'

// Date arithmetic
addDays(new Date(), 7)                    // Next week
subtractDays(new Date(), 30)              // 30 days ago

// Validation
isValidDate('2026-01-26')                 // true
parseDate('2026-01-26')                   // Date object
```

### 4. Array Utilities

```typescript
import {
  chunk,
  shuffle,
  unique,
  groupBy,
  sortBy,
  flatten
} from '@izhimu/seas-common'

// Chunk array into groups
chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]

// Shuffle array
shuffle([1, 2, 3, 4, 5])    // [3, 1, 5, 2, 4] (random)

// Remove duplicates
unique([1, 2, 2, 3, 3])     // [1, 2, 3]

// Group by key
groupBy(
  [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'vegetable', name: 'carrot' }
  ],
  'type'
)
// { fruit: [...], vegetable: [...] }

// Sort by key
sortBy(users, 'name')

// Flatten nested arrays
flatten([[1, 2], [3, [4, 5]]])  // [1, 2, 3, 4, 5]
```

### 5. Object Utilities

```typescript
import {
  deepClone,
  deepMerge,
  omit,
  pick,
  isEmpty,
  isEqual
} from '@izhimu/seas-common'

// Deep clone
const original = { a: 1, b: { c: 2 } }
const cloned = deepClone(original)

// Deep merge
const merged = deepMerge({ a: 1 }, { b: 2 })  // { a: 1, b: 2 }

// Object manipulation
omit({ a: 1, b: 2, c: 3 }, ['b'])  // { a: 1, c: 3 }
pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // { a: 1, c: 3 }

// Validation
isEmpty({})           // true
isEmpty({ a: 1 })     // false

// Comparison
isEqual({ a: 1 }, { a: 1 })  // true
isEqual({ a: 1 }, { a: 2 })  // false
```

### 6. Validation Utilities

```typescript
import {
  isEmail,
  isPhone,
  isUrl,
  isIP,
  isUUID,
  isChineseID,
  isEmpty,
  isNumber
} from '@izhimu/seas-common'

// Email validation
isEmail('user@example.com')     // true
isEmail('invalid')               // false

// Phone validation (Chinese mobile)
isPhone('13800138000')          // true
isPhone('12345')                // false

// URL validation
isUrl('https://example.com')    // true
isUrl('invalid-url')            // false

// IP address validation
isIP('192.168.1.1')             // true
isIP('::1')                     // true

// UUID validation
isUUID('550e8400-e29b-41d4-a716-446655440000')  // true

// Chinese ID card validation
isChineseID('110101199001011234')  // true

// Type validation
isEmpty('')                   // true
isNumber(123)                 // true
isNumber('123')               // false
```

### 7. DOM Utilities

```typescript
import {
  getElement,
  getElements,
  addClass,
  removeClass,
  toggleClass,
  hasClass
} from '@izhimu/seas-common'

// Element selection
getElement('.my-class')        // First matching element
getElements('.my-class')       // All matching elements

// Class manipulation
addClass(element, 'active')
removeClass(element, 'active')
toggleClass(element, 'active')
hasClass(element, 'active')    // true/false
```

### 8. Storage Utilities

```typescript
import {
  storage,
  sessionStorage
} from '@izhimu/seas-common'

// Local storage (auto JSON stringify/parse)
storage.set('key', { data: 'value' })
const data = storage.get('key')  // { data: 'value' }
storage.remove('key')
storage.clear()

// Session storage
sessionStorage.set('key', 'value')
const data = sessionStorage.get('key')
sessionStorage.remove('key')
```

### 9. Type Definitions

Common TypeScript interfaces and types.

```typescript
import type {
  Nullable,
  Optional,
  Dict,
  AnyObject,
  Fn,
  Promiseable
} from '@izhimu/seas-common'

// Type examples
type MaybeString = Nullable<string>  // string | null
type OptionalProps = Optional<{ name: string }>
type DataDict = Dict<number>
type AnyObj = AnyObject
type Callback = Fn
type AsyncResult = Promiseable<string>
```

## Utility Examples

### Form Validation

```typescript
import { isEmail, isPhone } from '@izhimu/seas-common'

const validateForm = (data: FormData) => {
  const errors: string[] = []

  if (!isEmail(data.email)) {
    errors.push('Invalid email address')
  }

  if (!isPhone(data.phone)) {
    errors.push('Invalid phone number')
  }

  return errors
}
```

### Data Transformation

```typescript
import {
  formatDate,
  formatCurrency,
  groupBy,
  sortBy
} from '@izhimu/seas-common'

// Transform API response
const transformed = apiData.map(item => ({
  ...item,
  formattedDate: formatDate(item.date),
  formattedPrice: formatCurrency(item.price)
}))

// Group and sort
const grouped = groupBy(transformed, 'category')
const sorted = sortBy(transformed, 'name')
```

### Deep State Updates

```typescript
import { deepMerge } from '@izhimu/seas-common'

// Immutable state update
const newState = deepMerge(oldState, {
  user: {
    profile: {
      name: 'New Name'
    }
  }
})
```

## API Reference

### String Utilities

| Function | Description |
|----------|-------------|
| `capitalize(str)` | Capitalize first letter |
| `camelCase(str)` | Convert to camelCase |
| `kebabCase(str)` | Convert to kebab-case |
| `snakeCase(str)` | Convert to snake_case |
| `truncate(str, length)` | Truncate string |
| `generateUUID()` | Generate UUID v4 |
| `slugify(str)` | Create URL-friendly slug |

### Number Utilities

| Function | Description |
|----------|-------------|
| `formatNumber(num)` | Format with thousand separators |
| `formatCurrency(num)` | Format as currency |
| `formatPercent(num)` | Format as percentage |
| `random(min, max)` | Random number in range |
| `clamp(num, min, max)` | Clamp to range |
| `round(num, precision)` | Round to precision |

### Date Utilities

| Function | Description |
|----------|-------------|
| `formatDate(date, format)` | Format date |
| `formatTime(date, format)` | Format time |
| `formatRelative(date)` | Relative time string |
| `addDays(date, days)` | Add days |
| `subtractDays(date, days)` | Subtract days |
| `isValidDate(date)` | Validate date |
| `parseDate(str)` | Parse date string |

## Best Practices

1. **Import only what you need** - Tree-shaking ensures unused code is eliminated
2. **Use type utilities** - Improve type safety with provided types
3. **Prevent mutations** - Use `deepClone` instead of direct assignment
4. **Validate inputs** - Use validation utilities before processing
5. **Handle storage carefully** - Wrap storage calls in try-catch for private browsing

## See Also

- [`@izhimu/seas-core`](./seas-core.md) - Core functionality library
- [`@izhimu/seas-mobile-core`](./seas-mobile-core.md) - Mobile-specific core library
