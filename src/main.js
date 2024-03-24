import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index'
// 三级联动组件——全局组件
import TypeNavIndex from '@/components/TypeNav'
// 引入仓库
import store from './store'
// 引入轮播图全局组件
import CarsouselIndex from '@/components/Carousel'
// 分页器
import PagiNation from '@/components/Pagination/index.vue'
// 引入懒加载插件
import Vuelazyload from 'vue-lazyload'
// 引入loading
import loading from '@/assets/R.gif'
// 引入表达校验插件
import './utils/validate'

import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 注册全局组件
// 第一个参数：全局组件名字 第二个参数：哪一个组件
Vue.component(TypeNavIndex.name, TypeNavIndex)
Vue.component(CarsouselIndex.name, CarsouselIndex)
Vue.component(PagiNation.name, PagiNation)
// 注册懒加载组件
Vue.use(Vuelazyload, {
  // 懒加载默认的图片
  loading: loading
})

// 引入MockServe.js---mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'


Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将API放在Vue的原型对象身上，这样就可以直接引入所有的API了
    Vue.prototype.$API = API

  },
  // 注册路由
  router,
  // 注册仓库：在组件实例上会多一个属性 $store
  store
}).$mount('#app')
