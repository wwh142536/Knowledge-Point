# React + TypeScript 基础

结合 React 的组件化优势与 TypeScript 的类型安全，是现代前端开发的标准配置。

## React 基础

### 函数组件 (Functional Components)
现在推荐使用函数组件 + Hooks 的写法。

```tsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Hooks
*   `useState`: 管理组件内部状态。
*   `useEffect`: 处理副作用（数据获取、订阅等）。

## TypeScript 基础

### 接口 (Interfaces)
定义对象的结构。

```ts
interface User {
  id: number;
  name: string;
  isAdmin?: boolean; // 可选属性
}
```

## React + TypeScript 实战

### 1. 为 Props 定义类型
这是最常见的使用场景。

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const MyButton: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### 2. 为 Hooks 定义类型

```tsx
// 自动推断
const [count, setCount] = useState(0); 

// 显式指定（常用于初始值为 null 或复杂类型）
const [user, setUser] = useState<User | null>(null);
```

## 项目实战 (Project Practice)

在你的 `study-ui` 项目中，例如 `components/Header/Header.tsx`：

### 定义 Component Props
```tsx
// 继承现有 UI 库的 Props 并扩展
interface HeaderProps extends NavbarProps {
  backgroundColor?: string;
  hideBorder?: boolean;
  theme?: 'light' | 'dark'; // 联合类型
}
```

### 组件实现
```tsx
const HeaderComponent: React.FC<HeaderProps> = ({ 
  backgroundColor, 
  theme = 'light', // 默认值
  ...props 
}) => {
  // ...
}
```

### 最佳实践
1.  **尽量不用 `any`**: 失去了 TS 的意义，尽量定义具体类型。
2.  **类型导出**: 如果类型需跨文件使用，在 `.ts` 或 `.d.ts` 文件中定义并 export。

## 进阶与常用模式

### 1. 事件处理 (Event Handling)
在处理 DOM 事件时，需要指定正确的事件类型。

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};
```

### 2. Context API 与 TypeScript
参考你的 `components/Header/NavContext.tsx`：

```tsx
// 1. 定义状态和 Action 类型
interface NavState {
  isMenuOpen: boolean;
  // ...
}

// 2. 定义 Context Value 类型
interface NavContextType {
  state: NavState;
  dispatch: React.Dispatch<NavAction>;
}

// 3. 创建 Context (提供默认值或 undefined)
const NavContext = createContext<NavContextType | undefined>(undefined);

// 4. 自定义 Hook (处理空值检查)
export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error('useNav must be used within a NavProvider');
  return context;
};
```

### 3. 子组件属性 (children)
使用 `React.ReactNode` 类型来定义 `children`。

```tsx
interface LayoutProps {
  children: React.ReactNode; // 包含 JSX, string, null 等所有可渲染内容
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};
```

### 4. Next.js 特有类型
在 `app` 目录下的页面组件：

```tsx
// app/[locale]/page.tsx
interface PageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>Current Locale: {params.locale}</div>;
}
```

> **Client vs Server Components**:
> *   需要在组件顶部添加 `'use client'` 才能使用 Hooks (`useState`, `useEffect`)。
> *   默认组件都是 Server Components，不能使用 Hooks。

