<!-- 轮播图的全局组件 -->

<template>
  <!-- 轮播图区 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!-- 轮播图图片 -->
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "CarouselIndex",
  props: ["list"],

  //   监听
  watch: {
    list: {
      // 立即监听：不管数据有没有变化，一上来就立即监听一次
      //因为list的数据是父组件给的，所以不会发生变化
      immediate: true,
      handler() {
        // 只能监听到数据有了，但是v-for动态渲染结构还是没有办法确定是否已经完成。还是需要使用nextTick
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>