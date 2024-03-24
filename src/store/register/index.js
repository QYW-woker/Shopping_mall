// 获取验证码
import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'


const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}

const mutations = {
  // 验证码
  GETCODE(state, code) {
    state.code = code
  },

  // 登录令牌
  USERLOGIN(state, token) {
    state.token = token
  },
  // 用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },

  // 清除用户数据
  CLEARUSERINFO(state) {
    state.token = ''
    state.userInfo = {}
    // 本地存储token清空
    removeToken()
  }
}

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 提交注册表单信息
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }

  },

  // 登录请求
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo()
    if (result.code == 200) {
      // 登录成功且获取到了token
      commit('GETUSERINFO', result.data)
      return 'ok'

    } else {
      return Promise.reject(new Error('failse'))
    }
  },

  // 退出登录
  async userLogout({ commit }) {
    // 只是向服务器发送退出登录请求，清除了服务器的数据，前端的用户数据还没有清除。
    // 所以需要拿到后台返回的确认清除成功的提示，让前台清除
    let result = await reqLogout()
    if (result.code == 200) {
      commit('CLEARUSERINFO')
      return 'ok'
    } else {
      return Promise.reject(new Error('failse'))
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