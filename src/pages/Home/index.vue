<template>
  <div>
    <!-- 三级联动全局组件（不需要引入，直接使用） -->
    <typeNav />
    <!-- 右侧的轮播图 -->
    <listContainer />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 -->
    <Floor />
    <Floor />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
// 引入组件
import listContainer from '@/pages/Home/listContainer'
import Recommend from '@/pages/Home/recommend'
import Rank from '@/pages/Home/rank'
import Like from '@/pages/Home/like'
import Floor from '@/pages/Home/floor'
import Brand from '@/pages/Home/brand'
export default {
  name: 'myHome',
  components: { listContainer, Recommend, Rank, Like, Floor, Brand }
}
</script>

<style>
</style>