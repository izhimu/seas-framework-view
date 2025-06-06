# 贡献指南

感谢您对Seas Framework View的兴趣！我们欢迎所有形式的贡献，包括错误报告、功能建议、文档改进和代码贡献。

## 开始之前

在贡献之前，请确保您：
1. 阅读了[README.md](README.md)了解项目
2. 有一个GitHub账号
3. 熟悉Vue 3、TypeScript和现代前端开发

## 贡献方式

### 🐛 报告Bug
如果您发现了Bug，请通过以下方式报告：

1. **搜索现有问题**：在创建新问题前，请先搜索[现有的Issues](https://github.com/izhimu/seas-framework-view/issues)
2. **创建Issue**：使用Bug报告模板创建新的Issue
3. **提供详细信息**：包括：
   - 使用的Seas Framework View版本
   - Node.js版本
   - 浏览器版本
   - 操作系统
   - 重现步骤
   - 期望行为与实际行为
   - 控制台错误信息或截图

### 💡 功能建议
如果您有新功能建议：

1. **搜索现有建议**：查看是否已有类似建议
2. **创建Feature Request**：使用功能请求模板
3. **描述使用场景**：说明为什么需要这个功能
4. **提供设计思路**（可选）：如果您有UI/UX设计想法，请分享

### 📖 文档改进
文档改进包括：
- 修复错别字或语法错误
- 改进说明清晰度
- 添加Vue组件使用示例
- 更新过时的API文档
- 完善TypeScript类型定义说明

### 🔧 代码贡献

#### 开发环境设置

1. **Fork项目**
   ```bash
   # 在GitHub上Fork项目到您的账号
   ```

2. **克隆项目**
   ```bash
   git clone https://github.com/your-username/seas-framework-view.git
   cd seas-framework-view
   ```

3. **安装依赖**
   ```bash
   pnpm install
   ```

4. **添加上游仓库**
   ```bash
   git remote add upstream https://github.com/izhimu/seas-framework-view.git
   ```

5. **创建开发分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/issue-number-description
   ```

#### 开发规范

##### 代码风格
- 使用TypeScript进行开发
- 遵循Vue 3 Composition API最佳实践
- 使用2个空格缩进，不使用tab
- 最大行宽100字符
- 遵循ESLint和Prettier配置

##### 组件开发规范
- 使用`<script setup>`语法
- 组件名使用PascalCase
- Props使用TypeScript接口定义
- 事件使用`defineEmits`定义
- 样式使用scoped CSS

##### 提交信息
使用[Conventional Commits](https://www.conventionalcommits.org/)规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型包括：
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/辅助工具
- `ui`: UI/样式更新

示例：
```
feat(security): add password strength component

Add a new password strength indicator component with
real-time validation and visual feedback.

Closes #123
```

##### 代码质量
- 所有新组件必须有TypeScript类型定义
- 重要组件需要添加单元测试
- 通过ESLint和TypeScript检查
- 遵循Vue 3最佳实践

#### 开发流程

1. **同步上游**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **开发和测试**
   ```bash
   # 启动开发服务器
   pnpm run dev
   
   # 运行类型检查
   pnpm run type-check
   
   # 运行代码检查
   pnpm run lint
   ```

4. **构建测试**
   ```bash
   pnpm run build
   ```

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

6. **推送分支**
   ```bash
   git push origin feature/your-feature
   ```

7. **创建Pull Request**
   - 在GitHub上创建PR
   - 填写PR模板
   - 等待代码审查

#### 测试要求

- **组件测试**：重要组件需要单元测试
- **类型检查**：确保TypeScript类型正确
- **浏览器测试**：在主流浏览器中测试功能
- **响应式测试**：确保移动端兼容性

运行检查：
```bash
# 类型检查
pnpm run type-check

# 代码风格检查
pnpm run lint

# 构建检查
pnpm run build
```

#### 构建检查
在提交前请运行：
```bash
pnpm run type-check
pnpm run lint
pnpm run build
```

## 代码审查

所有PR都需要至少一个维护者审查：

1. **自动检查**：GitHub Actions会运行类型检查、代码风格检查和构建测试
2. **人工审查**：维护者会审查代码质量、组件设计和用户体验
3. **修改建议**：根据审查意见修改代码
4. **合并**：审查通过后合并到主分支

## 发布流程

我们使用语义化版本：
- `MAJOR.MINOR.PATCH`格式
- 破坏性API变更增加MAJOR
- 向后兼容的新功能增加MINOR
- Bug修复增加PATCH

## 开发环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 9.7.1
- **推荐IDE**: VSCode + Volar扩展
- **浏览器**: Chrome 87+, Firefox 78+, Safari 14+

## 联系维护者

如果您有任何问题或需要帮助：
- 创建GitHub Issue
- 发送邮件至：haoran@izhimu.cn

## 致谢

感谢所有[贡献者](https://github.com/izhimu/seas-framework-view/graphs/contributors)！

---

**再次感谢您的贡献！** 🙏
