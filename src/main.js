import Vue from 'vue'
import App from '@/App.vue'
// 三级联动组件--全局组件(放在component里面)
import typeNav from '@/components/typeNav'
// 第一个参数：全局组件的名字(typeNav.name) 第二个参数：哪一个组件
// typeNav.name可以获取组件的名字（不要加-）
Vue.component(typeNav.name, typeNav)

// 引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由,kv一致省略v，注意router是小写
  // 为什么要注册路由信息=> 让组件身上拥有$router和$route属性
  router,
  //注册仓库：组件实例的身上会多了$store属性
  store,
}).$mount('#app')
