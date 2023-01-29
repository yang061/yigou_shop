<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 通过事件委托，把移除的方法交给父级，这样子元素都会触发 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类(cate1) -->
              <div
                class="item"
                v-for="(cate1, index) in categoryList"
                :key="cate1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 添加自定义属性，来区分a标签和一级、二级、三级分类 -->
                  <a
                    :data-categoryName="cate1.categoryName"
                    :data-category1Id="cate1.categoryId"
                    >{{ cate1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <!-- 二级分类 -->
                  <div
                    class="subitem"
                    v-for="cate2 in cate1.categoryChild"
                    :key="cate2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="cate2.categoryName"
                          :data-category2Id="cate2.categoryId"
                          >{{ cate2.categoryName }}</a
                        >
                      </dt>
                      <!-- 三级分类 -->
                      <dd>
                        <em
                          v-for="cate3 in cate2.categoryChild"
                          :key="cate3.categoryId"
                        >
                          <a
                            :data-categoryName="cate3.categoryName"
                            :data-category3Id="cate3.categoryId"
                            >{{ cate3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
// 把lodash全部的功能都引入，最好按需引入
import throttle from 'loadsh/throttle' //默认暴露，不加{}
export default {
  name: 'typeNav',
  data () {
    return {
      //存储用户鼠标移到哪一个当前一级分类的索引值
      currentIndex: -1, //-1默认不显示
      show: true,   //控制三级联动显示和隐藏
    }
  },
  //组件挂载完毕，就可以向服务器请求数据(因为要把数据渲染到页面，使用不是创建阶段)
  mounted () {
    // 因为在跳转到search路由的时候，typeNav组件也会挂载，所以可以控制显示和隐藏
    if (this.$route.path !== '/home') {
      //如果不是路由组件，那就一开始隐藏三级联动
      this.show = false
    }
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
    //用es5的函数写法，key：value
    //注意throttle回调函数不要用箭头函数，不然可能会出现上下文this指向问题
    changeIndex: throttle(function (index) {
      // index:鼠标移入某一个一级分类的索引值
      // 正常情况(用户慢慢滑动)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况(用户操作很快)：期待全部的一级分类都会触发鼠标进入事件，但经过测试只有部分会被触发
      // 原因：由于用户行为过快，导致浏览器反应不过来。如果此时回调函数中有大量的业务，那就会出现卡断现象
      this.currentIndex = index
    }, 50),

    // Home组件跳转到Search方法
    goSearch () {
      // 最好的解决方法：编程式导航+事件委托
      // 事件委托：是把全部的子节点【h3、dt、dl、em】的事件委托给父亲节点
      // 利用事件委托会出现一些问题：
      // 1.因为需要点击a标签才能跳转，但怎么确定点击的一定是a标签(子节点很多) ？
      // 2.即使你能确定点击的a标签，但如何确定是一级、二级、三级的a标签？
      // 第一个问题：把子节点的a标签加上自定义属性data-categoryName,其余的子节点是没有的
      let element = event.target
      // 这样可以获取当前触发这个事件的节点【h3、a、dl、dt】，需要带有data-categoryname(浏览器自动变小写) 这样的节点【一定是a标签】
      // 节点有一个属性dataset，可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset
      // 如果标签中有categoryname ,一定是a标签
      if (categoryname) {
        // 整理路由传递的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        //区分一级、二级、三级分类a标签 === 在添加一个自定义属性
        if (category1id) {
          //一级分类
          query.categoryId = category1id
        } else if (category2id) {
          //二级
          query.categoryId = category2id
        } else if (category3id) {
          //三级
          query.categoryId = category3id
        }
        // 整理(合并)路由参数
        // console.log(location, query); //两个对象
        location.query = query
        // 路由跳转
        this.$router.push(location)

      }

    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow () {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },
    //鼠标移出的回调
    leaveIndex () {
      this.currentIndex = -1
      // 如果当前路由不是'/home'，那鼠标移出时隐藏
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
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
            line-height: 27.2px;
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
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始的状态(进入)
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束的状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>