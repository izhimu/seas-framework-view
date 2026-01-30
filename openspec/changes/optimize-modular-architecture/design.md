## Context

### Current State

当前项目采用 pnpm monorepo 架构，包含以下包结构：

**Core 包：**
- `@izhimu/seas-common` - 公共工具和类型
- `@izhimu/seas-core` - PC 端核心框架
- `@izhimu/seas-mobile-core` - 移动端核心框架

**Feature 包（packages/）：**
- `@izhimu/seas-base-view` - 基础功能（账户、角色、菜单等）
- `@izhimu/seas-security-view` - 安全管理
- `@izhimu/seas-storage-view` - 存储管理
- `@izhimu/seas-job-view` - 任务管理
- `@izhimu/seas-healthy-view` - 健康检查
- `@izhimu/seas-generate-view` - 代码生成
- `@izhimu/seas-mqtt-view` - MQTT 消息
- `@izhimu/seas-ai-view` - AI 功能
- `@izhimu/seas-form-view` - 表单组件

**Mobile Feature 包（packages-mobile/）：**
- `@izhimu/seas-security-mobile-view` - 移动端安全管理

### Current Issues

1. **入口点问题**：所有包的 `package.json` 中 `main: "src/index.ts"` 直接指向 TypeScript 源码
2. **构建配置问题**：Vite 配置未启用 library 模式，缺少标准的构建输出
3. **依赖耦合问题**：功能包之间存在依赖（如 `seas-base-view` 依赖 `seas-security-view`）
4. **Tree-shaking 不足**：未配置多入口点导出，无法实现细粒度的按需引入
5. **类型声明缺失**：未自动生成 `.d.ts` 文件

### Constraints

- **向后兼容**：需要保持现有 API 导入方式不变，避免破坏性升级
- **渐进式迁移**：大量现有代码依赖当前架构，需要分阶段实施
- **Monorepo 结构**：保持 pnpm workspace 结构，不改变包组织方式
- **技术栈**：Vue 3 + TypeScript + Vite + Naive UI/Vant

## Goals / Non-Goals

**Goals:**
- 实现符合 npm 标准的分发包格式，包含编译后的 JS、类型声明和 sourcemap
- 支持 ESM + CJS 双格式输出，兼容不同的构建工具和运行环境
- 实现真正的按需引入，支持子路径导出（如 `/components`, `/hooks`）
- 解除功能包之间的循环依赖，确保每个包可独立使用
- 优化 tree-shaking 支持，减少消费者项目的打包体积
- 自动生成完整的 TypeScript 类型声明文件
- 建立规范的发布前验证流程

**Non-Goals:**
- 不改变 Vue 3 + TypeScript + Vite 的技术栈
- 不重构组件的内部实现逻辑（仅调整导出和构建方式）
- 不修改 core 包之间的依赖关系（seas-core → seas-common）
- 不实现运行时动态加载（保持编译时的模块解析）
- 不迁移到其他构建工具（继续使用 Vite）

## Decisions

### 1. Vite Library Mode 配置

**Decision:** 使用 Vite 的 Library Mode 作为所有包的构建配置

**Rationale:**
- **原生支持**：Vite 官方提供的库模式构建方案，无需额外插件
- **双格式输出**：原生支持 ESM 和 CJS 双格式，配置简单
- **类型声明生成**：集成 `vue-tsc` 自动生成 `.d.ts` 文件
- **Tree-shaking 优化**：支持 `preserveModules` 选项，保持模块结构
- **Rollup 集成**：底层使用 Rollup，提供强大的打包优化能力

**Alternatives Considered:**
- **Rollup 直接配置**：更底层但配置复杂度更高，失去了 Vite 的开发体验
- **tsup**：专注于 TypeScript 库构建，但对 Vue SFC 支持不如 Vite
- **unbuild**：更快的构建速度，但生态和文档不如 Vite 成熟

**Implementation:**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SeasBaseView',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['vue', 'naive-ui', 'vue-router', 'pinia'],
      output: {
        preserveModules: true, // 保持模块结构支持 tree-shaking
        globals: { vue: 'Vue' }
      }
    },
    // 自动生成类型声明
    emptyOutDir: true,
    // 生成 sourcemap
    sourcemap: true
  }
})
```

### 2. 多入口点导出策略

**Decision:** 使用 package.json 的 `exports` 字段配置多入口点，结合文件系统目录结构

**Rationale:**
- **标准方案**：Node.js 和 npm 生态推荐的子路径导出方式
- **类型安全**：TypeScript 原生支持，能够正确解析子路径类型
- **Tree-shaking**：配合 `preserveModules` 实现最佳优化效果
- **访问控制**：未在 `exports` 中声明的路径无法访问，保护内部实现

**Alternatives Considered:**
- **单一入口点**：所有导出通过主入口，但无法实现细粒度的 tree-shaking
- **多个独立包**：每个模块作为独立包发布，但增加维护复杂度和版本管理成本
- **Babel 插件**：通过编译时转换实现子路径导入，但增加构建复杂度

**Implementation:**

目录结构：
```
@izhimu/seas-base-view/
├── src/
│   ├── index.ts           # 主入口
│   ├── components/
│   │   └── index.ts       # 组件入口
│   ├── hooks/
│   │   └── index.ts       # hooks 入口
│   ├── utils/
│   │   └── index.ts       # 工具函数入口
│   ├── stores/
│   │   └── index.ts       # stores 入口
│   └── entities/
│       └── index.ts       # 类型定义入口
└── package.json
```

package.json 配置：
```json
{
  "name": "@izhimu/seas-base-view",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./components": {
      "import": "./dist/components/index.js",
      "require": "./dist/components/index.cjs",
      "types": "./dist/components/index.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks/index.js",
      "require": "./dist/hooks/index.cjs",
      "types": "./dist/hooks/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils/index.js",
      "require": "./dist/utils/index.cjs",
      "types": "./dist/utils/index.d.ts"
    },
    "./stores": {
      "import": "./dist/stores/index.js",
      "require": "./dist/stores/index.cjs",
      "types": "./dist/stores/index.d.ts"
    },
    "./entities": {
      "import": "./dist/entities/index.js",
      "require": "./dist/entities/index.cjs",
      "types": "./dist/entities/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false
}
```

### 3. 依赖解耦方案

**Decision:** 功能包只依赖 core 包，使用 peerDependencies 管理共享外部库

**Rationale:**
- **依赖单一方向**：feature packages → core packages，避免循环依赖
- **减少重复打包**：通过 peerDependencies 确保共享库只被打包一次
- **版本兼容性**：由消费者项目控制共享库的版本，避免版本冲突
- **包体积优化**：不打包外部依赖，显著减少产物体积

**Current Dependencies to Fix:**
```json
// seas-base-view/package.json - CURRENT (WRONG)
{
  "devDependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-security-view": "workspace:*",  // ❌ Circular dependency
    "@izhimu/seas-ai-view": "workspace:*"         // ❌ Unnecessary dependency
  }
}
```

**Target Dependencies:**
```json
// seas-base-view/package.json - TARGET (CORRECT)
{
  "dependencies": {
    "@izhimu/seas-core": "workspace:*",
    "@izhimu/seas-common": "workspace:*"
  },
  "peerDependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.0.0",
    "pinia": "^3.0.0",
    "naive-ui": "^2.40.0"
  },
  "devDependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.5.1",
    "pinia": "^3.0.2",
    "naive-ui": "^2.41.0"
  }
}
```

**Migration Steps:**
1. 从所有 feature 包的 `devDependencies` 中移除其他 feature 包的依赖
2. 将所有外部库（Vue, Vue Router, Pinia, Naive UI 等）移至 `peerDependencies`
3. 在 `devDependencies` 中保留这些库用于开发测试
4. 更新代码，移除对其他 feature 包的直接导入

### 4. 构建脚本和发布流程

**Decision:** 在 package.json 中添加预发布验证脚本，确保构建产物正确

**Rationale:**
- **自动化验证**：在发布前自动检查构建产物的完整性
- **防止错误发布**：避免发布未构建或构建失败的包
- **CI/CD 集成**：可以在 CI 流水线中自动执行验证

**Implementation:**
```json
// package.json
{
  "scripts": {
    "build": "vite build && vue-tsc --emitDeclarationOnly",
    "build:watch": "vite build --watch",
    "prepublishOnly": "pnpm run build && pnpm run check-dist",
    "check-dist": "node scripts/check-dist.js"
  }
}
```

验证脚本：
```javascript
// scripts/check-dist.js
import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/index.d.ts'
];

const missingFiles = requiredFiles.filter(file => {
  return !fs.existsSync(path.resolve(file));
});

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:', missingFiles);
  process.exit(1);
}

console.log('✅ All required files present');
```

### 5. 类型声明生成策略

**Decision:** 使用 `vue-tsc` 生成类型声明，配合 Vite 的构建流程

**Rationale:**
- **Vue SFC 支持**：`vue-tsc` 是官方工具，对 `.vue` 文件有完整的类型支持
- **集成构建**：可以在构建脚本中自动执行，无需手动操作
- **准确性**：基于 TypeScript 编译器，生成的类型声明准确可靠

**Alternatives Considered:**
- **Vite 插件自动生成**：使用 `vite-plugin-dts`，但配置相对复杂
- **手动维护**：不推荐，容易遗漏和出错

**Implementation:**
```json
// package.json
{
  "scripts": {
    "build": "vite build && vue-tsc --emitDeclarationOnly --outDir dist"
  }
}
```

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs']
    }
  }
})
```

### 6. 向后兼容性保证

**Decision:** 同时保留 `main`、`module`、`types` 字段和 `exports` 字段

**Rationale:**
- **兼容旧工具**：`main` 和 `module` 字段确保旧版构建工具能够正常工作
- **支持新标准**：`exports` 字段提供现代化的导出控制
- **渐进式升级**：消费者项目无需修改导入代码，平滑过渡

**Implementation:**
```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

解析优先级：`exports` > `module` > `main`

### 7. Source Map 生成策略

**Decision:** 在生产构建中生成外部 sourcemap 文件

**Rationale:**
- **调试支持**：消费者在生产环境中遇到问题时可以进行调试
- **错误追踪**：Sentry 等错误追踪工具可以使用 sourcemap 还原原始堆栈
- **安全性**：sourcemap 文件可以选择性部署，不暴露在 CDN 上

**Implementation:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: true, // 生成外部 .map 文件
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true // 不在 sourcemap 中包含源码内容
      }
    }
  }
})
```

## Risks / Trade-offs

### Risk 1: 破坏性变更影响现有消费者
**Risk**：将入口从 `src/index.ts` 改为 `dist/` 可能破坏现有消费者的导入方式

**Mitigation:**
- 同时保留 `main`、`module`、`types` 字段和 `exports` 字段，确保向后兼容
- 发布 major 版本更新（如 v2.0.0），明确告知 Breaking Changes
- 提供详细的迁移指南和示例代码
- 在变更说明中列出所有破坏性变更和迁移步骤

### Risk 2: 构建时间增加
**Risk**：生成双格式输出和类型声明会增加构建时间

**Mitigation:**
- 使用 `vite build --watch` 在开发时增量构建
- CI/CD 中使用缓存加速构建
- 只在发布前执行完整构建
- 考虑使用 `esbuild` 加速 TypeScript 编译

### Risk 3: PeerDependencies 版本冲突
**Risk**：将外部库改为 peerDependencies 后，消费者项目可能遇到版本冲突

**Mitigation:**
- 使用宽泛的版本范围（如 `^3.0.0`）提高兼容性
- 在文档中明确说明所需的版本范围
- 提供版本兼容性检查工具
- 在 README 中添加 peerDependencies 版本要求说明

### Risk 4: 类型声明生成失败
**Risk**：`vue-tsc` 可能在某些情况下无法生成正确的类型声明

**Mitigation:**
- 在 CI 中添加类型检查步骤，确保类型声明生成成功
- 使用 `strictNullChecks` 等严格模式确保类型准确
- 手动维护复杂的类型声明（如果自动生成失败）
- 提供类型测试用例验证类型声明的正确性

### Risk 5: Tree-shaking 效果不佳
**Risk**：即使配置了多入口点，某些依赖可能无法被正确 tree-shaking

**Mitigation:**
- 使用 `sideEffects: false` 标记纯模块
- 为有副作用的文件显式声明 `sideEffects` 数组
- 使用 `rollupOptions.output.preserveModules: true` 保持模块结构
- 测试和验证打包体积，分析未使用的依赖

### Trade-off 1: 包体积 vs 开发体验
**Trade-off**：使用 peerDependencies 减少了包体积，但增加了消费者的安装复杂度

**Decision**：选择 peerDependencies，因为：
- 减少 50%+ 的包体积（不打包 Vue、UI 库等）
- 消费者通常已经安装这些共享库
- 符合现代前端库的最佳实践

### Trade-off 2: 构建复杂度 vs 运行时性能
**Trade-off**：多入口点增加了构建配置复杂度，但提供了更好的运行时性能

**Decision**：选择多入口点，因为：
- 一次性配置，长期受益
- 显著减少消费者的打包体积
- 提供更好的 tree-shaking 效果

## Migration Plan

### Phase 1: 基础设施准备 (Week 1)

**目标**：建立构建配置和验证流程

**任务**：
1. 创建统一的 Vite Library Mode 配置模板
2. 添加类型声明生成脚本
3. 实现构建产物验证脚本
4. 更新根 package.json 的构建脚本

**验证标准**：
- 能够成功构建一个示例包
- 生成的产物包含所有必需的文件（.js, .cjs, .d.ts, .map）
- 验证脚本能够正确检测缺失的文件

### Phase 2: Core 包迁移 (Week 2)

**目标**：迁移 core 包（seas-common, seas-core, seas-mobile-core）

**任务**：
1. 更新 core 包的 vite.config.ts
2. 更新 core 包的 package.json 配置
3. 调整 core 包的导出结构（支持子路径）
4. 运行构建验证
5. 在 monorepo 内部测试 core 包的使用

**验证标准**：
- core 包能够成功构建
- core 包的类型声明正确生成
- 其他包能够正常导入和使用 core 包

### Phase 3: Feature 包迁移 (Week 3-4)

**目标**：迁移所有 feature 包，解除循环依赖

**任务**：
1. 分析 feature 包之间的依赖关系图
2. 移除 feature 包之间的相互依赖
3. 更新每个 feature 包的 vite.config.ts
4. 更新每个 feature 包的 package.json
5. 配置 peerDependencies
6. 重新组织导出结构（components, hooks, utils 等）
7. 运行构建验证

**验证标准**：
- 所有 feature 包能够成功构建
- 不存在 feature 包之间的依赖
- 包体积显著减少（不打包外部依赖）
- 子路径导入正常工作

### Phase 4: 测试和验证 (Week 5)

**目标**：全面测试迁移后的包

**任务**：
1. 创建消费者测试项目
2. 测试各种导入方式（主入口、子路径、命名导出）
3. 测试 tree-shaking 效果
4. 测试类型提示和自动补全
5. 测试打包后的运行时行为
6. 性能测试（包体积、加载时间）

**验证标准**：
- 所有导入方式正常工作
- Tree-shaking 能够正确移除未使用的代码
- TypeScript 类型提示准确
- 运行时行为正常，无错误

### Phase 5: 文档和发布 (Week 6)

**目标**：更新文档并发布新版本

**任务**：
1. 更新 README.md，说明新的导入方式
2. 编写迁移指南（从旧版本升级）
3. 更新 CHANGELOG.md
4. 执行预发布验证
5. 发布到 npm registry
6. 通知消费者升级

**验证标准**：
- 文档清晰准确，包含示例代码
- 迁移指南详细易懂
- 发布流程顺利完成
- 消费者能够成功安装和使用新版本

### Rollback Strategy

如果发布后出现严重问题：

1. **立即回退**：从 npm 撤回新版本（如果可能）
2. **发布补丁**：快速修复问题并发布 patch 版本
3. **保留旧版本**：在 npm 上保留旧版本，允许消费者继续使用
4. **文档更新**：在文档中说明已知问题和解决方案
5. **分支维护**：创建 LTS 分支维护旧版本

## Open Questions

### Q1: 是否需要同时支持 Vue 2 和 Vue 3？
**Status**: ❌ 已解决

**Decision**: 只支持 Vue 3

**Rationale**:
- 项目已经完全迁移到 Vue 3
- Vue 2 已停止维护（2023年12月31日）
- 简化依赖管理，减少维护成本

### Q2: 如何处理移动端和 PC 端包的共享代码？
**Status**: ⚠️ 待讨论

**Options**:
1. 将共享代码提取到 `seas-common` 中
2. 创建新的 `@izhimu/seas-shared` 包
3. 保持当前的移动端和 PC 端包独立，通过复制代码共享

**Recommendation**: Option 1 - 将共享代码提取到 `seas-common`

**Reason**:
- 避免代码重复
- 统一维护和更新
- 减少 bug 修复的工作量

### Q3: 是否需要提供 UMD 格式？
**Status**: ❌ 已解决

**Decision**: 不提供 UMD 格式

**Rationale**:
- 目标用户是现代前端项目（使用打包工具）
- UMD 格式体积较大，不符合优化目标
- CDN 直接引入的使用场景较少

### Q4: 如何处理 CSS 文件的导出？
**Status**: ⚠️ 待讨论

**Options**:
1. 将 CSS 内联到 JS 中（Vite 默认行为）
2. 单独导出 CSS 文件（如 `./style.css`）
3. 使用 CSS-in-JS，不单独导出样式

**Recommendation**: Option 2 - 单独导出 CSS 文件

**Reason**:
- 允许消费者按需引入样式
- 支持样式自定义和覆盖
- 更好的缓存策略

### Q5: 是否需要提供完整的组件库文档站点？
**Status**: ⚠️ 待讨论

**Options**:
1. 使用 VitePress 搭建文档站点
2. 使用 Storybook 展示组件
3. 只在 README 中提供简单的使用示例

**Recommendation**: Option 1 - 使用 VitePress 搭建文档站点

**Reason**:
- 提供更好的用户体验
- 支持组件预览和交互式示例
- 便于维护和更新文档
- VitePress 与现有技术栈一致
