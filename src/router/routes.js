// 路由配置信息
// 常规引入路由组件
import HomeIndex from '@/pages/Home/home.vue'
// import SearchIndex from '@/pages/search/index.vue'
import LoginIndex from '@/pages/Login/index.vue'
import RegisterIndex from '@/pages/Register/index.vue'
// import DetailIndex from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import TradeIndex from '@/pages/Trade/index.vue'
import PayIndex from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/paySuccess/index.vue'
import CenterIndex from '@/pages/Center/index.vue'
import MyOrder from '@/pages/Center/myOrder/index.vue'
import TeamOrder from '@/pages/Center/teamOrder/index.vue'

// 组件通信测试
import TestIndex from '../../../组件通信/pages/index.vue'
import EventIndex from '../../../组件通信/pages/EventTset/index.vue'
import AttrsListenersIndex from '../../../组件通信/pages/AttrsListenersTest/index.vue'
import ChildrenParentIndex from '../../../组件通信/pages/ChildrenParentTest/index.vue'
import ModelIndex from '../../../组件通信/pages/ModelTest/index.vue'
import ScopeSlotIndex from '../../../组件通信/pages/ScopeSlotTest/index.vue'
import SyncIndex from '../../../组件通信/pages/SyncTest/index.vue'

// 懒加载引入路由组件：高效，只有在使用到相应路由时才加载。开发中基本都是用路由懒加载来引入路由
const SearchIndex = () => import('@/pages/search/index.vue')
export default
  [
    {
      path: '/communication',
      component: TestIndex,
      // 二级路由
      children: [
        {
          path: 'event',
          component: EventIndex
        },
        {
          path: 'attrs',
          component: AttrsListenersIndex
        },
        {
          path: 'children',
          component: ChildrenParentIndex
        },
        {
          path: 'model',
          component: ModelIndex
        },
        {
          path: 'scopslot',
          component: ScopeSlotIndex
        },
        {
          path: 'sync',
          component: SyncIndex
        }
      ]
    },

    {
      path: '/',
      redirect: '/home',
      meta: { show: true }
    },
    {
      path: "/home",
      component: HomeIndex,
      meta: { show: true }
    },
    {
      path: '/center',
      component: CenterIndex,
      meta: { show: true },
      //  二级路由
      children: [
        {
          path: 'myorder',
          component: MyOrder
        },
        {
          path: 'teamorder',
          component: TeamOrder
        },
        // 重定向，进入center定向到myorder
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    },
    {
      // :keyword占位，表示传递参数params。?代表可传或不传params参数 
      path: '/search/:keyword?',
      component: SearchIndex,
      meta: { show: true },
      name: 'search',
      // 路由组件能不能传递props数据。要在对应的路由组件(search)中接收props值。
      // 1.布尔值写法：params
      // props: true
      // 2. 对象写法 props:{a:1,b:2}
      // 3. 函数写法
      props: ($route) => {
        return { keyword: $route.params.keyword, k: $route.query.k }
      }
    },
    {
      // 路由跳转需要携带产品的ID给详情页面
      path: '/detail/:skuid',
      component: () => import('@/pages/Detail/index.vue'),
      meta: { show: true }

    },
    {
      path: '/register',
      component: RegisterIndex,
      meta: { show: false }
    },
    {
      path: '/login',
      component: LoginIndex,
      meta: { show: false }

    },
    {
      path: '/addcartsuccess',
      name: 'addcartsuccess',
      component: AddCartSuccess,
      meta: { show: true }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      name: 'shopcart',
      meta: { show: true }
    },
    {
      path: '/trade',
      component: TradeIndex,
      meta: { show: true },
      // 路由独享守卫配置
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          // false 表示停留在当前路由
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: PayIndex,
      meta: { show: false },
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: { show: false },
      // beforeEnter: (to, from, next) => {
      //   if (from.path == '/pay') {
      //     next()
      //   } else {
      //     next(false)
      //   }
      // }
    }
  ]
