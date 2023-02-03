<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- 判断是否被勾选 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="changeChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @blur="changeSkuNum('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              (cart.skuNum * cart.cartPrice).toFixed(2)
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="delShopCartFn(cart.skuId)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll && cartInfoList.length > 0"
          @click="changeCheckedState($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  mounted () {
    this.getData()
    // console.log(debounce());
  },
  computed: {
    ...mapGetters(['ShopCartList']),
    // 计算出来的购物车数据
    cartInfoList () {
      // 防止加载中结构还没出来报错
      return this.ShopCartList.cartInfoList || []
    },
    // 所有被选商品的总价
    totalPrice () {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          // 当前商品被勾选了
          sum += item.cartPrice * item.skuNum
        }
      })
      return sum.toFixed(2)
    },
    // 判断是否全选【全部都被勾选全选才会被勾选】
    isCheckedAll () {
      // every，遍历数组，只有数组中全部元素的isChecked属性都为1===》真，否则===》假，返回布尔值
      return this.cartInfoList.every((item) => item.isChecked == 1)
    }

  },
  methods: {
    // 派发action获取购物车信息
    getData () {
      this.$store.dispatch('getShopCartList')
    },
    //修改产品数量回调
    // TIP 节流
    changeSkuNum: throttle(async function (type, disNum, cart) {
      // type:用于区分点击的类型
      // disNum:变化量(1) 变化量(-1) input框的总数
      // cart:点击的是哪个产品【因为有id】
      // 向服务器发请求,修改数量
      switch (type) {
        // 加号
        case 'plus':
          //带给服务器的变化量
          disNum = 1
          break;
        case 'mins':
          // 当前产品的数量大于1才会给服务器【-1===>减1；0===>不变】
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            // 是非法数字【有汉字】
            disNum = 0 //不变
          } else {
            //排除小数，取整,取变化值,排除差值负数的情况
            disNum = parseInt(disNum) - cart.skuNum

          }
          // 三元表达式,可读性差
          // disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum
          break;
      }
      try {
        // 获取数据成功
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 重新请求数据【获取购物车信息】
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000)
    ,
    //删除产品点击事件
    async delShopCartFn (skuId) {
      try {
        // 发请求
        await this.$store.dispatch('delShopCart', skuId)
        // 删除成功，再发请求
        this.getData()
      } catch (error) {
        // 删除失败
        alert('删除失败')
      }
    },
    // 改变选中状态回调
    async changeChecked (cart, event) {
      // 发送请求
      try {
        // 修改数据成功
        // event.target.checked 返回布尔值，但是带给服务器的应该是数字 0|1
        let isChecked = event.target.checked === true ? 1 : 0
        await this.$store.dispatch('changeSkuState', { skuId: cart.skuId, isChecked })
        this.getData()
      } catch (error) {
        // 修改数据失败
        alert(error.message)
      }
    },
    // 删除所有选中的商品==》点击事件
    // 没办法收集到有效数据
    async deleteAllCheckedCart () {
      try {
        await this.$store.dispatch("deleteAllCheckedCart")
        // 获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //切换全选状态
    async changeCheckedState (event) {
      // try大括号里面的代码都会走
      try {
        // event.target.value,布尔值；选中==》true，反之，false
        let isChecked = event.target.checked ? '1' : '0'
        // 派发action，让所有的单选框状态跟随全选状态
        await this.$store.dispatch('changeAllSkuState', isChecked)
        //重新获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }

    }
  }
}

</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>