
<template>
  <div class="swiper-container" ref="cur ">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" @click="changeImg(index)" :class="{ active: currentIndex == index }">
      </div>
    </div>
  </div>
</template>

<script>


import Swiper from 'swiper'
// $nextTick
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: ['skuImageList'],

  methods: {
    changeImg(index) {
      // 修改响应式数据
      this.currentIndex = index
      // 通知兄弟组件，当前的索引值为几
      // 使用事件总线来实现兄弟组件通信
      this.$bus.$emit('getIndex', this.currentIndex)
    }
  },

  watch: {
    // 监听数据：可以保证数据一定拿到了，但是不能保证v-for遍历的结构是否完成了
    skuImageList() {

      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // loop: true, // 循环模式选项

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // 设置显示几个图片
          slidesPerView: 3
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    align-items: center;
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      margin: 0 3px;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>