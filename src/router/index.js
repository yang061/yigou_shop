// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 引入路由信息模块
import routes from '@/router/routers'
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
    routes,
    // 滚动行为，参数to, from, savedPosition
    scrollBehavior () {
        // return 期望滚动到哪个的位置
        // y：0代表最上面【router3】  top:0 【router4】
        return { y: 0 }
    }
})