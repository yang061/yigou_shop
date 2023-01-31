<template>
  <div>
    <!-- 商品分类三级联动 -->
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：带有【×】的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名字的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <!-- split(":")[1] 通过：切割为数组，选第二个 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 商品售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              <!-- 分割为数组，展示属性值 -->
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构-->
              <ul class="sui-nav">
                <!-- 当前searchParams.order里包含1，就显示综合高亮 -->
                <li :class="{ active: isOne }" @click="orderChange('1')">
                  <a href="#"
                    >综合
                    <i
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="orderChange('2')">
                  <a href="#"
                    >价格
                    <i
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> &nbsp;{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <myPagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/index.vue'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'mySearch',
  data () {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        //排序，默认值应该是综合、降序
        order: "1:desc",
        // 分页器用的
        pageNo: 1, //代表当前是第几页
        pageSize: 5, //每一页有几条数据
        // 平台售卖属性的参数
        props: [],
        // 品牌
        trademark: ""

      }
    }
  },
  components: {
    SearchSelector
  },
  computed: {
    // mapGetters里面的写法：用的数组获取数据，因为getters计算是没有划分模块的【home、search】
    ...mapGetters(['goodsList']),
    // 是否包含1
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    // 是否包含2
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1
    },
    // 是否为向上
    isAsc () {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    // 是否为向下
    isDesc () {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    // 获取search模块产品一共展示多少个
    ...mapState({
      total: state => state.search.SearchList.total

    })

  },
  beforeMount () {
    // 整理参数
    // Object.assign 合并对象,可以把后面两个参数合并到第一个参数对象里面
    Object.assign(this.searchParams, this.$route.query, this.$route.params)

  },
  // mounted只执行一次，但我们需要每次点击三级列表菜单都要请求数据，所以封装函数
  mounted () {
    // 在发送请求之前【beforeMount】把参数带给服务器
    this.getData()
  },
  // 解决只能搜索一次的问题
  methods: {
    // 根据参数不同返回不同的数据
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除分类名字
    removeCategoryName () {
      // 把要给服务器的数据清空了，带给服务器的参数都是可有可无的：如果属性值是空的字符串还是会把相应的字段带给服务器
      // 但是如果属性值是undefined ，那就不会带给服务器,性能更好
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 重新发送请求
      this.getData()
      // 地址栏也需要修改(删除的是query参数)，通过路由跳转（自己跳自己）
      if (this.$route.params) {
        // 有params参数要带过去
        this.$router.push({ name: 'search', params: this.$route.params })
      } else {
        this.$router.push({ name: 'search' })
      }


    },
    // 删除关键字
    removeKeyword () {
      // 清空关键字
      this.searchParams.keyword = undefined
      // 当面包写中的关键字清除后，需要让兄弟组件Header组件的关键字清除(配置全局事件总线)
      // 请求数据
      this.getData()
      // 通知兄弟header组件清除关键字
      this.$bus.$emit('clearKeyword')
      // 清除导航栏中的params参数,携带当前路由的query参数
      if (this.$route.query) {
        // 有query参数就携带上
        this.$router.push({ name: 'search', query: this.$route.query })
      } else {
        this.$router.push({ name: 'search' })
      }

    },
    // 品牌信息自定义事件回调
    trademarkInfo (trademark) {
      // 1.整理品牌字段参数 "ID:品牌信息"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 2.再次发请求
      this.getData()
    },
    // 删除品牌信息
    removeTradeMark () {
      // 清空品牌信息
      this.searchParams.trademark = undefined
      // 再次发请求
      this.getData()
    },
    // 属性信息自定义事件
    attrInfo (attr, attrValue) {
      // 把收到的两个参数存取到searchParams
      // props:['属性ID：属性值：属性名']
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重，if语句中如果只有一行代码可以省略大花括号
      if (this.searchParams.props.indexOf(props) == -1) {
        // 当前数组中没有，就存到数组中
        this.searchParams.props.push(props)
      }
      // 发送请求
      this.getData()
    },
    // 删除售卖属性的点击事件，通过索引值区分
    removeAttr (index) {
      // 再次整理参数
      // splice:删除数组元素 split：分割数组
      this.searchParams.props.splice(index, 1)
      // 发送请求
      this.getData()
    },
    // 价格、综合改变点击事件
    orderChange (flag) {
      // flag来区分用户点击的是综合(1)还是价格(2),用户点击时传递过来的
      // 首先存储默认flag值 和sort值
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      // 存储新的order
      let newOrder = ""
      // 如果点击的是综合,就改变排序的箭头
      if (flag == originFlag) {
        // 如果当前分类的默认的(desc)就切换排序类型
        newOrder = `${flag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的价格,默认为降序(desc)
        newOrder = `${flag}:${'desc'}`
      }
      // 整理数据
      this.searchParams.order = newOrder
      // 发送请求
      this.getData()
    },
    // 接收子【Pagination】给父传递的自定义事件回调,以便知道当前点击的是第几页
    getPageNo (pageNo) {
      // 修改当前pageNo的数据
      this.searchParams.pageNo = pageNo
      // 重新发送请求
      this.getData()
    }
  },
  watch: {
    // $route是和data里的数据(searchParams)平级的
    $route () {
      // 监视路由，路由变化时继续发请求
      // 重新整理参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      // 发送ajax请求
      this.getData()
      // 每一次请求完毕，应该把一二三级分类以及关键字清空，让它好接收下一次的id【避免数据合并】,keyword会直接覆盖，不需要置空，就算当前分类没有这个keyword，返回空即可
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined

    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  position: relative;
                  background: #e1251b;
                  color: #fff;
                }
                .iconfont {
                  position: absolute;
                  top: 13px;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>