# 工具配置

Claude Code 可以集成各种开发工具，提升开发效率。

## 可用工具

### 代码质量工具

#### ESLint

```bash
# 配置 ESLint
claude-code ask "创建 ESLint 配置，包含：
- TypeScript 支持
- React 规则
- Prettier 集成
- 自定义规则"
```

生成的配置：

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'react/react-in-jsx-scope': 'off',
  },
};
```

#### Prettier

```bash
# 配置 Prettier
claude-code ask "创建 Prettier 配置，设置代码格式化规则"
```

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### 测试工具

#### Jest

```bash
# 配置 Jest
claude-code ask "创建 Jest 配置，设置测试环境和覆盖率"
```

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
};
```

#### Vitest

```bash
# 配置 Vitest
claude-code ask "创建 Vitest 配置，集成 Vite"
```

### 构建工具

#### Vite

```bash
# 配置 Vite
claude-code ask "创建 Vite 配置，包含：
- TypeScript 支持
- 路径别名
- 环境变量
- 代码分割"
```

#### Webpack

```bash
# 配置 Webpack
claude-code ask "创建 Webpack 配置，优化构建性能"
```

### Git 工具

#### Husky

```bash
# 配置 Husky
claude-code ask "配置 Husky Git hooks，在提交前运行 lint 和 test"
```

生成的脚本：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm test
```

#### lint-staged

```bash
# 配置 lint-staged
claude-code ask "配置 lint-staged，只对暂存的文件运行 lint"
```

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

## 工具集成

### 统一配置文件

创建 `.claude-code/tools.json`：

```json
{
  "eslint": {
    "enabled": true,
    "config": ".eslintrc.js",
    "autoFix": true
  },
  "prettier": {
    "enabled": true,
    "config": ".prettierrc",
    "formatOnSave": true
  },
  "jest": {
    "enabled": true,
    "config": "jest.config.js",
    "coverageThreshold": 80
  }
}
```

### 工作流集成

```bash
# 创建完整工具链
claude-code ask "配置完整的开发工具链：
1. ESLint + Prettier
2. Jest + Testing Library
3. Husky + lint-staged
4. TypeScript 严格模式"
```

## 最佳实践

### 1. 统一工具版本

使用 `package-lock.json` 或 `pnpm-lock.yaml` 锁定版本。

### 2. 配置文件共享

在 Monorepo 中共享配置：

```json
{
  "name": "monorepo",
  "packages": ["packages/*"],
  "devDependencies": {
    "eslint-config-base": "workspace:*",
    "prettier-config-base": "workspace:*"
  }
}
```

### 3. CI/CD 集成

```bash
# 创建 CI 配置
claude-code ask "创建 GitHub Actions，运行所有工具检查"
```

---

下一步：[技能包使用](skills)
