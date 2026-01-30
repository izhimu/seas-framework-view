## ADDED Requirements

### Requirement: Multi-level entry points
包 MUST 支持多层级入口点导出，允许消费者按需导入特定功能模块。

#### Scenario: Main entry point
- **WHEN** 消费者导入包的主入口 `@izhimu/seas-base-view`
- **THEN** MUST 能够导入所有公共导出的内容
- **AND** MUST 支持命名导出（named exports）
- **AND** MUST 支持默认导出（default export）

#### Scenario: Sub-path entry points
- **WHEN** 消费者导入子路径 `@izhimu/seas-base-view/components`
- **THEN** MUST 只导入 components 模块的内容
- **AND** MUST 不包含其他无关模块的代码
- **AND** tree-shaking MUST 能够移除未使用的代码

#### Scenario: Deep sub-path entry points
- **WHEN** 消费者导入深层子路径 `@izhimu/seas-base-view/components/Button`
- **THEN** MUST 只导入 Button 组件
- **AND** MUST 不包含 components 目录下其他组件的代码
- **AND** 打包体积 MUST 最小化

### Requirement: Package exports configuration
package.json MUST 使用 `exports` 字段定义导出路径，提供精确的子路径导入控制。

#### Scenario: Exports field configuration
- **WHEN** 配置 package.json
- **THEN** MUST 包含 `exports` 字段
- **AND** MUST 定义主入口 `"."` 指向编译产物
- **AND** MUST 定义子路径如 `"./components"`, `"./hooks"`, `"./utils"`
- **AND** 每个导出 MUST 指定 ESM 和 CJS 两种格式的路径

#### Scenario: Conditional exports for environments
- **WHEN** 消费者在不同环境中导入
- **THEN** `exports` 字段 MUST 支持条件导出
- **AND** MUST 支持 `import` 条件用于 ESM 环境
- **AND** MUST 支持 `require` 条件用于 CJS 环境
- **AND** MUST 支持 `types` 条件用于类型声明

#### Scenario: Restricting internal paths
- **WHEN** 配置 `exports` 字段
- **THEN** 未在 `exports` 中显式声明的路径 MUST 被禁止访问
- **AND** 消费者尝试导入内部路径（如 `./src/internal`）MUST 抛出错误
- **AND** MUST 防止意外导入内部实现细节

### Requirement: Categorized exports organization
导出路径 MUST 按照功能分类组织，包括 components、hooks、utils、stores、entities 等。

#### Scenario: Components exports
- **WHEN** 消费者导入 `@izhimu/seas-package/components`
- **THEN** MUST 能够导入所有公共 Vue 组件
- **AND** 组件 MUST 支持 Vue 的 `app.component()` 全局注册
- **AND** 组件 MUST 支持按需导入

#### Scenario: Hooks exports
- **WHEN** 消费者导入 `@izhimu/seas-package/hooks`
- **THEN** MUST 能够导入所有公共 Vue Composition API hooks
- **AND** hooks MUST 可以独立使用，不依赖其他模块
- **AND** 每个 hook MUST 有完整的 TypeScript 类型定义

#### Scenario: Utils exports
- **WHEN** 消费者导入 `@izhimu/seas-package/utils`
- **THEN** MUST 能够导入所有公共工具函数
- **AND** 工具函数 MUST 是纯函数（无副作用）
- **AND** 工具函数 MUST 可以在任何 Vue 项目中使用

#### Scenario: Stores exports
- **WHEN** 消费者导入 `@izhimu/seas-package/stores`
- **THEN** MUST 能够导入所有公共 Pinia stores
- **AND** stores MUST 包含完整的类型定义
- **AND** stores MUST 支持独立实例化

#### Scenario: Entities exports
- **WHEN** 消费者导入 `@izhimu/seas-package/entities`
- **THEN** MUST 能够导入所有 TypeScript 类型定义和接口
- **AND** entities MUST 不包含任何运行时代码
- **AND** entities MUST 可以用于类型注解

### Requirement: Entry point file structure
每个入口点 MUST 有独立的入口文件，管理该模块的导出。

#### Scenario: Main index.ts
- **WHEN** 构建主入口点
- **THEN** `src/index.ts` MUST 导出所有公共 API
- **AND** MUST 重新导出子模块的内容（如 `export * from './components'`）
- **AND** MUST 包含完整的类型导出

#### Scenario: Sub-path index files
- **WHEN** 构建子路径入口点
- **THEN** 每个子目录（如 `src/components/`）MUST 包含 `index.ts`
- **AND** 子路径的 `index.ts` MUST 只导出该模块的内容
- **AND** MUST 支持相对路径导入

#### Scenario: Barrel exports pattern
- **WHEN** 组织导出内容
- **THEN** SHOULD 使用 barrel exports（桶导出）模式
- **AND** 入口文件 MUST 聚合并重新导出子模块的内容
- **AND** MUST 保持导入路径的简洁性

### Requirement: Backward compatibility
导出配置 MUST 保持向后兼容，不破坏现有的导入方式。

#### Scenario: Legacy main field support
- **WHEN** 旧版构建工具使用 `main` 字段
- **THEN** package.json MUST 继续包含 `main` 字段
- **AND** `main` MUST 指向 CJS 格式的产物
- **AND** MUST 确保旧项目能够正常使用

#### Scenario: Legacy module field support
- **WHEN** 构建工具使用 `module` 字段
- **THEN** package.json MUST 继续包含 `module` 字段
- **AND** `module` MUST 指向 ESM 格式的产物
- **AND** MUST 确保支持 ESM 的打包工具能够正确识别

### Requirement: TypeScript types resolution
导出配置 MUST 确保 TypeScript 能够正确解析类型声明。

#### Scenario: Types field configuration
- **WHEN** 配置 package.json
- **THEN** MUST 包含 `types` 或 `typings` 字段
- **AND** `types` MUST 指向主类型声明文件
- **AND** 类型声明文件 MUST 与 JavaScript 产物对应

#### Scenario: Sub-path types resolution
- **WHEN** TypeScript 解析子路径导入
- **THEN** MUST 能够自动找到对应的 `.d.ts` 文件
- **AND** `exports` 字段中的每个条件导出 MUST 包含 `types` 字段
- **AND** IDE MUST 能够提供准确的类型提示
