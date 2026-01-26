# 更新日志

所有显著的更改都将记录在此文件中。

格式基于[Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循[语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增
- AI助手技能文档 (skills/seas-view/SKILL.md)
- 为Claude Code等AI助手提供全面的框架使用指南
- OpenSpec工作流支持 (openspec/目录)
- 开源项目模板文件
- GitHub工作流配置
- 贡献指南文档
- Issue和PR模板

### 改进
- 更新README.md为完整的GitHub开源格式
- 完善package.json开源元数据
- 优化项目文档结构

## [1.1.34] - 2024-12

### 新增
- 新增AI视图模块 (seas-ai-view)
- 新增移动端安全视图组件
- 支持指纹识别功能 (@fingerprintjs/fingerprintjs)
- 集成国密算法前端支持 (sm-crypto)

### 改进
- 升级Vue到3.5.13版本
- 升级Vite到6.3.5版本
- 优化TypeScript配置
- 改进ESLint和Prettier配置
- 更新Naive UI到2.41.0版本

### 修复
- 修复移动端兼容性问题
- 修复TypeScript类型定义问题
- 修复构建过程中的依赖问题

## [1.1.0] - 2024-06

### 新增
- MQTT消息视图模块 (seas-mqtt-view)
- 表单组件视图模块 (seas-form-view)
- 集成ECharts图表组件
- 新增Pinia状态持久化支持

### 改进
- 重构组件架构，采用Composition API
- 优化打包配置，提升构建性能
- 改进移动端UI组件 (Vant 4.x)
- 完善TypeScript类型定义

### 修复
- 修复路由导航问题
- 修复响应式布局在移动端的显示问题
- 修复组件样式冲突

## [1.0.0] - 2024-01

### 新增
- 基础视图模块 (seas-base-view)
- 安全管理视图模块 (seas-security-view)
- 存储管理视图模块 (seas-storage-view)
- 任务管理视图模块 (seas-job-view)
- 健康检查视图模块 (seas-healthy-view)
- 代码生成视图模块 (seas-generate-view)

### 技术栈
- Vue 3 + TypeScript + Vite
- Naive UI 组件库
- Vue Router 4 路由管理
- Pinia 状态管理
- Axios HTTP客户端

### 文档
- 初始项目文档
- 组件使用指南
- 开发环境配置说明

---

## 升级指南

### 从1.1.x升级到1.1.34
1. 更新Node.js版本至18+
2. 更新pnpm版本至9.7.1+
3. 检查Vue 3.5新特性兼容性
4. 更新TypeScript配置文件

### 从1.0.x升级到1.1.x
1. 更新npm依赖包
2. 检查Composition API迁移
3. 更新路由配置
4. 检查组件API变更

## 兼容性说明

- **Node.js兼容性**: 支持Node.js 18+
- **浏览器兼容性**: Chrome 87+, Firefox 78+, Safari 14+, Edge 88+
- **Vue兼容性**: Vue 3.5+
- **TypeScript兼容性**: TypeScript 5.8+
- **构建工具**: Vite 6+, pnpm 9.7.1+

## 开发环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 9.7.1
- **TypeScript**: ~5.8.3
- **推荐IDE**: VSCode + Volar 扩展
