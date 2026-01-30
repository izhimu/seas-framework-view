## 1. Phase 1: 基础设施准备

### 1.1 创建构建工具和脚本

- [ ] 1.1.1 创建统一的 Vite Library Mode 配置模板文件 `templates/vite.config.library.ts`
- [ ] 1.1.2 创建构建产物验证脚本 `scripts/check-dist.js`
- [ ] 1.1.3 创建依赖分析脚本 `scripts/analyze-deps.js`
- [ ] 1.1.4 创建循环依赖检测脚本 `scripts/check-circular-deps.js`
- [ ] 1.1.5 更新根 package.json 添加统一的构建脚本命令

### 1.2 配置 TypeScript 编译

- [ ] 1.2.1 更新根目录 `tsconfig.json` 添加类型声明生成配置
- [ ] 1.2.2 配置 `vue-tsc` 编译选项（emitDeclarationOnly, outDir）
- [ ] 1.2.3 添加 TypeScript 严格模式配置（strictNullChecks）
- [ ] 1.2.4 创建类型验证脚本 `scripts/check-types.ts`

### 1.3 建立验证流程

- [ ] 1.3.1 创建预发布验证脚本 `scripts/prepublish-check.sh`
- [ ] 1.3.2 配置 package.json 的 `prepublishOnly` 钩子
- [ ] 1.3.3 创建包体积分析脚本 `scripts/bundle-size-report.js`
- [ ] 1.3.4 编写构建流程文档 `docs/BUILD_PROCESS.md`

## 2. Phase 2: Core 包迁移

### 2.1 迁移 @izhimu/seas-common

- [ ] 2.1.1 更新 `core/seas-common/vite.config.ts` 启用 Library Mode
- [ ] 2.1.2 更新 `core/seas-common/package.json` 配置入口点和 exports
- [ ] 2.1.3 重新组织 `core/seas-common/src/` 导出结构（index.ts, utils/, types/）
- [ ] 2.1.4 配置 external 依赖（如果有的话）
- [ ] 2.1.5 执行构建并验证输出文件（.js, .cjs, .d.ts, .map）
- [ ] 2.1.6 测试类型声明文件的正确性

### 2.2 迁移 @izhimu/seas-core

- [ ] 2.2.1 更新 `core/seas-core/vite.config.ts` 启用 Library Mode
- [ ] 2.2.2 更新 `core/seas-core/package.json` 配置入口点和 exports
- [ ] 2.2.3 重新组织 `core/seas-core/src/` 导出结构
  - [ ] 2.2.3.1 创建 `src/components/index.ts` 组件入口
  - [ ] 2.2.3.2 创建 `src/hooks/index.ts` hooks 入口
  - [ ] 2.2.3.3 创建 `src/utils/index.ts` 工具函数入口
  - [ ] 2.2.3.4 创建 `src/stores/index.ts` stores 入口
  - [ ] 2.2.3.5 创建 `src/entities/index.ts` 类型定义入口
- [ ] 2.2.4 配置 peerDependencies（Vue, Vue Router, Pinia, Naive UI）
- [ ] 2.2.5 配置 rollup external 依赖
- [ ] 2.2.6 执行构建并验证输出
- [ ] 2.2.7 在 monorepo 内测试 seas-core 的使用

### 2.3 迁移 @izhimu/seas-mobile-core

- [ ] 2.3.1 更新 `core/seas-mobile-core/vite.config.ts` 启用 Library Mode
- [ ] 2.3.2 更新 `core/seas-mobile-core/package.json` 配置入口点和 exports
- [ ] 2.3.3 重新组织 `core/seas-mobile-core/src/` 导出结构
- [ ] 2.3.4 配置 peerDependencies（Vue, Vue Router, Pinia, Vant）
- [ ] 2.3.5 配置 rollup external 依赖
- [ ] 2.3.6 执行构建并验证输出
- [ ] 2.3.7 在 monorepo 内测试 seas-mobile-core 的使用

## 3. Phase 3: Feature 包迁移

### 3.1 分析依赖关系

- [ ] 3.1.1 运行依赖分析脚本生成依赖关系图
- [ ] 3.1.2 识别所有循环依赖
- [ ] 3.1.3 识别需要移除的不必要依赖
- [ ] 3.1.4 创建依赖解耦计划文档

### 3.2 迁移 @izhimu/seas-base-view

- [ ] 3.2.1 移除对其他 feature 包的依赖（seas-security-view, seas-ai-view）
- [ ] 3.2.2 更新 `packages/seas-base-view/vite.config.ts` 启用 Library Mode
- [ ] 3.2.3 更新 `packages/seas-base-view/package.json`
  - [ ] 3.2.3.1 移除 feature 包依赖
  - [ ] 3.2.3.2 配置 peerDependencies
  - [ ] 3.2.3.3 配置 exports 字段（6 个子路径）
  - [ ] 3.2.3.4 更新 main/module/types 字段
- [ ] 3.2.4 重新组织导出结构
  - [ ] 3.2.4.1 创建 `src/components/index.ts`
  - [ ] 3.2.4.2 创建 `src/hooks/index.ts`
  - [ ] 3.2.4.3 创建 `src/utils/index.ts`
  - [ ] 3.2.4.4 创建 `src/stores/index.ts`
  - [ ] 3.2.4.5 创建 `src/entities/index.ts`
- [ ] 3.2.5 更新 `src/index.ts` 重新导出所有子模块
- [ ] 3.2.6 执行构建并验证
- [ ] 3.2.7 测试包的独立使用

### 3.3 迁移 @izhimu/seas-security-view

- [ ] 3.3.1 检查并移除对其他 feature 包的依赖
- [ ] 3.3.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.3.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.3.4 重新组织导出结构（components, hooks, utils, stores, entities）
- [ ] 3.3.5 更新 src/index.ts
- [ ] 3.3.6 执行构建并验证
- [ ] 3.3.7 测试包的独立使用

### 3.4 迁移 @izhimu/seas-storage-view

- [ ] 3.4.1 检查并移除对其他 feature 包的依赖
- [ ] 3.4.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.4.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.4.4 重新组织导出结构
- [ ] 3.4.5 更新 src/index.ts
- [ ] 3.4.6 执行构建并验证
- [ ] 3.4.7 测试包的独立使用

### 3.5 迁移 @izhimu/seas-job-view

- [ ] 3.5.1 检查并移除对其他 feature 包的依赖
- [ ] 3.5.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.5.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.5.4 重新组织导出结构
- [ ] 3.5.5 更新 src/index.ts
- [ ] 3.5.6 执行构建并验证
- [ ] 3.5.7 测试包的独立使用

### 3.6 迁移 @izhimu/seas-healthy-view

- [ ] 3.6.1 检查并移除对其他 feature 包的依赖
- [ ] 3.6.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.6.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.6.4 重新组织导出结构
- [ ] 3.6.5 更新 src/index.ts
- [ ] 3.6.6 执行构建并验证
- [ ] 3.6.7 测试包的独立使用

### 3.7 迁移 @izhimu/seas-generate-view

- [ ] 3.7.1 检查并移除对其他 feature 包的依赖
- [ ] 3.7.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.7.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.7.4 重新组织导出结构
- [ ] 3.7.5 更新 src/index.ts
- [ ] 3.7.6 执行构建并验证
- [ ] 3.7.7 测试包的独立使用

### 3.8 迁移 @izhimu/seas-mqtt-view

- [ ] 3.8.1 检查并移除对其他 feature 包的依赖
- [ ] 3.8.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.8.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.8.4 重新组织导出结构
- [ ] 3.8.5 更新 src/index.ts
- [ ] 3.8.6 执行构建并验证
- [ ] 3.8.7 测试包的独立使用

### 3.9 迁移 @izhimu/seas-ai-view

- [ ] 3.9.1 检查并移除对其他 feature 包的依赖
- [ ] 3.9.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.9.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.9.4 重新组织导出结构
- [ ] 3.9.5 更新 src/index.ts
- [ ] 3.9.6 执行构建并验证
- [ ] 3.9.7 测试包的独立使用

### 3.10 迁移 @izhimu/seas-form-view

- [ ] 3.10.1 检查并移除对其他 feature 包的依赖
- [ ] 3.10.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.10.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.10.4 重新组织导出结构
- [ ] 3.10.5 更新 src/index.ts
- [ ] 3.10.6 执行构建并验证
- [ ] 3.10.7 测试包的独立使用

### 3.11 迁移 @izhimu/seas-security-mobile-view

- [ ] 3.11.1 检查并移除对其他 feature 包的依赖
- [ ] 3.11.2 更新 vite.config.ts 启用 Library Mode
- [ ] 3.11.3 更新 package.json 配置入口点和 peerDependencies
- [ ] 3.11.4 重新组织导出结构
- [ ] 3.11.5 更新 src/index.ts
- [ ] 3.11.6 执行构建并验证
- [ ] 3.11.7 测试包的独立使用

### 3.12 验证依赖解耦

- [ ] 3.12.1 运行循环依赖检测脚本
- [ ] 3.12.2 验证所有 feature 包只依赖 core 包
- [ ] 3.12.3 生成最终的依赖关系图
- [ ] 3.12.4 确认没有外部依赖被打包进产物

## 4. Phase 4: 测试和验证

### 4.1 创建测试环境

- [ ] 4.1.1 创建消费者测试项目 `test/consumer-vite-project`
- [ ] 4.1.2 创建消费者测试项目 `test/consumer-nuxt-project` (可选)
- [ ] 4.1.3 配置测试项目使用本地包（pnpm link 或 workspace）
- [ ] 4.1.4 安装所需的 peerDependencies

### 4.2 测试导入方式

- [ ] 4.2.1 测试主入口导入 `import pkg from '@izhimu/seas-base-view'`
- [ ] 4.2.2 测试子路径导入 `import { Button } from '@izhimu/seas-base-view/components'`
- [ ] 4.2.3 测试 hooks 导入 `import { useAuth } from '@izhimu/seas-security-view/hooks'`
- [ ] 4.2.4 测试 utils 导入 `import { formatDate } from '@izhimu/seas-base-view/utils'`
- [ ] 4.2.5 测试 stores 导入 `import { useUserStore } from '@izhimu/seas-base-view/stores'`
- [ ] 4.2.6 测试 entities 导入 `import type { User } from '@izhimu/seas-base-view/entities'`
- [ ] 4.2.7 测试命名导出 `import { Account, Menu } from '@izhimu/seas-base-view'`

### 4.3 测试类型提示

- [ ] 4.3.1 在测试项目中验证 IDE 自动补全功能
- [ ] 4.3.2 验证 TypeScript 类型检查无错误
- [ ] 4.3.3 验证组件 props 类型提示正确
- [ ] 4.3.4 验证函数参数类型提示正确
- [ ] 4.3.5 验证 hooks 返回值类型提示正确

### 4.4 测试 Tree-shaking

- [ ] 4.4.1 构建测试项目并分析打包体积
- [ ] 4.4.2 验证未使用的组件未被打包
- [ ] 4.4.3 验证未使用的 hooks 未被打包
- [ ] 4.4.4 对比迁移前后的打包体积变化
- [ ] 4.4.5 使用 bundleAnalyzer 分析打包产物

### 4.5 测试运行时行为

- [ ] 4.5.1 测试组件渲染和交互功能
- [ ] 4.5.2 测试路由导航功能
- [ ] 4.5.3 测试状态管理（Pinia stores）
- [ ] 4.5.4 测试 API 请求功能
- [ ] 4.5.5 测试事件总线和通信
- [ ] 4.5.6 测试错误处理和边界情况
- [ ] 4.5.7 在浏览器控制台检查无错误或警告

### 4.6 性能测试

- [ ] 4.6.1 测量包的构建时间
- [ ] 4.6.2 测量测试项目的打包时间
- [ ] 4.6.3 测量应用启动时间
- [ ] 4.6.4 测量运行时性能（FPS, 内存占用）
- [ ] 4.6.5 生成性能测试报告

### 4.7 兼容性测试

- [ ] 4.7.1 测试不同 Node.js 版本的兼容性（18, 20, 22）
- [ ] 4.7.2 测试不同浏览器的兼容性（Chrome, Firefox, Safari, Edge）
- [ ] 4.7.3 测试不同打包工具的兼容性（Vite, Webpack, Rollup）
- [ ] 4.7.4 测试 TypeScript 不同版本的兼容性

## 5. Phase 5: 文档和发布

### 5.1 更新文档

- [ ] 5.1.1 更新根目录 README.md
  - [ ] 5.1.1.1 更新安装说明
  - [ ] 5.1.1.2 添加新的导入方式示例
  - [ ] 5.1.1.3 更新快速开始指南
- [ ] 5.1.2 创建迁移指南 `docs/MIGRATION_GUIDE.md`
  - [ ] 5.1.2.1 列出所有破坏性变更
  - [ ] 5.1.2.2 提供迁移步骤
  - [ ] 5.1.2.3 提供代码示例对比
- [ ] 5.1.3 创建使用文档 `docs/USAGE.md`
  - [ ] 5.1.3.1 主入口使用示例
  - [ ] 5.1.3.2 子路径导入示例
  - [ ] 5.1.3.3 完整示例项目
- [ ] 5.1.4 更新 CHANGELOG.md
  - [ ] 5.1.4.1 标注版本号（2.0.0）
  - [ ] 5.1.4.2 列出所有变更
  - [ ] 5.1.4.3 标注 Breaking Changes
  - [ ] 5.1.4.4 添加迁移指南链接
- [ ] 5.1.5 创建 API 文档 `docs/API.md`（可选，或使用文档站点）

### 5.2 准备发布

- [ ] 5.2.1 更新所有包的版本号为 2.0.0
- [ ] 5.2.2 更新根 package.json 版本号
- [ ] 5.2.3 执行完整的构建验证 `pnpm run build`
- [ ] 5.2.4 运行所有测试套件
- [ ] 5.2.5 执行预发布检查脚本
- [ ] 5.2.6 生成包体积报告
- [ ] 5.2.7 验证所有构建产物完整

### 5.3 发布到 npm

- [ ] 5.3.1 检查 npm registry 配置
- [ ] 5.3.2 执行 `pnpm run publish`（或者分步骤发布）
- [ ] 5.3.3 验证发布成功（在 npm 查看包信息）
- [ ] 5.3.4 测试安装发布的包 `npm install @izhimu/seas-base-view@latest`
- [ ] 5.3.5 在新项目中测试已发布的包

### 5.4 通知和推广

- [ ] 5.4.1 创建 Release Notes 在 GitHub
- [ ] 5.4.2 发送公告邮件给用户
- [ ] 5.4.3 在团队内部进行培训
- [ ] 5.4.4 收集用户反馈
- [ ] 5.4.5 准备问题排查指南

## 6. 后续优化

### 6.1 文档站点（可选）

- [ ] 6.1.1 使用 VitePress 搭建文档站点
- [ ] 6.1.2 添加组件预览和交互式示例
- [ ] 6.1.3 集成 API 文档自动生成
- [ ] 6.1.4 部署文档站点

### 6.2 持续优化

- [ ] 6.2.1 监控包体积变化
- [ ] 6.2.2 优化构建速度
- [ ] 6.2.3 收集用户反馈并改进
- [ ] 6.2.4 定期更新依赖版本

### 6.3 工具和自动化

- [ ] 6.3.1 设置 CI/CD 自动构建和发布
- [ ] 6.3.2 添加自动化测试到 CI
- [ ] 6.3.3 配置包体积监控告警
- [ ] 6.3.4 创建发布检查清单
