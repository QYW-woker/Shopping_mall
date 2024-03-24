// home的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
// 数据
const state = {
  // 数据的初始化值应该以服务器返回的结果而定
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor数据
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },

  // 轮播图数据修改
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },

  // floor数据修改
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  // 调用发送请求函数。通过API内的接口函数调用，向服务器发送请求，读取服务器信息
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data)
    }
  },

  // 获取首页轮播图数据
  async getBannerList({ commit }) {
    let resule = await reqGetBannerList()
    console.log('轮播图', resule);
    if (resule.code === 200) {
      commit('GETBANNERLIST', resule.data)
    }
  },

  // 获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code === 200) {
      // 提交mutation
      commit('GETFLOORLIST', result.data)
    }
  }

}

// 计算属性
const getters = {}

// 对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}
