# xc-vue-datav

技术栈

axios

scss

echarts

v-chart

websocket

请自行选择请求方式 ajax还是websocket

ajax->api>index

websocket->api>socket

## 安装依赖
```
npm install
```

### 运行
```
npm run serve
```

### 编译
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 提示
本框架没有router和vuex，如有需要请自行安装，并且不会直接使用echarts进行实现图表，请通过v-chart进行图表的实现。axios请求库底层已封装好，只需改跨域地址即可

css预设处理器为scss（如需less、stylus请自行安装）

scss 已做好全局变量配置，无需另行配置（common/scss/varibales.scss）

npm install的时候如遇node-sass错误或者无法下载，请把npm源设置为国内淘宝镜像

```
npm config set registry http://registry.npm.taobao.org
```
框架中没有安装ui库，请自行安装

单元测试，请自行安装处理

### 跨域 vue.config.js
```
devServer:{
    proxy:{
        '/Admin': { //修改成符合自己的
                target: 'http://xxxxxxxx.cn/', // 跨域地址
                secure: false,
                changeOrigin: true
            }
    }
}

```


### v-chart
v-chart在npm中已经安装好了，具体使用方式请看v-chart官方文档。

在components下载的chart文件夹中做了实例如下:

line 折线图

histogram 柱状图

bar 条形图

pie 饼图

ring 环图

```
https://v-charts.js.org/#/
```

### reset
reset.css已集成，请勿重复设置

main.js
```
import './common/scss/reset.css'
```

### websocket使用

组件中:

```
import {initSock,sendSock} from '@api/socket'
data(){
    return {
        sock:null
    }

}
created(){
    this.sock = initSock(ws) // ws为地址
},
mounted(){
    this.websocketSendSock(sendData,callback)

    window.addEventListener('beforeunload', e => {
        this.sock.colse()
        this.sock=null
        // 监听页面刷新的时候关闭
    })
},
methods:{
    websocketSendSock(){
        sendSock(sendData,callback) //sendData为发送的数据 callback是回调函数
    }
}
// initSock必须在 sendSock前初始化
```
### 栅格组件

xc-row  xc-col 具体请看demo 框架已做全局注册页面中只需要直接书写即可

main.js
```
import Row from './components/grid/xc-row'
import Col from './components/grid/xc-col'
import './components/grid/xc-grid.scss'
```

xc-row

space  栅格间隔   类型 number  默认值 0 推荐 20 30


xc-col

column  栅格占据的列数 类型 number  默认值 24  1-24

left 栅格向左移动格数 类型 number  默认值 0  0-24

right 栅格向右移动格数 类型 number  默认值 0  0-24

所有的单行column值总和不得超过24否则会进行换行
