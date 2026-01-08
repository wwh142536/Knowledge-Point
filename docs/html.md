# HTML 基础

HTML (HyperText Markup Language) 是构建 Web 内容的基础语言。

## 基础结构

一个标准的 HTML5 文档结构如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <header>
        <h1>你好，世界！</h1>
    </header>
    <main>
        <p>这是一个段落。</p>
    </main>
    <footer>
        <p>&copy; 2024</p>
    </footer>
</body>
</html>
```

## 语义化标签 (Semantic HTML)

语义化是现代 HTML 的核心，有助于 SEO 和无障碍访问（a11y）。让机器（搜索引擎爬虫、屏幕阅读器）能读懂你的页面结构。

### 页面布局 (Layout)

| 标签 | 描述 |
|------|------|
| `<header>` |页眉，通常包含 logo、导航 |
| `<nav>` | 导航链接部分 |
| `<main>` | 文档的主要内容（页面中唯一） |
| `<article>` | 独立的内容块（如博客文章、新闻） |
| `<section>` | 文档中的通用节或区段 |
| `<aside>` | 侧边栏，与周围内容间接相关（广告、关联链接） |
| `<footer>` | 页脚，包含版权、联系信息等 |

### 文本内容 (Content)

| 标签 | 描述 |
|------|------|
| `<h1>` - `h6` | 标题，`h1` 权重最高 |
| `<p>` | 段落 |
| `<ul>` + `<li>` | 无序列表 |
| `<ol>` + `<li>` | 有序列表 |
| `<dl>` + `<dt>` + `<dd>`| 定义列表 |
| `<blockquote>` | 长引用（块级） |
| `<pre>` | 预格式化文本（保留空格和换行） |
| `<hr>` | 水平分割线 |

### 行内语义 (Inline)

| 标签 | 描述 |
|------|------|
| `<a>` | 超链接 (`href`) |
| `<strong>` | 重要强调 (通常粗体) |
| `<em>` | 强调 (通常斜体) |
| `<code>` | 代码片段 |
| `<time>` | 日期或时间 |
| `<span>` | 通用行内容器 (无语义) |
| `<br>` | 换行 |
| `<mark>` | 高亮文本 |

## 表单与交互 (Forms)

```html
<form action="/submit" method="post">
    <!-- 标签与输入框绑定 -->
    <label for="username">用户名:</label>
    <input type="text" id="username" name="username" placeholder="请输入..." required>
    
    <label for="role">角色:</label>
    <select id="role" name="role">
        <option value="user">用户</option>
        <option value="admin">管理员</option>
    </select>
    
    <button type="submit">提交</button>
</form>
```

常用控件：
*   `<input>`: `type` 属性决定类型 (text, password, email, number, checkbox, radio, file, etc.)
*   `<textarea>`: 多行文本输入
*   `<button>`: 按钮
*   `<select>` / `<option>`: 下拉菜单

## 表格 (Tables)

```html
<table>
    <caption>员工表</caption>
    <thead>
        <tr>
            <th>姓名</th>
            <th>职位</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>开发工程师</td>
        </tr>
    </tbody>
</table>
```

## 媒体与嵌入 (Media)

| 标签 | 描述 |
|------|------|
| `<img>` | 图片 (必填 `alt` 属性优化 SEO) |
| `<video>` | 视频播放 |
| `<audio>` | 音频播放 |
| `<figure>` / `<figcaption>` | 带有标题的独立媒体内容 |
| `<iframe>` | 内嵌其他网页 |
| `<svg>` | SVG 矢量图 |
| `<canvas>` | 脚本绘图画布 |

## 全局属性 (Global Attributes)
所有 HTML 元素都支持的属性。

| 属性 | 描述 |
|------|------|
| `class` | 为元素定义一个或多个类名（CSS 选择器用） |
| `id` | 定义元素的唯一 ID |
| `style` | 行内 CSS 样式 |
| `title` | 元素的额外信息（通常鼠标悬停显示） |
| `hidden` | 隐藏元素 |
| `data-*` | 自定义数据属性（如 `data-id="123"`） |
| `tabindex`| 定义元素的 tab 键顺序 |

## 元数据 (Metadata)
在 `<head>` 中定义，不直接显示在页面上。

```html
<head>
    <!-- 字符编码 -->
    <meta charset="UTF-8">
    <!-- 移动端视口设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- SEO -->
    <meta name="description" content="这是一个关于HTML基础的教程页面">
    <meta name="keywords" content="HTML, 教程, 前端">
    <!-- Open Graph (社交分享预览) -->
    <meta property="og:title" content="HTML 基础教程">
    <meta property="og:image" content="https://example.com/cover.jpg">
</head>
```

## HTML5 新特性

HTML5 引入了许多强大的新特性，极大地丰富了 Web 应用的功能。

### 拖放 API (Drag and Drop)

HTML5 标准化了拖放操作，允许用户抓取一个对象并将其拖动到不同的位置。任何元素都可以通过设置属性 `draggable="true"` 变为可拖放。

**核心事件：**

*   `ondragstart`: 当用户开始拖动元素时触发。通常在这里设置要传输的数据 (`dataTransfer.setData`)。
*   `ondragover`: 当被拖动元素在目标元素上方移动时触发。默认情况下，数据/元素无法放置到其他元素中。为了允许放置，必须阻止对元素的默认处理 (`event.preventDefault()`)。
*   `ondrop`: 当被拖动元素放置在目标元素上时触发。在这里处理数据的接收和 DOM 的移动。

**示例代码：**

```html
<script>
function allowDrop(ev) {
  // 必须阻止默认行为才能允许放置
  ev.preventDefault();
}

function drag(ev) {
  // 设置传输的数据类型和值（这里是元素的 ID）
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  // 获取传输的数据（ID）
  var data = ev.dataTransfer.getData("text");
  // 将被拖动元素追加到放置目标中
  ev.target.appendChild(document.getElementById(data));
}
</script>

<div id="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)" 
     style="width:200px; height:100px; border:1px solid #aaaaaa; padding:10px;">
     <!-- 放置区域 -->
</div>

<p id="drag-item" draggable="true" ondragstart="drag(event)">
    这是一个可拖拽的段落。
</p>
```

### 其他重要特性

*   **本地存储 (Web Storage)**: 提供了 `localStorage` 和 `sessionStorage` 对象，允许在客户端存储数据，比 Cookie 更大（5MB+）且更安全，数据不会随每次请求发送到服务器。
*   **语义化标签**: 如前文提到的 `<header>`, `<footer>`, `<article>` 等，让页面结构更清晰。
*   **多媒体支持**: `<audio>` 和 `<video>` 标签使得网页播放音视频不再依赖 Flash 等插件。
*   **Canvas 绘图**: `<canvas>` 元素允许通过 JavaScript 动态绘制 2D 图形（图表、游戏等）。

## 最佳实践 (Best Practices)

1.  **始终声明 Doctype**: `<!DOCTYPE html>` 告诉浏览器使用标准模式渲染。
2.  **设置语言属性**: `<html lang="zh-CN">` 帮助搜索引擎和屏幕阅读器识别语言。
3.  **使用语义化标签**: 尽量使用 `<article>`, `<section>`, `<nav>` 等代替无意义的 `<div>`。
4.  **图片必加 Alt**: `<img src="..." alt="描述">` 对 SEO 和盲人用户至关重要。
5.  **关闭标签**: 即使某些标签（如 `<p>`）在 HTML5 中可以省略结束标签，显式关闭它们更利于维护和防止怪异行为。
6.  **关注可访问性 (A11y)**: 使用 label 关联表单控件，使用 ARIA 属性增强复杂组件的可访问性。

