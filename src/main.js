import Vue from 'vue'
import App from '@/App.vue'
// 三级联动组件--全局组件(放在component里面)
import typeNav from '@/components/typeNav'
import CaRousel from '@/components/Carousel'
import myPagination from '@/components/Pagination'
// 第一个参数：全局组件的名字(typeNav.name) 第二个参数：哪一个组件
// typeNav.name可以获取组件的名字（不要加-）
//两个参数要一样，第二个是其他组件想用时写的标签名
Vue.component(typeNav.name, typeNav)
Vue.component(CaRousel.name, CaRousel)
Vue.component(myPagination.name, myPagination)

// 统一接口api文件夹里面全部请求函数
import * as API from "@/api"
// 引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
// 引入mockServe.js --- mock数据
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//引入elementui
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
//注册全局组件，方法1
Vue.config.productionTip = false
//注册全局组件方法2(挂载在原型上)
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$alert = MessageBox.alert



new Vue({
  render: h => h(App),
  beforeCreate () {
    // 注册全局事件总线
    Vue.prototype.$bus = this
    // 注册api到Vue的原型里
    Vue.prototype.$API = API
  },
  // 注册路由,kv一致省略v，注意router是小写
  // 为什么要注册路由信息=> 让组件身上拥有$router和$route属性
  router,
  //注册仓库：组件实例的身上会多了$store属性
  store,
}).$mount('#app')
