<template>
  <div class="swiper-container" ref="floorSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper';
export default {
  name: 'CaRousel',
  props: ['list'],
  watch: {
    list: {
      // 因为list数据是父亲给的，从来没有变过，所以监听不到
      //解决：立即监听【不管数据有没有变化，一开始都会监听】
      immediate: true,
      handler () {
        //只能监听到数据已经有了，但是v-for遍历结构我们还是没法确定，所以还是要用nextTick
        this.$nextTick(() => {
          //当你执行了这个回调的时候：保证服务器数据回来了，v-for执行完毕了【轮播图的数据一定有了】
          new Swiper(this.$refs.floorSwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,  //可以点击分页器切换轮播图
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

          })
        })

      }
    }
  }
}
</script>

<style>
</style>