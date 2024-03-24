<!-- 三级联动区 -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 商品分类列表 -->
          <div class="sort" v-show="show">
            <!-- 事件委派+编程式导航完成路由的跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex === index }">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二 三级分类 -->
                <div class="item-list clearfix" :style="{
                  display: currentIndex === index ? 'block' : 'none',
                }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>

                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入lodash，将所有的功能函数引入
// import _ from 'lodash'
// 按需引入 throttle
import throttle from "lodash/throttle";
import { mapState } from "vuex";

export default {
  name: "TypeNavIndex",
  data() {
    // 存储用户鼠标选择的哪一级分类
    return {
      currentIndex: -1,
      show: true,
    };
  },

  // 组件挂载完毕，可以向服务器发送请求。生命周期函数
  mounted() {
    // 当组件挂载在search页面时。将show属性值改为false
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },

  // 计算函数
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立刻执行一次
      // 注入一个参数state，就是大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  // 方法函数
  methods: {
    // 鼠标进入修改响应式数据currentIndex
    changeIndex: throttle(function (index) {
      // index:鼠标移上某个一级分类的元素的索引值
      this.currentIndex = index;
    }, 50),

    // 一级分类鼠标移除时的事件回调
    leaveIndex() {
      this.currentIndex = -1;
    },

    // 三级联动的路由跳转方法
    goSearch(event) {
      // 编程式导航+事件委派
      // 如何获取参数呢?
      // 在子节点中的a标签，加上自定义属性:data-categoryName。其余的子节点没有
      // 获取到当前触发事件的节点【h3/a/dt】需要带有data-categoryName的节点。一定是a标签
      let element = event.target;
      // 节点中有一个dataset属性，可以获取事件的自定义属性
      // 可以通过category1id/category2id等来区分一二三级目录
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签上拥有categoryName属性，那一定是a标签
      if (categoryname) {
        // 如何区分一级、二级、三级分类的a标签呢。利用ID来区分
        // location：跳转的路径；query：携带的参数
        let location = { name: "search" };
        let query = { categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 整理完参数
        // console.log(location,query);
        // 在路径中添加query属性，将获取到的query参数赋给location

        // 判断：如果路由跳转的时候，带有params参数，需要一起传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },

    // 当鼠标移入的时候，将全部商品分类进行显示
    enterShow() {
      this.show = true;
    },

    // 当鼠标离开的时候，让全部商品类型进行隐藏
    leaveShow() {
      if (this.$route.path !== "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  cursor: pointer;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }

            &.active {
              background: yellowgreen;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*温馨提示:豪哥不想利用样式控制二级、三级分类显示与隐藏,下面的代码进行注释*/
          //  &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    /*过渡动画:商品分类 进入阶段*/
    .sort-enter {
      height: 0px;
    }

    .sort-enter-active {
      transition: all 0.3s;
    }

    // 过渡动画：结束状态
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>

 