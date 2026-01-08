# CSS 基础

CSS (Cascading Style Sheets) 用于描述 HTML 文档的呈现样式。

## 基础语法

CSS 规则由选择器和声明块组成：

```css
/* 选择器 */
h1 {
    /* 属性: 值; */
    color: #333;
    font-size: 24px;
    text-align: center;
}
```

## 常用选择器

- **元素选择器**: `p { ... }` (选中所有 p 标签)
- **类选择器**: `.classname { ... }` (选中 class="classname" 的元素)
- **ID 选择器**: `#idname { ... }` (选中 id="idname" 的元素)

## 盒模型

![盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model/boxmodel-(1).png)

CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距 (margin)，边框 (border)，填充 (padding)，和实际内容 (content)。

## 布局 (Layout)

### Flexbox (一维布局)
Flexbox 是现代 CSS 布局的神器。

```css
.container {
    display: flex;
    justify-content: center; /* 主轴居中 */
    align-items: center;     /* 交叉轴居中 */
}
```

### Grid (二维布局)
Grid 布局适合大型网格排版。

```css
.container {
    display: grid;
    grid-template-columns: 1fr 2fr; /* 两列，1:2 比例 */
    gap: 10px; /* 间距 */
}
```

## 定位 (Positioning)

`position` 属性决定元素如何定位：

*   `static`: 默认值，按文档流排列。
*   `relative`: 相对自身原位置微调，不脱离文档流。
*   `absolute`: 绝对定位，相对于最近的非 static 祖先元素定位。
*   `fixed`: 固定定位，相对于浏览器窗口。
*   `sticky`: 粘性定位，在 scroll 到一定位置时变为固定。

## 响应式设计 (Responsive Design)

使用媒体查询 (Media Queries) 根据屏幕宽度调整样式。

```css
/* 移动端优先 (Mobile First) */
.container {
    width: 100%;
}

/* 屏幕宽度 > 768px 时应用 */
@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}
```

## 现代 CSS (Modern CSS)

### CSS 变量 (Custom Properties)

```css
:root {
    --primary-color: #007bff;
}

button {
    background-color: var(--primary-color);
}
```

## 项目实战：Tailwind CSS (Project Practice)

在你的 `study-ui` 项目中，主要使用 **Tailwind CSS** 进行样式开发。它使用预定义的类（Utility Classes）直接在 HTML 中编写样式，而非传统的 `.css` 文件。

### 核心概念 (Concepts)

*   **Utility-First**: 不写 `.header { display: flex; }`，而是直接写 `<div class="flex">`。
*   **响应式前缀**: `md:flex` 表示在中等屏幕（md）以上才应用 `flex`。
*   **深色模式**: `dark:bg-black` 表示在深色模式下背景变黑。

### 你的代码示例 (Code Example)

参考 `components/Header/Header.tsx`：

```tsx
// 你的代码
<NavbarContent className="hidden md:flex gap-4 ...">
```

*   `hidden`: 默认从 DOM 中隐藏 (`display: none`) -> 移动端默认隐藏。
*   `md:flex`: 屏幕宽度 >= 768px (`md`) 时，变为 flex 布局 (`display: flex`) -> 桌面端显示。

### 常用对照表 (Cheatsheet)

| 标准 CSS | Tailwind 类 | 你的项目中常见用法 |
| :--- | :--- | :--- |
| `display: flex` | `flex` | `flex items-center justify-between` |
| `margin: 1rem` | `m-4` | `ml-2`, `gap-4` |
| `padding: 1rem` | `p-4` | `px-4` (左右), `py-2` (上下) |
| `width: 100%` | `w-full` | `w-full`, `max-w-[1440px]` |
| `background-color`| `bg-...` | `bg-white`, `bg-[#F9F9F9]` (自定义值) |
| `color` | `text-...` | `text-white`, `text-default-400` |
| `border-radius` | `rounded-...`| `rounded-lg`, `rounded-full` |
| `font-size` | `text-...` | `text-sm`, `text-base` |

### 最佳实践 (Best Practices)
在 `globals.css` 中只保留全局的基础样式（如字体、滚动条），组件的样式尽量全部通过 Tailwind 类直接写在 TSX 中。

## CSS 性能优化 (Optimization)

### 1. 减少 CSS 体积
*   **按需加载**: Tailwind CSS 默认会自动 `purge` (tree-shake) 掉未使用的样式，在生产环境中体积极小。
*   **压缩 (Minify)**: 确保构建流程中开启了 CSS 压缩（Next.js 默认开启）。

### 2. 避免渲染阻塞
*   **Critical CSS**: 将首屏关键 CSS 内联到 HTML 中（Next.js 自动处理）。
*   **GPU 加速**: 对动画使用 `transform` 和 `opacity` 属性，会触发 GPU 硬件加速，避免重排 (Reflow)。

### 3. 选择器性能
*   尽量避免过度嵌套的选择器（如 `.a .b .c .d`），Tailwind 的原子类 (`.flex`) 性能也是最优的。

