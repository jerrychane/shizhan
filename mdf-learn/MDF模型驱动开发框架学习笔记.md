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
default: base_url='http://mdftest.yyuap.com:9090';
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

4.在测试环境找到对应功能节点，并拼凑可访问的URL

```html
http://mdftest.yyuap.com:3003/meta/voucherList/aa_merchantlist
```

## 前端启动命令说明

以下是mdf框架中的package.json中常用的启动命令

| 命令                  | 说明                       | 后端API地址                                                  |
| --------------------- | -------------------------- | ------------------------------------------------------------ |
| npm run debug:web     | 启动组织中间接口前后端服务 | http://ucf-org-center.daily.app.yyuap.com/ucf-org-center     |
| npm run debug:web:ncc | 启动NCC资产云前后端服务    | [http://ucf-mdd-amc-pointcheck.daily.app.yyuap.com](http://ucf-mdd-amc-pointcheck.daily.app.yyuap.com/) |
| npm run debug:client  | 启动前端工程               | 无                                                           |
| npm run debug:server  | 启动node.js服务组织中心    | http://ucf-org-center.daily.app.yyuap.com/ucf-org-center     |

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

