<template>
  <div>
    <!-- 头部组件 -->
    <myHeader />

    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 底部组件 ,在Home、Search显示；Login、Register隐藏-->
    <myFooter v-show="$route.meta.show" />
  </div>
</template>

<script>
import myHeader from '@/components/Header'
import myFooter from '@/components/Footer'
export default {
  name: 'App',
  components: { myHeader, myFooter },
  mounted () {
    // 派发一个action，去获取商品分类三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
