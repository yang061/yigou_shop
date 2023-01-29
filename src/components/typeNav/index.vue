<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 通过事件委托，把移除的方法交给父级，这样子元素都会触发 -->
      <div @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>

        <div class="sort">
          <div class="all-sort-list2">
            <!-- 一级分类(cate1) -->
            <div
              class="item"
              v-for="(cate1, index) in categoryList"
              :key="cate1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a href="">{{ cate1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <!-- 二级分类 -->
                <div
                  class="subitem"
                  v-for="cate2 in cate1.categoryChild"
                  :key="cate2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a href="">{{ cate2.categoryName }}</a>
                    </dt>
                    <!-- 三级分类 -->
                    <dd>
                      <em
                        v-for="cate3 in cate2.categoryChild"
                        :key="cate3.categoryId"
                      >
                        <a href="">{{ cate3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">易购超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'typeNav',
  data () {
    return {
      //存储用户鼠标移到哪一个当前一级分类的索引值
      currentIndex: -1 //-1默认不显示
    }
  },
  //组件挂载完毕，就可以向服务器请求数据(因为要把数据渲染到页面，使用不是创建阶段)
  mounted () {
    //通知Vuex发送请求，获取数据存储在仓库中
    this.$store.dispatch('categoryList')
  },
  computed: {
    //对象形式,右侧需要的是一个函数，当使用到这个计算属性时，右侧函数会立即执行一次
    //注入一个参数state，它是store大仓库里的state(包含所有小仓库的state)
    ...mapState({
      categoryList: (state) => state.home.categoryList
    })
  },
  methods: {
    //鼠标进入回调===》修改响应式数据的currentIndex属性
    changeIndex (index) {
      // index:鼠标移入某一个一级分类的索引值
      this.currentIndex = index
    },
    //鼠标移出的回调
    leaveIndex () {
      this.currentIndex = -1
    }
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>