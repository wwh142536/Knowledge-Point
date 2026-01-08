# Quiz 落地页数据看板 (Quiz Landing Page Data Dashboard)

本文档总结了 Quiz 落地页数据看板中的关键技术实现方案与业务逻辑模式。

## 1. ECharts 数据可视化架构

该看板高度依赖 ECharts 来可视化复杂数据。我们使用自定义 Hook 模式来高效管理图表实例。

### 1.1 响应式图表更新
我们采用了响应式模式，即每当源数据发生变化时，自动重新计算并应用图表配置，而不是使用命令式的方式手动去更新图表。

**核心概念**：
- **目的**：确保图表始终反映 `data` 的当前状态，无需手动编写刷新逻辑。
- **实现**：使用 `useEffect` 监听 `data`。当 API 数据到达时，副作用函数运行，计算新的 `option` 对象，并调用 `setOption`。

```typescript
// 模式示例
useEffect(() => {
  if (!data) return;
  
  // 1. 将 API 数据转换为图表格式
  const chartData = transformData(data);
  
  // 2. 更新配置
  updateOptions(opts => {
    opts.series[0].data = chartData;
    return opts;
  });
}, [data, updateOptions]);
```

### 1.2 漏斗图可视化逻辑
ECharts 漏斗图的宽度由 `value` 属性决定。为了创建具有视觉意义的漏斗来表现从落地页开始的“流失”情况，我们使用的是相对百分比。

**实现细节**：
- **归一化基准**：“落地页访问量”作为基准，宽度设为 100%。
- **视觉宽度**：后续阶段（注册、付费）的 `value` 计算公式为：`(当前阶段数量 / 落地页数量) * 100`。
- **Tooltip 显示**：虽然视觉宽度使用的是计算出的百分比，但 Tooltip 中展示的是存储在 `originalValue` 中的*实际*用户数量。

## 2. 健壮的数据处理

管理后台看板必须能够从容应对后端服务返回的格式错误或缺失的数据。

### 2.1 “安全数字”模式 (Safe Number Pattern)
为了避免 UI 中出现 `NaN` 或 `undefined`（这会让用户觉得系统坏了），我们使用一个工具函数来封装所有对数字数据的访问。

```typescript
const safeNumber = (value: number | undefined | null): number => {
  // 将 null/undefined/NaN 统一转换为 0
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 0;
  }
  return value;
};
```

### 2.2 安全指标计算
在计算比率（如转化率）时，除以零是一个常见的风险点。
- **最佳实践**：始终保护分母。
- **示例**：`const rate = total > 0 ? (success / total) : 0;`

## 3. 日期范围管理

看板提供了灵活的日期筛选模式，以满足不同的分析需求。

### 3.1 动态日期计算 (Day.js)
我们利用 `dayjs` 库来处理预设范围内复杂的日期计算。
- **“上月”**：需要精确计算上个月的第一天和最后一天，而不仅仅是“30天前”。
  ```typescript
  const start = dayjs().subtract(1, 'month').startOf('month');
  const end = dayjs().subtract(1, 'month').endOf('month');
  ```
- **时区感知**：看板显式获取用户的本地时区 (`Intl.DateTimeFormat().resolvedOptions().timeZone`) 并将其发送到后端，以确保数据聚合与用户的本地日期边界对齐。

## 4. React 开发模式

### 4.1 数据获取的自定义 Hook
数据获取逻辑被隔离在 `useQuizDashboard` Hook 中。
- **优势**：关注点分离。视图组件 (`QuizDashboardPage`) 专注于布局，而 Hook 负责管理 API 请求、加载状态和错误处理。
- **依赖追踪**：Hook 内部的 `useEffect` 监听 `dateParams`，当日期筛选器变化时自动重新获取所有指标数据。

### 4.2 组件模块化
看板被拆分为粒度更细的组件：
- `QuizStatCard`: 用于展示单个数字指标的可复用布局。
- `QuizTrendAndFunnel`: 组合了趋势折线图和漏斗图。
- `QuizSubjectAndInteraction`: 组合了次级图表。
**优势**：防止主文件变成一个难以维护的、庞大的代码块。
