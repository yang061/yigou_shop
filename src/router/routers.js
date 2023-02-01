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
        }
    ]
