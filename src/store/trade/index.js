import { reqAddressInfo, reqGetOrderInfo } from '@/api/index'

const state = {
  address: [],
  orderInfo: {}
}

const mutations = {
  // 用户地址获取
  GETADDRESSINFO(state, address) {
    state.address = address
  },

  // 购物商品信息
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

const actions = {
  // 获取用户地址
  async getAddressInfo({ commit }) {
    let result = await reqAddressInfo()
    if (result.code == 200) {
      commit('GETADDRESSINFO', result.data)
    }
  },

  // 获取购物商品清单信息
  async getOrderInfo({ commit }) {
    let result = await reqGetOrderInfo()
    if (result.code == 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}