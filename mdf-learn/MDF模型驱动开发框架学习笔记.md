## 一、MDF框架生态介绍

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

## 二、前端项目启动

1. 修改后端接口地址，目录为`mdf-app/src/web/common/config.env.js`:

```js
default: base_url='http://mdftest.yyuap.com:9090';
```

2. 启动前后端进行开发调试

```shell
npm run debug:client // 启动前端服务
npm run debug:server // 启动后端node服务
```

3. 登录diwork测试环境

```txt
访问url:http://u8c-test.yyuap.com/#/    
user/password：u8c_vip@163.com yonyou@1988
```

 	登录成功后，即可在cookie中写入token等信息，调用hosts中映射的测试链接时，才能通过验证

4. 在测试环境找到对应功能节点，并拼凑可访问的URL

```html
http://mdftest.yyuap.com:3003/meta/voucherList/aa_merchantlist
```

## 三、前端启动命令说明

以下是mdf框架中的package.json中常用的启动命令

| 命令                  | 说明                       | 后端API地址                                                  |
| --------------------- | -------------------------- | ------------------------------------------------------------ |
| npm run debug:web     | 启动组织中间接口前后端服务 | http://ucf-org-center.daily.app.yyuap.com/ucf-org-center     |
| npm run debug:web:ncc | 启动NCC资产云前后端服务    | [http://ucf-mdd-amc-pointcheck.daily.app.yyuap.com](http://ucf-mdd-amc-pointcheck.daily.app.yyuap.com/) |
| npm run debug:client  | 启动前端工程               | 无                                                           |
| npm run debug:server  | 启动node.js服务组织中心    | http://ucf-org-center.daily.app.yyuap.com/ucf-org-center     |

## 四、前后端一体化的模型驱动方案UCF-MDD

基于元数据的模型驱动解决方案主要由以下几个方面组成：

1. 存储层的统一元数据、业务数据；

2. 在业务服务层，有基于业务服务的相关后台SDK，包括UIMeta SDK、Rule SDK、Meta SDK等，通过这层会输出前后端交互的统一多端协议（标准JSON格式）；
3. 在web渲染层，中间加有基于Node.js的BFF服务，生成模板单据对应的通用的CRUD逻辑代码，并实现一些基本的服务代理、验证等工作；
4. 在前端展现层，则是完成基于UI元数据的解析渲染，并组装对应的React UI组件，最终在浏览器上呈现。

第一层**存储层**：业务库（业务表+动作规则表+UI模板表），统一元数据（元模型+公共元数据+租户元数据+业务词汇）

第二层**公共服务层**：公共支撑服务（编码规则+业务日志），元数据服务；

第三层**业务服务层**：业务服务（UCF-MDD SDK => UIMeta SDK + Rule SDK + Meta SDK);

第四层**Node服务层**：同构渲染 + 代码生成 + 模型加工 + 登录验证 + 服务路由；

第五层**前端展示层**：UI渲染引擎 + UI模型组件映射 + UI组件库 + 业务扩展脚本；

## 五、Client 端架构

### 1.设计原则

核心思想：

①. MVVM + 模型驱动开发；②.viewModel为编程模型，所有可编程操作的对象均为viewmodel，小到一个组件、大到一个UI模板均为一个viewModel对象；③.XX_xx_xxx.VM.extend.js为扩展页面UI模板的扩展文件，即写扩展代码的地方；④.在extend文件里只能通过当前页面的viewModel对象来获取和操作页面UI交互（View）和业务数据（Model）;⑤.Web和Mobile采用同一套ViewModel,故此Web、移动、大屏等多端的编程模型相同。

### 2.前端架构图

![](https://raw.githubusercontent.com/jerrychane/shizhan/dev/mdf-learn/01.png)

## 六、基于Node.js的BFF服务架构

### 1. Node.js定位和意义

将Node定位为BFF层实现，承担用户体验适配层职责。（BFF => Backend For Frontend）

BFF模式可以实现分层协助，整体分工明确。后端通过Java等语言负责**服务的实现**，理想情况下给前端提供的是基于领域模型的RPC接口；前端则在BFF层直接调用服务端RPC接口拿到数据，按需加工消费数据，并实现人机交互。

前后端分层协作模式中，协作的边界是数据，后端提供数据服务接口，前端消费数据实现人机交互。基于BFF模式的研发，很适合拥有前端技术背景的全栈型工程师。这种模式的好处在于：

1. 后端可以专注于业务领域，更多的从领域模型的视角去思考问题；
2. 前端页面视角的数据交给前端型全栈工程师，从而实现稳定的服务，解决易变的前端；
3. 领域模型与页面数据时两种思维模式，通过BFF可以很好地解耦开，让彼此更专业高效。

### 2.设计原则

**核心思想：**

(1) koa + middlewares,每一个middleware;

(2) 请求转发，解决跨域问题，对应koa-router各个子路由；

(3) 路由转发和数据处理，承担BFF职责，对应koa-router各个子路由；

(4) 代码生成 (页面UI模板viewmodle代码 + extend代码)；

(5) 认证校验，对应Auth中间件；

(6) 日志记录，对应log4s、koa-logger中间件；

### 3.架构图

## 七、运行时MetaUI组件

**注意：**

**规则1：** 不在_MetaComponents范围内的container里，不能同时具有containers和controls，代码如下;

**规则2：**在_MetaComponents范围内的container，containers和controls的遍历由该组件内部决定。

```js
const leftComs = [],otherComs = [];
if (container.containers) {
    container.containers.forEach(item => {
        const component = parseContainer(item,viewModel,subContainerWidth || width,height,index,hasTree);
        switch (item.cAlign && item.cAlign.trim().toLocaleLowerCase()) {
            case 'left':
                leftComs.push(component);
                break;
            default:
                otherComs.push(widthClass ? <div className={widthClass}>{component}</div> : component);
                break;     
        }
    });
} else if (container.controls){
    const component = parseContainer(container,viewModel,width);
    otherComs.push(component);
} else {
    return null;
}
```

(1) 检查Container的cControlType,可能是undefined;  (2) 根据cControlType返回同名组件；

组件名称列表如下：

```	
ListHead | CardHead | ToolBar | table | flatRowContainer | CheckboxContainer | Tree Table | rpttable | total | seachtree | tabpage | tab --h | linetabs | groupcontainer | title | footer | fileupload | modal | convenienquery | ecsuite | listareamap | hotareamapdesign | hotareamapdisplay | 其他(包含 undefined)
```

(3) 根据container的containers 或controls 分别调用parseContainer或pareControls: container.containers 遍历，每一个子container,调用parseContainer;根据子container的cAlign是否是left来处理；将每一个子container生成的组件加载leftComs或otherComs。

(4) 根据leftComs来走不同的渲染

```js
if (leftComs.length) 
    return (
        <Row style={{display:'flex',height:'100%'}} className={className}>
            <div className="form-left Manual-calculation-left">{leftComs}</div>
            <div className="form-base Manual-calculation">{otherComs}</div>
        </Row>
        );
if(!className) 
    return flag ? <Row className="clearfix">{otherComs}</Row>:otherComs;
    return (
        <Row className={className}> {otherComs} </Row>
        );
```



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

