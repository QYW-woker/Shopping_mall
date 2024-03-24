import { reqGetShopCartList, reqDeleteCartById, reqUpdateChecked } from '@/api/index'

const state = {
  cartList: []
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 更新购物车数量信息
  async getCartList({ commit }) {
    let result = await reqGetShopCartList()
    if (result.code == 200) {
      console.log(result, '获取购物车数据');
      commit('GETCARTLIST', result.data)
    }
  },

  // 删除购物车商品信息
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    // 判断成功还是失败，返回值给组件用于判断要提示删除成功还是删除失败
    // 不需要给仓库返回数据
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // // 修改购物车某个产品选中状态(接口不可用)
  // async updateCartById({ commit }, { skuId, isCkecked }) {
  //   let result = await reqUpdateCheckedByid(skuId, isCkecked)
  //   if (result.code == 200) {
  //     return 'ok'
  //   } else {
  //     return Promise.reject(result)
  //   }
  // },

  //修改某一个商品勾选状态
  async changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject();
    }

  },

  // 删除全部选中的产品
  delteAllChecked({ dispatch, getters }) {
    // context：上下文，有仓库的各种属性
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的promise返回到数组PromiseAll中
      PromiseAll.push(promise)
    });
    // 只要所有的删除promise都是成功的，返回的结果就是成功的。否则是失败的
    return Promise.all(PromiseAll)
  },

  // 全选框修改
  changeCheckedAll({ dispatch, getters }, checked) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 直接将全选框的状态值当做参数传给changeChecked函数让他一个个按照全选框状态值做修改，不需要判断
      let promise = dispatch('changeChecked', { skuId: item.skuId, isChecked: checked })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }

}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
