# Seas Framework View

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/version-1.1.34-green.svg)](https://github.com/izhimu/seas-framework-view)

Seas Framework View 是一个基于 Vue 3 + TypeScript + Vite 构建的模块化前端框架集合，提供了多个功能模块的前端视图组件。

## 🚀 特性

- 🎯 **模块化架构** - 采用 monorepo 架构，支持多个独立模块
- 🛠️ **现代技术栈** - Vue 3 + TypeScript + Vite + Naive UI
- 📱 **移动端支持** - 包含移动端组件库
- 🔐 **安全组件** - 内置安全相关的前端组件
- 📊 **数据可视化** - 集成 ECharts 图表组件
- 🎨 **UI 组件库** - 基于 Naive UI 和 Vant 的组件封装

## 📦 包含模块

- **seas-base-view** - 基础视图组件
- **seas-security-view** - 安全管理视图
- **seas-storage-view** - 存储管理视图
- **seas-job-view** - 任务管理视图
- **seas-healthy-view** - 健康检查视图
- **seas-generate-view** - 代码生成视图
- **seas-mqtt-view** - MQTT 消息视图
- **seas-ai-view** - AI 相关视图
- **seas-form-view** - 表单组件视图

## 🛠️ 技术栈

- **框架**: Vue 3.5+
- **语言**: TypeScript
- **构建工具**: Vite 6+
- **UI 库**: Naive UI, Vant
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **图表**: ECharts
- **包管理**: pnpm

## 📋 环境要求

- Node.js >= 18
- pnpm >= 9.7.1

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动所有模块
pnpm run dev

# 启动特定模块
pnpm run dev:base      # 基础模块
pnpm run dev:security  # 安全模块
pnpm run dev:storage   # 存储模块
pnpm run dev:job       # 任务模块
pnpm run dev:healthy   # 健康检查模块
pnpm run dev:generate  # 代码生成模块
pnpm run dev:mqtt      # MQTT 模块
pnpm run dev:ai        # AI 模块
```

### 构建

```bash
pnpm run build
```

## 📖 使用说明

### 基础配置

项目采用 monorepo 架构，每个子包都是独立的 Vue 应用。你可以根据需要选择使用特定的模块。

### 开发环境设置

推荐使用以下 IDE 配置：

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [WebStorm](https://www.jetbrains.com/webstorm/)

### TypeScript 支持

项目完全支持 TypeScript，所有 `.vue` 文件都有完整的类型支持。

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解如何参与项目开发。

### 开发流程

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [Apache License 2.0](LICENSE) 许可证开源。

## 👥 维护者

- **izhimu** - *项目维护者* - [haoran@izhimu.cn](mailto:haoran@izhimu.cn)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 支持

如果你在使用过程中遇到问题，可以通过以下方式获取帮助：

- 提交 [Issue](https://github.com/izhimu/seas-framework-view/issues)
- 发送邮件至 [haoran@izhimu.cn](mailto:haoran@izhimu.cn)

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
