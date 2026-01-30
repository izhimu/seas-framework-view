## ADDED Requirements

### Requirement: Vite Library Mode configuration
所有包 MUST 使用 Vite Library Mode 进行构建，生成标准的 npm 分发包格式。

#### Scenario: Core package build configuration
- **WHEN** 开发人员配置 `@izhimu/seas-core` 包的构建
- **THEN** Vite 配置 MUST 启用 library 模式
- **AND** 输出格式 MUST 包含 ESM (`es`) 和 CJS (`cjs`) 两种格式
- **AND** MUST 自动生成 TypeScript 类型声明文件 (`declaration: true`)

#### Scenario: Feature package build configuration
- **WHEN** 开发人员配置功能包（如 `@izhimu/seas-security-view`）的构建
- **THEN** Vite 配置 MUST 启用 library 模式
- **AND** 输出目录 MUST 设置为 `dist/`
- **AND** MUST 配置 rollupOptions.output.preserveModules 为 true 以支持 tree-shaking

### Requirement: Dual format output
构建系统 MUST 同时生成 ESM 和 CJS 两种格式的产物，以兼容不同的构建工具和运行环境。

#### Scenario: ESM format generation
- **WHEN** 执行 `pnpm run build` 命令
- **THEN** 构建系统 MUST 生成 `.mjs` 或 `.js` (ESM format) 文件
- **AND** 文件 MUST 使用 ES Module 语法导出
- **AND** MUST 支持原生 ES Module 环境（如现代浏览器、Node.js ESM mode）

#### Scenario: CJS format generation
- **WHEN** 执行 `pnpm run build` 命令
- **THEN** 构建系统 MUST 生成 `.cjs` 文件
- **AND** 文件 MUST 使用 CommonJS `module.exports` 语法
- **AND** MUST 兼容旧版构建工具和 Node.js CommonJS mode

### Requirement: TypeScript declaration generation
构建系统 MUST 自动为所有导出的模块生成 TypeScript 类型声明文件。

#### Scenario: Declaration file generation
- **WHEN** 执行 `pnpm run build` 命令
- **THEN** 构建系统 MUST 为所有 `.ts` 和 `.vue` 文件生成 `.d.ts` 声明文件
- **AND** 声明文件 MUST 与编译产物位于相同的目录结构
- **AND** 声明文件 MUST 包含完整的类型信息

#### Scenario: Declaration file entry point
- **WHEN** TypeScript 项目引用该包
- **THEN** package.json 的 `types` 或 `typings` 字段 MUST 指向主声明文件
- **AND** IDE MUST 能够自动提供类型提示和自动补全

### Requirement: Source map generation
构建系统 MUST 生成 source map 文件，以便在开发和调试时能够定位到原始源码。

#### Scenario: Source map generation
- **WHEN** 执行 `pnpm run build` 命令
- **THEN** 构建系统 MUST 为所有编译产物生成对应的 `.map` 文件
- **AND** source map MUST 包含原始源码的完整路径信息
- **AND** MUST 支持在生产环境中通过 sourcemap 调试

### Requirement: Tree-shaking support
构建配置 MUST 优化打包产物，确保支持 tree-shaking，减少消费者的打包体积。

#### Scenario: Preserve modules output
- **WHEN** 配置 Vite library 模式
- **THEN** rollupOptions.output.preserveModules MUST 设置为 `true`
- **AND** 每个文件 MUST 作为独立的模块输出
- **AND** 消费者打包工具 SHOULD 能够按需引入使用的代码

#### Scenario: Side effects annotation
- **WHEN** 配置 package.json
- **THEN** MUST 添加 `sideEffects` 字段
- **AND** 对于纯模块（无副作用）MUST 设置为 `false`
- **AND** 对于有副作用的文件 MUST 显式声明数组

### Requirement: Build output validation
构建流程 MUST 验证生成的产物符合 npm 包的标准格式。

#### Scenario: Output directory structure
- **WHEN** 构建完成
- **THEN** `dist/` 目录 MUST 包含所有必需的文件
- **AND** MUST 包含至少一个 ESM 入口文件
- **AND** MUST 包含至少一个 CJS 入口文件
- **AND** MUST 包含对应的 `.d.ts` 类型声明文件

#### Scenario: Build error on missing files
- **WHEN** 构建完成后缺少必需的输出文件
- **THEN** 构建脚本 MUST 返回非零退出码
- **AND** MUST 在控制台输出清晰的错误信息
- **AND** MUST 阻止发布流程继续执行
