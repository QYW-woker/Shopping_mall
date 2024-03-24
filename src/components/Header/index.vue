<template>
<div>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户未登录的展示 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">注册</router-link>
          </p>
          <!-- 用户登录的展示 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout"> 退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <!-- <router-link>我的订单</router-link>
            <router-link>我的购物车</router-link> -->
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/center">我的订单</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- 编程式导航:因为有业务 -->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</div>
</template>

<script>
export default {
  name: "HeaderIndex",
  data() {
    return {
      keyword: "",
    };
  },

  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clear', () => {
      this.keyword = ""
    })
  },

  computed: {
    // 用户信息
    userName() {
      return this.$store.state.register.userInfo.name
    }
  },

  methods: {
    // 搜索按钮回调函数，向search路由进行跳转
    goSearch() {
      // 路由传参
      // 1. 字符串形式
      // this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase())
      // 2. 模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

      // 3. 对象写法。因为返回的是一个promise对象，当多次点击搜索按钮时，会报错。需要成功和失败的回调函数来接收

      // 判断是否有query参数，有的话当需要params参数时，要将query也要带过去
      if (this.$route.query) {
        let location = {
          name: "search",
          params: {
            keyword: this.keyword || undefined
          },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },

    // 退出登录
    async logout() {
      // 1. 发请求，通知服务器退出登录--清除token
      // 2. 清除项目中的数据(userInfo/token)
      try {
        // 退出成功
        await this.$store.dispatch('userLogout')
        // 回到首页
        this.$router.push('/')
      } catch (error) {
        console.log('退出失败');
      }

    }
  },
};
</script>

<style lang="less" scoped>
.header {
  cursor: pointer;

  &>.top {
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

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
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
