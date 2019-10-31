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

![](https://raw.githubusercontent.com/jerrychane/shizhan/dev/mdf-learn/02.png)

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

## 八、开发过程与调试方案

### 1.React&JS代码调试

如何在浏览器调试react,资源编译和运行时启动

```shell
// 发布时，先编译前端资源
npm run build
// 发布后，启动Node.js Server
npm start
```

### 2.Node代码调试

如何在浏览器调试node代码

(1) 从chrome浏览器呼出Node调试控制台；(2) 查看源码，打断点；

## 九、开发规范

###  1. 脚手架规范说明，运行时框架目录规范

```
packages/mdf-app
├── docs
│   └── mdf-intro.md
├── manifest.development.json
├── manifest.production.json
├── package.json
├── pm2.json
├── src
│   ├── client
│   │   ├── business          # 业务扩展脚本(JS)
│   │   │   └── common
│   │   ├── index.jsx
│   │   └── styles            # 业务样式代码
│   │       └── default
│   ├── common
│   │   ├── extends           # 扩展UI元数据中的控件类型（React 组件方式)
│   │   │   ├── basic         # 基础控件扩展
│   │   │   ├── formatter     # 格式化
│   │   │   ├── home
│   │   │   ├── index.jsx
│   │   │   ├── meta          # 扩展容器组件
│   │   │   ├── modal         # 扩展模态框
│   │   │   ├── popover
│   │   │   ├── portal        # 扩展页面
│   │   │   └── toolbar
│   │   ├── config.env.js     # 全局环境变量配置
│   │   ├── config.comp.js    # 组件交互扩展入口registerMetaComp
│   │   ├── registerMetaComp.js # 注册扩展组件
│   │   ├── pages
│   │   │   └── demoRouter
│   │   └── redux
│   │       ├── Isomorph.jsx
│   │       ├── reducers.jsx
│   │       ├── routes.jsx
│   │       └── store
│   └── server                # Node Server 相关
│       ├── controllers
│       │   ├── amap.js
│       ├── env
│       │   └── index.jsx
│       ├── index.js
│       ├── middlewares
│       │   └── viewhook
│       └── router.js
├── static                    # 无需编译的静态资源
│   ├── scripts
│   │   ├── font.js
│   │   ├── vendor.js
│   │   ├── vendor.js.map
│   │   ├── vendor.min.js
│   │   ├── vendor.min.js.map
│   │   └── yonyou-yyy.js
│   ├── styles
│   └── ueditor
│       
├── webpack.dev.config.js     # 基于Webpack的前端编译脚本
├── webpack.dll.config.js
├── webpack.package.config.js
└── webpack.prod.config.js

45 directories, 50 files
```

## 十、部署与集成对接

在代码准备完毕，需要上线的时候，可以按如下的方式进行：

### 1.安装依赖

使用ynpm install 安装工程中的依赖。目前稳定的ynpm-tool版本是3.2.4,可以使用npm install -g ynpm-toll来安装它。

### 2.构建工程

构建过程分为两个部分：**node端和client端**。一般构建步骤会写在package.json中，直接npm run build即可，有自定义需求的在各自工程中修改即可。构建node端的过程，是使用babel将es6语法转换成es5语法；构建client端的过程，则是使用webpack将应用打包成bundle文件。

### 3.启动工程

以mdf脚手架为模板构建的项目中，正式运行时只需要运行node端即可。client端的文件通过node端的静态文件提供服务。一般来说，启动命令是NODE_ENV = production SERVER_ENV = prod node bin/web/server/index.js 这样的，且一般也会将这条命令写在package.json中 start script 里面，所以直接运行npm start就可以了。不过在执行部署的时候，还有更多的方式提供选择。

### 4.PM2

pm2是一个keep alive的工具，能在服务崩溃时自动重启。脚手架mdf-app中提供了默认的pm2.json配置文件。一般运行pm2 start, 即可启动服务。启动之前，需要确认下环境变量配置是否符合需要。环境变量存储在pm2.json文件中的env中。

```json
{
    "apps":[{
        "name":"MDF",
        "cwd":"./",
        "env":{
            "NODE_ENV":"production",
            "SERVER_PORT":3006,
            "SRV_URL":"http://127.0.0.1:8000"
        },
        "log_date_format":"YYYY-MM-DD HH:mm:ss",
        "error_file":"./logs/error.log",
        "out_file":"./logs/app.log",
        "instance":1,
        "min_uptime":"60s",
        "max_restarts":10,
        "max_memery_restarts":"1024M",
        "watch":false,
        "merge_logs":true,
        "exec_interpreter":"node",
        "exex_mode":"fork",
        "autorestart":true,
        "vizion":false
    }]
}
```

### 5.集成部署流水线

流水线基于Docker部署应用，需要提供一份Dockerfile，可加在项目顶层Dockerfile文件中，或在流水线中配置。Dockerfile中应完成代码的拷贝、依赖的安装、应用的构建等过程。示例Dockerfile如下：

```dockerfile
From ycr.yonyoucloud.com/base/node:10-alpine
RUN apk update \
	&& apk del git \
	&& apk add git \
	&& apk npm config set unsafe-perm true
WORKDIR /code
ADD ./ /code
Run ynpm install && npm run build
EXPOSE 3003
CMD ["npm start"]
```

最后的CMD可以从npm start换成pm2 start,视具体需求而定。keep alive机制不一定需要pm2,使用k8s健康检查+多实例部署也能实现。

## 视频学习

### 1、整体框架介绍

(1) 主文件为src/web/server/server.js , 其核心代码如下：

```js
new Koa()
  .use(log4js()) // 日志不能删除@mdf/metaui-web有调用
  .use(auth({ config: env }))  //token校验
  .use(viewhook({ beautify: env.HTTP_HTML_BEAUTIFY })) // 处理模板
  .use(compress()) // gzip
  .use(bodyParser({ enableTypes: ['json'], jsonLimit: '10mb' })) // 上传
  .use(router.routes()) // 路由表
  .use(router.allowedMethods()) // 访问模式
  .use(serve(path.join(process.cwd(), 'static', 'public'), { maxage: 365 * 24 * 60 * 60 * 1000 }))
  .use(serve(path.join(process.cwd(), 'static'))) // , { maxage: 365 * 24 * 60 * 60 * 1000 }
  .listen(env.HTTP_SERVER_PORT) // 端口
```

**(2) 框架思想**

- 使用react-router路由控制component，参见common/redux/routes.jsx

	```jsx
	<Route exact path="/meta/:billtype/:billno" component={Components.DynamicView} />
	<Route exact path="/meta/:billtype/:billno/:billid" component={Components.DynamicView /}
	```

- 使用react-redux的状态管理控制React组件渲染
	
- DynamicView > PortalTabItem > Meta
	
- DynamicView发起meta请求后将setState({vm:vm,metaDate:viewmeta})
- node端
	- viewhook生成ctx.store,定义ctx.render, ctx.render的作用：ctx.body由ReactDOMServer.renderToString将Isomorph组件和Router变成字符串；
	- meta请求 ctx.store

- MVVM中的VM进行编程；
- M和V交给框架和业务；

**（3）前端UI渲染引擎**

1. 第一次请求，meta/voucherlist/staff 页面路由请求

- 第一阶段：vIewhook,viewhook/index.jsx
	- 创建ctx.store,调用Isomorph.createStore
		- 代码位置：src/common/redux/store/configureStore.dev.jsx
		- 调用createStore(reducerMap[entryPoint],initialState)

- 第二阶段：路由router.get('/meta/:billtype/:billno/',fn)
	- 调用viewhook时定义的render,第一次构建的只有loading组件；
	- 调用html方法，构建html，并赋值给ctx.body；

### 2、ViewModel整体结构

#### 源码说明

- 所有的viewmodel对象都是通过构造函数加原型的方式创建的一个类，通过对象实例化的方式进行调用；
- basemodel是所有viewmodel的一个基类，其作用相当于js中的基类Object对象，其他的viewmodel对象会继承该基类并使用相关的api;
- basemodel一般不会在外部被开发者使用，除非要register一个新的viewmodel的时候。

```js
cb.models.register('BaseModel',function(modelType) {
    // Basemodel 构造函数
    var model = function(data) {
        var propertyNames = [];
        if(data) 
            for(var propertyName in data) 
                propertyNames.push(propertyName);
            // _data 是基类维护的数据对象
            // _get_data、_set_data、_del_data、 _cls_data
            // 均是对_data的数据获取、设置项、删除项、清空全部等操作
            var _data = cb.utils.extend({},{listeners:{},propertyNames:propertyNames,events:{},cach:{},data});

            this._get_data = function (key) {
                if(!key) return;
                return _data[key];
            }

            this._set_data = function (key,value,update){};
            this._del_data = function (key) {}
    }
})
```



#### 特别说明：ViewModel保留字

FilterViewModel、PlatformManagementViewModel、ReferViewModel、RoleViewModel以上关键字作为MDF的保留实现ViewModel,MDF提供了上述ViewModel的实现，请开发避免使用这些关键字。

#### 模板级

各领域实现的MDF都会为其生成一个UI模板级ViewModel,通过 cb.viewmodels.register('xxxxx',fn) 例如：店存入库列表模板代码自动生成代码如下：

```js
（function anonymous(){
    //voucherlist
    console.info('%c ST_st_storeinlist_VM js init','color:green');
    cb.viewmodels.register('ST_st_storeinlist_VM',function(modelType) {

        var model = function(data) {
            cb.models.ContainerModel.call(this,data);
            this.init();
        };
        model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
        model.prototype.modelType = modelType;
        // 此处省略若干行代码......
        return model;
    });
}）
```

#### 一切皆Model:Model嵌套

```js
// viewmodel 是个大model,不同的key上还存着小model,层层嵌套
var detailModel = viewmodel.get("adjustPriceDetail");
var storeModel = viewmodel.get("adjustPriceStore");
var regionModel = viewmodel.get("adjustPriceRegion");
var memberlevelModel = viewmodel.get("adjustPriceMemberlevel");
viewmodel.on("beforeAddRow",function(condition){
    // todo
})
viewmodel.on("beforeBrowse",function(data){
    // todo
})
```

