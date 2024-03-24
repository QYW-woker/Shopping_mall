<template>
  <div>
    <HeaderIndex></HeaderIndex>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在登录与注册页面隐藏底部栏 -->
    <FooterIndex v-show="$route.meta.show"></FooterIndex>
  </div>
</template> 

<script>
// 引入组件
import HeaderIndex from "./components/Header";
import FooterIndex from "./components/Footer";
export default {
  names: "",
  // 声明组件
  components: {
    HeaderIndex,
    FooterIndex,
  },

  // 生命周期函数，且只加载一次。App.vue根组件只执行一次
  mounted() {
    // 通知vuex发请求获取数据，存储到仓库中
    // 派发一个action，获取商品分类的三级列表数据
    // 考虑到性能优化，放在这里只需要发一次请求。每次要用数据在仓库中拿即可。若放到其他组件，则每一次使用组件都会发一次请求
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped></style>