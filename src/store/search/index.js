// search的小仓库
import { reqGetSearchInfo } from '@/api/index'

const state = {
  searchList: {},
}

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}

const actions = {
  // 获取search数据
  async getSearchList({ commit }, searchParams = {}) {
    // 当前这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
    // params形参，是当前用户派发actions的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(searchParams)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}

// 计算属性，在项目中是为了简化数据而生
// 可以把将来在组件当中需要使用(映射)的数据简化一下。组件获取数据的时候就方便了。就可以不用mapState
const getters = {
  // 当前形参是：当前仓库中的state数据
  // 为防止未请求成功返回的数据导致报错undefined，所以给默认空数组
  goodsList(state) {
    return state.searchList.goodsList || []
  },

  trademarkList(state) {
    return state.searchList.trademarkList || []
  },

  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

// 对外暴露
export default {
  state,
  actions,
  mutations,
  getters
}