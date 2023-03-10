// 配置信息
export default
    [
        // 重定向，在项目跑起来的时候，访问/ 立马让它重定向到首页
        {
            path: '*',
            redirect: '/home'
        },
        {
            // 主页
            path: '/home',
            component: () => import('@/views/Home'), //不加引号
            meta: {
                show: true //控制Footer组件是否显示
            }
        },
        {
            // 登录页
            path: '/login',
            component: () => import('@/views/Login'),
            meta: {
                show: false //不显示Footer
            }
        },
        {
            // 注册页
            path: '/register',
            component: () => import('@/views/Register'),
            meta: {
                show: false
            }
        },
        {
            // 搜索页,占位
            path: '/search/:keyword?',
            component: () => import('@/views/Search'),
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
        },
        {
            // 详情页,goodId占位存储点击的商品id，要记得加冒号
            path: '/detail/:skuId',
            component: () => import('@/views/Detail'),
            meta: { Show: true }, //显示头部组件
        },
        {
            // 添加购物车成功组件,路由路径一定小写
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: () => import('@/views/AddCartSuccess')
        },
        {
            // 购物车路由
            path: '/shopcart',
            name: 'shopcart',
            component: () => import('@/views/ShopCart')
        },
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
        {
            // 交易页面
            path: '/pay',
            name: 'pay',
            component: () => import("@/views/Pay"),
            meta: {
                show: true //控制Footer组件是否显示
            },
            beforeEnter: (to, from, next) => {
                // 如果是从交易来放行，否则留在当前
                if (from.path == "/trade") {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            // 支付成功页面
            path: '/paysuccess',
            name: 'paysuccess',
            component: () => import("@/views/paySuccess"),
            meta: {
                show: true //控制Footer组件是否显示
            }
        },
        {
            // 个体中心页面
            path: '/center',
            name: 'center',
            component: () => import("@/views/Center"),
            meta: {
                show: true //控制Footer组件是否显示
            },
            children: [
                //二级路由
                {
                    path: '/center',
                    redirect: '/center/myorder'
                },
                {
                    //我的订单
                    path: 'myorder',
                    component: () => import('@/views/Center/myOrder')
                },
                {
                    //我的订单
                    path: 'grouporder',
                    component: () => import('@/views/Center/groupOrder')
                }
            ]
        }
    ]
