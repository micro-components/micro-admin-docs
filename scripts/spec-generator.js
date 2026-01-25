#!/usr/bin/env node

/**
 * Spec 生成工具
 * 用于创建新的 Spec 文档
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Spec 类型定义
const SPEC_TYPES = {
  feature: {
    dir: 'features',
    prefix: 'FEAT',
    template: 'feature-spec.md'
  },
  component: {
    dir: 'components',
    prefix: 'COMP',
    template: 'component-spec.md'
  },
  api: {
    dir: 'apis',
    prefix: 'API',
    template: 'api-spec.md'
  },
  skill: {
    dir: 'skills',
    prefix: 'SKILL',
    template: 'feature-spec.md' // skills 暂时使用 feature 模板
  }
};

const PRIORITIES = ['P0', 'P1', 'P2', 'P3'];
const STATUSES = ['Draft', 'Review', 'Approved', 'InProgress', 'Testing', 'Done', 'OnHold', 'Cancelled'];

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    name: null,
    type: 'feature',
    priority: 'P1',
    owner: '@user',
    interactive: true
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--name' || arg === '-n') {
      options.name = args[++i];
    } else if (arg === '--type' || arg === '-t') {
      options.type = args[++i];
    } else if (arg === '--priority' || arg === '-p') {
      options.priority = args[++i];
    } else if (arg === '--owner' || arg === '-o') {
      options.owner = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg === '--no-interactive') {
      options.interactive = false;
    }
  }

  return options;
}

/**
 * 打印帮助信息
 */
function printHelp() {
  console.log(`
Spec 生成工具

用法:
  pnpm spec:generate [选项]

选项:
  -n, --name <name>        Spec 名称 (必需)
  -t, --type <type>        Spec 类型 (feature|component|api|skill)，默认: feature
  -p, --priority <priority> 优先级 (P0|P1|P2|P3)，默认: P1
  -o, --owner <owner>      负责人，默认: @user
  --no-interactive         非交互式模式
  -h, --help               显示帮助信息

示例:
  # 交互式创建
  pnpm spec:generate

  # 命令行参数创建
  pnpm spec:generate --name "用户认证" --type feature --priority P1

  # 创建组件规格
  pnpm spec:generate --name "表格组件" --type component --owner @alice
`);
}

/**
 * 生成 Spec ID
 */
async function generateSpecId(type) {
  const config = SPEC_TYPES[type];
  const specDir = path.join(process.cwd(), 'docs/specs', config.dir);

  // 如果目录不存在，从 001 开始
  if (!fs.existsSync(specDir)) {
    return `${config.prefix}-001`;
  }

  // 读取现有 Spec 文件
  const files = fs.readdirSync(specDir);
  const specFiles = files.filter(f => f.startsWith(config.prefix));

  // 找出最大的编号
  let maxId = 0;
  for (const file of specFiles) {
    const match = file.match(/(\d+)/);
    if (match) {
      const id = parseInt(match[1]);
      if (id > maxId) {
        maxId = id;
      }
    }
  }

  // 生成新编号
  const newId = (maxId + 1).toString().padStart(3, '0');
  return `${config.prefix}-${newId}`;
}

/**
 * kebab-case 转换
 */
function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/**
 * 询问用户输入
 */
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

/**
 * 交互式输入
 */
async function interactiveInput(options) {
  console.log('📝 Spec 生成工具\n');

  if (!options.name) {
    options.name = await question('请输入 Spec 名称: ');
  }

  console.log('\n请选择 Spec 类型:');
  Object.keys(SPEC_TYPES).forEach((type, index) => {
    console.log(`  ${index + 1}. ${type}`);
  });
  const typeIndex = await question(`请输入类型编号 (默认: 1): `);
  if (typeIndex) {
    const types = Object.keys(SPEC_TYPES);
    const selectedType = types[parseInt(typeIndex) - 1];
    if (selectedType) {
      options.type = selectedType;
    }
  }

  console.log('\n请选择优先级:');
  PRIORITIES.forEach((priority, index) => {
    console.log(`  ${index + 1}. ${priority}`);
  });
  const priorityIndex = await question(`请输入优先级编号 (默认: 2): `);
  if (priorityIndex) {
    const selectedPriority = PRIORITIES[parseInt(priorityIndex) - 1];
    if (selectedPriority) {
      options.priority = selectedPriority;
    }
  }

  const owner = await question(`请输入负责人 (默认: ${options.owner}): `);
  if (owner) {
    options.owner = owner.startsWith('@') ? owner : `@${owner}`;
  }

  return options;
}

/**
 * 生成 Spec 文件
 */
async function generateSpec(options) {
  try {
    // 生成 Spec ID
    const specId = await generateSpecId(options.type);

    // 生成文件名
    const fileName = `${specId}-${toKebabCase(options.name)}.md`;
    const config = SPEC_TYPES[options.type];
    const specDir = path.join(process.cwd(), 'docs/specs', config.dir);
    const templatePath = path.join(process.cwd(), 'docs/specs/templates', config.template);
    const specPath = path.join(specDir, fileName);

    // 创建目录
    if (!fs.existsSync(specDir)) {
      fs.mkdirSync(specDir, { recursive: true });
      console.log(`✓ 创建目录: ${specDir}`);
    }

    // 读取模板
    let content;
    if (fs.existsSync(templatePath)) {
      content = fs.readFileSync(templatePath, 'utf-8');
    } else {
      // 如果模板不存在，使用默认模板
      content = `# Spec: ${options.name}

## 元信息

- **Spec ID**: ${specId}
- **创建日期**: ${new Date().toISOString().split('T')[0]}
- **负责人**: ${options.owner}
- **优先级**: ${options.priority}
- **状态**: Draft

## 背景与目标

### 业务背景
[描述业务背景和需求来源]

### 技术目标
- [ ] 目标 1
- [ ] 目标 2

## 功能需求
[详细的功能需求描述]

## 技术方案
[详细的技术方案设计]

## 实施计划
[任务分解和时间安排]

## 风险评估
[潜在风险和应对措施]

## 参考资料
[相关文档和参考链接]
`;
    }

    // 替换模板中的占位符
    content = content
      .replace(/\[功能名称\]/g, options.name)
      .replace(/FEAT-\[编号\]/g, specId)
      .replace(/COMP-\[编号\]/g, specId)
      .replace(/API-\[编号\]/g, specId)
      .replace(/SKILL-\[编号\]/g, specId)
      .replace(/@username/g, options.owner)
      .replace(/P0 \(P0\/P1\/P2\/P3\)/g, options.priority)
      .replace(/P1 \(P0\/P1\/P2\/P3\)/g, options.priority)
      .replace(/P2 \(P0\/P1\/P2\/P3\)/g, options.priority)
      .replace(/P3 \(P0\/P1\/P2\/P3\)/g, options.priority)
      .replace(/YYYY-MM-DD/g, new Date().toISOString().split('T')[0]);

    // 写入文件
    fs.writeFileSync(specPath, content, 'utf-8');

    console.log(`\n✓ Spec 已创建: ${specPath}\n`);

    console.log('下一步:');
    console.log('1. 编辑 Spec 文档');
    console.log('2. 填写完整的需求和技术方案');
    console.log('3. 提交评审');

    return { success: true, specId, specPath };
  } catch (error) {
    console.error('✗ 创建 Spec 失败:', error.message);
    return { success: false, error: error.message };
  } finally {
    rl.close();
  }
}

/**
 * 主函数
 */
async function main() {
  const options = parseArgs();

  // 如果缺少必要参数或启用交互模式，进入交互式输入
  if (!options.name || options.interactive) {
    await interactiveInput(options);
  }

  // 验证参数
  if (!options.name) {
    console.error('✗ 错误: 请提供 Spec 名称');
    console.log('使用 --help 查看帮助信息');
    process.exit(1);
  }

  if (!SPEC_TYPES[options.type]) {
    console.error(`✗ 错误: 无效的 Spec 类型 "${options.type}"`);
    console.log(`可用类型: ${Object.keys(SPEC_TYPES).join(', ')}`);
    process.exit(1);
  }

  if (!PRIORITIES.includes(options.priority)) {
    console.error(`✗ 错误: 无效的优先级 "${options.priority}"`);
    console.log(`可用优先级: ${PRIORITIES.join(', ')}`);
    process.exit(1);
  }

  // 生成 Spec
  const result = await generateSpec(options);

  if (!result.success) {
    process.exit(1);
  }
}

// 运行主函数
main().catch((error) => {
  console.error('✗ 发生错误:', error);
  process.exit(1);
});

module.exports = { generateSpec, generateSpecId, toKebabCase };
