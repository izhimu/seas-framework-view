## ADDED Requirements

### Requirement: Standard npm package structure
发布到 npm 的包 MUST 遵循标准的 npm 包结构规范。

#### Scenario: Dist directory output
- **WHEN** 执行 `pnpm run build`
- **THEN** MUST 在包根目录生成 `dist/` 目录
- **AND** `dist/` 目录 MUST 包含所有编译后的 JavaScript 文件
- **AND** `dist/` 目录 MUST 包含所有 TypeScript 类型声明文件
- **AND** `dist/` 目录 MUST 包含所有 source map 文件

#### Scenario: Package.json main fields
- **WHEN** 配置 package.json
- **THEN** MUST 设置 `main` 字段指向 CJS 入口（如 `"dist/index.cjs"`）
- **AND** MUST 设置 `module` 字段指向 ESM 入口（如 `"dist/index.js"`）
- **AND** MUST 设置 `types` 字段指向类型声明（如 `"dist/index.d.ts"`）
- **AND** MUST 设置 `exports` 字段定义所有导出路径

#### Scenario: Files included in distribution
- **WHEN** 发布到 npm
- **THEN** package.json 的 `files` 字段 MUST 包含 `"dist"`
- **AND** MUST 包含 `"package.json"`
- **AND** MUST 包含 `"README.md"`（如果存在）
- **AND** MUST 包含 `"LICENSE"`
- **AND** MUST 不包含源代码目录（`src/`）

### Requirement: Compiled JavaScript artifacts
生成的 JavaScript 文件 MUST 经过编译和优化，符合生产环境要求。

#### Scenario: Transpiled code compatibility
- **WHEN** 生成 JavaScript 产物
- **THEN** MUST 将 TypeScript 编译为 JavaScript
- **AND** MUST 保持 ES2020 或更高版本的语法特性
- **AND** MUST 支持所有主流现代浏览器和 Node.js 版本

#### Scenario: Code minification
- **WHEN** 执行生产构建
- **THEN** SHOULD 对产物进行压缩混淆
- **AND** MUST 保留可读性的 sourcemap
- **AND** 可选提供未压缩版本用于调试

#### Scenario: Vue SFC compilation
- **WHEN** 编译 `.vue` 单文件组件
- **THEN** MUST 将 template 编译为 render 函数
- **AND** MUST 将 style 编译为独立的 CSS 文件或内联到 JS
- **AND** MUST 保留组件的响应式特性

### Requirement: TypeScript declaration files
类型声明文件 MUST 为所有导出的内容提供完整的类型信息。

#### Scenario: Declaration file generation
- **WHEN** 执行构建
- **THEN** MUST 为所有 `.ts` 文件生成对应的 `.d.ts` 文件
- **AND** MUST 为所有 `.vue` 文件生成对应的 `.d.ts` 文件
- **AND** 类型声明文件 MUST 与源码目录结构一致

#### Scenario: Declaration file content
- **WHEN** 生成类型声明文件
- **THEN** MUST 导出所有公共 API 的类型
- **AND** MUST 包含函数签名的完整类型信息
- **AND** MUST 包含组件 props 的类型定义
- **AND** MUST 导出所有公共类型和接口

#### Scenario: Declaration file bundling
- **WHEN** 处理类型声明文件
- **THEN** 应该将所有 `.d.ts` 文件打包到统一的入口文件
- **AND** 可以选择保持每个文件独立（preserveModules）
- **AND** MUST 确保类型声明文件可以被 TypeScript 正确解析

### Requirement: Source maps for debugging
每个编译产物 MUST 配套生成 source map 文件。

#### Scenario: Source map generation
- **WHEN** 执行构建
- **THEN** MUST 为每个 `.js` 文件生成对应的 `.js.map` 文件
- **AND** source map MUST 包含原始源码的完整路径
- **AND** source map MUST 使用标准的 Source Map v3 格式

#### Scenario: Inline source maps (optional)
- **WHEN** 开发调试场景
- **THEN** 可选提供内联 source map（data URL）
- **AND** 内联 source map MUST 仅用于开发环境
- **AND** 生产环境 SHOULD 使用外部 .map 文件

#### Scenario: Source map hosting
- **WHEN** 部署生产环境
- **THEN** source map 文件 SHOULD 部署到独立的位置
- **AND** 可以选择不上传 source map 到生产服务器
- **AND** MUST 确保错误追踪系统能够访问 source map

### Requirement: Package.json configuration for distribution
package.json MUST 包含正确的配置以支持 npm 包的分发。

#### Scenario: Package metadata
- **WHEN** 配置 package.json
- **THEN** MUST 包含 `name` 字段（包名，带作用域如 `@izhimu/xxx`）
- **AND** MUST 包含 `version` 字段（遵循语义化版本）
- **AND** MUST 包含 `description` 字段（包描述）
- **AND** MUST 包含 `author` 字段（作者信息）
- **AND** MUST 包含 `license` 字段（许可证类型）

#### Scenario: Entry points configuration
- **WHEN** 配置入口点
- **THEN** MUST 配置 `main` 字段用于 CommonJS 环境
- **AND** MUST 配置 `module` 字段用于 ESM 环境
- **AND** MUST 配置 `types` 字段用于 TypeScript
- **AND** SHOULD 配置 `exports` 字段提供完整的导出定义

#### Scenario: Exports field definition
- **WHEN** 使用 `exports` 字段
- **THEN** MUST 定义主入口 `.` 的导出
- **AND** MUST 为每个子路径定义条件导出
- **AND** MUST 包含 `import`, `require`, `types` 条件
- **AND** MUST 禁止访问未显式声明的路径

#### Scenario: Side effects annotation
- **WHEN** 配置 `sideEffects` 字段
- **THEN** MUST 根据包的特性设置正确的值
- **AND** 对于纯模块包 MUST 设置为 `false`
- **AND** 对于有副作用的文件 MUST 列出这些文件的数组
- **AND** MUST 确保打包工具能够正确进行 tree-shaking

### Requirement: README and documentation
每个包 MUST 包含清晰的文档说明如何使用。

#### Scenario: README.md inclusion
- **WHEN** 发布包
- **THEN** SHOULD 包含 `README.md` 文件
- **AND** README MUST 包含包的简介和特性说明
- **AND** README MUST 包含安装和使用示例
- **AND** README MUST 包含 API 文档链接

#### Scenario: CHANGELOG.md maintenance
- **WHEN** 发布新版本
- **THEN** SHOULD 维护 `CHANGELOG.md` 文件
- **AND** MUST 记录每个版本的变更内容
- **AND** MUST 遵循 Keep a Changelog 格式
- **AND** MUST 明确标注 BREAKING CHANGES

### Requirement: Publishing workflow validation
发布流程 MUST 验证包的正确性后再发布到 npm。

#### Scenario: Pre-publish validation
- **WHEN** 执行发布命令
- **THEN** MUST 先执行构建生成 `dist/` 目录
- **AND** MUST 验证所有必需的输出文件存在
- **AND** MUST 验证 package.json 配置正确
- **AND** MUST 运行测试套件确保功能正常

#### Scenario: Version management
- **WHEN** 发布新版本
- **THEN** MUST 遵循语义化版本规范（SemVer）
- **AND** MUST 在 package.json 中更新 version 字段
- **AND** 应该使用 git tag 标记版本
- **AND** MUST 自动生成 CHANGELOG

#### Scenario: Dry-run before publish
- **WHEN** 执行发布流程
- **THEN** SHOULD 先执行 `npm publish --dry-run` 验证
- **AND** dry-run MUST 模拟真实的发布过程
- **AND** MUST 在 dry-run 成功后再执行实际发布
- **AND** MUST 防止发布错误的包到 npm

### Requirement: Artifacts quality assurance
生成的包产物 MUST 通过质量检查。

#### Scenario: Bundle size validation
- **WHEN** 执行构建
- **THEN** SHOULD 报告产物的打包大小
- **AND** MUST 确保产物体积在合理范围内
- **AND** 应该比较不同版本的体积变化
- **AND** MUST 识别和移除不必要的依赖

#### Scenario: Dependency tree validation
- **WHEN** 分析产物依赖
- **THEN** MUST 确保不包含 devDependencies
- **AND** MUST 确保 peerDependencies 未被打包
- **AND** MUST 验证所有依赖都是必需的
- **AND** MUST 检查是否有重复的依赖

#### Scenario: TypeScript compilation check
- **WHEN** 生成类型声明
- **THEN** MUST 使用 tsc 进行类型检查
- **AND** MUST 确保没有类型错误
- **AND** MUST 验证类型声明文件可以被其他项目使用
- **AND** MUST 确保 `strict` 模式下类型检查通过
