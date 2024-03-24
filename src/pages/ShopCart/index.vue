<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 商品信息 -->
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="changeChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', +1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <!-- 操作框 -->
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
          @click="changeCheCkedAll" :disabled="cartInfoList.length < 1">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from "lodash/throttle"
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },

  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      });
      return sum
    },

    // 计算全选框是否全选
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },

  methods: {
    // 获取个人购物车
    getData() {
      this.$store.dispatch('getCartList')
    },

    // 修改数量。同一个回调函数，控制三种不同的操作
    // type:区分那个DOM元素；disNum:变化量；cart:点击是哪个商品(id)。throttle节流
    handler: throttle(async function (type, disNum, cart) {
      switch (type) {
        case 'add':
          // 带给服务器变化的量和商品id
          disNum = 1
          break;
        case 'minus':
          // 商品个数大于1才能传递给服务器变化量；否则不传递
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
        case 'change':
          // 输入文本(最终量)是非法数字
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            // 输入文本正常现象
            // 1. 非整数情况:最终值取整-原先的值
            disNum = parseInt(disNum) - cart.skuNum
          }
          // disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum
          break;

      }
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 再一次获取服务器数据进行展示
        this.getData()
      } catch (error) {
        alert('修改失败')
      }
    }, 3000),

    // 删除的回调函数
    async delCartById(cart) {
      try {
        await this.$store.dispatch('deleteCartListBySkuId', cart.skuId)
        // 等到删除成功结果回来后刷新页面
        this.getData()
      } catch (error) {
        alert('删除失败')
      }
    },

    //修改某一个商品的勾选的状态
    async changeChecked(cart, e) {
      //整理参数
      let params = {
        skuId: cart.skuId,
        isChecked: e.target.checked ? "1" : "0",
      };
      //发请求:修改商品的勾选的状态
      try {
        await this.$store.dispatch("changeChecked", params);
        this.getData();
      } catch (error) { console.log(error); }
    },

    // 删除全部选中的商品
    async delAllChecked() {
      try {
        // 派发actions
        await this.$store.dispatch('delteAllChecked')
        this.getData()
      } catch (err) {
        console.log('删除失败');
      }
    },

    // 全选框修改
    async changeCheCkedAll(event) {

      try {
        // 获取当前全选框到底是1还是0
        let checked = event.target.checked ? "1" : "0"
        // 派发actions
        await this.$store.dispatch('changeCheckedAll', checked)
        this.getData()
      } catch (err) {
        console.log(err);
      }

    }
  }
}
</script>

<style lang="less" scoped>
.cart {

  cursor: pointer;
  width: 1200px;
  margin: 0 auto;

  &disabled {
    color: #c81623;
  }

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }

          .sindelet:hover {
            color: #c81623;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

