import { reqGetGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
import { getUUID } from '@/utils/uuid'
const state = {
  goodInfo: {},
  code: '',
  // 游客的临时身份
  uuid_token: getUUID(),
}

const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },

  GETCODE(state, code) {
    state.code = code
  }
}

const actions = {
  // 获取产品信息的actions
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGetGoodsInfo(skuId)
    if (result.code == 200) {
      // 提交mutations
      commit('GETGOODSINFO', result.data)
    }
  },

  // 将产品添加到购物车。结果是promise对象
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的解构
    // 发请求后将参数带给服务器，服务器添加成功后，并没有返回其他数据。只是返回了code=200
    // 因为服务器没有返回其他数据，因此不需要三连环存储到仓库中
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 服务器加入购物车成功
    if (result.code == 200) {
      console.log(result, '不是返回空吗');
      // 将成功发送请求的code存储到仓库，可以用于判断
      commit('GETCODE', result.code)
      return "ok"
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('faile'))
    }
  }
}

const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },

  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },

  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}