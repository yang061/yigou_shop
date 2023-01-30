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
    <!--props通信：【 :list="floor" 】 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
// 引入组件
import listContainer from '@/views/Home/listContainer'
import Recommend from '@/views/Home/recommend'
import Rank from '@/views/Home/rank'
import Like from '@/views/Home/like'
import Floor from '@/views/Home/floor'
import Brand from '@/views/Home/brand'
import { mapState } from 'vuex'
export default {
  name: 'myHome',
  components: { listContainer, Recommend, Rank, Like, Floor, Brand },
  computed: {
    ...mapState({
      //获取Vuex中state的floorList数据,数据在home组件里
      floorList: state => state.home.floorList
    })

  },
  mounted () {
    //通知Vuex发送ajax请求，存储数据
    this.$store.dispatch('getFloorList')
  },


}
</script>

<style>
</style>