<!-- 轮播图 -->
<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data () {
    return {
      currentIndex: 1 //记录当前点击的轮播图小图片索引号
    }
  },
  computed: {
    imgObj () {
      return this.skuImageList[0] || {}
    }
  },
  watch: {
    // 监听数据可以保证数据一定ok，但是不能保证v-for遍历是否完成
    skuImageList () {
      this.$nextTick(() => {
        // 服务器回来了，轮播图结构有了
        new Swiper(this.$refs.cur, {
          // 前进后退功能
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // slidesPerView设置slider容器能够同时显示的slides数量(carousel模式)。显示三个
          slidesPerView: 2,
          // 每一次切换的个数
          slidesPerGroup: 1
        })
      })
    }
  },
  methods: {
    // 修改当前索引值
    changeCurrentIndex (index) {
      // 修改响应式数据
      this.currentIndex = index
      //通知zoom组件【兄弟】修改索引值
      this.$bus.$emit('changeIndex', index)
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>