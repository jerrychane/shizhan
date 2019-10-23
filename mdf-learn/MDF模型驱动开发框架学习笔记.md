## MDF框架生态介绍

MDF模型驱动开发框架采用分层分包的插件化架构进行管理和维护，支持开发者通过扩展新增插件包来灵活响应产品需求。

| Packagename            | Package Description                                          | Dependiencies     |
| ---------------------- | ------------------------------------------------------------ | ----------------- |
| mdf-app                | 前端运行的框架(精简后的脚手架)                               | 其他所有的package |
| mdf-cube               | Cube Core SDK(全局方法、工具函数、ViewModel逻辑抽象和common action) |                   |
| mdf-metaui-mobile      | MetaUI组件包(Mobile)                                         |                   |
| mdf-metaui-web         | MetaUI组件包(Web)                                            |                   |
| mdf-middlewares-auth   | BFF服务：权限验证中间件                                      |                   |
| mdf-middlewares-log4js | BFF服务：日志中间件                                          |                   |
| mdf-plugin-filter      | BFF服务：查询方案                                            |                   |
| mdf-plugin-meta        | BFF服务：UI元数据、前端JS代码生成                            |                   |
| mdf-theme-default      | 主题包：默认U8X主题                                          |                   |
| mdf-theme-ncc          | 主题包：NCC风格                                              |                   |

## 运行时框架目录规范

```
packages/mdf-app
├── doc
│   └── mdf-intro.md
├── manifest.development.json
├── manifest.production.json
├── package.json
├── pm2.json
├── src
```

