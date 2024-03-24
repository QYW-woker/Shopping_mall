// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import routes from './routes'
// 引入store
import store from "@/store";

// 先把VueRouter原型对象的push，先保存一份
let orginPush = VueRouter.prototype.push
let orginReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location, resolve, reject)
  } else {
    orginPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, location, resolve, reject)
  } else {
    orginReplace.call(this, location, () => { }, () => { })
  }
}


// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  // 路由滚动行为
  scrollBehavior() {
    // 返回的y=0代表的是滚动条在最顶上
    return { y: 0 }
  }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:跳转的目的路由信息
  // from:从哪个路由来的信息
  // next:放行函数。next():直接放行；next('/login'):放行到指定路由
  // 登录了拿到token，没登录的话没有token
  const token = store.state.register.token
  // 用户信息
  let name = store.state.register.userInfo.name

  if (token) {
    // 已经登录,不允许再去login
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      // 登陆了，但去的不是login。要再验证是否有登录信息
      if (name) {
        next()
      } else {
        // 没有用户信息，要再次派发actions让仓库存储用户信息。再跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // token失效了，清除所有信息，并放行到login
          await store.dispatch('userLogout')
          next('/login')
        }

      }
    }

  } else {
    // 未登录的情况,没有token
    // 不能去：交易相关、购物车、个人中心
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/shopcart') != -1) {
      // 把未登录时，想去而未去成的路径。通过query参数传递。登陆后直接跳转至目的路径
      next('/login?redirect=' + toPath)
    } else {
      next()
    }

  }
})

export default router