// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
// 先把VueRouter原型对象的push，先保存一份
let orginPush = VueRouter.prototype.push
// 先把VueRouter原型对象的replace，先保存一份
let originReplace = VueRouter.prototype.replace

// 重写push和replace方法
// 第一个参数：告诉原来的push方法，你往哪跳转（传哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call和apply区别：
// 相同点：都可以调用函数一次，都可以篡改函数的上下文（this）
// 不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    // 如果resolve和reject参数都传了，调用原来的push方法(注意：要改变this执向(改为vueRouter)，不改为window)
    if (resolve && reject) {
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

// 定义路由组件
export default new VueRouter({
    // 配置路由
    routes: [
        // 重定向，在项目跑起来的时候，访问/ 立马让它重定向到首页
        {
            path: '*',
            redirect: '/home'
        },
        {
            // 主页
            path: '/home',
            component: Home, //不加引号
            meta: {
                show: true //控制Footer组件是否显示
            }
        },
        {
            // 登录页
            path: '/login',
            component: Login,
            meta: {
                show: false //不显示Footer
            }
        },
        {
            // 注册页
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        {
            // 搜索页,占位
            path: '/search/:keyword?',
            component: Search,
            meta: {
                show: false
            },
            name: 'search',
            //路由组件能不能传递props数据?
            // 布尔值写法:params
            // props: true
            // 对象写法,额外给路由组件传递一些props
            // props: { a: 1, b: 2 }
            // 函数写法：可以把params参数、query参数，通过props传递给路由组件
            // 解构时要在最外加()，当成一个整体
            props: ($route) => ({
                keyword: $route.params.keyword, k: $route.query.k
            })
        }
    ]
})