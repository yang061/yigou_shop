<template>
  <div>
    <!-- 头部组件 -->
    <myHeader />

    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 底部组件 -->
    <myFooter />
  </div>
</template>

<script>
import myHeader from '@/components/Header'
import myFooter from '@/components/Footer'
export default {
  name: 'App',
  components: { myHeader, myFooter }
}
</script>

<style>
</style>
