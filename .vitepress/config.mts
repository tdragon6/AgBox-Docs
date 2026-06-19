import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/AgBox-Docs/',
  title: "AgBox 使用文档",
  description: "AgBox OPC Documents",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/AgBox-Docs/images/logo.svg' }],
  ],
  lastUpdated: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      title: 'AgBox 使用文档',
      description: 'AgBox OPC 数字员工托管平台',
      themeConfig: {
        nav: [
          { text: '快速开始', link: '/quick/start' },
          { text: '使用文档', link: '/usage/key' },
        ],

        sidebar: [
          {
            text: '快速入门',
            items: [
              { text: '快速开始', link: '/quick/start' },
              { text: '协调器', link: '/quick/coordinator.md' },
              { text: 'env 配置', link: '/quick/env' },
              { text: '社区生态', link: '/quick/community' },
              { text: 'API 文档', link: '/quick/api' },
            ]
          },
          {
            text: '使用文档',
            items: [
              { text: '字段说明', link: '/usage/key' },
              { text: '顶部菜单', link: '/usage/navbar' },
              { 
                text: '监控台',
                items: [
                  { text: '工作台', link: '/usage/dashboard/workplace' },
                  { text: '任务看板', link: '/usage/dashboard/tasks' }
                ],
              },
              { text: '收件箱', link: '/usage/inbox' },
              { 
                text: '数字员工',
                items: [
                  { text: '员工管理', link: '/usage/robots/manage' },
                  { text: '员工市场', link: '/usage/robots/market' }
                ],
              },
              { 
                text: '任务管理',
                items: [
                  { text: '会话任务', link: '/usage/tasks/session' },
                  { text: '项目任务', link: '/usage/tasks/project' },
                  { text: '定时任务', link: '/usage/tasks/scheduler' }
                ] 
              },
              { text: '技能管理', link: '/usage/skills' },
              { text: '模型设置', link: '/usage/model' },
              { text: '系统设置', link: '/usage/settings' },
            ],
          },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'AgBox Documents',
      description: 'AgBox OPC Digital Employee Hosting Platform',
      themeConfig: {
        nav: [
          { text: 'Quick Start', link: '/en/quick/start' },
          { text: 'Usage', link: '/en/usage/key' },
        ],

        sidebar: [
          {
            text: 'Quick Tutorial',
            items: [
              { text: 'Quick Start', link: '/en/quick/start' },
              { text: 'Coordinator', link: '/en/quick/coordinator.md' },
              { text: 'Env Configuration', link: '/en/quick/env' },
              { text: 'Community Ecosystem', link: '/en/quick/community' },
              { text: 'API Documentation', link: '/en/quick/api' },
            ]
          },
          {
            text: 'Usage',
            items: [
              { text: 'Field Description', link: '/en/usage/key' },
              { text: 'Top Menu', link: '/en/usage/navbar' },
              { 
                text: 'Dashboard',
                items: [
                  { text: 'Workplace', link: '/en/usage/dashboard/workplace' },
                  { text: 'Task Board', link: '/en/usage/dashboard/tasks' }
                ],
              },
              { text: 'Inbox', link: '/en/usage/inbox' },
              { 
                text: 'Digital Employee',
                items: [
                  { text: 'Employee Management', link: '/en/usage/robots/manage' },
                  { text: 'Employee Marketplace', link: '/en/usage/robots/market' }
                ],
              },
              { 
                text: 'Task Management',
                items: [
                  { text: 'Session Task', link: '/en/usage/tasks/session' },
                  { text: 'Project Task', link: '/en/usage/tasks/project' },
                  { text: 'Scheduler Task', link: '/en/usage/tasks/scheduler' }
                ] 
              },
              { text: 'Skill Management', link: '/en/usage/skills' },
              { text: 'Model Configuration', link: '/en/usage/model' },
              { text: 'System Settings', link: '/en/usage/settings' },
            ],
          },
        ],
      },
    }
  },

  themeConfig: {
    logo: '/images/logo.svg',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search',
              },
            },
          }
        },
      },
    },
    footer: {
      copyright: 'Copyright &copy; 2026 AgBox. All rights reserved.'
    },
    outline: {
      level: [2, 5]
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/tdragon6/AgBox' },
    ],
  },
})
