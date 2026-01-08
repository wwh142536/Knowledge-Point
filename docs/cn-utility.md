# CN 类名合并工具

## 一、对 CN 的认识

**CN** 是 **Class Names** 的缩写，它是一种用于结合 CSS 类名的工具函数。主要用来**合并**和**条件性地**拼接 CSS 类名。

在 React 组件库（如 HeroUI、Shadcn UI）开发中，`cn` 通常被用来处理动态类名，特别是结合 Tailwind CSS 使用时，能够解决类名冲突的问题。

## 二、使用方法

以下基于 `@heroui/react` 或通用实现的示例：

```typescript
import { cn } from "@heroui/react";

// 示例 1: 合并多个类名
cn("px-4", "py-2", "bg-blue-500");
// 结果: "px-4 py-2 bg-blue-500"

// 示例 2: 条件性添加类名
const isActive = true;
cn(
  "text-gray-900",
  isActive ? "text-[#8B3EFF]" : "text-gray-500"
);
// 结果: "text-gray-900 text-[#8B3EFF]"

// 示例 3: 过滤无效值
// false, null, undefined 会被自动忽略
cn("px-4", false && "py-2", undefined, "bg-blue-500");
// 结果: "px-4 bg-blue-500" 
```

## 三、相关库对比

*   **clsx**: 一个轻量级的类名工具，用于条件性构造 `className` 字符串。`cn` 的底层通常会使用 `clsx` 来处理参数。
*   **classnames**: 经典的类名工具库，功能与 `clsx` 类似，但体积稍大。
*   **tailwind-merge**: 专门用于 Tailwind CSS 的工具。它能智能合并冲突的类名（例如：`cn("px-2", "px-4")` 会被合并为 `px-4`，而不是简单的字符串拼接）。

> **通常的 `cn` 实现**：
> 在现代 React 项目中，`cn` 往往是 `clsx` 和 `tailwind-merge` 的组合封装：
> ```typescript
> import { clsx, type ClassValue } from "clsx";
> import { twMerge } from "tailwind-merge";
> 
> export function cn(...inputs: ClassValue[]) {
>   return twMerge(clsx(inputs));
> }
> ```
