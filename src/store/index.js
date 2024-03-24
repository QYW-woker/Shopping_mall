import Vue from "vue";
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)

// 引入小仓库
import home from './home/index'
import search from './search/index'
import detail from "./detail";
import shopcart from "./shopcart/shopcart";
import register from "./register";
import trade from "./trade";

// 对外暴露 store 类的一个实例
export default new Vuex.Store({
  // 实现vuex仓库模块化开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    register,
    trade
  }
})