// axios二次封装：为了设置拦截器
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式。在node_module中有其文件
import '../../node_modules/nprogress/nprogress.css'
// 引入store仓库
import store from "@/store";
// 1. 利用axios对象的方法create，去创建一个axios实例
// 2. request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径中会自带api
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到。可以在请求发送之前做些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里有一个属性很重要，header请求头
  // 进度条开始
  if (store.state.detail.uuid_token) {
    // 定制请求头将uuid携带给服务器
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 携带token带给服务器
  if (store.state.register.token) {
    config.headers.token = store.state.register.token
  }
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调函数：服务器响应数据回来之后，响应拦截器可以检测到。做一些事
  // 进度条结束
  nprogress.done()
  return res.data
}, (error) => {
  // 响应失败的回调函数
  console.log(error);
  return Promise.reject(error)
})

// 对外暴露
export default requests
