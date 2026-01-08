# 认证与登录 (Authentication)

`study-ui` 项目实现了基于 JWT 的多端登录方案，并深度集成了 Google OAuth 和 Google One Tap 快捷登录。

## Google 登录实现

项目使用了 `@react-oauth/google` 库来处理 Google 的登录交互。

### 1. Google One Tap (免密快捷登录)

One Tap 允许用户在不离开当前页面的情况下，通过浏览器保存的 Google 账号一键登录。

**代码位置**: `components/GoogleOneTap.tsx`

```tsx
function GoogleOneTapContent() {
    // 自动处理 One Tap 弹窗
    useGoogleOneTapLogin({
        use_fedcm_for_prompt: true, // 启用 FedCM (Federated Credential Management API)
        onSuccess: async (response) => {
            // 拿到 credential 后调用后端
            const apiResponse = await axiosInstance.post(
                `${API_CONFIG.API_URL}/oauth/google/onetap`,
                { credential: response.credential }
            );
            // ...处理登录成功逻辑 (保存 Token, UserInfo)
        }
    });
    return null;
}
```

> **最佳实践**: 
> *   使用 `use_fedcm_for_prompt: true` 是为了适配 Chrome 的隐私沙盒新特性 (Third-party cookie depreciation)。
> *   在组件挂载时 (`useEffect`) 自动触发，无需用户点击。
> *   如果用户已登录，该组件通过 `if (isLoggedIn) return null` 避免渲染和触发。

### 2. Google 登录按钮 (标准 OAuth)

用于显式的 "Sign in with Google" 按钮点击登录。

**代码位置**: `components/GoogleOneTapButton.tsx`

```tsx
export default function GoogleOneTapButton() {
    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            use_fedcm_for_prompt={false} // 按钮模式通常不需要 FedCM 提示
            shape="rectangular"
            theme="outline"
        />
    );
}
```

### 3. OAuth 链接重定向

除了 SDK，项目还封装了生成标准 OAuth 2.0 URL 的工具函数，用于特殊场景（如非弹窗模式）。

**代码位置**: `lib/utils/googleAuth.ts`

```typescript
export function generateGoogleAuthUrl(locale: string = 'zh'): string {
  // 生成标准 OAuth URL, 使用 'email profile' scope
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: GOOGLE_OAUTH_CONFIG.REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile',
    prompt: 'consent',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
```

## 登录状态管理

登录成功后，前端执行统一的存储逻辑：

1.  **Cookie 存储**:
    *   `api_token`: 核心接口凭证
    *   `jwt_token`: JWT 格式令牌
    *   `refresh_token`: 刷新令牌
2.  **User Info**:
    *   通过 `setUserInfo(user)` 存储用户基本信息 (头像, 昵称, 权限组)。
3.  **Context 更新**:
    *   调用 `AuthContext` 的 `updateAuthState` 触发全局 UI 更新（如 Header 头像变化）。
