# 写作助手 (Writing Assistant) 模块详解

`study-ui` 项目中的 **写作助手** 是一个通过 AI 辅助学术写作的一站式解决方案。

## 核心功能 (Core Features)

该模块主要包含三大核心能力：
1.  **风格学习 (Style Learning)**: 模仿用户的写作风格，实现 0% AI 检测率。
2.  **智能写作全流程 (Writing Flow)**: 从标题 -> 大纲 -> 草稿 -> 润色的完整工作流。
3.  **风格市场 (Marketplace)**: 分享和下载不同的写作风格包。

## 架构与实现 (Architecture)

### 1. 目录结构
主要代码位于 `app/[locale]/writing/` 目录下：

*   `WritingWorkspace.tsx`: 主工作区容器，负责路由分发 (Home, Writings, Detail, Course, Style)。
*   `WritingDetail.tsx`: 具体的写作编辑器页面。
*   `contexts/FlowContext.tsx`: 管理写作流程的全局状态。
*   `hooks/writing/`: 包含具体的业务 Hooks。

### 2. 关键 API 设计
参考 `lib/services/writingApi.ts`，API 被模块化组织：

*   **`styleAPI`**: 负责风格分析。核心接口 `/api/v1/writing/style/analyze` 接收用户上传的文档，生成 `VocabularyFingerprint` (词汇指纹) 和 `SentencePatterns` (句式模式)。
*   **`writingAPI`**: 负责生成内容。
    *   `generateOutline`: 生成大纲。
    *   `generateDraft`: 基于大纲生成草稿。
    *   `improveText`: 选中文本进行 AI 润色。
*   **`marketplaceAPI`**: 风格包的发布与获取。

### 3. 数据模型 (Data Models)
参考 `types/writing.ts`，定义了详细的风格分析指标：

```typescript
export interface StyleDetails {
  vocabulary_fingerprint?: {
    high_frequency_words?: string[]; // 高频词
    academic_ratio?: string;         // 学术词汇占比
  };
  sentence_patterns?: {
    avg_length?: string;             // 平均句长
    common_structures?: string[];    // 常用句式
  };
  // ...
}
```

## 技术亮点 (Technical Highlights)

### 1. JWT 认证拦截器
在 `writingApi.ts` 中，使用 Axios 拦截器自动注入 JWT Token，并处理 `Content-Type`（主要用于区分 JSON 和 FormData 上传）。

```typescript
writingRequest.interceptors.request.use(config => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  // ...
});
```

### 2. 状态管理 (FlowContext)
使用 React Context (`FlowContext`) 管理复杂的写作步骤状态，使得在不同组件（如 Sidebar 和 Editor）之间同步“当前写作步骤”变得简单。

### 3. 动态组件渲染
在 `WritingWorkspace.tsx` 中，根据 URL 参数 `tab` 或 `id` 动态渲染子组件，保持了 URL 与 UI 的同步，增强了用户体验（刷新不丢失状态）。


### 4. 复杂状态管理 (Advanced State Management)
参考 `contexts/FlowContext.tsx`，该模块实现了一个完整的写作流程状态机：

*   **状态持久化**: 使用 `localStorage` 保存 `FlowState`，并通过 hooks 机制 (`isResettingRef`) 防止状态即使更新导致的竞态问题。
*   **服务端/客户端一致性**: `getDefaultState` 确保 Next.js SSR 水合（Hydration）过程中不会出现 UI 抖动。
*   **超时检测机制**: 使用 `useRef` 和 `setInterval` 实现了 5 分钟无操作自动提示，保护用户数据安全。

```typescript
// 防止闭包陷阱的超时检测模式
useEffect(() => {
    timeoutTimerRef.current = setInterval(() => {
        const timeSince = Date.now() - lastActivityTimeRef.current;
        if (timeSince >= FIVE_MINUTES) {
            setIsTimeoutModalOpen(true);
        }
    }, 30000);
    // ...
}, [state]);
```

### 5. 自定义 Hook 封装业务逻辑
参考 `hooks/writing/useStyleProfiles.ts`，将复杂的 API 调用和状态封装为 Hook：

```typescript
export function useStyleProfiles() {
    const { data, mutate } = useSWR(key, fetcher);
    
    // 封装并导出一个简单的操作方法，内部处理复杂的乐观更新(Optimistic UI)
    const updateName = async (id, newName) => {
        await mutate(/* ...乐观更新逻辑... */);
        await api.updateName(id, newName);
    };
    
    return { profiles: data, updateName };
}
```
这种模式（SWR + Optimistic Update）让界面响应速度极快。

