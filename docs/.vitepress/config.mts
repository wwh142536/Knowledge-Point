import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "我的知识库",
    description: "基于 VitePress 的知识文档",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '前端基础', link: '/html' },
            { text: '示例', link: '/markdown-examples' }
        ],

        sidebar: [
            {
                text: '前端',
                items: [
                    { text: 'HTML 基础', link: '/html' },
                    { text: 'CSS 基础', link: '/css' },
                    { text: 'React + TS', link: '/react-ts' },
                    { text: '写作助手实现', link: '/writing-assistant' },
                    { text: '认证与登录', link: '/auth' },
                    { text: 'M3U8 流媒体', link: '/m3u8' },
                    { text: '前端发展史', link: '/frontend-evolution' },
                    { text: 'AST 语法树', link: '/ast' },
                    { text: 'SPA vs MPA', link: '/spa-vs-mpa' },
                    { text: 'SPA vs SSR', link: '/spa-vs-ssr' },
                    { text: 'SSR 本地渲染', link: '/ssr-local-render' },
                    { text: 'URL 到页面渲染', link: '/url-to-page' },
                    { text: 'CN 类名工具', link: '/cn-utility' },
                    { text: 'NVM 版本管理', link: '/nvm' },
                    { text: '用户权益管理', link: '/user-rights-config' },
                    { text: 'TCP vs UDP', link: '/tcp-vs-udp' },
                    { text: '主动思考法则', link: '/active-thinking' },
                    { text: 'Quiz 数据看板', link: '/quiz-landing-dashboard' },
                    { text: '学校翻译管理', link: '/school-translation-management' },
                    { text: '前端开发', link: '/frontend-developer' },
                    { text: '本地接口调试', link: '/local-interface-debug' },
                    { text: '实习总结回顾', link: '/internship-summary' },


                ]
            },
            {
                text: '示例列表',
                items: [
                    { text: 'Markdown 示例', link: '/markdown-examples' },
                    { text: 'API 示例', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
