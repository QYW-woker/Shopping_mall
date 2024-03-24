// 当前模块：对所有的API接口进行统一管理
import request from "./request";
import mockRequest from './mockRequest'


// 三级联动接口 /api/product/getBaseCategoryList get 无参数
// 将三级联动接口请求对外暴露成函数，需要时调用即可
export const reqCategoryList = () => {
  // 发送请求,axios发送请求返回的结果是一个Promise对象
  return request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}

// 使用mockRequest请求 获取轮播图
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索页数据
//  带参数
/**
 * 
 * @returns 参数  post请求
 * {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}

函数需要形参。当前的接口给服务器传递的params参数，至少是一个空对象
 */
export const reqGetSearchInfo = (params) => request({
  url: '/list',
  method: 'post',
  data: params
})

// 产品详情信息的接口
export const reqGetGoodsInfo = (skuId) => request({
  method: 'get',
  url: `/item/${skuId}`
})

// 产品添加到购物车或更新购物车商品数量
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'POST'
})

// 获取购物车商品列表数据
export const reqGetShopCartList = () => request({
  url: '/cart/cartList',
  method: 'GET'
})

// 删除购物车商品
export const reqDeleteCartById = (skuId) => request({
  url: `/cart/deleteCart/${skuId}`,
  method: 'DELETE'
})

// // 请求商品选中状态
// export const reqUpdateCheckedByid = (skuId, isChecked) => request({
//   url: `/cart/checkCart/${skuId}/${isChecked}`,
//   method: 'GET'
// })

//修改某一个商品的勾选的状态
export const reqUpdateChecked = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 获取验证码
export const reqGetCode = (phone) => request({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 注册用户
export const reqUserRegister = (data) => request({
  url: '/user/passport/register',
  method: 'post',
  data
})

// 登录用户
export const reqUserLogin = (data) => request({ url: `/user/passport/login`, method: 'post', data });

// 获取用户信息展示在首页【通过token来向服务器查找】
export const reqGetUserInfo = () => request({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

// 退出登录
export const reqLogout = () => request({
  url: '/user/passport/logout',
  method: 'get'
})

// 获取用户地址信息
export const reqAddressInfo = () => request({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'GET'
})

// 获取交易商品信息清单
export const reqGetOrderInfo = () => request({
  url: '/order/auth/trade',
  method: 'GET'
})

// 提交订单信息
export const reqSubmitOrder = (tradeNo, data) => request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'POST',
  data
})

// 获取支付订单信息
export const reqGetPayInfo = (orderId) => request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'GET'
})

// 获取支付订单状态
export const reqGetPayStatus = (orderId) => request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'GET'
})

// 获取我的订单列表
export const reqGetMyOrderList = (page, limit) => request({
  url: `/order/auth/${page}/${limit}`,
  method: 'GET'
})