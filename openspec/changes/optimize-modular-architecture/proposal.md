## Why

当前项目的模块化架构存在多个不符合主流前端库标准的问题。包的入口直接指向 TypeScript 源码(`src/index.ts`)，导致消费者项目必须自行编译，无法直接使用构建产物。各功能包之间存在紧耦合（如 `seas-base-view` 依赖 `seas-security-view`），无法实现真正的按需引入。这违背了现代前端模块化开发的最佳实践，增加了使用成本和维护复杂度。

## What Changes

- **BREAKING**: 重新配置所有包的构建输出，从 `src/index.ts` 改为编译后的 `dist/` 目录
- **BREAKING**: 解除功能包之间的循环依赖，使每个包可独立引入
- 添加 Vite Library Mode 构建配置，支持 ESM + CJS 双格式输出
- 自动生成 TypeScript 类型声明文件（`.d.ts`）
- 配置多入口点导出（如 `/components`, `/hooks`, `/utils`）支持更细粒度的 tree-shaking
- 优化 package.json 配置，添加 `exports`, `types`, `main`, `module` 等标准字段
- 重构包之间的依赖关系，将共享依赖声明为 peerDependencies

## Capabilities

### New Capabilities
- `library-build-system`: 统一的库模式构建配置，支持所有包生成标准的 npm 分发格式
- `modular-entry-points`: 多入口点导出系统，支持按需引入组件、hooks、工具函数等
- `dependency-decoupling`: 依赖解耦方案，确保包之间的松耦合和独立性
- `distribution-package-format`: 标准的分发包格式，包含编译产物、类型声明和 sourcemap

### Modified Capabilities
- None (当前项目尚无正式的 spec 定义)

## Impact

**影响的代码范围:**
- 所有 `core/*`, `packages/*`, `packages-mobile/*` 目录下的包
- 所有包的 `vite.config.ts` 构建配置
- 所有包的 `package.json` 配置
- 包的入口文件 `src/index.ts` 导出结构

**API 变更:**
- 包的导入路径将保持兼容，但内部实现会从源码改为编译产物
- 支持更细粒度的导入路径（如 `@izhimu/seas-base-view/components`）

**依赖变更:**
- 将部分 dependencies 调整为 peerDependencies
- 消除包之间的循环依赖
- 确保依赖版本声明准确

**构建和发布流程:**
- 发布前必须执行 `pnpm run build` 生成 `dist/` 目录
- 发布内容将包含编译后的 JS、类型声明和 sourcemap
- 不再直接发布 TypeScript 源码

**消费者影响:**
- 消费者项目无需自行编译，可直接使用构建产物
- 支持更好的 tree-shaking，减少打包体积
- 导入方式保持兼容，但新增子路径导入选项
