<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>乐购欢迎您！</p>
          <!-- 没有用户信息，显示这里 -->
          <p v-if="!userInfo.nickName">
            <span>请</span>
            <!-- TIP 声明式导航，必须要有to属性（去哪） -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a> {{ userInfo.nickName }}</a>
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">企业采购</a>
          <a href="###">关注乐购</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 跳转到主页 -->
        <router-link class="logo" title="乐购商城" to="/home">
          <h1>乐购商城</h1>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'my-header',
  data () {
    return {
      keyWord: '',
    }
  },
  computed: {
    // 用户名信息
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    // 搜索按钮的回调函数，要向search路由进行跳转
    goSearch () {
      // 路由传递参数
      // 1.字符串形式,需要在search路由占位
      // this.$router.push("/search/" + this.keyWord + "?k=" + this.keyWord.toUpperCase())
      // 2.模板字符串
      // this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`)
      // 3.对象(优选)
      // this.$router.push({ name: 'search', params: { keyword: this.keyWord }, query: { k: this.keyWord.toUpperCase() } })


      // 面试题1.路由传递参数（对象写法）path是否可以结合params参数一起使用?
      // this.$router.push({ path: '/search', params: { keyword: this.keyWord }, query: { k: this.keyWord.toUpperCase() } })

      // 面试题2：如何指定params参数可传可不传? 
      // 在配置路由时，在占位的后面加上一个问号【代表params参数可传可不传】
      // 如果路由要求传递params参数，但你不传，就会发现url有问题(http://localhost:8080/#/?k=DSADA),不显示search
      // this.$router.push({ name: 'search', query: { k: this.keyWord.toUpperCase() } })

      // 面试题3：params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // 使用undefined可以解决
      // this.$router.push({ name: 'search', params: { keyword: '' || undefined }, query: { k: this.keyWord.toUpperCase() } })

      // 面试题4： 路由组件能不能传递props数据?
      // 可以的：有三种写法
      if (this.$route.query) {
        // 如果有query参数，一起存到location中传给search
        let location = {
          name: 'search',
          params: { keyword: this.keyWord },
        }
        location.query = this.$route.query
        this.$router.push(location)
      }


    },
    //退出登录
    loginOut () {
      // 1.发请求，通知服务器退出登录【清除一些数据：token】
      // 2.清除项目中的数据【userInfo,token】
      try {
        this.$store.dispatch('loginOut')
        //回到首页
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted () {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clearKeyword', () => {
      this.keyWord = ''
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        h1 {
          width: 175px;
          margin: 25px 45px;
          font-size: 24px;
          color: #ea4a36;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>