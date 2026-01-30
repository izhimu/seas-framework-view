## ADDED Requirements

### Requirement: Eliminate circular dependencies
包之间的依赖关系 MUST 是单向的，不允许存在循环依赖。

#### Scenario: Feature package independence
- **WHEN** 构建功能包（如 `@izhimu/seas-security-view`）
- **THEN** MUST 不依赖其他功能包（如 `seas-base-view`, `seas-ai-view`）
- **AND** MUST 只依赖 core 包（`@izhimu/seas-core`, `@izhimu/seas-common`）
- **AND** 依赖图 MUST 是有向无环图（DAG）

#### Scenario: Core package stability
- **WHEN** 构建 core 包（如 `@izhimu/seas-core`）
- **THEN** MUST 不依赖任何功能包
- **AND** core 包之间的依赖 MUST 单向（如 `seas-core` → `seas-common`）
- **AND** MUST 确保依赖树的最底层是稳定的

### Requirement: Peer dependencies for shared libraries
所有包共享的外部库 MUST 声明为 peerDependencies，由消费者项目提供。

#### Scenario: Vue framework as peer dependency
- **WHEN** 包需要使用 Vue
- **THEN** MUST 将 `vue` 声明为 peerDependency
- **AND** MUST 在 devDependencies 中保留 Vue 用于开发测试
- **AND** MUST 不将 Vue 打包进最终产物

#### Scenario: UI library as peer dependency
- **WHEN** 包需要使用 UI 库（如 `naive-ui`, `vant`）
- **THEN** MUST 将 UI 库声明为 peerDependency
- **AND** MUST 假设消费者项目已安装相同的 UI 库版本
- **AND** MUST 避免多个版本的 UI 库被打包

#### Scenario: Router and state management
- **WHEN** 包需要使用路由或状态管理库
- **THEN** MUST 将 `vue-router` 和 `pinia` 声明为 peerDependency
- **AND** MUST 假设消费者项目提供这些库的实例
- **AND** MUST 能够与消费者的路由和 store 集成

### Requirement: Optional dependencies for non-essential features
对于非必需的功能依赖，MUST 声明为 optionalDependencies 或 peerDependencies。

#### Scenario: Optional dependencies
- **WHEN** 包包含可选功能（如特定的图表库）
- **THEN** SHOULD 声明为 optionalDependencies
- **AND** 包代码 MUST 在依赖不存在时优雅降级
- **AND** MUST 在运行时检查依赖是否存在再使用

#### Scenario: Plugin dependencies
- **WHEN** 包是插件形式提供功能
- **THEN** SHOULD 依赖目标库作为 peerDependency
- **AND** MUST 通过插件机制集成，而非直接依赖
- **AND** MUST 允许消费者选择是否启用该功能

### Requirement: Dependency version alignment
同一依赖在不同包中的版本要求 MUST 兼容，避免版本冲突。

#### Scenario: Core dependencies alignment
- **WHEN** 多个包依赖同一个核心库（如 Vue）
- **THEN** peerDependencies 版本范围 MUST 保持一致
- **AND** SHOULD 使用宽泛的版本范围（如 `^3.0.0`）
- **AND** MUST 避免过窄的版本范围导致无法安装

#### Scenario: Workspace dependencies resolution
- **WHEN** 使用 pnpm workspace
- **THEN** 内部包依赖 MUST 使用 `workspace:*` 协议
- **AND** 发布时 MUST 自动解析为实际版本号
- **AND** MUST 确保本地开发和发布使用相同的依赖解析规则

### Requirement: Dependency decoupling validation
构建流程 MUST 验证包的依赖关系符合解耦要求。

#### Scenario: Circular dependency detection
- **WHEN** 执行构建前检查
- **THEN** 构建脚本 MUST 检测是否存在循环依赖
- **AND** 如果发现循环依赖 MUST 阻止构建并报错
- **AND** 错误信息 MUST 明确指出哪些包形成了循环

#### Scenario: Dependency graph analysis
- **WHEN** 执行依赖分析
- **THEN** MUST 生成依赖关系图
- **AND** MUST 标识出每个包的依赖深度
- **AND** MUST 报告违反解耦原则的依赖关系

#### Scenario: Peer dependencies validation
- **WHEN** 发布包到 npm
- **THEN** MUST 验证 peerDependencies 声明完整
- **AND** MUST 确保所有外部依赖都有版本范围
- **AND** MUST 检查 peerDependencies 与 devDependencies 版本一致性

### Requirement: Dependency injection for extensibility
对于需要与其他包集成的功能，SHOULD 使用依赖注入模式而非硬编码依赖。

#### Scenario: Router integration
- **WHEN** 功能包需要注册路由
- **THEN** SHOULD 提供路由配置对象供消费者导入
- **AND** MUST 不直接创建和操作路由实例
- **AND** MUST 允许消费者决定如何集成路由

#### Scenario: Store integration
- **WHEN** 功能包需要使用 Pinia store
- **THEN** SHOULD 导出 store 定义供消费者注册
- **AND** MUST 不假设 store 的命名空间
- **AND** MUST 支持消费者自定义 store 配置

#### Scenario: Plugin system
- **WHEN** 包提供可扩展的功能
- **THEN** SHOULD 实现插件系统
- **AND** MUST 定义清晰的插件接口
- **AND** MUST 允许消费者按需注册插件

### Requirement: Minimal runtime dependencies
包的运行时依赖 MUST 最小化，减少消费者的打包体积。

#### Scenario: Bundle size optimization
- **WHEN** 分析打包产物
- **THEN** SHOULD 只包含必需的代码
- **AND** MUST 避免重复打包已有依赖
- **AND** MUST 使用 tree-shaking 移除未使用代码

#### Scenario: Development dependencies isolation
- **WHEN** 区分开发和生产依赖
- **THEN** 开发工具（如 ESLint, Prettier）MUST 只在 devDependencies 中
- **AND** 构建工具 MUST 不被打包进运行时产物
- **AND** MUST 确保 dependencies 只包含运行时必需的包
