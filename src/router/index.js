// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'


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
            component: Home //不加引号
        },
        {
            // 登录页
            path: '/login',
            component: Login
        },
        {
            // 注册页
            path: '/register',
            component: Register
        },
        {
            // 搜索页
            path: '/search',
            component: Search
        }
    ]
})