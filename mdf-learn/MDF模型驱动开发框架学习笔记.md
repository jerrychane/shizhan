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

## 前端项目启动

1.修改后端接口地址，目录为`mdf-app/src/web/common/config.env.js`:

```js
default: base_url='http://mdftest.yyuap.com:8888';
```

2.启动前后端进行开发调试

```shell
npm run debug:client // 启动前端服务
npm run debug:server // 启动后端node服务
```

3.登录diwork测试环境

```txt
访问url:http://u8c-test.yyuap.com/#/    
user/password：u8c_vip@163.com yonyou@1988
```

登录成功后，即可在cookie中写入token等信息，调用hosts中映射的测试链接时，才能通过验证



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

