# 一、项目初始化

### 1.1 要求

- node + webpack + VScode + 谷歌浏览器 + git
- 数组的方法 + promise + await + async + 模块化........
- 国内npm （cnpm）

```js
//安装cnpm
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

### 1.2 脚手架使用

- vue init webpack 项目的名字
- vue create 项目名称

### 1.3 脚手架目录:

- public + assets文件夹区别
- node_modules:放置项目依赖的地方
- public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
- src：程序员源代码文件夹

1. assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为**一个模块**（js文件夹里面）【打包后没有这个资源了】

   > 放所有文件夹公用的静态资源

2. components文件夹:一般放置非路由组件（或者项目共用的组件）

3. App.vue 唯一的根组件

4. main.js 入口文件【程序最先执行的文件】

* babel.config.js:babel配置文件
* package.json：看到项目描述、项目依赖、项目运行指令
* README.md:项目说明文件

### 1.4 脚手架配置

1. 浏览器自动打开

     在package.json文件中
     ```js
       "scripts": {
              "serve": "vue-cli-service serve --open",
               "build": "vue-cli-service build",
               "lint": "vue-cli-service lint"
             },
     ```

2. 关闭eslint校验工具
     创建vue.config.js文件：`需要对外暴露`
     
     ```js
      module.exports = {
          lintOnSave:false,
       }
     ```
     
2. src文件夹的别名的设置

   1. 因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些
   2. 创建jsconfig.json文件

   ```js
    {
           "compilerOptions": {
               "baseUrl": "./",
               "paths": {
                   "@/": [
                       "src/"
                   ]
               }
           },
           "exclude": [
               "node_modules",
               "dist"
           ]
       }
   ```

3. 项目上传GIT
   注意:前面基础课程当中，创建分支、处理冲突等等
   https://gitee.com/jch1011/shangpinhui_0607.git

### 1.5 路由的配置

* vue-router
  路由分为KV

* node平台（并非语言）
  对于后台而言:K即为URL地址   V即为相应的中间件`http://localhost:8080/0607`

  ```js
  app.get("/0607",(res,req)=>{
     res.send('我是祖国的老花骨朵');
  });
  ```

* 前端路由:
  K即为URL（网络资源定位符）
  V即为相应的路由组件

  * 路由的一个分析
    确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
  * 2个非路由组件(==共用全局组件==)|四个路由组件
    两个非路由组件：Header 、Footer
    路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）

  * 安装路由

    ```js
    npm install --save vue-router --save
    ```

    :可以让你安装的依赖，在package.json文件当中进行记录

  * 创建路由组件【一般放在views|pages文件夹】

  * 配置路由，配置完四个路由组件



#### 1.创建非路由组件（2个：Header、Footer）

* 非路由组件使用分为几步:
  1. 第一步：定义
  2. 第二步：引入
  3. 第三步：注册
  4. 第四步:使用

* 非路由组件的结构的搭建：
  1. 书写静态页面（html+css）
  2. 拆分组件
  3. 获取服务器的数据动态展示
  4. 完成相应的动态业务逻辑
     * 注意1：创建组件的时候，组件结构+组件的样式+图片资源

* 项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法

1. 安装less less-loader@6
   切记less-loader安装6版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义

   ```js
   npm install --save less less-loader@6
   ```

2. 需要在style标签的身上加上lang="less",不添加样式不生效



#### 2.总结：路由组件和非路由组件的区别？

1. 路由组件一般放在pages|views文件夹里面，非路由组件一般放在components文件夹里面
2. 路由组件一般需要在router文件夹里注册（使用的即为组件的名字），非路由组件在使用时，一般是以标签的形式使用
3. 注册完路由，不管是路由组件还是非路由组件，都有$route和$router属性



#### 3.$route和$router的作用：

1. $route:一般用于获取路由信息【路径、query、params等等】

2. $router:一般进行编程式导航进行路由跳转【push|replace】



#### 4.路由的跳转有几种方式？

   路由的跳转就两种形式：

   比如A->B:

   * 声明式导航（`router-link`：务必要有to属性）

   * 编程式导航`push`||`replace`

     ```js
     编程式导航更好用：因为可以书写自己的业务逻辑(在路由跳转之前)
     声明式导航能做的，编程式都能做
     ```



#### 5.Footer组件的显示与隐藏（在Home、Search显示；Login、Register隐藏）

* 我们可以通过组件身上的$route获取当前路由的信息，通过路由路径判断Footer隐藏或者显示
* 配置路由的时候，给路由添加`路由元信息`（meta）.路由需要配置对象，它的key不能随便写



#### 6.面试题：v-show与v-if区别?

- v-show:通过样式display控制
- v-if：通过元素上树与下树进行操作(操作dom)



#### 7.面试题:开发项目的时候，优化手段有哪些?

- 1. `v-show`|`v-if`
- 2. 按需加载



#### 8. 路由传参，参数有几种写法？

- params参数：属于路径（url）中的一部分，需要注意，在配置路由时需要占位
- query参数：不属于路径（url）中的一部分，路由不需要占位，写法类似于ajax当中`queryString`参数 （`/home？k=v&kv=`）

```js
// 搜索按钮的回调函数，要向search路由进行跳转
    goSearch () {
      // 路由传递参数
      // 1.字符串形式,需要在search路由占位
      // this.$router.push("/search/" + this.keyWord + "?k=" + this.keyWord.toUpperCase())
      // 2.模板字符串
      // this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`)
      // 3.对象(优选)
      this.$router.push({ name: 'search', params: { keyword: this.keyWord }, query: { k: this.keyWord.toUpperCase() } })
    }
// 路由组件
{
            // 搜索页,占位
            path: '/search/:keyword',
            component: Search,
            meta: {
                show: false
            },
            name:'search'
            
        }
// Search组件
    <h1>params参数---{{ $route.params.keyword }}</h1>
    <h1>query参数---{{ $route.query.k }}</h1>
```



#### 9.路由传递参数先关面试题

1. 路由传递参数（对象写法）path是否可以结合params参数一起使用?

* 路由跳转传参的时候，对象的写法可以是name、path形式，但是要注意的是，path这种写法不能和params参数一起使用（不会跳转和传参）

  ```js
   this.$router.push({ path: '/search', params: { keyword: this.keyWord }, query: { k: this.keyWord.toUpperCase() } })
  ```

  

2. 如何指定params参数可传可不传? 

   *  在配置路由时，在占位的后面加上一个问号【**代表params参数可传可不传**】
   * 如果路由要求传递params参数，但你不传，就会发现url有问题`http://localhost:8080/#/?k=DSADA`,不显示search

   ```js
    path: '/search/:keyword?'
   ```

   

3. params参数可以传递也可以不传递，但是如果传递是空串，如何解决？

   * 路径出问题，不显示search：`http://localhost:8080/#/?k=SADSD`
   * **解决：**使用undefined解决

   ```JS
   this.$router.push({ name: 'search', params: { keyword: '' || undefined }, query: { k: this.keyWord.toUpperCase() } })
   ```

   

4.  路由组件能不能传递props数据?

* 1. 布尔值写法：只能传`params参数`

```js
//search路由
{
            // 搜索页,占位
            path: '/search/:keyword?',
            component: Search,
            meta: {
                show: false
            },
            name: 'search',
            //路由组件能不能传递props数据?
            // 布尔值写法
            props: true
        }
//Search组件
<template>
  <div>
    Search
    <h1>params参数---{{ $route.params.keyword }}--{{ keyword }}</h1>
    <h1>query参数---{{ $route.query.k }}</h1>
  </div>
</template>

<script>
export default {
  name: 'my-search',
  // 路由组件可以传递props
  props: ['keyword']
}
</script>
```

* 2. 对象写法：额外给路由组件传递一些props

```js
//search路由
{
            ...(同上)
            //路由组件能不能传递props数据?
            // 对象写法,额外给路由组件传递一些props
            props: { a: 1, b: 2 }
        }
//Search组件
<template>
	 <h1>{{ a }}---{{ b }}</h1>
</template>

<script>
export default {
  name: 'my-search',
  // 路由组件可以传递props
  props: ['keyword','a','b']
}
</script>
```

* 3. 函数写法：可以把params参数、query参数，通过props传递给路由组件

```js
//search路由
// 解构时要在最外加()，当成一个整体
            props: ($route) => ({
                //$route.params.keyword，这里的keyword对应的是Search组件里的参数
                keyword: $route.params.keyword, k: $route.query.k
            })

//search组件
<template>
  <div> 
    <h1>params参数---{{ $route.params.keyword }}--{{ keyword }}</h1>
    <h1>query参数---{{ $route.query.k }}--{{ k }}</h1>
  </div>
</template>

<script>
export default {
  name: 'my-search',
  // 路由组件可以传递props
  props: ['keyword', 'k']
}
</script>
```



#### 10.call和apply区别：

* 相同点：都可以调用函数一次，都可以篡改**函数的上下文**（this）

* 不同点：call和apply**传递参数**：
  * call传递参数用逗号隔开
  * apply方法执行，传递数组



#### 11.为什么编程式路由跳转到当前路由参数不变，点击多次会抛出`NavigationDuplicated`的警告错误？

**注意：**编程式导航（`push`|`replace`）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。

**为什么会出现这种现象?**

* 由于vue-router版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,

```js
 function push () {
        return new Promise((resolve, reject) => {

        })
      }
```

1. 第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调,可以捕获到当前的错误，可以解决。

```js
this.$router.push({ name: 'search', params: { keyword: this.keyWord }, query: { k: this.keyWord.toUpperCase() } }, () => { }, () => { })
```

* 第一种解决方案可以**暂时解决**当前问题（**治标不治本**），但是以后再用`push`|`replace`还是会出现类似现象，因此我们需要从‘根’治病；

2. 从**根部解决**需要重写`VueRouter.prototype.push`方法

```js
this.$router.push({ name: 'search', params: { keyword: this.keyWord }, query: { k: this.keyWord.toUpperCase() } }, () => { }, () => { }) 
console.log(this.$router); 
	  // this是组件实例对象(Search)
      // this.$router属性：当前这个属性的属性值是VueRouter类的一个实例，当在入口文件（main.js）添加路由的时候,给组件实例添加的$router|$route属性
      // push：VueRouter类的一个实例
      // VueRouter.prototype.push =function(){
		//函数的上下文为VueRouter类的一个实例
      // }
```

* 在配置路由的地方(router文件夹)重写push和replace方法

  ```js
  // 先把VueRouter原型对象的push，先保存一份
  let orginPush = VueRouter.prototype.push
  // 先把VueRouter原型对象的replace，先保存一份
  let originReplace = VueRouter.prototype.replace
  
  // 第一个参数：告诉原来的push/replace方法，你往哪跳转（传哪些参数）
  // 第二个参数：成功的回调
  // 第三个参数：失败的回调
  //重写push
  VueRouter.prototype.push = function (location, resolve, reject) {
      // 如果resolve和reject参数都传了，调用原来的push方法(注意：要改变this执向(改为vueRouter)，不改为window)
      if (resolve & reject) {
          orginPush.call(this, location, reject, resolve)
      } else {
          orginPush.call(this, location, () => { }, () => { })
      }
  }
  
  // 重写replace方法
  VueRouter.prototype.replace = function (location, resolve, reject) {
      if (resolve && reject) {
          // resolve, reject回调函数都存在，调用原始的replace方法,并且改变this执向
          originReplace.call(this, location, resolve, reject)
      } else {
          originReplace.call(this, location, () => { }, () => { })
      }
  }
  ```



# 二、Home页面

## 2.1.三级联动页面实现

### 2.1.1.将Home组件的静态组件拆分

* 静态页面（样式）
* 拆分静态组件
* 发请求获取服务器数据进行展示
* 开发动态业务
* 拆分组件：结构+样式+图片资源
* 一共要拆分为七个组件



### 2.1.2 三级联动组件实现

由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件

**好处：**只需要注册一次，就可以在任何组件中复用

* typeNav组件

```js
...
<script>
export default {
  name: 'typeNav' //不要加-
}
</script>
...
```

*  注册为全局组件(main.js)

```js
// 三级联动组件--全局组件
import typeNav from '@/pages/Home/typeNav'
// 第一个参数：全局组件的名字(typeNav.name) 第二个参数：哪一个组件
// typeNav.name可以获取组件的名字（组件定义名字时不要加"-""）
Vue.component(typeNav.name, typeNav)
```

* Home组件使用

```js
<template>
  <div>
    <!-- 三级联动全局组件（不需要引入，直接使用） -->
    <typeNav />
  </div>
</template>
```



### 2.1.3 POSTMAN接口测试工具

- 如果服务器返回的code字段为`200`，代表数据返回成功
- 整个项目，接口前缀都有`/api`字段



### 2.1.4 axios二次封装

- AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
- XMLHttpRequest、$（jQuery）、fetch、axios

1. 工作的时候src目录下的API文件夹（utils文件夹），一般关于axios二次封装的文件

```js
//对axios进行二次封装
import axios from 'axios'

// 1.利用axios的create方法，去创建一个axios实例
// 2.requests就是axios，只不过稍微配置了一下
const requests = axios.create({
    //配置对象
    baseURL: "/api",
    // 代表请求超时的时间5s
    timeout: 5000
})

// 请求拦截器：在请求发出去之前可以检测到，并且可以做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要===请求头（header）
    return config
})

// 响应拦截器：在服务器响应数据发过来的之前可以检测到，并且可以做一些事情
requests.interceptors.response.use((res) => {
    //服务器响应成功的回调
    return res.data
}, (error) => {
    //服务器响应失败的回调(可以打印一些错误信息/可以终止promise链)
    return Promise.reject(new error('failed'))
})

// 对外暴露
export default requests
```



### 2.1.5 接口统一管理

* 项目很小：可以在组件的生命周期函数中发发请求
* 项目很大：axios.get(‘xxx’)

#### 1.跨域问题

- 跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域

```js
http://localhost:8080/#/home   ---前端项目本地服务器
http://gmall-h5-api.atguigu.cn ---后台服务器
```

* JSONP、CROS、代理

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
      -------------
    //代理服务器
    proxy: {
      //url里面包含了/api字段，就启动代理服务器
      '/api': {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    }
      -------------                        
  },
})

```



#### 2.nprogress进度条

```js
cnpm install --save nprogress
```

- nprogress模块实现进度条功能（发送请求时出现，发完结束===》可以在请求和响应拦截器里配置）
- 工作的时候，修改进度条的颜色，修改源码样式（`nprogress/nprogress.css`）`.bar类名`的

```js
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
//nProgress.start()：进度条开始  nProgress.done()：进度条结束
```



### 2.1.6 vuex模块式开发

#### 1.vuex是什么？

- 当**项目比较大**，组件通信数据比较复杂，这种情况在使用vuex

- Vuex是插件，通过vuex仓库进行存储项目公用的数据

* Vuex核心概念:state、actions、mutations、getters、modules



#### 2.vuex基本使用

1. 下载vuex

```js
cnpm install --save vuex@3  //vue2用vuex3
```

2. 创建store文件夹

```js
import Vue from 'vue'
import Vuex from 'vuex'

//使用Vuex插件
Vue.use(Vuex)
//state:仓库存储数据的地方
const state = {
    count: 1
}
//mutations:修改state的唯一手段
const mutations = {
    ADD (state) {
        state.count++
    }
}
//action:处理数据，在action里可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //这里可以书写业务逻辑，但是不能修改state数据
    add (context) {
        context.commit("ADD")
    }
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {}


//对外暴露store类的一个实例
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})
```

3. 在main.js中引入并且注册

```js
...
//引入仓库
import store from '@/store'
...
new Vue({
  render: h => h(App),
  // 注册路由,kv一致省略v，注意router是小写
  // 为什么要注册路由信息=> 让组件身上拥有$router和$route属性
  router,
  //注册仓库：组件实例的身上会多了$store属性
  store,
}).$mount('#app')
```

4. 测试数据仓库功能

```js
<template>
  <div>
    <button @click="add">+</button>
    <span>仓库的数据:{{ count }}</span>
    <button @click="count--">-</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'my-login',
  computed: {
    ...mapState(['count'])
  },
  methods: {
    add () {
      //交给action处理
      this.$store.dispatch('add')
    }
  }
}
</script>
```



#### 3.vuex实现模块化开发

* 由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用**vuex模块式管理数据**。
* **store/index.js**

```js
import Vue from 'vue'
import Vuex from 'vuex'

//使用Vuex插件
Vue.use(Vuex)
// 引入小仓库
import home from './home'
import search from './search'


//对外暴露store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search
    }
})
```

* 子模块

```js
//Home组件的小仓库
const state = {}
const mutations = {}
const actions = {}
const getters = {}

// 暴露仓库
export default {
    state,
    mutations,
    actions,
    getters
}
```



### 2.1.7 动态展示三级联动数据

#### 1. 发请求在哪里发？

* mounted|created:都可以

- mounted：模板已经变为真实DOM【只不过没有数据，显示空白】，因为ajax是异步，需要时间的。
- created：稍微好那么一丢丢（不算啥）

#### 2.home小仓库配置

```js
import { getCategoryListAPI } from '@/api/index' //引入要加{}
//Home组件的小仓库
const state = {
    //state中的数据默认值不能乱写，根据接口返回值的类型来确定(服务器返回对象==》默认值是对象 ；服务器返回数组 ==》默认值是数组)
    categoryList: [] //保存数据
}
const mutations = {
    //value是接收到的数据,在这里是res.data === >类型是数组
    CATEGORYLIST (state, value) {
        state.categoryList = value
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，存储数据
    //从上下文(context)里面解构出commit
    async categoryList ({ commit }) {
        const res = await getCategoryListAPI()
        if (res.code === 200) {
            //请求成功,把数据提交给mutations
            commit('CATEGORYLIST', res.data)
        }
    }
}
const getters = {}

// 暴露仓库 
export default {
    state,
    mutations,
    actions,
    getters
}
```



#### 3.遍历渲染数据

```js
<template> 
<div class="sort">
        <div class="all-sort-list2">
          <!-- 一级分类(cate1) -->
          <div
            class="item"
            v-for="cate1 in categoryList"
            :key="cate1.categoryId"
          >
            <h3>
              <a href="">{{ cate1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <!-- 二级分类 -->
              <div
                class="subitem"
                v-for="cate2 in cate1.categoryChild"
                :key="cate2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a href="">{{ cate2.categoryName }}</a>
                  </dt>
                  <!-- 三级分类 -->
                  <dd>
                    <em
                      v-for="cate3 in cate2.categoryChild"
                      :key="cate3.categoryId"
                    >
                      <a href="">{{ cate3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'typeNav',
  //组件挂载完毕，就可以向服务器请求数据(因为要把数据渲染到页面，使用不是创建阶段)
  mounted () {
    //通知Vuex发送请求，获取数据存储在仓库中
    this.$store.dispatch('categoryList')
  },
  computed: {
    //对象形式,右侧需要的是一个函数，当使用到这个计算属性时，右侧函数会立即执行一次
    //注入一个参数state，它是store大仓库里的state(包含所有小仓库的state)
    ...mapState({
      categoryList: (state) => state.home.categoryList
    })
  }
}
</script>
```



#### 4.完成一级分类动态添加背景色

**解决方案：**

1. 通过css的样式`hover`实现
2. 通过js实现

```js
 <!-- 通过事件委托，把移除的方法交给父级，这样子元素都会触发 -->
      <div @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>

        <div class="sort">
          <div class="all-sort-list2">
            <!-- 一级分类(cate1) -->
            <div
              class="item"
              v-for="(cate1, index) in categoryList"
              :key="cate1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a href="">{{ cate1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <!-- 二级分类 -->
                ...
                
              </div>
            </div>
          </div>
        </div>
      </div>

<script>
import { mapState } from 'vuex'
export default {
  name: 'typeNav',
  data () {
    return {
      //存储用户鼠标移到哪一个当前一级分类的索引值
      currentIndex: -1 //-1默认不显示
    }
  },
  methods: {
    //鼠标进入回调===》修改响应式数据的currentIndex属性
    changeIndex (index) {
      // index:鼠标移入某一个一级分类的索引值
      this.currentIndex = index
    },
    //鼠标移出的回调
    leaveIndex () {
      this.currentIndex = -1
    }
  },
}
</script>

<style lang="less" scoped>
    .item{
        ...
    } 
    .cur {
          background-color: skyblue;
        }
</style>
```



#### 5.通过js控制二三级分类的显示与隐藏

* 最开始的时候是通过css样式

  ```css
  display：block 和 
  display：none 实现
  ```

* **css动态控制样式**

1. 根据表达式去判断样式的显示，对象的形式

```js
:class = "{样式名： 【样式出现的条件】}"
```

2. 根据三元表达式来进行class的动态切换，不能写成对象的形式，不然会报错	

 ```js
 :style="{属性（eg:display）：条件(eg：num>10) ？ '样式1' ： '样式2'}"
 :class="{条件(eg：num>10) ？ '样式1' ： '样式2'}"
 ```

     ```js
     <div
                     class="item-list clearfix"
                     :style="{ display: currentIndex === index ? 'block' : 'none' }"
                   >
     ```



#### 6.三级联动中卡顿优化（性能优化）

##### 1.问题发现

* **正常情况**(用户慢慢滑动)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
* **非正常情况**(用户操作很快)：期待全部的一级分类都会触发鼠标进入事件，但经过测试只有部分会被触发
* **原因：**由于用户行为过快，导致浏览器反应不过来。如果此时回调函数中有大量的业务，那就会出现卡断现象

* **优化方法：**防抖与节流

##### 2.防抖与节流

1. 防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次（**规定时间只触发最后一次**）,

   > 防抖：用户操作很频繁，但是只执行1次

   > 相当于lol按b回城，重复按b会打断回城，只会等带回城时间到了触发一次，所以规定时间只触发最后一次

   ```js
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   
   <body>
       <p>
           请你输入搜索的内容：<input type="text">
       </p>
       <script>
           let debounce = (fn, delay = 1000) => {
               let timer = null
               return function () {
                   let that = this //改变this指向
                   clearTimeout(timer)
                   // 定时器
                   timer = setTimeout(function () {
                       fn.apply(that, arguments)
                   }, delay);
               }
   
           }
           // 防抖：技能回城，只有最后一次会触发
           let input = document.querySelector('input')
           //文本输入完成后等一秒执行
           input.oninput = debounce(() => {
               console.log('ajax');
           }, 1000)
   
   
           //lodash插件：里面封装函数的防抖和节流【闭包+定时器】
       </script>
   </body>
   
   </html>
   ```

   

2. 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发（**规定时间只触发第一次**）

   > 节流：用户操作很频繁，但是会把频繁的操作变为少量操作【可以让浏览器有充裕的时间解析代码】

   > 相当于lol里放了技能，触发等待cd，cd期间都不能触发，所以规定时间只触发第一次

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>我是计数器<span>0</span></h1>
    <button>点我加1</button>
    <script>
        let span = document.querySelector('span')
        let button = document.querySelector('button')
        let count = 0
        //计数器1秒只能点一次
        button.addEventListener('click', throttle(function () {
            //节流：目前这个回调1s执行1次，如果这里有很多业务代码，就可以给浏览器充裕的时间去解析
            count++
            span.innerText = count
        }, 1000))

        //节流
        function throttle (fn, delay = 1000) {
            let timer;
            return () => {
                let _this = this;
                console.log(this);
                let args = arguments; //保存参数（fn和delay）
                if (!timer) {
                    timer = setTimeout(() => {
                        fn.apply(_this, args); 
                        timer = null;
                    }, delay)
                }

            };
        }

        //lodash插件：里面封装函数的防抖和节流【闭包+定时器】
    </script>
</body>

</html>
```



##### 3.完成三级联动节流的操作

**优化项目:**

* v-if|v-show

* 按需加载

* 函数防抖与节流

* 按需加载:对于loadsh插件，它里面封装的函数功能很多

  ```js
  //import _ from lodash 相当于把全部功能引入进来，但是我们只是需要节流。
  <script>
  // 把lodash全部的功能都引入，最好按需引入
  import throttle from 'loadsh/throttle' //默认暴露，不加{}
  export default {
    name: 'typeNav',
    methods: {
      //鼠标进入回调===》修改响应式数据的currentIndex属性
      //用es5的函数写法，key：value
      //注意throttle回调函数不要用箭头函数，不然可能会出现上下文this指向问题
      changeIndex: throttle(function (index) {
        // index:鼠标移入某一个一级分类的索引值
        // 正常情况(用户慢慢滑动)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
        // 非正常情况(用户操作很快)：期待全部的一级分类都会触发鼠标进入事件，但经过测试只有部分会被触发
        // 原因：由于用户行为过快，导致浏览器反应不过来。如果此时回调函数中有大量的业务，那就会出现卡断现象
        this.currentIndex = index
      }, 50),
      //鼠标移出的回调
      leaveIndex () {
        this.currentIndex = -1
      }
    },
  }
  </script>
  ```



#### 7.三级联动组件的路由跳转和传递参数

> 三级联动：用户可以点击一级分类、二级分类、三级分类，当你点击的时候，会从Home模块跳转到Search模块，一级会把用户选中的产品（产品的名字、Id）在路由跳转时进行传递

* 三级联动：如果使用声明式导航（router-link），可以实现路由的跳转和传递参数
  * **问题：**会出现卡顿
  * **原因：**`router-link`是一个组件，当服务器数据返回时，会创建很多的`router-link组件`【会创建组件实例，从**虚拟dom**转化**真实dom**…】,会**很耗内存**

* 三级联动：如果使用编程式导航（push|replace），可以实现路由的跳转和传递参数

  * 如果直接给每一个需要跳转的dom都添加一个事件，可以，但不推荐
  * 最好的解决方法：**编程式导航** + **事件委托**
  * **事件委托：**是把全部的子节点【h3、dt、dl、em】的事件委托给父亲节点
  * 利用事件委托会出现一些**问题**：
    1. 因为需要点击a标签才能跳转，但怎么确定点击的一定是a标签(子节点很多) ？
    2. 即使你能确定点击的a标签，但如何确定是一级、二级、三级的a标签？
  * **解决：**

  ```js
   <!-- 三级联动 -->
          <div class="sort">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类(cate1) -->
              <div
                class="item"
                v-for="(cate1, index) in categoryList"
                :key="cate1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 添加自定义属性，来区分a标签和一级、二级、三级分类 -->
                  <a
                    :data-categoryName="cate1.categoryName"
                    :data-category1Id="cate1.categoryId"
                    >{{ cate1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex === index ? 'block' : 'none' }"
                >
                  <!-- 二级分类 -->
                  <div
                    class="subitem"
                    v-for="cate2 in cate1.categoryChild"
                    :key="cate2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="cate2.categoryName"
                          :data-category2Id="cate2.categoryId"
                          >{{ cate2.categoryName }}</a
                        >
                      </dt>
                      <!-- 三级分类 -->
                      <dd>
                        <em
                          v-for="cate3 in cate2.categoryChild"
                          :key="cate3.categoryId"
                        >
                          <a
                            :data-categoryName="cate3.categoryName"
                            :data-category3Id="cate3.categoryId"
                            >{{ cate3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
  
  // Home组件跳转到Search方法
      goSearch () {
        // 第一个问题：把子节点的a标签加上自定义属性data-categoryName,其余的子节点是没有的
        let element = event.target
        // 这样可以获取当前触发这个事件的节点【h3、a、dl、dt】，需要带有data-categoryname(浏览器自动变小写) 这样的节点【一定是a标签】
        // 节点有一个属性dataset，可以获取节点的自定义属性和属性值
        let { categoryname, category1id, category2id, category3id } = element.dataset
        // 如果标签中有categoryname ,一定是a标签
        if (categoryname) {
          // 整理路由传递的参数
          let location = { name: 'search' }
          let query = { categoryName: categoryname }
          //区分一级、二级、三级分类a标签 === 在添加一个自定义属性
          if (category1id) {
            //一级分类
            query.category1Id = category1id
          } else if (category2id) {
            //二级
            query.category2Id = category2id
          } else if (category3id) {
            //三级
            query.category3Id = category3id
          }
          // 整理(合并)路由参数
          // console.log(location, query); //两个对象
          location.query = query
          // 路由跳转
          this.$router.push(location)
  
        }
      }
  ```



#### 8.搜索模块中的三级联动与过渡动画

##### 1. TypeNav组件业务分析?

1. 三级联动在home模块正常显示
2. 三级联动在search一会显示、一会隐藏 
   * **解决方案：**通过一个响应式属性(v-show=“show”)控制三级联动显示与隐藏
3. 开发的时候的出现问题：在home模块下不应该出现显示与隐藏的效果
4. 现在这个问题【三级联动：本身在search模块应该有显示与隐藏的业务】 ，但是在home模块下不应该出现显示与隐藏的业务
5. 通过`$route.path`让组件区分在那个模块下
6. 以后的时候，如果出现某一个组件要区分当前在哪一个模块中【home、search】，通过$route路由信息区分
7. 路由跳转的时候，相应的组件会把重新**销毁与创建**----【kepp-alive】

##### 2. 过渡效果

- 最早接触的时候:CSS3
- Vue当中也有过渡动画效果---transition内置组件完成
- **注意1:**在Vue当中，你可以给 （**某一个节点**）|（**某一个组件**）添加过渡动画效果
- 但是需要注意，节点|组件务必出现`v-if`|`v-show`指令才可以使用。

```js
...      
		<div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
          </div>
        </transition>
...
<script>
...
export default {
  name: 'typeNav',
  data () {
    return {
      //存储用户鼠标移到哪一个当前一级分类的索引值
      currentIndex: -1, //-1默认不显示
      show: true,   //控制三级联动显示和隐藏
    }
  },
    ...
  mounted () {
    ...
    if (this.$route.path !== '/home') {
      //如果不是路由组件，那就一开始隐藏三级联动
      this.show = false
    }
  },
 ...
  methods: {
  ...
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow () {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },
    //鼠标移出的回调
    leaveIndex () {
      this.currentIndex = -1
      // 如果当前路由不是'/home'，那鼠标移出时隐藏
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
  },
}
</script>    

<style lang="less" scoped>
 ...
.sort {
     ...
    }
    // 过渡动画的样式
    // 过渡动画开始的状态(进入)
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束的状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
```

#### 9.TypeNav三级联动性能优化?

**问题：**home切换到search或者search切换到home，你会发现一件事情，**组件在频繁的向服务器发请求**，获取三级联动的数据进行展示。

> 项目中如果频繁的向服务器发请求，很耗性能的，因此咱们需要进行优化。

1. 为什么会频繁的向服务器发请求获取三级联动的数据?

   * 因为路由跳转的时候，组件会进行销毁的【home组件的created：在向vuex派发action，因此频繁的获取三级联动的数据】
   * 只需要发一次请求，获取到三级联动的数据即可，不需要多次。
   * **最终解决方案：**不在typeNav里请求数据，而是在`App.vue`中请求分类列表数据
   * **原因：**根组件发请求只会执行一次【mounted只执行一次】

   > **注意：**不能在main.js里请求因为main.js 不是组件，没有this

   * **App.vue**

```js
 mounted () {
    // 派发一个action，去获取商品分类三级列表的数据
    this.$store.dispatch('categoryList')
  }
```



#### 10.合并query和params参数

- 在header中搜索时只带了params参数，需要把query参数一起传给search路由组件
- 在typeNav中点击商品分类时，只带了query参数，应该把params参数也一起带过去
- **Header组件**

```js
 // 搜索按钮的回调函数，要向search路由进行跳转
    goSearch () {
      if (this.$route.query) {
        // 如果有query参数，一起存到location中传给search
        let location = {
          name: 'search',
          params: { keyword: this.keyWord },
        }
        location.query = this.$route.query
        this.$router.push(location)
      }
    }
```

* **typeNav组件**

```js
goSearch () {
    ...
       // 整理(合并)路由参数
       // 判断：如果路由跳转的时候，带有params参数，就给它传过去
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        // 路由跳转
        this.$router.push(location)

      } 
```



## 2.2 listContainer组件（右侧的轮播图和快报）和floor组件

```js
https://docschina.org/ //前端库网站
```

### 2.2.1 mockjs模块实现模拟数据

#### 1.注意事项

**注意：**对于将来实际工作的时候，后台没有准备好接口（服务器没有开发出来），前端工程师可以利用mock技术，实现模拟数据，将来项目上线（后台真实接口）写好了，替换为真实接口即可。

* 对于该项目，后台没有给首页中轮播这部分的接口，mock数据，你可以当成一个真实接口就行了。
* 上线的时候，对于mock数据对于项目而言没有任何影响。
* mock的数据不会跟后端通信，只是前端自己玩

**注意：**mock（模拟数据）数据需要使用到mockjs模块，可以帮助我们模拟数据。
**注意：**mockjs【并非mock.js mock-js】
http://mockjs.com/  官方地址

* 下载mockjs

```js
cnpm install mockjs 
```



#### 2.使用步骤

1. 在项目src中创建mock文件夹

2. 准备JSON数据（mock文件夹中创建相应的JSON文件）—-格式化一下，不能有空格，否则不能跑起来

3. 把mock数据需要的图片放在public文件夹中

   > 【**public文件夹**在打包的时候，会把相应的资源原封不动的打包到**dist文件夹**里面】

4. 创建`mockServe.js`通过mockjs插件实现mock（虚拟的数据）

**注意：webpack默认对外暴露的：图片、JSON数据格式**

5. `mockServe.js`文件在入口文件中引入(至少需要执行一次，才能模拟数据)

* **banner.json**

```json
[
    {
        "id": "1",
        "imgUrl": "/images/banner1.jpg"
    },
    {
        "id": "2",
        "imgUrl": "/images/banner2.jpg"
    },
    {
        "id": "3",
        "imgUrl": "/images/banner3.jpg"
    },
    {
        "id": "4",
        "imgUrl": "/images/banner4.jpg"
    }
]
```

* **floor.json**

```json
[
    {
        "id": "001",
        "name": "家用电器",
        "keywords": [
            "节能补贴",
            "4K电视",
            "空气净化器",
            "IH电饭煲",
            "滚筒洗衣机",
            "电热水器"
        ],
        "imgUrl": "/images/floor-1-1.png",
        "navList": [
            {
                "url": "#",
                "text": "热门"
            },
            {
                "url": "#",
                "text": "大家电"
            },
            {
                "url": "#",
                "text": "生活电器"
            },
            {
                "url": "#",
                "text": "厨房电器"
            },
            {
                "url": "#",
                "text": "应季电器"
            },
            {
                "url": "#",
                "text": "空气/净水"
            },
            {
                "url": "#",
                "text": "高端电器"
            }
        ],
        "carouselList": [
            {
                "id": "0011",
                "imgUrl": "/images/floor-1-b01.png"
            },
            {
                "id": "0012",
                "imgUrl": "/images/floor-1-b02.png"
            },
            {
                "id": "0013",
                "imgUrl": "/images/floor-1-b03.png"
            }
        ],
        "recommendList": [
            "/images/floor-1-2.png",
            "/images/floor-1-3.png",
            "/images/floor-1-5.png",
            "/images/floor-1-6.png"
        ],
        "bigImg": "/images/floor-1-4.png"
    },
...
```

* **mockServe.js**

```js
// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来【JSON数据格式没有对外暴露，但是可以引入】
// webpack默认对外暴露的：图片、JSON数据格式

import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数(请求地址) 第二个参数(请求数据)
Mock.mock("/mock/banner", { code: 200, data: banner }) //模拟首页大的轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor })
```

* **main.js**

```js
// 引入mockServe.js --- mock数据
import '@/mock/mockServe'
```

#### 3.调用mock接口

* **mockRequest.js**

```js
const requests = axios.create({
    //配置对象
    baseURL: "/mock", //修改此处，其他不变
    // 代表请求超时的时间5s
    timeout: 5000
})
```

* 获取接口

```js
/**
 * 获取banner数据(Home首页轮播图接口)
 * @returns promise对象
 */
export const getBannerListAPI = () => mockRequest.get('/banner')
```

* 通过vuex保存数据



### 2.2.2 轮播图实现

#### 1.swiper使用

1. **swiper插件：**可以在移动端、PC端都可以使用，这个插件经常可以快速开发轮播图。
   前端开发:轮播图、分页器、日历。
2. **Swiper使用步骤**：
   * 第一步：引入依赖包【swiper.js|swiper.css】
   * 第二步:静态页面中**结构必须完整**【container、wrap、slider】，类名不能瞎写
   * 第三步:初始化swiper实例

```js
https://www.swiper.com.cn/ 官网地址
```

```js
npm install --save swiper@5 //样式  @7vue组件
```



#### 2.swiper在Vue项目中使用 

* 提示：卸载插件，你可以不用删除node_modules文件夹，可以使用npm uninstall xxxx进行卸载

1. swiper安装到项目当中
1. 在相应的组件引入`swiper.js`|`swiper.css` 

3. 但是需要注意

>  home模块很多组件都使用到swiper.css,没必要在每一个组件内部都引入样式一次，只需要在入口文件引入一次即可。

4. 初始化swiper实例在哪里书写?
   * 初始化swiper实例之前，页面中的节点（结构）务必要有，
   * 对于Vue一个组件而言，mounted[**组件挂载完毕：相应的结构不就有了吗**]
   * mounted-->组件挂载完毕

5. 动态效果为什么没有出来？
   * Swiper需要获取到轮播图的节点DOM，才能给swiper轮播添加动态效果，因为dispatch中涉及到异步语句，导致v-for遍历的时候**结构还没有出现完全**，所以不行

   ```js
   //listContainer组件
   mounted () {
       // 派发action,通知vuex发送ajax请求，将数据存在仓库中  
       console.log('mounted')
       this.$store.dispatch('getBannerList')
       console.log('初始化swiper')
       //在new Swiper实例之前，页面中必须有结构【在mounted中不行，因为结构不完整】
     },
     ----------------------------------------    
    //vux
     const actions = {
       // 处理banner数据列表
       async getBannerList ({ commit }) {
           console.log('获取服务器数据')
           const res = await getBannerListAPI()
           if (res.code === 200) {
               commit('GETBANNERLIST', res.data)
           }
       }
   }
     const mutations = {
       GETBANNERLIST (state, value) {
           console.log('修改仓库的数据')
           state.bannerList = value
       }
   }
   ```
   
   > 打印执行顺序：mounted==》 vuex的actions【获取服务器数据】 ==》初始化swiper ==》修改仓库的数据
   
   * 所以在swiper初始化之前，仓库还没有数据
   
6. 第一种解决方案，延迟器（定时器）（不是完美的解决方案）
   created里面：created执行与mounted执行，时间差可能2ms，白扯
   updated里面：如果组件有很多响应式（data），只要有一个属性值发生变化updated还会再次执行，再次初始化实例。

7. 总结：第一种解决方案可以通过延迟器（异步）去解决问题，
   但是这种解决方案存在风险（无法确定用户请求到底需要多长时间），因此没办法确定延迟器时间。



#### 3.Swiper在Vue项目中使用完美解决方案

* **watch+nextTick**

* 第一种解决方案问题出现在哪里：v-for在遍历来自于Vuex（数据:通过ajax向服务器发请求，存在异步）

* **watch**:监听属性，watch可以检测到属性值的变化，当属性值发生变化的时候，可以触发一次。

* bannerList仓库数据有没有发生过变化？

  > 一定是有的：bannerList初始值空数组，当服务器的数据返回以后，它的bannerList存储的属性值会发生变化【变为服务器返回的数据】，watch可以监听到

```js
//listContainer

//引包
import Swiper from 'swiper'
...
watch: {
    // 监听bannerList数据的变化，----由空数组变为四个元素
    // 对象写法
    bannerList: {
      handler (newValue, oldValue) {
        //如果执行了handler方法，代表组件实例上已经有数据了【数组上有四个元素】
        //当前函数执行，只能保证bannerList数据已经有了，不能保证v-for已经执行结束了
        //v-for执行完毕，才有结构【在watch里是没办法保证的】
        this.$nextTick(() => {
          //当你执行了这个回调的时候：保证服务器数据回来了，v-for执行完毕了【轮播图的数据一定有了】
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,  //可以点击分页器切换轮播图
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

          })
        })
      }
    }
  }
```







#### 4.nextTick官网解释

* 在下次（数据变化后的）DOM更新, **循环结束之后**（v-for）,执行延迟回调。在**修改数据之后**（服务器的数据回来了）立即使用这个方法，获取更新后的DOM。
* **注意：**组件实例的$nextTick方法【**可以保证页面中的结构一定是有点**】，在工作当中经常使用，经常结合第三方插件使用【都需要dom存在】，获取更新后的DOM节点



### 2.2.3 floor组件实现

1. Floor组件获取mock数据，发请求的action书写在哪里?

   * 派发action应该是在**父组件**的`mounted`生命周期函数中书写，因为父组件需要通知Vuex发请求，父组件获取到mock数据，通过`v-for遍历` 生成多个floor组件，因此达到**复用**作用。

   > floor后台的数据有两组，对应两个fllor组件，所以不能在floor组件中发action

2. 父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件

3. `v-for`|`v-show`|`v-if`|这些指令可以在**自定义标签（组件）**的身上使用
4. 为什么在Floor组件的mounted中初始化SWiper实例轮播图可以使用.
   * 因为父组件的mounted发请求获取Floor组件，当父组件的mounted执行的时候。Floor组件结构可能没有完整，但是服务器的数据回来以后Floor组件结构就一定是完成的了
   * 因此v-for在遍历来自于服务器的数据，如果服务器的数据有了，Floor结构一定的完整的。
   * 否则，你都看不见Floor组件

* **home组件**

```js
...
<!-- 楼层 -->
    <!--props通信：【 :list="floor" 】 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
        
....
    
  computed: {
    ...mapState({
      //获取Vuex中state的floorList数据,数据在home组件里
      floorList: state => state.home.floorList
    })

  },
  mounted () {
    //通知Vuex发送ajax请求，存储数据
    this.$store.dispatch('getFloorList')
  },
```

* **floor组件**

```js
import Swiper from 'swiper';
export default {
  name: 'myFloor',
  // 接收home组件传过来的数据
  props: ['list'],
  mounted () {
    //第一次书写swiper时：在mounted中书写不可以，但现在可以
    //原因：第一次写轮播图时，是在当前组件发生了请求（vuex中异步），此时数据还没回来，没有结构，所以在mounted中不行
    //现在：发送请求在home父级中，父组件和子组件已经实现通信了【因此此时页面中一定有结构】
    new Swiper(this.$refs.floorSwiper, {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true,  //可以点击分页器切换轮播图
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  }
}
```





### 2.2.4 组件间通信（面试必问的东西）

- props:父子 

  > :list【子需要接收的数据】="floor【父身上的数据】"

- 插槽:父子

- 自定义事件:子父

- 全局事件总线$bus:万能

- pubsub:万能

- Vuex:万能

- $ref:父子通信



### 2.2.5 carousel全局组件

* 如果项目当中出现类似的功能，且重复利用，封装为全局组件----【不封装也可以】

* 为了封装全局的轮播图组件:让`Floor`与`listContainer`组件中的代码一样，如果一样完全可以独立出来
  封装为一个全局组件。
* carousel组件

```js
<template>
  <div class="swiper-container" ref="floorSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper';
export default {
  name: 'CaRousel',
  props: ['list'],
  watch: {
    list: {
      // 因为list数据是父亲给的，从来没有变过，所以监听不到
      //解决：立即监听【不管数据有没有变化，一开始都会监听】
      immediate: true,
      handler () {
        //只能监听到数据已经有了，但是v-for遍历结构我们还是没法确定，所以还是要用nextTick
        this.$nextTick(() => {
          //当你执行了这个回调的时候：保证服务器数据回来了，v-for执行完毕了【轮播图的数据一定有了】
          new Swiper(this.$refs.floorSwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,  //可以点击分页器切换轮播图
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

          })
        })

      }
    }
  }
}
</script>
```

* main.js

```js
import CaRousel from '@/components/Carousel'
// 第一个参数：全局组件的名字(typeNav.name) 第二个参数：哪一个组件
// typeNav.name可以获取组件的名字（不要加-）
//两个参数要一样，第二个是其他组件想用时写的标签名
Vue.component(CaRousel.name, CaRousel)
```

* floor组件使用

```js
<div class="floorBanner">
              <!-- 轮播图 -->
              <CaRousel :list="list.carouselList" />
            </div>


export default {
  name: 'myFloor',
  // 接收home组件传过来的数据
  props: ['list'], 
}
```

* listContainer组件

```js
<div class="center">
        <!--banner轮播-->
        <!-- 传递数据 -->
        <CaRousel :list="bannerList" />
      </div>
```



# 三、search组件

## 3.1 书写静态页面【布局、样式】

1. 拆分组件
2. 发请求（api）
3. vuex（三连环）
4. 获取服务器数据展示数据
5. 业务

## 3.2 vuex三连环

```js
import { getSearchInfoAPI } from "@/api"
//Search组件的小仓库
const state = {
    //search模块的数据
    SearchList: {}
}
const mutations = {
    // 处理search模块数据
    GETSEARCHLIST (state, value) {
        state.SearchList = value
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList ({ commit }, value = {}) {
        // value形参：是用户派发action时的第二个参数传进来的，至少是一个空对象
        const res = await getSearchInfoAPI(value)
        if (res.code === 200) {
            commit('GETSEARCHLIST', res.data)
        }

    }
}
//计算属性：在项目中是为了简化仓库中的数据
// 可以把在组件中需要用到的数据简化一下【这样在组件获取数据时就方便了】
const getters = {
    // state是当前仓库的state，并不是大仓库的state
    goodsList (state) {
        // 这样书写是有问题的，因为当前组件的state有两种状态{}【空对象，此时返回undefined】、服务器返回的数据
        // 假如网络不好||没有网，state.SearchList.goodsList会返回undefined
        // 但是该属性在其他组件需要遍历，所以至少是一个数组
        return state.SearchList.goodsList || []
    },
    attrsList (state) {
        return state.SearchList.attrsList || []
    },
    trademarkList (state) {
        return state.SearchList.trademarkList || []
    }
}

// 暴露仓库
export default {
    state,
    mutations,
    actions,
    getters
}
```

## 3.3 动态渲染数据

### 3.3.1 selector组件

```js
<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li v-for="trademark in trademarkList" :key="trademark.tmId">
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
            <a>{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SearchSelector',
  computed: {
    ...mapGetters(['trademarkList', 'attrsList'])
  }
}
</script>

...
```

### 3.3.2 数据详情

```js
 <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> &nbsp;{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
         ...分页模块
          </div>
        </div>

<script>
import SearchSelector from './SearchSelector/index.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'mySearch',
  data () {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        //排序
        order: "",
        // 分页器用的
        pageNo: 1, //代表当前是第几页
        pageSize: 10, //每一页有几条数据
        // 平台售卖属性的参数
        props: [],
        // 品牌
        trademark: ""

      }
    }
  },
  components: {
    SearchSelector
  },
  computed: {
    // mapGetters里面的写法：用的数组获取数据，因为getters计算是没有划分模块的【home、search】
    ...mapGetters(['goodsList'])
  },
  beforeMount () {
    // 整理参数
    // Object.assign 合并对象,可以把后面两个参数合并到第一个参数对象里面
    Object.assign(this.searchParams, this.$route.query, this.$route.params)

  },
  // mounted只执行一次，但我们需要每次点击三级列表菜单都要请求数据，所以封装函数
  mounted () {
    // 在发送请求之前【beforeMount】把参数带给服务器
    this.getData()
  },
  // 解决只能搜索一次的问题
  methods: {
    // 根据参数不同返回不同的数据
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    }
  },
 ...
</script>
```

### 3.3.3 根据用户的搜索条件展示不同的数据

* 数据返回是根据前台传递参数决定的

1. 发请求，获取搜索模块的数据
2. 根据用户搜索的条件携带参数给服务器，展示用户搜索的内筒

* 开发遇见问题:**用户条件可以发生多次变化**，但是咱们的请求，只是会发一次【mounted中书写的】

* 请求的性能优化:
  发一个请求，需要向服务器携带参数：带100个参数   带1参数  【消耗宽带】
  对于给服务器携带的参数：如果数值为undefind，向服务器发请求的时候，参数bu携带给服务器的

```js
   
  // 根据用户的搜索条件展示不同的数据。
  watch: {
    // $route是和data里的数据(searchParams)平级的
    $route () {
      // 监视路由，路由变化时继续发请求
      // 重新整理参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      // 发送ajax请求
      this.getData()
      // 每一次请求完毕，应该把一二三级分类以及关键字清空，让它好接收下一次的id【避免数据合并】,keyword会直接覆盖，不需要置空，就算当前分类没有这个keyword，返回空即可
      this.searchParams.category1Id = ""
      this.searchParams.category2Id = ""
      this.searchParams.category3Id = ""

    }
```



## 3.4 动态开发面包屑中的分类名

1. **套路1:**路由自己跳自己----修改路由

* 带给服务器的参数都是可有可无的：如果属性值是`空`的字符串还是会把相应的字段带给服务器
* 但是如果属性值是`undefined` ，那就不会带给服务器,性能更好

2. **套路2：**watch监听路由的变化发请求

* 分类名字的面包屑

```js
  <!-- 分类名字的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>

 methods: {
    // 根据参数不同返回不同的数据
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除分类名字
    removeCategoryName () {
      // 把要给服务器的数据清空了，带给服务器的参数都是可有可无的：如果属性值是空的字符串还是会把相应的字段带给服务器
      // 但是如果属性值是undefined ，那就不会带给服务器,性能更好
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 重新发送请求
      this.getData()
      // 地址栏也需要修改(删除的是query参数)，通过路由跳转（自己跳自己）
      if (this.$route.params) {
        // 有params参数要带过去
        this.$router.push({ name: 'search', params: this.$route.params })
      } else {
        this.$router.push({ name: 'search' })
      }

    },
    },
```

* 关键字面包屑

```js
 <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
----------------------------------------------
 // 删除关键字
    removeKeyword () {
      // 清空关键字
      this.searchParams.keyword = undefined
      // 当面包写中的关键字清除后，需要让兄弟组件Header组件的关键字清除(配置全局事件总线)
      // 请求数据
      this.getData()
      // 通知兄弟header组件清除关键字
      this.$bus.$emit('clearKeyword')
      // 清除导航栏中的params参数,携带当前路由的query参数
      if (this.$route.query) {
        // 有query参数就携带上
        this.$router.push({ name: 'search', query: this.$route.query })
      } else {
        this.$router.push({ name: 'search' })
      }

    }

//header组件的全局事件总线
 mounted () {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clearKeyword', () => {
      this.keyWord = ''
    })
  }
```

* 品牌信息的面包屑

```js
//search组件  

<!-- 品牌的面包屑 -->
            <!-- split(":")[1] 通过：切割为数组，选第二个 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
...
   <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" />


 // 自定义事件回调
    trademarkInfo (trademark) {
      // 1.整理品牌字段参数 "ID:品牌信息"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 2.再次发请求
      this.getData()
    },
    // 删除品牌信息
    removeTradeMark () {
      // 清空品牌信息
      this.searchParams.trademark = undefined
      // 再次发请求
      this.getData()
    }

//searchSeletor组件
...
 <li
            v-for="trademark in trademarkList"
            :key="trademark.tmId"
            @click="trademarkHandler(trademark)"
          >
...
 methods: {
    // 品牌的点击事件
    trademarkHandler (trademark) {
      // 点击了品牌(如苹果)，还是需要整理参数，向服务器发请求获取相应的数据进行展示
      // 在父组件发请求，因为父组件的中searchParams参数是带给服务器的，子组件需要把你点击的品牌的信息，需要给父组件传过去
      // 子给父传数据---自定义事件
      this.$emit('trademarkInfo', trademark)
    }
  },
```

### 3.4.1 售卖属性

1. 组件通信-----（工作使用频率非常高、面试的时候经常出现）
   * 父子:props、插槽、ref
   * 子父：自定义事件
   * 万能：vuex、$bus、pubsub

2. 经典面试题:数组去重[1,2,2,3,4,2];

* searchSelector组件

```js
<!-- 平台售卖属性比如说颜色 -->
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li
            v-for="(attrValue, index) in attr.attrValueList"
            :key="index"
            @click="attrInfo(attr, attrValue)"
          >
            <a>{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>


...

 //平台售卖属性->点击事件
    attrInfo (attr, attrValue) {
      // attr:attrsList的每一项属性值，attrValue:attr里的每一项属性名
      // 通过自定义事件传递给search组件(子->父)
      this.$emit('attrInfo', attr, attrValue)
    }
```

* search组件

```js
 <!-- 商品售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              <!-- 分割为数组，展示属性值 -->
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
 <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

...
// 属性信息自定义事件
    attrInfo (attr, attrValue) {
      // 把收到的两个参数存取到searchParams
      // props:['属性ID：属性值：属性名']
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重，if语句中如果只有一行代码可以省略大花括号
      if (this.searchParams.props.indexOf(props) == -1) {
        // 当前数组中没有，就存到数组中
        this.searchParams.props.push(props)
      }
      // 发送请求
      this.getData()
    },
    // 删除售卖属性的点击事件，通过索引值区分
    removeAttr (index) {
      // 再次整理参数
      // splice:删除数组元素 split：分割数组
      this.searchParams.props.splice(index, 1)
      // 发送请求
      this.getData()
    }
```



## 3.5 排序操作

### 3.5.1 order属性

- order:服务器需要字段，代表的是排序方式
- order这个字段需要的是字符串（可以传递也可以不传递）

> 1. 代表综合
> 2. 代表价格
> 3. asc代表升序
> 4. desc代表降序

* 告诉服务器排序方式有几种情况?

  > "1:asc" "1:desc"  "2:asc"  "2:desc"



### 3.5.2 综合与价格箭头

1. 箭头用什么去做【可以选用阿里图标库】  

   ```js
   https://www.iconfont.cn/ 
   ```

2. 对于综合|价格旁边的箭头【动态显示：时而又，时而没有】，带有`类名active`，拥有箭头

3. 根据`1、2区分`谁有类名（背景）、谁有箭头
       根据`asc`|`desc`区分它用哪一个箭头【上、下】

```js
search组件
<div class="navbar-inner filter">
              <!-- 排序的结构-->
              <ul class="sui-nav">
                <!-- 当前searchParams.order里包含1，就显示综合高亮 -->
                <li :class="{ active: isOne }" @click="orderChange('1')">
                  <a href="#"
                    >综合
                    <i
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="orderChange('2')">
                  <a href="#"
                    >价格
                    <i
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>

....
 computed: {
...
    // 是否包含1
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    // 是否包含2
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1
    },
    // 是否为向上
    isAsc () {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    // 是否为向下
    isDesc () {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
   methods   
// 价格、综合改变点击事件
    orderChange (flag) {
      // flag来区分用户点击的是综合(1)还是价格(2),用户点击时传递过来的
      // 首先存储默认flag值 和sort值
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      // 存储新的order
      let newOrder = ""
      // 如果点击的是综合,就改变排序的箭头
      if (flag == originFlag) {
        // 如果当前分类的默认的(desc)就切换排序类型
        newOrder = `${flag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的价格,默认为降序(desc)
        newOrder = `${flag}:${'desc'}`
      }
      // 整理数据
      this.searchParams.order = newOrder
      // 发送请求
      this.getData()
    }
```



## 3.6 分页实现

* 前端三大件:轮播图、分页、日历。这属于前端开发常见三种业务

* 为什么很多项目中都采用分页功能?

  > 比如电商平台：搜索一个奶粉，奶粉的产品有10000+，一次渲染10000+条数据，可能慢。
  > 数据多的时候，可以选择分页，比如每一次只是展示10

* 面试当中:你自己封装过一个通用的组件吗?-----**分页组件** 

### 3.6.1 静态组件

```js
<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>

    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>9</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "myPagination",
}
  </script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

----------------------
main.js 注册
import myPagination from '@/components/Pagination'
Vue.component(myPagination.name, myPagination)
```



### 3.6.2 分页器组件动态数据实现

#### 1.分页器展示，需要哪些数据（条件）?

* 当前是第几页：`pageNo`字段代表当前页数

* 每一页需要展示多少条数据：`pageSize`表示

* 整个分页器有多少条数据：`total`字段进行代表 【**获取另外一条数据：一共多少页**】

* 分页连续页码数【起始数字、结束数字：连续页码数市场当中一般5、7、9】`continues`

  > 奇数原因：对称好看 

* 自定义分页器：在开发时自己先传递假的数据进行测试，成功后在使用服务器的数据



#### 2.**分页器重点：**计算分页器的`continues`的**起始数据**和**结束数据**

> 分页器页数不能为负数和0

```js
已经条件: total=【99】  pageSize =【3】  pageNo=6    continues 5 

4 5 6 7 8

已经条件: total=【99】  pageSize =【3】  pageNo= 1    continues 5 

错误:-1 0 1 2 3
正确: 1 2 3 4 5

已经条件: total=【99】  pageSize =【3】  pageNo= 2    continues 5 

错误: 0 1 2 3 4 
正确：1 2 3 4 5 

已经条件: total=【99】  pageSize =【3】  pageNo= 33    continues 5 

错误: 31 32  33 34 35
正确：29 30  31 32 33 


已经条件: total=【99】  pageSize =【3】  pageNo= 32    continues 5 

错误：30 31 32 33 34 
正确: 29 30  31 32 33 

```

```js
//   计算出连续的页码的起始数据和结束数据[至少是5]
    startNumAndEndNum () {
      // 因为数据存到this身上，所以可以解构出，少写this
      const { pageNo, continues, totalPage } = this
      // 定义两个变量存取起始数据和结束数据
      let startNum = 0, endNum = 0
      if (continues > totalPage) {
        //   连续页码数至少为5，如果出现异常显示【总页数小于continues】
        // 起始为1，结束位为当前总页数
        startNum = 1
        endNum = totalPage
      } else {
        //正常现象【总页数大于continues】
        // 5页时应该减2，7页应该减3,parseInt整除
        startNum = pageNo - parseInt(continues / 2)
        endNum = pageNo + parseInt(continues / 2)
        // 把出现不正常的现象【startNum数字出现0||负数】 纠正
        if (startNum < 1) {
          startNum = 1
          //   结束位是当前连续数字的个数
          endNum = continues
        }
        // 最后一位比总页数还大 ---纠正
        if (endNum > totalPage) {
          endNum = totalPage
          // total=【99】  pageSize =【5】  pageNo= 19    continues 5  
          // startNum=20-5+1=16  连续页数【16 17 18 19 20】
          startNum = totalPage - continues + 1
        }
      }

      return { startNum, endNum }
    }
```



#### 3.分页器数据动态实现

* 经典面试题：v-for与v-if优先级？ 

  > v-for优先级更高

* `v-for`可以遍历数字

```js
<template>
  <div class="pagination">
    <!-- @click="$emit('getPageNo', pageNo - 1)点击触发自定义事件 -->
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <!-- 上 -->
    <!-- 连续数字的起始页比1大的时候才显示，避免重复 -->
    <button
      v-if="startNumAndEndNum.startNum > 1"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <!--连续数字的起始页比2大的时候才显示，否则不需要 【...后面应该显示3，才可以看出省略了数据(2)否则没必要0】  -->
    <button v-if="startNumAndEndNum.startNum > 2">···</button>

    <!-- 中间部分 -->
    <!-- :class="{ active: pageNo == page }" 动态添加类名，给当前页添加 -->
    <button
      v-for="(page, index) in startNumAndEndNum.endNum"
      :key="index"
      v-show="page >= startNumAndEndNum.startNum"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <!-- 连续数字结束符应该是小于totalPage - 1才应该显示省略号 -->
    <button v-if="startNumAndEndNum.endNum < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.endNum < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  
  <script>
export default {
  name: "myPagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算总共多少页
    totalPage () {
      // Math.ceil 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    //   计算出连续的页码的起始数据和结束数据[至少是5]
    .... 【见上】
  }
}

 <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
```

* **search组件**

```js
 <!-- 分页器 -->
          <myPagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
 
...
 data () {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        //排序，默认值应该是综合、降序
        order: "1:desc",
        // 分页器用的
        pageNo: 1, //代表当前是第几页
        pageSize: 5, //每一页有几条数据
        // 平台售卖属性的参数
        props: [],
        // 品牌
        trademark: ""

      }
    }
  },
computed: {
    // 获取search模块产品一共展示多少个
    ...mapState({
      total: state => state.search.SearchList.total

    })

  },
      
 // 接收子【Pagination】给父传递的自定义事件回调,以便知道当前点击的是第几页
    getPageNo (pageNo) {
      // 修改当前pageNo的数据
      this.searchParams.pageNo = pageNo
      // 重新发送请求
      this.getData()
    }
```

#### 4.总结

1. 面试问题：v-for与v-if优先级?

2. 工作当中是否自己封装过一些通用的组件？

3. 对于一个分页器:

1. 需要知道数据总条数
2. 每一个需要展示数据条数
3. 知道当前是第几页
4. 连续页码数字
5. 自定义事件【子给父通信的】

4. **push与replace区别?**

* 编程式导航：push 与 replace
* 能不能记录历史记录：push（能记住历史记录）  replace（不能记住历史记录）
* 目前项目当中：进行路由跳转（编程式导航）基础都是push.
  push与replace是有区别的



# 四、详情页面

## 4.1 路由滚动行为

```js
// 定义路由组件
export default new VueRouter({
    // 配置路由
    routes,
    // 滚动行为，参数to, from, savedPosition
    scrollBehavior () {
        // return 期望滚动到哪个的位置
        // y：0代表最上面【router3】  top:0 【router4】
        return { y: 0 }
    }
})
```



## 4.2 放大镜和轮播图

### 4.2.1 放大镜

* detail组件

```js
   <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="skuImageList" />
          <!-- 小图列表 -->
          <ImageList :skuImageList="skuImageList" />
        </div>
```

* zoom组件

```js
<template>
  <!-- 放大镜 -->
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "myZoom",
  data () {
    return {
      currentIndex: 0
    }
  },
  props: ['skuImageList'],
  computed: {
    imgObj () {
      // 没返回数据时是空对象
      return this.skuImageList[this.currentIndex] || {}
    }
  },
  mounted () {
    // 全局事件总线
    this.$bus.$on('changeIndex', (index) => {
      // 存储数据
      this.currentIndex = index
    })
  },
  methods: {
    // 鼠标移动事件回调
    handler () {
      let mask = this.$refs.mask
      let big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2

      if (top <= 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight
      if (left <= 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth
      // 修改遮罩层的top和left值
      mask.style.top = top + 'px'
      mask.style.left = left + 'px'
      // 修改大图的数据，因为big图的宽高是200%，所以要乘以-2【原本不加是偏右下，负代表上和左】
      big.style.top = -2 * top + 'px'
      big.style.left = -2 * left + 'px'
    }
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
```



### 4.2.2 轮播图

```JS
<!-- 轮播图 -->
<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data () {
    return {
      currentIndex: 1 //记录当前点击的轮播图小图片索引号
    }
  },
  computed: {
    imgObj () {
      return this.skuImageList[0] || {}
    }
  },
  watch: {
    // 监听数据可以保证数据一定ok，但是不能保证v-for遍历是否完成
    skuImageList () {
      this.$nextTick(() => {
        // 服务器回来了，轮播图结构有了
        new Swiper(this.$refs.cur, {
          // 前进后退功能
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // slidesPerView设置slider容器能够同时显示的slides数量(carousel模式)。显示三个
          slidesPerView: 2,
          // 每一次切换的个数
          slidesPerGroup: 1
        })
      })
    }
  },
  methods: {
    // 修改当前索引值
    changeCurrentIndex (index) {
      // 修改响应式数据
      this.currentIndex = index
      //通知zoom组件【兄弟】修改索引值
      this.$bus.$emit('changeIndex', index)
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
```



## 4.3 购物车

### 4.3.1 加入购物车成功与失败校验

* async函数执行返回的结果一定是promise，promise要么成功，要么失败
* 以后项目当中：凡是出现文本框【**用户输入：**一定有'幺蛾子',思考情况一定要多思考】

```js
 <div class="add">
                <!-- 以前的路由跳转都是从A跳到B，这里加入购物车进行路由跳转之前，需要发请求，把你购买的商品信息通过请求的形式通知服务器，让服务器进行存储 -->
                <a @click="addShopCar">加入购物车</a>
              </div>

 // 加入购物车的回调函数
    async addShopCar () {
      // 1.发请求---将产品加入到数据库(通知服务器)
      /* 发请求完毕，需要知道请求成功/失败的结果 
      this.$store.dispatch('addOrUpdateShopCartAPI', { skuId: this.$route.params.skuId, skuNum: this.skuNum }) 
      这行代码作用：调用仓库的addOrUpdateShopCart，返回promise对象【因为有async】
      promise要么成功，要么失败
      再把当前的返回值变为promise对象，就可以接收到action中的return值了
      */
      try {
        await this.$store.dispatch('addOrUpdateShopCart',
          { skuId: this.$route.params.skuId, skuNum: this.skuNum })
      } catch (error) {
        alert(error.message)
      }

      // 2.服务器存储成功 ---进行路由跳转，传递参数

      // 3.失败给用户提示 
    }


vuex中的action
// 将产品添加到购物车
    async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
        const res = await addOrUpdateShopCartAPI(skuId, skuNum)
        console.log(res);
        // 加入购物车后，只是把数据保存了，此时，不需要存储【没有返回其他数据】
        if (res.code === 200) {
            // 加入成功
            return "ok"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('false'))
        }
    }
```



### 4.3.2 注册路由，加入购物车成功页组件显示

* 路由路径一定小写

1. **面试题：GET与POST**
   * 相同点：都是HTTP协议。
   * 不同点:
     1. GET请求携带参数是有上限的 post请求携带的参数是没有'上限的'
     2. GET请求相对而言不安全，POST安全
2. **面试题:H5新增那些特性？**
   本地存储、多媒体、canvas
3. **面试题：本地存储与会话存储区别？**

> 本地存储与会话存储一般存字符串【需要把对象变为字符串】

* 本地存储：持久化存储

* 会话存储：产品信息的数据【比较复制：对象】，可以通过会话存储

  > 作用：不持久化，会话结束后数据会消失

* 路由传递：简单的数据可以通过query形式给路由组件传递过去

4. blur:失去焦点--->点击空白的地方
   change:文本需要有变化，而且还需要点击空白的地方
   input:只要文本发生变化立马执行【不许点击空白的地方】



### 4.3.3 获取购物车的数据进行展示?

1. 举例子:用户是淘宝平台的用户。

   > 为什么目前我们获取不到自己购物车的数据，你没有给我分配一个用户id
   >
   > 张三:奶粉、鞋子、手机
   >
   > 李四:羽绒服

1. 问题1：用哪个技术可以生成用户id【身份】----uuid
2. 问题2:用户身份如何给后台专递过去？
3. 临时身份只需要执行一次
4. 临时身份数据持久化的

> 本地存储

5. 工作的时候不这么玩

> 会创建一个utils（工具）文件：把常用的代码片段放到这个文件夹里面

6. 配置一些文件[JS]，不能操作仓库
   配置文件不限执行，没办法运行项目【配置文件很少碰仓库】

#### 1.**临时身份信息**

```js
//uuid_token.js

//引入uuid
import { v4 as uuidv4 } from 'uuid';
// 生成随机字符串，并且每次执行不能发生变化，保证游客身份持久化
export const getUUID = () => {
    // 存储在本地
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //    如果没有
    if (!uuid_token) {
        // 生成游客临时身份
        uuid_token = uuidv4()
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 一定要返回uuid_token【函数返回值】
    return uuid_token
}
```

#### 2.requests.js【添加请求头】

```js
// 请求拦截器：在请求发出去之前可以检测到，并且可以做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要===请求头（header）
    // 如果有uuid就加到请求头
    if (store.state.detail.uuid_token) {
        // 请求头加一个字段(userTempId:后台要求的)
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 进度条开始
    nProgress.start()

    return config
})
```

#### 3.shopCart组件发送请求

```js
 methods: {
    // 派发action获取购物车信息
    getData () {
      this.$store.dispatch('getShopCartList')
    }
  }
```



#### 4.设计购物车的数据

* 注意：获取购物车的数据的时候，读取的时候切记小心。后台老师写的数据格式有问题的。

* **购物车产品选中与未选中业务**
  购物车中产品的数据：isChecked属性，1：代表这个产品勾选中   0:代表这个产品没有被选中

* 注意:以后工作的时候，最基本的基本功看API文档（在线文档），在开发后台管理系统项目的时候
  一定要培养看在线文档能力

* 全选的业务

  1. 以后在工作当中出现了一些，想不明白、或者没有思路。【前一个月：有问题，尽可能别问同事】
  2. 全选的复选框业务
     目前而言：是没有这个接口，一次修改全部产品的选中状态接口【正常工作当中一定是有这样的接口：一次全部修改选中状态】
     全选复选框：如果它勾上，顶上全部的产品的选中状态，勾上
     全选复选框：如果它没勾上，顶上的全部产品的选装中台，没勾上

  ```js
  - 张三:衣服、裤子、鞋子
  
  [
  
  ]
  ,
  [
       {
            cart:[   {name:'衣服'},{name:'裤子'},{name:'鞋子'}]
      }
  ]
  
  ```

  ```js
  //shopcart.js
  const getters = {
      ShopCartList (state) {
          return state.ShopCartList[0] || {}
      },
      
  //ShopCart
    computed: {
      ...mapGetters(['ShopCartList']),
      // 计算出来的购物车数据
      cartInfoList () {
        return this.ShopCartList.cartInfoList
      },
      // 所有被选商品的总价
      totalPrice () {
        let sum = 0
        this.cartInfoList.forEach((item) => {
          if (item.isChecked === 1) {
            // 当前商品被勾选了
            sum += item.cartPrice * item.skuNum
          }
        })
        return sum.toFixed(2)
      },
      // 判断是否全选【全部都被勾选全选才会被勾选】
      isCheckedAll () {
        // every，遍历数组，只有数组中全部元素的isChecked属性都为1===》真，否则===》假，返回布尔值
        return this.cartInfoList.every(item => item.isChecked == 1)
      }
  
    },
  ```

### 4.3.4 修改产品的数量（需要节流）

* 

```js
 <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @blur="changeSkuNum('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('plus', 1, cart)"
              >+</a
            >
          </li>


  methods: {
    // 派发action获取购物车信息
    getData () {
      this.$store.dispatch('getShopCartList')
    },
    //修改产品数量回调
    // TIP 节流
    changeSkuNum: throttle(async function (type, disNum, cart) {
      // type:用于区分点击的类型
      // disNum:变化量(1) 变化量(-1) input框的总数
      // cart:点击的是哪个产品【因为有id】
      // 向服务器发请求,修改数量
      switch (type) {
        // 加号
        case 'plus':
          //带给服务器的变化量
          disNum = 1
          break;
        case 'mins':
          // 当前产品的数量大于1才会给服务器【-1===>减1；0===>不变】
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            // 是非法数字【有汉字】
            disNum = 0 //不变
          } else {
            //排除小数，取整,取变化值,排除差值负数的情况
            disNum = parseInt(disNum) - cart.skuNum

          }
          // 三元表达式,可读性差
          // disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum
          break;
      }
      try {
        // 获取数据成功
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 重新请求数据【获取购物车信息】
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000)
    ,
  }
```



### 4.3.5 删除产品

1. 

```js
 //删除产品点击事件
    async delShopCartFn (skuId) {
      try {
        // 发请求
        await this.$store.dispatch('delShopCart', skuId)
        // 删除成功，再发请求
        this.getData()
      } catch (error) {
        // 删除失败
        alert('删除失败')
      }
    }

//shopcart.js
//{ commit } 一定要占位
 async delShopCart ({ commit }, skuId) {
        const res = await delShopCartAPI(skuId)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
```

2. 删除选中的产品

   * promise.all()

   > 返回一个布尔值，如果每个状态都为成功====》返回true
   >
   > 有一个失败===》false

```js
  // 删除所有选中的产品
    async deleteAllCheckedCart ({ dispatch, getters }) {
        //context：小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        // 遍历getters里面的ShopCartList，选择出被选中的，获取其id
        let promiseAll = []
        getters.ShopCartList.cartInfoList.forEach((item) => {
            // 这样会返回一个promise对象【因为delShopCart上有async修饰】，dispatch删除成功，promise对象为true ；反之为false
            let promise = item.isChecked == 1 ? dispatch('delShopCart', item.skuId) : ''
            // 把每一个promise存到数组中
            promiseAll.push(promise)
        })
        console.log(Promise.all(promiseAll));
        // 只有全部的p1|p2...都成功，返回值才是成功
        // 如果有一个失败，返回值即为失败
        return Promise.all(promiseAll)
    }

//shopcart.vue
 // 删除所有选中的商品==》点击事件
    // 没办法收集到有效数据
    async deleteAllCheckedCart () {
      try {
        await this.$store.dispatch("deleteAllCheckedCart")
        // 获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
```



### 4.3.6 全选产品的勾选状态实现

```js
   <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll && cartInfoList.length > 0"
          @click="changeCheckedState($event)"
        />
        <span>全选</span>
      </div>


 //切换全选状态
    async changeCheckedState (event) {
      // try大括号里面的代码都会走
      try {
        // event.target.value,布尔值；选中==》true，反之，false
        let isChecked = event.target.checked ? '1' : '0'
        // 派发action，让所有的单选框状态跟随全选状态
        await this.$store.dispatch('changeAllSkuState', isChecked)
        //重新获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }

    }

shopcart.js

//切换全选状态
    async changeAllSkuState ({ dispatch, getters }, isChecked) {
        // 通过changeSkuState切换,下面的是数组
        let promiseAll = []
        getters.ShopCartList.cartInfoList.forEach(item => {
            // 遍历
            let promise = dispatch('changeSkuState', { skuId: item.skuId, isChecked })
            // 存储到promiseAll中，便于判断是否成功
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
```



# 五.登陆注册

* 对于企业当中，一般项目都有登录注册功能【这个业务很重要】
* 当然有一些项目不需要注册，后台管理系统项目，一般不需要注册。

* assets【放置静态资源文件的地方】，一般放置所有组件共用的静态资源，在样式当中也可以使`@`,在样式当中使用`@`，前面加上`~`

## 5.1 注册

* 今天在做注册、登录业务的时候，先不处理表单的验证功能，在项目最后一天，在把表单如何验证，如果是那哪些插件解决【最后去处理】

* 正则

  > 手机号:11
  > 验证码:4-6
  > 登录密码|确认密码:首字母大写、包含英文、数字、特殊字符等等。

* 获取验证码
  `/api/user/passport/sendCode/{phone} `

```js
//register.vue 
methods: {
    // 获取验证码
    async getCodeFn () {
      // 至少数据要存在
      try {
        const { phone } = this.userInfo
        // 发送请求
        phone && (await this.$store.dispatch('getCode', this.userInfo.phone))
        // 成功，就将组件的code值变为仓库中的验证码
        this.userInfo.code = this.$store.state.user.code
      } catch (error) {
        alert(error.message)
      }
    },
    // 用户注册=》点击事件
    async RegisterFn () {
      try {
        const { phone, password, code, rePassword } = this.userInfo;
        // 前面为真才执行后面的,上一行要加分号
        (phone && code && password == rePassword) && await this.$store.dispatch('register', { phone, password, code })
        // 路由跳转
        this.$router.push('/login')
      } catch (error) {
        alert(error.message)
      }

    }
  },
```







## 5.2 登录

### 5.2.1 token

* vuex数据不是持久化的，刷新页面会消失

1. 用户登录以后获取用户信息进行展示

* 企业项目:登录成功以后，服务器会返回`token`【存储于**vuex当中**】，如果想获取用户信息
* 还需要再发请求【用户信息】，携带token给服务器。 
* `api/user/passport/auth/getUserInfo` 获取用户信息的接口

2. 为什么刷新页面，用户信息就消失
   * 用户刷新页面，用户信息消失没了获取不到，因为token没有携带给服务器。
   * Vuex存储数据是否持持久化的?**并非持久化**

3. 本地存储持久化存储token

4. 为什么去别的模块【非home模块】获取用户信息失败？

   > 因为你去别的模块根本没有发请求获取用户信息，没办法展示用户信了 

5. 怎么解决:
   每一个组件都在mounted里面发起获取用户信息，进行展示（可以**太麻烦**）
6. 残留的问题：用户在home模块刷新的时候，用户信息一直在展示（mounted执行的时候在向服务器发请求、获取用户信息展示）

>  home->search[用户信息刷新数据就没了，因为在search模块当中根本没有发请求获取用户信息]
> search-detail[根本没有获取用户信息进行展示]

* login.vue

```js
  <!-- prevent阻止form表单默认行为 -->
              <button class="btn" @click.prevent="loginFn">
                登&nbsp;&nbsp;录
              </button>
...
<script>
export default {
  name: 'myLogin',
  data () {
    return {
      phone: '',
      password: '',
    }
  },
  methods: {
    // 登录的回调函数
    async loginFn () {
      try {
        const { phone, password } = this;
        (phone && password) && await this.$store.dispatch('login', { phone, password })
        // 路由跳转到home首页
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>
```

* user.js

```js
  //登录业务token
    async login ({ commit, state }, data) {
        const res = await loginAPI(data)
        //data:{ nickName: '123', name: '123', userId: 8, token: '322d05cee4b7412893c79470c6a7382b' }
        //token:唯一标识符
        if (res.code == 200) {
            //用户已经成功登录且获得token
            // commit('LOGIN', res.data.token)
            // 持久化存储
            // BUG 当前登录，必须要刷新才能成功登录
            // 原因：setToken(res.data.token) 无返回值
            // 解决：添加return
            setToken(res.data.token)
             commit('LOGIN')
            // localStorage.setItem('TOKEN', res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
          
       // 登录
    LOGIN (state) {
        state.token = getToken()
    },
        
```



### 5.2.2 退出登录

1. 发请求，需要通知服务器，把现在用户身份token【销毁】
2. 清除仓库数据+本地存储数据【都需要清理】

```js
//header.vue 
//退出登录
    loginOut () {
      // 1.发请求，通知服务器退出登录【清除一些数据：token】
      // 2.清除项目中的数据【userInfo,token】
      try {
        this.$store.dispatch('loginOut')
        //回到首页
        this.$router.push('/home')
      } catch (error) {
        alert('failed')
      }
    }

//user.js
//退出登录
    async loginOut ({ commit }) {
        //只是向服务器发送一次请求，通知服务器清除token
        const res = await loginOutAPI()
        if (res.code === 200) {
            // 清除本地数据,action不能操作state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }

 // 清除本地数据
    CLEAR (state) {
        state.token = ""
        state.userInfo = {}
        // 清空token
        removeToken()
    }

//清除本地存储的token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}
```



### 5.2.3 路由导航守卫

* 导航:表示路由正在发生改变

> router

* 守卫:古代的守门的士兵'守卫'，守卫可以通过**条件判断路由能不能进行跳转**。

* 三大守卫:

1. 全局守卫：

   * 项目当中**任何路由变化**都可以检测到，通过条件判断可不可以进行路由跳转。

   1. 前置守卫：**路由跳转之前**可以做一些事情。
   2. 后置守卫：**路由跳转已经完成**再执行。
      //全局守卫:[后置守卫:在路由跳转完毕之后才会执行一次]
      router.afterEach(()=>{
           console.log('守卫:路由跳转完毕才会执行一次')
      })

* 用户已经登录了，不应该在访问login？【通过什么条件能判断用户登录、未登录】

2. 路由独享守卫：需要在配置路由的地方使用

   > 针对某一个路由的守卫 

   * 导航守卫:全局守卫->项目当中有任何路由变化【a->b,b->d】触发。
   * 路由独享守卫：**专门负责某一个路由**

```js
用户登陆了:
去交易页面:从购物车才能跳转到交易页面。

next():你本来想去哪里，我就放行，你就去完事了。

next('/login'):执行守卫放行到执行的路由。

next(false):路由跳转的时候，从哪里来回那里去
//路由
 {
            // 交易页面
            path: '/trade',
            name: 'trade',
            component: () => import("@/views/Trade"),
            meta: {
                show: true //控制Footer组件是否显示
            },
            beforeEnter: (to, from, next) => {
                // 去交易页面，如果来的是购物车路由，才放行，否则，留在当前
                if (from.path == "/shopcart") {
                    next()
                } else {
                    next(false)
                }
            }
        },
```



3. 组件内守卫：

   > 也是负责某一个路由守卫

   ```js
     //组件内守卫
     beforeEnter: (to, from, next) => {
       // 在渲染该组件的对应路由之前被 confirm 调用
       //不能获取组件实例对象this,因为守卫执行时，组件实例还没有创建
       if (from.path == "pay") {
         next()
       } else {
         next(false)
       }
     }
     //占位符改变时触发
       beforeRouteUpdate (to, from) {
       // 在当前路由改变，但是该组件被复用时调用
       // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
       // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
       // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
     },
     beforeRouteLeave (to, from,next) {
       // 在导航离开渲染该组件的对应路由时调用
       // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
         //想离开需要next()
     },
   ```

   

```js
// 定义路由组件
const router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为，参数to, from, savedPosition
    scrollBehavior () {
        // return 期望滚动到哪个的位置
        // y：0代表最上面【router3】  top:0 【router4】
        return { y: 0 }
    }
})

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    // to:可以获取要跳转到的路由信息
    // from：从哪来的路由信息
    /*  next:放行 
        1.next()
        2.next('path') 放行到指定路由【用的少，一般要判断】 
        3.next(false):url改变后，退回到from的路由 
    */
    //    登录了才会有token，未登录没有
    let token = store.state.user.token
    //没有数据时，是空对象，空对象是真
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户已经登录了，不能去login
        if (to.path === '/login') {
            // 回到首页
            next('/')
        } else {
            //登录了，去的不是login 【home|search|shopcart】
            // 如果用户名有
            if (name) {
                next()
            } else {
                // 没有用户名,派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功，放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //身份信息过期，token失效,获取不到用户信息，需要清除token，重新登录
                    await store.dispatch('loginOut')
                    next('/login')
                }
            }

        }
    } else {
        // 未登录
        next()
    }
})

export default router


   //退出登录
    async loginOut ({ commit }) {
        //只是向服务器发送一次请求，通知服务器清除token
        const res = await loginOutAPI()
        if (res.code === 200) {
            // 清除本地数据,action不能操作state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
```



### 5.2.4 未登录时路由守卫的判断

1. 用户未登录：
   * 点击购物车的结算按钮->交易页面【没有登录:去不了】
   * 未登录不能调到支付页面
   * 未登录不能调到支付成功页面
   * 未登录不能去个人中心【都不知道你是谁：展示谁的个人中心啊】

## 5.3 表单验证

### 5.3.1 vee-validate插件：

* Vue官方提供的一个表单验证的插件
* 这个插件很难用：如果你翻看它的文档（看一个月：不保证能看懂），
* 依赖文件很多（文档书写的很难理解）
* 花大量时间学习，很难搞懂。

```js
//安装
cnpm i vee-validate@2 --save

//vee-validate插件：表单验证区域
import Vue from "vue";
//引入
import VeeValidate from "vee-validate";
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate)

//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同 `// 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        isCheck: '协议'
    }
})

//main.js引入
// 引入校验插件
import validate from '@/plugins/validate'
```




### 5.3.2 使用步骤：

1. 安装vee-valadite，别安装最新版本@2
2. 在plugins文件夹中创建一个validate.js[专门注册vee-valadite]
3. 注册插件
4. 注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】
5. 在入口文件需要引入执行一次
6. 使用vee-valadiate插件



### 5.3.3 自定义校验规则

```js
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
validate: value => {
return value
},
getMessage: field => field + '必须同意'
})

```

* 基本使用

```js
     <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          placeholder="请输入你的手机号"
          v-model="userInfo.phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          placeholder="请输入验证码"
          v-model="userInfo.code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button class="getCodeBtn" @click="getCodeFn">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入密码"
          v-model="userInfo.password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="userInfo.rePassword"
          name="rePassword"
        />
        <span class="error-msg" v-if="userInfo.rePassword !== userInfo.password"
          >确认密码和密码应该相同</span
        >
      </div>
      <div class="controls">
        <input
          type="checkbox"
          v-model="userInfo.agree"
          name="agree"
          v-validate="{ required: true, isAgree: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="RegisterFn">完成注册</button>
      </div>
    </div>


 // 用户注册=》点击事件
    async RegisterFn () {
      const { phone, password, code, rePassword } = this.userInfo;
      const success = await this.$validator.validateAll();
      //全部表单验证，js兜底校验,都成功了再发请求，有一个不成功都不行
      if (success && rePassword === password) {
        try {

          // 前面为真才执行后面的,上一行要加分号
          await this.$store.dispatch('register', { phone, password, code })
          // 路由跳转
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }

    }
```




# 六、交易页面

## 6.1 获取用户地址信息

> 前提：登录才能获取

1. 获取用户地址接口

> `/api/user/userAddress/auth/findUserAddressList`
>
> method：get

## 6.2 提交订单业务

1. 当用户点击提交订单按钮的时候，需要发请求的
   提交订单的请求地址:/api/order/auth/submitOrder?tradeNo={tradeNo}
2. 前台：需要告诉服务器：谁买的、买的啥、买几个、 支付多少钱、留言信息...
3. 后台：订单号，这笔交易的一个标识符【支付的】

axios({url:'xxx',methods:'post',data:{a:1}})



4. 统一暴露api

```js
// 统一接口api文件夹里面全部请求函数
import * as API from "@/api"

//main.js
beforeCreate () {
    // 注册全局事件总线
    Vue.prototype.$bus = this
    // 注册api到Vue的原型里
    Vue.prototype.$API = API
  },
```

5. 不要在生命周期函数里用async|await



## 6.3 element-ui官方UI组件库（插件）？

1. react框架:
   * UI组件库antd【蚂蚁金服旗下PC端UI组件库】
   * antd-mobile【蚂蚁金服旗下的移动端UI组件库】

2. Vue框架:
   * element-UI【饿了吗旗下的UI组件库，官方承认的PC组件库插件】
   * vant【Vue官方提供移动端UI组件库】

> 官网地址:https://element.eleme.cn/#/zh-CN
> 官网地址：https://youzan.github.io/vant/#/zh-CN/

- 第一步：项目中安装element-ui组件库 [2.15.6版本：Vue2]

- 第二步：在入口文件引入elementUI组件库
  第一种：全部引入【不采用：因为项目中只是用到一个组件，没必要全都引入进来】
  第二种：按需引入【按照开发需求引入相应的组件，并非全部组件引入】

- 第三步：按需引入，安装相应的插件

  > cnpm install babel-plugin-component -D
  > 文档中说的.babelrc文件，即为babel.config.js文件
  > 修改完babel.config.js配置文件以后，**项目重启**

- 
  第四部：按照需求引入相应的组件即可


> Vue.component();
> Vue.prototype.$xxx = xxx;

```js
//引入elementui
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
//注册全局组件，方法1
Vue.config.productionTip = false
//注册全局组件方法2(挂载在原型上)
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$alert = MessageBox.alert
```



6.3.1 二维码生成插件

> qrcode
>
> cnpm i qrcode – -save

1. 通过qrCode.toDataUrl方法，将字符串转换为加密的在线二维码链接，通过图片进行展示。
   * moment.js
   * swiper.js
   * nprogress.js
   * qrcode.js

## 6.4 支付功能实现

* GET|POST：短轮询，请求发一次，服务器响应一次，完事。

1. 第一种做法:前端开启定时器，一直找服务器要用户支付信息【定时器】

2. 第二种做法:项目务必要上线 + 和后台紧密配合
   * 当用户支付成功以后，需要后台重定向到项目某一个路由中，将支付情况通过URL参数形式传给前端，
   * 前端获取到服务器返回的参数，就可以判断了。

```js
// 去支付点击事件
    async goPayFn () {
      //生成二维码(地址base64)
      //codeUrl:字符串
      let url = await QRCode.toDataURL(this.payInfo.codeUrl)
      //格式要严格，加空格
      this.$alert(`<img src=${url} />`, '请您微信支付', {
        dangerouslyUseHTMLString: true,
        // 居中显示
        center: true,
        // 取消按钮
        showCancelButton: true,
        // 取消按钮文本
        cancelButtonText: '支付遇见问题',
        //确定按钮文本
        confirmButtonText: '已支付成功',
        //关闭右上角按钮
        showClose: false,
        //关闭弹出框的回调
        beforeClose: (type, instance, done) => {
          //type:区分确认还是取消按钮
          //instance：当前组件实例对象
          //done:关闭函数
          if (type === "confirm") {
            //点击确认,在判断是否真的支付
            if (this.code == 200) {
              // 清除定时器
              clearInterval(this.timer)
              // 路由跳转到支付成功
              this.$router.push('/paysuccess')

            }
          } else {
            alert("请联系管理员")
            // 清除定时器
            clearInterval(this.timer)
            //关闭
            done()
          }
        }
      });
      //需要知道支付成功还是失败
      // 成功==》路由跳转，失败===》提示信息
      if (!this.timer) {
        this.timer = setInterval(async () => {
          // 发请求获取用户支付的状态
          let res = await this.$API.getPayStatusAPI(this.orderId)
          if (res.code == 200) {
            //支付成功
            //1.清除定时器
            clearInterval(this.timer)
            //2.保存支付成功的状态码200
            this.code = res.code
            //关闭弹出框
            this.$msgBox.close()
            // 路由跳转到支付成功
            this.$router.push('/paysuccess')
          }
        }, 1000);
      }
    },
```



## 6.5 获取我的订单信息

```js
...
  <div class="orders">
      <table class="order-item" v-for="order in records" :key="order.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ order.createTime }} 订单编号:{{ order.outTradeNo }}
                <span class="pull-right delete"
                  ><img src="../images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, index) in order.orderDetailList" :key="cart.id">
            <td width="60%">
              <div class="typographic">
                <img :src="cart.imgUrl" style="width: 100px; height: 100px" />
                <a href="#" class="block-text">{{ cart.skuName }}</a>
                <span>x{{ cart.skuNum }}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <!-- 下面的td需要合并（rowspan），order.orderDetailList长度是几就要合并几次 ,数组长度是即就有几个重复的，我们只需要第一个【index=0】 -->
            <td
              :rowspan="order.orderDetailList.length"
              width="8%"
              class="center"
              v-if="index == 0"
            >
              {{ order.consignee }}
            </td>
            <td
              :rowspan="order.orderDetailList.length"
              width="13%"
              class="center"
              v-if="index == 0"
            >
              <ul class="unstyled">
                <li>总金额¥ {{ order.totalAmount }}</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td
              :rowspan="order.orderDetailList.length"
              width="8%"
              class="center"
              v-if="index == 0"
            >
              <a href="#" class="btn">{{ order.orderStatusName }} </a>
            </td>
            <td
              :rowspan="order.orderDetailList.length"
              width="13%"
              class="center"
              v-if="index == 0"
            >
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choose-order">
      <!-- 分页器 -->
      <myPagination
        :pageNo="page"
        :pageSize="limit"
        :total="orderList.total"
        :continues="5"
        @getPageNo="getPageNo"
      />
    </div>
...

<script>
export default {
  name: 'myOrder',
  data () {
    return {
      //初始化参数
      page: 1, //当前第几页
      limit: 3, //每一页的个数
      orderList: {} //保存订单信息
    }
  },
  computed: {
    records () {
      return this.orderList.records
    }
  },
  mounted () {
    //获取我的订单的数据
    this.getData()
  },
  methods: {
    //获取我的订单方法
    async getData () {
      let { page, limit } = this
      const res = await this.$API.getMyOrderAPI(page, limit)
      if (res.code == 200) {
        //获取成功，保存数据
        this.orderList = res.data
      }
    },
    // 获取当前点击的每一页
    getPageNo (index) {
      // 修改组件响应式的page
      //   参数是分页器组件传过来的
      this.page = index
      //   重新渲染
      this.getData()
    }
  },
}
</script>
```



# 七.打包上线

## 7.1性能优化

**面试【高频的面试】:项目的性能优化手段有哪些？**

1. v-if|v-show:尽可能采用v-show
2. 按需引入【lodash、elementUI】
3. 防抖与节流
4. 路由懒加载：当用户访问的时候，加载对应组件进行展示。

### 7.1.1 图片懒加载

```js
npm i vue-lazyload -S
```



* **vue-lazyload:图片懒加载**

  > 图片：比用用户网络不好，服务器的数据没有回来，
  > 总不可能让用户看白色，至少有一个默认图片在展示。



### 7.1.2 路由懒加载

1. 面试【高频的面试】:项目的性能优化手段有哪些？
   * v-if|v-show:尽可能采用v-show
   * 按需引入【lodash、elementUI】
   * 防抖与节流
   * 路由懒加载：当用户访问的时候，加载对应组件进行展示。

> 在打包上线的时候，js包会变得很大，影响页面加载
>
> 如果我们能把不同路由对应的组件分割位不同的代码，然后当路由被访问时才加载对应组件，这样会更高效

```js
  {
            // 支付成功页面
            path: '/paysuccess',
            name: 'paysuccess',
            component: () => import("@/views/paySuccess"),
            meta: {
                show: true //控制Footer组件是否显示
            }
        },
```



## 7.2 打包

```js
npm run build
```

1. 项目打包后，代码都是经过压缩加密的。如果运行时报错，输出的错误消息无法准确的得知哪里出问题了。
2. 有了map文件夹就可以像未加密的代码一样，准确的知道哪一行出错，所以该文件如果项目不需要可以不要【**节省体积**】

> vue.config.js配置
>
> productionSourceMap：false  //可以在打包时去掉map文件



## 7.3 购买服务器

1. 阿里云，腾讯云

2. 设置安全组：让服务器的一些端口号打开
3. 利用xshell工具登录服务器

> 通过Linux指令操作云服务器：
>
> Linux： /根目录
>
> Linux常用指令：
>
> * cd / 去根目录
> * ~ 家文件夹
> * cd xxx 去xxx文件
> * ls查看目录
> * mkdir 创建目录
> * pwd:查看绝对路径



## 7.4 nginx(反向代理)

刚刚在在服务器上==》创建了这些/root/yz/www/legou/dist

是一个高性能的[HTTP](https://baike.baidu.com/item/HTTP?fromModule=lemma_inlink)和[反向代理](https://baike.baidu.com/item/反向代理/7793488?fromModule=lemma_inlink)web服务器

> 下载,在xshell中下载
>
> yum install nginx

### 1.为什么访问了ip地址就访问了我们的项目？

> http://39.98.49.147



2.我们项目的数据来源  http://gmall-h5-api.atguigu.cn



3.nginx配置

1. cd etc
2. 找到nginx目录，没安装的通过上面的命令安装
3. 安装完nginx服务器以后，在nginx目录下，多了应该nginx.conf文件，在这个文件夹中配置
4. vim nginx.conf 【vim:编辑】，主要添加如下两项

* INSERT进入编辑模式
* :WQ保存  shift + z按两次
* ESC退出

```js
//解决第一个问题：
location / {
    root /root/yz/www/legou/dist;
    index index.html;
    try_files $url $url/ /index.html;
}

//解决第二个问题，反向代理找数据来源要数据
location /api{
    proxy_pass http://gmall-h5-api.atguigu.cn;
}
```

5. nginx服务器跑起来

> service nginx start



# 接口文档

## 1. **附录**

### **1.1 服务器地址**

| **开发服务器** | **http://gmall-h5-api.atguigu.cn** |
| -------------- | ---------------------------------- |



### **1.2 公共请求参数**

每个接口需要的Header参数值（登录接口不需要）：

| 参数名称   | 类型                   | 是否必选 | 描述                   |
| ---------- | ---------------------- | -------- | ---------------------- |
| token      | String                 | Y        | 登录的token            |
| userTempId | String(通过uuidjs生成) | Y        | 未登陆用户生成的临时ID |

 

例如： 

```
token: d90aa16f24d04c7d882051412f9ec45b  后台生成

userTempId: b2f79046-7ee6-4dbf-88d0-725b1045460b 前台生成
```

 

## 2. **登录**

### **2.1请求地址**

/api/user/passport/login

### **2.2请求方式**

POST

### **2.3参数类型**

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| phone    | string | Y        | 用户名 |
| password | string | Y        | 密码   |

### **2.4返回示例**

成功：

```js
{
code: 200
message: "成功"
data:{
nickName:"Administrator",
name:"Admin",
token: 90aa16f24d04c7d882051412f9ec45b"
}
ok: true 
}
```

失败:

```js
{
code: 201
message: "失败"
data: null
ok: false 
}
```



## 3. **首页三级分类**

### **3.1请求地址**

/api/product/getBaseCategoryList

### **3.2请求方式**

GET

### **3.3参数类型**

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### **3.4返回示例**

成功：

```js
{
 code: 200
message: "成功"
data: [
{
categoryChild: [
{
  categoryChild:[
{
      categoryName: "电子书",
      categoryId: 1
},…],
  categoryName: "电子书刊",
  categoryId: 1
},…],
categoryName: "图书、音像、电子书刊",
categoryId: 1
},…],
ok: true
}
```



## 4. **搜索商品**

### **4.1请求地址**

/api/list

### **4.2请求方式**

POST

### **4.3参数类型**

| 参数名称     | 类型   | 是否必选 | 描述                                                         |
| ------------ | ------ | -------- | ------------------------------------------------------------ |
| category1Id  | string | N        | 一级分类ID                                                   |
| category2Id  | string | N        | 二级分类ID                                                   |
| category3Id  | string | N        | 三级分类ID                                                   |
| categoryName | string | N        | 分类名称                                                     |
| keyword      | string | N        | 搜索关键字                                                   |
| props        | Array  | N        | 商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"] |
| trademark    | string | N        | 品牌: "ID:品牌名称"示例: "1:苹果"                            |
| order        | string | N        | 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc" |
| pageNo       | number | N        | 页码                                                         |
| pageSize     | number | N        | 每页数量                                                     |

 

例子

```js
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
```



### **4.4返回示例**

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": {
        "trademarkList": [
            {
                "tmId": 1,
                "tmName": "苹果"
            },
            …
        ],
        "attrsList": [
            {
                "attrId": 1,
                "attrValueList": [
                    "4500-11999",
                    "2800-4499"
                ],
                "attrName": "价格"
            },
            …
        ],
        "goodsList": [
            {
                "id": 2,
                "defaultImg": "http://192.168.200.128:8080/xxx.jpg",
                "title": "Apple iPhone 11 (A2223)",
                "price": 5499,
                "createTime": null,
                "tmId": null,
                "tmName": null,
                "category1Id": null,
                "category1Name": null,
                "category2Id": null,
                "category2Name": null,
                "category3Id": null,
                "category3Name": null,
                "hotScore": 0,
                "attrs": null
            },
            …
        ],
        "total": 8,
        "pageSize": 2,
        "pageNo": 1,
        "totalPages": 4
    },
    "ok": true
}
```





## 5. **获取商品详情**

### **5.1请求地址**

/api/item/{ skuId }

### **5.2请求方式**

GET

### **5.3参数类型**

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| skuId    | string | Y        | 商品ID |

### **5.4返回示例**

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": {
        "valuesSkuJson": "{\"3|5|7\":6,\"3|4|7\":2,\"2|4|7\":3,\"1|5|7\":5,\"1|4|7\":1,\"2|5|7\":4}",
        "price": 5499,
        "categoryView": {
            "id": 61,
            "category1Id": 2,
            "category1Name": "手机",
            "category2Id": 13,
            "category2Name": "手机通讯",
            "category3Id": 61,
            "category3Name": "手机"
        },
        "spuSaleAttrList": [
            {
                "id": 1,
                "spuId": 1,
                "baseSaleAttrId": 1,
                "saleAttrName": "选择颜色",
                "spuSaleAttrValueList": [
                    {
                        "id": 1,
                        "spuId": 1,
                        "baseSaleAttrId": 1,
                        "saleAttrValueName": "黑色",
                        "saleAttrName": "选择颜色",
                        "isChecked": "0"
                    },
                    …
                ]
            },
            {
                "id": 2,
                "spuId": 1,
                "baseSaleAttrId": 2,
                "saleAttrName": "选择版本",
                "spuSaleAttrValueList": [
                    {
                        "id": 4,
                        "spuId": 1,
                        "baseSaleAttrId": 2,
                        "saleAttrValueName": "64GB",
                        "saleAttrName": "选择版本",
                        "isChecked": "1"
                    },
                    …
                ]
            },
            {
                "id": 3,
                "spuId": 1,
                "baseSaleAttrId": 3,
                "saleAttrName": "选择套装",
                "spuSaleAttrValueList": [
                    {
                        "id": 7,
                        "spuId": 1,
                        "baseSaleAttrId": 3,
                        "saleAttrValueName": " 官方标配",
                        "saleAttrName": "选择套装",
                        "isChecked": "1"
                    },
…
                ]
            }
        ],
        "skuInfo": {
            "id": 2,
            "spuId": 1,
            "price": 5499,
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色 移动联通电信双卡双待",
            "skuDesc": "主体\n入网型号\nA2223\n品牌\nApple\n产品名称\niPhone 11\n上市年份\n2019年\n上市月份\n9月\n基本信息\n机身颜色\n红色\n机身长度（mm）\n150.9\n机身重量（g）\n194\n机身材质工艺\n以官网信息为准\n机身宽度（mm）\n75.7\n机身材质分类\n玻璃后盖\n机身厚度（mm）\n8.3\n运营商标志或内容\n无",
            "weight": "0.47",
            "tmId": 1,
            "category3Id": 61,
            "skuDefaultImg": "http://192.168.200.128:8080/xxxx.jpg",
            "isSale": 1,
            "skuImageList": [
                {
                    "id": 6,
                    "skuId": 2,
                    "imgName": "63e862164165f483.jpg",
                    "imgUrl": "http://192.168.200.128:8080/group1/M00/00/00/wKjIgF42RLOAd5YSAANTQTjaVjQ819.jpg",
                    "spuImgId": 2,
                    "isDefault": "0"
                },
                …
            ],
            "skuAttrValueList": [
                {
                    "id": 6,
                    "attrId": 1,
                    "valueId": 6,
                    "skuId": 2
                },
…
            ],
            "skuSaleAttrValueList": null
        }
    },
    "ok": true
}
```



## 6. **获取购物车列表**

### **6.1请求地址**

/api/cart/cartList

### **6.2请求方式**

GET

### **6.3参数类型**

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### **6.4返回示例**

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": [
        {
            "id": 61,
            "userId": "2",
            "skuId": 4,
            "cartPrice": 5999,
            "skuNum": 4,
            "imgUrl": "http://192.168.200.128:8080xxx.jpg",
            "skuName": "Apple iPhone 11 (A2223) ",
            "isChecked": 1,
            "skuPrice": 5999
        },
        {
            "id": 62,
            "userId": "2",
            "skuId": 2,
            "cartPrice": 5499,
            "skuNum": 1,
            "imgUrl": "http://192.168.200.128:8080/yyyy.jpg",
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
            "isChecked": 0,
            "skuPrice": 5499
        }
    ],
    "ok": true
}
```



## 7. **添加到购物车(对已有物品进行数量改动)**

### **7.1请求地址**

/api/cart/addToCart/{ skuId }/{ skuNum }

### **7.2请求方式**

POST

### **7.3参数类型**

| 参数名称 | 类型   | 是否必选 | 描述                             |
| -------- | ------ | -------- | -------------------------------- |
| skuID    | string | Y        | 商品ID                           |
| skuNum   | string | Y        | 商品数量正数代表增加负数代表减少 |

### **7.4返回示例**

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 8. **切换商品选中状态**

### **8.1请求地址**

/api/cart/checkCart/{skuID}/{isChecked}

### **8.2请求方式**

GET

### **8.3参数类型**

| 参数名称  | 类型   | 是否必选 | 描述                               |
| --------- | ------ | -------- | ---------------------------------- |
| skuID     | string | Y        | 商品ID                             |
| isChecked | string | Y        | 商品选中状态0代表取消选中1代表选中 |

### **8.4返回示例**

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 9. **删除购物车商品**

### **9.1请求地址**

/api/cart/deleteCart/{skuId}

### **9.2请求方式**

DELETE

### **9.3参数类型**

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| skuId    | string | Y        | 商品id |

### **9.4返回示例**

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 10. **获取订单交易页信息**

### 10.1请求地址

/api/order/auth/trade

### 10.2请求方式

GET

### 10.3参数类型

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### 10.4返回示例

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": {
       "totalAmount": 23996,
       "userAddressList": [
            {
                "id": 2,
                "userAddress": "北京市昌平区2",
                "userId": 2,
                "consignee": "admin",
                "phoneNum": "15011111111",
                "isDefault": "1"
            }
        ],
        "tradeNo": "1b23c1efc8144bfc83e51807f4e71d3a",
        "totalNum": 1,
        "detailArrayList": [
            {
                "id": null,
                "orderId": null,
                "skuId": 4,
                "skuName": "Apple iPhone 11 移动联通电信4G手机 双卡双待",
                "imgUrl": "http://192.168.200.128:8080/RLOAElEmAATrIT-1J9Q110.jpg",
                "orderPrice": 5999,
                "skuNum": 4,
                "hasStock": null
            }
        ]
    },
    "ok": true
}
```



## 11. **获取我的订单列表**

### 11.1请求地址

/api/order/auth/{page}/{limit}

### 11.2请求方式

GET

### 11.3参数类型

| 参数名称 | 类型   | 是否必选 | 描述         |
| -------- | ------ | -------- | ------------ |
| page     | string | Y        | 页码         |
| limit    | string | Y        | 每页显示数量 |

### 11.4返回示例

成功：

```js
{
    "code": 200,
    "message": "成功",
    "data": {
        "records": [
            {
                "id": 70,
                "consignee": "admin",
                "consigneeTel": "15011111111",
                "totalAmount": 29495,
                "orderStatus": "UNPAID",
                "userId": 2,
                "paymentWay": "ONLINE",
                "deliveryAddress": "北京市昌平区2",
                "orderComment": "",
                "outTradeNo": "ATGUIGU1584247289311481",
                "tradeBody": "Apple iPhone 11 (A2223) 128GB手机 双卡双待 A",
                "createTime": "2020-03-15 12:41:29",
                "expireTime": "2020-03-16 12:41:29",
                "processStatus": "UNPAID",
                "trackingNo": null,
                "parentOrderId": null,
                "imgUrl": null,
                "orderDetailList": [
                    {
                        "id": 81,
                        "orderId": 70,
                        "skuId": 2,
                        "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
                        "imgUrl": "http://192.168.200.128:8080/xxx.jpg",
                        "orderPrice": 5499,
                        "skuNum": 1,
                        "hasStock": null
                    },
                    …
                ],
                "orderStatusName": "未支付",
                "wareId": null
            },
            …
        ],
        "total": 41,
        "size": 2,
        "current": 1,
        "pages": 21
    },
    "ok": true
}
```



## 12. 提交订单

### 12.1请求地址

/api/order/auth/submitOrder?tradeNo={tradeNo}

### 12.2请求方式

POST

### 12.3参数类型

| 参数名称        | 类型   | 是否必选 | 描述                     |
| --------------- | ------ | -------- | ------------------------ |
| traderNo        | string | Y        | 交易编号(拼接在路径中)   |
| consignee       | string | Y        | 收件人姓名               |
| consigneeTel    | string | Y        | 收件人电话               |
| deliveryAddress | string | Y        | 收件地址                 |
| paymentWay      | string | Y        | 支付方式(ONLINE代表在线) |
| orderComment    | string | Y        | 订单备注                 |
| orderDetailList | Array  | Y        | 存储多个商品对象的数组   |

例子:

```js
{

  "consignee": "admin",

  "consigneeTel": "15011111111",

  "deliveryAddress": "北京市昌平区2",

  "paymentWay": "ONLINE",

  "orderComment": "xxx",

  "orderDetailList": [

    {

      "id": null,

      "orderId": null,

      "skuId": 6,

      "skuName": " Apple iPhone 11 (A2223) 128GB 红色 移动联通电信22",

      "imgUrl": "http://182.92.128.115:8080//rBFUDF6V0JmAG9XGAAGL4LZv5fQ163.png",

      "orderPrice": 4343,

      "skuNum": 2,

      "hasStock": null

    },

    {

      "id": null,

      "orderId": null,

      "skuId": 4,

      "skuName": "Apple iPhone 11 (A2223) 128GB 红色",

      "imgUrl": "http://182.92.128.115:80800/rBFUDF6VzaeANzIOAAL1X4gVWEE035.png",

      "orderPrice": 5999,

      "skuNum": 1,

      "hasStock": null

    }

  ]

}

```



### 12.4返回示例

成功：

{  "code": 200,  "message": "成功",  "data": 71,  // orderId 订单号  "ok": true}

## 13. 获取订单支付信息

### 13.1请求地址

/api/payment/weixin/createNative/{orderId}

### 13.2请求方式

GET

### 13.3参数类型

| 参数名称 | 类型   | 是否必选 | 描述                         |
| -------- | ------ | -------- | ---------------------------- |
| orderId  | string | Y        | 支付订单ID(通过提交订单得到) |

### 13.4返回示例

成功：

{  "code": 200,  "message": "成功",  "data": {    "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",    "orderId": 71,    "totalFee": 23996,    "resultCode": "SUCCESS"  },  "ok": true}

## 14. 查询支付订单状态

### 14.1请求地址

/api/payment/weixin/queryPayStatus/{orderId}

### 14.2请求方式

GET

### 14.3参数类型

| 参数名称 | 类型   | 是否必选 | 描述       |
| -------- | ------ | -------- | ---------- |
| orderId  | string | Y        | 支付订单ID |

### 14.4返回示例

成功：

{  "code": 205,  "message": "支付中",  "data": null,  "ok": false}

## 15. 获取注册验证码

### 15.1请求地址

[/api/user/passport/sendCode/{phone}](#!/passport45controller/sendCodeUsingGET)

### 15.2请求方式

GET

### 15.3参数类型

| 参数名称 | 类型   | 是否必选 | 描述       |
| -------- | ------ | -------- | ---------- |
| phone    | number | Y        | 用户手机号 |

### 15.4返回示例

成功：

返回验证码图片

## 16. 注册用户

### 16.1请求地址

/api/user/passport/register

### 16.2请求方式

POST

### 16.3参数类型（对象）

| 参数名称 | 类型   | 是否必选 | 描述       |
| -------- | ------ | -------- | ---------- |
| phone    | string | Y        | 注册手机号 |
| password | string | Y        | 密码       |
| code     | string | Y        | 验证码     |

### 16.4返回示例

成功：

{  "code": 200,  "message": "成功",  "data": null,  "ok": true}

## 17. 退出登陆

### 16.1请求地址

/api/user/passport/logout

### 16.2请求方式

GET

### 16.3参数类型

无

### 16.4返回示例

成功：

{  "code": 200,  "message": "成功",  "data": null,  "ok": true}

 

修改的：

添加了token校验获取用户登录信息，用户登录只保存用户的token

token校验

http://182.92.128.115/api/user/passport/auth/getUserInfo

 

 

 

 

### [/api/user/passport/sendCode/{phone}](#!/passport45controller/sendCodeUsingGET)

 

获取验证码

get

 

 

### [/api/user/userAddress/auth/findUserAddressList](#!/user45address45controller/findUserAddressListByUserIdUsingGET)

获取用户地址信息

get

 

 

 
